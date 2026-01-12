import serverless from "serverless-http";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createApp } from "../server/index";

let handlerPromise = createApp().then((app) => serverless(app as any));

export default async function (req: VercelRequest, res: VercelResponse) {
  const handler = await handlerPromise;
  return handler(req, res);
}
