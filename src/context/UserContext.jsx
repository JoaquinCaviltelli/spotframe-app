import { useState, useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(false);

  // Check si user está activo
  useEffect(() => {
    // observable por firebase 👇
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user);
    });

    return unsubscribe;
  }, []);

  // Cuando inicia la aplicación siempre el user estará false
  // Pero al terminar el useEffect, el user podrá ser null o un objeto
  if (user === false)
    return (
      <div className="fixed top-0 left-0 flex h-screen w-full items-center justify-center bg-slate-300 text-white">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
