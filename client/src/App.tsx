import "./App.css";

import { ThemeProvider } from "styled-components";

import WeatherCard from "./components/atoms/WeatherCard";
import defaultTheme from "./styles/themes/defaultTheme";
import GlobalStyle from "./styles/themes/GlobalStyle";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <WeatherCard />
    </ThemeProvider>
  );
}

export default App;
