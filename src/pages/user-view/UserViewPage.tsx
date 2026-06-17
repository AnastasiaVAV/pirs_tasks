import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { UserCard } from 'widgets/user-card';
import { ErrorAlert, Breadcrumbs } from 'shared/ui';

export const UserViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  if (!id || Number.isNaN(numericId)) {
    return <ErrorAlert title="Ошибка" message="ID пользователя не указан." />;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Breadcrumbs
        items={[{ label: 'Пользователи', to: '/users' }, { label: `Просмотр #${id}` }]}
      />
      <UserCard userId={numericId} />
    </Container>
  );
};
