import { Container } from '@mui/material';
import { UserForm } from 'widgets/user-form';

const UserCreatePage = () => {
  return (
    <Container maxWidth="sm">
      <UserForm mode="create" />
    </Container>
  );
};

export default UserCreatePage;
