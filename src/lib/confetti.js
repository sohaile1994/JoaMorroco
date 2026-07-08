// Minimal dependency-free confetti burst. Respects reduced-motion.
export function burstConfetti(durationMs = 1400) {
	if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return;
	}
	const canvas = document.createElement("canvas");
	canvas.style.cssText =
		"position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:1200";
	document.body.appendChild(canvas);
	const ctx = canvas.getContext("2d");
	const dpr = window.devicePixelRatio || 1;
	canvas.width = window.innerWidth * dpr;
	canvas.height = window.innerHeight * dpr;
	ctx.scale(dpr, dpr);

	const W = window.innerWidth;
	const colors = ["#ff681a", "#f6b73c", "#1e7fa8", "#2ea36a", "#e0523c"];
	const N = 130;
	const parts = Array.from({ length: N }, (_, i) => ({
		x: W / 2 + (Math.sin(i) * W) / 6,
		y: -20 - (i % 20) * 8,
		vx: (((i * 53) % 100) / 100 - 0.5) * 6,
		vy: 2 + ((i * 31) % 100) / 40,
		size: 5 + ((i * 17) % 6),
		color: colors[i % colors.length],
		rot: (i % 360) * (Math.PI / 180),
		vr: (((i * 13) % 100) / 100 - 0.5) * 0.3,
	}));

	const start = performance.now();
	function frame(now) {
		const elapsed = now - start;
		ctx.clearRect(0, 0, W, window.innerHeight);
		parts.forEach((p) => {
			p.x += p.vx;
			p.y += p.vy;
			p.vy += 0.08; // gravity
			p.rot += p.vr;
			ctx.save();
			ctx.translate(p.x, p.y);
			ctx.rotate(p.rot);
			ctx.fillStyle = p.color;
			ctx.globalAlpha = Math.max(0, 1 - elapsed / durationMs);
			ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
			ctx.restore();
		});
		if (elapsed < durationMs) {
			requestAnimationFrame(frame);
		} else {
			canvas.remove();
		}
	}
	requestAnimationFrame(frame);
}
