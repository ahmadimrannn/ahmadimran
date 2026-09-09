import { projects } from "@/lib/portfolio-data";
import { ProjectCard } from "../project-card";

export function ProjectsSection() {
  return (
    <section id="projects" className="section wrap projects-section">
      <div className="section-intro">
        <p className="section-kicker">Selected work</p>
        <h2>Building agents with a real-world failure mode in mind.</h2>
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
