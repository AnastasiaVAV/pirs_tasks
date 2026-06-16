import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { UserForm } from 'widgets/user-form';
import { useGetUserByIdQuery } from 'entities/user';
import { Loader, ErrorAlert } from 'shared/ui';

const UserEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isError } = useGetUserByIdQuery(Number(id));

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
      <UserForm mode="update" user={user} />
    </Container>
  );
};

export default UserEditPage;
