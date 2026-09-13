/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextValue = {
  dark: boolean;
  setDark: (dark: boolean) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  dark: false,
  setDark: () => {},
  toggleTheme: () => {},
});

function getInitialTheme(): boolean {
  if (typeof window === "undefined") return false;
  const storedTheme = window.localStorage.getItem("theme");
  if (storedTheme) {
    return storedTheme === "dark"; // returns true ONLY if user explicitly chose dark
  }
  return false; // defaults to light theme (dark = false)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default React state to light theme (false = light, true = dark)
  const [dark, setDark] = useState<boolean>(false);
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