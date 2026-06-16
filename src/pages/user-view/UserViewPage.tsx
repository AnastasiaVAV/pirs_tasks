import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { UserCard } from 'widgets/user-card';
import { Loader } from 'shared/ui';

const UserViewPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <Loader />;

  return (
    <Container maxWidth="sm">
      <UserCard userId={Number(id)} />
    </Container>
  );
};

export default UserViewPage;
