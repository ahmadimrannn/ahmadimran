# Portfolio Update: Real Project Cards + Dedicated Project Pages

## Overview

Five separate projects exist in this portfolio: **SentryLoop, CogniLead, Lumen, Captur, and AskMyDocs**. Lumen and CogniLead are two different, separately built and deployed projects — do not merge them into one card or one page anywhere in the codebase.

Two things need building:
1. Real, non-mock project cards on the homepage
2. A dedicated detail page per project, linked from each card's "View Project" button

---

## Part 1: Project Card (homepage)

Replace all mock data in the current project card component with the real data below. Each card needs:

- **Project name**
- **One-line description** — 7 words or fewer, already written per project below, do not rewrite these longer
- **Project image** — pulled from `public/projects-pictures/`. Use Next.js `<Image>` with `fill` inside a fixed-aspect-ratio container (`aspect-video` or similar), not a raw `<img>` tag, so layout doesn't shift while images load
- **Button at the bottom of the card**: text "View Project" followed by a right-arrow icon (use `ArrowRight` from `lucide-react`), that navigates to that project's dedicated page

### Real project data

The per-project folders already exist at `app/projects/<folder-name>/`. Use these exact folder names as the `path` field, don't invent your own slug naming:

```typescript
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
```

Each card's "View Project" button links to `/projects/${project.path}` (e.g. `/projects/sentry-loop`, `/projects/cognilead`).

**Before running this**: check the actual filenames inside `public/projects-pictures/` and correct the `image` paths above to match exactly — don't assume the naming convention.

---

## Part 2: Dedicated Project Pages

### Routing

The five project folders already exist as static routes: `app/projects/sentry-loop/`, `app/projects/cognilead/`, `app/projects/lumen/`, `app/projects/captur/`, `app/projects/ask-my-docs/`. Each needs a `page.tsx` inside it. To avoid duplicating the same template five times, build one shared component (e.g. `components/project-page-template.tsx`) that all five `page.tsx` files import and render, each passing in its own entry from the `projects` data array (matched by `path`). Each `page.tsx` file should stay short, just importing the template and the shared data array and rendering the right entry, not duplicating the full page markup five times.

### Page structure (every project page follows this same template)

1. **Back button** — top of the page, before anything else. Text "Back" with a left-arrow icon (`ArrowLeft` from `lucide-react`), links back to the homepage (`/` or `/#projects` to return directly to the projects section). Must be present and functional on every project page.

2. **Header** — project name as the page's main heading, tagline beneath it, stack tags, and the live demo / GitHub links.

3. **Project image** — displayed prominently near the top, same `public/projects-pictures/` source as the card, using Next.js `<Image>` with explicit dimensions or `fill` in an aspect-ratio container.

4. **The Problem** — what was broken or missing, why it mattered.

5. **The Solution** — what was built and why it was built that way, not just a stack list restated as prose.

6. **Tech Stack** — same tags as the card, can be shown again here in more detail (e.g. why each piece was chosen).

7. **A Real Bug, In Detail** — the actual bug, what caused it, how it was found, how it was fixed. This is the most important section on the page, give it real space.

8. **Decisions and Tradeoffs** — real architectural or design decisions made and why, not generic engineering platitudes.

9. **Lessons Learned** — what would be done differently, what you'd approach differently now.

### Real content for SentryLoop, CogniLead, and Lumen

**SentryLoop**
- Problem: On-call engineers manually dig through logs to find root causes when something breaks. SentryLoop investigates independently instead.
- Solution: An autonomous agent that, given an error signal, investigates real production logs and event history from Ahmad's own deployed apps (Lumen and CogniLead), forms and tests a root-cause hypothesis over a variable number of steps (no fixed step count), and drafts a fix proposal gated behind human approval. It never applies a fix itself, propose-only is enforced even at the database level via a CHECK constraint.
- Real bug: `query_events` originally ran with no service or time scoping, which pulled in unrelated historical events and once produced a false "no failures" conclusion. Every query is now scoped to the specific service and time window.
- Decisions: Investigation summaries are rewritten in full each step (capped around 150-200 words) and fully replace the raw evidence log in what gets shown to the model, keeping token growth bounded instead of replaying the full evidence history into every prompt. The manual while-loop investigation logic was later rewritten as a real LangGraph StateGraph specifically to support Postgres checkpointing for pause/resume on the human-approval step.
- Lessons: Several real bugs only surfaced under forced multi-step test runs (8+ and 13+ steps), not short happy-path tests, including a state field that was computed but never actually returned from a step, meaning it silently never persisted.

**CogniLead**
- Problem: Inbound leads need qualification and CRM enrichment, normally a manual, repetitive task for a sales or ops team.
- Solution: A LangGraph agent that extracts and scores lead information, enriches company data via Tavily search, routes leads through a deterministic human-review gate for borderline cases, and writes qualified leads into HubSpot with full dedup logic for both contacts and companies.
- Real bug: Company enrichment once found a same-named but unrelated company and scored it as verified. Fixed by adding `enrichment_status` and `name_match_confidence` fields so a mismatch is flagged instead of silently trusted.
- Decisions: Leads with no stated company name skip company creation entirely rather than fabricating a placeholder company, the contact is still created with a note flagging the missing company name.
- Lessons: A resume bug where `graph.invoke` was called fresh instead of resuming via the existing `thread_id` made the workflow look like it was restarting from scratch on every resume, a reminder that checkpoint resume logic needs its own explicit test, not just its happy path.

**Lumen**
- Problem: Deep research requires cross-checking multiple sources and catching contradictions, which a simple single-pass LLM call doesn't do reliably.
- Solution: A six-node LangGraph pipeline (Query Classifier → Researcher → Source Critic → Evidence Extractor → Conflict Detector → Report Writer) with human-in-the-loop interrupt/resume support.
- Real bug: `conflict_detector.py` was silently forwarding malformed LLM output to `report_writer` even after already computing a `parse_failed` flag that nothing checked, meaning failures went unnoticed while the final report still looked polished. Fixed by logging it as a real `conflicts_analysis_failure` event instead of passing it forward silently.
- Decisions: Persistence was moved from in-memory to a real checkpointer (SQLite, later Postgres) specifically to stop state loss on restart, since Lumen is a long-running multi-step pipeline, not a single request-response call.
- Lessons: The root cause of most extraction failures turned out to be an unset `max_tokens` default causing systematic truncation, not input size as originally assumed, a reminder to check output constraints before assuming the input is the problem.

### Captur and AskMyDocs

Leave the Problem, Solution, Real Bug, Decisions, and Lessons Learned sections present but empty (or with a short "content coming soon" placeholder that's visually honest about being incomplete, not filled with invented content) for these two. Real content will be added later.

---

## Design consistency requirements

- **Headings**: `font-geist` with `tracking-tighter`. Do not use `font-bold` on any heading anywhere on these pages, use the font's regular or medium weight only.
- **Body text**: `font-inter` for everything that isn't a heading.
- Match the same dark theme, color tokens, and spacing system already established on the homepage — the project pages should feel like the same site, not a separate design.
- **Responsiveness**: every element on both the cards and the project pages must work correctly on mobile, tablet, and desktop breakpoints. Test the image aspect ratios, the back button placement, and the stack tag wrapping specifically at narrow widths, these are the most common places responsiveness breaks.

## Deliverable checklist

- [ ] All five project cards show real data, real images, and a working "View Project →" button
- [ ] Dynamic route `app/projects/[slug]/page.tsx` renders the correct project based on slug
- [ ] Every project page has a working back button
- [ ] SentryLoop, CogniLead, and Lumen pages have full real content in every section
- [ ] Captur and AskMyDocs pages exist with the correct structure, sections left empty/placeholder rather than fabricated
- [ ] Headings use Geist with tracking-tighter, no bold weight anywhere
- [ ] Body text uses Inter
- [ ] Fully responsive on mobile, tablet, and desktop
- [ ] Image paths verified against actual filenames in `public/projects-pictures/`