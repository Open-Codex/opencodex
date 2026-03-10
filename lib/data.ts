import { Developer } from "./types";

export const MOCK_DEVELOPERS: Developer[] = [
  {
    id: "1",
    username: "alice-chen",
    name: "Alice Chen",
    seniority: "Senior",
    role: "Frontend Engineer",
    avatarStyle: "geometric",
    avatarSeed: "ACE1",
    location: "San Francisco, CA",
    country: "United States",
    languages: ["English", "Mandarin"],
    bio: "Passionate about crafting beautiful, accessible user interfaces. 8+ years building products at scale with React and TypeScript.",
    readme: `# 👋 Hi, I'm Alice

I'm a Frontend Engineer focused on **design systems** and **performance optimization**.

## 🔧 What I do

- Build **design systems** from scratch (tokens, components, documentation)
- Optimize **Core Web Vitals** — I've improved LCP by 60% on production apps
- Contribute to **open-source** React component libraries

## 📦 Featured Work

\`\`\`tsx
// How I think about component APIs
<Button
  variant="primary"
  size="lg"
  leftIcon={<Rocket />}
  isLoading={submitting}
>
  Launch Project
</Button>
\`\`\`

## 📚 Currently Learning

- WebGPU for browser-based graphics
- AI-powered UX patterns

> *"Good design is invisible. Excellent code is readable."*
`,
    skills: [
      { name: "React", category: "framework" },
      { name: "TypeScript", category: "language" },
      { name: "Next.js", category: "framework" },
      { name: "GraphQL", category: "tool" },
      { name: "Figma", category: "tool" },
      { name: "Tailwind CSS", category: "framework" },
      { name: "Vitest", category: "tool" },
    ],
    projects: [
      {
        id: "p1",
        title: "Radix UI Themes",
        description: "Contributed 12+ accessible components to the Radix UI ecosystem.",
        repoUrl: "https://github.com/radix-ui/themes",
        productionUrl: "https://radix-ui.com",
        tags: ["React", "Accessibility", "Design System"],
      },
      {
        id: "p2",
        title: "Velocity Design System",
        description: "Internal design system used by 30+ engineers at my company.",
        tags: ["TypeScript", "Storybook", "CSS"],
      },
    ],
    social: {
      github: "https://github.com/alicechen",
      linkedin: "https://linkedin.com/in/alicechen",
      twitter: "https://twitter.com/alicechen_dev",
      website: "https://alice.dev",
    },
    availability: "available",
    yearsOfExperience: 8,
    openToRemote: true,
    featured: true,
  },
  {
    id: "2",
    username: "marcos-silva",
    name: "Marcos Silva",
    seniority: "Lead",
    role: "Backend Engineer",
    avatarStyle: "abstract",
    avatarSeed: "MSB2",
    location: "São Paulo, Brazil",
    country: "Brazil",
    languages: ["Portuguese", "English", "Spanish"],
    bio: "Lead Backend Engineer with 10 years of experience building distributed systems and high-availability APIs. Open-source contributor.",
    readme: `# Marcos Silva — Backend Engineer

## About Me

I design **distributed systems** that handle millions of requests per day. Currently leading a team of 6 engineers at a fintech startup.

## Tech Philosophy

\`\`\`
Reliability > Features > Performance
\`\`\`

I believe systems should fail gracefully, recover automatically, and be observable by default.

## Open Source

- **pgqueue** — PostgreSQL-backed job queue for Node.js (⭐ 2.4k)
- **tracerkit** — OpenTelemetry SDK wrapper with zero-config defaults

## Architecture I find interesting

- Event-driven architectures with Kafka
- CQRS + Event Sourcing patterns
- Distributed tracing and observability
`,
    skills: [
      { name: "Go", category: "language" },
      { name: "Node.js", category: "framework" },
      { name: "PostgreSQL", category: "database" },
      { name: "Kafka", category: "tool" },
      { name: "Kubernetes", category: "cloud" },
      { name: "Redis", category: "database" },
      { name: "gRPC", category: "tool" },
    ],
    projects: [
      {
        id: "p3",
        title: "pgqueue",
        description: "High-performance job queue backed by PostgreSQL with at-least-once delivery guarantees.",
        repoUrl: "https://github.com/marcos/pgqueue",
        tags: ["Go", "PostgreSQL", "Distributed Systems"],
      },
    ],
    social: {
      github: "https://github.com/marcosSilva",
      linkedin: "https://linkedin.com/in/marcosSilva",
    },
    availability: "busy",
    yearsOfExperience: 10,
    openToRemote: true,
    featured: true,
  },
  {
    id: "3",
    username: "sara-kowalski",
    name: "Sara Kowalski",
    seniority: "Principal",
    role: "Full Stack Engineer",
    avatarStyle: "geometric",
    avatarSeed: "SKF3",
    location: "Warsaw, Poland",
    country: "Poland",
    languages: ["Polish", "English", "German"],
    bio: "Principal engineer specializing in platform engineering and developer experience. Speaker at JSConf EU 2024.",
    readme: `# Sara Kowalski

> Principal Engineer · Platform · DX

## Mission

I make developers **10x more productive** by building the right internal tooling, CI/CD pipelines, and developer platforms.

## Talks & Writing

- *"Scaling Next.js to 200 Developers"* — JSConf EU 2024
- *"The DX Scorecard: Measuring Developer Happiness"* — blog.sarakowalski.dev

## Stack I'm Excited About

| Area | Tools |
|------|-------|
| Edge | Cloudflare Workers, Deno Deploy |
| Bundlers | Turbopack, Rolldown |
| DB | Turso (libSQL), Neon |
| AI | Vercel AI SDK, LangChain |
`,
    skills: [
      { name: "TypeScript", category: "language" },
      { name: "React", category: "framework" },
      { name: "Rust", category: "language" },
      { name: "Cloudflare Workers", category: "cloud" },
      { name: "Next.js", category: "framework" },
      { name: "Turbopack", category: "tool" },
      { name: "Docker", category: "tool" },
    ],
    projects: [
      {
        id: "p4",
        title: "devx-toolkit",
        description: "CLI toolkit for bootstrapping scalable Next.js monorepos with best practices baked in.",
        repoUrl: "https://github.com/sara/devx-toolkit",
        productionUrl: "https://devx.tools",
        tags: ["TypeScript", "CLI", "DX"],
      },
    ],
    social: {
      github: "https://github.com/sarakowalski",
      linkedin: "https://linkedin.com/in/sarakowalski",
      website: "https://sarakowalski.dev",
      twitter: "https://twitter.com/sara_dev",
    },
    availability: "available",
    yearsOfExperience: 12,
    openToRemote: true,
    featured: true,
  },
  {
    id: "4",
    username: "jamal-hassan",
    name: "Jamal Hassan",
    seniority: "Senior",
    role: "Mobile Engineer",
    avatarStyle: "abstract",
    avatarSeed: "JHM4",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    languages: ["English", "Yoruba", "Hausa"],
    bio: "Senior Mobile Engineer who has shipped 6 apps with 1M+ downloads on the App Store. Expert in React Native and Swift.",
    readme: `# Jamal Hassan — Mobile Engineer

## Apps I've Shipped

- **Fintrac** — Personal finance app, 800k downloads 💰
- **Haamu** — Social marketplace for West Africa, Series A funded
- **VaultPay** — Crypto wallet with biometric auth

## Philosophy

I care about **performance** on low-end devices. Not everyone has a flagship phone. I test on real hardware in the ₦15,000–₦30,000 price range.

## Expertise

\`\`\`
React Native — Expert
Swift / SwiftUI — Proficient
Kotlin — Familiar
Expo — Expert
\`\`\`
`,
    skills: [
      { name: "React Native", category: "framework" },
      { name: "Swift", category: "language" },
      { name: "TypeScript", category: "language" },
      { name: "Expo", category: "tool" },
      { name: "Firebase", category: "cloud" },
      { name: "Redux Toolkit", category: "framework" },
    ],
    projects: [
      {
        id: "p5",
        title: "Haamu",
        description: "Social marketplace for West Africa with 200k active users.",
        productionUrl: "https://haamu.ng",
        tags: ["React Native", "Node.js", "Firebase"],
      },
    ],
    social: {
      github: "https://github.com/jamalhassan",
      twitter: "https://twitter.com/jamal_builds",
      linkedin: "https://linkedin.com/in/jamalhassan",
    },
    availability: "available",
    yearsOfExperience: 7,
    openToRemote: true,
    featured: true,
  },
  {
    id: "5",
    username: "yuki-tanaka",
    name: "Yuki Tanaka",
    seniority: "Staff",
    role: "Machine Learning Engineer",
    avatarStyle: "geometric",
    avatarSeed: "YTM5",
    location: "Tokyo, Japan",
    country: "Japan",
    languages: ["Japanese", "English"],
    bio: "Staff ML Engineer at a top robotics company. Specializes in computer vision and on-device inference. Published researcher.",
    readme: `# Yuki Tanaka

**Staff ML Engineer · Computer Vision · Edge AI**

## Research

- *Fast Object Detection on Edge Devices* — CVPR 2023
- *Efficient Transformers for Mobile* — NeurIPS 2022

## What I Build

I build models that run **on device** — on microcontrollers, phones, and embedded systems. I believe AI should work offline, be private by default, and consume as little power as possible.

## Tools

\`\`\`python
frameworks = ["PyTorch", "TensorFlow Lite", "ONNX", "CoreML"]
infra      = ["MLflow", "DVC", "Triton Inference Server"]
languages  = ["Python", "C++", "Swift"]
\`\`\`
`,
    skills: [
      { name: "Python", category: "language" },
      { name: "PyTorch", category: "framework" },
      { name: "C++", category: "language" },
      { name: "TensorFlow", category: "framework" },
      { name: "ONNX", category: "tool" },
      { name: "CUDA", category: "tool" },
    ],
    projects: [
      {
        id: "p6",
        title: "tflite-benchmark",
        description: "Benchmark suite for TFLite model performance on 30+ Android devices.",
        repoUrl: "https://github.com/yuki/tflite-benchmark",
        tags: ["Python", "TFLite", "Benchmarking"],
      },
    ],
    social: {
      github: "https://github.com/yukitanaka",
      linkedin: "https://linkedin.com/in/yukitanaka",
      website: "https://yuki.ml",
    },
    availability: "unavailable",
    yearsOfExperience: 9,
    openToRemote: false,
    featured: true,
  },
  {
    id: "6",
    username: "elena-vasquez",
    name: "Elena Vasquez",
    seniority: "Mid",
    role: "Frontend Engineer",
    avatarStyle: "abstract",
    avatarSeed: "EVF6",
    location: "Buenos Aires, Argentina",
    country: "Argentina",
    languages: ["Spanish", "English"],
    bio: "Frontend developer in love with CSS, animations, and creative coding. Contributor to the Three.js ecosystem.",
    readme: `# Elena Vasquez ✨

*"The web is the most accessible creative medium ever invented."*

I specialize in **creative frontend** — canvas animations, 3D experiences, and micro-interactions that make users go "whoa".

## Pen & Code

I maintain a collection of **CodePen experiments** with 40k+ followers focused on creative CSS and WebGL.

## Currently

🔭 Building a 3D portfolio builder using Three.js + React Three Fiber  
🌱 Learning GLSL shaders  
💬 Ask me about CSS animations, Web Animations API, or canvas

## Setup

\`\`\`
Neovim + tmux · macOS · HHKB keyboard
\`\`\`
`,
    skills: [
      { name: "React", category: "framework" },
      { name: "Three.js", category: "framework" },
      { name: "TypeScript", category: "language" },
      { name: "GSAP", category: "tool" },
      { name: "CSS", category: "language" },
      { name: "WebGL", category: "tool" },
    ],
    projects: [
      {
        id: "p7",
        title: "r3f-particles",
        description: "GPU-accelerated particle system for React Three Fiber with 60fps on mobile.",
        repoUrl: "https://github.com/elena/r3f-particles",
        productionUrl: "https://particles.elena.dev",
        tags: ["Three.js", "GLSL", "React"],
      },
    ],
    social: {
      github: "https://github.com/elenavasquez",
      twitter: "https://twitter.com/elena_creative",
      website: "https://elena.dev",
    },
    availability: "available",
    yearsOfExperience: 4,
    openToRemote: true,
    featured: true,
  },
  {
    id: "7",
    username: "dev-morgan",
    name: "Morgan Riley",
    seniority: "Junior",
    role: "Full Stack Engineer",
    avatarStyle: "geometric",
    avatarSeed: "MRF7",
    location: "Austin, TX",
    country: "United States",
    languages: ["English"],
    bio: "Self-taught developer, bootcamp grad turned professional engineer. Building my first startup while working full-time.",
    readme: `# Morgan Riley

Fresh engineer, big ambitions. 🚀

## My Journey

Went from marketing → self-taught code → bootcamp → first dev job in 14 months. Now building products full-time.

## Side Project

Working on **PitchDeck AI** — an AI tool that generates investor pitch decks from a one-paragraph description.

Currently: 43 beta users, $0 revenue, infinite hope. 😄

## Learning Now

- System design
- Database indexing
- Rust (slowly...)
`,
    skills: [
      { name: "JavaScript", category: "language" },
      { name: "React", category: "framework" },
      { name: "Node.js", category: "framework" },
      { name: "MongoDB", category: "database" },
      { name: "TailwindCSS", category: "framework" },
    ],
    projects: [
      {
        id: "p8",
        title: "PitchDeck AI",
        description: "AI-powered pitch deck generator. Generate slides from a paragraph in 60 seconds.",
        productionUrl: "https://pitchdeck.ai",
        tags: ["Next.js", "OpenAI", "MongoDB"],
      },
    ],
    social: {
      github: "https://github.com/morganriley",
      twitter: "https://twitter.com/morgan_builds",
    },
    availability: "available",
    yearsOfExperience: 2,
    openToRemote: true,
    featured: false,
  },
  {
    id: "8",
    username: "priya-sharma",
    name: "Priya Sharma",
    seniority: "Senior",
    role: "DevOps Engineer",
    avatarStyle: "abstract",
    avatarSeed: "PSD8",
    location: "Bangalore, India",
    country: "India",
    languages: ["Hindi", "English", "Kannada"],
    bio: "Senior DevOps engineer with deep expertise in multi-cloud infrastructure, GitOps, and cost optimization. Reduced cloud spend by 45% at last 2 companies.",
    readme: `# Priya Sharma — DevOps & Platform Engineering

## What I Optimize

- ☁️ Multi-cloud cost (AWS + GCP, saved $2M ARR)
- 🚀 Deployment pipelines (0 to 100 deploys/day)
- 📊 Observability stacks (Prometheus, Grafana, Loki)

## Certifications

- AWS Solutions Architect Professional
- Google Cloud Professional DevOps Engineer
- CKA (Certified Kubernetes Administrator)

## Recently

Built a GitOps platform from scratch for 80 microservices using ArgoCD + Crossplane. P99 deployment time: **45 seconds**.
`,
    skills: [
      { name: "Kubernetes", category: "cloud" },
      { name: "Terraform", category: "tool" },
      { name: "AWS", category: "cloud" },
      { name: "Python", category: "language" },
      { name: "ArgoCD", category: "tool" },
      { name: "Prometheus", category: "tool" },
    ],
    projects: [
      {
        id: "p9",
        title: "k8s-cost-analyzer",
        description: "CLI tool to analyze Kubernetes resource requests vs actual usage to identify waste.",
        repoUrl: "https://github.com/priya/k8s-cost-analyzer",
        tags: ["Go", "Kubernetes", "FinOps"],
      },
    ],
    social: {
      github: "https://github.com/priyasharma",
      linkedin: "https://linkedin.com/in/priyasharmadev",
    },
    availability: "busy",
    yearsOfExperience: 8,
    openToRemote: true,
    featured: false,
  },
  {
    id: "9",
    username: "lucas-fernandez",
    name: "Lucas Fernandez",
    seniority: "Senior",
    role: "Backend Engineer",
    avatarStyle: "geometric",
    avatarSeed: "LFB9",
    location: "Madrid, Spain",
    country: "Spain",
    languages: ["Spanish", "English", "Catalan"],
    bio: "Backend engineer in love with functional programming and elegant APIs. Haskell enthusiast, Elixir advocate. Building real-time systems.",
    readme: `# Lucas Fernandez

**Backend · Functional Programming · Real-time Systems**

I write code that's **correct by construction**. Types are documentation. Side effects should be explicit. Concurrency should be easy.

## Stack

- **Elixir / Phoenix** for real-time systems
- **Haskell** for correctness-critical code
- **PostgreSQL** for everything else

## Open Source

- **elixir-rate** — Token bucket rate limiting for Phoenix
- **hasql-migrate** — Type-safe database migrations in Haskell

## Currently Reading

*Designing Data-Intensive Applications* (for the 3rd time 🙂)
`,
    skills: [
      { name: "Elixir", category: "language" },
      { name: "Haskell", category: "language" },
      { name: "PostgreSQL", category: "database" },
      { name: "Phoenix", category: "framework" },
      { name: "Rust", category: "language" },
    ],
    projects: [
      {
        id: "p10",
        title: "elixir-rate",
        description: "Token bucket rate limiting library for Phoenix Framework with Redis backend.",
        repoUrl: "https://github.com/lucas/elixir-rate",
        tags: ["Elixir", "Phoenix", "Redis"],
      },
    ],
    social: {
      github: "https://github.com/lucasfernandez",
      website: "https://lucas.codes",
      twitter: "https://twitter.com/lucas_fp",
    },
    availability: "available",
    yearsOfExperience: 6,
    openToRemote: true,
    featured: false,
  },
  {
    id: "10",
    username: "nadia-okonkwo",
    name: "Nadia Okonkwo",
    seniority: "Lead",
    role: "Security Engineer",
    avatarStyle: "abstract",
    avatarSeed: "NOS10",
    location: "London, UK",
    country: "United Kingdom",
    languages: ["English", "French", "Igbo"],
    bio: "Offensive security specialist turned AppSec Lead. Found critical vulnerabilities in 3 Fortune 500 companies through bug bounty. Speaker at DEF CON.",
    readme: `# Nadia Okonkwo — Security Engineering

> Finding the bugs before the bad guys do.

## Background

Started as a pen tester. Discovered a P1 in a major bank's OAuth flow (CVE-2021-XXXX, $50k bounty). Now building security programs from scratch at scale.

## Specialties

- Application Security (SAST, DAST, SCA)
- Threat modeling (STRIDE, PASTA)
- Security architecture review
- Red teaming

## Talks

- *"OAuth is Hard: Common Mistakes in Production"* — DEF CON 31
- *"Secure by Default: AppSec Automation"* — OWASP AppSec Global 2023
`,
    skills: [
      { name: "Python", category: "language" },
      { name: "Go", category: "language" },
      { name: "Burp Suite", category: "tool" },
      { name: "AWS", category: "cloud" },
      { name: "Kubernetes", category: "cloud" },
      { name: "Rust", category: "language" },
    ],
    projects: [
      {
        id: "p11",
        title: "oauth-auditor",
        description: "Automated OAuth flow security scanner that checks for common misconfigurations.",
        repoUrl: "https://github.com/nadia/oauth-auditor",
        tags: ["Python", "Security", "OAuth"],
      },
    ],
    social: {
      github: "https://github.com/nadiaokonkwo",
      linkedin: "https://linkedin.com/in/nadiaokonkwo",
      twitter: "https://twitter.com/nadia_sec",
    },
    availability: "unavailable",
    yearsOfExperience: 9,
    openToRemote: false,
    featured: false,
  },
  {
    id: "11",
    username: "kai-bergström",
    name: "Kai Bergström",
    seniority: "Mid",
    role: "Data Engineer",
    avatarStyle: "geometric",
    avatarSeed: "KBD11",
    location: "Stockholm, Sweden",
    country: "Sweden",
    languages: ["Swedish", "English", "Finnish"],
    bio: "Data engineer passionate about turning messy raw data into clean, reliable pipelines. dbt advocate. Building a lakehouse for a fintech.",
    readme: `# Kai Bergström — Data Engineering

I build **data pipelines** that actually work — reliable, observable, and maintainable.

## Stack

\`\`\`
Ingestion: Fivetran, Airbyte, custom Kafka consumers
Transform: dbt (love it), SQL, Python
Storage:   BigQuery, Delta Lake, ClickHouse
Orchestration: Dagster, Airflow
Visualization: Metabase, Superset
\`\`\`

## What I'm proud of

Reduced our BigQuery monthly bill by **72%** through partitioning, clustering, and query optimization. Saved €40k/year.

## Open Source

Maintaining a **dbt-utils** extension collection for financial data modeling.
`,
    skills: [
      { name: "Python", category: "language" },
      { name: "SQL", category: "language" },
      { name: "dbt", category: "tool" },
      { name: "BigQuery", category: "database" },
      { name: "Kafka", category: "tool" },
      { name: "Dagster", category: "tool" },
    ],
    projects: [
      {
        id: "p12",
        title: "dbt-finance",
        description: "dbt package with financial data transformations and data quality tests.",
        repoUrl: "https://github.com/kai/dbt-finance",
        tags: ["dbt", "SQL", "FinTech"],
      },
    ],
    social: {
      github: "https://github.com/kaibergstrom",
      linkedin: "https://linkedin.com/in/kaibergstrom",
    },
    availability: "available",
    yearsOfExperience: 5,
    openToRemote: true,
    featured: false,
  },
  {
    id: "12",
    username: "alex-nguyen",
    name: "Alex Nguyen",
    seniority: "Senior",
    role: "Platform Engineer",
    avatarStyle: "abstract",
    avatarSeed: "ANP12",
    location: "Ho Chi Minh City, Vietnam",
    country: "Vietnam",
    languages: ["Vietnamese", "English"],
    bio: "Platform engineer who built the infrastructure backbone for a unicorn startup from 0 to 10M users. Loves Rust and low-level systems programming.",
    readme: `# Alex Nguyen

**Platform Engineering · Systems Programming · Rust**

## What I do

I build the **boring infrastructure** that lets product engineers move fast without breaking things.

- Internal compute platform (1200+ services)  
- Developer CLI tooling (npx create-app → deployed in 5s)  
- Cost attribution and chargeback system  

## Why Rust?

Because when your platform serves 10M users, memory leaks and undefined behavior are existential threats. Rust makes correctness compile-time.

## Numbers

\`\`\`
Engineers served: 200+
Services managed: 1,200+
Uptime (12 months): 99.97%
\`\`\`
`,
    skills: [
      { name: "Rust", category: "language" },
      { name: "Go", category: "language" },
      { name: "Kubernetes", category: "cloud" },
      { name: "Terraform", category: "tool" },
      { name: "AWS", category: "cloud" },
      { name: "Linux", category: "tool" },
    ],
    projects: [
      {
        id: "p13",
        title: "ferrocd",
        description: "Rust-based GitOps operator for Kubernetes with sub-second reconciliation.",
        repoUrl: "https://github.com/alex/ferrocd",
        tags: ["Rust", "Kubernetes", "GitOps"],
      },
    ],
    social: {
      github: "https://github.com/alexnguyen",
      linkedin: "https://linkedin.com/in/alexnguyen",
      website: "https://alex.systems",
    },
    availability: "busy",
    yearsOfExperience: 7,
    openToRemote: true,
    featured: false,
  },
];
