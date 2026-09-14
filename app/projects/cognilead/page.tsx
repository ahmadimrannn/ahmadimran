import { getProjectByPath } from "@/lib/constants";
import ProjectPageTemplate from "../ProjectPageTemplate";

export default function CogniLeadPage() {
  const project = getProjectByPath("cognilead");
  if (!project) return null;
  return <ProjectPageTemplate project={project} />;
}