import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { UserCard } from 'widgets/user-card';
import { ErrorAlert } from 'shared/ui';

const UserViewPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <ErrorAlert title="Ошибка" message="ID пользователя не указан." />;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <UserCard userId={Number(id)} />
    </Container>
  );
};

export default UserViewPage;
