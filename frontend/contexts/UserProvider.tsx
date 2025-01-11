"use client";

import { User } from "@/types/user";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import UserContext from "./UserContext";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      //TODO: redirect to login?
    }
    setLoading(false);
  }, []);

  const setUserAndStopLoading = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setLoading(false);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");

    // try {
    //   await axios.post("/api/user/logout");
    // } catch (error) {
    //   // If this fails, it should still act as though the user logged out since the user was cleared
    //   console.error("Logout request was unsuccessful");
    // }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser: setUserAndStopLoading, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
