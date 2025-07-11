import clientPromise from "@/lib/mongodb"; // adjust path if needed
import { ProjectType } from "@/types/project";

export async function getAllProjects() {
  const client = await clientPromise;
  const db = client.db("jira-users");
  const collection = db.collection("project-collection");

  const projects = await collection.find({}).toArray();
  return projects as unknown as ProjectType[];
}
