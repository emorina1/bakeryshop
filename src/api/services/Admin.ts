// src/api/services/Admin.ts
import db from "@/lib/mysql";

export async function getAllUsers() {
  const [rows] = await db.execute("SELECT id, name, email, role FROM users");
  return rows as { id: number; name: string; email: string; role: string }[];
}


export async function getTotalProducts() {
  const [rows] = await db.execute("SELECT COUNT(*) AS count FROM products");
  return Array.isArray(rows) && rows.length > 0 ? (rows[0] as any).count : 0;
}

export async function getAllMessages() {
  const [rows] = await db.execute(
    "SELECT id, name, email, message, createdAt FROM messages ORDER BY createdAt DESC"
  );
  return rows as { id: number; name: string; email: string; message: string; createdAt: string }[];
}
