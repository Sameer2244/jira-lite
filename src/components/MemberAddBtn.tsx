"use client";

import { Button } from "@mui/material";
import React from "react";
import MemberAddModal from "./common/MemberAddModal";
import { UserType } from "@/types/user";

export default function MemberAddBtn({
  users,
  projectId,
}: Readonly<{ users: UserType[]; projectId: string }>) {
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          color: "gray",
          fontWeight: "600",
          width: "fit-content",
        }}
        onClick={() => setOpenModal(true)}
      >
        + Add Member
      </Button>
      {openModal && (
        <MemberAddModal
          open={openModal}
          setOpen={setOpenModal}
          users={users}
          projectId={projectId}
        />
      )}
    </div>
  );
}
