import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid or missing id" });
  }

  const client = await clientPromise;
  const db = client.db("bakerydb");
  const collection = db.collection("events");

  if (req.method === "GET") {
    try {
      const event = await collection.findOne({ _id: new ObjectId(id) });
      if (!event) return res.status(404).json({ error: "Event not found" });
      return res.status(200).json(event);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch event" });
    }
  } else if (req.method === "PUT") {
    try {
      const { title, description, imageUrls } = req.body;
      const updateDoc = {
        $set: {
          title,
          description,
          imageUrls,
          updatedAt: new Date(),
        },
      };

      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        updateDoc,
        { returnDocument: "after" }
      );

      if (!result || !result.value) {
        return res.status(404).json({ error: "Event not found" });
      }

      return res.status(200).json(result.value);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update event" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
