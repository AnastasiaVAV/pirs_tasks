import type { SelectOption } from 'shared/ui';

export const resolveFoodNames = (ids: number[], options: SelectOption[]): string => {
  const labelById = new Map(options.map((opt) => [opt.id, opt.label]));
  return ids
    .reduce<string[]>((acc, id) => {
      const label = labelById.get(id);
      if (label) acc.push(label);
      return acc;
    }, [])
    .join(', ');
};
