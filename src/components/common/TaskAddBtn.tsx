"use client";

import { Button } from "@mui/material";
import React from "react";

export default function TaskAddBtn() {
  const handleAddTask = async () => {
    //
    try {
      fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          title: "Task 1",
          description: "Description 1",
          assignedTo: "John Doe",
          status: "Pending",
          dueDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: "John Doe",
          commentsCount: 0,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        sx={{ marginTop: "15px" }}
        onClick={() => {
          handleAddTask();
        }}
      >
        Create Task
      </Button>
    </div>
  );
}
