import { format, parse, isValid } from 'date-fns';
import { ru } from 'date-fns/locale';

const DATE_FORMAT = 'yyyy-MM-dd';
const DISPLAY_FORMAT = 'dd.MM.yyyy';

export const formatDateToDisplay = (date: string): string => {
  const parsed = parse(date, DATE_FORMAT, new Date());
  if (!isValid(parsed)) return date;
  return format(parsed, DISPLAY_FORMAT, { locale: ru });
};
