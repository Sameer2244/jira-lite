import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// if user is not logged in then redirect to / root page
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const routeMatcher = createRouteMatcher("/");
  if (
    !userId &&
    !routeMatcher(req) &&
    !req.nextUrl.pathname.startsWith("/api/webhook/clerk")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (userId && routeMatcher(req)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
