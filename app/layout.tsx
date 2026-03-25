import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/components/providers/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: "OpenCodex — Professional Developer Hub",
		template: "%s | OpenCodex",
	},
	description:
		"Discover top developer talent. Browse professional profiles, skills, and open-source projects from engineers worldwide.",
	keywords: [
		"developers",
		"talent",
		"hire",
		"open source",
		"portfolio",
		"engineers",
	],
	authors: [{ name: "OpenCodex" }],
	openGraph: {
		type: "website",
		siteName: "OpenCodex",
		title: "OpenCodex — Professional Developer Hub",
		description: "Discover top developer talent worldwide.",
		images: [{ url: "/og-image.png", width: 1200, height: 630 }],
	},
	twitter: {
		card: "summary_large_image",
		title: "OpenCodex",
		description: "Discover top developer talent worldwide.",
	},
	robots: { index: true, follow: true },
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} ${jetbrainsMono.variable}`}>
				<ThemeProvider>
					<AuthProvider>
						<div className="flex flex-col min-h-screen">
							<Navbar />
							<main className="flex-1">{children}</main>
							<Footer />
						</div>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
