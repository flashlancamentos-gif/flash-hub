import { createClient } from "@/lib/supabase/server";

export default async function InstagramPage() {
  const supabase = await createClient();
  const { data: automations } = await supabase
    .from("ig_automations")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Instagram</h2>
          <p className="text-sm text-gray-500 mt-0.5">Automações de DM e comentários</p>
        </div>
        <button className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors">
          + Nova Automação
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Automações ({automations?.length ?? 0})
        </h3>

        {automations && automations.length > 0 ? (
          <div className="space-y-3">
            {automations.map((a: any) => (
              <div key={a.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-accent/30 transition-colors">
                <div>
                  <div className="text-sm font-medium text-gray-900">{a.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    Trigger: {a.trigger_type} · Keyword: {a.trigger_keyword ?? "—"}
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${a.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {a.active ? "Ativa" : "Inativa"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📸</div>
            <p className="text-gray-400 text-sm">Nenhuma automação de Instagram ainda.</p>
            <p className="text-gray-300 text-xs mt-1">Crie sua primeira automação de DM ou comentário.</p>
          </div>
        )}
      </div>

      <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 text-sm text-pink-800">
        <strong>ℹ️ Integração:</strong> A conexão com a API do Instagram é feita via Z-API. Configure nas configurações quando pronto.
      </div>
    </div>
  );
}
