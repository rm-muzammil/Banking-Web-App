"use client";
import { useTheme } from "@/app/ThemeProvider";
import Link from "next/link";
import React from "react";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <div className="flex justify-between px-[1rem] items-center bg-[var(--bg-surface)] rounded-4xl md:mx-[10rem] my-[2rem] ">
        <div className="flex items-center text-4xl">
          <img className="w-[3rem]" src="/tab-logo.png" alt="NextBank" />
          <h1>extBank</h1>
        </div>
        <div className="md:flex hidden gap-[1rem]">
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/services"}>Services</Link>
        </div>

        <button onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
