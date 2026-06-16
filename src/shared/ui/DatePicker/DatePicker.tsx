import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import type { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';

export type DatePickerProps = MuiDatePickerProps<string>;

export const DatePicker = (props: DatePickerProps) => {
  return <MuiDatePicker {...props} />;
};
