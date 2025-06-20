import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  return res.json({ role: session.user?.role });
}
