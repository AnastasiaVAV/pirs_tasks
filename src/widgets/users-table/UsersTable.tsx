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
} from '@mui/material';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Loader, ErrorAlert, DeleteConfirmDialog } from 'shared/ui';
import { useUsersList } from 'features/fetch-users';
import { useDeleteUser } from 'features/delete-user';
import { useFoodList } from 'features/fetch-food-list';
import { formatDateToDisplay } from 'shared/lib';

export const UsersTable = () => {
  const navigate = useNavigate();
  const { users, page, perPage, totalCount, isLoading, isError, error } = useUsersList();
  const { options: foodOptions } = useFoodList();
  const {
    userIdToDelete,
    requestDelete,
    confirmDelete,
    cancelDelete,
    isLoading: isDeleting,
  } = useDeleteUser();

  const from = totalCount > 0 ? (page - 1) * perPage + 1 : 0;
  const to = Math.min(page * perPage, totalCount);

  const getFoodNames = (ids: number[]) =>
    ids
      .map((id) => foodOptions.find((opt) => opt.id === id)?.label)
      .filter(Boolean)
      .join(', ');

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
      <Paper>
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Показаны записи{' '}
            <b>
              {from}–{to}
            </b>{' '}
            из <b>{totalCount}</b>.
          </Typography>
        </Box>

        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size="small" sx={{ border: 1, borderColor: 'divider' }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.100' }}>
                <TableCell sx={{ border: 1, borderColor: 'divider', fontWeight: 'bold' }}>
                  #
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: 'divider', fontWeight: 'bold' }}>
                  ID
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: 'divider', fontWeight: 'bold' }}>
                  Фото
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: 'divider', fontWeight: 'bold' }}>
                  Имя
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: 'divider', fontWeight: 'bold' }}>
                  Email
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: 'divider', fontWeight: 'bold' }}>
                  Дата рождения
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: 'divider', fontWeight: 'bold' }}>
                  Любимая еда
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: 'divider', fontWeight: 'bold' }}>
                  &nbsp;
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={user.id}
                  sx={{ bgcolor: index % 2 === 0 ? 'background.paper' : 'rgba(0, 0, 0, 0.05)' }}
                >
                  <TableCell sx={{ border: 1, borderColor: 'divider' }}>{index + 1}</TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'divider' }}>{user.id}</TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'divider' }}>
                    <Avatar photoId={user.photo_id} fallback={user.username} />
                  </TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'divider' }}>{user.username}</TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'divider' }}>
                    <Link href={`mailto:${user.email}`}>{user.email}</Link>
                  </TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'divider' }}>
                    {formatDateToDisplay(user.birthdate)}
                  </TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'divider' }}>
                    {getFoodNames(user.favorite_food_ids) || '—'}
                  </TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() => void navigate(`/users/${user.id}`)}
                        title="Просмотр"
                      >
                        <Eye size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => void navigate(`/users/${user.id}/edit`)}
                        title="Редактировать"
                      >
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => requestDelete(user.id)}
                        title="Удалить"
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    sx={{
                      textAlign: 'center',
                      py: 4,
                      border: 1,
                      borderColor: 'divider',
                    }}
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
