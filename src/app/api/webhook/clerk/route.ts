// app/api/webhook/route.ts

import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // saving it in a mongodb if user is created
    if (body.type === "user.created") {
      const client = await clientPromise;
      const db = client.db("jira-users");
      const collection = db.collection("user-collection");
      const userToadded = {
        _id: body.data.id,
        email: body.data.email_addresses[0].email_address,
        first_name: body.data.first_name,
        last_name: body.data.last_name,
        profile_image_url: body.data.profile_image_url,
      };
      // only add if user is not already added
      const existingUser = await collection.findOne({
        _id: body.data.id,
      });
      if (!existingUser) {
        await collection.insertOne(userToadded);
      }
    }
    if (body.type === "user.deleted") {
      const client = await clientPromise;
      const db = client.db("jira-users");
      const collection = db.collection("user-collection");
      await collection.deleteOne({ _id: body.data.id });
    }

    // Do something with the webhook data
    // For example, handle user.created event

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return new NextResponse("Error handling webhook", { status: 500 });
  }
}
