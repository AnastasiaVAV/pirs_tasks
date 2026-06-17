import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateUserMutation, userUpdateSchema } from 'entities/user';
import type { UserUpdateFormValues, User } from 'entities/user';
import { buildUserFormData, handleServerErrors } from 'shared/lib';

export const useUpdateUserForm = (user: User, onSuccess?: () => void) => {
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
  const prevUserIdRef = useRef(user.id);

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
    if (prevUserIdRef.current !== user.id) {
      prevUserIdRef.current = user.id;
      form.reset({
        username: user.username,
        email: user.email,
        birthdate: user.birthdate,
        favorite_food_ids: user.favorite_food_ids,
        upload_photo: null,
      });
    }
  }, [user.id, user.username, user.email, user.birthdate, user.favorite_food_ids, form]);

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
