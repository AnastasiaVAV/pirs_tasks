import type { SelectOption } from 'shared/ui';

export const resolveFoodNames = (ids: number[], options: SelectOption[]): string =>
  ids
    .map((id) => options.find((opt) => opt.id === id)?.label)
    .filter(Boolean)
    .join(', ');
