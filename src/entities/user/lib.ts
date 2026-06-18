import type { User } from './types';

export const parseRawUser = (raw: Record<string, unknown>): User => ({
  id: typeof raw.id === 'number' ? raw.id : 0,
  username: typeof raw.username === 'string' ? raw.username : '',
  email: typeof raw.email === 'string' ? raw.email : '',
  birthdate: typeof raw.birthdate === 'string' ? raw.birthdate : '',
  favorite_food_ids: Array.isArray(raw.favorite_food_ids) ? raw.favorite_food_ids.map(Number) : [],
  photo_id: typeof raw.photo_id === 'number' ? raw.photo_id : null,
});
