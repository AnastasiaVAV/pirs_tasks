import * as yup from 'yup';

export const REQUIRED_FIELD = 'Обязательное поле' as const;

export const emailSchema = yup
  .string()
  .required(REQUIRED_FIELD)
  .email('Некорректный email')
  .max(255, 'Максимум 255 символов');

export const usernameSchema = yup
  .string()
  .required(REQUIRED_FIELD)
  .max(255, 'Максимум 255 символов');

export const birthdateSchema = yup.string().required(REQUIRED_FIELD);

export const foodIdsSchema = yup.array().of(yup.number()).default([]);
