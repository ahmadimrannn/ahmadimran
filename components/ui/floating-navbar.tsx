"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { Switch } from "@/components/ui/switch";
import { navigationItems } from "@/lib/constants";
import { Sun, Moon, Menu, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export function FloatingNavbar() {
  const { dark, setDark } = useTheme();
  const [activeSection, setActiveSection] = useState("about");
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const sections = navigationItems
      .map(({ id }) => document.getElementById(id))
      .filter((s): s is HTMLElement => s !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px" }
    );

    const handleScroll = () => {
      const y = window.scrollY;
      setHidden(y > 300 && y > lastY.current);
      lastY.current = y;
    };

    sections.forEach((s) => observer.observe(s));
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl bg-white/80 border border-neutral-200/80 text-neutral-900 shadow-md dark:bg-neutral-950/75 dark:border-white/10 dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] dark:text-white backdrop-blur-xl rounded-full px-5 py-2.5 flex items-center justify-between transition-colors duration-300"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Brand logo */}
      <a
        href="#top"
        className="flex items-center gap-2 text-neutral-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <span className="font-mono font-medium text-sm tracking-tight flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Ahmad
        </span>
      </a>

      {/* Desktop Links with Framer Motion active pill */}
      <nav
        className="hidden md:flex items-center relative gap-1"
        aria-label="Main navigation"
      >
        {navigationItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActiveSection(item.id)}
              className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
                isActive
                  ? "text-neutral-900 dark:text-white font-semibold"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 bg-neutral-900/10 border border-neutral-900/10 dark:bg-white/10 dark:border-white/15 rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Controls: Divider + Theme Toggle + Mobile Menu */}
      <div className="flex items-center">
        {/* Vertical divider */}
        <div className="hidden md:block h-4 w-[1px] bg-neutral-300 dark:bg-white/15 mx-3" />

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white cursor-pointer transition-colors text-xs select-none">
            <Sun size={13} className={dark ? "opacity-40" : "text-amber-500"} />
            <Switch
              checked={dark}
              onCheckedChange={setDark}
              aria-label="Toggle color theme"
            />
            <Moon size={13} className={dark ? "text-cyan-400" : "opacity-40"} />
          </label>

          {/* Mobile hamburger menu */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                className="md:hidden ml-2 p-1.5 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg border border-neutral-200 dark:border-white/10"
                aria-label="Open navigation"
              >
                <Menu size={16} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in" />
              <Dialog.Content className="fixed right-4 top-20 w-64 bg-white dark:bg-neutral-900/95 border border-neutral-200 dark:border-white/15 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl z-50 animate-in slide-in-from-top-4 text-neutral-900 dark:text-white">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-white/10">
                  <Dialog.Title className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Navigation
                  </Dialog.Title>
                  <Dialog.Close className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    <X size={16} />
                  </Dialog.Close>
                </div>
                <div className="flex flex-col gap-1.5 pt-3">
                  {navigationItems.map((item) => (
                    <Dialog.Close asChild key={item.id}>
                      <a
                        href={item.href}
                        onClick={() => setActiveSection(item.id)}
                        className={`px-3 py-2 rounded-xl text-sm transition-colors ${
                          activeSection === item.id
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20"
                            : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/5"
                        }`}
                      >
                        {item.label}
                      </a>
                    </Dialog.Close>
                  ))}
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </motion.header>
  );
}
