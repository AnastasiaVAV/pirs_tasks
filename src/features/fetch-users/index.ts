import { useState, useCallback } from 'react';
import { useGetUsersQuery } from 'entities/user';
import type { UserListParams } from 'entities/user';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export const useUsersList = () => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [perPage] = useState(DEFAULT_PER_PAGE);

  const params: UserListParams = {
    page,
    'per-page': perPage,
  };

  const { data, ...rest } = useGetUsersQuery(params);

  const totalPages = Number(rest.currentData?.headers?.['x-pagination-page-count'] ?? 0) || 1;

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return {
    users: data?.data ?? [],
    page,
    perPage,
    totalPages,
    goToPage,
    ...rest,
  };
};
