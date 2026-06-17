import type { User } from './types';

export const parseRawUser = (raw: Record<string, unknown>): User => ({
  id: raw.id as number,
  username: raw.username as string,
  email: raw.email as string,
  birthdate: raw.birthdate as string,
  favorite_food_ids: Array.isArray(raw.favorite_food_ids) ? raw.favorite_food_ids.map(Number) : [],
  photo_id: (raw.photo_id as number) ?? null,
});
