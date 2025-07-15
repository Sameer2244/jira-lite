import clientPromise from "@/lib/mongodb";
import React from "react";

export default async function MemberList({
  members,
}: Readonly<{ members: string[] }>) {
  const getMemberNameById = async (id: string) => {
    const client = await clientPromise;
    const db = client.db("jira-users");
    const collection: any = db.collection("user-collection");
    const member = await collection.findOne({ _id: id });
    return member?.first_name[0] + member?.last_name[0];
  };
  return (
    <div>
      {members?.length > 0 && (
        <div className="flex items-center pt-4">
          <span>Members:</span>
          {[
            members?.map((member) => {
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
  );
}
