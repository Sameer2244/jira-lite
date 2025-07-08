import React from "react";
import Greeting from "./Greeting";
import UserLoadingWrapper from "@/utils/UserLoadingWrapper";

export default function DashboardCard() {
  return (
    <div className="">
      <UserLoadingWrapper>
        <Greeting />
      </UserLoadingWrapper>
      {/* projects */}
      {/* issues */}
      {/* bugs */}
      {/* parallal routes if needed */}
    </div>
  );
}
