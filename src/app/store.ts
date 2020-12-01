import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import assetsReducer from '../features/library/assetsSlice';

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
