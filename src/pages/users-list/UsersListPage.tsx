import { Container, Typography, Button, Stack } from '@mui/material';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UsersTable } from 'widgets/users-table';

const UsersListPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Пользователи</Typography>
        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={() => void navigate('/users/create')}
        >
          Добавить
        </Button>
      </Stack>
      <UsersTable />
    </Container>
  );
};

export default UsersListPage;
