import { useState, useCallback } from 'react';
import { useGetUsersQuery } from 'entities/user';
import type { UserListParams } from 'entities/user';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE, DEFAULT_FILTERS } from './types';
import type { UserFilters, SortField } from './types';

const buildParams = (
  filters: UserFilters,
  sort: string,
  page: number,
  perPage: number
): UserListParams => {
  const params: UserListParams = { page, 'per-page': perPage };

  const searchParams: Record<string, string | number[]> = {
    'UserSearch[id]': filters.id,
    'UserSearch[username]': filters.username,
    'UserSearch[email]': filters.email,
    'UserSearch[birthdateStart]': filters.birthdateStart,
    'UserSearch[birthdateEnd]': filters.birthdateEnd,
    'UserSearch[foodIds]': filters.foodIds,
  };

  for (const [key, value] of Object.entries(searchParams)) {
    if (value && (Array.isArray(value) ? value.length > 0 : value !== '')) {
      (params as Record<string, unknown>)[key] = value;
    }
  }

  if (sort) params.sort = sort;

  return params;
};

export const useUsersList = () => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const perPage = DEFAULT_PER_PAGE;
  const [filters, setFilters] = useState<UserFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<string>('');

  const params = buildParams(filters, sort, page, perPage);
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
