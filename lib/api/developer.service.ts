import { fetchApi, ApiError } from "./client";
import type { Developer, FilterParams, PaginatedResult } from "../types";
import {
	ApiPaginatedResponse,
	ApiDeveloper,
	mapApiDeveloperToFrontend,
	seniorityToApi,
	statusToApi,
} from "./types";

export const DeveloperService = {
	async getAll(
		filters: FilterParams = {},
	): Promise<PaginatedResult<Developer>> {
		const params = new URLSearchParams();
		if (filters.page) params.set("page", String(filters.page));
		params.set("limit", String(filters.limit ?? 9));
		if (filters.stack) params.set("stack", filters.stack);
		if (filters.seniority)
			params.set("seniority", seniorityToApi(filters.seniority));
		if (filters.location) params.set("location", filters.location);
		if (filters.availability)
			params.set("status", statusToApi(filters.availability));
		if (filters.role) params.set("role", filters.role);

		const qs = params.toString();
		const raw: ApiPaginatedResponse = await fetchApi(
			`/developer${qs ? `?${qs}` : ""}`,
		);

		return {
			data: raw.data.map(mapApiDeveloperToFrontend),
			total: raw.meta.total,
			page: raw.meta.page,
			totalPages: raw.meta.lastPage,
		};
	},

	async getByUsername(username: string): Promise<Developer | null> {
		try {
			const raw: ApiDeveloper = await fetchApi(`/developer/${username}`);
			return mapApiDeveloperToFrontend(raw);
		} catch (e) {
			if (e instanceof ApiError && e.status === 404) return null;
			throw e;
		}
	},

	async getFeatured(): Promise<Developer[]> {
		const raw: ApiDeveloper[] = await fetchApi("/developer/featured?limit=6");
		return raw.map(mapApiDeveloperToFrontend);
	},

	async updateProfile(data: Record<string, unknown>): Promise<ApiDeveloper> {
		return fetchApi("/developer/me", {
			method: "PATCH",
			body: JSON.stringify(data),
		});
	},
};
