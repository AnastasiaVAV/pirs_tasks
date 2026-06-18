import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { Loader, ErrorAlert, DeleteConfirmDialog, TABLE_COLUMNS_COUNT, tableSx } from 'shared/ui';
import { extractErrorMessage } from 'shared/lib';
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
    error: deleteError,
  } = useDeleteUser();

  if (isLoading) return <Loader />;

  if (isError) {
    return <ErrorAlert message={extractErrorMessage(error)} />;
  }

  return (
    <>
      <UsersTableToolbar page={page} perPage={perPage} totalCount={totalCount} />

      <Paper>
        <TableContainer>
          <Table sx={tableSx}>
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
              {users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={TABLE_COLUMNS_COUNT}
                    sx={{ textAlign: 'center', py: 4, border: 1, borderColor: 'divider' }}
                  >
                    Нет данных
                  </TableCell>
                </TableRow>
              ) : null}
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

      {deleteError && <ErrorAlert message={deleteError} />}
    </>
  );
};
