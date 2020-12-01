import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

const DEFAULT_PAGE_SIZE = 10;

export enum ASSET_TYPES {
  PRODUCT,
  VIDEO,
  IMAGE,
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
  page: number;
  size: number;
  total: number;
  data: Asset[];
}

const initialState: AssetsState = {
  isLoading: false,
  error: "",
  page: 0,
  total: 0,
  size: DEFAULT_PAGE_SIZE,
  data: [],
};

export const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    fetchAssetsStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    fetchAssetsSuccess: (
      state,
      action: PayloadAction<{ page: number; data: Asset[] }>
    ) => {
      state.isLoading = false;
      state.page = action.payload.page;
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

export const fetchAssets = (): AppThunk => (dispatch, getState) => {
  const state = getState();
  if (!state.assets.isLoading) {
    const page = state.assets.page + 1;
    dispatch(fetchAssetsStart());
    return fetch(`http://localhost:3001/assets?_page=${page}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchAssetsSuccess({ page, data: json }));
      })
      .catch(() => {
        dispatch(fetchAssetsFailure("Something went wrong!"));
      });
  }
};

export const selectAssets = (state: RootState) => state.assets;

export default assetsSlice.reducer;
