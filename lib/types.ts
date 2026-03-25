export type Availability = "available" | "busy" | "unavailable";
export type Seniority =
	| "Junior"
	| "Mid"
	| "Senior"
	| "Staff"
	| "Principal"
	| "Lead";
export type AvatarStyle = "geometric" | "abstract";

export interface SocialLinks {
	github?: string;
	linkedin?: string;
	twitter?: string;
	website?: string;
}

export interface Skill {
	name: string;
	category: "language" | "framework" | "tool" | "database" | "cloud";
}

export interface Project {
	id: string;
	title: string;
	description: string;
	repoUrl?: string;
	productionUrl?: string;
	tags: string[];
}

export interface Developer {
	id: string;
	username: string;
	name: string;
	seniority: Seniority;
	role: string;
	avatarStyle: AvatarStyle;
	avatarSeed: string; // deterministic seed for SVG generation
	location: string;
	country: string;
	languages: string[];
	bio: string;
	readme: string;
	skills: Skill[];
	projects: Project[];
	social: SocialLinks;
	availability: Availability;
	yearsOfExperience: number;
	openToRemote: boolean;
	featured: boolean;
}

export interface FilterParams {
	stack?: string;
	seniority?: string;
	role?: string;
	location?: string;
	availability?: string;
	remote?: string;
	language?: string;
	page?: number;
	limit?: number;
}

export interface PaginatedResult<T> {
	data: T[];
	total: number;
	page: number;
	totalPages: number;
}
