import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Typography,
  Box,
} from '@mui/material';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Loader, ErrorAlert, DeleteConfirmDialog } from 'shared/ui';
import { useUsersList } from 'features/fetch-users';
import { useDeleteUser } from 'features/delete-user';
import { formatDateToDisplay } from 'shared/lib';

export const UsersTable = () => {
  const navigate = useNavigate();
  const { users, page, perPage, totalPages, goToPage, isLoading, isError, error } = useUsersList();
  const {
    userIdToDelete,
    requestDelete,
    confirmDelete,
    cancelDelete,
    isLoading: isDeleting,
  } = useDeleteUser();

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

  if (users.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="textSecondary">Пользователи не найдены</Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper>
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Фото</TableCell>
                <TableCell>Имя</TableCell>
                <TableCell>Email</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  Дата рождения
                </TableCell>
                <TableCell align="right">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Avatar photoId={user.photo_id} fallback={user.username} />
                  </TableCell>
                  <TableCell>
                    <Typography
                      component="span"
                      sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                      onClick={() => void navigate(`/users/${user.id}`)}
                    >
                      {user.username}
                    </Typography>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    {formatDateToDisplay(user.birthdate)}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
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
                        title="Редактирование"
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
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={totalPages * perPage}
          page={page - 1}
          onPageChange={(_, newPage) => goToPage(newPage + 1)}
          rowsPerPage={perPage}
          rowsPerPageOptions={[perPage]}
          labelDisplayedRows={({ from, to }) => `${from}–${to}`}
        />
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
