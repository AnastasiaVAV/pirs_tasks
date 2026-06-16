import { CircularProgress, Box } from '@mui/material';

export type LoaderProps = {
  size?: number;
};

export const Loader = ({ size = 40 }: LoaderProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={4}>
      <CircularProgress size={size} />
    </Box>
  );
};
