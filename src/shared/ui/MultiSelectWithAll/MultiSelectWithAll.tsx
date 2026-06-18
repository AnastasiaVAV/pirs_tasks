import { useCallback, useMemo } from 'react';
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

const selectAllOption = { id: SELECT_ALL_ID, label: 'Выбрать все' };

export const MultiSelectWithAll = ({
  options,
  selectedIds,
  onChange,
  label,
  placeholder = 'Еда...',
  error,
  helperText,
}: MultiSelectWithAllProps) => {
  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const allOptions = useMemo(() => [selectAllOption, ...options], [options]);
  const allSelected = options.length > 0 && selectedIds.length === options.length;

  const selectedOptions = useMemo(
    () => options.filter((opt) => selectedIdSet.has(opt.id)),
    [options, selectedIdSet]
  );

  const getOptionLabel = useCallback(
    (opt: SelectOption) => (opt.id === SELECT_ALL_ID ? 'Выбрать все' : opt.label),
    []
  );

  const isOptionEqualToValue = useCallback(
    (opt: SelectOption, val: SelectOption) => opt.id === val.id,
    []
  );

  const handleAutocompleteChange = useCallback(
    (_: unknown, value: SelectOption[]) => {
      const hasSelectAll = value.some((v) => v.id === SELECT_ALL_ID);
      if (hasSelectAll) {
        onChange(options.map((o) => o.id));
      } else {
        onChange(value.map((v) => v.id));
      }
    },
    [onChange, options]
  );

  const renderOption = useCallback(
    (props: React.HTMLAttributes<HTMLLIElement>, opt: SelectOption) => {
      const isChecked = opt.id === SELECT_ALL_ID ? allSelected : selectedIdSet.has(opt.id);
      return (
        <li {...props} key={opt.id}>
          <Checkbox checked={isChecked} sx={{ mr: 1 }} />
          {opt.label}
        </li>
      );
    },
    [allSelected, selectedIdSet]
  );

  const renderInput = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (params: any) => (
      <TextField
        {...params}
        label={label}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
      />
    ),
    [label, placeholder, error, helperText]
  );

  return (
    <Autocomplete
      multiple
      options={allOptions}
      value={allSelected ? [selectAllOption, ...options] : selectedOptions}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      onChange={handleAutocompleteChange}
      renderOption={renderOption}
      renderInput={renderInput}
    />
  );
};
