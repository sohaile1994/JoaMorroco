import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";
import TripCard from "./TripCard";
import "./Account.css";

export default function AccountPage() {
	const { user, loading, logout } = useAuth();
	const navigate = useNavigate();
	const [bookings, setBookings] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!loading && !user) navigate("/login?next=/account", { replace: true });
	}, [loading, user, navigate]);

	const load = () => {
		api
			.get("/api/my-bookings")
			.then((d) => setBookings(d.bookings))
			.catch((e) => setError(e.message));
	};

	useEffect(() => {
		if (user) load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	if (loading || !user) {
		return (
			<main className="account-page">
				<div className="account-shell">
					<div className="skeleton-card" />
					<div className="skeleton-card" />
				</div>
			</main>
		);
	}

	return (
		<main className="account-page">
			<div className="account-shell">
				<header className="account-header">
					<div>
						<h1>My Trips</h1>
						<p>Welcome back, {user.name.split(" ")[0]}.</p>
					</div>
					<button className="btn-ghost" onClick={() => logout().then(() => navigate("/"))}>
						Log out
					</button>
				</header>

				{error && <p className="form-error">{error}</p>}

				{bookings === null && !error && (
					<>
						<div className="skeleton-card" />
						<div className="skeleton-card" />
					</>
				)}

				{bookings && bookings.length === 0 && (
					<div className="account-empty">
						<h3>No trips yet</h3>
						<p>Your booked journeys will appear here.</p>
						<Link to="/book" className="btn-primary">Browse tours</Link>
					</div>
				)}

				{bookings &&
					bookings.map((b) => <TripCard key={b.reference} booking={b} onChanged={load} />)}
			</div>
		</main>
	);
}
