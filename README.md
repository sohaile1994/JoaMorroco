# JOA Morocco

A tour booking website for JOA Morocco — a small-group travel agency offering curated journeys across Morocco. The site allows visitors to explore three multi-day tours, read day-by-day itineraries and guest reviews, and submit bookings directly through the site.

---

## Tours

### Desert Dreams
**16 days · $2,830 · Sahara Desert & Southern Morocco**

Marrakech to the Erg Chegaga dunes via the High Atlas, Ait Benhaddou, the Draa Valley, Todra Gorge, and the Dades Valley. The longest and most comprehensive route on offer.

### Blue and Beyond
**12 days · $1,900 · Chefchaouen & Northern Morocco**

Tangier to Chefchaouen through the Atlantic coast towns of Asilah, the UNESCO medina of Tetouan, and the Rif Mountain gorges. Focused on the north.

### Moroccan Odyssey
**12 days · $1,900 · Casablanca to Tangier — the full Kingdom**

A cross-country journey from Casablanca to Tangier that takes in Hassan II Mosque, the imperial cities of Marrakech and Fes, the Sahara desert camp, and Chefchaouen.

---

## Pages

| Route | Description |
|---|---|
| `/` | Home / showcase — hero cards for each tour |
| `/about` | About the agency, services offered, and team background |
| `/contact` | Contact form powered by EmailJS |
| `/desert` | Desert Dreams tour detail page |
| `/blue-and-beyond` | Blue and Beyond tour detail page |
| `/moroccan-odyssey` | Moroccan Odyssey tour detail page |

Each tour detail page includes:
- Hero section with tour name and departure info
- Full description and what's included / not included
- Day-by-day itinerary
- Photo gallery
- Guest reviews
- Booking form

---

## Booking System

Bookings are submitted through a form on each tour page. The form collects:

- Full name
- Email address
- Phone number
- Tour month (month picker, current month minimum)
- Number of guests (1–12)

Each tour is capped at **12 seats per month**. Availability is checked in real time as the user picks a month, and the guest selector adjusts to the remaining seats. If a month is full, the form blocks submission and displays a message.

On successful booking, the user receives a **ticket number** (format: `JOA-XXXX-XXXX`). This ticket is required to leave a review.

### Backend

Bookings are handled by a Netlify serverless function at `netlify/functions/submit-booking.js`. The function:

1. Validates the tour, date, and guest count
2. Queries the Turso database to check current seat usage for that month
3. Rejects the request if the seat limit would be exceeded
4. Encrypts the name, email, and phone fields using AES-256-GCM before writing to the database
5. Generates a unique ticket number and returns it to the client

There is a corresponding availability check function at `/api/check-availability` that the booking form polls when the user changes the selected month.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6 |
| Build tool | Vite |
| Hosting / Functions | Netlify |
| Database | Turso (libSQL) |
| Icons | Font Awesome |
| Contact form | EmailJS |

---

## Local Development

The project uses Netlify Dev to run both the Vite dev server and the serverless functions together on a single port.

```bash
npm install
npm run dev
```

The site is available at `http://localhost:8888`. The Netlify functions are proxied automatically so `/api/*` routes work locally without any extra configuration.

To run the Vite server alone (no functions):

```bash
npm run dev:vite
```

---

## Environment Variables

Create a `.env` file in the project root with the following keys:

```
TURSO_URL=libsql://your-db-name.turso.io
TURSO_TOKEN=your_token_here
ENCRYPTION_KEY=your_64_char_hex_key_here
```

`ENCRYPTION_KEY` must be a 64-character hex string representing 32 bytes (AES-256). Generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Database

Three tables in Turso, one per tour:

- `desert_bookings`
- `blue_and_beyond_bookings`
- `moroccan_odyssey_bookings`

Each table stores: `name`, `email`, `phone` (all AES-256-GCM encrypted), `tour_date` (YYYY-MM), `guests`, and `ticket`.

---

## Build & Deploy

```bash
npm run build
```

Outputs a production bundle to `dist/`. Deploy by pushing to the connected Netlify site — the build command and publish directory are picked up from `netlify.toml` or the Netlify dashboard settings.

---

## Contact

**JOA Morocco**  
joamorocco@gmail.com  
+212 600 000 000  
Marrakech, Morocco
