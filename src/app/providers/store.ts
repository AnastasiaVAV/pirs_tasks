import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: localStorage.getItem('auth_token') },
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem('auth_token', action.payload);
      } else {
        localStorage.removeItem('auth_token');
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
