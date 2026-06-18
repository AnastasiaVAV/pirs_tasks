import { useCallback, useState, useEffect } from 'react';
import {
  TableRow,
  TableCell,
  TextField,
  TableSortLabel,
  TableHead,
  Box,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  cellSx,
  headerCellSx,
  filterCellSx,
  sortLabelSx,
  filterBoxSx,
  datePickerSlotProps,
  MultiSelectWithAll,
} from 'shared/ui';
import { parseDateStr, formatDateStr } from 'shared/lib';
import type { SelectOption } from 'shared/ui';
import type { UserFilters, SortField } from 'features/fetch-users';

type UsersTableHeaderProps = {
  filters: UserFilters;
  setFilter: <K extends keyof UserFilters>(key: K, value: UserFilters[K]) => void;
  getSortDirection: (field: SortField) => 'asc' | 'desc' | false;
  toggleSort: (field: SortField) => void;
  foodOptions: SelectOption[];
};

export const UsersTableHeader = ({
  filters,
  setFilter,
  getSortDirection,
  toggleSort,
  foodOptions,
}: UsersTableHeaderProps) => {
  const [localId, setLocalId] = useState(filters.id);
  const [localUsername, setLocalUsername] = useState(filters.username);
  const [localEmail, setLocalEmail] = useState(filters.email);
  const [localBirthdateStart, setLocalBirthdateStart] = useState(filters.birthdateStart);
  const [localBirthdateEnd, setLocalBirthdateEnd] = useState(filters.birthdateEnd);
  const [localFoodIds, setLocalFoodIds] = useState<number[]>(filters.foodIds);

  useEffect(() => {
    setLocalId(filters.id);
    setLocalUsername(filters.username);
    setLocalEmail(filters.email);
    setLocalBirthdateStart(filters.birthdateStart);
    setLocalBirthdateEnd(filters.birthdateEnd);
    setLocalFoodIds(filters.foodIds);
  }, [filters]);

  const commitId = useCallback(() => setFilter('id', localId), [setFilter, localId]);
  const commitUsername = useCallback(
    () => setFilter('username', localUsername),
    [setFilter, localUsername]
  );
  const commitEmail = useCallback(() => setFilter('email', localEmail), [setFilter, localEmail]);

  const handleSortId = useCallback(() => toggleSort('id'), [toggleSort]);
  const handleSortUsername = useCallback(() => toggleSort('username'), [toggleSort]);
  const handleSortEmail = useCallback(() => toggleSort('email'), [toggleSort]);
  const handleSortBirthdate = useCallback(() => toggleSort('birthdate'), [toggleSort]);
  const handleSortFood = useCallback(() => toggleSort('favorite_food_ids'), [toggleSort]);

  const handleIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setLocalId(e.target.value),
    []
  );
  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setLocalUsername(e.target.value),
    []
  );
  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setLocalEmail(e.target.value),
    []
  );

  const handleBirthdateStartChange = useCallback(
    (date: Date | null) => {
      const value = formatDateStr(date);
      setLocalBirthdateStart(value);
      setFilter('birthdateStart', value);
    },
    [setFilter]
  );
  const handleBirthdateEndChange = useCallback(
    (date: Date | null) => {
      const value = formatDateStr(date);
      setLocalBirthdateEnd(value);
      setFilter('birthdateEnd', value);
    },
    [setFilter]
  );
  const handleFoodIdsChange = useCallback(
    (ids: number[]) => {
      setLocalFoodIds(ids);
      setFilter('foodIds', ids);
    },
    [setFilter]
  );

  const headerRowSx = { bgcolor: 'grey.100' };
  const dashSx = { mx: 0.5, flexShrink: 0 };

  return (
    <TableHead>
      <TableRow sx={headerRowSx}>
        <TableCell sx={headerCellSx}>#</TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={getSortDirection('id') !== false}
            direction={getSortDirection('id') || 'asc'}
            onClick={handleSortId}
            sx={sortLabelSx}
          >
            ID
          </TableSortLabel>
        </TableCell>
        <TableCell sx={headerCellSx}>Фото</TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={getSortDirection('username') !== false}
            direction={getSortDirection('username') || 'asc'}
            onClick={handleSortUsername}
            sx={sortLabelSx}
          >
            Имя
          </TableSortLabel>
        </TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={getSortDirection('email') !== false}
            direction={getSortDirection('email') || 'asc'}
            onClick={handleSortEmail}
            sx={sortLabelSx}
          >
            Email
          </TableSortLabel>
        </TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={getSortDirection('birthdate') !== false}
            direction={getSortDirection('birthdate') || 'asc'}
            onClick={handleSortBirthdate}
            sx={sortLabelSx}
          >
            Дата рождения
          </TableSortLabel>
        </TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={getSortDirection('favorite_food_ids') !== false}
            direction={getSortDirection('favorite_food_ids') || 'asc'}
            onClick={handleSortFood}
            sx={sortLabelSx}
          >
            Любимая еда
          </TableSortLabel>
        </TableCell>
        <TableCell sx={headerCellSx} />
      </TableRow>
      <TableRow>
        <TableCell sx={cellSx} />
        <TableCell sx={cellSx}>
          <TextField
            size="small"
            fullWidth
            placeholder="Фильтр..."
            value={localId}
            onChange={handleIdChange}
            onBlur={commitId}
          />
        </TableCell>
        <TableCell sx={cellSx} />
        <TableCell sx={cellSx}>
          <TextField
            size="small"
            fullWidth
            placeholder="Фильтр..."
            value={localUsername}
            onChange={handleUsernameChange}
            onBlur={commitUsername}
          />
        </TableCell>
        <TableCell sx={cellSx}>
          <TextField
            size="small"
            fullWidth
            placeholder="Фильтр..."
            value={localEmail}
            onChange={handleEmailChange}
            onBlur={commitEmail}
          />
        </TableCell>
        <TableCell sx={cellSx}>
          <Box sx={filterBoxSx}>
            <DatePicker
              format="dd.MM.yyyy"
              value={parseDateStr(localBirthdateStart)}
              onChange={handleBirthdateStartChange}
              slotProps={datePickerSlotProps}
            />
            <Typography sx={dashSx}>—</Typography>
            <DatePicker
              format="dd.MM.yyyy"
              value={parseDateStr(localBirthdateEnd)}
              onChange={handleBirthdateEndChange}
              slotProps={datePickerSlotProps}
            />
          </Box>
        </TableCell>
        <TableCell sx={filterCellSx}>
          <MultiSelectWithAll
            options={foodOptions}
            selectedIds={localFoodIds}
            onChange={handleFoodIdsChange}
          />
        </TableCell>
        <TableCell sx={cellSx} />
      </TableRow>
    </TableHead>
  );
};
