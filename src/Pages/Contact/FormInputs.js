import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import emailjs from "emailjs-com";
import { useToast } from "../../Components/Toast/ToastProvider";
import { Stamp, PlaneTrail } from "../../Components/Motifs/Motifs";

const SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const configured = (v) => v && !/^YOUR/i.test(v);
const emailReady = configured(SERVICE) && configured(TEMPLATE) && configured(PUBLIC_KEY);

const FormInputs = () => {
	const toast = useToast();
	const [searchParams] = useSearchParams();
	const consult = searchParams.get("topic") === "consultation";
	const formRef = useRef(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: consult ? "Free consultation" : "",
		message: "",
	});

	// Arriving from the Free Consultation button: pre-fill and bring the form into view
	useEffect(() => {
		if (!consult) return;
		setFormData((f) => ({ ...f, subject: f.subject || "Free consultation" }));
		const id = setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
		return () => clearTimeout(id);
	}, [consult, searchParams]);
	const [busy, setBusy] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!emailReady) {
			toast.error("Messaging isn't configured yet. Please email us directly at joamorocco@gmail.com.");
			return;
		}
		setBusy(true);
		try {
			await emailjs.sendForm(SERVICE, TEMPLATE, e.target, PUBLIC_KEY);
			toast.success("Message sent. We'll be in touch soon!");
			setFormData({ name: "", email: "", subject: "", message: "" });
		} catch {
			toast.error("Failed to send message. Please try again.");
		} finally {
			setBusy(false);
		}
	};

	return (
		<section className="postcard-wrap" ref={formRef}>
			<div className="postcard-heading">
				<h2>Send a postcard</h2>
				<div className="postcard-plane" aria-hidden="true">
					<PlaneTrail />
				</div>
			</div>

			<form className="postcard" onSubmit={handleSubmit}>
				<div className="postcard-stamp" aria-hidden="true">
					<Stamp />
				</div>

				<div className="postcard-address">
					<span className="postcard-to">To: JOA Morocco, Marrakech</span>
					<label className="address-line">
						<span>From</span>
						<input
							type="text"
							name="name"
							placeholder="Your name"
							value={formData.name}
							onChange={handleChange}
							autoComplete="name"
						/>
					</label>
					<label className="address-line">
						<span>Email</span>
						<input
							type="email"
							name="email"
							placeholder="your@email.com"
							required
							value={formData.email}
							onChange={handleChange}
							autoComplete="email"
						/>
					</label>
					<label className="address-line">
						<span>About</span>
						<input
							type="text"
							name="subject"
							placeholder="A trip, a question…"
							value={formData.subject}
							onChange={handleChange}
						/>
					</label>
				</div>

				<div className="postcard-message">
					<label className="postcard-message-label" htmlFor="pc-message">
						Your message
					</label>
					<textarea
						id="pc-message"
						name="message"
						placeholder="Dear JOA Morocco…"
						required
						value={formData.message}
						onChange={handleChange}
					/>
				</div>

				<button type="submit" className="postcard-send" disabled={busy}>
					{busy ? "Sending…" : "Send it off"}
				</button>
			</form>
		</section>
	);
};

export default FormInputs;
