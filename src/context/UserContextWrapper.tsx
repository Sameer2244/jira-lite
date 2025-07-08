"use client";

import { UserContextType, UserType } from "@/types/user";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";

const UserContext = createContext<UserContextType | null>(null);
export default function UserContextWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [userData, setUserData] = useState<UserType | null>(null);
  const { isLoaded, isSignedIn, user } = useUser();
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setUserData({
        _id: user.id,
        name: user.fullName ?? "",
        email: user.emailAddresses[0].emailAddress,
        createdAt: user.createdAt ?? new Date(),
      });
    }
  }, [isLoaded, isSignedIn, user]);
  const handleSetUserData = (data: UserType) => {
    setUserData(data);
  };
  const contextData = useMemo(() => {
    return {
      userData,
      handleSetUserData,
    };
  }, [userData, handleSetUserData]);
  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
}

export const useUserStates = () => {
  const user = React.useContext(UserContext);
  if (!user) {
    throw new Error("useUserStates must be used within a UserContextProvider");
  }
  return user;
};
