const sharp = require("sharp");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegPath);

const ASSETS = path.join(__dirname, "../public/assets");

// ── Images ──────────────────────────────────────────────────────────────────
// [inputFile, maxWidth, quality]
// Source can be jpg, jpeg, png, or an existing webp that needs re-optimizing.
// Hero images (full-screen): 1600px max, 82q.
// Background / card images:  1200px max, 78q.
// Small UI images:           800px max,  75q.
const images = [
  // Hero showcase posters — visible while video loads, needs sharp quality
  ["moroccan-odysey-hero.jpg",  1600, 82],
  ["blue-alley.jpg",            1600, 82],
  ["desert-show-case.jpg",      1600, 82],
  // Section backgrounds
  ["contact-background.jpg",    1200, 78],
  ["sunRise.jpg",                800, 75],
  // Card / misc images
  ["food.jpg",                  1200, 78],
  ["camel.jpg",                  900, 75],
  ["camp.jpg",                  1200, 76],
  ["camel-group.jpg",            900, 75],
  ["dunes.jpg",                 1200, 78],
  ["port-city.jpg",             1200, 76],
  ["spices.jpg",                1200, 78],
  ["city.jpg",                  1200, 76],
  // scroll icon — small PNG → tiny WebP
  ["scroll-icon.png",           120, 80],
];

async function optimizeImages() {
  for (const [file, maxWidth, quality] of images) {
    const input = path.join(ASSETS, file);
    if (!fs.existsSync(input)) {
      console.log(`  skip (not found): ${file}`);
      continue;
    }

    const outName = file.replace(/\.(jpe?g|png|webp)$/i, ".webp");
    const output = path.join(ASSETS, outName);

    const before = (fs.statSync(input).size / 1024).toFixed(0);
    await sharp(input)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(output);
    const after = (fs.statSync(output).size / 1024).toFixed(0);
    console.log(`  ${file.padEnd(40)} ${before.padStart(6)} KB  →  ${outName}  ${after} KB`);
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
        "-vf scale=-2:720",
        "-crf 28",
        "-preset fast",
        "-profile:v baseline",
        "-level 3.1",
        "-movflags +faststart",
        "-an",
      ])
      .output(tmpOut)
      .on("end", () => {
        const after = (fs.statSync(tmpOut).size / 1024 / 1024).toFixed(1);
        fs.renameSync(tmpOut, input);
        console.log(`  ${file.padEnd(50)} ${before} MB  →  ${after} MB`);
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
