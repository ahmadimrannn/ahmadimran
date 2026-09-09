import { skillGroups } from "@/lib/portfolio-data";

export function SkillsSection() {
  return (
    <section
      className="section wrap skills-section"
      aria-labelledby="skills-title"
    >
      <p className="section-kicker">Stack</p>
      <h2 id="skills-title">Tools I reach for.</h2>
      <dl>
        {skillGroups.map((skill) => (
          <div key={skill.label}>
            <dt>{skill.label}</dt>
            <dd>{skill.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
