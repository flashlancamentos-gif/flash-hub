import { createClient } from "@/lib/supabase/server";

export default async function EmailPage() {
  const supabase = await createClient();
  const { data: broadcasts } = await supabase
    .from("email_broadcasts")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: sequences } = await supabase
    .from("email_sequences")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>E-mail Marketing</h2>
          <p className="text-sm text-gray-500 mt-0.5">Campanhas e sequências de e-mail</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            + Sequência
          </button>
          <button className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors">
            + Campanha
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Broadcasts */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Campanhas ({broadcasts?.length ?? 0})
          </h3>
          {broadcasts && broadcasts.length > 0 ? (
            <ul className="space-y-2">
              {broadcasts.map((b: any) => (
                <li key={b.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{b.subject}</div>
                    <div className="text-xs text-gray-400">{b.from_name} · {b.status}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    b.status === "sent" ? "bg-green-100 text-green-700" :
                    b.status === "scheduled" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-500"
                  }`}>
                    {b.status === "sent" ? "Enviada" : b.status === "scheduled" ? "Agendada" : "Rascunho"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 py-6 text-center">Nenhuma campanha ainda</p>
          )}
        </div>

        {/* Sequences */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Sequências ({sequences?.length ?? 0})
          </h3>
          {sequences && sequences.length > 0 ? (
            <ul className="space-y-2">
              {sequences.map((s: any) => (
                <li key={s.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{s.name}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${s.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {s.active ? "Ativa" : "Inativa"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 py-6 text-center">Nenhuma sequência ainda</p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <strong>📧 Integração:</strong> Os e-mails são enviados via Resend. Configure sua chave API e domínio verificado nas configurações.
      </div>
    </div>
  );
}
