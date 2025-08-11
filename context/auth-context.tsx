import { createContext } from "react";

type AuthContextType = {
  password?: string;
  setPassword: (password: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  password: undefined,
  setPassword: () => {},
});
