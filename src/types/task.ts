import { ObjectId } from "mongodb";

export interface TaskType {
  _id: ObjectId;
  title: string;
  description: string;
  status: "Pending" | "Dev in progress" | "QA in progress" | "Deployed";
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  commentsCount: number;
  assignedTo: string;
}
