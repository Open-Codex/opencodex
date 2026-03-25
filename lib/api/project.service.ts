import { fetchApi } from "./client";
import type { ApiProject } from "./types";

export interface CreateProjectPayload {
	title: string;
	description: string;
	repoUrl?: string;
	productionUrl?: string;
}

export type UpdateProjectPayload = Partial<CreateProjectPayload>;

export const ProjectService = {
	async getMine(): Promise<ApiProject[]> {
		return fetchApi("/project/me");
	},

	async create(data: CreateProjectPayload): Promise<ApiProject> {
		return fetchApi("/project", {
			method: "POST",
			body: JSON.stringify(data),
		});
	},

	async update(id: string, data: UpdateProjectPayload): Promise<ApiProject> {
		return fetchApi(`/project/${id}`, {
			method: "PATCH",
			body: JSON.stringify(data),
		});
	},

	async remove(id: string): Promise<void> {
		return fetchApi(`/project/${id}`, { method: "DELETE" });
	},
};
