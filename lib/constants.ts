export type NavigationItem = {
    href: `#${string}`;
    id: string;
    label: string;
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

export interface Project {
    path: string;
    name: string;
    featured?: boolean;
    tagline: string;
    image: string;
    status: string;
    stack: string[];
    liveUrl: string;
    githubUrl: string;
    problem?: string;
    solution?: string;
    bug?: string;
    decisions?: string;
    lessons?: string;
}

export const navigationItems: NavigationItem[] = [
    { href: "#about", id: "about", label: "About" },
    { href: "#projects", id: "projects", label: "Projects" },
    { href: "#how-i-architect", id: "how-i-architect", label: "How I Architect" },
    { href: "#now", id: "now", label: "Now" },
    { href: "#stack", id: "stack", label: "Stack" },
    { href: "#contact", id: "contact", label: "Contact" },
];


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
        problem: "When something breaks in production, an on-call engineer usually starts by manually digging through logs, forming a guess, checking it, and repeating until they find the actual cause. That process is slow, repetitive, and depends entirely on the engineer's own memory of how the system behaves. SentryLoop exists to do that first investigative pass independently, using real production data instead of a human's recollection of it, and to hand off a reasoned, evidence-backed proposal rather than a guess.",
        solution: "SentryLoop is an autonomous agent that, given an error or anomaly signal from Ahmad's own deployed systems (Lumen and CogniLead), investigates the real event history behind it. It was built in eight phases: log instrumentation across both source apps, a four-tool investigation harness (query_events, query_metrics, check_service_status, propose_fix), the core investigation loop itself, context engineering to keep the running hypothesis bounded, a guardrails and human-approval gate, persistent memory of past incidents via pgvector, an eval suite built on real documented bugs, and finally a live demo UI. At every step, the agent picks a tool, reads the real result, and updates a running hypothesis, deciding for itself whether it has enough evidence to conclude or needs to keep investigating. It never modifies, restarts, or deploys anything, its only output is a fix proposal that sits behind human approval. That propose-only boundary is enforced not just by the agent's instructions but by a database-level CHECK constraint, so even a reasoning failure can't push anything further than a draft.",
        bug: "In an early version, the query_events tool ran without any service or time scoping, meaning a single investigation could pull in unrelated historical events from completely different time windows and services. On one real run, this caused the agent to conclude 'no failures found' when a real failure existed, because the relevant recent events were buried in a flood of irrelevant older ones. The fix was to scope every query explicitly to the specific service and time window under investigation. This wasn't caught by a short happy-path test, it only surfaced once the agent was run against a longer, more realistic incident history, which is part of why SentryLoop's own eval suite is built on real historical bugs rather than synthetic test cases.",
        decisions: "A few decisions mattered more than the obvious architecture choices. First, instead of replaying the full evidence log into every prompt (which scales roughly quadratically with step count), SentryLoop rewrites a single bounded investigation summary each step, capped around 150–200 words, and that summary is what future steps actually see, the raw evidence log is kept only as an internal audit trail. Second, the agent doesn't self-report its own progress unchecked, severity and route choices are forced against real known values pulled live from the database rather than trusted from the model's free-text output, which closed two separate cases of the model claiming an unexplored lead that didn't actually exist. Third, the investigation loop stops using three layered conditions checked in order, a hard step cap as a safety net, an LLM-based confidence check that can stop early even with untried routes left if the evidence already supports a conclusion, and a no-new-information check as a last resort, rather than relying on any single stopping signal.",
        lessons: "The most instructive bug wasn't in the agent's reasoning at all, it was in state management. During the conversion from a manual while-loop to a real LangGraph StateGraph, a routing function was mutating state directly instead of returning a proper state update. LangGraph's conditional edges are read-only by contract and aren't checkpointed, so that mutation was silently lost every time the graph paused and resumed for human approval, meaning a field that looked correctly set during a live run would come back empty after resume. It took tracing the actual checkpoint behavior, not just re-reading the code, to find it. The fix was converting that routing function into a real node that returns an explicit update. The broader lesson: with a framework that has strong opinions about state and checkpointing, bugs can hide in the contract between components, not just inside any single function, and the only way to catch them is testing across the exact pause/resume boundary the system will actually hit in production.",
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
        problem: "Every inbound lead needs the same repetitive work before it's usable: figuring out whether the person has real buying authority, verifying the company they claim to represent actually exists and matches what they said, and getting all of that written cleanly into a CRM. Done manually, this is slow and inconsistent, and mistakes (like trusting an unverified company match) can quietly pollute CRM data in ways that are hard to catch later.",
        solution: "CogniLead is a LangGraph agent that takes a raw inbound lead and runs it through extraction and scoring nodes that infer role and authority even when it's only implied, not stated outright. A CompanyEnrichmentNode then verifies the company using Tavily search combined with LLM synthesis. From there, a fully deterministic (non-LLM) human-review gate routes each lead to auto-accept, auto-reject, or human review based on score and enrichment confidence thresholds, so the decision of when a human needs to step in isn't itself something the model can talk its way around. Accepted leads go through a CRM write-back node that deduplicates both contacts and companies by search, creates or updates records accordingly, links them through HubSpot's associations API, and writes a note with the score and reasoning attached. The write order is deliberately sequenced, company, then contact, then association, then note, and a dedicated retry node checks exactly which step already succeeded before retrying, so a failed write resumes from the next incomplete step instead of duplicating work.",
        bug: "During enrichment testing, the agent once found a company with the same name as the one the lead actually worked for, but it was an entirely unrelated business, and scored it as a verified match. Nothing in the original design distinguished 'a company with this name exists' from 'this is actually the right company.' The fix was adding two new fields, enrichment_status and name_match_confidence, so a mismatch gets flagged explicitly in the CRM note rather than silently trusted as verified. This mattered because a wrong company match wouldn't just be a bad data point, it would look correct in HubSpot and could mislead a real sales rep working the lead later.",
        decisions: "When a lead comes in with no stated company name, CogniLead skips company creation entirely rather than fabricating a placeholder company record, the contact is still created, with a note explicitly flagging that no company was stated in the original submission. This was chosen over two other options, requiring a company name at ingestion (which would reject real leads) or inventing a placeholder name (which would quietly pollute the CRM with fake companies). On the reliability side, the retry logic has a hard ceiling with backoff, after the maximum attempts it marks a write as failed_permanent instead of looping forever against a write that's genuinely broken, which matters because an infinite retry against a bad write is its own kind of production incident.",
        lessons: "A resume bug taught a lesson about testing assumptions, not just code paths. The resume logic was calling graph.invoke fresh on every call instead of resuming through the existing thread_id, which generated a brand new thread each time and made a perfectly working workflow look like it was restarting from the top on every single resume. It looked like a state-loss bug at first glance, but the actual state was fine, the resume call itself was just never using it. The fix was small, but finding it required specifically testing the resume path in isolation rather than assuming that because the initial run worked, resume would work the same way. Since then, every checkpoint-dependent feature in later projects gets a dedicated resume test, not just a pass on the first-run happy path.",
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
        problem: "A single-pass LLM call asked to research a topic will happily produce a confident-sounding answer even when its sources disagree with each other or don't actually support the claim being made. Real research requires deliberately checking sources against each other and surfacing contradictions instead of smoothing over them, which a one-shot prompt structurally can't do.",
        solution: "Lumen is a six-node LangGraph pipeline, Query Classifier, Researcher, Source Critic, Evidence Extractor, Conflict Detector, and Report Writer, with each stage responsible for one part of the research process rather than one model call trying to do everything at once. The Evidence Extractor processes sources in chunks of five to stay within Groq's rate limits. The pipeline supports human-in-the-loop interrupt and resume using LangGraph's native interrupt() and Command(resume=...) primitives, and a FastAPI layer exposes /research and /research/resume endpoints so a paused pipeline can be picked back up cleanly rather than restarted from scratch. State persistence moved from SQLite to a real Postgres-backed checkpointer to survive restarts without losing an in-progress research run.",
        bug: "The Conflict Detector node had a quiet failure mode: it was designed to compute a parse_failed flag when it received malformed output from an earlier LLM call, but nothing downstream actually checked that flag before forwarding the result to the Report Writer. The final report would still come out looking polished and confident, with no visible sign that the underlying conflict analysis had actually failed. This is a genuinely dangerous class of bug, not a crash, but a silent quality failure that produces a plausible-looking wrong answer. The fix was to log it explicitly as a conflicts_analysis_failure event instead of letting it pass through unflagged, turning an invisible failure into a visible, queryable one.",
        decisions: "Two decisions shaped the pipeline's reliability more than anything else. Moving persistence from in-memory to a real checkpointer was necessary specifically because Lumen is a long-running, multi-step process, not a single request-response call, an in-memory approach meant any restart lost all in-progress research state. Separately, the entire class of extraction failures the pipeline was hitting turned out to trace back to one unset default, max_tokens had no explicit ceiling, which caused systematic output truncation. The initial assumption was that input size was the problem, since that's the more intuitive failure mode for a research pipeline processing many sources, but the real constraint was on the output side. Setting an explicit token ceiling (8192) resolved the majority of extraction failures in one change.",
        lessons: "The max_tokens root cause is the clearest lesson from this project: when a system is failing on complex, information-heavy tasks, the instinct is to assume the input is overwhelming the model. Here, that assumption was wrong, and chasing it first would have meant restructuring how sources were chunked and fed in, solving the wrong problem entirely. The actual fix was a single default value. Since then, checking output-side constraints (token ceilings, truncation, format limits) is a standard early step before assuming an input-side redesign is needed, because it's a cheaper hypothesis to rule out first and it was the actual cause here.",
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
        problem: "Writing up meeting notes by hand after a call is slow and easy to skip, and skipped notes mean decisions and action items get lost. Most teams either don't do it consistently or spend real time doing it manually.",
        solution: "Captur takes a raw meeting transcript and processes it through a LangChain map-reduce pipeline to produce structured, organized minutes automatically, turning an unstructured recording into something a team can actually read and act on without anyone having to write it by hand.",
        bug: "Captur's frontend is a single-page app deployed on Vercel. Refreshing the page on any route other than the homepage, or sharing a direct link to a sub-route, returned a 404, because Vercel had no rewrite rule telling it every path should be served by the same file and handled client-side by the router. The first fix attempted, rewriting all paths directly to /index.html, didn't resolve it, refreshing on a sub-route still returned a 404. Changing the rewrite destination to / instead of /index.html fixed it, letting Vercel resolve the root path correctly before the SPA router took over client-side.",
        decisions: "",
        lessons: "",
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
        problem: "Finding a specific answer inside a long document usually means manually searching or reading through it, which doesn't scale once you're dealing with more than one document or a document you don't already know well.",
        solution: "AskMyDocs lets you upload documents and ask questions directly against their content. It embeds the document text with HuggingFace embeddings, indexes it with FAISS for retrieval, and uses Groq to generate an answer grounded in the specific chunks retrieved, rather than the model answering from general knowledge alone.",
        bug: "",
        decisions: "T",
        lessons: "",
    },
];

export const getProjectByPath = (path: string): Project | undefined => {
    return projects.find((p) => p.path === path);
};

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

