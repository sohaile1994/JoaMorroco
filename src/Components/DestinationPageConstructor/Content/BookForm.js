import { useState } from "react";
import "./BookForm.css";

const EMPTY = { name: "", email: "", phone: "", date: "", guests: "1" };

const BookFormSection = ({ tour }) => {
	const [form, setForm] = useState(EMPTY);
	const [status, setStatus] = useState("idle");
	const [errorMsg, setErrorMsg] = useState("");

	const handleChange = (e) => {
		setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("loading");
		setErrorMsg("");
		try {
			const res = await fetch("/api/submit-booking", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ tour, ...form }),
			});
			if (!res.ok) {
				const text = await res.text();
				throw new Error(text || "Booking failed");
			}
			setStatus("success");
			setForm(EMPTY);
		} catch (err) {
			setStatus("error");
			setErrorMsg(err.message);
		}
	};

	if (status === "success") {
		return (
			<aside className="book-form" id="book-form">
				<div className="book-form-inner">
					<div className="book-form-success">
						<h2>Booking Received!</h2>
						<p>We'll be in touch shortly to confirm your spot.</p>
						<button onClick={() => setStatus("idle")}>Book Again</button>
					</div>
				</div>
			</aside>
		);
	}

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
							<label htmlFor="bf-date">Tour Date</label>
							<input
								id="bf-date"
								name="date"
								type="date"
								value={form.date}
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
								max="20"
								placeholder="1"
								value={form.guests}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					{status === "error" && <p className="form-error">{errorMsg}</p>}
					<button type="submit" disabled={status === "loading"}>
						{status === "loading" ? "Booking…" : "Book Now"}
					</button>
				</form>
			</div>
		</aside>
	);
};

export default BookFormSection;
