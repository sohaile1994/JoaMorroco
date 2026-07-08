// Turso/libSQL client factory. When TURSO_URL/TOKEN are unset or still hold the
// placeholder text, we transparently fall back to a local SQLite file so the
// whole app is runnable via `netlify dev` with zero cloud setup. The same
// resolution is used by scripts/setup-db.mjs so both point at the same file.
import path from "node:path";
import { createClient } from "@libsql/client";

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

export function getDb() {
  if (cached) return cached;
  cached = isTursoConfigured()
    ? createClient({ url: process.env.TURSO_URL, authToken: process.env.TURSO_TOKEN })
    : createClient({ url: localDbUrl() });
  return cached;
}
