import { getDb } from "./_lib/db.mjs";
import { json, error } from "./_lib/respond.mjs";
import { isValidTour } from "../../shared/tourMeta.mjs";

export const handler = async (event) => {
  const tour = event.queryStringParameters?.tour || "";
  if (!isValidTour(tour)) return error(400, "Invalid tour");

  const db = await getDb();
  const res = await db.execute({
    sql: `SELECT name, stars, review, created_at
            FROM reviews WHERE tour_key = ?
           ORDER BY created_at DESC LIMIT 100`,
    args: [tour],
  });

  const rows = res.rows.map((r) => ({
    name: r.name,
    stars: Number(r.stars),
    review: r.review,
    createdAt: r.created_at,
    verified: true,
  }));

  return json(200, rows);
};
