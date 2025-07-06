import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="bg-blue100 py-4 flex justify-between px-10">
      <div>
        <h3 className="text-2xl text-cream-white">JIRA Lite</h3>
      </div>
      <div className="flex gap-5">
        <SignedOut>
          <SignInButton mode="modal">
            <span className="text-blue150 font-medium bg-cream-white px-5 py-2 rounded-[4px] cursor-pointer">
              Sign In
            </span>
          </SignInButton>
          <SignUpButton mode="modal">
            <span className="text-blue150 font-medium bg-cream-white px-5 py-2 rounded-[4px] cursor-pointer">
              Sign Up
            </span>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
