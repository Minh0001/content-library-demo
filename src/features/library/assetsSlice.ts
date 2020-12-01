import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

const DEFAULT_PAGE_SIZE = 10;

export enum ASSET_TYPES {
  PRODUCT = "PRODUCT",
  VIDEO = "VIDEO",
  IMAGE = "IMAGE",
}

export interface Asset {
  id: number;
  user_id: number;
  client_id: number;
  asset_type: ASSET_TYPES;
  file_name: string;
  thumbnail_url: string;
  created_at: Date;
  updated_at: Date;
}

interface AssetsState {
  isLoading: boolean;
  error: string;
  size: number;
  total: number;
  data: Asset[];
}

const initialState: AssetsState = {
  isLoading: false,
  error: "",
  total: 0,
  size: DEFAULT_PAGE_SIZE,
  data: [],
};

export const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    fetchAssetsStart: (state, action: PayloadAction<boolean>) => {
      state.isLoading = true;
      state.error = "";
      state.data = action.payload ? state.data : [];
    },
    fetchAssetsSuccess: (
      state,
      action: PayloadAction<{ data: Asset[]; total: number }>
    ) => {
      state.isLoading = false;
      state.total = action.payload.total;
      state.data.push(...action.payload.data);
    },
    fetchAssetsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAssetsStart,
  fetchAssetsSuccess,
  fetchAssetsFailure,
} = assetsSlice.actions;

export const fetchAssets = (payload: {
  start: number;
  end: number;
  query?: string;
  filter?: string;
  refresh?: boolean;
}): AppThunk => (dispatch, getState) => {
  const { start, end, filter, query, refresh = false } = payload;
  const state = getState();
  if (!state.assets.isLoading) {
    dispatch(fetchAssetsStart(refresh));
    return fetch(
      `http://localhost:3001/assets?_start=${start}&_end=${end}${
        filter && "&" + filter
      }${query ? `&q=${query}` : ""}`
    )
      .then((res) => {
        const total = +(res.headers.get("X-Total-Count") || 0);
        res.json().then((json) => {
          dispatch(fetchAssetsSuccess({ data: json, total }));
        });
      })
      .catch(() => {
        dispatch(fetchAssetsFailure("Something went wrong!"));
      });
  }
};

export const selectAssets = (state: RootState) => state.assets;

export default assetsSlice.reducer;
