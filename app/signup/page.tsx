"use client";

import React, { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = supabaseBrowser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return setMsg(error.message);

    window.location.href = "/dashboard";
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Create account</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, maxWidth: 360 }}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Create account</button>
      </form>

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <p style={{ marginTop: 12 }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </main>
  );
