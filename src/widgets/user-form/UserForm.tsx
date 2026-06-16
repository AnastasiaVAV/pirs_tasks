import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { Input, Button, DatePicker, Select, ErrorAlert } from 'shared/ui';
import { useCreateUserForm } from 'features/create-user';
import { useUpdateUserForm } from 'features/update-user';
import { useFoodList } from 'features/fetch-food-list';
import type { User } from 'entities/user';

type UserFormProps =
  | { mode: 'create'; onSuccess?: () => void }
  | { mode: 'update'; user: User; onSuccess?: () => void };

export const UserForm = (props: UserFormProps) => {
  const navigate = useNavigate();
  const { options: foodOptions } = useFoodList();

  const createForm = useCreateUserForm(() => navigate('/users'));
  const updateForm = useUpdateUserForm(props.mode === 'update' ? props.user : ({} as User), () =>
    navigate(props.mode === 'update' ? `/users/${props.user.id}` : '/users')
  );

  const isUpdate = props.mode === 'update';
  const { form, onSubmit, isLoading } = isUpdate ? updateForm : createForm;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Typography variant="h5">
          {isUpdate ? 'Редактирование пользователя' : 'Создание пользователя'}
        </Typography>

        {isUpdate && updateForm.error && (
          <ErrorAlert message="Произошла ошибка при сохранении. Попробуйте позже." />
        )}
        {!isUpdate && createForm.error && (
          <ErrorAlert message="Произошла ошибка при создании. Попробуйте позже." />
        )}

        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label="Имя пользователя"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label="Email"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="birthdate"
          control={form.control}
          render={({ field, fieldState }) => (
            <DatePicker
              label="Дата рождения"
              value={field.value || null}
              onChange={(date) => field.onChange(date ?? '')}
              slotProps={{
                textField: {
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                  fullWidth: true,
                },
              }}
            />
          )}
        />

        <Controller
          name="favorite_food_ids"
          control={form.control}
          render={({ field, fieldState }) => (
            <Select
              label="Любимая еда"
              options={foodOptions}
              value={foodOptions.filter((opt) => field.value?.includes(opt.id))}
              onChange={(_, value) => field.onChange(value.map((v) => v.id))}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="upload_photo"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              type="file"
              label="Фото"
              onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
              inputProps={{ accept: 'image/*' }}
            />
          )}
        />

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isUpdate ? 'Сохранить' : 'Создать'}
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Отмена
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
