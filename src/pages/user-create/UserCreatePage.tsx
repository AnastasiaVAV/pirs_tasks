import { Container } from '@mui/material';
import { UserCreateForm } from 'widgets/user-form';
import { Breadcrumbs } from 'shared/ui';

export const UserCreatePage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Breadcrumbs items={[{ label: 'Пользователи', to: '/users' }, { label: 'Создание' }]} />
      <UserCreateForm />
    </Container>
  );
};
