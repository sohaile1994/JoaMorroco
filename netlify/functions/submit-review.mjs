import { getDb } from "./_lib/db.mjs";
import { json, error, requireMethod, parseBody } from "./_lib/respond.mjs";
import { findOwnedBooking } from "./_lib/bookings.mjs";

// Reviews are gated by real booking ownership (session or reference+email),
// replacing the old hardcoded "Zenith" ticket. One review per booking.
export const handler = async (event) => {
  const bad = requireMethod(event, "POST");
  if (bad) return bad;

  const body = parseBody(event);
  if (!body) return error(400, "Invalid JSON");

  const stars = parseInt(body.stars, 10);
  const review = (body.review || "").trim();
  if (!(stars >= 1 && stars <= 5)) return error(400, "Please choose a rating from 1 to 5 stars.");
  if (!review) return error(400, "Please write a short review.");

  const db = getDb();
  const row = await findOwnedBooking(db, event, body);
  if (!row) {
    return error(403, "We couldn't verify a booking for this review. Check your confirmation code and email.");
  }

  const existing = await db.execute({
    sql: `SELECT id FROM reviews WHERE booking_id = ? LIMIT 1`,
    args: [row.id],
  });
  if (existing.rows.length) {
    return error(409, "You've already left a review for this trip. Thank you!");
  }

  // Prefer the name provided, else the (decrypted) booking name's first name.
  const name = (body.name || "").trim() || "Traveler";

  await db.execute({
    sql: `INSERT INTO reviews (booking_id, tour_key, name, stars, review)
          VALUES (?, ?, ?, ?, ?)`,
    args: [row.id, row.tour_key, name.slice(0, 60), stars, review.slice(0, 1000)],
  });

  return json(200, { ok: true });
};
