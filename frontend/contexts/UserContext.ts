import { UserType } from "@/types/types";
import { createContext } from "react";

export type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType) => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | null>(null);
export default UserContext;
