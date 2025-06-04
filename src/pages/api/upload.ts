import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm, Fields, Files } from 'formidable';

// Disable bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();

  form.parse(req, (err: any, fields: Fields, files: Files) => {
    if (err) {
      res.status(500).json({ error: 'Failed to parse form' });
      return;
    }

    res.status(200).json({ fields, files });
  });
}
