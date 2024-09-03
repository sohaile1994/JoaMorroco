import React from "react";
import "./Contact.css"; // Import CSS for styling
import Form from "./Form";
import Hero from "./Hero";

const ContactPage = () => {
	return (
		<div className="contact-page">
			<Hero />
			<Form />
		</div>
	);
};

export default ContactPage;
