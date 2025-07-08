"use client";

import { useUserStates } from "@/context/UserContextWrapper";

function Greeting() {
  const { userData } = useUserStates();
  return (
    <div>
      <h1 className="text-3xl font-bold">Hello {userData?.name}!</h1>
    </div>
  );
}

export default Greeting;
