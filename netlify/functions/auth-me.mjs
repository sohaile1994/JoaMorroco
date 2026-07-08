import { json } from "./_lib/respond.mjs";
import { getSessionUser } from "./_lib/session.mjs";

export const handler = async (event) => {
  const session = getSessionUser(event);
  if (!session) return json(200, { user: null });
  return json(200, { user: { name: session.name, email: session.email } });
};
