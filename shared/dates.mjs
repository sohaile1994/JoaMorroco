// Date helpers — the entire app speaks "YYYY-MM-DD" strings and never passes
// Date objects around. Lexicographic string comparison is a valid date
// comparison for this fixed-width format, so overlap math is just string `<=`.
//
// IMPORTANT: never do `new Date("2026-08-10")` then read local getters — that
// silently shifts a day across timezones. Arithmetic here goes through Date.UTC
// so adding days is DST-safe; "today" is read from the local calendar so the
// user sees their own date.

export const ADVANCE_DAYS = 14; // minimum booking lead time

function pad(n) {
  return String(n).padStart(2, "0");
}

function toYMD(dt) {
  return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
}

// Today on the viewer's local calendar, formatted as YYYY-MM-DD.
export function todayYMD() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Add (or subtract, with negative n) whole days to a YYYY-MM-DD string.
export function addDays(ymd, n) {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + n);
  return toYMD(dt);
}

// Inclusive end date of a tour: a 11-day tour starting the 10th ends the 20th.
export function endDateFor(startYMD, days) {
  return addDays(startYMD, Math.max(0, days - 1));
}

// Earliest date a new booking may start (today + ADVANCE_DAYS).
export function minBookableDate() {
  return addDays(todayYMD(), ADVANCE_DAYS);
}

// Do inclusive ranges [aStart,aEnd] and [bStart,bEnd] overlap on any day?
export function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart <= bEnd && bStart <= aEnd;
}

export function isValidYMD(s) {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

// "August 10, 2026" — for display and PDFs.
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
export function prettyDate(ymd) {
  if (!isValidYMD(ymd)) return ymd || "";
  const [y, m, d] = ymd.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
