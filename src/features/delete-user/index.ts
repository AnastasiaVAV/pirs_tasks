import { useState, useCallback } from 'react';
import { useDeleteUserMutation } from 'entities/user';

export const useDeleteUser = (onSuccess?: () => void) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

  const confirmDelete = useCallback(async () => {
    if (userIdToDelete === null) return;

    try {
      await deleteUser(userIdToDelete).unwrap();
      setUserIdToDelete(null);
      onSuccess?.();
    } catch {
      setUserIdToDelete(null);
    }
  }, [deleteUser, userIdToDelete, onSuccess]);

  const requestDelete = useCallback((id: number) => {
    setUserIdToDelete(id);
  }, []);

  const cancelDelete = useCallback(() => {
    setUserIdToDelete(null);
  }, []);

  return {
    userIdToDelete,
    requestDelete,
    confirmDelete,
    cancelDelete,
    isLoading,
  };
};
