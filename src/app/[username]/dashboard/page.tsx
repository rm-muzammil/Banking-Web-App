"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IUserData {
  username?: string;
  accountNumber?: string;
  balance?: number;
  transactions?: {
    type: string;
    amount: number;
    description?: string;
    createdAt: string;
  }[];
}

export default function DashboardPage() {
  const [toAccountNumber, setToAccountNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const router = useRouter();
  const [data, setData] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/me");
      const resData = await res.json();
      setData(resData);
    } catch (err) {
      console.error("Error fetching user info:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
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

    const result = await res.json();
    alert(result.message || result.error);

    if (res.ok) {
      // Refresh data after successful transfer
      fetchUserData();
      setToAccountNumber("");
      setAmount(0);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold">Welcome, {data.username}</h1>
        <div className="mt-4 border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Account Info</h2>
          <p>Account Number: {data.accountNumber}</p>
          <p>Account Balance: ${data.balance}</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-2 border px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <div className="border p-4 rounded-lg">
        <h3 className="font-semibold">Transfer Money</h3>
        <input
          type="text"
          placeholder="Recipient Account Number"
          value={toAccountNumber}
          onChange={(e) => setToAccountNumber(e.target.value)}
          className="border p-2 rounded block my-2 w-full"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-2 rounded block my-2 w-full"
        />
        <button
          onClick={handleTransfer}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>

      <div className="border p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Recent Transactions</h3>
        {data.transactions && data.transactions.length > 0 ? (
          <ul className="space-y-1">
            {data.transactions.map((tx, i) => (
              <li key={i} className="text-sm">
                <span className="font-medium">{tx.type}</span> - ${tx.amount} -{" "}
                {tx.description || "No description"} -{" "}
                {new Date(tx.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
}
