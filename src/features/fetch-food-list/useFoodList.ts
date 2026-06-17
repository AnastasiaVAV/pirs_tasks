import { useMemo } from 'react';
import { useGetFoodListQuery } from 'entities/user';
import type { SelectOption } from 'shared/ui';

export const useFoodList = () => {
  const { data, ...rest } = useGetFoodListQuery();

  const options: SelectOption[] = useMemo(
    () =>
      data
        ? Object.entries(data).map(([id, label]) => ({
            id: Number(id),
            label,
          }))
        : [],
    [data]
  );

  return { options, ...rest };
};
