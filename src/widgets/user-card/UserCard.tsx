import { Card, CardContent, CardActions, Typography, Stack, Chip } from '@mui/material';
import { Pencil, Trash2, ArrowLeft } from 'lucide-react';
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
  } = useDeleteUser(() => navigate('/users'));

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

  const favoriteFood = foodOptions.filter((opt) => user.favorite_food_ids?.includes(opt.id));

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Avatar
              photoId={user.photo_id}
              fallback={user.username}
              sx={{ width: 120, height: 120 }}
            />
            <Typography variant="h5">{user.username}</Typography>
            <Typography color="textSecondary">{user.email}</Typography>
            <Typography>Дата рождения: {formatDateToDisplay(user.birthdate)}</Typography>

            {favoriteFood.length > 0 && (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {favoriteFood.map((food) => (
                  <Chip key={food.id} label={food.label} />
                ))}
              </Stack>
            )}
          </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Button startIcon={<ArrowLeft />} onClick={() => navigate('/users')}>
            Назад
          </Button>
          <Button
            startIcon={<Pencil />}
            variant="contained"
            onClick={() => navigate(`/users/${userId}/edit`)}
          >
            Редактировать
          </Button>
          <Button
            startIcon={<Trash2 />}
            variant="outlined"
            color="error"
            onClick={() => requestDelete(userId)}
          >
            Удалить
          </Button>
        </CardActions>
      </Card>

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
