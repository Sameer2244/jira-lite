import React from "react";
import Greeting from "./Greeting";
import UserLoadingWrapper from "@/utils/UserLoadingWrapper";

export default function DashboardCard() {
  return (
    <div className="">
      <UserLoadingWrapper fallback={<h1>Loading...</h1>}>
        <Greeting />
      </UserLoadingWrapper>
      {/* projects */}
      {/* issues */}
      {/* bugs */}
      {/* parallal routes if needed */}
    </div>
  );
}
