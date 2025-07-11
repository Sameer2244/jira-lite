"use client";

import React from "react";
import CustomModal from "./common/CustomModal";
import { Button } from "@mui/material";

export default function ProjectAddBtn() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        + Add Project
      </Button>
      <CustomModal open={open} setOpen={setOpen} />
    </div>
  );
}
