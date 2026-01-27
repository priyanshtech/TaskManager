import { auth0 } from "@/lib/auth0";

export const GET = (req, ctx) => auth0.handler(req, ctx);
export const POST = (req, ctx) => auth0.handler(req, ctx);
