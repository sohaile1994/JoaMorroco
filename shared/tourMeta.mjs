// Tiny, dependency-free tour facts shared by the Vite client AND Netlify
// functions. Keep this free of UI strings and Node-only imports so both the
// browser bundle and the serverless bundle can import it.

export const MAX_TRAVELERS = 7; // Mercedes-Benz Vito comfortable capacity

export const TOUR_META = {
  kingdom: { days: 11, name: "The Kingdom of Morocco Tour" },
  desert: { days: 8, name: "Sahara Dreams" },
};

export const VALID_TOURS = Object.keys(TOUR_META);

export function isValidTour(key) {
  return Object.prototype.hasOwnProperty.call(TOUR_META, key);
}

export function tourDays(key) {
  return TOUR_META[key]?.days ?? 0;
}
