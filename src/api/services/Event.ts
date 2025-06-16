import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export interface Event {
  _id?: string;
  title: string;
  description: string;
  imageUrls: string[];
  createdAt?: string;
}

export async function createEvent(data: Omit<Event, "_id" | "createdAt">): Promise<Event> {
  const client = await clientPromise;
  const db = client.db("bakerydb");

  const createdAt = new Date();

  const result = await db.collection("events").insertOne({
    ...data,
    createdAt,
  });

  return {
    _id: result.insertedId.toHexString(),
    ...data,
    createdAt: createdAt.toISOString(),
  };
}

export async function getAllEvents(): Promise<Event[]> {
  const client = await clientPromise;
  const db = client.db("bakerydb");

  const events = await db.collection("events").find().sort({ createdAt: -1 }).toArray();

  return events.map((e) => ({
    _id: e._id.toHexString(),
    title: e.title,
    description: e.description,
    imageUrls: e.imageUrls,
    createdAt: typeof e.createdAt === "string" ? e.createdAt : e.createdAt.toISOString(),
  }));
}

export async function updateEvent(id: string, data: Omit<Event, "_id" | "createdAt">): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db("bakerydb");

  const result = await db.collection("events").updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );

  return result.modifiedCount === 1;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db("bakerydb");

  const result = await db.collection("events").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
