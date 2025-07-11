import { Dayjs } from "dayjs";

export interface ProjectType {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "Dev in progress" | "QA in progress" | "Deployed";
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  members: string[];
}
export interface ProjectFormType {
  title: string;
  description: string;
  status: "Pending" | "Dev in progress" | "QA in progress" | "Deployed" | "";
  dueDate: string;
}
export interface ProjectContextType {
  projectData: ProjectType[] | null;
  handleSetProjectData: (project: ProjectType) => void;
}
