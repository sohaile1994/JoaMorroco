import React from "react";
import "./Contact.css"; // Import CSS for styling
import Navbar from "../../Home/Navbar/Navbar";

const ContactPage = () => {
	return (
		<>
			<Navbar color="#fff" />
			<div className="contact-page">
				<div
					className="hero-section"
					style={{ backgroundImage: `url(/assets/contact-background.jpg)` }}
				>
					<h1>Contact Us</h1>
					<p>Modern & Beautiful WordPress Theme</p>
				</div>
				<div className="contact-container">
					<div className="contact-info">
						<h2>Feel Free to Contact us For Help or Additional Info</h2>
						<p>
							<strong>name:</strong> Joamorocco, Morocco
						</p>
						<p>
							<strong>mail:</strong> joamorroco@gmail.com
						</p>

						<p>
							<strong>phone:</strong> +1 614.380.9363
						</p>
						<div className="social-icons">
							<i className="fab fa-twitter"></i>
							<i className="fab fa-facebook-f"></i>
							<i className="fab fa-instagram"></i>
							<i className="fab fa-linkedin-in"></i>
						</div>
					</div>
					<div className="contact-form">
						<form>
							<div className="form-row">
								<input type="text" name="name" placeholder="Name" />
								<input
									type="email"
									name="email"
									placeholder="Email*"
									required
								/>
							</div>
							<input type="text" name="subject" placeholder="Subject" />
							<textarea name="message" placeholder="Message"></textarea>
							<button type="submit">SEND</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactPage;
