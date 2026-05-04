import { useRef, useEffect } from "react";
import useInView from "../../../hooks/useInView";
import "./Gallery.css";

// Heights (px) for each image slot — alternating tall/short creates masonry look
const HEIGHTS = [260, 130, 130, 280, 190, 130, 130, 270, 280, 180, 170, 260];

const GalleryContent = ({ info }) => {
	const viewportRef = useRef(null);
	const trackRef = useRef(null);
	const [sectionRef, inView] = useInView();

	const drag = useRef({
		active: false,
		startX: 0,
		startTranslate: 0,
		translate: 0,
		velocity: 0,
		lastX: 0,
		lastTs: 0,
		halfWidth: 0,
		rafId: null,
	});

	// Pair images into masonry columns of 2
	const cols = [];
	for (let i = 0; i < info.length; i += 2) {
		const col = [{ ...info[i], h: HEIGHTS[i] ?? 220 }];
		if (info[i + 1]) col.push({ ...info[i + 1], h: HEIGHTS[i + 1] ?? 160 });
		cols.push(col);
	}
	const allCols = [...cols, ...cols]; // duplicate for infinite loop

	// Keep latest functions accessible from useEffect closures without stale refs
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

	const stopMomentum = () => {
		if (drag.current.rafId !== null) {
			cancelAnimationFrame(drag.current.rafId);
			drag.current.rafId = null;
		}
	};

	const startMomentum = () => {
		stopMomentum();
		const tick = () => {
			drag.current.velocity *= 0.93;
			if (Math.abs(drag.current.velocity) < 0.3) {
				drag.current.velocity = 0;
				drag.current.rafId = null;
				return;
			}
			applyTranslate(drag.current.translate + drag.current.velocity);
			drag.current.rafId = requestAnimationFrame(tick);
		};
		drag.current.rafId = requestAnimationFrame(tick);
	};

	// Always point at latest function versions
	api.current = { applyTranslate, stopMomentum, startMomentum };

	// Measure track width; re-run when info changes (different tour page)
	useEffect(() => {
		const measure = () => {
			if (trackRef.current) {
				drag.current.halfWidth = trackRef.current.scrollWidth / 2;
			}
		};
		const id = setTimeout(measure, 60);
		const ro = new ResizeObserver(measure);
		if (trackRef.current) ro.observe(trackRef.current);
		return () => { clearTimeout(id); ro.disconnect(); };
	}, [info]);

	// Touch events must be added imperatively (passive:false needed for preventDefault)
	useEffect(() => {
		const vp = viewportRef.current;
		if (!vp) return;

		const onTouchStart = (e) => {
			api.current.stopMomentum();
			drag.current.active = true;
			drag.current.startX = e.touches[0].clientX;
			drag.current.startTranslate = drag.current.translate;
			drag.current.velocity = 0;
			drag.current.lastX = e.touches[0].clientX;
			drag.current.lastTs = performance.now();
			if (trackRef.current) trackRef.current.style.transition = "none";
		};

		const onTouchMove = (e) => {
			if (!drag.current.active) return;
			e.preventDefault();
			const cx = e.touches[0].clientX;
			const now = performance.now();
			const dt = now - drag.current.lastTs;
			if (dt > 0) drag.current.velocity = ((cx - drag.current.lastX) / dt) * 16;
			drag.current.lastX = cx;
			drag.current.lastTs = now;
			api.current.applyTranslate(drag.current.startTranslate + (cx - drag.current.startX));
		};

		const onTouchEnd = () => {
			if (!drag.current.active) return;
			drag.current.active = false;
			api.current.startMomentum();
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

	const onMouseDown = (e) => {
		stopMomentum();
		drag.current.active = true;
		drag.current.startX = e.clientX;
		drag.current.startTranslate = drag.current.translate;
		drag.current.velocity = 0;
		drag.current.lastX = e.clientX;
		drag.current.lastTs = performance.now();
		if (trackRef.current) trackRef.current.style.transition = "none";
		e.preventDefault();
	};

	const onMouseMove = (e) => {
		if (!drag.current.active) return;
		const now = performance.now();
		const dt = now - drag.current.lastTs;
		if (dt > 0) drag.current.velocity = ((e.clientX - drag.current.lastX) / dt) * 16;
		drag.current.lastX = e.clientX;
		drag.current.lastTs = now;
		applyTranslate(drag.current.startTranslate + (e.clientX - drag.current.startX));
	};

	const onMouseUp = () => {
		if (!drag.current.active) return;
		drag.current.active = false;
		startMomentum();
	};

	return (
		<div
			ref={sectionRef}
			className={`gallery-destination-page anim ${inView ? "anim-in" : ""}`}
		>
			<div className="gallery-title">
				<h1>From Our Gallery</h1>
			</div>

			<div
				ref={viewportRef}
				className="gallery-carousel-viewport"
				onMouseDown={onMouseDown}
				onMouseMove={onMouseMove}
				onMouseUp={onMouseUp}
				onMouseLeave={onMouseUp}
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
		</div>
	);
};

export default GalleryContent;
