// pages/api/events/index.ts

import { createRouter } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { createEvent, getAllEvents } from "@/api/services/Event";

// ======================
// WRAPPER QË E BËN MULTER TË FUNKSIONOJË ME NEXT.JS
// ======================
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

// KONFIGURO MULTER
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
  }),
});

const uploadMiddleware = upload.single("image");

const router = createRouter<NextApiRequest, NextApiResponse>();

// GET EVENTS
router.get(async (req, res) => {
  const events = await getAllEvents();
  res.status(200).json(events);
});

// POST EVENT
router.post(async (req, res) => {
  await runMiddleware(req, res, uploadMiddleware); // përdor wrapper për multer

  const { title, description } = req.body;
  const file = (req as any).file;
  const imageUrls = file ? [`/uploads/${file.filename}`] : [];

  const newEvent = await createEvent({ title, description, imageUrls });
  res.status(201).json(newEvent);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// TYPE FIX FOR ERROR: 'err' is of type 'unknown'
export default router.handler({
  onError: (err: any, req, res) => {
    res.status(501).json({ error: `Something went wrong: ${err.message}` });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});
