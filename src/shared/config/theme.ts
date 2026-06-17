import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';

export const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#1976d2',
      },
      background: {
        default: '#fff',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#212529',
          },
        },
      },
      MuiTableSortLabel: {
        styleOverrides: {
          root: {
            color: '#1976d2',
            '&.Mui-active': {
              color: '#1976d2 !important',
            },
          },
        },
      },
    },
  },
  ruRU
);
