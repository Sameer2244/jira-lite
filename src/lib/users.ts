import { auth } from "@clerk/nextjs/server";
import clientPromise from "./mongodb";

export const getAllUsers = async () => {
  const client = await clientPromise;
  const db = client.db("jira-users");
  const collection: any = db.collection("user-collection");
  const data: any = await collection.find({}).toArray();
  return data.map((user: any) => ({
    _id: user._id,
    name: user.first_name + " " + user.last_name,
    email: user.email,
  }));
};

export const getAllUsersExceptCurrentUser = async () => {
  const client = await clientPromise;
  const { userId } = await auth();
  const db = client.db("jira-users");
  const collection: any = db.collection("user-collection");
  const data = await collection.find({ _id: { $ne: userId } }).toArray();
  return data.map((user: any) => {
    return {
      _id: user._id,
      name: user.first_name + " " + user.last_name,
      email: user.email,
    };
  });
};

export const getUserById = async (id: string) => {
  const client = await clientPromise;
  const db = client.db("jira-users");
  const collection: any = db.collection("user-collection");
  const data = await collection.findOne({ _id: id });
  return data.map((user: any) => ({
    _id: user._id,
    name: user.first_name + " " + user.last_name,
    email: user.email,
  }));
};
