import { baseApi } from 'shared/api';
import type { UserListParams } from './types';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params: UserListParams) => ({
        url: '/v1/users',
        params,
      }),
      transformResponse: (response: unknown, meta: { response?: Response }) => ({
        data: response,
        headers: meta?.response?.headers ? Object.fromEntries(meta.response.headers.entries()) : {},
      }),
      providesTags: (result: { data: Array<{ id: number }> } | undefined) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    getUserById: builder.query({
      query: (id: number) => `/v1/users/${id}`,
      providesTags: (_result: unknown, _error: unknown, id: number) => [{ type: 'User', id }],
    }),

    getFoodList: builder.query({
      query: () => '/v1/user/get-food-list',
    }),

    createUser: builder.mutation({
      query: (body: FormData) => ({
        url: '/v1/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    updateUser: builder.mutation({
      query: ({ id, body }: { id: number; body: FormData }) => ({
        url: `/v1/users/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result: unknown, _error: unknown, { id }: { id: number }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),

    deleteUser: builder.mutation({
      query: (id: number) => ({
        url: `/v1/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result: unknown, _error: unknown, id: number) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetFoodListQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
