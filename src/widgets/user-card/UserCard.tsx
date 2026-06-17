import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Avatar, Loader, ErrorAlert, DeleteConfirmDialog } from 'shared/ui';
import { useGetUserByIdQuery } from 'entities/user';
import { useDeleteUser } from 'features/delete-user';
import { useFoodList } from 'features/fetch-food-list';
import { formatDateToDisplay, extractErrorMessage, resolveFoodNames } from 'shared/lib';

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
    return <ErrorAlert message={extractErrorMessage(error)} />;
  }

  if (!user) {
    return (
      <Typography color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
        Пользователь не найден
      </Typography>
    );
  }

  const favoriteFood = resolveFoodNames(user.favorite_food_ids ?? [], foodOptions);

  const labelSx = { border: 1, borderColor: 'divider', py: 1.5, fontWeight: 'bold', width: 200 };
  const valueSx = { border: 1, borderColor: 'divider', py: 1.5 };

  const rows = [
    { label: 'ID', value: user.id },
    { label: 'Имя', value: user.username },
    {
      label: 'Email',
      value: <a href={`mailto:${user.email}`}>{user.email}</a>,
    },
    { label: 'Дата рождения', value: formatDateToDisplay(user.birthdate) },
    { label: 'Любимая еда', value: favoriteFood || '—' },
    {
      label: 'Фото',
      value: (
        <Avatar photoId={user.photo_id} fallback={user.username} sx={{ width: 150, height: 150 }} />
      ),
    },
  ];

  return (
    <>
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <Button variant="contained" onClick={() => void navigate(`/users/${userId}/edit`)}>
          Изменить
        </Button>
        <Button variant="outlined" color="error" onClick={() => requestDelete(userId)}>
          Удалить
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ border: 1, borderColor: 'divider' }}>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.label}
                sx={{
                  bgcolor: index % 2 === 0 ? 'background.paper' : 'action.hover',
                }}
              >
                <TableCell sx={labelSx}>{row.label}</TableCell>
                <TableCell sx={valueSx}>{row.value}</TableCell>
              </TableRow>
            ))}
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
