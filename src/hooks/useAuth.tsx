import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
} from "react";
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

  // Обертка функции входа в систему handle в useCallback
  const handleLogin = useCallback(
    async (/*username: string, password: string*/) => {
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
    },
    [setLoggedIn]
  );

  // Обертка функции дескриптора выхода из системы и регистрации дескриптора в use Callback hooks
  const handleLogout = useCallback(() => {
    setLoggedIn(false);
  }, [setLoggedIn]); // Add setLoggedIn as a dependency

  const handleRegistration = useCallback(
    async (/*username: string, password: string*/) => {
      try {
        // Обрабатывается логика регистрации, используя параметры имени пользователя и пароля
        setLoggedIn(true);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    [setLoggedIn]
  );

  const value = useMemo(
    () => ({
      loggedIn,
      handleLogin,
      handleLogout,
      handleRegistration,
    }),
    [loggedIn, handleLogin, handleLogout, handleRegistration]
  );

  return (
    // Передается сохраненный объект в качестве значения для поставщика контекста
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
