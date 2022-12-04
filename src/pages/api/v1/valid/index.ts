import type { NextApiRequest, NextApiResponse } from "next";
import { checkIfCardIsValid } from "../../../../utils/checkIfCardIsValid";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "GET") {
    return res.status(401).json({
      message: "Method not allowed.",
      error: true,
    });
  }

  if (!req.query.card) {
    return res.json({
      error: true,
      message: "Card number is required.",
    });
  }

  return res.status(200).json(await checkIfCardIsValid(req.query.card as string));
}
