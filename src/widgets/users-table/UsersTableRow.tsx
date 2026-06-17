import { TableRow, TableCell, IconButton, Link } from '@mui/material';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, cellSx } from 'shared/ui';
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

  return (
    <TableRow sx={{ bgcolor: index % 2 === 0 ? 'background.paper' : 'action.hover' }}>
      <TableCell sx={cellSx}>{index + 1}</TableCell>
      <TableCell sx={cellSx}>{user.id}</TableCell>
      <TableCell sx={cellSx}>
        <Avatar photoId={user.photo_id} fallback={user.username} sx={{ width: 150, height: 150 }} />
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
        <IconButton
          size="small"
          sx={{ mx: 0.25 }}
          onClick={() => void navigate(`/users/${user.id}`)}
          title="Просмотр"
        >
          <Eye size={16} />
        </IconButton>
        <IconButton
          size="small"
          sx={{ mx: 0.25 }}
          onClick={() => void navigate(`/users/${user.id}/edit`)}
          title="Редактировать"
        >
          <Pencil size={16} />
        </IconButton>
        <IconButton
          size="small"
          sx={{ mx: 0.25 }}
          color="error"
          onClick={() => requestDelete(user.id)}
          title="Удалить"
        >
          <Trash2 size={16} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
