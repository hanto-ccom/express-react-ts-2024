/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

import AuthService from "../../services/WeatherService/AuthService/AuthService.service";

interface User {
  // Adjust these fields based on what you consider to be your user's information
  id: string;
  username: string;
  // Add any other user fields here
}

interface UserContextType {
  user: User | undefined;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (username: string, password: string) => {
    const userResponse = await AuthService.loginUser(username, password);
    setUser(userResponse);
  };

  const logout = (): void => {
    // Implement logout logic
  };

  const refreshToken = async () => {
    // Implement refresh token logic
    // On successful token refresh, update axios headers or user state as needed
    // On failure, consider logging the user out
  };

  useEffect(() => {
    // On app load, attempt to refresh token if refresh token exists
    // Set loading to false afterwards to render the app
    refreshToken().finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading: isLoading, login, logout, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
