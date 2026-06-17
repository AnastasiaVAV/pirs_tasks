import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { UserForm } from 'widgets/user-form';
import { useGetUserByIdQuery } from 'entities/user';
import { Loader, ErrorAlert, Breadcrumbs } from 'shared/ui';

export const UserEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const isValidId = id !== undefined && !Number.isNaN(numericId);

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery(numericId);

  if (!isValidId) {
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
        items={[{ label: 'Пользователи', to: '/users' }, { label: `Редактирование #${id}` }]}
      />
      <UserForm mode="update" user={user} />
    </Container>
  );
};
