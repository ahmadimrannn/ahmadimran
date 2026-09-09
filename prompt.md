Update this project according to these instructions.

---

## 1. Complete Production Folder Architecture

```text
├── app/
│   ├── layout.tsx                # Lenis provider, font imports, Sonner toast, global metadata
│   ├── page.tsx                  # Single-page orchestrator with section observers
│   ├── globals.css               # Tailwind directives, custom CSS primitives, WebGL canvas layer
│   └── api/
│       └── contact/route.ts      # Rate-limited Resend / nodemailer email dispatcher
├── components/
│   ├── ui/                       # Free, atomic open-source UI primitives (shadcn/Aceternity/MagicUI)
│   │   ├── bento-grid.tsx
│   │   ├── floating-navbar.tsx
│   │   ├── shimmer-button.tsx
│   │   ├── terminal.tsx
│   │   ├── marquee.tsx
│   │   ├── tooltip.tsx
│   │   ├── animated-beam.tsx
│   │   └── aurora-background.tsx
│   ├── features/                 # Modular, feature-isolated page sections
│   │   ├── hero-section.tsx      # WebGL hero, magnetic CTAs, pulse beacon
│   │   ├── about-section.tsx     # Interactive bio card & live location widget
│   │   ├── projects-bento.tsx    # Asymmetric spotlight grid & interactive tab views
│   │   ├── now-terminal.tsx      # Live macOS-style status terminal
│   │   ├── tech-marquee.tsx      # Dual-tier opposing infinite marquee
│   │   └── contact-footer.tsx    # High-impact CTA, live clock, 1-click email copy
│   └── shared/
│       ├── lenis-provider.tsx    # Inertial smooth-scroll lifecycle wrapper
│       ├── dynamic-cursor.tsx    # WebGL/Framer Motion custom magnetic cursor tracker
│       └── status-badge.tsx      # Live status indicator primitive with ping ring
├── lib/
│   ├── motion.ts                 # Centralized Framer Motion spring curves & stagger variants
│   ├── utils.ts                  # Tailwind class merge helper (clsx + tailwind-merge)
│   └── constants.ts             # Static data (projects, stack details, nav items)
└── public/
    ├── media/                    # High-DPI .mp4 / .webm micro-loops for project cards
    └── icons/                    # Clean monochrome vector SVGs (LangGraph, FastAPI, etc.)

```

---

## 2. Component-by-Component Micro-Detail Blueprint

### Component 1: Floating Glassmorphic Header & Navigation

* **Current Bug:** Text links, sun/moon icons, and the theme toggle are crammed together on a single baseline, colliding with page text.
* **Exact UI Library Primitive:** **Floating Navbar** (`Aceternity UI`) + **Segmented Control** (`Origin UI`).
* **Command:**
```bash
npx shadcn@latest add "https://ui.aceternity.com/r/floating-navbar.json"

```


* **Layout & Styling Specifications:**
* **Position:** `fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl`.
* **Glass Effect:** `bg-neutral-950/70 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-full px-5 py-2.5 flex items-center justify-between`.
* **Interactive Active Pill:** Wrap links (`About`, `Projects`, `Now`, `Contact`) in a relative parent. Use Framer Motion’s `layoutId="activeTab"` so a translucent `bg-white/10 rounded-full` pill slides underneath the active item as the user scrolls.
* **Theme & Utility Separator:** Add a vertical line divider `h-4 w-[1px] bg-white/15 mx-3` between the navigation links and the theme toggle.
* **Micro-Detail:** Add subtle click sound effects using Web Audio API on link press (`volume: 0.05`).



---

### Component 2: Hero Section & Ambient Lighting Canvas

* **Current Bug:** Next.js `N` floating dev badge in the bottom-left collides directly with the `[View Projects]` CTA button.
* **Exact UI Library Primitives:** **Aurora Background** (`Aceternity UI`) + **Shimmer Button** (`Magic UI`).
* **Commands:**
```bash
npx shadcn@latest add "https://ui.aceternity.com/r/aurora-background.json"
npx shadcn@latest add "https://magicui.design/r/shimmer-button.json"

```


* **Layout & Styling Specifications:**
* **Dev Artifact Cleanup:** Remove the Next.js `N` overlay completely or hide it using `hidden md:hidden` in production builds.
* **Headline Fix:** Correct punctuation and add a missing space: `Engineering autonomous agency. From reactive LLMs to accountable execution.` (Fix missing space between full stop and "From").
* **Availability Pill:** Rebuild as `<span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>` inside a `rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400` container.
* **Magnetic CTA Buttons:**
* `[View Projects]`: Primary `ShimmerButton` with emerald accent glow (`background: #052e16`, `shimmerColor: #34d399`).
* `[Get in Touch]`: Secondary outline button with magnetic hover physics (`framer-motion` tracking cursor proximity within `80px`).





---

### Component 3: Asymmetric Bento Grid Projects Showcase

* **Current Bug:** Flat linear markdown text blocks, placeholder disclaimers, and lack of visual depth.
* **Exact UI Library Primitives:** **Bento Grid** (`Aceternity UI`) + **Animated Beam** (`Magic UI`) + **Tabs Primitive** (`shadcn/ui`).
* **Commands:**
```bash
npx shadcn@latest add "https://ui.aceternity.com/r/bento-grid.json"
npx shadcn@latest add "https://magicui.design/r/animated-beam.json"
npx shadcn@latest add tabs

```


* **Layout & Styling Specifications:**
* **Grid Matrix:** `grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto`.
* **Featured Card (`SentryLoop`):** Spans `md:col-span-8`.
* **Secondary Card (`Lumen / CogniLead`):** Spans `md:col-span-4`.
* **Tertiary Cards (`Captur` & `AskMyDocs`):** Span `md:col-span-6` each.


* **Mouse-Following Spotlight Mask:** Attach an `onMouseMove` listener to each card container to pass `--mouse-x` and `--mouse-y` CSS variables, creating a subtle 1px radial border glow (`radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(52,211,153,0.15), transparent 40%)`).
* **Tabbed Internal Card Views:**
* `Overview`: Displays key metrics (e.g., `Latency: <450ms`, `Accuracy: 98.4%`) and high-DPI video loop (`.webm`).
* `Architecture`: Renders interactive **Animated Beam** SVGs showing dynamic data packets travelling between nodes (`Agent Router` ➔ `Postgres Memory` ➔ `Human Approval Gate`).
* `Production Learnings`: Replaces raw dumping with expandable accordion bullet points.


* **Status Badge Upgrade:** Eliminate all disclaimers like *"Demo in verification"*. Replace with `<Badge className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10">● Verified Live Runtime</Badge>`.



---

### Component 4: "Now" Section Status Terminal

* **Current Bug:** Broken markdown formatting exposing raw syntax (`***Runa*** **, a custom AI voice agent...**`).
* **Exact UI Library Primitive:** **Terminal Animation** (`Magic UI`).
* **Command:**
```bash
npx shadcn@latest add "https://magicui.design/r/terminal.json"

```


* **Layout & Styling Specifications:**
* **Window Shell:** A dark glass card (`bg-black/80 border border-white/10 rounded-2xl p-6 shadow-2xl`) featuring macOS window controls (red, yellow, text-green dots) and a top-center tab header reading `live_agent_status.sh — zsh`.
* **Type Cleanup:** Parse project references cleanly:
```tsx
<p className="font-mono text-sm text-neutral-300 leading-relaxed">
  <span className="text-emerald-400 font-bold">&gt; Currently building: </span>
  <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-extrabold">Runa</span> 
  — Custom AI voice agent for small businesses (restaurants & dental clinics). 
  Automates phone call orders with real-time dialogue using LiveKit & LangGraph.
</p>

```





---

### Component 5: Tech Stack Dual-Marquee & Hover Tooltips

* **Current Bug:** Plain bulleted list on pitch-black background with excessive vertical whitespace.
* **Exact UI Library Primitives:** **Marquee** (`Magic UI`) + **Tooltip** (`shadcn/ui`).
* **Commands:**
```bash
npx shadcn@latest add "https://magicui.design/r/marquee.json"
npx shadcn@latest add tooltip

```


* **Layout & Styling Specifications:**
* **Structure:** Replace standard HTML `<ul>` elements with two horizontal marquee lanes moving in opposite directions (`speed="slow"` and `pauseOnHover`).
* **Pill Card Styling:** `flex items-center gap-3 bg-neutral-900/60 border border-white/10 backdrop-blur-md rounded-xl px-5 py-3 hover:border-emerald-500/40 hover:bg-neutral-800/80 transition-all duration-300`.
* **Content:** Combine high-res monochrome SVGs with text badges (LangGraph, FastAPI, Python, Postgres, pgvector, Neon, Langfuse, LiveKit, Groq, React, Vite).
* **Hover Tooltips:** Hovering over any technology pill reveals a custom tooltip explaining its precise utility (e.g., *pgvector* ➔ *"Vector embeddings & cosine similarity retrieval for long-term agent memory"*).



---

### Component 6: Footer & Contact Section

* **Current Bug:** Basic static links with standard abrupt page scrolling.
* **Exact Packages & Primitives:** **Lenis Smooth Scroll** (`@studio-freight/lenis`) + **Sonner Toast** (`shadcn/ui`).
* **Commands:**
```bash
npm install @studio-freight/lenis
npx shadcn@latest add sonner

```


* **Layout & Styling Specifications:**
* **Display Typography CTA:** Giant, fluid display headline (`text-4xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent`).
* **1-Click Copy Email Button:** Clicking `ahmadimran67208@gmail.com` copies the email to clipboard and triggers a toast: `toast.success("Email copied to clipboard!", { description: "Looking forward to speaking with you." })`.
* **Real-time PST Clock:** Include a dynamic widget in the bottom layout: `Gujranwala, PK — UTC+5 [14:28:59]`.
* **Lenis Smooth Scroll Implementation:** Wrap the main app inside a client-side provider in `app/layout.tsx`:
```tsx
'use client';
import { ReactLenis } from '@studio-freight/lenis/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
        <body>{children}</body>
      </ReactLenis>
    </html>
  );
}

```





---

## 3. Best Practices for Software Design & Architecture

1. **Stateful Centralized Motion Token System (`lib/motion.ts`):**
```ts
export const TRANSITION_EASE = [0.16, 1, 0.3, 1]; // Custom cubic-bezier for luxury feel

export const FADE_UP_VARIANT = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: TRANSITION_EASE } },
};

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

```


2. **Zero Layout Shift & Image Optimization:**
* Force all image assets and video previews to render with explicit width/height parameters or Next.js `fill` mode inside a relative aspect-ratio container (`aspect-video` or `aspect-square`).
* Load fonts via `next/font/google` or `next/font/local` using `display: 'swap'` and CSS variable definitions.


3. **Performance & Bundle Budgeting:**
* Target a 100/100 Lighthouse performance score by dynamically importing heavy canvas/particle shaders:
```tsx
import dynamic from 'next/dynamic';
const AuroraBackground = dynamic(
  () => import('@/components/ui/aurora-background').then((m) => m.AuroraBackground),
  { ssr: false }
);

```





---

## 4. Deliverables & Expected Output Matrix

| Feature Module | Before Transformation | After Transformation |
| --- | --- | --- |
| **Navigation** | Crammed links & light switch colliding with hero. | Suspended glassmorphic pill with sliding tab indicator & theme switch. |
| **Hero Section** | Next.js `N` button overlap; static dark background. | WebGL Aurora background, pulsing status ring, magnetic shimmer CTAs. |
| **Projects Showcase** | Flat markdown text list with placeholder disclaimers. | Asymmetric Bento Grid, mouse-tracking spotlight glow, dynamic architecture beams. |
| **"Now" Section** | Broken markdown rendering (`***Runa*** **, a custom...**`). | Interactive macOS-style status terminal with gradient text highlights. |
| **Tech Stack** | Vertical bulleted HTML list with large whitespace. | Dual opposing infinite marquees with custom vector tooltips on hover. |
| **Scroll Engine** | Basic browser scrolling. | Weightless inertial smooth-scrolling powered by Lenis. |