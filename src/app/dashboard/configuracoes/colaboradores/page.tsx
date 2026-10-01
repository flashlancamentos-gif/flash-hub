"use client";

import { useState } from "react";
import clsx from "clsx";

type Permission = {
  key: string;
  label: string;
  section: "modulos" | "sistema";
};

type Collaborator = {
  id: string;
  email: string;
  permissions: string[];
  addedAt: string;
};

const PERMISSIONS: Permission[] = [
  { key: "visao_geral", label: "Visão Geral", section: "modulos" },
  { key: "whatsapp", label: "WhatsApp", section: "modulos" },
  { key: "instagram", label: "Instagram", section: "modulos" },
  { key: "email", label: "E-mail", section: "modulos" },
  { key: "crm", label: "CRM", section: "modulos" },
  { key: "integracoes", label: "Integrações", section: "sistema" },
  { key: "configuracoes", label: "Configurações", section: "sistema" },
];

export default function ColaboradoresPage() {
  const [email, setEmail] = useState("");
  const [selectedPerms, setSelectedPerms] = useState<string[]>(["visao_geral"]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function togglePerm(key: string) {
    setSelectedPerms((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function handleAdd() {
    if (!email || !email.includes("@")) {
      setError("Informe um e-mail válido.");
      return;
    }
    if (collaborators.find((c) => c.email === email)) {
      setError("Este e-mail já é um colaborador.");
      return;
    }
    if (selectedPerms.length === 0) {
      setError("Selecione ao menos uma permissão.");
      return;
    }

    // TODO: salvar no Supabase
    setCollaborators((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        email,
        permissions: selectedPerms,
        addedAt: new Date().toLocaleDateString("pt-BR"),
      },
    ]);
    setEmail("");
    setSelectedPerms(["visao_geral"]);
    setShowForm(false);
    setError("");
    setSuccessMsg("Colaborador adicionado com sucesso!");
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  const modulos = PERMISSIONS.filter((p) => p.section === "modulos");
  const sistema = PERMISSIONS.filter((p) => p.section === "sistema");

  return (
    <div className="max-w-2xl space-y-6">

      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-base" style={{ color: "#f1f5f9" }}>Colaboradores</h2>
          <p className="text-sidebar-text text-sm mt-0.5">Gerencie quem tem acesso ao Flash Hub</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setError(""); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/80 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Adicionar colaborador
        </button>
      </div>

      {/* Mensagem de sucesso */}
      {successMsg && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {successMsg}
        </div>
      )}

      {/* Formulário */}
      {showForm && (
        <div className="bg-sidebar-bg border border-sidebar-border rounded-xl p-6 space-y-5">
          <h3 className="font-medium text-sm" style={{ color: "#f1f5f9" }}>Novo colaborador</h3>

          {/* E-mail */}
          <div>
            <label className="block text-sidebar-text text-xs font-medium mb-1.5 uppercase tracking-wide">
              E-mail
            </label>
            <input
              type="email"
              placeholder="colaborador@empresa.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="w-full px-4 py-2.5 rounded-lg bg-[#0d1117] border border-sidebar-border text-white text-sm placeholder-sidebar-text focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Permissões */}
          <div className="space-y-4">
            <label className="block text-sidebar-text text-xs font-medium uppercase tracking-wide">
              Permissões de acesso
            </label>

            <div>
              <p className="text-sidebar-text text-xs mb-2 font-medium">Módulos</p>
              <div className="grid grid-cols-2 gap-2">
                {modulos.map((perm) => (
                  <button
                    key={perm.key}
                    onClick={() => togglePerm(perm.key)}
                    className={clsx(
                      "flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm text-left transition-colors",
                      selectedPerms.includes(perm.key)
                        ? "border-accent bg-accent/10 text-white"
                        : "border-sidebar-border bg-[#0d1117] text-sidebar-text hover:border-accent/40"
                    )}
                  >
                    <div className={clsx(
                      "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                      selectedPerms.includes(perm.key) ? "bg-accent border-accent" : "border-sidebar-border"
                    )}>
                      {selectedPerms.includes(perm.key) && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                    {perm.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sidebar-text text-xs mb-2 font-medium">Sistema</p>
              <div className="grid grid-cols-2 gap-2">
                {sistema.map((perm) => (
                  <button
                    key={perm.key}
                    onClick={() => togglePerm(perm.key)}
                    className={clsx(
                      "flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm text-left transition-colors",
                      selectedPerms.includes(perm.key)
                        ? "border-accent bg-accent/10 text-white"
                        : "border-sidebar-border bg-[#0d1117] text-sidebar-text hover:border-accent/40"
                    )}
                  >
                    <div className={clsx(
                      "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                      selectedPerms.includes(perm.key) ? "bg-accent border-accent" : "border-sidebar-border"
                    )}>
                      {selectedPerms.includes(perm.key) && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                    {perm.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className="px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/80 transition-colors"
            >
              Adicionar
            </button>
            <button
              onClick={() => { setShowForm(false); setError(""); setEmail(""); setSelectedPerms(["visao_geral"]); }}
              className="px-5 py-2.5 rounded-lg border border-sidebar-border text-sidebar-text text-sm hover:text-white transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de colaboradores */}
      {collaborators.length > 0 ? (
        <div className="bg-sidebar-bg border border-sidebar-border rounded-xl divide-y divide-sidebar-border">
          {collaborators.map((collab) => (
            <div key={collab.id} className="px-6 py-4 flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <span className="text-accent text-sm font-bold">
                  {collab.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: "#f1f5f9" }}>{collab.email}</div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {collab.permissions.map((pkey) => {
                    const perm = PERMISSIONS.find((p) => p.key === pkey);
                    return perm ? (
                      <span key={pkey} className="text-[11px] px-2 py-0.5 rounded-full bg-sidebar-active text-sidebar-text">
                        {perm.label}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
              <div className="text-sidebar-text text-xs shrink-0 pt-0.5">
                Adicionado em {collab.addedAt}
              </div>
            </div>
          ))}
        </div>
      ) : !showForm && (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-sidebar-bg border border-sidebar-border rounded-xl">
          <div className="w-12 h-12 rounded-xl bg-sidebar-active flex items-center justify-center mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sidebar-text" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <p className="font-medium text-sm mb-1" style={{ color: "#f1f5f9" }}>Nenhum colaborador ainda</p>
          <p className="text-sidebar-text text-sm">Adicione membros da equipe para colaborar no Flash Hub</p>
        </div>
      )}
    </div>
  );
}
