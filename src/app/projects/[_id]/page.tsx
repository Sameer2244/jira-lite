import MemberList from "@/components/common/MemberList";
import TaskAddBtn from "@/components/common/TaskAddBtn";
import { getProjectById } from "@/lib/projects";
import { getAllTasks } from "@/lib/task";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
const statusColors = {
  Pending: "text-[#FF69B4]",
  "Dev in progress": "text-[#FF6347]",
  "QA in progress": "text-[#FFD700]",
  Deployed: "text-[#32CD32]",
};
export default async function ProjectDynamicPage({
  params,
}: Readonly<{ params: Promise<{ _id: string }> }>) {
  const { _id } = await params;
  const projectData = await getProjectById(_id);
  const taskData = await getAllTasks();
  return (
    <div>
      <h1 className="text-2xl font-semibold pb-2">
        {projectData?.title}
        <span
          className={`ml-2 ${
            statusColors[projectData?.status ?? "Pending"]
          } text-sm`}
        >
          {projectData?.status}
        </span>
      </h1>
      <p>{projectData?.description}</p>
      <p className="text-gray-500 text-sm pt-4">
        Due date: {projectData?.dueDate}
      </p>
      {/* reuse member list data from project list create common component for that */}
      <MemberList members={projectData?.members ?? []} />
      <div className="flex justify-between py-2">
        <h3 className="text-xl font-semibold pt-4">Tasks</h3>
        <TaskAddBtn />
      </div>
      <TableContainer
        sx={{
          border: "1px solid #D9D9D9",
          borderRadius: ".625rem",
          marginTop: "1rem",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Due Date</TableCell>
              <TableCell align="right">Assigned To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskData.map((e) => {
              return (
                <TableRow key={e._id.toString()}>
                  <TableCell component="th" scope="row">
                    {e.title}
                  </TableCell>
                  <TableCell align="right">
                    <span
                      className={`${
                        statusColors[e.status]
                      } font-medium text-sm`}
                    >
                      {e.status}
                    </span>
                  </TableCell>
                  <TableCell align="right">{e.createdAt}</TableCell>
                  <TableCell align="right">{e.dueDate}</TableCell>
                  <TableCell align="right">{e.assignedTo}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
