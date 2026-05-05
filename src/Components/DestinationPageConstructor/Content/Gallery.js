import { useRef, useEffect } from "react";
import useInView from "../../../hooks/useInView";
import "./Gallery.css";

const HEIGHTS = [260, 130, 130, 280, 190, 130, 130, 270, 280, 180, 170, 260];

const GalleryContent = ({ info }) => {
	const viewportRef = useRef(null);
	const trackRef = useRef(null);
	const [sectionRef, inView] = useInView();

	const drag = useRef({
		active: false,
		translate: 0,
		velocity: 0,
		lastTs: 0,
		halfWidth: 0,
		rafId: null,
	});

	const cols = [];
	for (let i = 0; i < info.length; i += 2) {
		const col = [{ ...info[i], h: HEIGHTS[i] ?? 220 }];
		if (info[i + 1]) col.push({ ...info[i + 1], h: HEIGHTS[i + 1] ?? 160 });
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

	api.current = { applyTranslate, stopMomentum, startMomentum };

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

	useEffect(() => {
		// mousemove uses e.movementX — the relative delta since the last event.
		// With pointer lock active this delta is unbounded (cursor escapes screen edges).
		// Without pointer lock (touch fallback / browsers blocking lock) it still works
		// as a relative accumulator and is better than clientX - startX for fast drags.
		const onMouseMove = (e) => {
			if (!drag.current.active) return;
			const now = performance.now();
			const dt = Math.max(now - drag.current.lastTs, 1);
			const dx = e.movementX;
			drag.current.velocity = (dx / dt) * 16;
			drag.current.lastTs = now;
			api.current.applyTranslate(drag.current.translate + dx);
		};

		const endDrag = () => {
			if (!drag.current.active) return;
			drag.current.active = false;
			if (document.pointerLockElement) document.exitPointerLock();
			api.current.startMomentum();
		};

		// If the user presses Escape, the browser exits pointer lock automatically.
		// Treat that as a drag release so momentum still kicks in.
		const onPointerLockChange = () => {
			if (!document.pointerLockElement && drag.current.active) {
				drag.current.active = false;
				api.current.startMomentum();
			}
		};

		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", endDrag);
		document.addEventListener("pointerlockchange", onPointerLockChange);
		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", endDrag);
			document.removeEventListener("pointerlockchange", onPointerLockChange);
		};
	}, []);

	// Touch — imperative so passive:false works
	useEffect(() => {
		const vp = viewportRef.current;
		if (!vp) return;

		const onTouchStart = (e) => {
			api.current.stopMomentum();
			drag.current.active = true;
			drag.current.velocity = 0;
			drag.current.lastTs = performance.now();
			// store last touch x so movementX equivalent can be computed
			drag.current._lastTouchX = e.touches[0].clientX;
			if (trackRef.current) trackRef.current.style.transition = "none";
		};

		const onTouchMove = (e) => {
			if (!drag.current.active) return;
			e.preventDefault();
			const cx = e.touches[0].clientX;
			const now = performance.now();
			const dt = Math.max(now - drag.current.lastTs, 1);
			const dx = cx - drag.current._lastTouchX;
			drag.current.velocity = (dx / dt) * 16;
			drag.current._lastTouchX = cx;
			drag.current.lastTs = now;
			api.current.applyTranslate(drag.current.translate + dx);
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
		drag.current.velocity = 0;
		drag.current.lastTs = performance.now();
		if (trackRef.current) trackRef.current.style.transition = "none";
		e.preventDefault();

		// Lock the pointer so cursor movement is unbounded by screen edges.
		// The cursor hides while locked and reappears on mouse release.
		viewportRef.current?.requestPointerLock?.();
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
