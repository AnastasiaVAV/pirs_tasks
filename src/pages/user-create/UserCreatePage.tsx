import { Container } from '@mui/material';
import { UserForm } from 'widgets/user-form';
import { Breadcrumbs } from 'shared/ui';

const UserCreatePage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Breadcrumbs items={[{ label: 'Пользователи', to: '/users' }, { label: 'Создание' }]} />
      <UserForm mode="create" />
    </Container>
  );
};

export default UserCreatePage;
