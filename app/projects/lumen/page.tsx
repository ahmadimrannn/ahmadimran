import ProjectPageTemplate from "../ProjectPageTemplate";
import { getProjectByPath } from "@/lib/constants";

export default function LumenPage() {
  const project = getProjectByPath("lumen");
  if (!project) return null;
  return <ProjectPageTemplate project={project} />;
}