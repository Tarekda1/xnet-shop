import { FC, createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

interface Auth {
  signIn: (data: { username: any; password: any }) => Promise<void>;
  signOut: () => void;
  user: any;
}
const AuthContext = createContext<Auth>({
  user: {},
  signIn: (data: { username: any; password: any }) => {
    return new Promise<void>((resolve, reject) => {}).then(() => {});
  },
  signOut: () => {},
});

const useAuthContext = () => useContext(AuthContext);

interface BaseProps {
  children: React.ReactNode;
}

const AuthProvider: FC<BaseProps> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthProvider };
