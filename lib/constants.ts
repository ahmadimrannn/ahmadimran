export type NavigationItem = {
    href: `#${string}`;
    id: string;
    label: string;
};

export type Project = {
    path: string;
    name: string;
    image: string;
    tagline: string;
    featured?: boolean;
    status: string;
    stack: string[];
    githubUrl: string;
    liveUrl: string
};

export interface TechItem {
    name: string;
    iconSlug?: string;
    iconUrl?: string;
    tooltip: string;
}

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
        path: "sentry-loop",
        name: "SentryLoop",
        featured: true,
        tagline: "Autonomous agent that investigates production incidents",
        image: "/projects-pictures/sentryloop.png",
        status: "Live",
        stack: ["LangGraph", "FastAPI", "Postgres + pgvector", "Neon", "Langfuse", "Vercel"],
        liveUrl: "https://sentryloop.vercel.app",
        githubUrl: "https://github.com/ahmadimrannn/sentry-loop",
    },
    {
        path: "cognilead",
        name: "CogniLead",
        tagline: "Qualifies and enriches inbound leads automatically",
        image: "/projects-pictures/cognilead.png",
        status: "Live",
        stack: ["LangGraph", "FastAPI", "HubSpot API", "Tavily", "Postgres", "Vercel"],
        liveUrl: "https://cogni-lead.vercel.app",
        githubUrl: "https://github.com/ahmadimrannn/CogniLead",
    },
    {
        path: "lumen",
        name: "Lumen",
        tagline: "Multi-node LangGraph pipeline for deep research",
        image: "/projects-pictures/lumen.png",
        status: "Live",
        stack: ["LangGraph", "FastAPI", "Postgres", "Railway"],
        liveUrl: "https://lumenai-multi-agent-research-assistant-production.up.railway.app/",
        githubUrl: "https://github.com/ahmadimrannn/LumenAI-Multi-Agent-Research-Assistant",
    },
    {
        path: "captur",
        name: "Captur",
        tagline: "Turns meetings into structured minutes automatically",
        image: "/projects-pictures/captur.png",
        status: "Live",
        stack: ["LangChain", "FastAPI", "Groq", "React / Vite", "Railway", "Vercel"],
        liveUrl: "https://captur-sand.vercel.app",
        githubUrl: "https://github.com/ahmadimrannn/captur",
    },
    {
        path: "ask-my-docs",
        name: "AskMyDocs",
        tagline: "Answers questions directly from your documents",
        image: "/projects-pictures/ask-my-docs.png",
        status: "Live",
        stack: ["FAISS", "HuggingFace embeddings", "Groq", "HuggingFace Spaces"],
        liveUrl: "https://huggingface.co/spaces/ahmadimran/ask-my-docs",
        githubUrl: "https://github.com/ahmadimrannn/langchain_tutorial_with_projects/tree/main/projects/rag_knowledge_base_project",
    },
];

/* ── Tech Stack for Dual Marquee ─────────────────────────────── */
export const techStackRow1: TechItem[] = [
    {
        name: "LangGraph",
        iconSlug: "langchain", // Uses LangChain branding slug
        tooltip: "Stateful multi-actor agent orchestration and cyclic workflows",
    },
    {
        name: "FastAPI",
        iconSlug: "fastapi",
        tooltip: "High-performance async Python backend & SSE streaming endpoints",
    },
    {
        name: "Python",
        iconSlug: "python",
        tooltip: "Primary language for LLM pipelines, tooling, and backend logic",
    },
    {
        name: "Postgres",
        iconSlug: "postgresql",
        tooltip: "Relational persistence for agent sessions, state checkpoints, and logs",
    },
    {
        name: "pgvector",
        iconSlug: "postgresql",
        tooltip: "Vector embeddings and cosine similarity retrieval for long-term agent memory",
    },
    {
        name: "Neon",
        iconUrl: "https://svgl.app/library/neon.svg",
        tooltip: "Serverless Postgres with instant branching for eval testing environments",
    },
];

export const techStackRow2: TechItem[] = [
    {
        name: "Langfuse",
        iconUrl: "https://langfuse.com/icon.svg",
        tooltip: "Production LLM observability, trace spans, and regression evaluations",
    },
    {
        name: "LiveKit",
        iconUrl: "https://livekit.io/favicon.ico",
        tooltip: "WebRTC infrastructure for real-time bidirectional audio & voice agents",
    },
    {
        name: "Groq",
        iconUrl: "https://svgl.app/library/groq.svg",
        tooltip: "Ultra-low-latency LPU inference for fast conversational turns",
    },
    {
        name: "React",
        iconSlug: "react",
        tooltip: "Component-driven UI library for high-speed client interfaces",
    },
    {
        name: "Vite",
        iconSlug: "vite",
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

