import { Container } from '@mui/material';
import { UserCard } from 'widgets/user-card';
import { ErrorAlert, Breadcrumbs } from 'shared/ui';
import { useUserIdFromParams } from 'shared/lib';

export const UserViewPage = () => {
  const { id, numericId, isValid } = useUserIdFromParams();

  if (!isValid) {
    return <ErrorAlert title="Ошибка" message="ID пользователя не указан." />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Breadcrumbs items={[{ label: 'Пользователи', to: '/users' }, { label: id! }]} />
      <UserCard userId={numericId} />
    </Container>
  );
};
