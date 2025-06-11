import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByEmail, createUser } from "@/api/services/User";
import bcrypt from "bcryptjs";

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metoda e kërkesës nuk është e mbështetur" });
  }

  const { name, email, password } = req.body as RegisterRequestBody;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Ju lutem plotësoni të gjitha fushat" });
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Email-i është i regjistruar tashmë" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    };

    const result = await createUser(newUser);

    res.status(201).json({ message: "Përdoruesi u regjistrua me sukses", userId: result.insertId });
  } catch (error) {
    console.error("❌ Error POST /api/auth/register:", error);
    res.status(500).json({ error: "Gabim gjatë regjistrimit" });
  }
}
