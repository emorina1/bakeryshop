// pages/api/products/[id].ts
import { deleteProduct, getProduct, updateProduct } from "@/api/services/Product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const product = await getProduct(id as string);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch the product" });
    }
  } else if (req.method === "PUT") {
    try {
      const newProduct = req.body;
      const updatedProduct = await updateProduct(id as string, newProduct);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: "Failed to update the product" });
    }
  } else if (req.method === "DELETE") {
    try {
      await deleteProduct(id as string);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the product" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
