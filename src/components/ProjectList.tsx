import { getAllProjects } from "@/lib/projects";
import React from "react";
import EditProject from "./EditProject";
import MemberAddBtn from "./MemberAddBtn";
import { getAllUsersExceptCurrentUser } from "@/lib/users";
import { UserType } from "@/types/user";
import Link from "next/link";
import MemberList from "./common/MemberList";

const statusColors = {
  Pending: "text-[#FF69B4]",
  "Dev in progress": "text-[#FF6347]",
  "QA in progress": "text-[#FFD700]",
  Deployed: "text-[#32CD32]",
};

export default async function ProjectList({
  isMainPage,
}: Readonly<{ isMainPage?: boolean }>) {
  const data = await getAllProjects();

  const users: unknown = await getAllUsersExceptCurrentUser();
  return (
    <div
      className={`${
        !isMainPage
          ? "max-h-[20rem] overflow-scroll shadow-[inset_0px_-3px_3px_-1px_rgba(0,_0,_0,_0.1)]"
          : ""
      }`}
    >
      {data?.map((project) => {
        return (
          <Link key={project._id} href={`/projects/${project._id}`}>
            <div className="my-4 flex justify-between items-start relative border border-gray-300 p-5 rounded-[10px]">
              <div className="w-[60%]">
                <h2 className="text-base font-medium pb-2">{project.title}</h2>
                <p className="text-sm text-gray-400">
                  Status:{" "}
                  <span
                    className={`${statusColors[project.status]} font-medium`}
                  >
                    {project.status}
                  </span>{" "}
                  | Due Date: {project.dueDate} | Created By:{" "}
                  {project.createdBy}
                </p>
                <p className="text-sm">{project.description}</p>
                <MemberList members={project?.members} />
              </div>
              <div className="flex flex-col justify-between items-end gap-5 h-full w-[30%]">
                <EditProject
                  project={{
                    _id: project._id.toString(),
                    title: project.title,
                    description: project.description,
                    status: project.status,
                    dueDate: project.dueDate,
                  }}
                />
                <MemberAddBtn
                  users={users as UserType[]}
                  projectId={project._id.toString()}
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
