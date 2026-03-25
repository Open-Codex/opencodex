import { fetchApi } from "./client";
import type { ApiSkill } from "./types";

export type SkillCategory =
	| "LANGUAGE"
	| "FRAMEWORK"
	| "TOOL"
	| "DATABASE"
	| "CLOUD";

export interface CreateSkillPayload {
	name: string;
	category: SkillCategory;
}

export const SkillService = {
	async getAll(): Promise<ApiSkill[]> {
		return fetchApi("/skill");
	},

	/** Admin-only: create a new skill in the catalogue */
	async create(data: CreateSkillPayload): Promise<ApiSkill> {
		return fetchApi("/skill", {
			method: "POST",
			body: JSON.stringify(data),
		});
	},

	/** Assign skills to the authenticated developer */
	async assignToMe(skillNames: string[]): Promise<void> {
		return fetchApi("/skill/me", {
			method: "POST",
			body: JSON.stringify({ skills: skillNames }),
		});
	},
};
