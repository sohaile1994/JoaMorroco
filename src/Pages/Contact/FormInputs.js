import React from "react";

const FormInputs = () => {
	return (
		<div className="contact-form-container">
			<form className="contact-form">
				<div className="form-row">
					<input type="text" name="name" placeholder="Name" />
					<input type="email" name="email" placeholder="Email*" required />
				</div>
				<input type="text" name="subject" placeholder="Subject" />
				<textarea name="message" placeholder="Message"></textarea>
				<button type="submit">SEND</button>
			</form>
		</div>
	);
};

export default FormInputs;
