import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateUserMutation } from 'entities/user';
import { userCreateSchema } from 'entities/user/schema';
import type { UserCreateFormValues } from 'entities/user/schema';

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
        const formData = new FormData();
        formData.append('username', values.username);
        formData.append('email', values.email);
        formData.append('birthdate', values.birthdate);

        if (values.favorite_food_ids?.length) {
          values.favorite_food_ids.forEach((id) => {
            formData.append('favorite_food_ids[]', String(id));
          });
        }

        if (values.upload_photo) {
          formData.append('upload_photo', values.upload_photo);
        }

        await createUser(formData).unwrap();
        form.reset();
        onSuccess?.();
      } catch (err) {
        if (err && typeof err === 'object' && 'data' in err) {
          const data = err.data as Record<string, string[]>;
          Object.entries(data).forEach(([field, messages]) => {
            if (field in form.getValues()) {
              form.setError(field as keyof UserCreateFormValues, {
                type: 'server',
                message: messages.join(', '),
              });
            }
          });
        }
      }
    },
    [createUser, form, onSuccess]
  );

  return { form, onSubmit, isLoading, error };
};
