/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function ContactForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const [isPending, startTransition] = useTransition();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const projectType = formData.get("projectType") as string;
        const hearAbout = formData.get("hearAbout") as string;
        const projectDetails = formData.get("projectDetails") as string;

        const formElement = e.currentTarget;

        startTransition(async () => {
            try {
                const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        projectType,
                        hearAbout,
                        projectDetails,
                    }),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to send message.");
                }

                toast.success("Message sent successfully!", {
                    className: "font-geist",
                    description: "Thank you for reaching out. I will get back to you as soon as possible.",
                });

                formElement.reset();
            } catch (err: any) {
                const msg = err?.message || "Something went wrong. Please try again.";
                setErrorMessage(msg);
                toast.error(msg);
            }
        });
    };

    return (
        <form
            className={cn("flex flex-col gap-4", className)}
            onSubmit={handleSubmit}
            {...props}
        >
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-3xl font-sans tracking-tight">Have a Project in Mind? Get in Touch</h1>
                    <p className="text-sm text-balance font-inter text-muted-foreground">
                        Fill out the details below and I&apos;ll get back to you shortly.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            required
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            required
                        />
                    </Field>

                    <Field className="space-y-2">
                        <FieldLabel htmlFor="projectType">Project Type</FieldLabel>
                        <Select name="projectType" defaultValue="Full-Stack Web App">
                            <SelectTrigger
                                id="projectType"
                                className="h-10 w-full px-3 py-2 text-sm rounded-md border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 transition-colors"
                            >
                                <SelectValue placeholder="Select project type" />
                            </SelectTrigger>

                            <SelectContent className="z-50 min-w-32 overflow-hidden rounded-md border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2">
                                <SelectItem value="AI Agent & Automation" className="py-2 px-3 cursor-pointer focus:bg-neutral-100 dark:focus:bg-neutral-800 focus:text-emerald-600 dark:focus:text-emerald-400">
                                    AI Agent / Automation Systems
                                </SelectItem>
                                <SelectItem value="Full-Stack Web App" className="py-2 px-3 cursor-pointer focus:bg-neutral-100 dark:focus:bg-neutral-800 focus:text-emerald-600 dark:focus:text-emerald-400">
                                    Full-Stack Web Application
                                </SelectItem>
                                <SelectItem value="RAG / Knowledge Base" className="py-2 px-3 cursor-pointer focus:bg-neutral-100 dark:focus:bg-neutral-800 focus:text-emerald-600 dark:focus:text-emerald-400">
                                    RAG & Vector Search Systems
                                </SelectItem>
                                <SelectItem value="Consultation & Architecture" className="py-2 px-3 cursor-pointer focus:bg-neutral-100 dark:focus:bg-neutral-800 focus:text-emerald-600 dark:focus:text-emerald-400">
                                    Technical Consultation
                                </SelectItem>
                                <SelectItem value="Other" className="py-2 px-3 cursor-pointer focus:bg-neutral-100 dark:focus:bg-neutral-800 focus:text-emerald-600 dark:focus:text-emerald-400">
                                    Other
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>

                <Field>
                    <FieldLabel htmlFor="hearAbout">How did you hear about me?</FieldLabel>
                    <Input
                        id="hearAbout"
                        name="hearAbout"
                        type="text"
                        placeholder="LinkedIn, X (Twitter), GitHub, Referral..."
                    />
                </Field>

                <Field>
                    <FieldLabel htmlFor="projectDetails">Project Details</FieldLabel>
                    <textarea
                        id="projectDetails"
                        name="projectDetails"
                        rows={4}
                        placeholder="Describe your project, timeline, and goals..."
                        className="flex min-h-25 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </Field>

                {errorMessage && (
                    <div className="rounded-md bg-red-50 dark:bg-red-950/50 p-2.5 text-sm text-red-500">
                        {errorMessage}
                    </div>
                )}

                <Field>
                    <Button type="submit"  className="w-full py-4 cursor-pointer">
                        {isPending ? "Sending..." : "Send Message"}
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    );
}