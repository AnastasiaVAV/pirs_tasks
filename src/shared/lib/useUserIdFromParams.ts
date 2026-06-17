import { useParams } from 'react-router-dom';

export const useUserIdFromParams = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const isValid = id !== undefined && !Number.isNaN(numericId);

  return { id, numericId, isValid };
};
