import { Suspense } from "react";
import { getDevelopers } from "@/lib/mock-actions";
import { FilterSidebar } from "@/components/explore/FilterSidebar";
import { DeveloperGrid } from "@/components/explore/DeveloperGrid";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { FilterParams } from "@/lib/types";

interface ExplorePageProps {
  searchParams: Promise<Record<string, string>>;
}

async function DeveloperResults({ filters }: { filters: FilterParams }) {
  const result = await getDevelopers(filters);
  return (
    <DeveloperGrid
      developers={result.data}
      total={result.total}
      page={result.page}
      totalPages={result.totalPages}
    />
  );
}

function GridSkeleton() {
  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams;
  const filters: FilterParams = {
    stack:        params.stack,
    seniority:    params.seniority,
    role:         params.role,
    location:     params.location,
    availability: params.availability,
    remote:       params.remote,
    language:     params.language,
    page:         params.page ? parseInt(params.page) : 1,
  };

  return (
    <div style={{ padding: "32px 24px 80px" }}>
      <div className="container-section">
        {/* Page header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6 }}>
            Explore Talent
          </h1>
          <p style={{ fontSize: 15, color: "var(--text-muted)" }}>
            Find developers by stack, seniority, availability, and more.
          </p>
        </div>

        {/* Layout: sidebar + grid */}
        <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
          <Suspense fallback={null}>
            <FilterSidebar />
          </Suspense>

          <Suspense key={JSON.stringify(filters)} fallback={<GridSkeleton />}>
            <DeveloperResults filters={filters} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
