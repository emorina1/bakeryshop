import db from "@/lib/mysql";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Product {
  id?: number;
  title: string;
  body: string;
  image?: string;
  price?: number;
}

export async function getAllProducts(): Promise<Product[]> {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT id, title, body, image, price FROM products"
  );
  return rows as Product[];
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT id, title, body, image, price FROM products WHERE id = ?",
    [id]
  );
  return rows[0] as Product | undefined;
}

export async function createProduct(product: Product) {
  const { title, body, image, price } = product;
  const [result] = await db.query<ResultSetHeader>(
    "INSERT INTO products (title, body, image, price) VALUES (?, ?, ?, ?)",
    [title, body, image, price]
  );
  return { id: result.insertId, ...product };
}

export async function updateProduct(id: string, product: Product) {
  const { title, body, image, price } = product;
  await db.query(
    "UPDATE products SET title = ?, body = ?, image = ?, price = ? WHERE id = ?",
    [title, body, image, price, id]
  );
  return { id, ...product };
}

export async function getTotalProducts(): Promise<number> {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS count FROM products"
  );
  return rows.length > 0 ? (rows[0] as any).count : 0;
}

export async function deleteProduct(id: string) {
  await db.query("DELETE FROM products WHERE id = ?", [id]);
  return { message: `Product ${id} deleted.` };
}
