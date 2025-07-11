"use client";

import { ProjectContextType, ProjectType } from "@/types/project";
import { createContext, useContext, useMemo, useState } from "react";

const ProjectContext = createContext<ProjectContextType | null>(null);
export default function ProjectContextWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [projectData, setProjectData] = useState<ProjectType[] | null>(null);
  const handleSetProjectData = (data: ProjectType) => {
    setProjectData([...(projectData ?? []), data]);
  };
  const contextData = useMemo(() => {
    return {
      projectData: projectData,
      handleSetProjectData,
    };
  }, [projectData, handleSetProjectData]);
  return (
    <ProjectContext.Provider value={contextData}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useUserStates = () => {
  const projects = useContext(ProjectContext);
  if (!projects) {
    throw new Error("useUserStates must be used within a UserContextProvider");
  }
  return projects;
};
