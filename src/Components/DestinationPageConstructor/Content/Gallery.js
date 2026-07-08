import { useRef, useEffect } from "react";
import useInView from "../../../hooks/useInView";
import GalleryScene from "../../GalleryScene/GalleryScene";
import "./Gallery.css";

// Infinite masonry carousel on a living stage. The track is duplicated and
// wrapped at half-width for a seamless loop; it drifts on its own and can be
// flung by mouse or touch.
const HEIGHTS = [230, 120, 120, 250, 170, 120, 120, 240, 250, 160, 150, 230];

const DRIFT_PX_PER_S = 16; // idle glide

const GalleryContent = ({ info, tour }) => {
	const viewportRef = useRef(null);
	const trackRef = useRef(null);
	const [sectionRef, inView] = useInView();

	const drag = useRef({
		active: false,
		translate: 0,
		velocity: 0,
		lastX: 0,
		lastTs: 0,
		halfWidth: 0,
	});

	const cols = [];
	for (let i = 0; i < info.length; i += 2) {
		const col = [{ ...info[i], h: HEIGHTS[i] ?? 200 }];
		if (info[i + 1]) col.push({ ...info[i + 1], h: HEIGHTS[i + 1] ?? 150 });
		cols.push(col);
	}
	const allCols = [...cols, ...cols];

	const api = useRef({});

	const normalize = (x) => {
		const hw = drag.current.halfWidth;
		if (!hw) return x;
		let n = x;
		while (n < -hw) n += hw;
		while (n > 0) n -= hw;
		return n;
	};

	const applyTranslate = (x) => {
		const n = normalize(x);
		drag.current.translate = n;
		if (trackRef.current) {
			trackRef.current.style.transform = `translateX(${n}px)`;
		}
	};
	api.current.applyTranslate = applyTranslate;

	// ── One animation loop: drift + momentum ──
	useEffect(() => {
		const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
		let raf;
		let last = performance.now();
		const tick = (now) => {
			const dt = Math.min(now - last, 80);
			last = now;
			const d = drag.current;
			if (!d.active) {
				if (Math.abs(d.velocity) > 0.25) {
					// momentum from a fling
					api.current.applyTranslate(d.translate + d.velocity * (dt / 16));
					d.velocity *= Math.pow(0.94, dt / 16);
				} else if (!reduced && inView) {
					// gentle idle drift
					api.current.applyTranslate(d.translate - (DRIFT_PX_PER_S * dt) / 1000);
				}
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [inView]);

	// Measure the loop width
	useEffect(() => {
		const measure = () => {
			if (trackRef.current) {
				drag.current.halfWidth = trackRef.current.scrollWidth / 2;
			}
		};
		const id = setTimeout(measure, 60);
		const ro = new ResizeObserver(measure);
		if (trackRef.current) ro.observe(trackRef.current);
		return () => {
			clearTimeout(id);
			ro.disconnect();
		};
	}, [info]);

	// ── Mouse drag (plain clientX deltas — no pointer lock) ──
	useEffect(() => {
		const onMouseMove = (e) => {
			const d = drag.current;
			if (!d.active) return;
			const now = performance.now();
			const dt = Math.max(now - d.lastTs, 1);
			const dx = e.clientX - d.lastX;
			d.velocity = (dx / dt) * 16;
			d.lastX = e.clientX;
			d.lastTs = now;
			api.current.applyTranslate(d.translate + dx);
		};
		const endDrag = () => {
			drag.current.active = false;
		};
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", endDrag);
		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", endDrag);
		};
	}, []);

	const onMouseDown = (e) => {
		const d = drag.current;
		d.active = true;
		d.velocity = 0;
		d.lastX = e.clientX;
		d.lastTs = performance.now();
		e.preventDefault();
	};

	// ── Touch (imperative for passive:false) ──
	useEffect(() => {
		const vp = viewportRef.current;
		if (!vp) return undefined;

		const onTouchStart = (e) => {
			const d = drag.current;
			d.active = true;
			d.velocity = 0;
			d.lastX = e.touches[0].clientX;
			d.lastTs = performance.now();
		};
		const onTouchMove = (e) => {
			const d = drag.current;
			if (!d.active) return;
			e.preventDefault();
			const cx = e.touches[0].clientX;
			const now = performance.now();
			const dt = Math.max(now - d.lastTs, 1);
			const dx = cx - d.lastX;
			d.velocity = (dx / dt) * 16;
			d.lastX = cx;
			d.lastTs = now;
			api.current.applyTranslate(d.translate + dx);
		};
		const onTouchEnd = () => {
			drag.current.active = false;
		};

		vp.addEventListener("touchstart", onTouchStart, { passive: true });
		vp.addEventListener("touchmove", onTouchMove, { passive: false });
		vp.addEventListener("touchend", onTouchEnd);
		return () => {
			vp.removeEventListener("touchstart", onTouchStart);
			vp.removeEventListener("touchmove", onTouchMove);
			vp.removeEventListener("touchend", onTouchEnd);
		};
	}, []);

	return (
		<div
			ref={sectionRef}
			className={`gallery-destination-page anim ${inView ? "anim-in" : ""}`}
		>
			<div className="gallery-title">
				<h1>From Our Gallery</h1>
				<span className="gallery-hint">drag to explore</span>
			</div>

			<GalleryScene tour={tour}>
				<div
					ref={viewportRef}
					className="gallery-carousel-viewport"
					onMouseDown={onMouseDown}
				>
					<div ref={trackRef} className="gallery-carousel-track">
						{allCols.map((col, ci) => (
							<div
								key={ci}
								className="gallery-col"
								aria-hidden={ci >= cols.length ? "true" : undefined}
							>
								{col.map((item, ri) => (
									<div
										key={ri}
										className="gallery-item"
										style={{ height: `${item.h}px` }}
									>
										<img
											src={item.image}
											alt={item.title}
											loading="lazy"
											draggable={false}
										/>
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			</GalleryScene>
		</div>
	);
};

export default GalleryContent;
