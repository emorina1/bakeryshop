// pages/api/events/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid id" });
  }

  const client = await clientPromise;
  const db = client.db("bakerydb");
  const collection = db.collection("events");

  try {
    if (req.method === "GET") {
      const event = await collection.findOne({ _id: new ObjectId(id) });
      if (!event) return res.status(404).json({ message: "Event not found" });

      return res.status(200).json({
        _id: event._id.toHexString(),
        title: event.title,
        description: event.description,
        imageUrls: event.imageUrls || [],
        createdAt: event.createdAt.toISOString(),
      });
    }

    if (req.method === "PUT") {
      const { title, description, imageUrls } = req.body;
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { title, description, imageUrls } }
      );
      if (result.matchedCount === 0) return res.status(404).json({ message: "Event not found" });

      return res.status(200).json({ message: "Event updated" });
    }

    if (req.method === "DELETE") {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) return res.status(404).json({ message: "Event not found" });

      return res.status(200).json({ message: "Event deleted" });
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("API event error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
