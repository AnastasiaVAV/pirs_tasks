export const cellSx = { border: 1, borderColor: 'divider', py: 1, px: 1 };

export const headerCellSx = {
  ...cellSx,
  fontWeight: 'bold',
  color: 'primary.main' as const,
  textDecoration: 'underline',
};

export const filterCellSx = { ...cellSx, minWidth: 200 };

export const avatarSx = { width: 150, height: 150 };

export const iconButtonSx = { mx: 0.25 };

export const sortLabelSx = { textDecoration: 'underline', color: 'primary.main !important' };

export const filterBoxSx = { display: 'flex', alignItems: 'center' as const };

export const datePickerSlotProps = {
  textField: { size: 'small' as const, sx: { width: 150 } },
};

export const tableSx = { border: 1, borderColor: 'divider' };

export const TABLE_COLUMNS_COUNT = 8;
