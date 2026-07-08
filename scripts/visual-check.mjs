// Mobile-first visual verification: 375px viewport, measure horizontal
// overflow on every redesigned page, capture screenshots.
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const CHROME = path.join(
	process.env.LOCALAPPDATA,
	"ms-playwright",
	"chromium-1223",
	"chrome-win64",
	"chrome.exe"
);
const BASE = "http://localhost:8899";
const OUT = path.join(process.cwd(), ".shots");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

const exe = fs.existsSync(CHROME)
	? CHROME
	: path.join(process.env.LOCALAPPDATA, "ms-playwright", "chromium_headless_shell-1223", "chrome-win", "headless_shell.exe");

const browser = await chromium.launch({ executablePath: exe });
const results = [];

async function check(name, url, { clickGalleryTab = false, desktop = false } = {}) {
	const page = await browser.newPage({
		viewport: desktop ? { width: 1280, height: 900 } : { width: 375, height: 812 },
	});
	const errors = [];
	page.on("pageerror", (e) => errors.push(String(e).slice(0, 160)));
	await page.goto(BASE + url, { waitUntil: "networkidle", timeout: 30000 }).catch((e) => errors.push("nav: " + e.message));
	await page.waitForTimeout(1200);

	if (clickGalleryTab) {
		await page.locator(".menu li", { hasText: "Gallery" }).click().catch(() => {});
		await page.waitForTimeout(1200);
	}

	// Scroll through the page in steps so IntersectionObserver reveals fire,
	// then return to top before the full-page capture.
	await page.evaluate(async () => {
		const h = document.body.scrollHeight;
		for (let y = 0; y < h; y += 500) {
			window.scrollTo(0, y);
			await new Promise((r) => setTimeout(r, 90));
		}
		window.scrollTo(0, 0);
	});
	await page.waitForTimeout(900);

	const overflow = await page.evaluate(() => {
		const doc = document.documentElement;
		const over = [];
		if (doc.scrollWidth > window.innerWidth + 1) {
			// find offenders
			document.querySelectorAll("*").forEach((el) => {
				const r = el.getBoundingClientRect();
				if (r.right > window.innerWidth + 1 || r.left < -1) {
					if (over.length < 6 && r.width > 4)
						over.push(`${el.tagName}.${String(el.className).slice(0, 50)} right=${Math.round(r.right)} left=${Math.round(r.left)}`);
				}
			});
		}
		return { scrollWidth: doc.scrollWidth, innerWidth: window.innerWidth, offenders: over };
	});

	const shot = path.join(OUT, `${name}.png`);
	await page.screenshot({ path: shot, fullPage: true });
	results.push({ name, url, ...overflow, errors, shot });
	await page.close();
}

await check("about-mobile", "/about");
await check("contact-mobile", "/contact");
await check("kingdom-gallery-mobile", "/kingdom-of-morocco", { clickGalleryTab: true });
await check("desert-mobile", "/desert");
await check("about-desktop", "/about", { desktop: true });
await check("contact-desktop", "/contact", { desktop: true });

await browser.close();

let fail = 0;
for (const r of results) {
	const ok = r.scrollWidth <= r.innerWidth + 1;
	if (!ok) fail++;
	console.log(
		`${ok ? "OK " : "OVERFLOW"} ${r.name}: scrollWidth=${r.scrollWidth} innerWidth=${r.innerWidth}` +
			(r.errors.length ? ` JS-ERRORS: ${r.errors.join(" | ")}` : "")
	);
	r.offenders.forEach((o) => console.log("   offender:", o));
}
console.log(fail ? `\n${fail} page(s) overflow` : "\nAll pages fit — no horizontal scroll.");
process.exit(fail ? 1 : 0);
