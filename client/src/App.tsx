import "./App.css";

import { ThemeProvider } from "styled-components";

import Test from "./components/atoms/Test";
import defaultTheme from "./styles/themes/defaultTheme";
import GlobalStyle from "./styles/themes/GlobalStyle";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Test />
    </ThemeProvider>
  );
}

export default App;
