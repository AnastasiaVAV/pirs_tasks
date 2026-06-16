import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

export type InputProps = TextFieldProps;

export const Input = (props: InputProps) => {
  return <TextField {...props} />;
};
