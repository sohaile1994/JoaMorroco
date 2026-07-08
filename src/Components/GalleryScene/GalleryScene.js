import React from "react";
import "./GalleryScene.css";

// The gallery stage: a warm sky gradient behind the photos, with a hand-drawn
// tent (Sahara Dreams) or kasbah skyline (Kingdom) standing around it like a
// cut-out illustration. The artwork overhangs the sky rectangle on all sides
// (negative insets, transparent around the silhouette) and sits at a LOW
// z-index, so it decorates without ever covering photos or page content.
// Wind animation lives in CSS: swaying flaps, swinging tassels, flapping
// flags, flickering fire.

// ── Tent (Sahara Dreams) — a triangular Berber khaima, cel-shaded ────────
// Silhouette: short top ridge between two pole finials, steep straight
// slopes to a wide base, a tall arched opening framing the photos, rolled
// door flaps tied at the sides. Bold clean outlines, flat fills, and one
// shade/one light pass per face for the anime look.
const TentFrame = () => (
	<svg
		className="gscene-frame"
		viewBox="0 0 1000 700"
		preserveAspectRatio="none"
		aria-hidden="true"
		focusable="false"
	>
		<defs>
			<pattern id="haimaStripes" width="52" height="700" patternUnits="userSpaceOnUse">
				<rect width="52" height="700" fill="#8c4526" />
				<rect width="24" height="700" fill="#6f3319" />
				<rect x="24" width="5" height="700" fill="#d99a4e" opacity="0.5" />
			</pattern>
			<radialGradient id="lanternGlow" r="0.5">
				<stop offset="0%" stopColor="#ffcf8a" stopOpacity="0.85" />
				<stop offset="100%" stopColor="#ffcf8a" stopOpacity="0" />
			</radialGradient>
			{/* Cloth band: triangular gable to the eaves, straight skirts below,
			    minus a tall arched door opening for the photos */}
			<path
				id="tentCloth"
				fillRule="evenodd"
				d="M-14 700 L-14 342 L430 22 L570 22 L1014 342 L1014 700 Z
				   M128 700 L128 372 Q136 210 320 168 Q420 148 500 148 Q580 148 680 168 Q864 210 872 372 L872 700 Z"
			/>
		</defs>

		<g className="tent-canopy">
			{/* Pole finials above the ridge */}
			<g stroke="#38230f" strokeWidth="4">
				<line x1="446" y1="24" x2="446" y2="-6" />
				<line x1="554" y1="24" x2="554" y2="-6" />
			</g>
			<circle cx="446" cy="-8" r="9" fill="#e8b04b" stroke="#38230f" strokeWidth="3.5" />
			<circle cx="554" cy="-8" r="9" fill="#e8b04b" stroke="#38230f" strokeWidth="3.5" />

			{/* Cloth: striped panels */}
			<use href="#tentCloth" fill="url(#haimaStripes)" />
			{/* Cel shading: darker right face */}
			<path
				fillRule="evenodd"
				d="M500 22 L570 22 L1014 342 L1014 700 L500 700 Z
				   M500 148 Q580 148 680 168 Q864 210 872 372 L872 700 L500 700 Z"
				fill="#3a1e0d"
				opacity="0.26"
			/>
			{/* Rim light along the left slope */}
			<path d="M430 22 L-14 342 L18 342 L446 42 Z" fill="#ffd9a0" opacity="0.4" />
			{/* Door-edge shadow (half falls on the cloth, half into the opening) */}
			<path
				d="M128 700 L128 372 Q136 210 320 168 Q420 148 500 148 Q580 148 680 168 Q864 210 872 372 L872 700"
				fill="none"
				stroke="#2b1507"
				strokeWidth="20"
				opacity="0.3"
			/>
			{/* Bold outlines: outer silhouette + opening edge */}
			<path
				d="M-14 342 L430 22 L570 22 L1014 342"
				fill="none"
				stroke="#38230f"
				strokeWidth="7"
				strokeLinejoin="round"
			/>
			<path
				d="M128 700 L128 372 Q136 210 320 168 Q420 148 500 148 Q580 148 680 168 Q864 210 872 372 L872 700"
				fill="none"
				stroke="#38230f"
				strokeWidth="6"
				strokeLinejoin="round"
			/>
			{/* Ridge cap */}
			<path d="M424 30 L576 30 L564 12 L436 12 Z" fill="#5b3a22" stroke="#38230f" strokeWidth="4" strokeLinejoin="round" />
			{/* Eave seam where the gable meets the skirts */}
			<path d="M-14 348 L124 348 M876 348 L1014 348" stroke="#38230f" strokeWidth="4" opacity="0.6" />

			{/* Kelim diamond trim along the skirt bases */}
			<g fill="#e8b04b" stroke="#38230f" strokeWidth="1.5">
				{[-4, 32, 68].map((x) => (
					<path key={`l${x}`} d={`M${x} 676 l13 11 l13 -11 l-13 -11 Z`} />
				))}
				{[906, 942, 978].map((x) => (
					<path key={`r${x}`} d={`M${x} 676 l13 11 l13 -11 l-13 -11 Z`} />
				))}
			</g>
		</g>

		{/* Rolled door flaps: slim rolls hugging the opening edges (they stay
		    ON the cloth so the photos inside the door are never underlapped) */}
		<g className="tent-flap tent-flap--left">
			<path
				d="M300 176 C 226 206, 162 262, 150 372 C 141 470, 143 580, 140 688 L 108 688 C 112 574, 110 462, 120 364 C 134 240, 210 178, 288 152 Z"
				fill="#a3562e"
				stroke="#38230f"
				strokeWidth="5"
				strokeLinejoin="round"
			/>
			<path d="M150 430 C 136 436, 128 446, 126 458 M146 540 C 132 546, 124 556, 122 568" fill="none" stroke="#38230f" strokeWidth="3.5" opacity="0.65" />
			<path d="M136 616 C 118 622, 108 636, 110 652 C 128 646, 138 632, 136 616" fill="#e8b04b" stroke="#38230f" strokeWidth="3" />
		</g>
		<g className="tent-flap tent-flap--right">
			<path
				d="M700 176 C 774 206, 838 262, 850 372 C 859 470, 857 580, 860 688 L 892 688 C 888 574, 890 462, 880 364 C 866 240, 790 178, 712 152 Z"
				fill="#a3562e"
				stroke="#38230f"
				strokeWidth="5"
				strokeLinejoin="round"
			/>
			<path d="M850 430 C 864 436, 872 446, 874 458 M854 540 C 868 546, 876 556, 878 568" fill="none" stroke="#38230f" strokeWidth="3.5" opacity="0.65" />
			<path d="M864 616 C 882 622, 892 636, 890 652 C 872 646, 862 632, 864 616" fill="#e8b04b" stroke="#38230f" strokeWidth="3" />
		</g>

		{/* Guy ropes + stakes at the eaves */}
		<g stroke="#7a5a38" strokeWidth="3">
			<line x1="-4" y1="356" x2="-24" y2="430" />
			<line x1="1004" y1="356" x2="1024" y2="430" />
		</g>

		{/* Lantern hanging on the gable, over the door apex */}
		<g className="tent-lantern">
			<line x1="500" y1="30" x2="500" y2="72" stroke="#38230f" strokeWidth="3" />
			<circle cx="500" cy="100" r="36" fill="url(#lanternGlow)" opacity="0.5" />
			<path d="M488 72 L512 72 L518 94 C 518 107, 482 107, 482 94 Z" fill="#c9762e" stroke="#38230f" strokeWidth="3" />
			<rect x="492" y="77" width="16" height="15" rx="3" fill="#ffdf9e" opacity="0.85" />
			<circle cx="500" cy="110" r="3" fill="#38230f" />
		</g>

		{/* Campfire in front of the left skirt */}
		<g className="tent-fire">
			<circle cx="66" cy="632" r="40" fill="url(#lanternGlow)" opacity="0.4" />
			<line x1="44" y1="650" x2="88" y2="638" stroke="#5b3a22" strokeWidth="8" strokeLinecap="round" />
			<line x1="46" y1="638" x2="86" y2="650" stroke="#6f4a2e" strokeWidth="8" strokeLinecap="round" />
			<g className="fire-flame">
				<path d="M66 596 C 55 612, 57 628, 66 636 C 75 628, 77 612, 66 596 Z" fill="#ff9d3b" stroke="#38230f" strokeWidth="2.5" strokeLinejoin="round" />
				<path d="M66 612 C 61 620, 62 628, 66 633 C 70 628, 71 620, 66 612 Z" fill="#ffd98a" />
			</g>
		</g>
	</svg>
);

// ── Kasbah (Kingdom) — an old skyline standing around the photos ─────────
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

// A crenellated parapet strip starting at (x, y), `n` merlons wide.
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

		{/* ── Central mansion: tallest, flags flying — transparent sky around ── */}
		<g>
			<rect x="410" y="60" width="180" height="130" fill="url(#kasbahWall)" />
			<path d={crenel(406, 40, 5, 20, 21, 20) + " Z"} fill="#a5683c" />
			<Window x={438} y={96} w={18} h={30} />
			<Window x={491} y={88} w={18} h={38} />
			<Window x={544} y={96} w={18} h={30} />
			{/* carved gate arch into the frame */}
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
			{/* zellige diamond band along the wall */}
			<g fill="#7a4116" opacity="0.5">
				{Array.from({ length: 20 }, (_, i) => (
					<path key={i} d={`M${76 + i * 44} 150 l9 8 l9 -8 l-9 -8 Z`} />
				))}
			</g>
		</g>

		{/* ── Corner towers running down the sides, tops above the walls ── */}
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
	return (
		<div className={`gscene gscene--${tour}`}>
			<div className="gscene-sky" />
			{tour === "kingdom" ? <KasbahFrame /> : <TentFrame />}
			<div className="gscene-body">{children}</div>
		</div>
	);
}
