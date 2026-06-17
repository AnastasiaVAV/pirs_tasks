import { useState, useEffect, useCallback } from 'react';
import { parse, format, isValid } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Link,
  TextField,
  TableSortLabel,
  Checkbox,
  Autocomplete,
} from '@mui/material';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, DatePicker, Loader, ErrorAlert, DeleteConfirmDialog } from 'shared/ui';
import { useUsersList } from 'features/fetch-users';
import { useDeleteUser } from 'features/delete-user';
import { useFoodList } from 'features/fetch-food-list';
import { formatDateToDisplay } from 'shared/lib';

export const UsersTable = () => {
  const navigate = useNavigate();
  const {
    users,
    page,
    perPage,
    totalCount,
    filters,
    setFilter,
    toggleSort,
    getSortDirection,
    isLoading,
    isError,
    error,
  } = useUsersList();
  const { options: foodOptions } = useFoodList();

  const {
    userIdToDelete,
    requestDelete,
    confirmDelete,
    cancelDelete,
    isLoading: isDeleting,
  } = useDeleteUser();

  const [localId, setLocalId] = useState(filters.id);
  const [localUsername, setLocalUsername] = useState(filters.username);
  const [localEmail, setLocalEmail] = useState(filters.email);
  const [localBirthdateStart, setLocalBirthdateStart] = useState(filters.birthdateStart);
  const [localBirthdateEnd, setLocalBirthdateEnd] = useState(filters.birthdateEnd);
  const [localFoodIds, setLocalFoodIds] = useState<number[]>(filters.foodIds);

  const SELECT_ALL_ID = -1;
  const allFoodOptions = [{ id: SELECT_ALL_ID, label: 'Выбрать все' }, ...foodOptions];
  const allFoodSelected = foodOptions.length > 0 && localFoodIds.length === foodOptions.length;

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

  const from = totalCount > 0 ? (page - 1) * perPage + 1 : 0;
  const to = Math.min(page * perPage, totalCount);

  const getFoodNames = (ids: number[]) =>
    ids
      .map((id) => foodOptions.find((opt) => opt.id === id)?.label)
      .filter(Boolean)
      .join(', ');

  const cellSx = { border: 1, borderColor: 'divider', py: 1, px: 1 };

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <ErrorAlert
        message={
          error && typeof error === 'object' && 'message' in error
            ? String(error.message)
            : undefined
        }
      />
    );
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="success" onClick={() => void navigate('/users/create')}>
          Добавить пользователя
        </Button>
      </Box>

      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="body2" color="textSecondary">
          Показаны записи{' '}
          <b>
            {from}–{to}
          </b>{' '}
          из <b>{totalCount}</b>.
        </Typography>
      </Box>

      <Paper>
        <TableContainer>
          <Table sx={{ border: 1, borderColor: 'divider' }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.100' }}>
                <TableCell
                  sx={{
                    ...cellSx,
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textDecoration: 'underline',
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  sx={{
                    ...cellSx,
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textDecoration: 'underline',
                  }}
                >
                  <TableSortLabel
                    active={getSortDirection('id') !== false}
                    direction={getSortDirection('id') || 'asc'}
                    onClick={() => toggleSort('id')}
                    sx={{ textDecoration: 'underline', color: 'primary.main !important' }}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    ...cellSx,
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textDecoration: 'underline',
                  }}
                >
                  Фото
                </TableCell>
                <TableCell
                  sx={{
                    ...cellSx,
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textDecoration: 'underline',
                  }}
                >
                  <TableSortLabel
                    active={getSortDirection('username') !== false}
                    direction={getSortDirection('username') || 'asc'}
                    onClick={() => toggleSort('username')}
                    sx={{ textDecoration: 'underline', color: 'primary.main !important' }}
                  >
                    Имя
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    ...cellSx,
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textDecoration: 'underline',
                  }}
                >
                  <TableSortLabel
                    active={getSortDirection('email') !== false}
                    direction={getSortDirection('email') || 'asc'}
                    onClick={() => toggleSort('email')}
                    sx={{ textDecoration: 'underline', color: 'primary.main !important' }}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    ...cellSx,
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textDecoration: 'underline',
                  }}
                >
                  <TableSortLabel
                    active={getSortDirection('birthdate') !== false}
                    direction={getSortDirection('birthdate') || 'asc'}
                    onClick={() => toggleSort('birthdate')}
                    sx={{ textDecoration: 'underline', color: 'primary.main !important' }}
                  >
                    Дата рождения
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    ...cellSx,
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textDecoration: 'underline',
                  }}
                >
                  <TableSortLabel
                    active={getSortDirection('favorite_food_ids') !== false}
                    direction={getSortDirection('favorite_food_ids') || 'asc'}
                    onClick={() => toggleSort('favorite_food_ids')}
                    sx={{ textDecoration: 'underline', color: 'primary.main !important' }}
                  >
                    Любимая еда
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    ...cellSx,
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textDecoration: 'underline',
                  }}
                />
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
                      value={
                        localBirthdateStart
                          ? parse(localBirthdateStart, 'dd.MM.yyyy', new Date())
                          : null
                      }
                      onChange={(date: Date | null) => {
                        const value = date && isValid(date) ? format(date, 'dd.MM.yyyy') : '';
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
                      value={
                        localBirthdateEnd
                          ? parse(localBirthdateEnd, 'dd.MM.yyyy', new Date())
                          : null
                      }
                      onChange={(date: Date | null) => {
                        const value = date && isValid(date) ? format(date, 'dd.MM.yyyy') : '';
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
                  <Autocomplete
                    multiple
                    size="small"
                    options={allFoodOptions}
                    value={
                      allFoodSelected
                        ? [{ id: SELECT_ALL_ID, label: 'Выбрать все' }, ...foodOptions]
                        : foodOptions.filter((opt) => localFoodIds.includes(opt.id))
                    }
                    getOptionLabel={(opt) => (opt.id === SELECT_ALL_ID ? 'Выбрать все' : opt.label)}
                    isOptionEqualToValue={(opt, val) => opt.id === val.id}
                    onChange={(_, value) => {
                      const hasSelectAll = value.some((v) => v.id === SELECT_ALL_ID);
                      if (hasSelectAll) {
                        setLocalFoodIds(foodOptions.map((o) => o.id));
                        setFilter(
                          'foodIds',
                          foodOptions.map((o) => o.id)
                        );
                      } else {
                        const ids = value.map((v) => v.id);
                        setLocalFoodIds(ids);
                        setFilter('foodIds', ids);
                      }
                    }}
                    renderOption={(props, opt) => {
                      const isChecked =
                        opt.id === SELECT_ALL_ID ? allFoodSelected : localFoodIds.includes(opt.id);
                      return (
                        <li {...props} key={opt.id}>
                          <Checkbox checked={isChecked} sx={{ mr: 1 }} />
                          {opt.label}
                        </li>
                      );
                    }}
                    renderInput={(params) => <TextField {...params} placeholder="Еда..." />}
                  />
                </TableCell>
                <TableCell sx={cellSx} />
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={user.id}
                  sx={{ bgcolor: index % 2 === 0 ? 'background.paper' : 'rgba(0, 0, 0, 0.05)' }}
                >
                  <TableCell sx={cellSx}>{index + 1}</TableCell>
                  <TableCell sx={cellSx}>{user.id}</TableCell>
                  <TableCell sx={cellSx}>
                    <Avatar
                      photoId={user.photo_id}
                      fallback={user.username}
                      style={{ width: 150, height: 150 }}
                    />
                  </TableCell>
                  <TableCell sx={cellSx}>{user.username}</TableCell>
                  <TableCell sx={cellSx}>
                    <Link href={`mailto:${user.email}`}>{user.email}</Link>
                  </TableCell>
                  <TableCell sx={cellSx}>{formatDateToDisplay(user.birthdate)}</TableCell>
                  <TableCell sx={cellSx}>{getFoodNames(user.favorite_food_ids) || '—'}</TableCell>
                  <TableCell sx={cellSx}>
                    <IconButton
                      size="small"
                      sx={{ mx: 0.25 }}
                      onClick={() => void navigate(`/users/${user.id}`)}
                      title="Просмотр"
                    >
                      <Eye size={16} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ mx: 0.25 }}
                      onClick={() => void navigate(`/users/${user.id}/edit`)}
                      title="Редактировать"
                    >
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ mx: 0.25 }}
                      color="error"
                      onClick={() => requestDelete(user.id)}
                      title="Удалить"
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    sx={{ textAlign: 'center', py: 4, border: 1, borderColor: 'divider' }}
                  >
                    Нет данных
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <DeleteConfirmDialog
        open={userIdToDelete !== null}
        message="Вы уверены, что хотите удалить пользователя?"
        isLoading={isDeleting}
        onConfirm={() => void confirmDelete()}
        onCancel={cancelDelete}
      />
    </>
  );
};
