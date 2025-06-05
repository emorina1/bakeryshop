// services/Message.ts
import clientPromise from "@/lib/mongodb";
import { Message } from "@/api/models/Message";

// Create a new contact message
export async function createMessage(data: Message) {
  const client = await clientPromise;
  const db = client.db("bakerydb");

  const { _id, ...rest } = data;
  void _id; // explicitly ignore _id if passed

  const result = await db.collection("messages").insertOne({
    ...rest,
    createdAt: new Date(),
  });

  return result;
}

// Fetch all contact messages (for admin dashboard)
export async function getAllMessages() {
  const client = await clientPromise;
  const db = client.db("bakerydb");

  const messages = await db
    .collection("messages")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return messages;
}
