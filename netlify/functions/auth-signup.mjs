import { getDb } from "./_lib/db.mjs";
import { json, error, requireMethod, parseBody } from "./_lib/respond.mjs";
import { hashPassword } from "./_lib/crypto.mjs";
import { signSession, sessionCookie } from "./_lib/session.mjs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const handler = async (event) => {
  const bad = requireMethod(event, "POST");
  if (bad) return bad;

  const body = parseBody(event);
  if (!body) return error(400, "Invalid JSON");

  const name = (body.name || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!name) return error(400, "Please enter your name.");
  if (!EMAIL_RE.test(email)) return error(400, "Please enter a valid email address.");
  if (password.length < 8) return error(400, "Password must be at least 8 characters.");

  const db = getDb();

  const existing = await db.execute({
    sql: `SELECT id FROM users WHERE email = ? LIMIT 1`,
    args: [email],
  });
  if (existing.rows.length) {
    return error(409, "An account with this email already exists.");
  }

  const result = await db.execute({
    sql: `INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)`,
    args: [email, hashPassword(password), name],
  });

  const uid = Number(result.lastInsertRowid);
  const token = signSession({ uid, email, name });
  return json(200, { user: { name, email } }, { "Set-Cookie": sessionCookie(token) });
};
