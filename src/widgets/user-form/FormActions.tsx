import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui';

type FormActionsProps = {
  isLoading?: boolean;
};

export const FormActions = ({ isLoading }: FormActionsProps) => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={2}>
      <Button type="submit" variant="contained" color="success" disabled={isLoading}>
        Сохранить
      </Button>
      <Button variant="outlined" onClick={() => void navigate(-1)}>
        Отмена
      </Button>
    </Stack>
  );
};
