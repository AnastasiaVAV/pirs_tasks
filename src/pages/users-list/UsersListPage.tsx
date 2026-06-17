import { Container } from '@mui/material';
import { UsersTable } from 'widgets/users-table';
import { Breadcrumbs } from 'shared/ui';

export const UsersListPage = () => {
  return (
    <Container sx={{ py: 3 }}>
      <Breadcrumbs items={[{ label: 'Пользователи' }]} />
      <UsersTable />
    </Container>
  );
};
