import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Lock, 
  Zap, 
  Server, 
  Database, 
  HardDrive, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Sparkles,
  FileText
} from 'lucide-react';

interface PresentationViewProps {
  onSelectAction: (action: 'rag_demo' | 'diagnostic' | 'proposal') => void;
  onSendVoicePrompt: (prompt: string) => void;
}

export const PresentationView: React.FC<PresentationViewProps> = ({
  onSelectAction,
  onSendVoicePrompt,
}) => {
  const [activeTab, setActiveTab] = useState<'sovereignty' | 'comparison' | 'hardware'>('sovereignty');

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-cyan-950/30 border border-cyan-500/20 p-6 sm:p-8 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Autonomie Intelligente 100% Souveraine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              L’IA de pointe dans vos murs, <br className="hidden sm:block"/>
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                sans aucune dépendance au cloud.
              </span>
            </h1>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              ASYT déploie des modèles d’IA générative et de raisonnement directement sur vos serveurs On-Premise ou cloud privé souverain. Vos documents stratégiques, codes sources et secrets industriels restent strictement confidentiels.
            </p>
          </div>

          <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={() => {
                onSelectAction('rag_demo');
                onSendVoicePrompt("Montre-moi comment fonctionne votre RAG local et votre Knowledge Graph");
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02]"
            >
              <Database className="w-4 h-4" />
              <span>Voir la démo RAG</span>
            </button>
            <button
              onClick={() => {
                onSelectAction('diagnostic');
                onSendVoicePrompt("Je souhaite évaluer les besoins d'IA pour mon entreprise");
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02]"
            >
              <Cpu className="w-4 h-4" />
              <span>Faire le diagnostic</span>
            </button>
          </div>
        </div>

        {/* Live Sovereign Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
            <div className="text-xs text-slate-400">Fuite de données Cloud</div>
            <div className="text-xl font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
              <span>0 octet</span>
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] text-slate-500">Air-gapped ou LAN strict</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
            <div className="text-xs text-slate-400">Latence inférence locale</div>
            <div className="text-xl font-bold text-cyan-400 flex items-center gap-1 mt-0.5">
              <span>&lt; 15 ms</span>
              <Zap className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] text-slate-500">Sans goulet d'étranglement</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
            <div className="text-xs text-slate-400">Modèles IA supportés</div>
            <div className="text-xl font-bold text-purple-300 flex items-center gap-1 mt-0.5">
              <span>Open-Weights</span>
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] text-slate-500">Llama 3.3, Mistral, Qwen, DeepSeek</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
            <div className="text-xs text-slate-400">Conformité Réglementaire</div>
            <div className="text-xl font-bold text-teal-300 flex items-center gap-1 mt-0.5">
              <span>100% RGPD</span>
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] text-slate-500">Exempt du Cloud Act US</div>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('sovereignty')}
          className={`pb-3 px-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'sovereignty'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Pourquoi l’IA Locale ?</span>
        </button>
        <button
          onClick={() => setActiveTab('comparison')}
          className={`pb-3 px-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'comparison'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>ASYT vs Cloud Public</span>
        </button>
        <button
          onClick={() => setActiveTab('hardware')}
          className={`pb-3 px-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'hardware'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HardDrive className="w-4 h-4" />
          <span>Infrastructures Déployées</span>
        </button>
      </div>

      {/* Tab 1: Pillars */}
      {activeTab === 'sovereignty' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-slate-900/60 border border-slate-800/90 p-5 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Souveraineté & Secret d'Affaires</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              En envoyant des prompts aux API cloud tierces, vos contrats, R&D et données financières transitent sur des serveurs externes. ASYT installe l'IA directement sur votre infra pour éliminer tout risque d'exfiltration.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-cyan-400 font-mono flex items-center gap-1.5">
              <span>Protection IP & Propriété exclusive</span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/60 border border-slate-800/90 p-5 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Zéro Latence & Disponibilité 99.99%</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Fini les pannes d'API externes, les quotas d'appels ou les baisses de débit aux heures de pointe. Vos équipes bénéficient d'une réactivité constante sans dépendre d'une connexion internet externe.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-emerald-400 font-mono flex items-center gap-1.5">
              <span>Temps de réponse stable garanti</span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/60 border border-slate-800/90 p-5 hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Coûts Fixes vs Facturation au Token</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Au-delà de 20 utilisateurs ou d'indexations massives de documents, les tokens API deviennent un gouffre financier imprévisible. Avec ASYT, vous amortissez votre matériel pour un coût marginal nul.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-purple-300 font-mono flex items-center gap-1.5">
              <span>Amortissement CAPEX prévisible</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Comparison Matrix */}
      {activeTab === 'comparison' && (
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/80 text-slate-300 border-b border-slate-800">
                <tr>
                  <th className="p-3 sm:p-4 font-semibold">Critère Stratégique</th>
                  <th className="p-3 sm:p-4 font-semibold text-cyan-400 bg-cyan-950/20 border-x border-cyan-500/20">
                    Solution ASYT (Local On-Prem)
                  </th>
                  <th className="p-3 sm:p-4 font-semibold text-slate-400">
                    Solutions Cloud (OpenAI, Azure, AWS)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr>
                  <td className="p-3 sm:p-4 font-medium text-white">Flux de données</td>
                  <td className="p-3 sm:p-4 bg-cyan-950/10 border-x border-cyan-500/20 text-emerald-400 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>0 octet ne quitte vos locaux (Air-Gap)</span>
                  </td>
                  <td className="p-3 sm:p-4 text-rose-300 flex items-center gap-2">
                    <XCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>Transite par des serveurs distants</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-medium text-white">Juridiction & Lois</td>
                  <td className="p-3 sm:p-4 bg-cyan-950/10 border-x border-cyan-500/20 text-cyan-300">
                    100% Droit Français & Européen (RGPD strict)
                  </td>
                  <td className="p-3 sm:p-4 text-slate-400">
                    Soumis au US CLOUD Act & FISA 702
                  </td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-medium text-white">Hallucinations & Traçabilité</td>
                  <td className="p-3 sm:p-4 bg-cyan-950/10 border-x border-cyan-500/20 text-teal-300">
                    Knowledge Graph & RAG Hybride avec citations exactes
                  </td>
                  <td className="p-3 sm:p-4 text-slate-400">
                    RAG générique souvent sans contrôle de la traçabilité
                  </td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-medium text-white">Modèle Économique</td>
                  <td className="p-3 sm:p-4 bg-cyan-950/10 border-x border-cyan-500/20 text-emerald-400">
                    Coût fixe amortissable (Zéro facture au token)
                  </td>
                  <td className="p-3 sm:p-4 text-slate-400">
                    Facturation variable au million de tokens, explosion à l'échelle
                  </td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-medium text-white">Dépendance Fournisseur</td>
                  <td className="p-3 sm:p-4 bg-cyan-950/10 border-x border-cyan-500/20 text-purple-300">
                    Agnostique : basculez librement de Llama à Mistral ou Qwen
                  </td>
                  <td className="p-3 sm:p-4 text-slate-400">
                    Vendor lock-in sévère sur les API propriétaires
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Hardware appliances */}
      {activeTab === 'hardware' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 uppercase">Profil Découverte / PME</span>
              <Server className="w-4 h-4 text-slate-400" />
            </div>
            <h4 className="text-lg font-bold text-white mt-1">ASYT Station Pro</h4>
            <p className="text-xs text-slate-400 mt-1">Pour équipes de 5 à 30 utilisateurs</p>
            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Station de travail silencieuse Nvidia RTX 4090 (24GB)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Modèles 8B à 14B quantifiés (Mistral NeMo, Qwen 2.5)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Prise 220V standard, aucun besoin de salle climatisée</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-cyan-950/30 border border-cyan-500/40 p-5 relative overflow-hidden">
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-400 text-slate-950">
              POPULAIRE
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-300 uppercase">Profil Entreprise / ETI</span>
              <Server className="w-4 h-4 text-cyan-400" />
            </div>
            <h4 className="text-lg font-bold text-white mt-1">ASYT Enterprise Rack</h4>
            <p className="text-xs text-slate-400 mt-1">Pour 50 à 500 collaborateurs simultanés</p>
            <div className="mt-4 space-y-2 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Serveur Rack 2U avec 2x RTX 6000 Ada (96GB VRAM)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Llama-3.3-70B + RAG Knowledge Graph temps réel</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cluster redondant haute disponibilité & RBAC</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-400 uppercase">Défense / Banque / Santé</span>
              <Server className="w-4 h-4 text-slate-400" />
            </div>
            <h4 className="text-lg font-bold text-white mt-1">ASYT Sovereign Core</h4>
            <p className="text-xs text-slate-400 mt-1">Grands groupes & Infrastructures critiques</p>
            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Cluster multi-nœuds (H100 / L40S) ou SecNumCloud</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Modèles de raisonnement DeepSeek-R1 distillés + Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Isolation totale en réseau étanche (Air-Gapped)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suggested prompts footer */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Questions fréquentes à poser à ASYT à l'oral :</span>
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSendVoicePrompt("Explique-moi comment vous empêchez les hallucinations avec le RAG")}
            className="px-3 py-1 rounded-lg text-xs bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 border border-slate-700 transition-colors"
          >
            « Comment empêchez-vous les hallucinations ? »
          </button>
          <button
            onClick={() => onSendVoicePrompt("Combien coûte l'infrastructure locale par rapport à ChatGPT Enterprise ?")}
            className="px-3 py-1 rounded-lg text-xs bg-slate-800/80 hover:bg-slate-700/80 text-emerald-300 border border-slate-700 transition-colors"
          >
            « Combien coûte le matériel vs le Cloud ? »
          </button>
          <button
            onClick={() => onSendVoicePrompt("Peut-on faire fonctionner ASYT complètement déconnecté d'Internet ?")}
            className="px-3 py-1 rounded-lg text-xs bg-slate-800/80 hover:bg-slate-700/80 text-purple-300 border border-slate-700 transition-colors"
          >
            « Fonctionnement en mode Air-Gapped sans Internet ? »
          </button>
        </div>
      </div>
    </div>
  );
};
