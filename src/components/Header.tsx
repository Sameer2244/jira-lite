import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-4 flex justify-between px-10 border-b border-tertiary">
      <div className="flex items-center gap-10">
        <h3 className="text-2xl text-light-gray font-medium">JIRA Lite</h3>
        <div className="flex gap-10 font-medium">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/issues">Issue</Link>
          <Link href="/bugs">Bugs</Link>
        </div>
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
