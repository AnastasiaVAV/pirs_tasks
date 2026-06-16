import { AppBar as MuiAppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const AppBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isUsersPage = pathname === '/users';

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
          <Users size={24} />
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer' }}
            onClick={() => void navigate('/users')}
          >
            User Manager
          </Typography>
        </Box>
        {isUsersPage && (
          <Button color="inherit" onClick={() => void navigate('/users/create')}>
            Добавить
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};
