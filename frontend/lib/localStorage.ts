import { User } from "@/types/user";

const USER_KEY = "pig_user";

export const loadUser = (): User | null => {
  const str = localStorage.getItem(USER_KEY);
  const user = str ? (JSON.parse(str) as User) : null;

  return user;
};

export const saveUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};
