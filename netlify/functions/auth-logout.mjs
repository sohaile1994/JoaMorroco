import { json, requireMethod } from "./_lib/respond.mjs";
import { clearSessionCookie } from "./_lib/session.mjs";

export const handler = async (event) => {
  const bad = requireMethod(event, "POST");
  if (bad) return bad;
  return json(200, { ok: true }, { "Set-Cookie": clearSessionCookie() });
};
