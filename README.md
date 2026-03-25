# OpenCodex Talent

<div align="center">
  <h3>The premier open-source platform for discovering world-class developers.</h3>
  <p>A beautifully designed full-stack platform where developers can showcase their skills, projects, and availability to recruiters and collaborators worldwide.</p>
</div>

---

## 🚀 Features

- **Public Developer Profiles**: Shareable profile URLs (`/p/username`) with detailed experience, skills, and open-source project portfolios.
- **Dynamic Exploration**: Advanced filtering by tech stack, seniority, location, and remote availability.
- **Private Dashboard**: Complete profile and project management interface.
- **Admin Panel**: Role-based access control (RBAC) specifically tailored for cataloging and grouping new platform skills.
- **SEO Optimized**: Fully automated, dynamic XML sitemaps highlighting featured developers.
- **Responsive & Accessible**: Mobile-first design adopting glassmorphism aesthetics and dark mode integration.

## 🛠 Tech Stack

### Frontend (User Interface)
- **Framework**: [Next.js 16+ (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind with CSS Modules and global variables
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: `next-themes` (Dark/Light mode support)

### Backend (API & Database)
- **Framework**: [NestJS 10+](https://nestjs.com/)
- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: `class-validator` & `class-transformer`

*(For detailed backend documentation, see OpenCodex Repositories)*

---

## 🏗 Modular API Architecture

The frontend integrates with the NestJS API via a scalable, zero-dependency, modular service pattern located in `lib/api/`:

- `client.ts` — Core `fetch` wrapper handling Authorization headers implicitly.
- `auth.service.ts` — Handles login and registration.
- `developer.service.ts` — Handles fetching developer profiles, paginated search, and profile updates.
- `project.service.ts` — Handles standard CRUD operations for portfolios.
- `skill.service.ts` — Handles skill catalogue, assignment, and admin creation capabilities.

## ⚙️ Getting Started

### Prerequisites
- **Node.js**: v18 or newer
- **npm** or **yarn**
- The NestJS backend running locally (typically on port 5000).

### Standard Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Open-Codex/opencodex.git
   cd opencodex
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Used by Client components
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

   # Used by Server components (e.g. dynamic sitemaps)
   API_URL=http://localhost:5000/api/v1
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing
OpenCodex Talent is completely open-source. We welcome contributions from developers of all skill levels! 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
