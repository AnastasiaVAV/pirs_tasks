import { useNavigate } from 'react-router-dom';
import { useUpdateUserForm } from 'features/update-user';
import type { User } from 'entities/user';
import { UserFormFields } from './UserFormFields';

type UserUpdateFormProps = {
  user: User;
  onSuccess?: () => void;
};

export const UserUpdateForm = ({ user, onSuccess }: UserUpdateFormProps) => {
  const navigate = useNavigate();

  const { form, onSubmit, isLoading } = useUpdateUserForm(user, () => {
    void navigate(`/users/${user.id}`);
    onSuccess?.();
  });

  return (
    <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
      <UserFormFields
        control={form.control}
        isLoading={isLoading}
        avatarProps={{ photoId: user.photo_id, fallback: user.username }}
      />
    </form>
  );
};
