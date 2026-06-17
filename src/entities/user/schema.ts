import * as yup from 'yup';

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
  username: yup.string().required('Необходимо заполнить «Имя»').max(255, 'Максимум 255 символов'),
  email: yup
    .string()
    .required('Необходимо заполнить «Email»')
    .email('Некорректный email')
    .max(255, 'Максимум 255 символов'),
  birthdate: yup.string().required('Необходимо заполнить «Дата рождения»'),
  favorite_food_ids: yup.array().of(yup.number()).default([]),
  upload_photo: yup.mixed<File>().nullable().default(null),
});

export const userUpdateSchema = yup.object({
  username: yup.string().required('Необходимо заполнить «Имя»').max(255, 'Максимум 255 символов'),
  email: yup
    .string()
    .required('Необходимо заполнить «Email»')
    .email('Некорректный email')
    .max(255, 'Максимум 255 символов'),
  birthdate: yup.string().required('Необходимо заполнить «Дата рождения»'),
  favorite_food_ids: yup.array().of(yup.number()).optional(),
  upload_photo: yup.mixed<File>().nullable().optional(),
});

export type UserCreateFormValues = yup.InferType<typeof userCreateSchema>;
export type UserUpdateFormValues = yup.InferType<typeof userUpdateSchema>;
