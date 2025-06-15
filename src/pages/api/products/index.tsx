// pages/api/products/index.ts
import { createProduct, getAllProducts } from "@/api/services/Admin"; // Vini re që importoj nga Admin.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const products = await getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      console.error("Gabim në marrjen e produkteve:", error);
      return res.status(500).json({ message: "Gabim në server." });
    }
  } else if (req.method === "POST") {
    try {
      const productData = req.body;
      if (!productData.title || !productData.body) {
        return res.status(400).json({ message: "Titulli dhe përshkrimi janë të detyrueshëm." });
      }
      const newProduct = await createProduct(productData);
      return res.status(201).json(newProduct);
    } catch (error) {
      console.error("Gabim në krijimin e produktit:", error);
      return res.status(500).json({ message: "Gabim në krijimin e produktit." });
    }
  } else {
    return res.status(405).json({ message: "Metoda nuk lejohet" });
  }
}
