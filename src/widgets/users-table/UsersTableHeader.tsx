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
import { DatePicker, cellSx, headerCellSx } from 'shared/ui';
import { MultiSelectWithAll } from 'shared/ui';
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

  return (
    <TableHead>
      <TableRow sx={{ bgcolor: 'grey.100' }}>
        <TableCell sx={headerCellSx}>#</TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={getSortDirection('id') !== false}
            direction={getSortDirection('id') || 'asc'}
            onClick={() => toggleSort('id')}
            sx={{ textDecoration: 'underline', color: 'primary.main !important' }}
          >
            ID
          </TableSortLabel>
        </TableCell>
        <TableCell sx={headerCellSx}>Фото</TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={getSortDirection('username') !== false}
            direction={getSortDirection('username') || 'asc'}
            onClick={() => toggleSort('username')}
            sx={{ textDecoration: 'underline', color: 'primary.main !important' }}
          >
            Имя
          </TableSortLabel>
        </TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={getSortDirection('email') !== false}
            direction={getSortDirection('email') || 'asc'}
            onClick={() => toggleSort('email')}
            sx={{ textDecoration: 'underline', color: 'primary.main !important' }}
          >
            Email
          </TableSortLabel>
        </TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={getSortDirection('birthdate') !== false}
            direction={getSortDirection('birthdate') || 'asc'}
            onClick={() => toggleSort('birthdate')}
            sx={{ textDecoration: 'underline', color: 'primary.main !important' }}
          >
            Дата рождения
          </TableSortLabel>
        </TableCell>
        <TableCell sx={headerCellSx}>
          <TableSortLabel
            active={getSortDirection('favorite_food_ids') !== false}
            direction={getSortDirection('favorite_food_ids') || 'asc'}
            onClick={() => toggleSort('favorite_food_ids')}
            sx={{ textDecoration: 'underline', color: 'primary.main !important' }}
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
            onChange={(e) => setLocalUsername(e.target.value)}
            onBlur={commitUsername}
          />
        </TableCell>
        <TableCell sx={cellSx}>
          <TextField
            size="small"
            fullWidth
            placeholder="Фильтр..."
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
            onBlur={commitEmail}
          />
        </TableCell>
        <TableCell sx={cellSx}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DatePicker
              format="dd.MM.yyyy"
              value={parseDateStr(localBirthdateStart)}
              onChange={(date: Date | null) => {
                const value = formatDateStr(date);
                setLocalBirthdateStart(value);
                setFilter('birthdateStart', value);
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  sx: { width: 150 },
                },
              }}
            />
            <Typography sx={{ mx: 0.5, flexShrink: 0 }}>—</Typography>
            <DatePicker
              format="dd.MM.yyyy"
              value={parseDateStr(localBirthdateEnd)}
              onChange={(date: Date | null) => {
                const value = formatDateStr(date);
                setLocalBirthdateEnd(value);
                setFilter('birthdateEnd', value);
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  sx: { width: 150 },
                },
              }}
            />
          </Box>
        </TableCell>
        <TableCell sx={{ ...cellSx, minWidth: 200 }}>
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
