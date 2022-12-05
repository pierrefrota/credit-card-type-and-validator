import type { NextApiRequest, NextApiResponse } from "next";
import { checkIfCardIsValid } from "../../../../utils/checkIfCardIsValid";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const referer = req.headers.referer;
  const secureReferer = referer?.includes(process.env.NEXT_PUBLIC_SECURE_REFERER!);
  // const secureReferer = true;

  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method not allowed.",
      error: true,
    });
  }

  if (!secureReferer) {
    if (!req.headers.token) {
      return res.status(401).json({
        error: true,
        message: "Token not provided.",
      });
    }

    if (req.headers.token !== process.env.NEXT_PUBLIC_TOKEN) {
      return res.status(401).json({
        error: true,
        message: "Your token is invalid.",
      });
    }
  }

  if (!req.query.card) {
    return res.status(400).json({
      error: true,
      message: "Card number is required.",
    });
  }

  return res.status(200).json(await checkIfCardIsValid(req.query.card as string));
}
