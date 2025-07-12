import clientPromise from "@/lib/mongodb";
import { getAllProjects } from "@/lib/projects";
import React from "react";
import EditProject from "./EditProject";
import MemberAddBtn from "./MemberAddBtn";
import { getAllUsersExceptCurrentUser } from "@/lib/users";
import { UserType } from "@/types/user";

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
  const getMemberNameById = async (id: string) => {
    const client = await clientPromise;
    const db = client.db("jira-users");
    const collection: any = db.collection("user-collection");
    const member = await collection.findOne({ _id: id });
    return member?.first_name[0] + member?.last_name[0];
  };
  const users: unknown = await getAllUsersExceptCurrentUser();
  return (
    <div
      className={`${
        !isMainPage ? "border-2" : ""
      } w-full border-tertiary p-5 my-4 rounded-[10px]`}
    >
      <h3 className="text-light-gray text-xl font-medium  pb-1">
        Your Projects
      </h3>
      <div className="w-[8%] border-b-4 border-tertiary" />
      {data?.map((project) => {
        return (
          <div
            key={project._id}
            className="my-4 flex justify-between items-start relative border border-gray-300 p-5 rounded-[10px]"
          >
            <div className="w-[60%]">
              <h2 className="text-base font-medium pb-2">{project.title}</h2>
              <p className="text-sm text-gray-400">
                Status:{" "}
                <span className={`${statusColors[project.status]} font-medium`}>
                  {project.status}
                </span>{" "}
                | Due Date: {project.dueDate} | Created By: {project.createdBy}
              </p>
              <p className="text-sm">{project.description}</p>
              {project?.members?.length > 0 && (
                <div className="flex items-center pt-4">
                  <span>Members:</span>
                  {[
                    project.members?.map((member) => {
                      return (
                        <div
                          key={member}
                          className={`w-8 h-8 text-sm flex justify-center items-center shadow rounded-full ml-1 bg-green-300 font-medium`}
                        >
                          {getMemberNameById(member)}
                        </div>
                      );
                    }),
                  ]}
                </div>
              )}
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
        );
      })}
    </div>
  );
}
