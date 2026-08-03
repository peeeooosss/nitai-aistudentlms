Nitai 90-Day Gamified LMS: Master Specification & Implementation Guide
1. Executive Summary & Core Philosophy
The Nitai Learn-to-Earn LMS is a full-stack, gamified educational platform designed to transition GenZ youth and aspiring tech entrepreneurs from basic AI literacy to active monetization across a 90-day structured roadmap.
Instead of charging students for paid software subscriptions, the platform operates on a Zero-Capital AI Startup model. Students earn Nitai Credits by maintaining login streaks, completing daily modules, taking auto-graded quizzes, submitting practical assignments, and fulfilling internal corporate micro-bounties. These credits act as an internal currency redeemable in the Digital Storefront for Nitai Group’s 1,200+ digital resell assets, SaaS API vouchers, and franchise application discounts.
2. Technical Stack & System Architecture
To maintain sub-second performance, zero project bloat, and military-grade security, the system adheres to a modern REST/Serverless Edge stack:
Frontend Framework: React 19 + Vite (or Next.js App Router for server-rendered storefront pages) + Tailwind CSS + Lucide Icons + Framer Motion (for UI animations and milestone celebrations).
API / Backend: Hono running on Cloudflare Workers or Netlify Edge Functions for ultra-low latency REST routing.
Database & ORM: Neon Serverless Postgres managed strictly via Drizzle ORM (type-safe, fully parameterized queries preventing SQL injection).
AI Engine: Groq API (llama-3.3-70b-versatile) integrated with pgvector in Neon Postgres for contextual RAG (Retrieval-Augmented Generation) doubt-clearing and pre-grading.
Auth & Security: Google OAuth 2.0 + strictly signed HS256 JWTs stored in localStorage/HttpOnly cookies, guarded by Role-Based Access Control (RBAC) middleware.
3. First Page UI/UX: The "Split-Gateway" Homepage (/)
To eliminate cognitive overload and separate B2C students from B2B enterprise clients, the homepage must not render a cluttered dashboard. It must follow this strict Component Tree:
[ <Header /> Navbar ] ── Logo | Store Preview | Login Button
         │
[ <SplitHero /> Hero ] ── Unified Headline | Split-Gateway Cards (Two Primary CTAs)
         │
[ <EconomyTicker /> ] ── Live Gamification Proof (Credits Awarded, Active Bounties)
         │
[ <StudentPreview /> ] ── 90-Day Roadmap Breakdown (For B2C Students)
         │
[ <EnterpriseView /> ] ── Franchise & SaaS Ecosystem (For B2B Business Owners)
         │
[ <Footer /> Navigation ] ── WAIO Certification | Legal & Privacy Links
Explicit Button & Routing Matrix (For OpenCode AI)
Component / Section	Button Label	Target Route (href)	Action / Behavior	RBAC Requirement
Navbar	Sign In / Join	/auth/login	Opens OAuth modal or routes to SSO gateway	Public / Anonymous
Hero Left Card	Start Learning & Earning	/dashboard/student	Checks auth → Routes to 90-Block Grid	Student Role
Hero Right Card	Explore Franchise & SaaS	/ecosystem/enterprise	Directs to B2B SaaS architecture & inquiry form	Public / Enterprise Lead
Student Dashboard	Launch AI Didi Tutor	?modal=ai-tutor	Opens floating contextual RAG chat overlay	Logged-in Student
Student Dashboard	Redeem Store Asset	/store/checkout/:itemId	Validates user.totalCredits >= item.cost	Logged-in Student
Admin Navbar	Enter Command Center	/admin/overview	Hidden from DOM unless user.role === 'ADMIN'	Strict Admin Role
4. Student Dashboard Architecture (/dashboard/student)
The student dashboard focuses strictly on learning progression and credit accumulation.
Top Gamification Bar: Sticky bar displaying live counters: Total Nitai Credits, Current Day Streak, and Overall Progress %.
The 90-Block Dynamic Grid (<ModuleGrid />): Visual grid representing Days 1 through 90 divided into three phases (Month 1: Hustler, Month 2: Automation Agency, Month 3: Enterprise).
Sequential Gating: Day N remains locked and disabled until Day N−1 video, quiz, and assignment are marked completed.
Module Classroom View (/dashboard/student/module/:dayNumber):
Video Player: Embeds video content with playback speed controls.
Markdown Notes Desk: Formatted lecture transcripts and prompt templates.
Evaluation Tabs: * Quiz Tab: Multiple-choice questions auto-graded upon submission.
Assignment Tab: File upload, URL link submission, or text input.
Contextual AI Tutor ("AI Didi"): Floating overlay accessible from any module. Powered by Groq RAG, trained strictly on curriculum documentation to clear doubts instantly without leaving the page.
5. Admin Command Center Blueprint (/admin/*)
The Admin Panel is fully isolated from the student UI and accessible exclusively via middleware-guarded routes.
[ Admin Command Center ]
   ├── /admin/overview         (Ecosystem Analytics & Active Streaks)
   ├── /admin/modules          (Video Uploads & 90-Day Block Builder)
   ├── /admin/evaluations      (Quiz Creator & Assignment Grader)
   ├── /admin/notifications    (System Broadcasts & Cohort Alerts)
   └── /admin/economy          (Credit Escrow, Bounties & Store Inventory)
Module & Video Studio (/admin/modules): Add/Edit any of the 90 blocks. Fields: Day Number, Phase Selector, Video Embed URL, Markdown Content, Credits Reward, and Prerequisite Lock Toggle.
Evaluation Builder (/admin/evaluations): * Quiz Creator: Add MCQ questions, options A-D, correct option key, and explanation text.
Assignment Grader Desk: Review student submissions (PENDING, APPROVED, REJECTED). Includes an AI Pre-Grade Assist Button that calls Groq API to evaluate submissions against rubric guidelines and suggest a score between 0–100.
Broadcast Hub (/admin/notifications): Target notifications to All Users, Active Students, or Inactive Students. Supports custom action links and delivery channels (In-App Bell, System Alert).
6. Complete Database Schema (Drizzle ORM / Postgres)
Save this schema into db/schema.ts for instant database scaffolding:
TypeScript
// db/schema.ts
import { pgTable, serial, text, integer, boolean, timestamp, uuid } from 'drizzle-orm/pg-core';

// 1. Users & Roles (Strict RBAC)
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  fullName: text('full_name').notNull(),
  role: text('role').notNull().default('STUDENT'), // 'STUDENT' | 'ADMIN'
  totalCredits: integer('total_credits').notNull().default(0),
  currentStreak: integer('current_streak').notNull().default(0),
  lastLoginAt: timestamp('last_login_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

// 2. Course Modules (The 90-Day Grid)
export const modules = pgTable('modules', {
  id: serial('id').primaryKey(),
  dayNumber: integer('day_number').notNull().unique(), // 1 to 90
  title: text('title').notNull(),
  phase: integer('phase').notNull(), // 1 (Hustler), 2 (Automation), 3 (Enterprise)
  videoUrl: text('video_url').notNull(),
  contentMarkdown: text('content_markdown').notNull(),
  creditsReward: integer('credits_reward').notNull().default(25),
});

// 3. Student Module Progress (Sequential Gating)
export const userProgress = pgTable('user_progress', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  moduleId: integer('module_id').references(() => modules.id).notNull(),
  isCompleted: boolean('is_completed').notNull().default(false),
  completedAt: timestamp('completed_at'),
});

// 4. Quizzes & Practical Assignments
export const assignments = pgTable('assignments', {
  id: serial('id').primaryKey(),
  moduleId: integer('module_id').references(() => modules.id).notNull(),
  promptText: text('prompt_text').notNull(),
  submissionType: text('submission_type').notNull(), // 'LINK' | 'TEXT' | 'FILE'
  maxCredits: integer('max_credits').notNull().default(50),
});

export const assignmentSubmissions = pgTable('assignment_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  assignmentId: integer('assignment_id').references(() => assignments.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  submissionPayload: text('submission_payload').notNull(),
  aiGradingScore: integer('ai_grading_score'), // 0 - 100
  aiFeedback: text('ai_feedback'),
  status: text('status').notNull().default('PENDING'), // 'PENDING' | 'APPROVED' | 'REJECTED'
});

// 5. Gamification Credit Ledger (Immutable Audit Trail)
export const creditTransactions = pgTable('credit_transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  amount: integer('amount').notNull(), // Positive for earn, Negative for spend
  transactionType: text('transaction_type').notNull(), // 'MODULE_COMPLETION' | 'STORE_PURCHASE' | 'STREAK_BONUS'
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// 6. Digital Storefront Inventory
export const storeItems = pgTable('store_items', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(), // 'DIGITAL_RESELL' | 'SAAS_VOUCHER' | 'FRANCHISE_DISCOUNT'
  costInCredits: integer('cost_in_credits').notNull(),
  downloadUrlOrCode: text('download_url_or_code').notNull(),
  isActive: boolean('is_active').notNull().default(true),
});
7. System Prompt Instruction Block for OpenCode
Copy and provide this exact instruction block to OpenCode or your AI assistant to begin code scaffolding:
Markdown
### SYSTEM INSTRUCTION FOR OPENCODE / AI CODER
You are acting as the Principal Full-Stack Engineer and Security Architect for the Nitai Group. Your task is to build the frontend and backend architecture for the Nitai 90-Day Learn-to-Earn LMS adhering strictly to the specifications detailed in `MASTER_LMS_SPEC.md`.

STRICT IMPLEMENTATION RULES:
1. TECH STACK: Use React 19 + Vite + Tailwind CSS for frontend, Hono for API routes, Drizzle ORM + Neon Postgres for database interactions, and Groq API (`llama-3.3-70b-versatile`) for AI features.
2. RBAC & SECURITY: Never expose admin UI elements or routes (`/admin/*`) unless verified by backend JWT middleware where `role === 'ADMIN'`. Use parameterized queries via Drizzle ORM exclusively.
3. HOMEPAGE: Scaffold `/` strictly as a "Split-Gateway" landing page with two distinct CTA paths (B2C Student vs B2B Enterprise). Do not render logged-in dashboards on public landing pages.
4. STUDENT DASHBOARD: Scaffold `/dashboard/student` featuring a 90-block grid layout (`<ModuleGrid />`). Implement sequential locking where Day N cannot be opened unless Day N-1 exists in `userProgress` as completed.
5. ADMIN PANEL: Scaffold `/admin/modules` with a complete CRUD UI to manage video embeds, markdown content, and quiz/assignment creation.
6. START WITH PHASE 1: Scaffolding the database schema (`db/schema.ts`), API authentication endpoints, and the public Split-Gateway homepage layout.