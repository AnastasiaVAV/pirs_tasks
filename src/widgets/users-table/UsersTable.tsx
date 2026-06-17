import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { Loader, ErrorAlert, DeleteConfirmDialog } from 'shared/ui';
import { useUsersList } from 'features/fetch-users';
import { useDeleteUser } from 'features/delete-user';
import { useFoodList } from 'features/fetch-food-list';
import { UsersTableToolbar } from './UsersTableToolbar';
import { UsersTableHeader } from './UsersTableHeader';
import { UsersTableRow } from './UsersTableRow';

export const UsersTable = () => {
  const {
    users,
    page,
    perPage,
    totalCount,
    filters,
    setFilter,
    toggleSort,
    getSortDirection,
    isLoading,
    isError,
    error,
  } = useUsersList();
  const { options: foodOptions } = useFoodList();

  const {
    userIdToDelete,
    requestDelete,
    confirmDelete,
    cancelDelete,
    isLoading: isDeleting,
  } = useDeleteUser();

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <ErrorAlert
        message={
          error && typeof error === 'object' && 'message' in error
            ? String(error.message)
            : undefined
        }
      />
    );
  }

  return (
    <>
      <UsersTableToolbar page={page} perPage={perPage} totalCount={totalCount} />

      <Paper>
        <TableContainer>
          <Table sx={{ border: 1, borderColor: 'divider' }}>
            <UsersTableHeader
              filters={filters}
              setFilter={setFilter}
              getSortDirection={getSortDirection}
              toggleSort={toggleSort}
              foodOptions={foodOptions}
            />
            <TableBody>
              {users.map((user, index) => (
                <UsersTableRow
                  key={user.id}
                  user={user}
                  index={index}
                  foodOptions={foodOptions}
                  requestDelete={requestDelete}
                />
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    sx={{ textAlign: 'center', py: 4, border: 1, borderColor: 'divider' }}
                  >
                    Нет данных
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <DeleteConfirmDialog
        open={userIdToDelete !== null}
        message="Вы уверены, что хотите удалить пользователя?"
        isLoading={isDeleting}
        onConfirm={() => void confirmDelete()}
        onCancel={cancelDelete}
      />
    </>
  );
};
