"use client";

import { Button } from "@mui/material";
import React from "react";
import ProjectModal from "./common/ProjectModal";
import { ProjectType } from "@/types/project";

export default function EditProject({
  project,
}: Readonly<{ project: ProjectType }>) {
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
        Edit
      </Button>
      {openModal && (
        <ProjectModal
          open={openModal}
          setOpen={setOpenModal}
          projectDataProps={project}
        />
      )}
    </div>
  );
}
