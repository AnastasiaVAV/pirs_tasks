import * as yup from 'yup';

// --- Form schemas (для react-hook-form + Yup) ---

const baseUserFields = {
  username: yup.string().required('Необходимо заполнить «Имя»').max(255, 'Максимум 255 символов'),
  email: yup
    .string()
    .required('Необходимо заполнить «Email»')
    .email('Некорректный email')
    .max(255, 'Максимум 255 символов'),
  birthdate: yup.string().required('Необходимо заполнить «Дата рождения»'),
  upload_photo: yup.mixed<File>().nullable().default(null),
};

export const userCreateSchema = yup.object({
  ...baseUserFields,
  favorite_food_ids: yup.array().of(yup.number()).default([]),
});

export const userUpdateSchema = yup.object({
  ...baseUserFields,
  favorite_food_ids: yup.array().of(yup.number().defined()).default([]),
});

export type UserCreateFormValues = yup.InferType<typeof userCreateSchema>;
export type UserUpdateFormValues = yup.InferType<typeof userUpdateSchema>;
