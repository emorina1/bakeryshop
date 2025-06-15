import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // duhet false për të lexuar file upload me formidable
  },
};

const ensureUploadFolder = () => {
  const uploadDir = path.join(process.cwd(), "/public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  return uploadDir;
};

const parseForm = (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable({
    uploadDir: ensureUploadFolder(),
    keepExtensions: true,
    filename: (name, ext, part) => {
      const timestamp = Date.now();
      const cleanName = part.originalFilename?.replace(/\s+/g, "-").toLowerCase() || "upload";
      return `${timestamp}-${cleanName}`;
    },
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { files } = await parseForm(req);
    console.log("Files:", files);

    // e merrim file-n që ka emrin "image" nga forma
    const file = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!file || !file.filepath) {
      return res.status(400).json({ error: "Image not found or invalid" });
    }

    // marrim vetëm emrin e skedarit për URL
    const fileName = path.basename(file.filepath);
    const imageUrl = `/uploads/${fileName}`; // kjo shkon në /public/uploads

    return res.status(200).json({ url: imageUrl });
  } catch (err) {
    console.error("❌ Error uploading file:", err);
    return res.status(500).json({ error: "Upload failed" });
  }
}
