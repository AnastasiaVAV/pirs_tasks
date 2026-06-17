export interface User {
  id: number;
  username: string;
  email: string;
  birthdate: string;
  favorite_food_ids: number[];
  photo_id: number | null;
}

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
  'UserSearch[foodIds]'?: number[];
}
