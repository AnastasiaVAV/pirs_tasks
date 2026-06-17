import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateUserMutation } from 'entities/user';
import { userCreateSchema } from 'entities/user/schema';
import type { UserCreateFormValues } from 'entities/user/schema';
import { buildUserFormData, handleServerErrors } from 'shared/lib/form-utils';

export const useCreateUserForm = (onSuccess?: () => void) => {
  const [createUser, { isLoading, error }] = useCreateUserMutation();

  const form = useForm<UserCreateFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(userCreateSchema),
    defaultValues: {
      username: '',
      email: '',
      birthdate: '',
      favorite_food_ids: [],
      upload_photo: null,
    },
  });

  const onSubmit = useCallback(
    async (values: UserCreateFormValues) => {
      try {
        const formData = buildUserFormData(values);
        await createUser(formData).unwrap();
        form.reset();
        onSuccess?.();
      } catch (err) {
        handleServerErrors(err, form);
      }
    },
    [createUser, form, onSuccess]
  );

  return { form, onSubmit, isLoading, error };
};
