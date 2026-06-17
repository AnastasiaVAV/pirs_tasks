import { AppBar as MuiAppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AppBar = () => {
  const navigate = useNavigate();

  return (
    <MuiAppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <Users size={24} />
            <Typography
              variant="h6"
              noWrap
              sx={{ cursor: 'pointer' }}
              onClick={() => void navigate('/users')}
            >
              My Application
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
