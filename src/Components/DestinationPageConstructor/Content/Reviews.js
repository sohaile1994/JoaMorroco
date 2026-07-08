import React, { useState, useEffect } from "react";
import useInView from "../../../hooks/useInView";
import { api } from "../../../lib/api";
import { useToast } from "../../Toast/ToastProvider";
import "./Reviews.css";

const StarDisplay = ({ stars }) => (
	<div className="review-rating">
		{[1, 2, 3, 4, 5].map((i) => (
			<span key={i} className={`star ${i <= stars ? "filled" : "empty"}`}>
				&#9733;
			</span>
		))}
	</div>
);

const StarInput = ({ value, onChange }) => {
	const [hovered, setHovered] = useState(0);
	return (
		<div className="star-input" onMouseLeave={() => setHovered(0)}>
			{[1, 2, 3, 4, 5].map((n) => (
				<span
					key={n}
					className={`star-btn ${n <= (hovered || value) ? "active" : ""}`}
					onMouseEnter={() => setHovered(n)}
					onClick={() => onChange(n)}
				>
					&#9733;
				</span>
			))}
		</div>
	);
};

const ReviewItem = ({ review }) => {
	const [ref, inView] = useInView();
	return (
		<div ref={ref} className={`review-item anim fade-up ${inView ? "anim-in" : ""}`}>
			<div className="review-avatar">{review.name.charAt(0).toUpperCase()}</div>
			<div className="review-info">
				<h4 className="review-name">
					{review.name}
					{review.verified && <span className="verified-badge">✓ Verified traveler</span>}
				</h4>
				<StarDisplay stars={review.stars} />
				<p className="review-review">{review.review}</p>
			</div>
		</div>
	);
};

const EMPTY_FORM = { reference: "", email: "", name: "", stars: 5, review: "" };

const ReviewsContent = ({ info, tour }) => {
	const toast = useToast();
	const [dbReviews, setDbReviews] = useState([]);
	const [form, setForm] = useState(EMPTY_FORM);
	const [error, setError] = useState("");
	const [submitStatus, setSubmitStatus] = useState("idle");

	const loadReviews = () => {
		api.get(`/api/get-reviews?tour=${tour}`).then(setDbReviews).catch(() => {});
	};

	useEffect(() => {
		if (tour) loadReviews();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tour]);

	const handleChange = (e) => {
		setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.reference.trim() || !form.email.trim()) {
			setError("Enter the confirmation code and email from your booking.");
			return;
		}
		if (!form.review.trim()) {
			setError("Please write a short review.");
			return;
		}
		setSubmitStatus("loading");
		setError("");
		try {
			await api.post("/api/submit-review", {
				tour,
				reference: form.reference.trim(),
				email: form.email.trim(),
				name: form.name.trim() || undefined,
				stars: form.stars,
				review: form.review.trim(),
			});
			loadReviews();
			setForm(EMPTY_FORM);
			setSubmitStatus("success");
			toast.success("Thank you for your review!");
			setTimeout(() => setSubmitStatus("idle"), 4000);
		} catch (err) {
			setSubmitStatus("idle");
			setError(err.message);
		}
	};

	const allReviews = [...dbReviews, ...info];

	// Star distribution across all shown reviews.
	const total = allReviews.length || 1;
	const dist = [5, 4, 3, 2, 1].map((s) => ({
		s,
		count: allReviews.filter((r) => r.stars === s).length,
	}));
	const avg = (allReviews.reduce((a, r) => a + r.stars, 0) / total).toFixed(1);

	return (
		<div className="reviews-wrapper">
			<div className="reviews-summary">
				<div className="reviews-avg">
					<strong>{avg}</strong>
					<StarDisplay stars={Math.round(avg)} />
					<span>{allReviews.length} reviews</span>
				</div>
				<div className="reviews-bars">
					{dist.map(({ s, count }) => (
						<div className="reviews-bar-row" key={s}>
							<span className="rb-label">{s}★</span>
							<div className="rb-track">
								<div className="rb-fill" style={{ width: `${(count / total) * 100}%` }} />
							</div>
							<span className="rb-count">{count}</span>
						</div>
					))}
				</div>
			</div>

			<div className="add-review-card">
				<h3>Share Your Experience</h3>
				<p className="add-review-sub">
					Reviews are for confirmed guests — enter your confirmation code and email.
				</p>

				{submitStatus === "success" && (
					<div className="review-success">Your review has been posted — thank you!</div>
				)}

				<form className="add-review-form" onSubmit={handleSubmit}>
					<div className="review-form-row">
						<div className="review-form-field">
							<label htmlFor="rv-ref">Confirmation Code *</label>
							<input id="rv-ref" name="reference" type="text" placeholder="JOA-XXXX-XXXX"
								value={form.reference} onChange={handleChange} required />
						</div>
						<div className="review-form-field">
							<label htmlFor="rv-email">Email *</label>
							<input id="rv-email" name="email" type="email" placeholder="your@email.com"
								value={form.email} onChange={handleChange} required />
						</div>
					</div>

					<div className="review-form-row">
						<div className="review-form-field">
							<label htmlFor="rv-name">Display Name</label>
							<input id="rv-name" name="name" type="text" placeholder="Optional"
								value={form.name} onChange={handleChange} />
						</div>
						<div className="review-form-field">
							<label>Rating</label>
							<StarInput value={form.stars} onChange={(n) => setForm((f) => ({ ...f, stars: n }))} />
						</div>
					</div>

					<div className="review-form-field">
						<label htmlFor="rv-review">Review *</label>
						<textarea id="rv-review" name="review" placeholder="Tell us about your experience..."
							value={form.review} onChange={handleChange} required rows={4} />
					</div>

					{error && <p className="review-error">{error}</p>}

					<button type="submit" className="review-submit-btn" disabled={submitStatus === "loading"}>
						{submitStatus === "loading" ? "Posting…" : "Post Review"}
					</button>
				</form>
			</div>

			<div className="review-content">
				{allReviews.map((review, index) => (
					<ReviewItem key={index} review={review} />
				))}
			</div>
		</div>
	);
};

export default ReviewsContent;
