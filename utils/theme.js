import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiStepIcon: {
     styleOverrides: {
      root: {
        '&.Mui-active': {
          'color': '#ec0057'
        },
        '&.Mui-completed': {
          'color': '#2e7d32'
        }
      },
     }
    }
  },
});
