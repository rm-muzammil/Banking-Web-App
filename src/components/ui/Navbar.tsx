"use client";
import { useTheme } from "@/app/ThemeProvider";
import React from "react";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <button onClick={toggleTheme}>
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
}

export default Navbar;
