import { useRef } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { parse, format } from 'date-fns';
import { Input, DatePicker, Avatar } from 'shared/ui';
import { MultiSelectWithAll } from 'shared/ui';
import { useUpdateUserForm } from 'features/update-user';
import { useFoodList } from 'features/fetch-food-list';
import type { User } from 'entities/user';
import { FormActions } from './FormActions';

type UserUpdateFormProps = {
  user: User;
  onSuccess?: () => void;
};

export const UserUpdateForm = ({ user, onSuccess }: UserUpdateFormProps) => {
  const navigate = useNavigate();
  const { options: foodOptions } = useFoodList();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { form, onSubmit, isLoading } = useUpdateUserForm(user, () => {
    void navigate(`/users/${user.id}`);
    onSuccess?.();
  });

  const handleReplaceClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={(e) => void form.handleSubmit(onSubmit as never)(e)}>
      <Stack spacing={3} sx={{ mt: '30px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar
            photoId={user.photo_id}
            fallback={user.username}
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
          render={({ field, fieldState }) => {
            const dateValue = field.value ? parse(field.value, 'dd.MM.yyyy', new Date()) : null;

            return (
              <DatePicker
                format="dd.MM.yyyy"
                label="Дата рождения"
                value={dateValue}
                onChange={(date: Date | null) =>
                  field.onChange(date ? format(date, 'dd.MM.yyyy') : '')
                }
                slotProps={{
                  textField: {
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                    fullWidth: true,
                  },
                }}
              />
            );
          }}
        />

        <Controller
          name="favorite_food_ids"
          control={form.control}
          render={({ field, fieldState }) => {
            const selectedIds: number[] = (field.value ?? []).filter((v): v is number => v != null);

            return (
              <MultiSelectWithAll
                options={foodOptions}
                selectedIds={selectedIds}
                onChange={(ids) => field.onChange(ids)}
                label="Любимая еда"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            );
          }}
        />

        <FormActions isLoading={isLoading} />
      </Stack>
    </form>
  );
};
