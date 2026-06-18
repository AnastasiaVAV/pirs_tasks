import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUserForm } from 'features/create-user';
import { UserFormFields } from './UserFormFields';

export const UserCreateForm = () => {
  const navigate = useNavigate();

  const { form, onSubmit, isLoading } = useCreateUserForm(() => {
    void navigate('/users');
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => void form.handleSubmit(onSubmit)(e),
    [form, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit}>
      <UserFormFields form={form} isLoading={isLoading} />
    </form>
  );
};
