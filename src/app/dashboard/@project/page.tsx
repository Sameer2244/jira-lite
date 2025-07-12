import ProjectModal from "@/components/common/ProjectModal";
import EditProject from "@/components/EditProject";
import clientPromise from "@/lib/mongodb";
import { getAllProjects } from "@/lib/projects";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@mui/material";
import React, { useState } from "react";

export default async function ProjectRoute() {
  //create a preview of available projects and link to visit project page
  const data = await getAllProjects();
  const getMemberNameById = async (id: string) => {
    const client = await clientPromise;
    const db = client.db("jira-users");
    const collection: any = db.collection("user-collection");
    const member = await collection.findOne({ _id: id });
    return member?.first_name[0] + member?.last_name[0];
  };
  return (
    <div className="border-2 w-full border-tertiary p-5 my-4 rounded-[10px]">
      <h3 className="text-light-gray text-xl font-medium  pb-1">
        Your Projects
      </h3>
      <div className="w-[8%] border-b-4 border-tertiary" />
      {data?.map((project) => {
        return (
          <div
            key={project._id}
            className="my-4 flex justify-between items-start relative"
          >
            <div className="w-[60%]">
              <h2 className="text-base font-medium pb-2">{project.title}</h2>
              <p className="text-sm text-gray-400">
                Status: {project.status} | Due Date: {project.dueDate} | Created
                By: {project.createdBy}
              </p>
              <p className="text-sm">{project.description}</p>
            </div>
            <div className="flex flex-col justify-between gap-5  h-full w-[30%]">
              <EditProject project={project} />
              {project?.members?.length > 0 && (
                <div className="flex items-end ">
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
          </div>
        );
      })}
    </div>
  );
}
