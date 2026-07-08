import React from "react";
import "./Motifs.css";

// Decorative travel motifs — fine SVG linework shared by the brand pages.
// Every export is presentation-only: aria-hidden, pointer-events none, and
// sized by its parent so it can never widen the viewport.

// Layered dune horizon used as a section divider. `fill` is the color of the
// section BELOW the divider so the dunes appear to rise out of it.
export const DuneDivider = ({ fill = "#fdf9f0", flip = false, className = "" }) => (
	<svg
		className={`motif-dunes ${flip ? "motif-dunes--flip" : ""} ${className}`}
		viewBox="0 0 1440 110"
		preserveAspectRatio="none"
		aria-hidden="true"
		focusable="false"
	>
		<path
			d="M0,74 C220,34 470,96 720,62 C960,30 1210,86 1440,52 L1440,110 L0,110 Z"
			fill={fill}
			opacity="0.45"
		/>
		<path
			d="M0,90 C260,58 540,102 830,74 C1070,52 1270,96 1440,76 L1440,110 L0,110 Z"
			fill={fill}
		/>
	</svg>
);

// Circular passport stamp with rotating text. Calm 40s spin (killed by the
// global reduced-motion rule).
export const Stamp = ({ text = "JOA MOROCCO · PRIVATE TOURS · ", className = "" }) => (
	<svg
		className={`motif-stamp ${className}`}
		viewBox="0 0 120 120"
		aria-hidden="true"
		focusable="false"
	>
		<defs>
			<path id="stamp-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
		</defs>
		<circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" />
		<circle cx="60" cy="60" r="32" fill="none" stroke="currentColor" strokeWidth="1" />
		<g className="motif-stamp-spin">
			<text fontSize="10.5" letterSpacing="2.5" fill="currentColor">
				<textPath href="#stamp-circle">{text}</textPath>
			</text>
		</g>
		{/* Eight-point Moroccan star */}
		<path
			d="M60 40 L64.5 51.5 L76 47 L71.5 58.5 L83 60 L71.5 64.5 L76 76 L64.5 71.5 L60 83 L55.5 71.5 L44 76 L48.5 64.5 L37 60 L48.5 55.5 L44 44 L55.5 48.5 Z"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.2"
			strokeLinejoin="round"
		/>
	</svg>
);

// Fine-line compass rose.
export const CompassRose = ({ className = "" }) => (
	<svg className={`motif-compass ${className}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
		<circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
		<circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1 5" />
		<path d="M50 8 L55 45 L50 50 L45 45 Z" fill="currentColor" opacity="0.9" />
		<path d="M50 92 L45 55 L50 50 L55 55 Z" fill="none" stroke="currentColor" strokeWidth="1" />
		<path d="M8 50 L45 45 L50 50 L45 55 Z M92 50 L55 55 L50 50 L55 45 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
		<text x="50" y="6" textAnchor="middle" fontSize="9" fill="currentColor">N</text>
	</svg>
);

// Image clipped inside a Moroccan horseshoe arch. <image> with slice behaves
// like object-fit: cover, so any aspect ratio fills the arch.
export const ArchImage = ({ src, alt = "", className = "" }) => {
	const id = React.useId().replace(/[:]/g, "");
	return (
		<svg className={`motif-arch ${className}`} viewBox="0 0 300 380" role="img" aria-label={alt} focusable="false">
			<defs>
				<clipPath id={`arch-${id}`}>
					<path d="M20 372 L20 150 C20 70 70 22 150 22 C230 22 280 70 280 150 L280 372 Z" />
				</clipPath>
			</defs>
			<image
				href={src}
				width="300"
				height="380"
				preserveAspectRatio="xMidYMid slice"
				clipPath={`url(#arch-${id})`}
			/>
			<path
				d="M10 378 L10 150 C10 64 66 12 150 12 C234 12 290 64 290 150 L290 378"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
		</svg>
	);
};

// Dashed flight arc with a paper plane — "your message, travelling".
export const PlaneTrail = ({ className = "" }) => (
	<svg className={`motif-plane ${className}`} viewBox="0 0 220 80" aria-hidden="true" focusable="false">
		<path
			d="M6 66 C60 70 120 40 176 18"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeDasharray="1 7"
			strokeLinecap="round"
		/>
		<path
			d="M178 22 L212 4 L196 30 L191 20 Z M196 30 L193 36 L191 20"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinejoin="round"
		/>
	</svg>
);
