"use client";

import ProjectAddBtn from "@/components/ProjectAddBtn";
import React from "react";
export default function SeparatePage() {
  //create a list of available projects with add project button and add popup
  return (
    <div>
      <h1>Projects</h1>
      <ProjectAddBtn />
    </div>
  );
}
