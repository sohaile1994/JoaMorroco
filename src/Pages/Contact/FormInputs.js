import React, { useState } from "react";
import emailjs from "emailjs-com";

const FormInputs = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				"service_q9zowsd",
				"template_61s8nxo",
				e.target,
				"2k7M5nEZZJLQF9LiX"
			)
			.then(
				(result) => {
					console.log(result.text);
					alert("Message sent successfully!");
					setFormData({
						name: "",
						email: "",
						subject: "",
						message: "",
					});
				},
				(error) => {
					console.log(error.text);
					alert("Failed to send message. Please try again.");
				}
			);
	};

	return (
		<section className="contact-form-container">
			<form className="contact-form" onSubmit={handleSubmit}>
				<div className="form-row">
					<input
						type="text"
						name="name"
						placeholder="Name"
						value={formData.name}
						onChange={handleChange}
					/>
					<input
						type="email"
						name="email"
						placeholder="Email*"
						required
						value={formData.email}
						onChange={handleChange}
					/>
				</div>
				<input
					type="text"
					name="subject"
					placeholder="Subject"
					value={formData.subject}
					onChange={handleChange}
				/>
				<textarea
					name="message"
					placeholder="Message"
					value={formData.message}
					onChange={handleChange}
				></textarea>
				<button type="submit">SEND</button>
			</form>
		</section>
	);
};

export default FormInputs;
