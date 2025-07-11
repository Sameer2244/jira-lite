import { getAllProjects } from "@/lib/projects";
import React from "react";

export default async function ProjectRoute() {
  //create a preview of available projects and link to visit project page
  const data = await getAllProjects();
  console.log(data);
  return (
    <div className="border-2 w-full border-tertiary p-5 my-4 rounded-[10px]">
      <h3 className="text-light-gray text-xl font-medium  pb-1">
        Your Projects
      </h3>
      <div className="w-[8%] border-b-4 border-tertiary" />
      {data.map((project) => {
        return (
          <div key={project._id} className="my-4">
            <div>
              <h2 className="text-base font-medium">{project.title}</h2>
              <p className="text-sm">
                Status: {project.status} | Due Date: {project.dueDate} | Created
                By: {project.createdBy}
              </p>
              <p className="text-sm">{project.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
