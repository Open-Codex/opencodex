import { fetchApi } from "./client";
import { seniorityToApi } from "./types";

export interface LoginResponse {
	access_token: string;
}

export interface RegisterPayload {
	email: string;
	password: string;
	name: string;
	username: string;
	seniority: string;
	role: string;
}

export const AuthService = {
	async login(email: string, password: string): Promise<LoginResponse> {
		return fetchApi("/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
		});
	},

	async register(data: RegisterPayload): Promise<LoginResponse> {
		return fetchApi("/auth/register", {
			method: "POST",
			body: JSON.stringify({
				...data,
				seniority: seniorityToApi(data.seniority),
			}),
		});
	},
};
