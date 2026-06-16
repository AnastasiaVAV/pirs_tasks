/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { baseApi } from 'shared/api';

export const fileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFileById: builder.query<string, number>({
      query: (id) => ({
        url: '/file/get',
        params: { id },
        responseHandler: (response) =>
          response.blob().then((blob: Blob) => URL.createObjectURL(blob)),
      }),
    }),
  }),
});

export const { useGetFileByIdQuery } = fileApi;
