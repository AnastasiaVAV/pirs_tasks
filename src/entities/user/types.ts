export interface User {
  id: number;
  username: string;
  email: string;
  birthdate: string;
  favorite_food_ids: number[];
  photo_id: number | null;
}

export interface UserCreateDto {
  username: string;
  email: string;
  birthdate: string;
  favorite_food_ids?: number[];
  upload_photo?: File | null;
}

export type UserUpdateDto = Partial<UserCreateDto>;

export interface UserListParams {
  page?: number;
  'per-page'?: number;
  fields?: string;
  expand?: string;
  sort?: string;
  'UserSearch[id]'?: string;
  'UserSearch[username]'?: string;
  'UserSearch[email]'?: string;
  'UserSearch[birthdateStart]'?: string;
  'UserSearch[birthdateEnd]'?: string;
}

export type FoodItem = Record<string, string>;
