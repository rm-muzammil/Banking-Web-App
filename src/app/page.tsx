"use client";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
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

  return (
    <main className="min-h-screen">
      <section className="bg-[var(--bg-surface)] text-[var(--fg-primary)] py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to NextBank</h1>
        <p className="text-[var(--fg-secondary)] max-w-2xl mx-auto">
          Your trusted partner for secure and modern banking solutions.
        </p>
        <button
          onClick={() => router.push("/register")}
          className="mt-6 px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-lg"
        >
          Get Started
        </button>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Why Choose NextBank?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[var(--bg-surface)] p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
            <p className="text-[var(--fg-secondary)]">
              Bank with confidence using our top-grade encryption technology.
            </p>
          </div>
          <div className="bg-[var(--bg-surface)] p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-[var(--fg-secondary)]">
              Our team is always ready to help you with any banking needs.
            </p>
          </div>
          <div className="bg-[var(--bg-surface)] p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Digital Banking</h3>
            <p className="text-[var(--fg-secondary)]">
              Manage your accounts anytime, anywhere with our mobile app.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
