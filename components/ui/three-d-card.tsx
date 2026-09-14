"use client";

import { Project } from "@/lib/constants";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Image from 'next/image';
import { Button } from "./button";
import Link from "next/link";

export function ThreeDCardDemo({ project }: { project: Project }) {
    return (
        <CardContainer className="w-full max-w-6xl">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 dark:bg-black dark:border-white/20 border-black/10 w-auto sm:w-120 h-auto rounded-xl p-6 border  ">
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                    {project.name}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                    {project.tagline}
                </CardItem>
                <CardItem
                    translateZ="60"
                    className="text-neutral-500 italic text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                    {project.stack.map((technology) => (
                        `${technology} • `
                    ))}
                </CardItem>
                <CardItem
                    translateZ="100"
                    rotateX={20}
                    rotateZ={-10}
                    className="w-full mt-4"
                >
                    <Image
                        src={project.image}
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                    />
                </CardItem>
                <div className="flex justify-end items-center mt-20">
                    <Link href={`/projects/${project.path}`} className="cursor-pointer">
                        <Button                        
                            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold cursor-pointer"
                        >
                            View Project ⟶
                        </Button>
                    </Link>
                </div>
            </CardBody>
        </CardContainer>
    );
}
