import { useState, useEffect } from 'react';
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

const headerRowSx = { bgcolor: 'grey.100' };
const dashSx = { mx: 0.5, flexShrink: 0 };

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

  const idDir = getSortDirection('id');
  const usernameDir = getSortDirection('username');
  const emailDir = getSortDirection('email');
  const birthdateDir = getSortDirection('birthdate');
  const foodDir = getSortDirection('favorite_food_ids');

  return (
    <TableHead>
      <TableRow sx={headerRowSx}>
        <TableCell sx={headerCellSx}>#</TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={idDir !== false}
            direction={idDir || 'asc'}
            onClick={() => toggleSort('id')}
            sx={sortLabelSx}
          >
            ID
          </TableSortLabel>
        </TableCell>
        <TableCell sx={headerCellSx}>Фото</TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={usernameDir !== false}
            direction={usernameDir || 'asc'}
            onClick={() => toggleSort('username')}
            sx={sortLabelSx}
          >
            Имя
          </TableSortLabel>
        </TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={emailDir !== false}
            direction={emailDir || 'asc'}
            onClick={() => toggleSort('email')}
            sx={sortLabelSx}
          >
            Email
          </TableSortLabel>
        </TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={birthdateDir !== false}
            direction={birthdateDir || 'asc'}
            onClick={() => toggleSort('birthdate')}
            sx={sortLabelSx}
          >
            Дата рождения
          </TableSortLabel>
        </TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={foodDir !== false}
            direction={foodDir || 'asc'}
            onClick={() => toggleSort('favorite_food_ids')}
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
            onChange={(e) => setLocalId(e.target.value)}
            onBlur={() => setFilter('id', localId)}
          />
        </TableCell>
        <TableCell sx={cellSx} />
        <TableCell sx={cellSx}>
          <TextField
            size="small"
            fullWidth
            placeholder="Фильтр..."
            value={localUsername}
            onChange={(e) => setLocalUsername(e.target.value)}
            onBlur={() => setFilter('username', localUsername)}
          />
        </TableCell>
        <TableCell sx={cellSx}>
          <TextField
            size="small"
            fullWidth
            placeholder="Фильтр..."
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
            onBlur={() => setFilter('email', localEmail)}
          />
        </TableCell>
        <TableCell sx={cellSx}>
          <Box sx={filterBoxSx}>
            <DatePicker
              format="dd.MM.yyyy"
              value={parseDateStr(localBirthdateStart)}
              onChange={(date: Date | null) => {
                const value = formatDateStr(date);
                setLocalBirthdateStart(value);
                setFilter('birthdateStart', value);
              }}
              slotProps={datePickerSlotProps}
            />
            <Typography sx={dashSx}>—</Typography>
            <DatePicker
              format="dd.MM.yyyy"
              value={parseDateStr(localBirthdateEnd)}
              onChange={(date: Date | null) => {
                const value = formatDateStr(date);
                setLocalBirthdateEnd(value);
                setFilter('birthdateEnd', value);
              }}
              slotProps={datePickerSlotProps}
            />
          </Box>
        </TableCell>
        <TableCell sx={filterCellSx}>
          <MultiSelectWithAll
            options={foodOptions}
            selectedIds={localFoodIds}
            onChange={(ids) => {
              setLocalFoodIds(ids);
              setFilter('foodIds', ids);
            }}
          />
        </TableCell>
        <TableCell sx={cellSx} />
      </TableRow>
    </TableHead>
  );
};
