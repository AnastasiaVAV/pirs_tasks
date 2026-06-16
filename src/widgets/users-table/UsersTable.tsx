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
} from '@mui/material';
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Loader } from 'shared/ui';
import { useUsersList } from 'features/fetch-users';
import { useDeleteUser } from 'features/delete-user';
import { formatDateToDisplay } from 'shared/lib';

export const UsersTable = () => {
  const navigate = useNavigate();
  const { users, page, perPage, totalPages, goToPage, isLoading } = useUsersList();
  const { userIdToDelete, requestDelete, isLoading: isDeleting } = useDeleteUser();

  if (isLoading) return <Loader />;

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Фото</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Дата рождения</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar photoId={user.photo_id} fallback={user.username} />
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{formatDateToDisplay(user.birthdate)}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => void navigate(`/users/${user.id}`)}>
                    <Pencil size={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => requestDelete(user.id)}
                    disabled={isDeleting && userIdToDelete === user.id}
                  >
                    <Trash2 size={16} />
                  </IconButton>
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
      />
    </Paper>
  );
};
