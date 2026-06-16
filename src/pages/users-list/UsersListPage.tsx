import { Container, Typography } from '@mui/material';
import { UsersTable } from 'widgets/users-table';
import { Breadcrumbs } from 'shared/ui';

const UsersListPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Breadcrumbs items={[{ label: 'Пользователи' }]} />
      <Typography variant="h4" mb={3}>
        Пользователи
      </Typography>
      <UsersTable />
    </Container>
  );
};

export default UsersListPage;
