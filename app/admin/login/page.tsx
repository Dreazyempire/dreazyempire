"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Incorrect email or password. Please try again.");
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-mainbg flex items-center justify-center px-6">
      <form onSubmit={handleLogin} className="bg-card border border-borderc rounded-xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-textprimary mb-6 text-center">Admin Login</h1>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <label className="block text-textsecondary text-sm mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-md bg-secondarybg border border-borderc text-textprimary"
          required
        />
        <label className="block text-textsecondary text-sm mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded-md bg-secondarybg border border-borderc text-textprimary"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-accent text-mainbg font-semibold hover:bg-highlight transition"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </main>
  );
}
