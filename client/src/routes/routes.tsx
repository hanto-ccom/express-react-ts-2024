import { RouteObject } from "react-router-dom";

import WeatherView from "../views/WeatherView";

const useRoutes = () => {
  const routes: Array<RouteObject> = [
    {
      path: "/",
      element: <p>Home</p>,
    },
    { path: "/weather", element: <WeatherView /> },
  ];

  return routes;
};

export default useRoutes;
