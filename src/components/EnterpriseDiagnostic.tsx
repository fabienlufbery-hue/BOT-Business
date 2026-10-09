import React from 'react';
import { DiagnosticState } from '../types';
import { 
  Building2, 
  Users, 
  ShieldAlert, 
  Workflow, 
  Server, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Zap
} from 'lucide-react';

interface EnterpriseDiagnosticProps {
  diagnostic: DiagnosticState;
  onUpdateDiagnostic: (updates: Partial<DiagnosticState>) => void;
  onGenerateProposal: () => void;
  onAskVoice: (prompt: string) => void;
}

const SECTORS = [
  { id: 'Finance', label: 'Banque & Assurance', desc: 'Risques, conformité, analyses financières' },
  { id: 'Santé', label: 'Santé & Pharma', desc: 'Dossiers patients, recherche clinique, HDS' },
  { id: 'Industrie/Défense', label: 'Industrie & Défense', desc: 'Plans techniques, R&D, secret défense' },
  { id: 'Juridique', label: 'Juridique & Conseil', desc: 'Audit contractuel, jurisprudence, secret pro' },
  { id: 'Tech', label: 'Tech & Logiciel', desc: 'Copilote code, documentation, tickets' },
  { id: 'Public', label: 'Secteur Public & OIV', desc: 'Souveraineté étatique, services aux citoyens' },
];

const TEAM_SIZES = [
  { id: '1-20', label: '1 - 20 utilisateurs', appliance: 'ASYT Station Pro (RTX 4090)' },
  { id: '20-100', label: '20 - 100 utilisateurs', appliance: 'ASYT Enterprise Rack (2x RTX 6000)' },
  { id: '100-500', label: '100 - 500 utilisateurs', appliance: 'ASYT Enterprise Multi-GPU' },
  { id: '500+', label: '500+ utilisateurs', appliance: 'ASYT Sovereign Cluster (H100 / L40S)' },
];

const CONFIDENTIALITY_LEVELS = [
  { id: 'RGPD Standard', label: 'RGPD Standard', tag: 'Europe compliant', score: 20 },
  { id: 'Données de santé (HDS)', label: 'Données de santé (HDS)', tag: 'Certification HDS', score: 25 },
  { id: 'Secret d\'affaires / R&D', label: 'Secret d’Affaires & R&D', tag: 'Zéro transmission', score: 25 },
  { id: 'Air-gap / Défense', label: 'Air-Gap Strict / Défense', tag: 'Déconnecté du Web', score: 30 },
];

const USE_CASES = [
  'RAG & Recherche documentaire sur wikis/fichiers',
  'Copilote de code et revue technique sécurisée',
  'Analyse & synthèse automatisée de contrats',
  'Agents autonomes pour workflows ERP/CRM',
  'Helpdesk & Support collaborateur souverain',
  'Extraction de données non structurées (PDF, OCR)',
];

const INFRASTRUCTURE_TYPES = [
  { id: 'On-Premise GPU', label: 'Serveurs On-Premise GPU dans votre baie', icon: Server },
  { id: 'Cloud Souverain', label: 'Cloud Souverain dédié (SecNumCloud)', icon: ShieldCheck },
  { id: 'Postes locaux sécurisés', label: 'Stations de travail locales (Mac / PC)', icon: Zap },
  { id: 'Hybride', label: 'Architecture Hybride sécurisée', icon: Workflow },
];

export const EnterpriseDiagnostic: React.FC<EnterpriseDiagnosticProps> = ({
  diagnostic,
  onUpdateDiagnostic,
  onGenerateProposal,
  onAskVoice,
}) => {
  // Calculate Sovereign Readiness Index
  let readinessScore = 40;
  if (diagnostic.sector) readinessScore += 15;
  if (diagnostic.dataSensitivity) readinessScore += 20;
  if (diagnostic.useCases.length > 0) readinessScore += 15;
  if (diagnostic.teamSize) readinessScore += 10;
  readinessScore = Math.min(100, readinessScore);

  const toggleUseCase = (uc: string) => {
    const exists = diagnostic.useCases.includes(uc);
    const newCases = exists ? diagnostic.useCases.filter((c) => c !== uc) : [...diagnostic.useCases, uc];
    onUpdateDiagnostic({ useCases: newCases });
  };

  return (
    <div className="space-y-6">
      {/* Header & Score Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-1.5">
            <Building2 className="w-3.5 h-3.5" />
            <span>Diagnostic d'Adéquation IA Souveraine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Analysez les besoins spécifiques de votre entreprise
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Remplissez ou dictez vos paramètres à ASYT. Nous dimensionnons l’infrastructure matérielle et logicielle exacte pour maximiser la sécurité et le retour sur investissement.
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="w-full sm:w-auto p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-4 shrink-0">
          <div>
            <div className="text-[11px] text-slate-400">Indice d'Éligibilité Souveraine</div>
            <div className="text-2xl font-extrabold text-cyan-400 font-mono">{readinessScore}%</div>
          </div>
          <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${readinessScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid of Diagnostic Dimensions */}
      <div className="space-y-6">
        {/* Dimension 1: Secteur */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>1. Quel est votre secteur d'activité ?</span>
            </span>
            {diagnostic.sector && (
              <span className="text-xs font-mono text-cyan-400">Choisi : {diagnostic.sector}</span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SECTORS.map((sec) => {
              const isSelected = diagnostic.sector === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    onUpdateDiagnostic({ sector: sec.id });
                    onAskVoice(`Notre secteur est ${sec.label}. Quelles sont les recommandations d'ASYT ?`);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-500/20 text-white shadow-lg'
                      : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold flex items-center justify-between">
                    <span>{sec.label}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{sec.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dimension 2: Nombre d'utilisateurs */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>2. Combien de collaborateurs utiliseront la solution ?</span>
            </span>
            {diagnostic.teamSize && (
              <span className="text-xs font-mono text-emerald-400">Taille : {diagnostic.teamSize}</span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TEAM_SIZES.map((size) => {
              const isSelected = diagnostic.teamSize === size.id;
              return (
                <button
                  key={size.id}
                  onClick={() => {
                    onUpdateDiagnostic({ teamSize: size.id });
                    onAskVoice(`Nous prévoyons environ ${size.label}. Quel équipement matériel est nécessaire ?`);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-500/20 text-white shadow-lg'
                      : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold flex items-center justify-between">
                    <span>{size.label}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  </div>
                  <p className="text-[10px] text-emerald-400/90 font-mono mt-1">{size.appliance}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dimension 3: Confidentialité & Sensibilité */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-400" />
              <span>3. Niveau d'isolation des données requise</span>
            </span>
            {diagnostic.dataSensitivity && (
              <span className="text-xs font-mono text-purple-300">{diagnostic.dataSensitivity}</span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CONFIDENTIALITY_LEVELS.map((lvl) => {
              const isSelected = diagnostic.dataSensitivity === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => {
                    onUpdateDiagnostic({ dataSensitivity: lvl.id });
                    onAskVoice(`Nos contraintes de confidentialité sont : ${lvl.label}.`);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-400 ring-2 ring-purple-500/20 text-white shadow-lg'
                      : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold flex items-center justify-between">
                    <span>{lvl.label}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-purple-300 border border-purple-500/30">
                    {lvl.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dimension 4: Tâches cibles à automatiser */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Workflow className="w-4 h-4 text-teal-400" />
              <span>4. Cas d'usage prioritaires (Sélectionnez plusieurs)</span>
            </span>
            <span className="text-xs font-mono text-slate-400">
              {diagnostic.useCases.length} sélectionné(s)
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {USE_CASES.map((uc) => {
              const isSelected = diagnostic.useCases.includes(uc);
              return (
                <button
                  key={uc}
                  onClick={() => toggleUseCase(uc)}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-teal-950/40 border-teal-400 text-white ring-1 ring-teal-500/30'
                      : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span>{uc}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dimension 5: Infrastructure cible */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>5. Environnement d'hébergement cible</span>
            </span>
            {diagnostic.preferredInfra && (
              <span className="text-xs font-mono text-cyan-400">{diagnostic.preferredInfra}</span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {INFRASTRUCTURE_TYPES.map((inf) => {
              const Icon = inf.icon;
              const isSelected = diagnostic.preferredInfra === inf.id;
              return (
                <button
                  key={inf.id}
                  onClick={() => onUpdateDiagnostic({ preferredInfra: inf.id })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-500/20 text-white shadow-lg'
                      : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-2 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <div className="text-xs font-bold">{inf.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA To Proposal */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-emerald-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>Votre diagnostic est prêt</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Découvrez la configuration matérielle indicative, les modèles recommandés et le calcul du ROI.
          </p>
        </div>

        <button
          onClick={() => {
            onGenerateProposal();
            onAskVoice("Génère notre proposition personnalisée et l'architecture recommandée");
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02]"
        >
          <span>Générer l’Architecture & Devis Indicatif</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
