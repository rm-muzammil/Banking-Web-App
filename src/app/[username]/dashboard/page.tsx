import React from "react";

export default function DashboardPage({
  params,
}: {
  params: { username: string; email: string };
}) {
  return (
    <div>
      <h1>Welcome to {params.username}'s Dashboard</h1>
      <h1>Welcome to {params.email}'s Dashboard</h1>
    </div>
  );
}
