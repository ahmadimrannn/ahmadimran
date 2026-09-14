import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/constants";
import { ShimmerButton } from "@/components/ui/shimmer-button";

interface ProjectPageTemplateProps {
    project: Project;
}

export default function ProjectPageTemplate({ project }: ProjectPageTemplateProps) {
    const renderContentOrPlaceholder = (content?: string) => {
        if (!content || content.trim() === "") {
            return (
                <p className="font-inter font-normal text-base leading-[1.6] text-[#5A5A5A] dark:text-[#A0A0A0] italic">
                    Content coming soon
                </p>
            );
        }

        return (
            <p className="font-inter font-normal text-base leading-[1.6] text-[#5A5A5A] dark:text-[#A0A0A0]">
                {content}
            </p>
        );
    };

    return (
        <main className="w-full min-h-screen bg-[#FAFAF8] dark:bg-[#000000] text-[#0A0A0A] dark:text-[#F5F5F5] transition-colors py-12 sm:py-20 px-6 sm:px-8 md:px-12">
            <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
                {/* Back Button */}
                <div>
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 font-inter font-normal text-sm text-[#5A5A5A] dark:text-[#A0A0A0] hover:text-[#2CB86E] dark:hover:text-[#3DDC84] transition-colors"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back</span>
                    </Link>
                </div>

                {/* Header Section */}
                <header className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="font-geist text-3xl sm:text-4xl md:text-5xl font-normal tracking-tighter text-[#0A0A0A] dark:text-[#F5F5F5]">
                            {project.name}
                        </h1>
                        <p className="font-inter text-lg sm:text-xl font-normal text-[#5A5A5A] dark:text-[#A0A0A0] leading-[1.6]">
                            {project.tagline}
                        </p>
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                            <span
                                key={item}
                                className="font-inter text-xs font-normal px-2.5 py-1 rounded-md bg-[#FFFFFF] dark:bg-[#0D0D0D] text-[#5A5A5A] dark:text-[#A0A0A0] border border-[#E5E5E0] dark:border-[#1A1A1A]"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-inter text-sm font-normal px-4 py-2 rounded-md text-[#FFFFFF] dark:text-[#000000] transition-colors inline-flex items-center gap-1.5"
                            >
                                <ShimmerButton>
                                    <span>Live Demo</span>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </ShimmerButton>
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-inter text-sm font-normal px-6 py-3 rounded-full bg-[#FFFFFF] dark:bg-[#0D0D0D] text-[#0A0A0A] dark:text-[#F5F5F5] border border-[#E5E5E0] dark:border-[#252525] hover:border-[#2CB86E] dark:hover:border-[#3DDC84] hover:text-[#2CB86E] dark:hover:text-[#3DDC84] transition-colors inline-flex items-center gap-1.5"
                            >
                                <span>GitHub Repo</span>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                    </div>
                </header>

                {/* Fixed Aspect Ratio Image Container */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[#E5E5E0] dark:border-[#1A1A1A] bg-[#FFFFFF] dark:bg-[#0D0D0D]">
                    <Image
                        src={project.image}
                        alt={`${project.name} interface preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Sections */}
                <div className="space-y-12 sm:space-y-16">
                    {/* The Problem */}
                    <section className="space-y-3">
                        <h2 className="font-geist text-xl sm:text-2xl font-normal tracking-tighter text-[#0A0A0A] dark:text-[#F5F5F5]">
                            The Problem
                        </h2>
                        {renderContentOrPlaceholder(project.problem)}
                    </section>

                    {/* The Solution */}
                    <section className="space-y-3">
                        <h2 className="font-geist text-xl sm:text-2xl font-normal tracking-tighter text-[#0A0A0A] dark:text-[#F5F5F5]">
                            The Solution
                        </h2>
                        {renderContentOrPlaceholder(project.solution)}
                    </section>

                    {/* Tech Stack Breakdown */}
                    <section className="space-y-3">
                        <h2 className="font-geist text-xl sm:text-2xl font-normal tracking-tighter text-[#0A0A0A] dark:text-[#F5F5F5]">
                            Tech Stack
                        </h2>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {project.stack.map((item) => (
                                <span
                                    key={item}
                                    className="font-inter text-sm font-normal px-3 py-1.5 rounded-md bg-[#FFFFFF] dark:bg-[#0D0D0D] text-[#0A0A0A] dark:text-[#F5F5F5] border border-[#E5E5E0] dark:border-[#1A1A1A]"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* A Real Bug, In Detail */}
                    <section className="space-y-4 p-6 sm:p-8 rounded-lg bg-[#FFFFFF] dark:bg-[#0D0D0D] border border-[#E5E5E0] dark:border-[#1A1A1A]">
                        <h2 className="font-geist text-xl sm:text-2xl font-normal tracking-tighter text-[#0A0A0A] dark:text-[#F5F5F5]">
                            A Real Bug, In Detail
                        </h2>
                        {renderContentOrPlaceholder(project.bug)}
                    </section>

                    {/* Decisions and Tradeoffs */}
                    <section className="space-y-3">
                        <h2 className="font-geist text-xl sm:text-2xl font-normal tracking-tighter text-[#0A0A0A] dark:text-[#F5F5F5]">
                            Decisions and Tradeoffs
                        </h2>
                        {renderContentOrPlaceholder(project.decisions)}
                    </section>

                    {/* Lessons Learned */}
                    <section className="space-y-3">
                        <h2 className="font-geist text-xl sm:text-2xl font-normal tracking-tighter text-[#0A0A0A] dark:text-[#F5F5F5]">
                            Lessons Learned
                        </h2>
                        {renderContentOrPlaceholder(project.lessons)}
                    </section>
                </div>
            </div>
        </main>
    );
}