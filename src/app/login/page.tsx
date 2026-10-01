"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("E-mail ou senha incorretos.");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sidebar-bg">
      <div className="w-full max-w-sm px-8 py-10 bg-[#1A2335] rounded-2xl shadow-2xl border border-sidebar-border">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" strokeWidth="0"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Flash Hub</h1>
          <p className="text-sidebar-text text-sm mt-1">Plataforma de automação</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-sidebar-text mb-1.5">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="seu@email.com"
              className="w-full px-4 py-2.5 rounded-lg bg-sidebar-bg border border-sidebar-border text-white placeholder-sidebar-text focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-sidebar-text mb-1.5">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg bg-sidebar-bg border border-sidebar-border text-white placeholder-sidebar-text focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-400/10 rounded-lg py-2 px-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-xs text-sidebar-text mt-6">
          Flash Marketing © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
