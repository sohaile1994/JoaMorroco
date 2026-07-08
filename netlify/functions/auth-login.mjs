import { getDb } from "./_lib/db.mjs";
import { json, error, requireMethod, parseBody } from "./_lib/respond.mjs";
import { verifyPassword } from "./_lib/crypto.mjs";
import { signSession, sessionCookie } from "./_lib/session.mjs";

export const handler = async (event) => {
  const bad = requireMethod(event, "POST");
  if (bad) return bad;

  const body = parseBody(event);
  if (!body) return error(400, "Invalid JSON");

  const email = (body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  if (!email || !password) return error(400, "Email and password are required.");

  const db = getDb();
  const res = await db.execute({
    sql: `SELECT id, email, password_hash, name FROM users WHERE email = ? LIMIT 1`,
    args: [email],
  });
  const user = res.rows[0];

  // Generic message either way — don't reveal whether the email exists.
  if (!user || !verifyPassword(password, user.password_hash)) {
    return error(401, "Invalid email or password.");
  }

  const token = signSession({ uid: Number(user.id), email: user.email, name: user.name });
  return json(
    200,
    { user: { name: user.name, email: user.email } },
    { "Set-Cookie": sessionCookie(token) }
  );
};
