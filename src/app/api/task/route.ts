import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const connection = await clientPromise;
  const db = connection.db("jira-users");
  const collection = db.collection("task-collection");
  const taskTobeAdded = {
    ...data,
    _id: new ObjectId(),
  };
  await collection.insertOne(taskTobeAdded);
  return NextResponse.json({ message: "Task added successfully" });
}
