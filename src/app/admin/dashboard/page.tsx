"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
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
      .catch((err) => {
        alert("Error fetching admin data");
        setLoading(false);
      });
  }, []);
  const handleTransfer = async () => {
    const res = await fetch("/api/admin/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromAccountNumber: transactionData.fromAccountNumber,
        toAccountNumber: transactionData.toAccountNumber,
        amount: transactionData.amount,
      }),
    });

    const result = await res.json();
    alert(result.message || result.error);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Total Bank Balance: ${totalBalance.toFixed(2)}</h2>
      <div>
        <h2>Transfer Money</h2>
        <div>
          <input
            type="text"
            value={transactionData.fromAccountNumber}
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                fromAccountNumber: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={transactionData.toAccountNumber}
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                toAccountNumber: e.target.value,
              })
            }
          />
          <input
            type="number"
            value={transactionData.amount}
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                amount: Number(e.target.value), // Correctly update the 'amount' field
              })
            }
          />
          <button onClick={handleTransfer}> Transfer</button>
        </div>
      </div>
      <h3>All Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            Username: {user.username} | Email: {user.email} | Account Number:{" "}
            {user.account?.accountNumber || "N/A"} | Balance: $
            {user.account?.balance?.toFixed(2) || 0}
          </li>
        ))}
      </ul>
    </div>
  );
}
