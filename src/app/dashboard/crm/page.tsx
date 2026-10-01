import { createClient } from "@/lib/supabase/server";

export default async function CRMPage() {
  const supabase = await createClient();

  const { data: stages } = await supabase
    .from("pipeline_stages")
    .select("*, pipeline_cards(*)")
    .order("position", { ascending: true });

  const { data: contatos } = await supabase
    .from("contatos")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>CRM</h2>
          <p className="text-sm text-gray-500 mt-0.5">Pipeline de vendas e contatos</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            + Contato
          </button>
          <button className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors">
            + Card
          </button>
        </div>
      </div>

      {/* Pipeline */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Pipeline
        </h3>
        {stages && stages.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {stages.map((stage: any) => (
              <div key={stage.id} className="min-w-48 flex-shrink-0">
                <div
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg mb-2 text-white"
                  style={{ backgroundColor: stage.color ?? "#6D28D9" }}
                >
                  {stage.name} ({stage.pipeline_cards?.length ?? 0})
                </div>
                <div className="space-y-2">
                  {(stage.pipeline_cards ?? []).map((card: any) => (
                    <div key={card.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100 text-sm">
                      <div className="font-medium text-gray-800">{card.title}</div>
                      {card.value && (
                        <div className="text-xs text-gray-500 mt-0.5">
                          R$ {Number(card.value).toLocaleString("pt-BR")}
                        </div>
                      )}
                    </div>
                  ))}
                  {(stage.pipeline_cards ?? []).length === 0 && (
                    <div className="text-xs text-gray-300 text-center py-3">Vazio</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="text-4xl mb-3">🎯</div>
            <p className="text-gray-400 text-sm">Nenhuma etapa de pipeline ainda.</p>
            <p className="text-gray-300 text-xs mt-1">Crie etapas para organizar seus leads.</p>
          </div>
        )}
      </div>

      {/* Contacts */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Contatos Recentes
          </h3>
          <a href="#" className="text-xs text-accent hover:underline">Ver todos →</a>
        </div>

        {contatos && contatos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                  <th className="pb-2 font-medium">Nome</th>
                  <th className="pb-2 font-medium">WhatsApp</th>
                  <th className="pb-2 font-medium">E-mail</th>
                </tr>
              </thead>
              <tbody>
                {contatos.map((c: any) => (
                  <tr key={c.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 font-medium text-gray-800">{c.name}</td>
                    <td className="py-2.5 text-gray-500">{c.whatsapp ?? "—"}</td>
                    <td className="py-2.5 text-gray-500">{c.email ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-400 py-6 text-center">Nenhum contato cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
}
