import { MetadataRoute } from "next";

// Revalidate every 24h so new profiles appear without a full rebuild
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://opencodex.app";

	// Works in both dev and production
	const apiUrl = process.env.API_URL ?? "http://localhost:5000/api/v1";

	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${baseUrl}/explore`,
			lastModified: new Date(),
			changeFrequency: "hourly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/faq`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.4,
		},
		{
			url: `${baseUrl}/privacy`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3,
		},
	];

	let profilePages: MetadataRoute.Sitemap = [];
	try {
		let page = 1;
		const limit = 50; // Backend restricts
		let hasMore = true;

		const safeApiUrl = apiUrl.includes("localhost")
			? apiUrl.replace("localhost", "127.0.0.1")
			: apiUrl;

		while (hasMore) {
			const res = await fetch(
				`${safeApiUrl}/developer?page=${page}&limit=${limit}`,
				{
					next: { revalidate: 86400 },
				},
			);

			if (!res.ok) {
				console.error(`[sitemap] API error: ${res.status} ${res.statusText}`);
				break;
			}

			const json: {
				data: { username: string; featured: boolean }[];
				meta: { lastPage: number };
			} = await res.json();

			const featuredDevelopers = json.data.filter((dev) => dev.featured);

			const entries: MetadataRoute.Sitemap = featuredDevelopers.map((dev) => ({
				url: `${baseUrl}/p/${dev.username}`,
				lastModified: new Date(),
				changeFrequency: "weekly",
				priority: 0.85,
			}));

			profilePages = [...profilePages, ...entries];

			hasMore = page < json.meta.lastPage;
			page++;
		}
	} catch (err) {
		console.error("[sitemap] Failed to fetch developer profiles:", err);
	}

	return [...staticPages, ...profilePages];
}
