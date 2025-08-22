"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ProgressToast from "@/components/ui/ProgressToast";
import { useRouter } from "next/navigation";

export default function AdminRegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "ADMIN",
  });

  const handleRegister = async () => {
    try {
      await axios.post("/api/users/register", formData);

      toast.custom(
        () => <ProgressToast message="Admin Registration Successful" />,
        {
          duration: 5000,
        }
      );

      // Redirect to admin login
      router.push("/admin/login");
    } catch (error) {
      let serverMessage = "something went wrong";
      if (error instanceof Error && "response" in error) {
        const err = error as { response?: { data?: { error?: string } } };
        serverMessage = err.response?.data?.error || serverMessage;
      }

      toast.custom(() => <ProgressToast message={serverMessage} />, {
        duration: 5000,
      });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--bg-main)] px-4">
      <div className="bg-[var(--bg-surface)] w-full max-w-md rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 text-[var(--fg-primary)]">
          Admin Registration
        </h2>
        <p className="text-center text-[var(--fg-secondary)] mb-8">
          Create a new admin account for NextBank.
        </p>

        {/* Form */}
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--fg-primary)] placeholder-[var(--fg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />

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
          onClick={handleRegister}
          className="mt-8 w-full py-3 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold transition-colors"
        >
          Register Admin
        </button>

        {/* Extra Links */}
        <p className="text-center text-sm text-[var(--fg-secondary)] mt-6">
          Already have an account?{" "}
          <a
            href="/admin/login"
            className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
