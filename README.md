# Ahmad Imran — Portfolio Website

Personal portfolio site. I'm an AI engineer specializing in Agentic AI, based in Pakistan, currently building toward my first paid remote contractor or freelance engagement. I started in web development, moved through cloud computing, and shifted into agentic AI after a mentor pointed to it as the next real shift in the field, not just another framework to learn. My focus is on genuine dynamic agents, systems where an LLM decides what to do at runtime instead of following a fixed pipeline, built with real guardrails, evals, human-approval steps, and persistent memory. This site is a one-page overview of who I am and what I've built, with a dedicated detail page for each real, deployed project.

**Live site:** <a href="https://ahmadimran.vercel.app" target="_blank" >https://ahmadimran.vercel.app/</a>

---

## What this is

This isn't a template portfolio. Every project shown here is something I actually built and deployed, and every "bug" or "decision" written on a project page is a real one, traced from actual commit history and project logs, not filled in to look complete. If a section on a project page says content is coming soon, that means I genuinely haven't documented it yet, not that I skipped writing it.

## Sections

- **Hero** — who I am, what I do
- **About** — how I got into computer science and how I got into agentic AI specifically
- **Projects** — five real, deployed projects, each with a card linking to a full detail page
- **How I Architect** — six real architectural decisions pulled from actual projects, meant to show how I think, not a generic process diagram
- **Now** — what I'm currently building
- **Tech Stack** — the tools and frameworks I actually work with
- **Contact** — email, GitHub, LinkedIn

## Projects featured

| Project | What it does | Stack |
|---|---|---|
| [SentryLoop](https://sentryloop.vercel.app) | Autonomous agent that investigates production incidents and drafts fix proposals | LangGraph, FastAPI, Postgres + pgvector, Neon, Langfuse |
| [CogniLead](https://cogni-lead.vercel.app) | Qualifies inbound leads and enriches CRM records automatically | LangGraph, FastAPI, HubSpot API, Tavily, Postgres |
| [Lumen](https://lumenai-multi-agent-research-assistant-production.up.railway.app/) | Multi-node LangGraph pipeline for deep research with source cross-checking | LangGraph, FastAPI, Postgres |
| [Captur](https://captur-sand.vercel.app) | Turns raw meeting recordings into structured minutes | LangChain, FastAPI, Groq, React/Vite |
| [AskMyDocs](https://huggingface.co/spaces/ahmadimran/ask-my-docs) | RAG-based Q&A directly against uploaded documents | FAISS, HuggingFace embeddings, Groq |

Each project card on the homepage links to a full detail page (`/projects/<project-name>`) covering the problem it solves, the approach taken, a real bug encountered and how it was fixed, architectural decisions and tradeoffs, and lessons learned.

## Tech stack (this site)

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui as the base layer, with select components adapted from Magic UI, Aceternity UI, and 21st.dev
- **Fonts:** Geist (headings, `tracking-tighter`, no bold weight) and Inter (body text)
- **Motion:** Framer Motion, Lenis for smooth scroll
- **Deployment:** Vercel

## Design system

- **Theme:** Light and dark mode, toggled and persisted client-side. Light is the default theme.
- **Dark mode colors:** background `#000000`, surface `#0D0D0D`, primary text `#F5F5F5`, secondary text `#A0A0A0`, accent `#3DDC84`
- **Light mode colors:** background `#FAFAF8`, surface `#FFFFFF`, primary text `#0A0A0A`, secondary text `#5A5A5A`, accent `#2CB86E`
- **Accent color usage:** deliberately restrained, used only for the hero gradient, primary CTA buttons, and active/hover link states, not applied as a decorative wash anywhere else on the site

## Project structure

```
app/
  page.tsx                  # Homepage: Hero, About, Projects, How I Architect, Now, Skills, Contact
  layout.tsx
  projects/
    sentry-loop/page.tsx
    cognilead/page.tsx
    lumen/page.tsx
    captur/page.tsx
    ask-my-docs/page.tsx
components/
  ui/                        # shadcn / Magic UI / Aceternity components, restyled to match this site's tokens
  features/                  # Section-level components (hero, about, projects grid, process, etc.)
  shared/                    # Shared components (project page template, theme toggle, back button)
lib/
  constants.ts                # Project data, nav items, stack details
public/
  projects-pictures/          # Project screenshots used on cards and detail pages
```

## Getting started

```bash
# install dependencies
npm install

# run the dev server
npm run dev

# build for production
npm run build
```

The site runs locally at `http://localhost:3000`.

## Deployment

Deployed on Vercel. Pushing to the main branch triggers a new deployment automatically.

## Contact

- Email: ahmadimran67208@gmail.com
- GitHub: [github.com/ahmadimrannn](https://github.com/ahmadimrannn)
- LinkedIn: [https://www.linkedin.com/in/ahmadimrannn/]
