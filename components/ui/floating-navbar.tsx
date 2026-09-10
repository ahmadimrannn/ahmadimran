"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { Switch } from "@/components/ui/switch";
import { navigationItems } from "@/lib/portfolio-data";
import { spring } from "@/lib/motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export function FloatingNavbar() {
  const { dark, setDark } = useTheme();
  const [activeSection, setActiveSection] = useState("about");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const sections = navigationItems
      .map(({ id }) => document.getElementById(id))
      .filter((s): s is HTMLElement => s !== null);

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActiveSection(entry.target.id),
        ),
      { rootMargin: "-34% 0px -52% 0px" },
    );

    const handleScroll = () => {
      const y = window.scrollY;
      setHasScrolled(y > 72);
      setHidden(y > 400 && y > lastY.current);
      lastY.current = y;
    };

    sections.forEach((s) => observer.observe(s));
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      className={`site-header ${hasScrolled ? "header-scrolled" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <a className="brand" href="#top">
        <strong>Ahmad</strong>
        <span>AI Engineer / Agentic AI Developer / LLM Systems</span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`nav-link ${activeSection === item.id ? "active" : ""}`}
          >
            {item.label}
            {activeSection === item.id && (
              <motion.span
                className="nav-pill"
                layoutId="activeTab"
                transition={spring}
              />
            )}
          </a>
        ))}
      </nav>

      <label className="theme-control">
        <Sun size={14} />
        <Switch
          checked={dark}
          onCheckedChange={setDark}
          aria-label="Toggle color theme"
        />
        <Moon size={14} />
      </label>

      <Dialog.Root>
        <Dialog.Trigger className="menu-trigger" aria-label="Open navigation">
          <Menu size={19} />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="menu-overlay" />
          <Dialog.Content className="mobile-sheet">
            <Dialog.Title>Navigation</Dialog.Title>
            {navigationItems.map((item) => (
              <Dialog.Close asChild key={item.id}>
                <a
                  href={item.href}
                  className={activeSection === item.id ? "active" : ""}
                >
                  {item.label}
                </a>
              </Dialog.Close>
            ))}
            <Dialog.Close className="menu-close" aria-label="Close navigation">
              <X size={18} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </motion.header>
  );
}
