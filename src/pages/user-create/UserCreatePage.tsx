import { Container } from '@mui/material';
import { UserCreateForm } from 'widgets/user-form';

export const UserCreatePage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <UserCreateForm />
    </Container>
  );
};
