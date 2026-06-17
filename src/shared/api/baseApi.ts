import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/app/providers/store';
import { API_BASE_URL, API_KEY, STORAGE_KEYS } from '@/shared/config/api';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth?.token ?? localStorage.getItem(STORAGE_KEYS.TOKEN);

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      headers.set('X-API-Key', API_KEY);

      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: () => ({}),
});
