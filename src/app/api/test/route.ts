"use server";

import clientPromise from "@/lib/mongodb";
import { getAuth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const client = await clientPromise;
    const db = client.db("jira-users");
    const collection = db.collection("user-collection");
    const data: unknown = await collection.find({}).toArray();
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
