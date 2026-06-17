import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateUserMutation } from 'entities/user';
import { userUpdateSchema } from 'entities/user/schema';
import type { UserUpdateFormValues } from 'entities/user/schema';
import type { User } from 'entities/user';
import { buildUserFormData, handleServerErrors } from 'shared/lib/form-utils';

export const useUpdateUserForm = (user: User, onSuccess?: () => void) => {
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

  const form = useForm<UserUpdateFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(userUpdateSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      birthdate: user.birthdate,
      favorite_food_ids: user.favorite_food_ids,
      upload_photo: null,
    },
  });

  useEffect(() => {
    form.reset({
      username: user.username,
      email: user.email,
      birthdate: user.birthdate,
      favorite_food_ids: user.favorite_food_ids,
      upload_photo: null,
    });
  }, [user, form]);

  const onSubmit = useCallback(
    async (values: UserUpdateFormValues) => {
      try {
        const formData = buildUserFormData(values);
        await updateUser({ id: user.id, body: formData }).unwrap();
        form.reset(values);
        onSuccess?.();
      } catch (err) {
        handleServerErrors(err, form);
      }
    },
    [updateUser, user.id, form, onSuccess]
  );

  return { form, onSubmit, isLoading, error };
};
