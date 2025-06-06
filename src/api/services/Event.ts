import clientPromise from "@/lib/mongodb";
import { Event } from "@/api/models/Event";

// Krijo event të ri
export async function createEvent(data: Event) {
  const client = await clientPromise;
  const db = client.db("bakerydb");

  const { _id, ...rest } = data;
  void _id; // për të injoruar nëse vjen me ID

  const result = await db.collection("events").insertOne({
    ...rest,
    createdAt: new Date(),
  });

  return result;
}

// Merr të gjitha eventet
export async function getAllEvents() {
  const client = await clientPromise;
  const db = client.db("bakerydb");

  const events = await db
    .collection("events")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return events;
}
