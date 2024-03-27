import { Navigate } from "react-router-dom";

import { useAuth } from "../../../contexts/AuthContext/AuthContext";

const AuthRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ color: "black" }}>Loading...</div>; // Or any other loading indicator
  }

  if (user) {
    // User is logged in, redirect to /weather
    return <Navigate to="/weather" replace />;
  } else {
    // User is not logged in, redirect to /login
    return <Navigate to="/login" replace />;
  }
};

export default AuthRedirect;
