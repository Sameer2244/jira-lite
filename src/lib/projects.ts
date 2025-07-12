import clientPromise from "@/lib/mongodb"; // adjust path if needed
import { ProjectType } from "@/types/project";
import { auth } from "@clerk/nextjs/server";

export async function getAllProjects() {
  const { userId } = await auth();
  try {
    const client = await clientPromise;
    const db = client.db("jira-users");
    const project_collection = db.collection("project-collection");
    const user_collection: any = db.collection("user-collection");
    // createdby === user or members array includes userid
    const projects = await project_collection
      .find({ $or: [{ createdBy: userId }, { members: userId }] })
      .toArray();
    const ownerName = await user_collection.findOne({ _id: userId });

    const modifiedProjects = projects.map((project) => ({
      ...project,
      createdBy: ownerName.first_name + " " + ownerName.last_name,
    }));
    return modifiedProjects as unknown as ProjectType[];
  } catch (e) {
    console.error(e);
  }
}
