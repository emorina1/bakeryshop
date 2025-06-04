	import db from "@/lib/mysql";
import { Product } from "@/models/Product";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

// Merr të gjithë produktet
export async function getProducts(): Promise<Product[]> {
  const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM products");
  return rows as Product[];
}

// Merr një produkt sipas ID
export async function getProduct(id: string): Promise<Product | undefined> {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM products WHERE id = ?",
    [id]
  );
  return rows[0] as Product | undefined;
}

// Krijon produkt
export async function createProduct(product: Product) {
  const { title, body, image, price } = product;
  const [result] = await db.query<ResultSetHeader>(
    "INSERT INTO products (title, body, image, price) VALUES (?, ?, ?, ?)",
    [title, body, image, price]
  );
  return { id: result.insertId, ...product };
}

// Përditëson produkt
export async function updateProduct(id: string, product: Product) {
  const { title, body, image, price } = product;
  await db.query(
    "UPDATE products SET title = ?, body = ?, image = ?, price = ? WHERE id = ?",
    [title, body, image, price, id]
  );
  return { id, ...product };
}

// Fshin produkt
export async function deleteProduct(id: string) {
  await db.query("DELETE FROM products WHERE id = ?", [id]);
  return { message: `Product ${id} deleted.` };
}
