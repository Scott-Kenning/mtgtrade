import { UserType } from "@/types/types";

const USER_KEY = "pig_user";

export const loadUser = (): UserType | null => {
  const str = localStorage.getItem(USER_KEY);
  const user = str ? (JSON.parse(str) as UserType) : null;

  return user;
};

export const saveUser = (user: UserType) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};
