import { baseApi } from 'shared/api';
import type { User, UserListParams } from './types';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<{ data: User[]; headers: Record<string, string> }, UserListParams>({
      query: (params) => ({
        url: '/v1/user/index',
        params,
      }),
      transformResponse: (response: unknown, meta) => {
        const users = Array.isArray(response)
          ? response.map((u: Record<string, unknown>) => ({
              id: u.id as number,
              username: u.username as string,
              email: u.email as string,
              birthdate: u.birthdate as string,
              favorite_food_ids: Array.isArray(u.favorite_food_ids)
                ? u.favorite_food_ids.map(Number)
                : [],
              photo_id: (u.photo_id as number) ?? null,
            }))
          : [];
        return {
          data: users,
          headers: meta?.response?.headers
            ? Object.fromEntries(meta.response.headers.entries())
            : {},
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    getUserById: builder.query<User, number>({
      query: (id) => ({ url: '/v1/user/view', params: { id } }),
      transformResponse: (response: unknown) => {
        const u = response as Record<string, unknown>;
        return {
          id: u.id as number,
          username: u.username as string,
          email: u.email as string,
          birthdate: u.birthdate as string,
          favorite_food_ids: Array.isArray(u.favorite_food_ids)
            ? u.favorite_food_ids.map(Number)
            : [],
          photo_id: (u.photo_id as number) ?? null,
        };
      },
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
