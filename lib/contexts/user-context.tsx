"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { User } from "@/lib/db/schema";

type UserContextType = {
  userPromise: Promise<User | null>;
};
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  userPromise: UserContextType["userPromise"];
}
export function UserProvider({ children, userPromise }: UserProviderProps) {
  return (
    <UserContext.Provider value={{ userPromise }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
