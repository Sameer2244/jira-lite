import React from "react";

const getProjects = async () => {
  try {
    const data = await fetch("http://localhost:3000/api/projects", {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!data.ok) throw new Error("Failed to fetch data");
    return data.json();
  } catch (err) {
    console.log(err);
  }
};

export default async function ProjectRoute() {
  //create a preview of available projects and link to visit project page
  // const data = await getProjects();
  // console.log(data);
  return <div></div>;
}
