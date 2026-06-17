import { Avatar as MuiAvatar } from '@mui/material';
import type { AvatarProps as MuiAvatarProps } from '@mui/material';
import { API_BASE_URL } from 'shared/config';

export type AvatarProps = Omit<MuiAvatarProps, 'src'> & {
  photoId?: number | null;
  fallback?: string;
};

const PLACEHOLDER = '/images/user-placeholder.png';

export const Avatar = ({ photoId, fallback, ...props }: AvatarProps) => {
  const src = photoId ? `${API_BASE_URL}/file/get?id=${photoId}` : PLACEHOLDER;

  return <MuiAvatar src={src} alt={fallback} {...props} />;
};
