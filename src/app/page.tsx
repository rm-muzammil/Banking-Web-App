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

  return <h2>Home</h2>;
}
