import { useEffect } from "react";

function ThemeProvider() {
  useEffect(() => {
    const updateTheme = () => {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.setAttribute(
        "data-bs-theme",
        isDarkMode ? "dark" : "light"
      );
    };

    updateTheme();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateTheme);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", updateTheme);
    };
  }, []);

  return null;
}

export default ThemeProvider;
