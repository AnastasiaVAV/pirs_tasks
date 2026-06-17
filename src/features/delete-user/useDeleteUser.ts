import { useState, useCallback } from 'react';
import { useDeleteUserMutation } from 'entities/user';

export const useDeleteUser = (onSuccess?: () => void) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const confirmDelete = useCallback(async () => {
    if (userIdToDelete === null) return;

    try {
      await deleteUser(userIdToDelete).unwrap();
      setUserIdToDelete(null);
      setError(null);
      onSuccess?.();
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String(err.message)
          : 'Не удалось удалить пользователя';
      setError(message);
      setUserIdToDelete(null);
    }
  }, [deleteUser, userIdToDelete, onSuccess]);

  const requestDelete = useCallback((id: number) => {
    setUserIdToDelete(id);
    setError(null);
  }, []);

  const cancelDelete = useCallback(() => {
    setUserIdToDelete(null);
    setError(null);
  }, []);

  return {
    userIdToDelete,
    requestDelete,
    confirmDelete,
    cancelDelete,
    isLoading,
    error,
  };
};
