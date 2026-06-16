import * as yup from 'yup';

import { REQUIRED_FIELD } from 'shared/lib';

// --- Response schemas (для RTK Query responseSchema) ---

export const userResponseSchema = yup.object({
  id: yup.number().defined(),
  username: yup.string().defined(),
  email: yup.string().defined(),
  birthdate: yup.string().defined(),
  favorite_food_ids: yup.array().of(yup.number()).defined(),
  photo_id: yup.number().nullable().defined(),
});

export const userListResponseSchema = yup.object({
  data: yup.array().of(userResponseSchema).defined(),
  headers: yup.object().defined(),
});

export const foodListSchema = yup.object().defined();

// --- Form schemas (для react-hook-form + Yup) ---

export const userCreateSchema = yup.object({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  username: yup.string().required(REQUIRED_FIELD).max(255, 'Максимум 255 символов'),
  email: yup
    .string()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .required(REQUIRED_FIELD)
    .email('Некорректный email')
    .max(255, 'Максимум 255 символов'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  birthdate: yup.string().required(REQUIRED_FIELD),
  favorite_food_ids: yup.array().of(yup.number()).default([]),
  upload_photo: yup.mixed<File>().nullable().default(null),
});

export const userUpdateSchema = userCreateSchema.partial();

export type UserCreateFormValues = yup.InferType<typeof userCreateSchema>;
export type UserUpdateFormValues = yup.InferType<typeof userUpdateSchema>;
