import React, { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches &&
        !localStorage.getItem("theme"))
    ) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  const storeTheme = (theme) => {
    localStorage.setItem("theme", theme);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      document.body.classList.add("dark-mode");
      setTheme("dark");
      storeTheme("dark");
    } else {
      document.body.classList.remove("dark-mode");
      setTheme("light");
      storeTheme("light");
    }
  };

  return (
    <button
      className={`theme-toggle ${theme === "dark" ? "theme-toggle--dark" : ""}`}
      onClick={toggleTheme}
    ></button>
  );
}
