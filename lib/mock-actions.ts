import { Developer, FilterParams, PaginatedResult } from "./types";
import { DeveloperService } from "./api/developer.service";

export async function getDevelopers(
	filters: FilterParams = {},
): Promise<PaginatedResult<Developer>> {
	try {
		return await DeveloperService.getAll(filters);
	} catch {
		return { data: [], total: 0, page: 1, totalPages: 0 };
	}
}

export async function getDeveloperByUsername(
	username: string,
): Promise<Developer | null> {
	try {
		return await DeveloperService.getByUsername(username);
	} catch {
		return null;
	}
}

export async function getFeaturedDevelopers(): Promise<Developer[]> {
	try {
		return await DeveloperService.getFeatured();
	} catch {
		return [];
	}
}

export const ALL_ROLES = [
	"Backend Engineer",
	"Data Engineer",
	"DevOps Engineer",
	"Frontend Engineer",
	"Full Stack Engineer",
	"Machine Learning Engineer",
	"Mobile Engineer",
	"Platform Engineer",
	"Security Engineer",
];
export const ALL_SENIORITIES = [
	"Junior",
	"Mid",
	"Senior",
	"Staff",
	"Lead",
	"Principal",
];
export const ALL_AVAILABILITIES = ["available", "busy", "unavailable"];
export const ALL_LANGUAGES: string[] = [];
export const ALL_STACKS = [
	"C++",
	"CSS",
	"Cloudflare Workers",
	"Docker",
	"Expo",
	"Express",
	"FastAPI",
	"Flutter",
	"GSAP",
	"Go",
	"GraphQL",
	"Java",
	"JavaScript",
	"Kafka",
	"Kotlin",
	"Kubernetes",
	"MongoDB",
	"NestJS",
	"Next.js",
	"Node.js",
	"PostgreSQL",
	"Prisma",
	"Python",
	"PyTorch",
	"React",
	"React Native",
	"Redis",
	"Rust",
	"Spring Boot",
	"Swift",
	"Tailwind CSS",
	"TensorFlow",
	"Three.js",
	"TypeScript",
	"Vue.js",
];
