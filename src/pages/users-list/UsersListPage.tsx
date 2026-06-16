import { Container, Typography } from '@mui/material';
import { UsersTable } from 'widgets/users-table';

const UsersListPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" mb={3}>
        Пользователи
      </Typography>
      <UsersTable />
    </Container>
  );
};

export default UsersListPage;
