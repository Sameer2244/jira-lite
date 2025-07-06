// app/api/webhook/route.ts

import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body.data.email_addresses[0].email_address);
    console.log(body.data.id);
    console.log(body.data.first_name);
    console.log(body.data.last_name);
    console.log(body.data.profile_image_url);
    // saving it in a mongodb if user is created
    if (body.type === "user.created") {
      const client = await clientPromise;
      const db = client.db("jira-users");
      const collection = db.collection("users-collection");
      const userToadded = {
        email: body.data.email_addresses[0].email_address,
        id: body.data.id,
        first_name: body.data.first_name,
        last_name: body.data.last_name,
        profile_image_url: body.data.profile_image_url,
      };
      console.log(userToadded);
      await collection.insertOne(userToadded);
    }

    // Do something with the webhook data
    // For example, handle user.created event

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return new NextResponse("Error handling webhook", { status: 500 });
  }
}
