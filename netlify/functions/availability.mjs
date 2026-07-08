import { getDb } from "./_lib/db.mjs";
import { json, error } from "./_lib/respond.mjs";
import { todayYMD, addDays, minBookableDate, isValidYMD } from "../../shared/dates.mjs";

// Returns every blocked date range (across BOTH tours — one private operation,
// one vehicle) that could affect the visible calendar window, plus the earliest
// bookable date. The client turns these ranges into disabled calendar days,
// including start dates whose tour would *run into* a booked range.
export const handler = async (event) => {
  const q = event.queryStringParameters || {};
  const from = isValidYMD(q.from) ? q.from : todayYMD();
  // Clamp the window to 18 months so a crafted query can't scan unbounded.
  const to = isValidYMD(q.to) ? q.to : addDays(from, 550);
  const clampedTo = to > addDays(from, 550) ? addDays(from, 550) : to;

  const db = await getDb();
  // Any non-cancelled booking whose range ends on/after the window start is
  // relevant (an earlier-starting long tour can still block days inside it).
  const res = await db.execute({
    sql: `SELECT tour_key, start_date, end_date
            FROM bookings
           WHERE status != 'cancelled' AND end_date >= ?
           ORDER BY start_date ASC`,
    args: [from],
  });

  const bookedRanges = res.rows
    .filter((r) => r.start_date <= clampedTo)
    .map((r) => ({ start: r.start_date, end: r.end_date, tour: r.tour_key }));

  return json(200, { bookedRanges, minStart: minBookableDate(), today: todayYMD() });
};
