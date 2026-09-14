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

export interface StepItem {
    number: string;
    title: string;
    body: string;
}

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
    { href: "#how-i-architect", id: "how-i-architect", label: "How I Architect" },
    { href: "#now", id: "now", label: "Now" },
    { href: "#stack", id: "stack", label: "Stack" },
    { href: "#contact", id: "contact", label: "Contact" },
];

/* ── Asymmetric Bento Projects ───────────────────────────────── */
export const projects: Project[] = [
    {
        path: "sentry-loop",
        name: "SentryLoop — Autonomous Incident Investigation Agent",
        featured: true,
        tagline: "An autonomous agent that investigates production incidents and drafts fix proposals",
        image: "/projects-pictures/sentryloop.png",
        status: "Live",
        stack: ["LangGraph", "FastAPI", "Postgres + pgvector", "Neon", "Langfuse", "Vercel"],
        liveUrl: "https://sentryloop.vercel.app",
        githubUrl: "https://github.com/ahmadimrannn/sentry-loop",
    },
    {
        path: "cognilead",
        name: "CogniLead — Inbound Lead Qualification & CRM Enrichment Agent",
        tagline: "Qualifies inbound leads and enriches CRM records automatically, without manual review",
        image: "/projects-pictures/cognilead.png",
        status: "Live",
        stack: ["LangGraph", "FastAPI", "HubSpot API", "Tavily", "Postgres", "Vercel"],
        liveUrl: "https://cogni-lead.vercel.app",
        githubUrl: "https://github.com/ahmadimrannn/CogniLead",
    },
    {
        path: "lumen",
        name: "Lumen — Multi-Node Research Agent",
        tagline: "A multi-node LangGraph pipeline that researches, cross-checks sources, and writes reports",
        image: "/projects-pictures/lumen.png",
        status: "Live",
        stack: ["LangGraph", "FastAPI", "Postgres", "Railway"],
        liveUrl: "https://lumenai-multi-agent-research-assistant-production.up.railway.app/",
        githubUrl: "https://github.com/ahmadimrannn/LumenAI-Multi-Agent-Research-Assistant",
    },
    {
        path: "captur",
        name: "Captur — AI Meeting Transcriptor Tool",
        tagline: "Turns raw meeting recordings into structured, organized minutes automatically",
        image: "/projects-pictures/captur.png",
        status: "Live",
        stack: ["LangChain", "FastAPI", "Groq", "React / Vite", "Railway", "Vercel"],
        liveUrl: "https://captur-sand.vercel.app",
        githubUrl: "https://github.com/ahmadimrannn/captur",
    },
    {
        path: "ask-my-docs",
        name: "AskMyDocs — RAG Q/A System",
        tagline: "Answers questions directly from your documents using retrieval-augmented generation",
        image: "/projects-pictures/ask-my-docs.png",
        status: "Live",
        stack: ["FAISS", "HuggingFace embeddings", "Groq", "HuggingFace Spaces"],
        liveUrl: "https://huggingface.co/spaces/ahmadimran/ask-my-docs",
        githubUrl: "https://github.com/ahmadimrannn/langchain_tutorial_with_projects/tree/main/projects/rag_knowledge_base_project",
    },
];

export const steps: StepItem[] = [
    {
        number: "01",
        title: "Diagnose",
        body: "Find the actual failure mode before touching code. On Lumen, extraction failures looked like an input-size problem, but the real cause was an unset max_tokens default silently truncating output.",
    },
    {
        number: "02",
        title: "Build the rough loop",
        body: "Get the smallest version running end to end first. Lumen started as a two-node skeleton deployed from a blank repo, SentryLoop's investigation logic started as a plain while-loop before becoming a LangGraph StateGraph, once I knew what actually needed to survive.",
    },
    {
        number: "03",
        title: "Guard the boundaries",
        body: "Every autonomous action gets a hard limit, enforced at more than one layer. SentryLoop's propose-only rule lives in a database constraint, not just a prompt. CogniLead's human-review gate is fully deterministic, never left to the model's judgment.",
    },
    {
        number: "04",
        title: "Engineer the context",
        body: "What the model sees matters more than how much. SentryLoop rewrites a bounded summary each step instead of replaying a growing log. Lumen fixed a hardcoded thread ID that was silently mixing state between unrelated runs.",
    },
    {
        number: "05",
        title: "Design for failure, not just success",
        body: "Every path has to end somewhere defined, never a silent crash. CogniLead's write-back checks exactly which step succeeded before retrying, so a failed run resumes correctly instead of duplicating work or restarting from zero.",
    },
    {
        number: "06",
        title: "Validate against reality",
        body: "Test against real, already-documented bugs, not invented ones. SentryLoop's evals ran on real bugs already logged in Lumen's history, so a correct diagnosis is a real signal, not a convenient one.",
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

