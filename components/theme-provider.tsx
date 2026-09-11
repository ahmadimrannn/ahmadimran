"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextValue = {
  dark: boolean;
  setDark: (dark: boolean) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  dark: true,
  setDark: () => {},
  toggleTheme: () => {},
});

function getInitialTheme(): boolean {
  if (typeof window === "undefined") return true;
  const storedTheme = window.localStorage.getItem("theme");
  if (storedTheme) {
    return storedTheme === "dark";
  }
  return true; // default to dark theme
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setDark(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      root.classList.remove("light");
      root.dataset.theme = "dark";
      root.style.colorScheme = "dark";
      window.localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.dataset.theme = "light";
      root.style.colorScheme = "light";
      window.localStorage.setItem("theme", "light");
    }
  }, [dark, mounted]);

  const toggleTheme = () => setDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ dark, setDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
