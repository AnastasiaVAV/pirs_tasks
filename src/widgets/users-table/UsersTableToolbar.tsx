import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type UsersTableToolbarProps = {
  page: number;
  perPage: number;
  totalCount: number;
};

export const UsersTableToolbar = ({ page, perPage, totalCount }: UsersTableToolbarProps) => {
  const navigate = useNavigate();
  const from = totalCount > 0 ? (page - 1) * perPage + 1 : 0;
  const to = Math.min(page * perPage, totalCount);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="success" onClick={() => void navigate('/users/create')}>
          Добавить пользователя
        </Button>
      </Box>

      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="body2" color="textSecondary">
          Показаны записи{' '}
          <b>
            {from}–{to}
          </b>{' '}
          из <b>{totalCount}</b>.
        </Typography>
      </Box>
    </>
  );
};
