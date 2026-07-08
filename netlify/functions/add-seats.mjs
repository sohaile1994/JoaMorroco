import { getDb } from "./_lib/db.mjs";
import { json, error, requireMethod, parseBody } from "./_lib/respond.mjs";
import { processPayment } from "./_lib/payment.mjs";
import { findOwnedBooking, serializeBooking } from "./_lib/bookings.mjs";
import { validateParty, computeQuote } from "../../shared/pricing.mjs";

export const handler = async (event) => {
  const bad = requireMethod(event, "POST");
  if (bad) return bad;

  const body = parseBody(event);
  if (!body) return error(400, "Invalid JSON");

  const addA = Math.max(0, Number(body.addAdults) || 0);
  const addC = Math.max(0, Number(body.addChildren) || 0);
  const addT = Math.max(0, Number(body.addToddlers) || 0);
  if (addA + addC + addT < 1) return error(400, "Add at least one guest.");

  const db = await getDb();
  const row = await findOwnedBooking(db, event, body);
  if (!row) return error(404, "No booking found with that code and email.");
  if (row.status === "cancelled") return error(400, "This booking has been cancelled.");

  const newAdults = row.adults + addA;
  const newChildren = row.children + addC;
  const newToddlers = row.toddlers + addT;

  // Capacity is enforced here (validateParty caps total at MAX_TRAVELERS).
  const party = validateParty(row.tour_key, newAdults, newChildren, newToddlers);
  if (!party.ok) return error(400, party.error);

  // Recompute the WHOLE party — adding guests can drop everyone into a cheaper
  // per-person tier, so the delta is on the recomputed totals, not a flat add.
  const oldQuote = computeQuote(row.tour_key, row.adults, row.children, row.toddlers);
  const newQuote = computeQuote(row.tour_key, newAdults, newChildren, newToddlers);
  const deltaCents = Math.max(0, newQuote.totalCents - oldQuote.totalCents);

  // Charge the delta (simulated). Free additions (toddlers only) skip payment.
  let pay = { method: "card", txStatus: "test", last4: null };
  if (deltaCents > 0) {
    const result = processPayment(body.payment || {});
    if (!result.ok) return error(402, result.error);
    pay = result;
  }

  await db.execute({
    sql: `UPDATE bookings
             SET adults = ?, children = ?, toddlers = ?, total_cents = ?, price_breakdown = ?
           WHERE id = ?`,
    args: [
      newAdults,
      newChildren,
      newToddlers,
      newQuote.totalCents,
      JSON.stringify(newQuote),
      row.id,
    ],
  });

  if (deltaCents > 0) {
    await db.execute({
      sql: `INSERT INTO transactions
              (booking_id, amount_cents, method, status, provider, card_last4, kind)
            VALUES (?, ?, ?, ?, 'simulated', ?, 'add_seats')`,
      args: [row.id, deltaCents, pay.method, pay.txStatus, pay.last4 || null],
    });
  }

  const updated = {
    ...row,
    adults: newAdults,
    children: newChildren,
    toddlers: newToddlers,
    total_cents: newQuote.totalCents,
    price_breakdown: JSON.stringify(newQuote),
  };

  return json(200, {
    booking: serializeBooking(updated),
    chargedCents: deltaCents,
    instructions: pay.instructions || "",
  });
};
