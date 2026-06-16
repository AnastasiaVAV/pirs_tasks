import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Button } from 'shared/ui';

export type DeleteConfirmDialogProps = {
  open: boolean;
  title?: string;
  message?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteConfirmDialog = ({
  open,
  title = 'Подтверждение удаления',
  message = 'Вы уверены, что хотите удалить?',
  isLoading = false,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={isLoading}>
          Отмена
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? 'Удаление...' : 'Удалить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
