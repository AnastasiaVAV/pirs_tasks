import { useGetUserByIdQuery } from 'entities/user';

type UseUserByIdOptions = {
  skip?: boolean;
};

export const useUserById = (userId: number, options?: UseUserByIdOptions) => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery(userId, { skip: options?.skip });
  return { user, isLoading, isError, error };
};
