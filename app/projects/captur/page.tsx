import ProjectPageTemplate from "../ProjectPageTemplate";
import { getProjectByPath } from "@/lib/constants";

export default function CapturPage() {
  const project = getProjectByPath("captur");
  if (!project) return null;
  return <ProjectPageTemplate project={project} />;
}