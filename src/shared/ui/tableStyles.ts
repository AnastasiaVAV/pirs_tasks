export const cellSx = { border: 1, borderColor: 'divider', py: 1, px: 1 };

export const headerCellSx = {
  ...cellSx,
  fontWeight: 'bold',
  color: 'primary.main' as const,
  textDecoration: 'underline',
};
