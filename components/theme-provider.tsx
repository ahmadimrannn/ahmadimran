"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextValue = {
  dark: boolean;
  setDark: (dark: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  dark: true,
  setDark: () => {},
});

function getInitialTheme() {
  if (typeof window === "undefined") return true;
  const storedTheme = window.localStorage.getItem("theme");
  return storedTheme
    ? storedTheme === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    window.localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
