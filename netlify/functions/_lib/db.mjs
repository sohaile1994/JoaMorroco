// Turso/libSQL client factory.
//
// Production (Turso configured): uses @libsql/client/web — a pure HTTP client
// with no native bindings, so it runs on any Lambda regardless of the OS the
// deploy was made from (native @libsql/<platform> binaries are per-OS and a
// Windows deploy would ship the wrong one).
//
// Local dev (placeholders in .env): falls back to a local SQLite file via the
// Node client, imported lazily so its native binding never loads in prod.
import path from "node:path";

export function isTursoConfigured() {
  const url = process.env.TURSO_URL || "";
  const token = process.env.TURSO_TOKEN || "";
  const looksReal =
    url.startsWith("libsql://") && !/YOUR/i.test(url) && token && !/YOUR/i.test(token);
  return Boolean(looksReal);
}

export function localDbUrl() {
  // Absolute path keeps functions and the setup script in agreement regardless
  // of each process's working directory.
  return "file:" + path.join(process.cwd(), ".data", "local.db");
}

let cached = null;

export async function getDb() {
  if (cached) return cached;
  if (isTursoConfigured()) {
    const { createClient } = await import("@libsql/client/web");
    cached = createClient({ url: process.env.TURSO_URL, authToken: process.env.TURSO_TOKEN });
  } else {
    const { createClient } = await import("@libsql/client");
    cached = createClient({ url: localDbUrl() });
  }
  return cached;
}
