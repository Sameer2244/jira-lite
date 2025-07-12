"use client";

import React from "react";
import ProjectModal from "./common/ProjectModal";
import { Button } from "@mui/material";

export default function ProjectAddBtn() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        + Add Project
      </Button>
      <ProjectModal open={open} setOpen={setOpen} />
    </div>
  );
}
