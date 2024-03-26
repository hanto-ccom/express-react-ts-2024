import { Navigate } from "react-router-dom";

import { useAuth } from "../../../contexts/AuthContext/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  console.log(user);

  // If not authenticated, redirect to login page
  if (loading) {
    // Optionally, return a loading indicator or null while checking auth state
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
