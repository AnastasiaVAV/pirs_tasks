export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;

export type UserFilters = {
  id: string;
  username: string;
  email: string;
  birthdateStart: string;
  birthdateEnd: string;
  foodIds: number[];
};

export const DEFAULT_FILTERS: UserFilters = {
  id: '',
  username: '',
  email: '',
  birthdateStart: '',
  birthdateEnd: '',
  foodIds: [],
};

export type SortField = 'id' | 'username' | 'email' | 'birthdate' | 'favorite_food_ids';
