import React from "react";

export default function DashboardLayout({
  children,
  project,
}: Readonly<{ children: React.ReactNode; project: React.ReactNode }>) {
  return (
    <>
      {children}
      {project}
    </>
  );
}
