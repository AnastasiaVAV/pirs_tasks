import { baseApi } from 'shared/api';
import type { User, UserListParams } from './types';
import { parseRawUser } from './lib';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<{ data: User[]; headers: Record<string, string> }, UserListParams>({
      query: (params) => ({
        url: '/v1/user/index',
        params,
      }),
      transformResponse: (response: unknown, meta) => {
        const users = Array.isArray(response)
          ? response.map((u: Record<string, unknown>) => parseRawUser(u))
          : [];
        return {
          data: users,
          headers: meta?.response?.headers
            ? Object.fromEntries(meta.response.headers.entries())
            : {},
        };
      },
      providesTags: (result) => {
        const tags = result?.data
          ? result.data.map(({ id }) => ({ type: 'User' as const, id }))
          : [];
        return [...tags, { type: 'User', id: 'LIST' }];
      },
    }),

    getUserById: builder.query<User, number>({
      query: (id) => ({ url: '/v1/user/view', params: { id } }),
      transformResponse: (response: unknown) => parseRawUser(response as Record<string, unknown>),
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),

    getFoodList: builder.query<Record<string, string>, void>({
      query: () => '/v1/user/get-food-list',
    }),

    createUser: builder.mutation<void, FormData>({
      query: (body) => ({
        url: '/v1/user/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    updateUser: builder.mutation<void, { id: number; body: FormData }>({
      query: ({ id, body }) => ({
        url: '/v1/user/update',
        params: { id },
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),

    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: '/v1/user/delete',
        params: { id },
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
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
