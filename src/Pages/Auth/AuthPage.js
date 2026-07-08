import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../Components/Toast/ToastProvider";
import "./Auth.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthPage() {
	const { user, login, signup } = useAuth();
	const toast = useToast();
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const next = params.get("next") || "/account";

	const [mode, setMode] = useState("login"); // login | signup
	const [form, setForm] = useState({ name: "", email: "", password: "" });
	const [showPw, setShowPw] = useState(false);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");

	// Already logged in? Move along.
	useEffect(() => {
		if (user) navigate(next, { replace: true });
	}, [user, next, navigate]);

	const set = (k) => (e) => {
		setForm((f) => ({ ...f, [k]: e.target.value }));
		setError("");
	};

	const submit = async (e) => {
		e.preventDefault();
		const email = form.email.trim();
		if (!EMAIL_RE.test(email)) return setError("Please enter a valid email address.");
		if (form.password.length < 8) return setError("Password must be at least 8 characters.");
		if (mode === "signup" && !form.name.trim()) return setError("Please enter your name.");

		setBusy(true);
		try {
			if (mode === "signup") {
				await signup(form.name.trim(), email, form.password);
				toast.success("Welcome to JOA Morocco!");
			} else {
				await login(email, form.password);
				toast.success("Welcome back!");
			}
			navigate(next, { replace: true });
		} catch (err) {
			setError(err.message || "Something went wrong.");
			setBusy(false);
		}
	};

	return (
		<main className="auth-page">
			<div className="auth-card">
				<div className="auth-tabs">
					<button
						className={mode === "login" ? "active" : ""}
						onClick={() => { setMode("login"); setError(""); }}
						type="button"
					>
						Log in
					</button>
					<button
						className={mode === "signup" ? "active" : ""}
						onClick={() => { setMode("signup"); setError(""); }}
						type="button"
					>
						Create account
					</button>
				</div>

				<h1>{mode === "login" ? "Welcome back" : "Create your account"}</h1>
				<p className="auth-sub">
					{mode === "login"
						? "Access your trips, confirmations, and reviews."
						: "Save your trips and manage bookings anytime."}
				</p>

				<form onSubmit={submit} className="auth-form">
					{mode === "signup" && (
						<label className="field">
							<span className="field-label">Full name</span>
							<input type="text" value={form.name} onChange={set("name")} placeholder="Your name" autoComplete="name" />
						</label>
					)}
					<label className="field">
						<span className="field-label">Email</span>
						<input type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" autoComplete="email" />
					</label>
					<label className="field">
						<span className="field-label">Password</span>
						<div className="pw-wrap">
							<input
								type={showPw ? "text" : "password"}
								value={form.password}
								onChange={set("password")}
								placeholder="At least 8 characters"
								autoComplete={mode === "login" ? "current-password" : "new-password"}
							/>
							<button type="button" className="pw-toggle" onClick={() => setShowPw((s) => !s)}>
								{showPw ? "Hide" : "Show"}
							</button>
						</div>
					</label>

					{error && <p className="form-error">{error}</p>}

					<button type="submit" className="btn-primary auth-submit" disabled={busy}>
						{busy ? <span className="btn-spinner" /> : mode === "login" ? "Log in" : "Create account"}
					</button>
				</form>

				<p className="auth-alt">
					Booked as a guest?{" "}
					<Link to="/find-booking">Find your booking →</Link>
				</p>
			</div>
		</main>
	);
}
