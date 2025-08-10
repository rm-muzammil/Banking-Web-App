"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Total Bank Balance: ${totalBalance.toFixed(2)}</h2>
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
