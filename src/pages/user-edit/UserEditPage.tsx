import { Container } from '@mui/material';
import { UserUpdateForm } from 'widgets/user-form';
import { useGetUserByIdQuery } from 'entities/user';
import { Loader, ErrorAlert, Breadcrumbs } from 'shared/ui';
import { useUserIdFromParams } from 'shared/lib';

export const UserEditPage = () => {
  const { numericId, isValid } = useUserIdFromParams();
  const { data: user, isLoading, isError } = useGetUserByIdQuery(numericId);

  if (!isValid) {
    return <ErrorAlert title="Ошибка" message="ID пользователя не указан." />;
  }

  if (isLoading) return <Loader />;

  if (isError || !user) {
    return (
      <ErrorAlert
        title="Пользователь не найден"
        message="Не удалось загрузить данные пользователя."
      />
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Breadcrumbs
        items={[
          { label: 'Пользователи', to: '/users' },
          { label: user.username, to: `/users/${numericId}` },
          { label: 'Редактирование' },
        ]}
      />
      <UserUpdateForm user={user} />
    </Container>
  );
};
