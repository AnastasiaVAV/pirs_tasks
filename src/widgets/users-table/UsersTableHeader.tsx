import { useReducer, useEffect } from 'react';
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
import { parseDateStr, formatDateStr, DISPLAY_FORMAT } from 'shared/lib';
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

const localFiltersReducer = (state: UserFilters, action: Partial<UserFilters>): UserFilters => ({
  ...state,
  ...action,
});

export const UsersTableHeader = ({
  filters,
  setFilter,
  getSortDirection,
  toggleSort,
  foodOptions,
}: UsersTableHeaderProps) => {
  const [local, dispatch] = useReducer(localFiltersReducer, filters);

  useEffect(() => {
    dispatch(filters);
  }, [filters]);

  const idDir = getSortDirection('id');
  const usernameDir = getSortDirection('username');
  const emailDir = getSortDirection('email');
  const birthdateDir = getSortDirection('birthdate');
  const foodDir = getSortDirection('favorite_food_ids');

  const handleFilterEnter = <K extends keyof UserFilters>(key: K) => {
    setFilter(key, local[key]);
  };

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
            value={local.id}
            onChange={(e) => dispatch({ id: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleFilterEnter('id');
            }}
            onBlur={() => setFilter('id', local.id)}
          />
        </TableCell>
        <TableCell sx={cellSx} />
        <TableCell sx={cellSx}>
          <TextField
            size="small"
            fullWidth
            placeholder="Фильтр..."
            value={local.username}
            onChange={(e) => dispatch({ username: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleFilterEnter('username');
            }}
            onBlur={() => setFilter('username', local.username)}
          />
        </TableCell>
        <TableCell sx={cellSx}>
          <TextField
            size="small"
            fullWidth
            placeholder="Фильтр..."
            value={local.email}
            onChange={(e) => dispatch({ email: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleFilterEnter('email');
            }}
            onBlur={() => setFilter('email', local.email)}
          />
        </TableCell>
        <TableCell sx={cellSx}>
          <Box sx={filterBoxSx}>
            <DatePicker
              format={DISPLAY_FORMAT}
              value={parseDateStr(local.birthdateStart)}
              onChange={(date: Date | null) => {
                const value = formatDateStr(date);
                dispatch({ birthdateStart: value });
                setFilter('birthdateStart', value);
              }}
              slotProps={datePickerSlotProps}
            />
            <Typography sx={dashSx}>—</Typography>
            <DatePicker
              format={DISPLAY_FORMAT}
              value={parseDateStr(local.birthdateEnd)}
              onChange={(date: Date | null) => {
                const value = formatDateStr(date);
                dispatch({ birthdateEnd: value });
                setFilter('birthdateEnd', value);
              }}
              slotProps={datePickerSlotProps}
            />
          </Box>
        </TableCell>
        <TableCell sx={filterCellSx}>
          <MultiSelectWithAll
            options={foodOptions}
            selectedIds={local.foodIds}
            onChange={(ids) => {
              dispatch({ foodIds: ids });
              setFilter('foodIds', ids);
            }}
          />
        </TableCell>
        <TableCell sx={cellSx} />
      </TableRow>
    </TableHead>
  );
};
