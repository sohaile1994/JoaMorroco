const VALID_TOURS = ["desert", "blue_and_beyond", "moroccan_odyssey"];
const MAX_SEATS = 12;

exports.handler = async (event) => {
  const { tour, month } = event.queryStringParameters || {};
  const tourKey = (tour || "").replace(/-/g, "_");

  if (!VALID_TOURS.includes(tourKey)) {
    return { statusCode: 400, body: "Invalid tour" };
  }
  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return { statusCode: 400, body: "Invalid month" };
  }

  const { createClient } = await import("@libsql/client");
  const db = createClient({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_TOKEN,
  });

  const result = await db.execute({
    sql: `SELECT COALESCE(SUM(guests), 0) AS booked FROM ${tourKey}_bookings WHERE tour_date = ?`,
    args: [month],
  });

  const booked = Number(result.rows[0].booked);
  const available = Math.max(0, MAX_SEATS - booked);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ booked, available, max: MAX_SEATS }),
  };
};
