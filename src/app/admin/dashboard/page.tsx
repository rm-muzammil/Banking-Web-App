"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [transactionData, setTransactionData] = useState({
    fromAccountNumber: "",
    toAccountNumber: "",
    amount: 0,
  });

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setUsers(data.users);
          setTotalBalance(data.totalBalance);
        } else {
          alert(data.error);
        }
        setLoading(false);
      })
      .catch(() => {
        alert("Error fetching admin data");
        setLoading(false);
      });
  }, []);

  const handleTransfer = async () => {
    const res = await fetch("/api/admin/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData),
    });

    const result = await res.json();
    alert(result.message || result.error);
  };

  const handleLogout = async () => {
    await fetch("/api/users/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-[var(--fg-primary)]">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg-main)] text-[var(--fg-primary)] p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[var(--bg-surface)] rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Total Bank Balance</h2>
          <p className="text-2xl font-bold">${totalBalance.toFixed(2)}</p>
        </div>
        <div className="bg-[var(--bg-surface)] rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="bg-[var(--bg-surface)] rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Pending Transactions</h2>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>

      {/* Transfer Form */}
      <section className="bg-[var(--bg-surface)] rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Transfer Money</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="From Account Number"
            value={transactionData.fromAccountNumber}
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                fromAccountNumber: e.target.value,
              })
            }
            className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--fg-primary)]"
          />
          <input
            type="text"
            placeholder="To Account Number"
            value={transactionData.toAccountNumber}
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                toAccountNumber: e.target.value,
              })
            }
            className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--fg-primary)]"
          />
          <input
            type="number"
            placeholder="Amount"
            value={transactionData.amount}
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                amount: Number(e.target.value),
              })
            }
            className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--fg-primary)]"
          />
        </div>
        <button
          onClick={handleTransfer}
          className="mt-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-4 py-2 rounded-lg transition"
        >
          Transfer
        </button>
      </section>

      {/* Users List */}
      <section className="bg-[var(--bg-surface)] rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[var(--bg-main)]">
                <th className="border border-[var(--border-color)] p-2">
                  Username
                </th>
                <th className="border border-[var(--border-color)] p-2">
                  Email
                </th>
                <th className="border border-[var(--border-color)] p-2">
                  Account Number
                </th>
                <th className="border border-[var(--border-color)] p-2">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border border-[var(--border-color)] p-2">
                    {user.username}
                  </td>
                  <td className="border border-[var(--border-color)] p-2">
                    {user.email}
                  </td>
                  <td className="border border-[var(--border-color)] p-2">
                    {user.account?.accountNumber || "N/A"}
                  </td>
                  <td className="border border-[var(--border-color)] p-2">
                    ${user.account?.balance?.toFixed(2) || "0.00"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
