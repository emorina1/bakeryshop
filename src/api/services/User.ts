import clientPromise from "@/lib/mysql";

export interface NewUser {
  id?: number; // opsionale, pasi krijohet nga DB
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

// Kthen përdoruesin sipas email-it, ose null nëse nuk gjendet
export async function getUserByEmail(email: string) {
  const conn = await clientPromise;
  const [rows] = await conn.execute(
    "SELECT id, name, email, password, role FROM users WHERE email = ?",
    [email]
  );
  const users = rows as any[];
  return users.length > 0 ? users[0] : null;
}

// Kthen përdoruesin sipas id-së, ose null nëse nuk gjendet
export async function getUserById(id: number) {
  const conn = await clientPromise;
  const [rows] = await conn.execute(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );
  const users = rows as any[];
  return users.length > 0 ? users[0] : null;
}

// Fut një përdorues të ri në DB dhe kthen insertId
export async function createUser(user: NewUser) {
  const conn = await clientPromise;
  const [result] = await conn.execute(
    `INSERT INTO users (name, email, password, role, createdAt) VALUES (?, ?, ?, ?, ?)`,
    [user.name, user.email, user.password, user.role, user.createdAt]
  );

  return result as { insertId: number };
}
