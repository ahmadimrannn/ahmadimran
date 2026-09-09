export type NavigationItem = {
  href: `#${string}`;
  id: string;
  label: string;
};

export type Project = {
  bug?: string;
  featured?: boolean;
  name: string;
  problem: string;
  status: "Demo in verification" | "Enterprise case study";
  stack: string[];
};

export type SkillGroup = {
  label: string;
  value: string;
};

export const navigationItems: NavigationItem[] = [
  { href: "#about", id: "about", label: "About" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#now", id: "now", label: "Now" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export const projects: Project[] = [
  {
    name: "SentryLoop",
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
    bug: "query_events originally ran without service or time scoping, pulling in unrelated historical events and once producing a false \"no failures\" conclusion. Every query is now scoped to the service and time window.",
  },
  {
    name: "Lumen / CogniLead",
    status: "Demo in verification",
    problem: "A multi-node LangGraph research pipeline.",
    stack: ["LangGraph", "Postgres", "Railway", "Vercel"],
    bug: "conflict_detector.py silently forwarded malformed LLM output to report_writer even after computing parse_failed. It now records a real conflicts_analysis_failure event instead.",
  },
  {
    name: "Captur",
    status: "Demo in verification", // was "Enterprise case study" — confirm this is real or I'll leave it as the others
    problem:
      "AI meeting intelligence that turns meetings into structured minutes.",
    stack: [
      "LangChain",
      "FastAPI",
      "Groq",
      "React / Vite",
      "Railway",
      "Vercel",
    ],
    bug: "", // fill in a real bug before shipping — no placeholder text
  },
  {
    name: "AskMyDocs",
    status: "Demo in verification",
    problem: "A RAG-based document question-and-answer tool.",
    stack: ["FAISS", "HuggingFace embeddings", "Groq", "HuggingFace Spaces"],
    bug: "", // fill in a real bug before shipping — no placeholder text
  },
];

export const skillGroups: SkillGroup[] = [
  { label: "Agent frameworks", value: "LangGraph, LangChain" },
  { label: "Backend", value: "FastAPI, Python" },
  { label: "Data", value: "Postgres, pgvector, Neon" },
  { label: "Observability / evals", value: "Langfuse" },
  { label: "Voice / real-time", value: "LiveKit" },
  { label: "LLM providers", value: "Groq" },
  { label: "Frontend", value: "React, Vite" },
];
