import { Alert, AlertTitle } from '@mui/material';

export type ErrorAlertProps = {
  title?: string;
  message?: string;
};

export const ErrorAlert = ({ title = 'Ошибка', message }: ErrorAlertProps) => {
  return (
    <Alert severity="error" sx={{ my: 2 }}>
      <AlertTitle>{title}</AlertTitle>
      {message || 'Не удалось загрузить данные. Попробуйте позже.'}
    </Alert>
  );
};
