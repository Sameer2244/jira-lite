import React from "react";

export default function ProjectLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={
        "border-2 w-full border-tertiary p-5 my-4 rounded-[10px] min-h-[10rem]"
      }
    >
      <h3 className="text-light-gray text-xl font-medium  pb-1">
        Your Projects
      </h3>
      <div className="w-[8%] border-b-4 border-tertiary" />
      {children}
    </div>
  );
}
