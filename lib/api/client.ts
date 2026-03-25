const API_BASE =
	process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

// ── Token helpers ──

export function getToken(): string | null {
	if (typeof window === "undefined") return null;
	return localStorage.getItem("oct_token");
}

export function setToken(token: string): void {
	localStorage.setItem("oct_token", token);
}

export function removeToken(): void {
	localStorage.removeItem("oct_token");
}

// ── Error class ──

export class ApiError extends Error {
	constructor(
		public status: number,
		message: string,
		public body?: Record<string, unknown>,
	) {
		super(message);
		this.name = "ApiError";
	}
}

// ── Core fetch wrapper ──

export async function fetchApi<T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<T> {
	const token = getToken();

	const headers: Record<string, string> = {
		"Content-Type": "application/json",
		...((options.headers as Record<string, string>) ?? {}),
	};

	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}

	const res = await fetch(`${API_BASE}${endpoint}`, {
		...options,
		headers,
	});

	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		throw new ApiError(res.status, body.message ?? res.statusText, body);
	}

	if (res.status === 204) return undefined as T;
	return res.json();
}
