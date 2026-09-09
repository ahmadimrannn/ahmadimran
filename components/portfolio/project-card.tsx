"use client";

import { useState } from "react";
import type { Project } from "@/lib/portfolio-data";

type ProjectCardProps = { project: Project };
type ProjectView = "Overview" | "Architecture" | "Production learnings";

const views: ProjectView[] = ["Overview", "Architecture", "Production learnings"];

export function ProjectCard({ project }: ProjectCardProps) {
  const [activeView, setActiveView] = useState<ProjectView>("Overview");

  return (
    <article className={`project ${project.featured ? "featured" : ""}`}>
      <div className="project-top">
        <div>
          <h3>{project.name}</h3>
          {project.featured && <span className="featured-label">Most recent</span>}
        </div>
        <span className="project-status" title="Public links are being reviewed before release.">
          <i />
          {project.status}
        </span>
      </div>
      <div className="project-preview" aria-hidden="true">
        <span>agent runtime</span>
        <span>observed</span>
      </div>
      <div className="project-tabs" role="tablist" aria-label={`${project.name} details`}>
        {views.map((view) => (
          <button
            key={view}
            type="button"
            role="tab"
            aria-selected={activeView === view}
            className={activeView === view ? "active" : ""}
            onClick={() => setActiveView(view)}
          >
            {view}
          </button>
        ))}
      </div>
      <div className="project-detail" role="tabpanel">
        {activeView === "Overview" && <p>{project.problem}</p>}
        {activeView === "Architecture" && (
          <div className="tags">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        )}
        {activeView === "Production learnings" && (
          <p>
            {project.bug ??
              "Production learnings are retained for the private case-study review."}
          </p>
        )}
      </div>
    </article>
  );
}
