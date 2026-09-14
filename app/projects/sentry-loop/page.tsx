import ProjectPageTemplate from "../ProjectPageTemplate";
import { getProjectByPath } from "@/lib/constants";

export default function SentryLoopPage() {
  const project = getProjectByPath("sentry-loop");
  if (!project) return null;
  return <ProjectPageTemplate project={project} />;
}