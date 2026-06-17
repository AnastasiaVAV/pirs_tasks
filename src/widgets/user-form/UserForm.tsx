import { useCallback, useRef } from 'react';
import { Stack, Typography, Box, Checkbox, Autocomplete, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { Input, Button, DatePicker, Avatar } from 'shared/ui';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createForm = useCreateUserForm(() => {
    void navigate('/users');
  });
  const updateForm = useUpdateUserForm(props.mode === 'update' ? props.user : ({} as User), () => {
    void navigate(props.mode === 'update' ? `/users/${props.user.id}` : '/users');
  });

  const isUpdate = props.mode === 'update';
  const { form, onSubmit, isLoading } = isUpdate ? updateForm : createForm;

  const handleReplaceClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
      <Stack spacing={3} sx={{ mt: '30px' }}>
        {isUpdate && (
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Avatar
              photoId={props.user.photo_id}
              fallback={props.user.username}
              sx={{ width: 150, height: 150 }}
            />
            <Controller
              name="upload_photo"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
                  />
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: 'pointer', mt: 0.5, '&:hover': { textDecoration: 'underline' } }}
                    onClick={handleReplaceClick}
                  >
                    Заменить
                  </Typography>
                </>
              )}
            />
          </Box>
        )}

        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label="Имя"
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
              onChange={(date: string | null) => field.onChange(date ?? '')}
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
          render={({ field, fieldState }) => {
            const selectedIds: number[] = (field.value ?? []).filter((v): v is number => v != null);
            const allSelected = foodOptions.length > 0 && selectedIds.length === foodOptions.length;

            const SELECT_ALL_ID = -1;

            const allOptions = [{ id: SELECT_ALL_ID, label: 'Выбрать все' }, ...foodOptions];

            const selectedOptions = foodOptions.filter((opt) => selectedIds.includes(opt.id));

            return (
              <Autocomplete
                multiple
                options={allOptions}
                value={
                  allSelected
                    ? [{ id: SELECT_ALL_ID, label: 'Выбрать все' }, ...foodOptions]
                    : selectedOptions
                }
                getOptionLabel={(opt) => (opt.id === SELECT_ALL_ID ? 'Выбрать все' : opt.label)}
                isOptionEqualToValue={(opt, val) => opt.id === val.id}
                onChange={(_, value) => {
                  const hasSelectAll = value.some((v) => v.id === SELECT_ALL_ID);
                  if (hasSelectAll) {
                    field.onChange(foodOptions.map((o) => o.id));
                  } else {
                    field.onChange(value.map((v) => v.id));
                  }
                }}
                renderOption={(props, opt) => {
                  const isChecked =
                    opt.id === SELECT_ALL_ID ? allSelected : selectedIds.includes(opt.id);
                  return (
                    <li {...props} key={opt.id}>
                      <Checkbox checked={isChecked} sx={{ mr: 1 }} />
                      {opt.label}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Любимая еда"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            );
          }}
        />

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" color="success" disabled={isLoading}>
            {isUpdate ? 'Сохранить' : 'Создать'}
          </Button>
          <Button variant="outlined" onClick={() => void navigate(-1)}>
            Отмена
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
