import { useState, useCallback } from 'react';
import { useGetUsersQuery } from 'entities/user';
import type { UserListParams } from 'entities/user';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export type UserFilters = {
  username: string;
  email: string;
  birthdateStart: string;
  birthdateEnd: string;
};

const DEFAULT_FILTERS: UserFilters = {
  username: '',
  email: '',
  birthdateStart: '',
  birthdateEnd: '',
};

export const useUsersList = () => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [perPage] = useState(DEFAULT_PER_PAGE);
  const [filters, setFilters] = useState<UserFilters>(DEFAULT_FILTERS);

  const params: UserListParams = {
    page,
    'per-page': perPage,
  };

  if (filters.username) params['UserSearch[username]'] = filters.username;
  if (filters.email) params['UserSearch[email]'] = filters.email;
  if (filters.birthdateStart) params['UserSearch[birthdateStart]'] = filters.birthdateStart;
  if (filters.birthdateEnd) params['UserSearch[birthdateEnd]'] = filters.birthdateEnd;

  const { data, ...rest } = useGetUsersQuery(params);

  const totalPages = Number(rest.currentData?.headers?.['x-pagination-page-count'] ?? 0) || 1;
  const totalCount = Number(rest.currentData?.headers?.['x-pagination-total-count'] ?? 0);

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const setFilter = useCallback(<K extends keyof UserFilters>(key: K, value: UserFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(DEFAULT_PAGE);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(DEFAULT_PAGE);
  }, []);

  return {
    users: data?.data ?? [],
    page,
    perPage,
    totalPages,
    totalCount,
    filters,
    goToPage,
    setFilter,
    resetFilters,
    ...rest,
  };
};
