import { createClient } from "@/lib/supabase/server";

const CARDS = [
  { label: "Contatos", color: "bg-accent/10 text-accent", icon: "👥", key: "contatos" },
  { label: "Automações WhatsApp", color: "bg-green-500/10 text-green-600", icon: "⚡", key: "wa_automations" },
  { label: "Automações Instagram", color: "bg-pink-500/10 text-pink-600", icon: "📸", key: "ig_automations" },
  { label: "Campanhas E-mail", color: "bg-blue-500/10 text-blue-600", icon: "✉️", key: "email_broadcasts" },
];

async function getCount(supabase: Awaited<ReturnType<typeof createClient>>, table: string) {
  const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
  return count ?? 0;
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const counts = await Promise.all(CARDS.map(c => getCount(supabase, c.key)));

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CARDS.map((card, i) => (
          <div key={card.key} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-xl ${card.color} mb-3`}>
              {card.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {counts[i]}
            </div>
            <div className="text-sm text-gray-500 mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Acesso Rápido
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: "/dashboard/whatsapp", label: "Automações", sub: "WhatsApp", bg: "bg-green-50 hover:bg-green-100", text: "text-green-700", icon: "💬" },
            { href: "/dashboard/instagram", label: "Automações", sub: "Instagram", bg: "bg-pink-50 hover:bg-pink-100", text: "text-pink-700", icon: "📸" },
            { href: "/dashboard/email", label: "Campanhas", sub: "E-mail", bg: "bg-blue-50 hover:bg-blue-100", text: "text-blue-700", icon: "✉️" },
            { href: "/dashboard/crm", label: "Pipeline", sub: "CRM", bg: "bg-purple-50 hover:bg-purple-100", text: "text-purple-700", icon: "🎯" },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-4 rounded-xl ${item.bg} ${item.text} transition-colors text-center group`}
            >
              <span className="text-2xl mb-2">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
              <span className="text-xs font-bold">{item.sub}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Atividade Recente
        </h2>
        <div className="text-sm text-gray-400 text-center py-8">
          Nenhuma atividade recente. Configure suas automações para começar!
        </div>
      </div>
    </div>
  );
}
