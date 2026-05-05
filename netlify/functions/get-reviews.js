const VALID_TOURS = ["desert", "blue_and_beyond", "moroccan_odyssey"];

exports.handler = async (event) => {
  const tour    = event.queryStringParameters?.tour || "";
  const tourKey = tour.replace(/-/g, "_");

  if (!VALID_TOURS.includes(tourKey)) {
    return { statusCode: 400, body: "Invalid tour" };
  }

  const { createClient } = await import("@libsql/client");
  const db = createClient({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_TOKEN,
  });

  const result = await db.execute(
    `SELECT name, stars, review FROM ${tourKey}_reviews
     ORDER BY created_at DESC LIMIT 200`
  );

  const rows = result.rows.map((r) => ({
    name:   r.name,
    stars:  r.stars,
    review: r.review,
  }));

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rows),
  };
};
