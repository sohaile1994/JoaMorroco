// Stateless signed sessions — no sessions table needed. Token is
// base64url(payload) + "." + base64url(HMAC-SHA256(payload)). Verified with a
// timing-safe compare; expiry lives inside the payload.
import crypto from "node:crypto";
import { sessionSecret } from "./crypto.mjs";

const COOKIE_NAME = "joa_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function b64url(buf) {
  return Buffer.from(buf).toString("base64url");
}

function sign(body) {
  return crypto.createHmac("sha256", sessionSecret()).update(body).digest("base64url");
}

// payload: { uid, email, name }
export function signSession(payload) {
  const full = { ...payload, exp: nowSeconds() + MAX_AGE_SECONDS };
  const body = b64url(JSON.stringify(full));
  return `${body}.${sign(body)}`;
}

export function verifySession(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!data.exp || data.exp < nowSeconds()) return null;
    return data;
  } catch {
    return null;
  }
}

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

export function sessionCookie(token) {
  return `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${MAX_AGE_SECONDS}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

// Read + verify the session from an incoming Netlify event. Returns the
// payload ({ uid, email, name }) or null.
export function getSessionUser(event) {
  const cookieHeader =
    event.headers?.cookie || event.headers?.Cookie || "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  return verifySession(match.slice(COOKIE_NAME.length + 1));
}
