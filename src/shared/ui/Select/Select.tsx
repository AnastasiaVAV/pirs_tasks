import { Autocomplete, TextField, Chip } from '@mui/material';
import type { AutocompleteProps } from '@mui/material';

export type SelectOption = {
  id: number;
  label: string;
};

export type SelectProps<T extends SelectOption> = Omit<
  AutocompleteProps<T, true, false, false>,
  'renderInput' | 'getOptionLabel' | 'getOptionSelected'
> & {
  label?: string;
  error?: boolean;
  helperText?: string;
};

export const Select = <T extends SelectOption>({
  label,
  error,
  helperText,
  ...props
}: SelectProps<T>) => {
  return (
    <Autocomplete<T, true, false, false>
      {...props}
      multiple
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderTags={(value: T[], getTagProps: (params: { index: number }) => object) =>
        value.map((option: T, index: number) => (
          <Chip {...getTagProps({ index })} key={option.id} label={option.label} size="small" />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label={label} error={error} helperText={helperText} />
      )}
    />
  );
};
