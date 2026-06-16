import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Loader, ErrorAlert, DeleteConfirmDialog } from 'shared/ui';
import { useGetUserByIdQuery } from 'entities/user';
import { useDeleteUser } from 'features/delete-user';
import { useFoodList } from 'features/fetch-food-list';
import { formatDateToDisplay } from 'shared/lib';

type UserCardProps = {
  userId: number;
};

export const UserCard = ({ userId }: UserCardProps) => {
  const navigate = useNavigate();
  const { data: user, isLoading, isError, error } = useGetUserByIdQuery(userId);
  const { options: foodOptions } = useFoodList();
  const {
    requestDelete,
    confirmDelete,
    cancelDelete,
    userIdToDelete,
    isLoading: isDeleting,
  } = useDeleteUser(() => {
    void navigate('/users');
  });

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

  if (!user) {
    return (
      <Typography color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
        Пользователь не найден
      </Typography>
    );
  }

  const favoriteFood = foodOptions
    .filter((opt) => user.favorite_food_ids?.includes(opt.id))
    .map((opt) => opt.label)
    .join(', ');

  const cellSx = { border: 1, borderColor: 'divider', py: 1.5 };

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Button
          startIcon={<Pencil />}
          variant="contained"
          onClick={() => void navigate(`/users/${userId}/edit`)}
        >
          Изменить
        </Button>
        <Button
          startIcon={<Trash2 />}
          variant="outlined"
          color="error"
          onClick={() => requestDelete(userId)}
        >
          Удалить
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ border: 1, borderColor: 'divider' }}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ ...cellSx, fontWeight: 'bold', width: 200, bgcolor: 'grey.50' }}>
                ID
              </TableCell>
              <TableCell sx={cellSx}>{user.id}</TableCell>
              <TableCell sx={cellSx} rowSpan={6} align="center" verticalAlign="top">
                <Avatar
                  photoId={user.photo_id}
                  fallback={user.username}
                  sx={{ width: 120, height: 120 }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ ...cellSx, fontWeight: 'bold', bgcolor: 'grey.50' }}>Имя</TableCell>
              <TableCell sx={cellSx}>{user.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ ...cellSx, fontWeight: 'bold', bgcolor: 'grey.50' }}>
                Email
              </TableCell>
              <TableCell sx={cellSx}>{user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ ...cellSx, fontWeight: 'bold', bgcolor: 'grey.50' }}>
                Дата рождения
              </TableCell>
              <TableCell sx={cellSx}>{formatDateToDisplay(user.birthdate)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ ...cellSx, fontWeight: 'bold', bgcolor: 'grey.50' }}>
                Любимая еда
              </TableCell>
              <TableCell sx={cellSx}>{favoriteFood || '—'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ ...cellSx, fontWeight: 'bold', bgcolor: 'grey.50' }}>Фото</TableCell>
              <TableCell sx={cellSx}>{user.photo_id ? 'Загружено' : 'Нет'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

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
