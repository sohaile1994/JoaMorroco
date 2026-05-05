const VALID_TOURS = ["desert", "blue_and_beyond", "moroccan_odyssey"];
const TICKET_KEY  = "Zenith";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { tour, ticket, name, stars, review } = body;

  if (ticket !== TICKET_KEY) {
    return { statusCode: 403, body: "Invalid ticket" };
  }

  const tourKey = (tour || "").replace(/-/g, "_");
  if (!VALID_TOURS.includes(tourKey)) {
    return { statusCode: 400, body: "Invalid tour" };
  }
  if (!name?.trim() || !review?.trim() || !stars) {
    return { statusCode: 400, body: "Missing fields" };
  }
  const starNum = parseInt(stars, 10);
  if (starNum < 1 || starNum > 5) {
    return { statusCode: 400, body: "Stars must be 1–5" };
  }

  const { createClient } = await import("@libsql/client");
  const db = createClient({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_TOKEN,
  });

  await db.execute({
    sql: `INSERT INTO ${tourKey}_reviews (name, stars, review) VALUES (?, ?, ?)`,
    args: [name.trim(), starNum, review.trim()],
  });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true }),
  };
};
