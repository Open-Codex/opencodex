import { Developer, FilterParams, PaginatedResult } from "./types";
import { MOCK_DEVELOPERS } from "./data";

const PAGE_SIZE = 9;

function matchesFilter(dev: Developer, filters: FilterParams): boolean {
  if (filters.seniority && dev.seniority.toLowerCase() !== filters.seniority.toLowerCase()) return false;
  if (filters.availability && dev.availability !== filters.availability) return false;
  if (filters.remote === "true" && !dev.openToRemote) return false;

  if (filters.stack) {
    const stackLower = filters.stack.toLowerCase();
    const hasSkill = dev.skills.some((s) => s.name.toLowerCase().includes(stackLower));
    if (!hasSkill) return false;
  }

  if (filters.role) {
    const roleLower = filters.role.toLowerCase();
    if (!dev.role.toLowerCase().includes(roleLower)) return false;
  }

  if (filters.location) {
    const locationLower = filters.location.toLowerCase();
    if (
      !dev.location.toLowerCase().includes(locationLower) &&
      !dev.country.toLowerCase().includes(locationLower)
    ) return false;
  }

  if (filters.language) {
    const langLower = filters.language.toLowerCase();
    const hasLang = dev.languages.some((l) => l.toLowerCase().includes(langLower));
    if (!hasLang) return false;
  }

  return true;
}

export async function getDevelopers(
  filters: FilterParams = {}
): Promise<PaginatedResult<Developer>> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 120));

  const filtered = MOCK_DEVELOPERS.filter((d) => matchesFilter(d, filters));
  const page = filters.page ?? 1;
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginated = filtered.slice(start, end);

  return {
    data: paginated,
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / PAGE_SIZE),
  };
}

export async function getDeveloperByUsername(
  username: string
): Promise<Developer | null> {
  await new Promise((r) => setTimeout(r, 80));
  return MOCK_DEVELOPERS.find((d) => d.username === username) ?? null;
}

export async function getFeaturedDevelopers(): Promise<Developer[]> {
  await new Promise((r) => setTimeout(r, 60));
  return MOCK_DEVELOPERS.filter((d) => d.featured).slice(0, 6);
}

export const ALL_ROLES = [...new Set(MOCK_DEVELOPERS.map((d) => d.role))].sort();
export const ALL_SENIORITIES = ["Junior", "Mid", "Senior", "Staff", "Lead", "Principal"];
export const ALL_AVAILABILITIES = ["available", "busy", "unavailable"];
export const ALL_LANGUAGES = [
  ...new Set(MOCK_DEVELOPERS.flatMap((d) => d.languages)),
].sort();
export const ALL_STACKS = [
  ...new Set(MOCK_DEVELOPERS.flatMap((d) => d.skills.map((s) => s.name))),
].sort();
