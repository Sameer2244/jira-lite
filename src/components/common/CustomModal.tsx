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
import dayjs, { Dayjs } from "dayjs";
import { ProjectFormType, ProjectType } from "@/types/project";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: 3,
  boxShadow: 24,
  p: 4,
};

export default function CustomModal({
  open,
  setOpen,
}: Readonly<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
        },
        body: JSON.stringify(projectData),
      });
    }
  };
  const handleClose = () => setOpen(false);
  const [projectData, setProjectData] = React.useState<ProjectFormType>({
    title: "",
    description: "",
    status: "",
    dueDate: dayjs(Date.now()).format("YYYY-MM-DD"),
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
