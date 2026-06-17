import * as yup from 'yup';

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
  favorite_food_ids: yup.array().of(yup.number().defined()).default([]),
  upload_photo: yup.mixed<File>().nullable().default(null),
});

export type UserCreateFormValues = yup.InferType<typeof userCreateSchema>;
export type UserUpdateFormValues = yup.InferType<typeof userUpdateSchema>;
