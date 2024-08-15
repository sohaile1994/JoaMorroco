const BookFormSection = () => {
	return (
		<section className="book-form content">
			<h2>Book This Tour</h2>
			<form>
				<input id="input-name" type="text" placeholder="Name *" required />
				<input id="input-email" type="email" placeholder="Email *" required />
				<input id="input-number" type="tel" placeholder="Phone" required />
				<input id="input-date" type="date" required />
				<button type="submit">Book Now</button>
			</form>
		</section>
	);
};
export default BookFormSection;
