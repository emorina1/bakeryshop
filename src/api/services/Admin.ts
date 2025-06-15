import db from "@/lib/mysql";

export async function getAllProducts() {
  const [rows] = await db.execute("SELECT * FROM products ORDER BY id DESC");
  return rows as any[];
}

export async function createProduct(productData: {
  title: string;
  body: string;
  image?: string;
  price?: number;
}) {
  const { title, body, image = "", price = 0 } = productData;

  const [result] = await db.execute(
    "INSERT INTO products (title, body, image, price) VALUES (?, ?, ?, ?)",
    [title, body, image, price]
  );

  // @ts-ignore
  const insertedId = (result as any).insertId;

  return { id: insertedId, title, body, image, price };
}

export async function getAllUsers() {
  const [rows] = await db.execute("SELECT id, name, email, role FROM users");
  return rows as { id: number; name: string; email: string; role: string }[];
}
