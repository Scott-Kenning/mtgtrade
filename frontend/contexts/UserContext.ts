import { User } from "@/types/user";
import { createContext } from "react";

export type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | null>(null);
export default UserContext;
