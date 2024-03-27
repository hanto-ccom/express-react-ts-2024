import { RouteObject } from "react-router-dom";

import AuthRedirect from "../components/features/AuthRedirect/AuthRedirect";
import ProtectedRoute from "../components/features/ProtectedRoute/ProtectedRoute";
import LoginView from "../views/LoginView/LoginView";
import RegisterView from "../views/RegisterView/RegisterView";
import WeatherView from "../views/WeatherView/WeatherView";

const useRoutes = () => {
  const routes: Array<RouteObject> = [
    {
      path: "/",
      element: <AuthRedirect />,
    },
    { path: "/login", element: <LoginView /> },
    { path: "/register", element: <RegisterView /> },
    {
      path: "/weather",
      element: (
        <ProtectedRoute>
          <WeatherView />
        </ProtectedRoute>
      ),
    },
  ];

  return routes;
};

export default useRoutes;
