"use server";

import clientPromise from "@/lib/mongodb";
import { getAllProjects } from "@/lib/projects";
import { getAuth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    // ep
    const data = await getAllProjects();
    return NextResponse.json({ result: data });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { _id, title, description, status, dueDate } = await request.json();
    const client = await clientPromise;
    const db = client.db("jira-users");
    const collection = db.collection("project-collection");
    const projectData = {
      title,
      description,
      status,
      dueDate,
      createdBy: userId,
      members: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if (_id) {
      await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: projectData }
      );
    } else {
      await collection.insertOne(projectData);
    }
    revalidatePath("/dashboard");
    return NextResponse.json(
      { message: "Project added successfully" },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
