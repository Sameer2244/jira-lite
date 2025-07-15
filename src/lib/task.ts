import { TaskType } from "@/types/task";
import clientPromise from "./mongodb";

export async function getAllTasks() {
  const connection = await clientPromise;
  const db = connection.db("jira-users");
  const collection = db.collection("task-collection");
  const data = await collection.find({}).toArray();
  return data as unknown as TaskType[];
}
