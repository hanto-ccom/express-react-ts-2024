import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import useRoutes from "./routes/routes";
import defaultTheme from "./styles/themes/defaultTheme";
import GlobalStyle from "./styles/themes/GlobalStyle";

function App() {
  const routes = useRoutes();
  const router = createBrowserRouter(routes);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
