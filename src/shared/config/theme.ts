import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';

export const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#1976d2',
      },
      background: {
        default: '#f5f5f5',
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
    },
  },
  ruRU
);
