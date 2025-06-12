import { createProduct, getAllProducts } from "@/api/services/Product"; // ndryshova getProducts në getAllProducts
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
    // krijo produkt (nëse e ke implementuar)
  } else {
    return res.status(405).json({ message: "Metoda nuk lejohet" });
  }
}
