const sharp = require("sharp");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegPath);

const ASSETS = path.join(__dirname, "../public/assets");

// ── Images ──────────────────────────────────────────────────────────────────
// Each entry: [inputFile, maxWidth, quality]
// Hero images: 1920px wide, 82q. Gallery/misc: 1400px, 78q.
const images = [
  ["moroccan-odysey-hero.jpg",  1920, 82],
  ["blue-alley.jpg",            1920, 82],
  ["desert-show-case.jpg",      1920, 82],
  ["food.jpg",                  1400, 78],
  ["camel.jpg",                 1400, 78],
  ["camp.jpg",                  1400, 78],
  ["contact-background.jpg",    1920, 80],
  ["camel-group.jpg",           1400, 78],
  ["dunes.jpg",                 1400, 78],
  ["port-city.jpg",             1400, 78],
  ["spices.jpg",                1400, 78],
  ["sunRise.jpg",               1400, 78],
  ["city.jpg",                  1400, 78],
];

async function optimizeImages() {
  for (const [file, maxWidth, quality] of images) {
    const input = path.join(ASSETS, file);
    const outName = file.replace(/\.(jpe?g|png)$/i, ".webp");
    const output = path.join(ASSETS, outName);

    if (!fs.existsSync(input)) {
      console.log(`  skip (not found): ${file}`);
      continue;
    }

    const before = (fs.statSync(input).size / 1024 / 1024).toFixed(2);
    await sharp(input)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(output);
    const after = (fs.statSync(output).size / 1024 / 1024).toFixed(2);
    console.log(`  ${file.padEnd(35)} ${before} MB  →  ${outName}  ${after} MB`);
  }
}

// ── Videos ───────────────────────────────────────────────────────────────────
// Re-encode to H.264, 720p, CRF 28, strip audio (background muted videos)
const videos = [
  "ShowCase_Blue_Alley_In_Chefchaouen_uhd.mp4",
  "ShowCase_Hands_Holding_Desert_Sand.mp4",
  "ShowCase_Palace_And_Morocco_Flag.mp4",
];

function encodeVideo(file) {
  return new Promise((resolve, reject) => {
    const input  = path.join(ASSETS, file);
    const tmpOut = path.join(ASSETS, file.replace(".mp4", ".tmp.mp4"));

    if (!fs.existsSync(input)) {
      console.log(`  skip (not found): ${file}`);
      return resolve();
    }

    const before = (fs.statSync(input).size / 1024 / 1024).toFixed(1);

    ffmpeg(input)
      .videoCodec("libx264")
      .outputOptions([
        "-vf scale=-2:720",       // 720p, keep aspect ratio
        "-crf 28",                // quality (lower = better, 28 = good for bg video)
        "-preset fast",
        "-profile:v baseline",    // broadest device support
        "-level 3.1",
        "-movflags +faststart",   // put moov atom at front for faster streaming
        "-an",                    // strip audio (these are muted background videos)
      ])
      .output(tmpOut)
      .on("end", () => {
        const after = (fs.statSync(tmpOut).size / 1024 / 1024).toFixed(1);
        fs.renameSync(tmpOut, input);
        console.log(`  ${file.padEnd(48)} ${before} MB  →  ${after} MB`);
        resolve();
      })
      .on("error", (err) => {
        if (fs.existsSync(tmpOut)) fs.unlinkSync(tmpOut);
        reject(err);
      })
      .run();
  });
}

async function optimizeVideos() {
  for (const v of videos) {
    await encodeVideo(v);
  }
}

(async () => {
  console.log("\n── Images ──────────────────────────────────────────────────");
  await optimizeImages();
  console.log("\n── Videos ──────────────────────────────────────────────────");
  console.log("  (re-encoding to 720p H.264 — this takes a few minutes)\n");
  await optimizeVideos();
  console.log("\n── Done ─────────────────────────────────────────────────────\n");
})();
