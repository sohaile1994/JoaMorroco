import React from "react";
import "./Contact.css"; // Import CSS for styling
import Form from "./Form";
import Hero from "./Hero";

const ContactPage = () => {
	return (
		<section className="contact-page">
			<Hero />
			<Form />
		</section>
	);
};

export default ContactPage;
