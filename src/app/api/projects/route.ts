"use server";

import clientPromise from "@/lib/mongodb";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const client = await clientPromise;
    const db = client.db("jira-users");
    const collection = db.collection("project-collection");
    const data: unknown = await collection.find({}).toArray();
    return NextResponse.json({ result: "success" });
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
    const { title, description, status, dueDate } = await request.json();
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
    const data: unknown = await collection.insertOne(projectData);
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
