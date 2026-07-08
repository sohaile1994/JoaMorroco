// Small response helpers so every function returns consistent JSON.

const JSON_HEADERS = { "Content-Type": "application/json" };

export function json(statusCode, obj, extraHeaders = {}) {
  return {
    statusCode,
    headers: { ...JSON_HEADERS, ...extraHeaders },
    body: JSON.stringify(obj),
  };
}

export function error(statusCode, message, extra = {}) {
  return json(statusCode, { error: message, ...extra });
}

// Guard the HTTP method; returns a 405 response if it doesn't match, else null.
export function requireMethod(event, method) {
  if (event.httpMethod !== method) {
    return error(405, "Method Not Allowed");
  }
  return null;
}

export function parseBody(event) {
  try {
    return JSON.parse(event.body || "{}");
  } catch {
    return null;
  }
}
