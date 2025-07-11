"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

export default function UserLoadingWrapper({
  children,
  fallback,
}: Readonly<{ children: React.ReactNode; fallback: React.ReactNode }>) {
  const { isSignedIn } = useUser();
  if (!isSignedIn) return fallback;
  return <>{children}</>;
}
