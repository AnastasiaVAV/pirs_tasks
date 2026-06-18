import { Container } from '@mui/material';
import { UsersTable } from 'widgets/users-table';
import { Breadcrumbs } from 'shared/ui';

const usersListBreadcrumbs = [{ label: 'Пользователи' }];

export const UsersListPage = () => {
  return (
    <Container sx={{ maxWidth: 1320, mx: 'auto', py: 3 }}>
      <Breadcrumbs items={usersListBreadcrumbs} />
      <UsersTable />
    </Container>
  );
};
