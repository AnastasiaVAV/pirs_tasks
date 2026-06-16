import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateUserMutation } from 'entities/user';
import { userUpdateSchema } from 'entities/user/schema';
import type { UserUpdateFormValues } from 'entities/user/schema';
import type { User } from 'entities/user';

export const useUpdateUserForm = (user: User, onSuccess?: () => void) => {
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

  const form = useForm<UserUpdateFormValues>({
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
        const formData = new FormData();

        if (values.username !== undefined) formData.append('username', values.username);
        if (values.email !== undefined) formData.append('email', values.email);
        if (values.birthdate !== undefined) formData.append('birthdate', values.birthdate);

        if (values.favorite_food_ids !== undefined) {
          values.favorite_food_ids.forEach((id) => {
            formData.append('favorite_food_ids[]', String(id));
          });
        }

        if (values.upload_photo) {
          formData.append('upload_photo', values.upload_photo);
        }

        await updateUser({ id: user.id, body: formData }).unwrap();
        form.reset(values);
        onSuccess?.();
      } catch (err) {
        if (err && typeof err === 'object' && 'data' in err) {
          const data = err.data as Record<string, string[]>;
          Object.entries(data).forEach(([field, messages]) => {
            if (field in form.getValues()) {
              form.setError(field as keyof UserUpdateFormValues, {
                type: 'server',
                message: messages.join(', '),
              });
            }
          });
        }
      }
    },
    [updateUser, user.id, form, onSuccess]
  );

  return { form, onSubmit, isLoading, error };
};
