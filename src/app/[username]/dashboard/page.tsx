"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<{
    username?: string;
    accountNumber?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users/me")
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data found</p>;
  const handleLogout = async () => {
    await fetch("/api/users/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome, {data.username}</h1>
      <div className="mt-4 border p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Account Info</h2>
        <p>Account Number: {data.accountNumber}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
