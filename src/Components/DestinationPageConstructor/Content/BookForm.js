import { useState, useEffect, useRef } from "react";
import "./BookForm.css";

const EMPTY = { name: "", email: "", phone: "", month: "", guests: "1" };

const today = new Date();
const MIN_MONTH = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

const BookFormSection = ({ tour }) => {
	const [form, setForm] = useState(EMPTY);
	const [avail, setAvail] = useState(null); // { available, booked, max } | null
	const [availLoading, setAvailLoading] = useState(false);
	const [status, setStatus] = useState("idle"); // idle | loading | success
	const [formError, setFormError] = useState("");
	const [ticket, setTicket] = useState("");
	const debounceRef = useRef(null);

	useEffect(() => {
		if (!form.month || !tour) {
			setAvail(null);
			return;
		}
		setAvailLoading(true);
		clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(async () => {
			try {
				const res = await fetch(
					`/api/check-availability?tour=${tour}&month=${form.month}`
				);
				const data = await res.json();
				setAvail(data);
			} catch {
				setAvail(null);
			} finally {
				setAvailLoading(false);
			}
		}, 400);
		return () => clearTimeout(debounceRef.current);
	}, [form.month, tour]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((f) => ({ ...f, [name]: value }));
		if (name === "month") setAvail(null);
		setFormError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError("");
		const guestNum = parseInt(form.guests, 10);

		if (avail !== null && guestNum > avail.available) {
			setFormError(
				avail.available === 0
					? "This month is fully booked. Please choose another month."
					: `Only ${avail.available} seat${avail.available === 1 ? "" : "s"} left for this month.`
			);
			return;
		}

		setStatus("loading");
		try {
			const res = await fetch("/api/submit-booking", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ tour, ...form }),
			});
			const data = await res.json();

			if (!res.ok) {
				if (data.limitReached) {
					setAvail({ available: data.available, booked: data.booked, max: 12 });
					setFormError(
						data.available === 0
							? "This month just filled up. Please choose another month."
							: `Only ${data.available} seat${data.available === 1 ? "" : "s"} remaining.`
					);
				} else {
					setFormError(typeof data === "string" ? data : "Booking failed. Please try again.");
				}
				setStatus("idle");
				return;
			}

			setTicket(data.ticket);
			setStatus("success");
			setForm(EMPTY);
			setAvail(null);
		} catch {
			setFormError("Network error. Please try again.");
			setStatus("idle");
		}
	};

	if (status === "success") {
		return (
			<aside className="book-form" id="book-form">
				<div className="book-form-inner">
					<div className="book-form-success">
						<div className="bf-checkmark">✓</div>
						<h2>Booking Received!</h2>
						<p>Save your ticket — you'll need it to leave a review.</p>
						<div className="bf-ticket-label">Your Ticket Number</div>
						<div className="bf-ticket">{ticket}</div>
						<button onClick={() => { setStatus("idle"); setTicket(""); }}>
							Book Again
						</button>
					</div>
				</div>
			</aside>
		);
	}

	const isFull = avail !== null && avail.available === 0;
	const maxGuests = avail !== null ? Math.min(avail.available, 12) : 12;

	return (
		<aside className="book-form" id="book-form">
			<div className="book-form-inner">
				<div className="book-form-header">
					<h2>Book This Tour</h2>
					<p className="book-form-sub">Secure your spot today</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="form-field">
						<label htmlFor="bf-name">Full Name</label>
						<input
							id="bf-name"
							name="name"
							type="text"
							placeholder="Your name"
							value={form.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-field">
						<label htmlFor="bf-email">Email</label>
						<input
							id="bf-email"
							name="email"
							type="email"
							placeholder="your@email.com"
							value={form.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-field">
						<label htmlFor="bf-phone">Phone</label>
						<input
							id="bf-phone"
							name="phone"
							type="tel"
							placeholder="+1 000 000 0000"
							value={form.phone}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-row">
						<div className="form-field">
							<label htmlFor="bf-month">
								Tour Month
								{availLoading && (
									<span className="avail-loading"> ···</span>
								)}
								{!availLoading && avail !== null && (
									<span
										className={`avail-badge ${
											isFull
												? "avail-full"
												: avail.available <= 3
												? "avail-low"
												: "avail-ok"
										}`}
									>
										{isFull ? "Full" : `${avail.available} left`}
									</span>
								)}
							</label>
							<input
								id="bf-month"
								name="month"
								type="month"
								min={MIN_MONTH}
								value={form.month}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="form-field">
							<label htmlFor="bf-guests">Guests</label>
							<input
								id="bf-guests"
								name="guests"
								type="number"
								min="1"
								max={maxGuests || 12}
								placeholder="1"
								value={form.guests}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					{isFull && (
						<p className="form-limit-msg">
							This month is fully booked — please choose another month.
						</p>
					)}
					{formError && <p className="form-error">{formError}</p>}
					<button type="submit" disabled={status === "loading" || isFull}>
						{status === "loading" ? "Booking…" : "Book Now"}
					</button>
				</form>
			</div>
		</aside>
	);
};

export default BookFormSection;
