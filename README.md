# The Date Crew — Matchmaker CRM

**Live Demo:** https://the-date-crew.vercel.app  
**Author:** Gaurav Thakur (Fullstack Intern)

An elite, database-connected matrimonial CRM built for The Date Crew matchmaking agency. Enables matchmakers to manage client profiles, compute compatibility scores, and leverage AI to draft personalized introductions.

---

## Working Session Exercise

**Goal:** Design and build an internal tool MVP — a Matchmaker Dashboard and algorithm that helps the TDC team manage customers, view profiles, and assign matches.

**Problem Statement:** TDC matchmakers manage a growing list of clients at different stages of their matchmaking journey. They need a centralized tool to:

1. View and search verified profiles
2. Track each client's journey stage
3. Assign and dispatch potential matches
4. Record notes from meetings and calls

---

## Features

### Dashboard and CRM

- Real-time KPI tracking: Active Pipeline, Total Clients, Verified Profiles, Success Rates
- Interactive Recharts visualizations: Client Journey Funnel, Success Trends, Gender Distribution
- Comprehensive customer directory with status tags and search/filter capabilities
- Full biodata profile view including career (LPA), education, lifestyle, and family background

### Advanced Matching Algorithm

Gender-specific logic built around Indian matrimonial norms.

**For Male Clients:** Prioritizes women within compatible age, income, and height ranges. Factors in traditional preferences including religious and caste alignment, views on children, and relocation openness.

**For Female Clients:** Focuses on career compatibility, value alignment, lifestyle preferences, and relocation openness. Weighs dietary habits which carry significant weight in Indian matchmaking.

**Scoring Engine:** 100-point normalized system across six axes — Values, Lifestyle, Family Planning, Career, Location, and Language.

### AI Integration

- **Compatibility Briefs:** Gemini 2.0 Flash generates executive summaries, relationship potential analysis, and icebreaker questions for any selected pair
- **Personalized Introductions:** Drafts warm matchmaker-led email openers tailored to the specific couple
- **AI Profile Summaries:** One-click AI-generated consultant notes appended to a client's timeline
- **Natural Language Search:** Semantic search bar allowing queries like "divorced women in Mumbai earning above 15 LPA"
- **Graceful Fallback:** Local matching engine provides simulated insights when the Gemini API is unavailable

### Security and Performance

- Rate-limited sign-in endpoint (memory-based, 5 attempts per minute) to prevent brute-force attacks
- Server-side authentication via `/api/auth/sign-in` with bcrypt password verification
- Session management via Zustand with localStorage persistence
- Prisma 7 with Neon Serverless PostgreSQL for type-safe, scalable data access

### Bonus Features

- Command Palette (`Cmd+K` / `Ctrl+K`) for instant navigation and client search across the dashboard
- Dark/Light theme toggle with system preference detection and localStorage persistence
- CRM Settings panel: update matchmaker profile, rotate passwords, configure Gemini model, temperature, and API key routing
- PDF export for individual client dossiers
- Activity feed with real-time CRM event logs (notes added, matches sent, status changes)
- Global Notes Archive with author and AI-source filtering across all client timelines

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | Next.js 16 (React 19) | App Router, server components, superior routing |
| Styling | Tailwind CSS | Custom design tokens, dark mode, rapid iteration |
| State | Zustand | Lightweight, modular, avoids Redux boilerplate |
| Database | Neon DB (Serverless PostgreSQL) | Scales to zero, ideal for serverless deployments |
| ORM | Prisma 7 | Type-safe queries, schema migrations, Neon adapter |
| Animations | Framer Motion | Smooth layout transitions and entrance animations |
| Charts | Recharts | Composable, responsive chart primitives |
| AI | Google Gemini SDK | High-context reasoning, JSON schema enforcement |

---

## Assumptions

1. **Persona:** Primary user is an internal matchmaker who needs high-level overviews and quick action capabilities.
2. **Data:** 200 profiles generated deterministically via a custom seeding script to ensure reproducible results across environments.
3. **Tradition vs. Modernity:** Matching logic balances traditional Indian preferences (caste, height) with modern compatibility factors (career trajectory, lifestyle alignment).
4. **Authentication:** Single-account portal model — one matchmaker account manages the full client database.

---

## Getting Started

### Credentials

- Email: `gaurav123@tdc.com`
- Password: `tdc@123`

### Environment Setup

Create a `.env` file in the project root:

```env
# Pooled connection — used by the application at runtime
DATABASE_URL="postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require"

# Direct connection — used by Prisma CLI (db push, migrate, seed)
DIRECT_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"

# Optional — required for live AI features
GEMINI_API_KEY="AIza..."
```

### Install and Run

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

### Database Scripts

```bash
npm run db:generate   # Regenerate Prisma client after schema changes
npm run db:migrate    # Run migrations in development
npm run db:seed       # Seed 200 profiles, notes, and matchmaker account
npm run db:studio     # Open Prisma Studio GUI
```

---

## Project Structure

```
TheDateCrew/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── generated/
│   └── prisma/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/sign-in/
│   │   │   ├── ai/insights/
│   │   │   ├── ai/summary/
│   │   │   ├── customers/
│   │   │   ├── notes/
│   │   │   ├── activities/
│   │   │   └── settings/
│   │   ├── dashboard/
│   │   │   ├── customers/
│   │   │   ├── matches/
│   │   │   ├── insights/
│   │   │   ├── notes/
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   ├── sign-in/
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── DashboardNavbar.tsx
│   │   │   └── LandingNavbar.tsx
│   │   └── features/
│   │       ├── CommandPalette.tsx
│   │       ├── ThemeToggle.tsx
│   │       └── NotificationCenter.tsx
│   ├── store/
│   │   └── crmStore.ts
│   ├── utils/
│   │   ├── matchingEngine.ts
│   │   ├── gemini.ts
│   │   ├── aiSearch.ts
│   │   └── pdfExport.ts
│   ├── lib/
│   │   └── db.ts
│   ├── data/
│   │   └── mockProfiles.ts
│   └── types/
│       └── crm.ts
└── prisma.config.ts
```

---

## Author

Gaurav Thakur  
www.thegauravthakur.in  
Fullstack Intern @ The Date Crew