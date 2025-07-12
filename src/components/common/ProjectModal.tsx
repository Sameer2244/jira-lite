import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { ProjectFormType, ProjectType } from "@/types/project";
import { style } from "@/utils/modalStyle";

export default function ProjectModal({
  open,
  setOpen,
  projectDataProps,
}: Readonly<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectDataProps?: ProjectFormType;
}>) {
  const handleAddProject = () => {
    if (
      !projectData.title ||
      !projectData.description ||
      !projectData.status ||
      !projectData.dueDate
    ) {
      console.log("please fill all fields");
    } else {
      setOpen(false);
      fetch("http://localhost:3000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(projectData),
      });
    }
  };
  const handleClose = () => setOpen(false);
  const [projectData, setProjectData] = React.useState<ProjectFormType>({
    ...(projectDataProps?._id && { _id: projectDataProps?._id }),
    title: projectDataProps?.title ?? "",
    description: projectDataProps?.description ?? "",
    status: projectDataProps?.status ?? "Pending",
    dueDate:
      projectDataProps?.dueDate ?? dayjs(Date.now()).format("YYYY-MM-DD"),
  });
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="m-auto font-semibold text-2xl text-light-gray">
            Add New Project
          </h2>
          <TextField
            id="project-title"
            label="Project Title"
            variant="outlined"
            value={projectData?.title}
            onChange={(e) => {
              setProjectData({
                ...projectData,
                title: e.target.value,
              });
            }}
          />
          <TextareaAutosize
            placeholder="Enter project's description"
            minRows={3}
            style={{
              outline: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
            }}
            onFocus={(e) => {
              e.target.style.outline = "1px solid #000";
            }}
            onBlur={(e) => {
              e.target.style.outline = "1px solid #ccc";
            }}
            value={projectData?.description}
            onChange={(e) => {
              setProjectData({
                ...projectData,
                description: e.target.value,
              });
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="project-status-select-label">Status</InputLabel>
            <Select
              labelId="project-status-select-label"
              id="project-status-simple-select"
              label="Age"
              value={projectData?.status}
              onChange={(e) => {
                setProjectData({
                  ...projectData,
                  status: e.target.value,
                });
              }}
            >
              <MenuItem value={"Pending"}>Pending</MenuItem>
              <MenuItem value={"Dev in progress"}>Dev in progress</MenuItem>
              <MenuItem value={"QA in progress"}>QA in progress</MenuItem>
              <MenuItem value={"Deployed"}>Deployed</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Due Date"
                defaultValue={dayjs(Date.now())}
                sx={{ width: "100% !important" }}
                value={dayjs(projectData?.dueDate)}
                onChange={(newValue) => {
                  setProjectData({
                    ...projectData,
                    dueDate: dayjs(newValue).format("YYYY-MM-DD"),
                  });
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button
            variant="contained"
            onClick={() => {
              handleAddProject();
            }}
          >
            Add Project
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
