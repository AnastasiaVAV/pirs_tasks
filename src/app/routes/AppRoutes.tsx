import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loader } from 'shared/ui';

const UsersListPage = lazy(() =>
  import('pages/users-list').then((m) => ({ default: m.UsersListPage }))
);
const UserViewPage = lazy(() =>
  import('pages/user-view').then((m) => ({ default: m.UserViewPage }))
);
const UserCreatePage = lazy(() =>
  import('pages/user-create').then((m) => ({ default: m.UserCreatePage }))
);
const UserEditPage = lazy(() =>
  import('pages/user-edit').then((m) => ({ default: m.UserEditPage }))
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UsersListPage />} />
        <Route path="/users/create" element={<UserCreatePage />} />
        <Route path="/users/:id" element={<UserViewPage />} />
        <Route path="/users/:id/edit" element={<UserEditPage />} />
      </Routes>
    </Suspense>
  );
};
