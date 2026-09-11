export type NavigationItem = {
  href: `#${string}`;
  id: string;
  label: string;
};

export type Project = {
  name: string;
  cols: number; // grid col span out of 12 (8, 4, 6, 6)
  featured?: boolean;
  status: string;
  problem: string;
  stack: string[];
  bug: string;
};

export type TechItem = {
  name: string;
  iconName: string;
  tooltip: string;
};

/* ── Navigation Items ────────────────────────────────────────── */
export const navigationItems: NavigationItem[] = [
  { href: "#about", id: "about", label: "About" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#now", id: "now", label: "Now" },
  { href: "#stack", id: "stack", label: "Stack" },
  { href: "#contact", id: "contact", label: "Contact" },
];

/* ── Asymmetric Bento Projects ───────────────────────────────── */
export const projects: Project[] = [
  {
    name: "SentryLoop",
    cols: 8,
    featured: true,
    status: "Demo in verification",
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
    bug: 'query_events originally ran without service or time scoping, pulling in unrelated historical events and once producing a false "no failures" conclusion. Every query is now scoped to the service and time window.',
  },
  {
    name: "Lumen / CogniLead",
    cols: 4,
    status: "Demo in verification",
    problem:
      "A multi-node LangGraph research pipeline that gathers, cross-references, and synthesizes competitive intelligence into a single actionable report.",
    stack: ["LangGraph", "Postgres", "Railway", "Vercel"],
    bug: "conflict_detector.py silently forwarded malformed LLM output to report_writer even after computing parse_failed. It now records a real conflicts_analysis_failure event instead.",
  },
  {
    name: "Captur",
    cols: 6,
    status: "Demo in verification",
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
    status: "Demo in verification",
    problem:
      "A RAG-based document Q&A tool that indexes uploaded PDFs, splits them into semantic chunks, and returns grounded answers with source citations.",
    stack: ["FAISS", "HuggingFace embeddings", "Groq", "HuggingFace Spaces"],
    bug: "The embedding index was rebuilt on every query instead of being cached, adding 8–12 s latency per question. It now persists the FAISS index to disk after the first build.",
  },
];

/* ── Tech Stack for Dual Marquee ─────────────────────────────── */
export const techStackRow1: TechItem[] = [
  {
    name: "LangGraph",
    iconName: "langgraph",
    tooltip: "Stateful multi-actor agent orchestration and cyclic workflows",
  },
  {
    name: "FastAPI",
    iconName: "fastapi",
    tooltip: "High-performance async Python backend & SSE streaming endpoints",
  },
  {
    name: "Python",
    iconName: "python",
    tooltip: "Primary language for LLM pipelines, tooling, and backend logic",
  },
  {
    name: "Postgres",
    iconName: "postgres",
    tooltip: "Relational persistence for agent sessions, state checkpoints, and logs",
  },
  {
    name: "pgvector",
    iconName: "pgvector",
    tooltip: "Vector embeddings and cosine similarity retrieval for long-term agent memory",
  },
  {
    name: "Neon",
    iconName: "neon",
    tooltip: "Serverless Postgres with instant branching for eval testing environments",
  },
];

export const techStackRow2: TechItem[] = [
  {
    name: "Langfuse",
    iconName: "langfuse",
    tooltip: "Production LLM observability, trace spans, and regression evaluations",
  },
  {
    name: "LiveKit",
    iconName: "livekit",
    tooltip: "WebRTC infrastructure for real-time bidirectional audio & voice agents",
  },
  {
    name: "Groq",
    iconName: "groq",
    tooltip: "Ultra-low-latency LPU inference for fast conversational turns",
  },
  {
    name: "React",
    iconName: "react",
    tooltip: "Component-driven UI library for high-speed client interfaces",
  },
  {
    name: "Vite",
    iconName: "vite",
    tooltip: "Blazing fast frontend build tooling and local development",
  },
];

export type SkillGroup = {
  label: string;
  value: string;
};

export const skillGroups: SkillGroup[] = [
  { label: "Agent frameworks", value: "LangGraph, LangChain" },
  { label: "Backend", value: "FastAPI, Python" },
  { label: "Data", value: "Postgres, pgvector, Neon" },
  { label: "Observability / evals", value: "Langfuse" },
  { label: "Voice / real-time", value: "LiveKit" },
  { label: "LLM providers", value: "Groq" },
  { label: "Frontend", value: "React, Next.js, Vite" },
];

