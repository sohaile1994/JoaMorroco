import React, { useState, useEffect } from "react";
import useInView from "../../../hooks/useInView";
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
		<div
			ref={ref}
			className={`review-item anim fade-up ${inView ? "anim-in" : ""}`}
		>
			<div className="review-avatar">
				{review.name.charAt(0).toUpperCase()}
			</div>
			<div className="review-info">
				<h4 className="review-name">{review.name}</h4>
				<StarDisplay stars={review.stars} />
				<p className="review-review">{review.review}</p>
			</div>
		</div>
	);
};

const EMPTY_FORM = { ticket: "", name: "", stars: 5, review: "" };

const ReviewsContent = ({ info, tour }) => {
	const [dbReviews, setDbReviews] = useState([]);
	const [form, setForm] = useState(EMPTY_FORM);
	const [error, setError] = useState("");
	const [submitStatus, setSubmitStatus] = useState("idle");

	useEffect(() => {
		if (!tour) return;
		fetch(`/api/get-reviews?tour=${tour}`)
			.then((r) => r.json())
			.then((rows) => setDbReviews(rows))
			.catch(() => {});
	}, [tour]);

	const handleChange = (e) => {
		setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.name.trim() || !form.review.trim()) {
			setError("Please fill in all fields.");
			return;
		}
		setSubmitStatus("loading");
		setError("");
		try {
			const res = await fetch("/api/submit-review", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					tour,
					ticket: form.ticket,
					name: form.name.trim(),
					stars: form.stars,
					review: form.review.trim(),
				}),
			});
			if (!res.ok) {
				const text = await res.text();
				throw new Error(text || "Failed to post review");
			}
			const updated = await fetch(`/api/get-reviews?tour=${tour}`).then((r) =>
				r.json()
			);
			setDbReviews(updated);
			setForm(EMPTY_FORM);
			setSubmitStatus("success");
			setTimeout(() => setSubmitStatus("idle"), 4000);
		} catch (err) {
			setSubmitStatus("idle");
			setError(err.message);
		}
	};

	const allReviews = [...dbReviews, ...info];

	return (
		<div className="reviews-wrapper">
			<div className="add-review-card">
				<h3>Share Your Experience</h3>
				<p className="add-review-sub">
					A valid ticket number is required to leave a review.
				</p>

				{submitStatus === "success" && (
					<div className="review-success">
						Your review has been posted — thank you!
					</div>
				)}

				<form className="add-review-form" onSubmit={handleSubmit}>
					<div className="review-form-row">
						<div className="review-form-field">
							<label htmlFor="rv-ticket">Ticket Number *</label>
							<input
								id="rv-ticket"
								name="ticket"
								type="text"
								placeholder="Enter ticket number"
								value={form.ticket}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="review-form-field">
							<label htmlFor="rv-name">Your Name *</label>
							<input
								id="rv-name"
								name="name"
								type="text"
								placeholder="Your name"
								value={form.name}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div className="review-form-field">
						<label>Rating</label>
						<StarInput
							value={form.stars}
							onChange={(n) => setForm((f) => ({ ...f, stars: n }))}
						/>
					</div>

					<div className="review-form-field">
						<label htmlFor="rv-review">Review *</label>
						<textarea
							id="rv-review"
							name="review"
							placeholder="Tell us about your experience..."
							value={form.review}
							onChange={handleChange}
							required
							rows={4}
						/>
					</div>

					{error && <p className="review-error">{error}</p>}

					<button
						type="submit"
						className="review-submit-btn"
						disabled={submitStatus === "loading"}
					>
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
