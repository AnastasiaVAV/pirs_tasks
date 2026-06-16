import { baseApi } from 'shared/api';

export const fileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFileById: builder.query({
      query: (id: number) => ({
        url: '/file/get',
        params: { id },
        responseHandler: (response: Response) =>
          response.blob().then((blob: Blob) => URL.createObjectURL(blob)),
      }),
    }),
  }),
});

export const { useGetFileByIdQuery } = fileApi;
