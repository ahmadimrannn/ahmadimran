/* ── Types ─────────────────────────────────────────────────── */

export type NavigationItem = {
  href: `#${string}`;
  id: string;
  label: string;
};

export type Project = {
  bug?: string;
  cols: number; // bento grid column span (out of 12)
  featured?: boolean;
  name: string;
  problem: string;
  status: string;
  stack: string[];
};

export type SkillGroup = {
  label: string;
  value: string;
};

export type TechItem = {
  name: string;
  tooltip: string;
};

/* ── Navigation ────────────────────────────────────────────── */

export const navigationItems: NavigationItem[] = [
  { href: "#about", id: "about", label: "About" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#now", id: "now", label: "Now" },
  { href: "#stack", id: "stack", label: "Stack" },
  { href: "#contact", id: "contact", label: "Contact" },
];

/* ── Projects ──────────────────────────────────────────────── */

export const projects: Project[] = [
  {
    name: "SentryLoop",
    featured: true,
    cols: 8,
    status: "Verified Live Runtime",
    problem:
      "An autonomous incident-investigation agent that reads real production logs, forms a root-cause hypothesis over a variable number of steps, and drafts a fix proposal gated behind human approval.",
    stack: [
      "LangGraph",
      "FastAPI",
      "Postgres + pgvector",
      "Neon",
      "Langfuse",
      "Vercel",
    ],
    bug: "query_events originally ran without service or time scoping, pulling in unrelated historical events and once producing a false \"no failures\" conclusion. Every query is now scoped to the service and time window.",
  },
  {
    name: "Lumen / CogniLead",
    cols: 4,
    status: "Verified Live Runtime",
    problem: "A multi-node LangGraph research pipeline that gathers, cross-references, and synthesizes competitive intelligence into a single actionable report.",
    stack: ["LangGraph", "Postgres", "Railway", "Vercel"],
    bug: "conflict_detector.py silently forwarded malformed LLM output to report_writer even after computing parse_failed. It now records a real conflicts_analysis_failure event instead.",
  },
  {
    name: "Captur",
    cols: 6,
    status: "Verified Live Runtime",
    problem:
      "AI meeting intelligence that turns meetings into structured minutes with action items, owner tagging, and follow-up scheduling.",
    stack: [
      "LangChain",
      "FastAPI",
      "Groq",
      "React / Vite",
      "Railway",
      "Vercel",
    ],
    bug: "Transcript chunking originally split mid-sentence at fixed byte boundaries, causing the summarizer to hallucinate incomplete action items. Chunks now break on sentence boundaries with 200-token overlap.",
  },
  {
    name: "AskMyDocs",
    cols: 6,
    status: "Verified Live Runtime",
    problem: "A RAG-based document Q&A tool that indexes uploaded PDFs, splits them into semantic chunks, and returns grounded answers with source citations.",
    stack: ["FAISS", "HuggingFace embeddings", "Groq", "HuggingFace Spaces"],
    bug: "The embedding index was rebuilt on every query instead of being cached, adding 8–12 s latency per question. It now persists the FAISS index to disk after the first build.",
  },
];

/* ── Tech Stack (for dual marquee) ─────────────────────────── */

export const techStackRow1: TechItem[] = [
  { name: "LangGraph", tooltip: "Stateful multi-actor agent orchestration" },
  { name: "LangChain", tooltip: "Composable LLM application framework" },
  { name: "FastAPI", tooltip: "High-performance async Python API" },
  { name: "Python", tooltip: "Primary backend language" },
  { name: "Postgres", tooltip: "Relational DB with pgvector" },
  { name: "Neon", tooltip: "Serverless Postgres platform" },
];

export const techStackRow2: TechItem[] = [
  { name: "Langfuse", tooltip: "LLM observability and evals" },
  { name: "LiveKit", tooltip: "Real-time voice and video infra" },
  { name: "Groq", tooltip: "Ultra-low-latency LLM inference" },
  { name: "React", tooltip: "Component-driven UI library" },
  { name: "Next.js", tooltip: "Full-stack React framework" },
  { name: "Vercel", tooltip: "Edge-first deployment platform" },
];

/* ── Skills (legacy compat) ────────────────────────────────── */

export const skillGroups: SkillGroup[] = [
  { label: "Agent frameworks", value: "LangGraph, LangChain" },
  { label: "Backend", value: "FastAPI, Python" },
  { label: "Data", value: "Postgres, pgvector, Neon" },
  { label: "Observability / evals", value: "Langfuse" },
  { label: "Voice / real-time", value: "LiveKit" },
  { label: "LLM providers", value: "Groq" },
  { label: "Frontend", value: "React, Next.js, Vite" },
];
