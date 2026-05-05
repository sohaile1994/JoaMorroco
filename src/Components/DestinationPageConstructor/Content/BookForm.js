import "./BookForm.css";

const BookFormSection = () => {
	return (
		<aside className="book-form" id="book-form">
			<div className="book-form-inner">
				<div className="book-form-header">
					<h2>Book This Tour</h2>
					<p className="book-form-sub">Secure your spot today</p>
				</div>
				<form>
					<div className="form-field">
						<label htmlFor="bf-name">Full Name</label>
						<input id="bf-name" type="text" placeholder="Your name" required />
					</div>
					<div className="form-field">
						<label htmlFor="bf-email">Email</label>
						<input
							id="bf-email"
							type="email"
							placeholder="your@email.com"
							required
						/>
					</div>
					<div className="form-field">
						<label htmlFor="bf-phone">Phone</label>
						<input
							id="bf-phone"
							type="tel"
							placeholder="+1 000 000 0000"
							required
						/>
					</div>
					<div className="form-row">
						<div className="form-field">
							<label htmlFor="bf-date">Tour Date</label>
							<input id="bf-date" type="date" required />
						</div>
						<div className="form-field">
							<label htmlFor="bf-guests">Guests</label>
							<input id="bf-guests" type="number" min="1" max="20" placeholder="1" required />
						</div>
					</div>
					<button type="submit">Book Now</button>
				</form>
			</div>
		</aside>
	);
};

export default BookFormSection;
