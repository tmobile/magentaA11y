import React, { createContext, useContext, useEffect, useState } from "react";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

// Types for the context
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Default context value
const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.LIGHT,
  setTheme: () => {},
});

// Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === Theme.DARK || savedTheme === Theme.LIGHT
      ? (savedTheme as Theme)
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? Theme.DARK
      : Theme.LIGHT;
  });

  // Apply the theme to the document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const systemThemeChangeListener = (e: MediaQueryListEvent) => {
      const systemTheme = e.matches ? Theme.DARK : Theme.LIGHT;
      const savedTheme = localStorage.getItem("theme");

      // Only update theme if user hasn't manually overridden
      if (!savedTheme) {
        setTheme(systemTheme);
      }
    };

    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    darkModeMediaQuery.addEventListener("change", systemThemeChangeListener);

    // Cleanup listener on unmount
    return () => {
      darkModeMediaQuery.removeEventListener(
        "change",
        systemThemeChangeListener
      );
    };
  }, []);

  // Update localStorage only when the user explicitly changes the theme
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for accessing the theme context
export const useTheme = () => useContext(ThemeContext);
