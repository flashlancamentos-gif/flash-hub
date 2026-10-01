"use client";

import { useState } from "react";
import clsx from "clsx";

type Connector = {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "connected" | "disconnected" | "coming_soon";
  icon: React.ReactNode;
  fields: { key: string; label: string; placeholder: string; type?: string }[];
};

const CONNECTORS: Connector[] = [
  {
    id: "zapi",
    name: "Z-API (WhatsApp)",
    description: "Envie e receba mensagens WhatsApp via Z-API.",
    category: "WhatsApp",
    status: "disconnected",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    fields: [
      { key: "instance_id", label: "Instance ID", placeholder: "Ex: 3EB0123456789" },
      { key: "token", label: "Token", placeholder: "Seu token Z-API", type: "password" },
    ],
  },
  {
    id: "resend",
    name: "Resend (E-mail)",
    description: "Dispare e-mails transacionais e campanhas com Resend.",
    category: "E-mail",
    status: "disconnected",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    fields: [
      { key: "api_key", label: "API Key", placeholder: "re_xxxxxxxxxxxx", type: "password" },
      { key: "from_email", label: "E-mail remetente", placeholder: "noreply@seudominio.com" },
    ],
  },
  {
    id: "instagram",
    name: "Instagram (Meta API)",
    description: "Automatize respostas e DMs via Meta Graph API.",
    category: "Instagram",
    status: "coming_soon",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
    fields: [
      { key: "access_token", label: "Access Token", placeholder: "Token da Meta Graph API", type: "password" },
      { key: "page_id", label: "Page ID", placeholder: "ID da página do Facebook" },
    ],
  },
  {
    id: "openai",
    name: "OpenAI",
    description: "Use GPT para geração de textos e respostas automáticas.",
    category: "IA",
    status: "coming_soon",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    fields: [
      { key: "api_key", label: "API Key", placeholder: "sk-xxxxxxxxxxxx", type: "password" },
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  WhatsApp: "text-green-400 bg-green-400/10",
  "E-mail": "text-blue-400 bg-blue-400/10",
  Instagram: "text-pink-400 bg-pink-400/10",
  IA: "text-purple-400 bg-purple-400/10",
};

export default function ConectoresPage() {
  const [activeConnector, setActiveConnector] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, Record<string, string>>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const connector = CONNECTORS.find((c) => c.id === activeConnector);

  function handleChange(connId: string, key: string, value: string) {
    setValues((prev) => ({ ...prev, [connId]: { ...(prev[connId] ?? {}), [key]: value } }));
  }

  function handleSave(connId: string) {
    setSaved((prev) => ({ ...prev, [connId]: true }));
    setTimeout(() => setSaved((prev) => ({ ...prev, [connId]: false })), 2000);
  }

  return (
    <div className="flex gap-6 h-full">
      <div className="w-72 shrink-0 space-y-2">
        {CONNECTORS.map((conn) => (
          <button
            key={conn.id}
            onClick={() => conn.status !== "coming_soon" && setActiveConnector(conn.id)}
            className={clsx(
              "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-colors",
              activeConnector === conn.id ? "bg-sidebar-active border-accent" : "bg-sidebar-bg border-sidebar-border hover:border-accent/40",
              conn.status === "coming_soon" && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className={clsx("shrink-0", CATEGORY_COLORS[conn.category]?.split(" ")[0])}>{conn.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">{conn.name}</div>
              <div className={clsx("text-xs mt-0.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full", CATEGORY_COLORS[conn.category])}>
                {conn.category}
              </div>
            </div>
            <div className="shrink-0">
              {conn.status === "coming_soon" ? (
                <span className="text-xs text-sidebar-text bg-sidebar-active px-2 py-0.5 rounded-full">Em breve</span>
              ) : conn.status === "connected" ? (
                <span className="w-2 h-2 rounded-full bg-green-400 block"/>
              ) : (
                <span className="w-2 h-2 rounded-full bg-sidebar-text block"/>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex-1">
        {connector ? (
          <div className="bg-sidebar-bg border border-sidebar-border rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-4">
              <span className={clsx("text-2xl", CATEGORY_COLORS[connector.category]?.split(" ")[0])}>{connector.icon}</span>
              <div>
                <h2 className="text-white font-semibold text-lg">{connector.name}</h2>
                <p className="text-sidebar-text text-sm">{connector.description}</p>
              </div>
            </div>
            <hr className="border-sidebar-border"/>
            <div className="space-y-4">
              {connector.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sidebar-text text-xs font-medium mb-1.5 uppercase tracking-wide">{field.label}</label>
                  <input
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    value={values[connector.id]?.[field.key] ?? ""}
                    onChange={(e) => handleChange(connector.id, field.key, e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0d1117] border border-sidebar-border text-white text-sm placeholder-sidebar-text focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSave(connector.id)}
              className={clsx(
                "px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                saved[connector.id] ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-accent text-white hover:bg-accent/80"
              )}
            >
              {saved[connector.id] ? "✓ Salvo!" : "Salvar configurações"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-12 h-12 rounded-xl bg-sidebar-active flex items-center justify-center mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sidebar-text" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </div>
            <p className="text-sidebar-text text-sm">Selecione um conector para configurar</p>
          </div>
        )}
      </div>
    </div>
  );
}
