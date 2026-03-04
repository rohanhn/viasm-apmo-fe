// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  // @ts-ignore
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ status: 'ok' });
}
