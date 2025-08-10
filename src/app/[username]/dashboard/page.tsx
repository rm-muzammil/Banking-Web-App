"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [toAccountNumber, setToAccountNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const router = useRouter();
  const [data, setData] = useState<{
    username?: string;
    accountNumber?: string;
    balance?: number;
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
  const handleTransfer = async () => {
    const res = await fetch("/api/accounts/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toAccountNumber, amount }),
    });

    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <div>
      <div className="p-6">
        <h1 className="text-xl font-bold">Welcome, {data.username}</h1>
        <div className="mt-4 border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Account Info</h2>
          <p>Account Number: {data.accountNumber}</p>
          <p>Account Balance: ${data.balance}</p>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <h3>Transfer Money</h3>
        <input
          type="text"
          placeholder="Recipient Account Number"
          value={toAccountNumber}
          onChange={(e) => setToAccountNumber(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button onClick={handleTransfer}>Send</button>
      </div>
    </div>
  );
}
