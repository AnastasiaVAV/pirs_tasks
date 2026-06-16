import { useMemo } from 'react';
import { useGetFoodListQuery } from 'entities/user';
import type { SelectOption } from 'shared/ui/Select';

export const useFoodList = () => {
  const { data, ...rest } = useGetFoodListQuery();

  const options: SelectOption[] = useMemo(
    () =>
      data
        ? Object.entries(data as Record<string, string>).map(([id, label]) => ({
            id: Number(id),
            label,
          }))
        : [],
    [data]
  );

  return { options, ...rest };
};
