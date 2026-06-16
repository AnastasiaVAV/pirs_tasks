import * as yup from 'yup';

import { REQUIRED_FIELD } from 'shared/lib';

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
