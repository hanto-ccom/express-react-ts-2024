/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

import AuthService from "../../services/AuthService/AuthService.service";
import UserService from "../../services/UserService/User.service";

interface User {
  // Adjust these fields based on what you consider to be your user's information
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  isLoggedIn: boolean;
}

interface UserContextType {
  user: User | undefined;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

export const useAuth = (): UserContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setIsLoading] = useState<boolean>(true);

  const login = async (username: string, password: string) => {
    const userResponse = await AuthService.loginUser(username, password);
    if (userResponse) {
      setUser({
        ...userResponse,
        isLoggedIn: true,
      });
    }
  };

  const logout = (): void => {
    //TOOD: await AuthService.logout()
    setUser(undefined); // Or set to null based on your initial state
  };

  const fetchUserData = async () => {
    try {
      const data = await UserService.fectchUser(); // Adjusted to rely on access token cookie
      setUser(data); // Update user context
    } catch (error) {
      console.error("Fetch user data error:", error);
      // Handle error (e.g., token expired or invalid)
      setUser(undefined);
      // Consider triggering a refresh token flow here or logging the user out
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        await fetchUserData();
      } catch (error) {
        console.error("Error init auth: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
