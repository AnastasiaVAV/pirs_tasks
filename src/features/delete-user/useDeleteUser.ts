import { useState, useCallback } from 'react';
import { useDeleteUserMutation } from 'entities/user';
import { extractErrorMessage } from 'shared/lib';

type DeleteState = { userId: number | null; error: string | undefined };

export const useDeleteUser = (onSuccess?: () => void) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [state, setState] = useState<DeleteState>({ userId: null, error: undefined });

  const confirmDelete = useCallback(async () => {
    if (state.userId === null) return;

    try {
      await deleteUser(state.userId).unwrap();
      setState({ userId: null, error: undefined });
      onSuccess?.();
    } catch (err) {
      const message = extractErrorMessage(err);
      setState({ userId: null, error: message });
    }
  }, [deleteUser, state.userId, onSuccess]);

  const requestDelete = useCallback((id: number) => {
    setState({ userId: id, error: undefined });
  }, []);

  const cancelDelete = useCallback(() => {
    setState({ userId: null, error: undefined });
  }, []);

  return {
    userIdToDelete: state.userId,
    requestDelete,
    confirmDelete,
    cancelDelete,
    isLoading,
    error: state.error,
  };
};
