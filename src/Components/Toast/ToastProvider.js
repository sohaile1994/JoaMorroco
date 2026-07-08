import React, { createContext, useContext, useCallback, useState, useRef } from "react";
import "./Toast.css";

const ToastContext = createContext({ toast: () => {} });

export function useToast() {
	return useContext(ToastContext);
}

let seq = 0;

export function ToastProvider({ children }) {
	const [toasts, setToasts] = useState([]);
	const timers = useRef({});

	const dismiss = useCallback((id) => {
		setToasts((list) => list.filter((t) => t.id !== id));
		clearTimeout(timers.current[id]);
		delete timers.current[id];
	}, []);

	const push = useCallback(
		(type, message, duration = 4200) => {
			const id = ++seq;
			setToasts((list) => [...list, { id, type, message }]);
			timers.current[id] = setTimeout(() => dismiss(id), duration);
			return id;
		},
		[dismiss]
	);

	const value = {
		toast: (message, type = "info") => push(type, message),
		success: (m) => push("success", m),
		error: (m) => push("error", m, 5200),
		info: (m) => push("info", m),
	};

	return (
		<ToastContext.Provider value={value}>
			{children}
			<div className="toast-viewport" role="region" aria-live="polite" aria-label="Notifications">
				{toasts.map((t) => (
					<div key={t.id} className={`toast toast-${t.type}`} onClick={() => dismiss(t.id)}>
						<span className="toast-icon" aria-hidden="true">
							{t.type === "success" ? "✓" : t.type === "error" ? "!" : "i"}
						</span>
						<span className="toast-message">{t.message}</span>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
}
