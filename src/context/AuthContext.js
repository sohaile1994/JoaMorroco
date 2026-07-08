import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const refresh = useCallback(async () => {
		try {
			const data = await api.get("/api/auth-me");
			setUser(data.user);
		} catch {
			setUser(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		refresh();
	}, [refresh]);

	const login = useCallback(async (email, password) => {
		const data = await api.post("/api/auth-login", { email, password });
		setUser(data.user);
		return data.user;
	}, []);

	const signup = useCallback(async (name, email, password) => {
		const data = await api.post("/api/auth-signup", { name, email, password });
		setUser(data.user);
		return data.user;
	}, []);

	const logout = useCallback(async () => {
		try {
			await api.post("/api/auth-logout");
		} catch {
			/* ignore */
		}
		setUser(null);
	}, []);

	const value = { user, loading, login, signup, logout, refresh };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
