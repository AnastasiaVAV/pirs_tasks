import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { baseApi } from 'shared/api';
import { STORAGE_KEYS } from 'shared/config';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: localStorage.getItem(STORAGE_KEYS.TOKEN) },
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, action.payload);
      } else {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
      }
    },
  },
});

export const { setToken } = authSlice.actions;

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
