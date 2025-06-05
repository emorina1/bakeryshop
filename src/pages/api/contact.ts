// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createMessage } from "@/api/services/Message";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const message = req.body;
      const result = await createMessage(message);
      return res.status(200).json({ success: true, id: result.insertedId });
    } catch (error) {
      console.error("Failed to save message:", error);
      return res.status(500).json({ success: false, error: "Failed to save message" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).json({ error: "Method not allowed" });
}
