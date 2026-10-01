import { createClient } from "@/lib/supabase/server";

export default async function WhatsAppPage() {
  const supabase = await createClient();
  const { data: automations } = await supabase
    .from("wa_automations")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: campaigns } = await supabase
    .from("wa_campaigns")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: grupos } = await supabase
    .from("wa_grupos")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>WhatsApp</h2>
          <p className="text-sm text-gray-500 mt-0.5">Automações, campanhas e grupos</p>
        </div>
        <button className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors">
          + Nova Automação
        </button>
      </div>

      {/* Tabs content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Automações */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            Automações ({automations?.length ?? 0})
          </h3>
          {automations && automations.length > 0 ? (
            <ul className="space-y-2">
              {automations.map((a: any) => (
                <li key={a.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-700">{a.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${a.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {a.active ? "Ativa" : "Inativa"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 py-4 text-center">Nenhuma automação ainda</p>
          )}
        </div>

        {/* Campanhas */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
            Campanhas ({campaigns?.length ?? 0})
          </h3>
          {campaigns && campaigns.length > 0 ? (
            <ul className="space-y-2">
              {campaigns.map((c: any) => (
                <li key={c.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-700">{c.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{c.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 py-4 text-center">Nenhuma campanha ainda</p>
          )}
        </div>

        {/* Grupos */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <span className="w-2 h-2 rounded-full bg-purple-500 inline-block"></span>
            Grupos ({grupos?.length ?? 0})
          </h3>
          {grupos && grupos.length > 0 ? (
            <ul className="space-y-2">
              {grupos.map((g: any) => (
                <li key={g.id} className="py-2 border-b border-gray-50 last:border-0">
                  <div className="text-sm text-gray-700">{g.name}</div>
                  <div className="text-xs text-gray-400">{g.wa_group_id}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 py-4 text-center">Nenhum grupo cadastrado</p>
          )}
        </div>
      </div>

      {/* Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
        <strong>⚠️ Integração pendente:</strong> Para enviar mensagens reais, configure sua chave da Z-API nas configurações.
      </div>
    </div>
  );
}
