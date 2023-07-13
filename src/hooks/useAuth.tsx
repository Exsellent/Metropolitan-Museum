import React, { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios";

export interface IAuthContext {
  loggedIn: boolean;
  handleLogin: (username: string, password: string) => Promise<void>;
  handleLogout: () => void;
  handleRegistration: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (/*username: string, password: string*/) => {
    try {
      const response = await axios.post("/api/login", {
        /*username,*/
        /*password*/
      });

      if (response.data.success) {
        setLoggedIn(true);
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleRegistration = async (/*username: string, password: string*/) => {
    try {
      // Handle registration logic using the username and password parameters
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, handleLogin, handleLogout, handleRegistration }}
    >
      {children}
    </AuthContext.Provider>
  );
};
