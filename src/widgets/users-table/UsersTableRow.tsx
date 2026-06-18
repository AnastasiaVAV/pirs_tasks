import { useCallback } from 'react';
import { TableRow, TableCell, IconButton, Link } from '@mui/material';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, cellSx, avatarSx, iconButtonSx } from 'shared/ui';
import { formatDateToDisplay, resolveFoodNames } from 'shared/lib';
import type { User } from 'entities/user';
import type { SelectOption } from 'shared/ui';

type UsersTableRowProps = {
  user: User;
  index: number;
  foodOptions: SelectOption[];
  requestDelete: (id: number) => void;
};

export const UsersTableRow = ({ user, index, foodOptions, requestDelete }: UsersTableRowProps) => {
  const navigate = useNavigate();
  const userId = user.id;

  const handleView = useCallback(() => void navigate(`/users/${userId}`), [navigate, userId]);
  const handleEdit = useCallback(() => void navigate(`/users/${userId}/edit`), [navigate, userId]);
  const handleDelete = useCallback(() => requestDelete(userId), [requestDelete, userId]);

  return (
    <TableRow sx={{ bgcolor: index % 2 === 0 ? 'background.paper' : 'action.hover' }}>
      <TableCell sx={cellSx}>{index + 1}</TableCell>
      <TableCell sx={cellSx}>{user.id}</TableCell>
      <TableCell sx={cellSx}>
        <Avatar photoId={user.photo_id} fallback={user.username} sx={avatarSx} />
      </TableCell>
      <TableCell sx={cellSx}>{user.username}</TableCell>
      <TableCell sx={cellSx}>
        <Link href={`mailto:${user.email}`}>{user.email}</Link>
      </TableCell>
      <TableCell sx={cellSx}>{formatDateToDisplay(user.birthdate)}</TableCell>
      <TableCell sx={cellSx}>
        {resolveFoodNames(user.favorite_food_ids, foodOptions) || '—'}
      </TableCell>
      <TableCell sx={cellSx}>
        <IconButton size="small" sx={iconButtonSx} onClick={handleView} aria-label="Просмотр">
          <Eye size={16} />
        </IconButton>
        <IconButton size="small" sx={iconButtonSx} onClick={handleEdit} aria-label="Редактировать">
          <Pencil size={16} />
        </IconButton>
        <IconButton
          size="small"
          sx={iconButtonSx}
          color="error"
          onClick={handleDelete}
          aria-label="Удалить"
        >
          <Trash2 size={16} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
