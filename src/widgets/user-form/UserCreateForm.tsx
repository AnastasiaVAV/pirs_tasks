import { useNavigate } from 'react-router-dom';
import { useCreateUserForm } from 'features/create-user';
import { UserFormFields } from './UserFormFields';

export const UserCreateForm = () => {
  const navigate = useNavigate();

  const { form, onSubmit, isSubmitting } = useCreateUserForm(() => {
    void navigate('/users');
  });

  return (
    <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
      <UserFormFields control={form.control} isLoading={isSubmitting} />
    </form>
  );
};
