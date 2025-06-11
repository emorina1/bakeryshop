// src/api/services/Admin.ts
import clientPromise from "@/lib/mysql";

// Merr të gjithë përdoruesit nga tabela `users`
export async function getAllUsers() {
  const conn = await clientPromise;
  const [rows] = await conn.execute("SELECT * FROM users");
  return rows as any[]; // mund të shtosh tipin User[] nëse e ke të definuar
}

// Merr numrin total të recetave nga tabela `recipes`
export async function getTotalRecipes() {
  const conn = await clientPromise;
  const [rows] = await conn.execute("SELECT COUNT(*) AS count FROM recipes");
  const count = Array.isArray(rows) && rows.length > 0 ? (rows[0] as any).count : 0;
  return count;
}
