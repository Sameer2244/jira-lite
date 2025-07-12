"use server";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { projectId, memberTobeAdded } = await request.json();
    console.log(projectId, memberTobeAdded);
    const client = await clientPromise;
    const db = client.db("jira-users");
    const project_collection = db.collection("project-collection");

    await project_collection.updateOne(
      { _id: new ObjectId(projectId) },
      { $push: { members: memberTobeAdded } }
    );
    revalidatePath("/projects");
    revalidatePath("/dashboard", "layout");
    return NextResponse.json({ message: "Member added successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to add member" },
      { status: 500 }
    );
  }
}
