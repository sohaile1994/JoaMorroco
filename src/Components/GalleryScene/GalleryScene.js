import React from "react";
import "./GalleryScene.css";

// The gallery stage, built like a mask:
//   1. A clip wrapper shaped exactly like the tent/kasbah OUTER silhouette
//      holds the sky gradient and the photo carousel — so background and
//      photos can never paint outside the structure.
//   2. The artwork (cloth, flaps, walls) is drawn ON TOP of the clipped
//      content. Its interior is transparent, so you look "into" the tent:
//      sky behind, photos in front, cloth framing everything.
// Wind animation lives in CSS: swaying flaps, swinging tassels, flapping
// flags, flickering fire.
//
// Both clip paths use objectBoundingBox units and mirror the artwork's
// silhouette in its 1000x700 viewBox (divide x by 1000, y by 700). The
// artwork stretches with preserveAspectRatio="none", so they always match.

const TENT_CLIP = `M0,1 L0,0.24
	C0.05,0.169 0.13,0.094 0.212,0.071
	C0.32,0.1 0.42,0.126 0.5,0.129
	C0.58,0.126 0.68,0.1 0.788,0.071
	C0.87,0.094 0.95,0.169 1,0.24
	L1,1 Z`;

// Kasbah skyline: up the left tower, along the rampart, over the taller
// central mansion, back along the rampart, up and over the right tower.
// Clip tops sit at the SOLID wall line (below the crenel teeth), so the
// notches between merlons stay empty — no sky peeking through them.
const KASBAH_CLIP = `M0.006,1 L0.006,0.106 L0.086,0.106 L0.086,0.171
	L0.41,0.171 L0.41,0.086 L0.59,0.086 L0.59,0.171
	L0.914,0.171 L0.914,0.106 L0.994,0.106 L0.994,1 Z`;

// ── Tent (Sahara Dreams) — twin-peak Berber haima ────────────────────────
const TentFrame = () => (
	<svg
		className="gscene-frame"
		viewBox="0 0 1000 700"
		preserveAspectRatio="none"
		aria-hidden="true"
		focusable="false"
	>
		<defs>
			<pattern id="haimaStripes" width="46" height="700" patternUnits="userSpaceOnUse">
				<rect width="46" height="700" fill="#8c4526" />
				<rect width="20" height="700" fill="#6f3319" />
				<rect x="20" width="4" height="700" fill="#d99a4e" opacity="0.55" />
			</pattern>
			<radialGradient id="lanternGlow" r="0.5">
				<stop offset="0%" stopColor="#ffcf8a" stopOpacity="0.85" />
				<stop offset="100%" stopColor="#ffcf8a" stopOpacity="0" />
			</radialGradient>
		</defs>

		{/* Canopy: peaked cloth silhouette — the interior below is open */}
		<g className="tent-canopy">
			{/* pole finials above the two peaks */}
			<circle cx="212" cy="30" r="7" fill="#e8b04b" />
			<circle cx="788" cy="30" r="7" fill="#e8b04b" />
			<rect x="208" y="30" width="8" height="26" fill="#5b3a22" />
			<rect x="784" y="30" width="8" height="26" fill="#5b3a22" />

			{/* the cloth: rises to two peaks, sags between them */}
			<path
				d="M-14 168
				   C 50 118, 130 66, 212 50
				   C 320 70, 420 88, 500 90
				   C 580 88, 680 70, 788 50
				   C 870 66, 950 118, 1014 168
				   L 1014 190
				   C 946 168, 906 134, 836 158
				   C 766 182, 706 138, 626 162
				   C 546 186, 476 136, 396 160
				   C 316 184, 246 134, 171 158
				   C 101 180, 46 142, -14 176
				   Z"
				fill="url(#haimaStripes)"
			/>
			{/* ridge highlight along the profile */}
			<path
				d="M-14 168 C 50 118, 130 66, 212 50 C 320 70, 420 88, 500 90 C 580 88, 680 70, 788 50 C 870 66, 950 118, 1014 168"
				fill="none"
				stroke="#5b2f16"
				strokeWidth="5"
			/>
			{/* scalloped hem trim */}
			<path
				d="M-14 176 C 46 142, 101 180, 171 158 C 246 134, 316 184, 396 160 C 476 136, 546 186, 626 162 C 706 138, 766 182, 836 158 C 906 134, 946 168, 1014 190"
				fill="none"
				stroke="#e8b04b"
				strokeWidth="5"
			/>
			{[120, 260, 400, 540, 680, 820].map((x, i) => (
				<g key={x} className="tent-tassel" style={{ animationDelay: `${i * 0.35}s` }}>
					<line x1={x} y1={158 + ((i % 3) * 7)} x2={x} y2={180 + ((i % 3) * 7)} stroke="#e8b04b" strokeWidth="2.5" />
					<circle cx={x} cy={184 + ((i % 3) * 7)} r="4.5" fill="#e8b04b" />
				</g>
			))}
		</g>

		{/* Side flaps hanging from under the peaks */}
		<g className="tent-flap tent-flap--left">
			<path
				d="M4 92 C 58 118, 84 210, 76 330 C 70 430, 80 540, 48 620 C 34 654, 14 672, 2 678 C -10 600, -6 300, 4 92 Z"
				fill="url(#haimaStripes)"
			/>
			<path d="M76 330 C 70 430, 80 540, 48 620" fill="none" stroke="#e8b04b" strokeWidth="3.5" opacity="0.8" />
		</g>
		<g className="tent-flap tent-flap--right">
			<path
				d="M996 92 C 942 118, 916 210, 924 330 C 930 430, 920 540, 952 620 C 966 654, 986 672, 998 678 C 1010 600, 1006 300, 996 92 Z"
				fill="url(#haimaStripes)"
			/>
			<path d="M924 330 C 930 430, 920 540, 952 620" fill="none" stroke="#e8b04b" strokeWidth="3.5" opacity="0.8" />
		</g>

		{/* Guy ropes + stakes below the hem */}
		<g stroke="#7a5a38" strokeWidth="2.5" opacity="0.85">
			<line x1="52" y1="600" x2="104" y2="682" />
			<line x1="948" y1="600" x2="896" y2="682" />
		</g>
		<path d="M100 676 L114 676 L107 698 Z" fill="#5b3a22" />
		<path d="M886 676 L900 676 L893 698 Z" fill="#5b3a22" />

		{/* Hanging lantern under the ridge, softly lit */}
		<g className="tent-lantern">
			<line x1="500" y1="94" x2="500" y2="132" stroke="#3d2a18" strokeWidth="2.5" />
			<circle cx="500" cy="160" r="40" fill="url(#lanternGlow)" opacity="0.5" />
			<path d="M489 132 L511 132 L516 152 C 516 164, 484 164, 484 152 Z" fill="#c9762e" stroke="#7a4116" strokeWidth="2" />
			<rect x="493" y="137" width="14" height="14" rx="3" fill="#ffdf9e" opacity="0.8" />
			<circle cx="500" cy="168" r="2.5" fill="#7a4116" />
		</g>

		{/* Campfire beside the tent's left flap */}
		<g className="tent-fire">
			<circle cx="108" cy="652" r="44" fill="url(#lanternGlow)" opacity="0.45" />
			<line x1="86" y1="668" x2="130" y2="656" stroke="#5b3a22" strokeWidth="7" strokeLinecap="round" />
			<line x1="88" y1="656" x2="128" y2="668" stroke="#6f4a2e" strokeWidth="7" strokeLinecap="round" />
			<g className="fire-flame">
				<path d="M108 618 C 98 632, 100 646, 108 654 C 116 646, 118 632, 108 618 Z" fill="#ff9d3b" />
				<path d="M108 632 C 103 640, 104 648, 108 652 C 112 648, 113 640, 108 632 Z" fill="#ffd98a" />
			</g>
		</g>
	</svg>
);

// ── Kasbah (Kingdom) — old walls, towers, flags, glowing windows ─────────
const Window = ({ x, y, w = 13, h = 20 }) => (
	<g>
		<path
			d={`M${x} ${y + h} L${x} ${y + w / 2} Q${x + w / 2} ${y - w * 0.35} ${x + w} ${y + w / 2} L${x + w} ${y + h} Z`}
			fill="#3d2617"
		/>
		<path
			d={`M${x + 1.5} ${y + h} L${x + 1.5} ${y + w / 2} Q${x + w / 2} ${y - w * 0.2} ${x + w - 1.5} ${y + w / 2} L${x + w - 1.5} ${y + h} Z`}
			fill="#ffca7a"
			opacity="0.55"
		/>
	</g>
);

const Flag = ({ x, y, delay }) => (
	<g className="kasbah-flag" style={{ animationDelay: `${delay}s` }}>
		<line x1={x} y1={y} x2={x} y2={y - 52} stroke="#4a3016" strokeWidth="3.5" />
		<path className="flag-cloth" d={`M${x} ${y - 52} L${x + 46} ${y - 44} L${x} ${y - 34} Z`} fill="#e0523c" />
	</g>
);

const crenel = (x, y, n, mw = 16, gap = 14, h = 14) => {
	let d = `M${x} ${y + h}`;
	for (let i = 0; i < n; i++) {
		const bx = x + i * (mw + gap);
		d += ` L${bx} ${y + h} L${bx} ${y} L${bx + mw} ${y} L${bx + mw} ${y + h}`;
	}
	return d;
};

const KasbahFrame = () => (
	<svg
		className="gscene-frame"
		viewBox="0 0 1000 700"
		preserveAspectRatio="none"
		aria-hidden="true"
		focusable="false"
	>
		<defs>
			<linearGradient id="kasbahWall" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stopColor="#b97b4a" />
				<stop offset="100%" stopColor="#8f5731" />
			</linearGradient>
		</defs>

		{/* ── Central mansion: tallest, flags flying ── */}
		<g>
			<rect x="410" y="60" width="180" height="130" fill="url(#kasbahWall)" />
			<path d={crenel(406, 40, 5, 20, 21, 20) + " Z"} fill="#a5683c" />
			<Window x={438} y={96} w={18} h={30} />
			<Window x={491} y={88} w={18} h={38} />
			<Window x={544} y={96} w={18} h={30} />
			<path d="M472 190 L472 152 Q500 128 528 152 L528 190 Z" fill="#3d2617" />
			<Flag x={420} y={44} delay={0} />
			<Flag x={580} y={44} delay={0.9} />
		</g>

		{/* ── Connecting ramparts left + right of the mansion ── */}
		<g>
			<rect x="60" y="120" width="350" height="60" fill="url(#kasbahWall)" />
			<path d={crenel(60, 104, 10, 16, 19, 16) + " Z"} fill="#a5683c" />
			<rect x="590" y="120" width="350" height="60" fill="url(#kasbahWall)" />
			<path d={crenel(594, 104, 10, 16, 19, 16) + " Z"} fill="#a5683c" />
			<g fill="#7a4116" opacity="0.5">
				{Array.from({ length: 20 }, (_, i) => (
					<path key={i} d={`M${76 + i * 44} 150 l9 8 l9 -8 l-9 -8 Z`} />
				))}
			</g>
		</g>

		{/* ── Corner towers, tops above the walls ── */}
		<g className="kasbah-tower">
			<path d="M6 60 L86 74 L78 700 L14 700 Z" fill="url(#kasbahWall)" />
			<path d={crenel(2, 42, 3, 18, 16, 18) + " Z"} fill="#a5683c" />
			<Flag x={46} y={46} delay={1.6} />
			<Window x={34} y={150} />
			<Window x={50} y={250} />
			<Window x={32} y={360} />
			<Window x={48} y={480} />
			<Window x={36} y={590} />
			<path d="M28 700 L28 652 Q46 628 64 652 L64 700 Z" fill="#3d2617" />
		</g>
		<g className="kasbah-tower">
			<path d="M994 60 L914 74 L922 700 L986 700 Z" fill="url(#kasbahWall)" />
			<path d={crenel(912, 42, 3, 18, 16, 18) + " Z"} fill="#a5683c" />
			<Flag x={954} y={46} delay={0.5} />
			<Window x={950} y={150} />
			<Window x={934} y={250} />
			<Window x={952} y={360} />
			<Window x={936} y={480} />
			<Window x={948} y={590} />
			<path d="M936 700 L936 652 Q954 628 972 652 L972 700 Z" fill="#3d2617" />
		</g>

		{/* ── Low garden wall along the bottom, palms leaning past it ── */}
		<path
			d="M14 700 L14 664 L70 664 L70 676 L160 676 L160 664 L250 664 L250 676 L750 676 L750 664 L840 664 L840 676 L930 676 L930 664 L986 664 L986 700 Z"
			fill="#8f5731"
		/>
		<g className="kasbah-palm">
			<path d="M148 676 C 152 640, 150 620, 158 596" fill="none" stroke="#6f4a2e" strokeWidth="7" strokeLinecap="round" />
			<path d="M158 596 C 140 588, 128 592, 118 602 M158 596 C 150 580, 138 576, 126 578 M158 596 C 164 578, 176 572, 188 574 M158 596 C 172 586, 184 588, 194 598"
				fill="none" stroke="#4f7a43" strokeWidth="5" strokeLinecap="round" />
		</g>
		<g className="kasbah-palm" style={{ animationDelay: "1.1s" }}>
			<path d="M852 676 C 848 640, 850 620, 842 596" fill="none" stroke="#6f4a2e" strokeWidth="7" strokeLinecap="round" />
			<path d="M842 596 C 860 588, 872 592, 882 602 M842 596 C 850 580, 862 576, 874 578 M842 596 C 836 578, 824 572, 812 574 M842 596 C 828 586, 816 588, 806 598"
				fill="none" stroke="#4f7a43" strokeWidth="5" strokeLinecap="round" />
		</g>
	</svg>
);

export default function GalleryScene({ tour = "desert", children }) {
	const clipId = tour === "kingdom" ? "kasbahClip" : "tentClip";
	return (
		<div className={`gscene gscene--${tour}`}>
			{/* Clip shapes (objectBoundingBox — 0..1 coords match the frame) */}
			<svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
				<defs>
					<clipPath id="tentClip" clipPathUnits="objectBoundingBox">
						<path d={TENT_CLIP} />
					</clipPath>
					<clipPath id="kasbahClip" clipPathUnits="objectBoundingBox">
						<path d={KASBAH_CLIP} />
					</clipPath>
				</defs>
			</svg>

			{/* Everything inside is masked to the structure's silhouette */}
			<div className="gscene-mask" style={{ clipPath: `url(#${clipId})` }}>
				<div className="gscene-sky" />
				<div className="gscene-body">{children}</div>
			</div>

			{/* Artwork drawn over the clipped content; interior transparent */}
			{tour === "kingdom" ? <KasbahFrame /> : <TentFrame />}
		</div>
	);
}
