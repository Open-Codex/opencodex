import type {
	Developer,
	Skill,
	Project,
	Availability,
	Seniority,
	AvatarStyle,
} from "../types";

// ── Enum maps ──

const SENIORITY_MAP: Record<string, Seniority> = {
	JUNIOR: "Junior",
	MID: "Mid",
	SENIOR: "Senior",
	STAFF: "Staff",
	LEAD: "Lead",
	PRINCIPAL: "Principal",
};

const SENIORITY_REVERSE: Record<string, string> = {
	Junior: "JUNIOR",
	Mid: "MID",
	Senior: "SENIOR",
	Staff: "STAFF",
	Lead: "LEAD",
	Principal: "PRINCIPAL",
};

const STATUS_MAP: Record<string, Availability> = {
	AVAILABLE: "available",
	BUSY: "busy",
	UNAVAILABLE: "unavailable",
};

const STATUS_REVERSE: Record<string, string> = {
	available: "AVAILABLE",
	busy: "BUSY",
	unavailable: "UNAVAILABLE",
};

const AVATAR_MAP: Record<string, AvatarStyle> = {
	GEOMETRIC: "geometric",
	ABSTRACT: "abstract",
};

// ── Raw API interfaces ──

export interface ApiSkillNested {
	skill: { name: string; category?: string };
}

export interface ApiDeveloper {
	id: string;
	email?: string;
	name: string;
	username: string;
	seniority: string;
	role: string;
	bio: string | null;
	readme: string | null;
	location: string | null;
	experienceYears: number;
	avatarStyle: string;
	avatarSeed: string;
	status: string;
	remoteOk: boolean;
	featured: boolean;
	githubUrl: string | null;
	linkedinUrl: string | null;
	twitterUrl: string | null;
	portfolioUrl: string | null;
	skills?: ApiSkillNested[];
	projects?: ApiProject[];
}

export interface ApiProject {
	id: string;
	title: string;
	description: string;
	repoUrl: string | null;
	productionUrl: string | null;
}

export interface ApiPaginatedResponse {
	data: ApiDeveloper[];
	meta: { total: number; page: number; lastPage: number };
}

export interface ApiSkill {
	id: string;
	name: string;
	category: string;
}

// ── Transformers ──

export function mapApiDeveloperToFrontend(api: ApiDeveloper): Developer {
	const skills: Skill[] = (api.skills ?? []).map((s) => ({
		name: s.skill.name,
		category: (s.skill.category?.toLowerCase() ?? "tool") as Skill["category"],
	}));

	const projects: Project[] = (api.projects ?? []).map((p) => ({
		id: p.id,
		title: p.title,
		description: p.description,
		repoUrl: p.repoUrl ?? undefined,
		productionUrl: p.productionUrl ?? undefined,
		tags: [],
	}));

	return {
		id: api.id,
		username: api.username,
		name: api.name,
		seniority: SENIORITY_MAP[api.seniority] ?? "Mid",
		role: api.role,
		avatarStyle: AVATAR_MAP[api.avatarStyle] ?? "geometric",
		avatarSeed: api.avatarSeed,
		location: api.location ?? "",
		country: "",
		languages: [],
		bio: api.bio ?? "",
		readme: api.readme ?? "",
		skills,
		projects,
		social: {
			github: api.githubUrl ?? undefined,
			linkedin: api.linkedinUrl ?? undefined,
			twitter: api.twitterUrl ?? undefined,
			website: api.portfolioUrl ?? undefined,
		},
		availability: STATUS_MAP[api.status] ?? "available",
		yearsOfExperience: api.experienceYears,
		openToRemote: api.remoteOk,
		featured: api.featured,
	};
}

export function seniorityToApi(s: string): string {
	return SENIORITY_REVERSE[s] ?? s.toUpperCase();
}

export function statusToApi(s: string): string {
	return STATUS_REVERSE[s] ?? s.toUpperCase();
}
