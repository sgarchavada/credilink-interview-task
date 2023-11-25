import "@/styles/globals.scss";
import { ApolloComponent } from "@/utils/apolloclient";
import { theme } from "@/utils/theme";
import { ThemeProvider } from "@mui/material/styles";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ApolloComponent pageProps={pageProps} Component={Component} />
    </ThemeProvider>
  );
}
