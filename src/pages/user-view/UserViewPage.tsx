import { Container } from '@mui/material';
import { UserCard } from 'widgets/user-card';
import { ErrorAlert, Breadcrumbs } from 'shared/ui';
import { useUserIdFromParams } from 'shared/lib';

const userViewBaseBreadcrumbs = [{ label: 'Пользователи', to: '/users' }];

export const UserViewPage = () => {
  const { id, numericId, isValid } = useUserIdFromParams();

  if (!isValid) {
    return <ErrorAlert title="Ошибка" message="ID пользователя не указан." />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Breadcrumbs items={[...userViewBaseBreadcrumbs, { label: id! }]} />
      <UserCard userId={numericId} />
    </Container>
  );
};
