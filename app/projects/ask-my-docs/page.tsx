import ProjectPageTemplate from "../ProjectPageTemplate";
import { getProjectByPath } from "@/lib/constants";

export default function AskMyDocsPage() {
    const project = getProjectByPath("ask-my-docs");
    if (!project) return null;
    return <ProjectPageTemplate project={project} />;
}