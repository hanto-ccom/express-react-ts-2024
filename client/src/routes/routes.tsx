import { RouteObject } from "react-router-dom";

import AuthRedirect from "../components/features/AuthRedirect/AuthRedirect";
import LoginView from "../views/LoginView";
import WeatherView from "../views/WeatherView";

const useRoutes = () => {
  const routes: Array<RouteObject> = [
    {
      path: "/",
      element: <AuthRedirect />,
    },
    { path: "/login", element: <LoginView /> },
    { path: "/weather", element: <WeatherView /> },
  ];

  return routes;
};

export default useRoutes;
