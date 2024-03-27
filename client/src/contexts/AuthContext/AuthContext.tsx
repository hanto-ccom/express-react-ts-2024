/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

import AuthService from "../../services/AuthService/AuthService.service";
import UserService from "../../services/UserService/User.service";

interface User {
  // Adjust these fields based on what you consider to be your user's information
  id: string;
  username: string;
  isLoggedIn: boolean;
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
    //clear any old tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    const userResponse = await AuthService.loginUser(username, password);
    if (userResponse) {
      localStorage.setItem("accessToken", userResponse.accessToken);
      localStorage.setItem(
        "refreshToken",
        userResponse.user.refreshTokens?.slice(-1)
      );
      setUser({
        id: userResponse.user._id,
        username: userResponse.user.username,
        isLoggedIn: true,
      });
    }
  };

  const logout = (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(undefined); // Or set to null based on your initial state
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      logout();
      return;
      // throw new Error("No refresh token available");
    }
    try {
      const accessToken = await AuthService.refreshToken(refreshToken);
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      logout();
      throw error;
    }
  };

  const fetchUserData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      //throw new Error("No accesstoken available");
      return;
    }

    const data = await UserService.fectchUser(accessToken);

    setUser(data);
  };

  useEffect(() => {
    // On app load, attempt to refresh token if refresh token exists
    // Set loading to false afterwards to render the app
    const initAuth = async () => {
      try {
        await refreshToken(); // Attempt to refresh the token on app start
        // If refreshToken is successful, the user is considered logged in
        await fetchUserData();
      } catch (error) {
        setUser(undefined);
        // Handle failure, which might include doing nothing if you simply show the login screen
        console.error("Error init auth: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
