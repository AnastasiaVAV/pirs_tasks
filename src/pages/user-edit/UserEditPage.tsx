import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { UserForm } from 'widgets/user-form';
import { useGetUserByIdQuery } from 'entities/user';
import { Loader } from 'shared/ui';

const UserEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading } = useGetUserByIdQuery(Number(id));

  if (isLoading || !user) return <Loader />;

  return (
    <Container maxWidth="sm">
      <UserForm mode="update" user={user} />
    </Container>
  );
};

export default UserEditPage;
