import { useRef } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { parse, format } from 'date-fns';
import { Input, DatePicker, Avatar } from 'shared/ui';
import { MultiSelectWithAll } from 'shared/ui';
import { useFoodList } from 'features/fetch-food-list';
import { FormActions } from './FormActions';

type UserFormFieldsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  isLoading: boolean;
  avatarProps?: {
    photoId?: number | null;
    fallback?: string;
  };
};

export const UserFormFields = ({ form, isLoading, avatarProps }: UserFormFieldsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { options: foodOptions } = useFoodList();

  const handleReplaceClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Stack spacing={3} sx={{ mt: '30px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Avatar
          photoId={avatarProps?.photoId}
          fallback={avatarProps?.fallback}
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          const selectedIds: number[] = (field.value ?? []).filter(
            (v: unknown): v is number => v != null
          );

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
  );
};
