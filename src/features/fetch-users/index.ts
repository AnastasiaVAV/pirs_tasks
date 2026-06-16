import { useState, useCallback } from 'react';
import { useGetUsersQuery } from 'entities/user';
import type { UserListParams } from 'entities/user';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export type UserFilters = {
  id: string;
  username: string;
  email: string;
  birthdateStart: string;
  birthdateEnd: string;
  foodIds: number[];
};

const DEFAULT_FILTERS: UserFilters = {
  id: '',
  username: '',
  email: '',
  birthdateStart: '',
  birthdateEnd: '',
  foodIds: [],
};

export type SortField = 'id' | 'username' | 'email' | 'birthdate' | 'favorite_food_ids';

export const useUsersList = () => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [perPage] = useState(DEFAULT_PER_PAGE);
  const [filters, setFilters] = useState<UserFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<string>('');

  const params: UserListParams = {
    page,
    'per-page': perPage,
  };

  if (filters.id) params['UserSearch[id]'] = filters.id;
  if (filters.username) params['UserSearch[username]'] = filters.username;
  if (filters.email) params['UserSearch[email]'] = filters.email;
  if (filters.birthdateStart) params['UserSearch[birthdateStart]'] = filters.birthdateStart;
  if (filters.birthdateEnd) params['UserSearch[birthdateEnd]'] = filters.birthdateEnd;
  if (filters.foodIds.length > 0) params['UserSearch[foodIds]'] = filters.foodIds;
  if (sort) params.sort = sort;

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

  const toggleSort = useCallback((field: SortField) => {
    setSort((prev) => {
      if (prev === field) return `-${field}`;
      if (prev === `-${field}`) return '';
      return field;
    });
    setPage(DEFAULT_PAGE);
  }, []);

  const getSortDirection = useCallback(
    (field: SortField): 'asc' | 'desc' | false => {
      if (sort === field) return 'asc';
      if (sort === `-${field}`) return 'desc';
      return false;
    },
    [sort]
  );

  return {
    users: data?.data ?? [],
    page,
    perPage,
    totalPages,
    totalCount,
    filters,
    sort,
    goToPage,
    setFilter,
    resetFilters,
    toggleSort,
    getSortDirection,
    ...rest,
  };
};
