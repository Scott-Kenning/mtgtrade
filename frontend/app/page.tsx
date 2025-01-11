import { UserContext } from "@/contexts/UserContext";
import { loadUser } from "@/lib/localStorage";
import { User } from "@/types/user";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    setUser(loadUser());
  }, []);

  return (
    <UserContext.Provider value={user}>
      <div className=""></div>
    </UserContext.Provider>
  );
}
