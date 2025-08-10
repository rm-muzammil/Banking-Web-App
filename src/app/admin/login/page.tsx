"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ProgressToast from "@/components/ui/ProgressToast";
import { useRouter } from "next/navigation";
function page() {
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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/users/login", formData);
      toast.custom((t) => <ProgressToast message="Login Successful" />, {
        duration: 5000,
      });
      const { username } = res.data;
      router.push("/admin/dashboard");

      setFormData({ email: "", password: "" });
    } catch (error: any) {
      const serverMessage =
        error.response?.data?.error || "Something went wrong";
      toast.custom((t) => <ProgressToast message={`${serverMessage}`} />, {
        duration: 5000,
      });
    }
  };

  return (
    <>
      <h2>Login</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
}

export default page;
