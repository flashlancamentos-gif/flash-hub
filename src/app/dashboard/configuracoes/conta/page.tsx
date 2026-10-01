import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ContaPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const userName = user.email?.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ?? "";

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
          <span className="text-accent text-2xl font-bold">{userName.charAt(0)}</span>
        </div>
        <div>
          <div className="text-white font-semibold text-lg">{userName}</div>
          <div className="text-sidebar-text text-sm">{user.email}</div>
        </div>
      </div>

      <div className="bg-sidebar-bg border border-sidebar-border rounded-xl p-6 space-y-5">
        <h2 className="text-white font-semibold text-base">Dados da Conta</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sidebar-text text-xs font-medium mb-1.5 uppercase tracking-wide">E-mail</label>
            <div className="w-full px-4 py-2.5 rounded-lg bg-[#0d1117] border border-sidebar-border text-white text-sm">{user.email}</div>
          </div>
          <div>
            <label className="block text-sidebar-text text-xs font-medium mb-1.5 uppercase tracking-wide">ID do usuário</label>
            <div className="w-full px-4 py-2.5 rounded-lg bg-[#0d1117] border border-sidebar-border text-sidebar-text text-xs font-mono truncate">{user.id}</div>
          </div>
          <div>
            <label className="block text-sidebar-text text-xs font-medium mb-1.5 uppercase tracking-wide">Conta criada em</label>
            <div className="w-full px-4 py-2.5 rounded-lg bg-[#0d1117] border border-sidebar-border text-sidebar-text text-sm">
              {new Date(user.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sidebar-bg border border-sidebar-border rounded-xl p-6 space-y-4">
        <h2 className="text-white font-semibold text-base">Segurança</h2>
        <p className="text-sidebar-text text-sm">Para alterar sua senha, utilize o link de redefinição enviado para o seu e-mail.</p>
        <button disabled className="px-4 py-2 rounded-lg bg-accent/20 text-accent text-sm font-medium opacity-60 cursor-not-allowed">
          Redefinir senha (em breve)
        </button>
      </div>
    </div>
  );
}
