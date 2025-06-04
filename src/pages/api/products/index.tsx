// pages/api/products/index.ts
import { createProduct, getProducts } from "@/api/services/Product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const newProduct = req.body;
      const result = await createProduct(newProduct);
      res.status(201).json(result);
    } catch (error) {
      console.error("❌ Error creating product:", error); // e përdorim error-in
      res.status(500).json({ message: "Gabim gjatë krijimit të produktit." });
    }
  } else if (req.method === "GET") {
    try {
      const products = await getProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error("❌ Error fetching products:", error); // e përdorim error-in
      res.status(500).json({ message: "Gabim gjatë marrjes së produkteve." });
    }
  } else {
    res.status(405).json({ message: "Metoda e kërkesës nuk është e mbështetur." });
  }
}
