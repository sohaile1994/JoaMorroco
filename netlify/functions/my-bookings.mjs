import { getDb } from "./_lib/db.mjs";
import { json, error } from "./_lib/respond.mjs";
import { getSessionUser } from "./_lib/session.mjs";
import { serializeBooking } from "./_lib/bookings.mjs";

export const handler = async (event) => {
  const session = getSessionUser(event);
  if (!session) return error(401, "Please log in to view your trips.");

  const db = getDb();
  const res = await db.execute({
    sql: `SELECT b.*, (r.id IS NOT NULL) AS has_review
            FROM bookings b
            LEFT JOIN reviews r ON r.booking_id = b.id
           WHERE b.user_id = ?
           ORDER BY b.created_at DESC`,
    args: [session.uid],
  });

  const bookings = res.rows.map((row) => ({
    ...serializeBooking(row),
    hasReview: Boolean(Number(row.has_review)),
  }));

  return json(200, { bookings });
};
