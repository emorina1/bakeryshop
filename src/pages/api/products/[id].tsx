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
      res.status(500).json(error);
    }
  } else if (req.method === "PUT") {
    try {
      const newProduct = req.body;
      const result = await updateProduct(id as string, newProduct);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === "DELETE") {
    try {
      const result = await deleteProduct(id as string);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ message: "The request method is not supported." });
  }
}
