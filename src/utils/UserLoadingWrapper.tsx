"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

export default function UserLoadingWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isLoaded } = useUser();
  if (!isLoaded) return <p className="text-3xl font-bold">Loading...</p>;
  return <>{children}</>;
}
