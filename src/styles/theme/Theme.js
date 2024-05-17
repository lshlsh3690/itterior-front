import { blue, grey, pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: grey["A100"], //#f5f5f5
    },
    secondary: {
      main: blue["A100"], //#82b1ff
    },
    appbar: {
      main: blue["A100"],
    },
    error: {
      main: pink["A200"], //#ff80ab
    },
  },
  typography: {
    fontFamily: "DNFBitBitv2",
  },
});
