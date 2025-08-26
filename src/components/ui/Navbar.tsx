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
        <div className="flex items-center gap-[1rem]">
          <Link
            className={`bg-red-500 border border-[var(--border-color)] px-4 py-2 rounded-lg`}
            href={"/login"}
          >
            Login
          </Link>
          <button
            className={`${
              theme === "light"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            } border border-[var(--border-color)] px-4 py-2 rounded-lg`}
            onClick={toggleTheme}
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
