// app/api/webhook/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Optional: Validate webhook signature here

    console.log("Webhook received:", body);

    // Do something with the webhook data
    // For example, handle user.created event

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return new NextResponse("Error handling webhook", { status: 500 });
  }
}
