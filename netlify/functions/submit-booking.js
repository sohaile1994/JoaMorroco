const VALID_TOURS = ["desert", "blue_and_beyond", "moroccan_odyssey"];
const MAX_SEATS = 12;

function generateTicket() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand = (n) =>
    Array.from({ length: n }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  return `JOA-${rand(4)}-${rand(4)}`;
}

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

  const { tour, name, email, phone, month, guests } = body;
  const tourKey = (tour || "").replace(/-/g, "_");

  if (!VALID_TOURS.includes(tourKey)) {
    return { statusCode: 400, body: "Invalid tour" };
  }
  if (!name?.trim() || !email?.trim() || !phone?.trim() || !month || !guests) {
    return { statusCode: 400, body: "Missing required fields" };
  }
  if (!/^\d{4}-\d{2}$/.test(month)) {
    return { statusCode: 400, body: "Invalid month format" };
  }

  const [yr, mo] = month.split("-").map(Number);
  const now = new Date();
  if (yr < now.getFullYear() || (yr === now.getFullYear() && mo < now.getMonth() + 1)) {
    return { statusCode: 400, body: "Cannot book a past month" };
  }

  const guestNum = parseInt(guests, 10);
  if (isNaN(guestNum) || guestNum < 1 || guestNum > MAX_SEATS) {
    return { statusCode: 400, body: "Invalid guest count" };
  }

  const { createClient } = await import("@libsql/client");
  const db = createClient({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_TOKEN,
  });

  const avail = await db.execute({
    sql: `SELECT COALESCE(SUM(guests), 0) AS booked FROM ${tourKey}_bookings WHERE tour_date = ?`,
    args: [month],
  });
  const booked = Number(avail.rows[0].booked);

  if (booked + guestNum > MAX_SEATS) {
    const available = Math.max(0, MAX_SEATS - booked);
    return {
      statusCode: 409,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ limitReached: true, available, booked }),
    };
  }

  const ticket = generateTicket();

  await db.execute({
    sql: `INSERT INTO ${tourKey}_bookings (name, email, phone, tour_date, guests, ticket)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [name.trim(), email.trim(), phone.trim(), month, guestNum, ticket],
  });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true, ticket }),
  };
};
