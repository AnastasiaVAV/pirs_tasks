import type { UseFormReturn } from 'react-hook-form';

export const buildUserFormData = (values: {
  username?: string;
  email?: string;
  birthdate?: string;
  favorite_food_ids?: (number | undefined)[];
  upload_photo?: File | null;
}): FormData => {
  const formData = new FormData();

  if (values.username !== undefined) formData.append('username', values.username);
  if (values.email !== undefined) formData.append('email', values.email);
  if (values.birthdate !== undefined) formData.append('birthdate', values.birthdate);

  if (values.favorite_food_ids?.length) {
    values.favorite_food_ids.forEach((id) => {
      formData.append('favorite_food_ids[]', String(id));
    });
  }

  if (values.upload_photo) {
    formData.append('upload_photo', values.upload_photo);
  }

  return formData;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleServerErrors = (err: unknown, form: UseFormReturn<any>) => {
  if (err && typeof err === 'object' && 'data' in err) {
    const data = err.data as Record<string, string[]>;
    Object.entries(data).forEach(([field, messages]) => {
      if (field in form.getValues()) {
        form.setError(field, {
          type: 'server',
          message: messages.join(', '),
        });
      }
    });
  }
};
