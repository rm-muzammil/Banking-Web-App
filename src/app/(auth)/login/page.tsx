"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ProgressToast from "@/components/ui/ProgressToast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkToken() {
      const res = await fetch("/api/users/me");
      if (res.ok) {
        const data = await res.json();
        router.push(`/${data.username}/dashboard`);
      }
    }
    checkToken();
  }, [router]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/users/login", formData);
      toast.custom(() => <ProgressToast message="Login Successful" />, {
        duration: 5000,
      });
      const { username } = res.data;
      router.push(`${username}/dashboard`);
      setFormData({ email: "", password: "" });
    } catch (error: any) {
      const serverMessage =
        error.response?.data?.error || "Something went wrong";
      toast.custom(() => <ProgressToast message={serverMessage} />, {
        duration: 5000,
      });
    }
  };

  return (
    <main className="min-h-full mt-[8rem] flex items-center justify-center bg-[var(--bg-main)] px-4">
      <div className="bg-[var(--bg-surface)] w-full max-w-md rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 text-[var(--fg-primary)]">
          Welcome Back
        </h2>
        <p className="text-center text-[var(--fg-secondary)] mb-8">
          Sign in to continue to NextBank
        </p>

        {/* Form */}
        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--fg-primary)] placeholder-[var(--fg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--fg-primary)] placeholder-[var(--fg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="mt-8 w-full py-3 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold transition-colors"
        >
          Login
        </button>

        {/* Extra Links */}
        <p className="text-center text-sm text-[var(--fg-secondary)] mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium"
          >
            Register
          </a>
        </p>
      </div>
    </main>
  );
}
