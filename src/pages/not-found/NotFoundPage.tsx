import { Container, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h1" color="textSecondary">
          404
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Страница не найдена
        </Typography>
        <Button variant="contained" onClick={() => void navigate('/users')}>
          На главную
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFoundPage;
