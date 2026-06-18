import { useNavigate } from 'react-router-dom';
import { useCreateUserForm } from 'features/create-user';
import { UserFormFields } from './UserFormFields';

export const UserCreateForm = () => {
  const navigate = useNavigate();

  const { form, onSubmit, isLoading } = useCreateUserForm(() => {
    void navigate('/users');
  });

  return (
    <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
      <UserFormFields form={form} isLoading={isLoading} />
    </form>
  );
};
