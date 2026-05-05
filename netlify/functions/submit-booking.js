const VALID_TOURS = ["desert", "blue_and_beyond", "moroccan_odyssey"];

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

  const { tour, name, email, phone, date, guests } = body;
  const tourKey = (tour || "").replace(/-/g, "_");

  if (!VALID_TOURS.includes(tourKey)) {
    return { statusCode: 400, body: "Invalid tour" };
  }
  if (!name?.trim() || !email?.trim() || !phone?.trim() || !date || !guests) {
    return { statusCode: 400, body: "Missing required fields" };
  }

  const { createClient } = await import("@libsql/client");
  const db = createClient({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_TOKEN,
  });

  await db.execute({
    sql: `INSERT INTO ${tourKey}_bookings (name, email, phone, tour_date, guests)
          VALUES (?, ?, ?, ?, ?)`,
    args: [name.trim(), email.trim(), phone.trim(), date, parseInt(guests, 10)],
  });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true }),
  };
};
