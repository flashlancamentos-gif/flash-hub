"use client";

import { usePathname } from "next/navigation";

const TITLES: Record<string, string> = {
  "/dashboard": "Visão Geral",
  "/dashboard/whatsapp": "WhatsApp",
  "/dashboard/instagram": "Instagram",
  "/dashboard/email": "E-mail",
  "/dashboard/crm": "CRM",
};

export default function Topbar() {
  const pathname = usePathname();
  const title = TITLES[pathname] ?? "Flash Hub";
  const now = new Date().toLocaleDateString("pt-BR", {
    weekday: "long", day: "numeric", month: "long",
  });

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6 bg-white border-b border-gray-100">
      <h1 className="text-gray-900 font-semibold text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
        {title}
      </h1>
      <span className="text-gray-400 text-sm capitalize">{now}</span>
    </header>
  );
}
