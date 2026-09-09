"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Switch } from "@/components/ui/switch";
import { navigationItems } from "@/lib/portfolio-data";

export function Header() {
  const { dark, setDark } = useTheme();
  const [activeSection, setActiveSection] = useState("about");
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const sections = navigationItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActiveSection(entry.target.id),
        ),
      { rootMargin: "-34% 0px -52% 0px" },
    );
    const handleScroll = () => setHasScrolled(window.scrollY > 72);

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderLink = ({
    href,
    id,
    label,
  }: (typeof navigationItems)[number]) => (
    <a key={id} href={href} className={activeSection === id ? "active" : ""}>
      {label}
    </a>
  );

  return (
    <header className={`site-header ${hasScrolled ? "header-scrolled" : ""}`}>
      <a className="brand" href="#top">
        <strong>Ahmad</strong>
        <span>AI Engineer / Agentic AI Developer / LLM Systems</span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigationItems.map(renderLink)}
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
                {renderLink(item)}
              </Dialog.Close>
            ))}
            <Dialog.Close className="menu-close" aria-label="Close navigation">
              <X size={18} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
