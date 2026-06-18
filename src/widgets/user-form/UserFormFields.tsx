import { useRef } from 'react';
import { Stack, Box, Typography, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { parse, format } from 'date-fns';
import { Avatar, MultiSelectWithAll } from 'shared/ui';
import { useFoodList } from 'features/fetch-food-list';
import { FormActions } from './FormActions';

const formStackSx = { mt: '30px' };
const avatarBoxSx = {
  display: 'flex',
  alignItems: 'center' as const,
  flexDirection: 'column' as const,
};
const avatarFieldSx = { width: 150, height: 150 };
const replaceLinkSx = {
  cursor: 'pointer' as const,
  mt: 0.5,
  '&:hover': { textDecoration: 'underline' },
};

type UserFormFieldsProps<T extends FieldValues> = {
  control: Control<T>;
  isLoading: boolean;
  avatarProps?: {
    photoId?: number | null;
    fallback?: string;
  };
};

export const UserFormFields = <T extends FieldValues>({
  control,
  isLoading,
  avatarProps,
}: UserFormFieldsProps<T>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { options: foodOptions } = useFoodList();

  return (
    <Stack spacing={3} sx={formStackSx}>
      <Box sx={avatarBoxSx}>
        <Avatar
          photoId={avatarProps?.photoId}
          fallback={avatarProps?.fallback}
          sx={avatarFieldSx}
        />
        <Controller
          name={'upload_photo' as FieldPath<T>}
          control={control}
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
                sx={replaceLinkSx}
                onClick={() => fileInputRef.current?.click()}
              >
                Заменить
              </Typography>
            </>
          )}
        />
      </Box>

      <Controller
        name={'username' as FieldPath<T>}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Имя"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name={'email' as FieldPath<T>}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Email"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name={'birthdate' as FieldPath<T>}
        control={control}
        render={({ field, fieldState }) => {
          const dateValue = field.value
            ? parse(String(field.value), 'dd.MM.yyyy', new Date())
            : null;

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
        name={'favorite_food_ids' as FieldPath<T>}
        control={control}
        render={({ field, fieldState }) => {
          const value = field.value as unknown;
          const selectedIds: number[] = (Array.isArray(value) ? value : []).filter(
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
