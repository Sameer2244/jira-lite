import ProjectAddBtn from "@/components/ProjectAddBtn";
import ProjectList from "@/components/ProjectList";
import React from "react";
export default async function SeparatePage() {
  //create a list of available projects with add project button and add popup
  return (
    <div>
      <ProjectAddBtn />
      <ProjectList isMainPage />
    </div>
  );
}
