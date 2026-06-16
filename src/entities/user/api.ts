/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { baseApi } from 'shared/api';
import type { User, UserListParams, FoodItem } from './types';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<{ data: User[]; headers: Record<string, string> }, UserListParams>({
      query: (params) => ({
        url: '/v1/users',
        params,
      }),
      transformResponse: (response: User[], meta: { response?: Response }) => ({
        data: response,
        headers: meta?.response?.headers ? Object.fromEntries(meta.response.headers.entries()) : {},
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    getUserById: builder.query<User, number>({
      query: (id) => `/v1/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),

    getFoodList: builder.query<FoodItem, void>({
      query: () => '/v1/user/get-food-list',
    }),

    createUser: builder.mutation<User, FormData>({
      query: (body) => ({
        url: '/v1/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    updateUser: builder.mutation<User, { id: number; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/v1/users/${id}`,
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
        url: `/v1/users/${id}`,
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
