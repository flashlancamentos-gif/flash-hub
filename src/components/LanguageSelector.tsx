"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

const LANGUAGES = [
  { code: "pt", label: "Português", flag: "🇧🇷", available: true },
  { code: "es", label: "Español", flag: "🇪🇸", available: false },
  { code: "en", label: "English", flag: "🇺🇸", available: false },
];

export default function LanguageSelector() {
  const [selected, setSelected] = useState("pt");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("flash-hub-lang");
      if (saved) setSelected(saved);
    } catch {}
  }, []);

  function handleSelect(code: string) {
    setSelected(code);
    try { localStorage.setItem("flash-hub-lang", code); } catch {}
  }

  return (
    <div className="bg-sidebar-bg border border-sidebar-border rounded-xl p-6 space-y-4">
      <div>
        <h2 className="font-semibold text-base" style={{ color: "#f1f5f9" }}>Idioma</h2>
        <p className="text-sidebar-text text-sm mt-1">Selecione o idioma da plataforma</p>
      </div>

      <div className="flex gap-3">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            disabled={!lang.available}
            className={clsx(
              "flex-1 flex flex-col items-center gap-2 px-4 py-3.5 rounded-xl border text-sm font-medium transition-all",
              selected === lang.code
                ? "border-accent bg-accent/10 text-white"
                : lang.available
                  ? "border-sidebar-border bg-[#0d1117] text-sidebar-text hover:border-accent/40 hover:text-white"
                  : "border-sidebar-border bg-[#0d1117] text-sidebar-text opacity-50 cursor-not-allowed"
            )}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span>{lang.label}</span>
            {!lang.available && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sidebar-active text-sidebar-text">
                Em breve
              </span>
            )}
            {selected === lang.code && lang.available && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent block"/>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
