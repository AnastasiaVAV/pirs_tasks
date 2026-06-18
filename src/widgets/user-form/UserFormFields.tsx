import { useRef, useCallback } from 'react';
import { Stack, Box, Typography, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, type UseFormReturn } from 'react-hook-form';
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

  const handleReplaceClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (onChange: (value: File | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.files?.[0] ?? null);
    },
    []
  );

  const handleDateChange = useCallback(
    (onChange: (value: string) => void) => (date: Date | null) => {
      onChange(date ? format(date, 'dd.MM.yyyy') : '');
    },
    []
  );

  const handleFoodChange = useCallback(
    (onChange: (value: number[]) => void) => (ids: number[]) => {
      onChange(ids);
    },
    []
  );

  return (
    <Stack spacing={3} sx={formStackSx}>
      <Box sx={avatarBoxSx}>
        <Avatar
          photoId={avatarProps?.photoId}
          fallback={avatarProps?.fallback}
          sx={avatarFieldSx}
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
                onChange={handleFileChange(field.onChange)}
              />
              <Typography
                variant="body2"
                color="primary"
                sx={replaceLinkSx}
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
        name="email"
        control={form.control}
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
              onChange={handleDateChange(field.onChange)}
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
              onChange={handleFoodChange(field.onChange)}
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
