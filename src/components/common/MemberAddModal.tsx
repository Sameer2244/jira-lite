import { style } from "@/utils/modalStyle";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { UserType } from "@/types/user";
import { revalidatePath } from "next/cache";

export default function MemberAddModal({
  open,
  setOpen,
  users,
  projectId,
}: Readonly<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  users: UserType[];
  projectId: string;
}>) {
  const [memberData, setMemberData] = useState({
    name: "",
    _id: "",
  });

  const handleClose = () => setOpen(false);

  const handleAddMember = async () => {
    await fetch("http://localhost:3000/api/projects/addmember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        projectId: projectId,
        memberTobeAdded: memberData._id,
      }),
    });
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2 className="m-auto font-semibold text-2xl text-light-gray">
          Add New Member
        </h2>
        <FormControl fullWidth>
          <InputLabel id="project-status-select-label">Member Name</InputLabel>
          <Select
            labelId="project-status-select-label"
            id="project-status-simple-select"
            label="Age"
            value={memberData?._id}
            onChange={(e) => {
              setMemberData({ ...memberData, _id: e.target.value });
            }}
          >
            {users?.map((user) => {
              return (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={() => {
            handleAddMember();
          }}
        >
          Add Member
        </Button>
      </Box>
    </Modal>
  );
}
