import { Checkbox, TextField, Autocomplete } from '@mui/material';
import type { SelectOption } from '../SelectOption';

const SELECT_ALL_ID = -1;

type MultiSelectWithAllProps = {
  options: SelectOption[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
};

export const MultiSelectWithAll = ({
  options,
  selectedIds,
  onChange,
  label,
  placeholder = 'Еда...',
  error,
  helperText,
}: MultiSelectWithAllProps) => {
  const selectedIdSet = new Set(selectedIds);
  const allOptions = [{ id: SELECT_ALL_ID, label: 'Выбрать все' }, ...options];
  const allSelected = options.length > 0 && selectedIds.length === options.length;

  const selectedOptions = options.filter((opt) => selectedIdSet.has(opt.id));

  return (
    <Autocomplete
      multiple
      options={allOptions}
      value={
        allSelected ? [{ id: SELECT_ALL_ID, label: 'Выбрать все' }, ...options] : selectedOptions
      }
      getOptionLabel={(opt) => (opt.id === SELECT_ALL_ID ? 'Выбрать все' : opt.label)}
      isOptionEqualToValue={(opt, val) => opt.id === val.id}
      onChange={(_, value) => {
        const hasSelectAll = value.some((v) => v.id === SELECT_ALL_ID);
        if (hasSelectAll) {
          onChange(options.map((o) => o.id));
        } else {
          onChange(value.map((v) => v.id));
        }
      }}
      renderOption={(props, opt) => {
        const isChecked = opt.id === SELECT_ALL_ID ? allSelected : selectedIdSet.has(opt.id);
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
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};
