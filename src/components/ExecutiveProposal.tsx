import React, { useState } from 'react';
import { DiagnosticState, ProposalData } from '../types';
import { 
  FileCheck2, 
  Cpu, 
  Server, 
  ShieldCheck, 
  TrendingUp, 
  Download, 
  Send, 
  Calendar, 
  Mail, 
  Phone, 
  Building, 
  User, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Lock,
  Layers
} from 'lucide-react';

interface ExecutiveProposalProps {
  diagnostic: DiagnosticState;
  proposal: ProposalData;
  onAskVoice: (prompt: string) => void;
}

export const ExecutiveProposal: React.FC<ExecutiveProposalProps> = ({
  diagnostic,
  proposal,
  onAskVoice,
}) => {
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [consentChecked, setConsentChecked] = useState<boolean>(true);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: diagnostic.sector ? `Entreprise (${diagnostic.sector})` : '',
    phone: '',
    message: 'Bonjour, nous souhaitons échanger sur le déploiement de cette configuration d’IA locale dans nos locaux.',
  });

  const handleDownloadReport = () => {
    const reportContent = `
===========================================================
  ASYT EXPERIENCE — RAPPORT D'ARCHITECTURE IA SOUVERAINE
===========================================================
Généré le : ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
Dossier Réf : ASYT-SOV-${Math.floor(100000 + Math.random() * 900000)}

1. DIAGNOSTIC DE L'ORGANISATION :
- Secteur : ${diagnostic.sector || 'Général'}
- Équipe utilisatrice : ${diagnostic.teamSize || '20-100 utilisateurs'}
- Niveau de confidentialité : ${diagnostic.dataSensitivity || 'Secret d’Affaires & R&D'}
- Cas d'usages prioritaires : ${diagnostic.useCases.join(', ') || 'RAG & Recherche documentaire'}
- Environnement cible : ${diagnostic.preferredInfra || 'On-Premise GPU'}

2. CONFIGURATION MATÉRIELLE ET LOGICIELLE RECOMMANDÉE :
- Appliance : ${proposal.recommendedInfra}
- Spécifications matérielles : ${proposal.hardwareSpec}
- Modèles IA déployés : ${proposal.modelsRecommended.join(', ')}
- Modules ASYT activés : ${proposal.modules.join(', ')}

3. GARANTIES DE SÉCURITÉ & SOUVERAINETÉ :
- Indice de sécurité : ${proposal.securityRating}
- Statut d'étanchéité : ${proposal.airGapStatus}
- Conformité : 100% Droit Français & Européen (Exempt CLOUD Act US)

4. ESTIMATION FINANCIÈRE & ROI :
- Économie estimée : ${proposal.estimatedMonthlySavings}
- Zéro surcoût variable au token, amortissement sur 36 mois

5. PLAN DE DÉPLOIEMENT :
${proposal.actionPlan.map((step, idx) => `  ${idx + 1}. ${step}`).join('\n')}

===========================================================
Contact Ingénierie ASYT : contact@asyt.ai | https://asyt.ai
`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ASYT-Architecture-Souveraine-${diagnostic.sector || 'Diagnostic'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTransmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) return;
    setContactSubmitted(true);
    onAskVoice(
      `Notre diagnostic pour ${contactForm.company || 'notre entreprise'} a été transmis à l'équipe technique ASYT.`
    );
  };

  return (
    <div className="space-y-6">
      {/* Executive Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900 to-cyan-950/40 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 mb-2">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Dossier d'Architecture Personnalisé • ASYT-SOV-2025</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Proposition d'Architecture Souveraine Sur-Mesure
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Synthèse calibrée pour {diagnostic.sector ? `le secteur ${diagnostic.sector}` : 'votre organisation'}, répondant aux contraintes strictes d'étanchéité et de performance locale.
            </p>
          </div>

          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs sm:text-sm font-semibold transition-all shadow-md shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger le Rapport</span>
          </button>
        </div>

        {/* Highlight Highlights Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400">Statut d'Isolement</span>
            <div className="text-base font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <Lock className="w-4 h-4" />
              <span>{proposal.airGapStatus}</span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400">Gains Financiers Estimés</span>
            <div className="text-base font-bold text-cyan-400 flex items-center gap-1.5 mt-0.5">
              <TrendingUp className="w-4 h-4" />
              <span>{proposal.estimatedMonthlySavings}</span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400">Indice de Sécurité Global</span>
            <div className="text-base font-bold text-teal-300 flex items-center gap-1.5 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{proposal.securityRating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Recommended Infrastructure & Models */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Hardware & System */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                1. Infrastructure Matérielle Dédiée
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              On-Premise Certifié
            </span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400">Modèle d'Appliance Recommandé :</div>
            <div className="text-base font-bold text-cyan-300">{proposal.recommendedInfra}</div>
            <div className="text-xs text-slate-300 font-mono pt-1 text-emerald-400/90">
              {proposal.hardwareSpec}
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-300">Modules ASYT Activés :</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
              {proposal.modules.map((mod, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 text-xs text-slate-200 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{mod}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Models & Ingestion */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                2. Modèles d'Inférence Locaux
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-500/30">
              Open-Weights Autonomes
            </span>
          </div>

          <div className="space-y-2.5">
            {proposal.modelsRecommended.map((model, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">{model}</div>
                    <div className="text-[11px] text-slate-400">
                      {idx === 0
                        ? 'Modèle de raisonnement & génération de synthèses'
                        : idx === 1
                        ? 'Modèle d’embeddings vectoriels haute fidélité'
                        : 'Modèle spécialisé code ou raisonnement structuré'}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/30 border border-emerald-500/20">
                  Local GPU
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
            <strong className="text-cyan-300">Zéro Lock-in :</strong> Tous les modèles sont intervertibles sans modifier le reste de votre système d'information.
          </div>
        </div>
      </div>

      {/* Deployment Roadmap */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            3. Feuille de Route de Déploiement In-Situ
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {proposal.actionPlan.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 relative flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] font-mono text-emerald-400 mb-1">ÉTAPE 0{idx + 1}</div>
                <p className="text-xs text-slate-200 font-medium leading-snug">{step}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/60 text-[10px] text-slate-500">
                Accompagnement ingénieur ASYT
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transmission / Contact Form with Consent */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/30 p-6 sm:p-8">
        <div className="max-w-2xl mx-auto">
          {contactSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Diagnostic transmis avec succès !</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Merci {contactForm.name || ''}. Un ingénieur système et IA de l’équipe ASYT étudie votre configuration et reviendra vers vous sous 24h ouvrées.
              </p>
              <div className="pt-2">
                <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-slate-950 border border-slate-800">
                  Référence du dossier : ASYT-PRO-{Math.floor(1000 + Math.random() * 9000)}
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleTransmitContact} className="space-y-4">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Mise en relation d'ingénierie</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Transmettre ce diagnostic à l’équipe ASYT
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Échangez directement avec les architectes qui conçoivent et déploient l'infrastructure chez nos clients.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nom & Prénom *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="Alexandre Dupont"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Professionnel *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="alexandre@entreprise.fr"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Organisation / Entreprise</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Entreprise SA"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Téléphone (Optionnel)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      placeholder="+33 6 12 34 56 78"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Note pour l'équipe technique</label>
                <textarea
                  rows={2}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              {/* RGPD Consent Checkbox as explicitly requested */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400 cursor-pointer"
                />
                <label htmlFor="consentCheckbox" className="text-[11px] text-slate-400 cursor-pointer leading-relaxed">
                  J'accepte que les éléments de mon diagnostic technique et mes coordonnées soient transmis à l'équipe d'ingénieurs d'ASYT afin de calibrer une étude de faisabilité confidentielle (aucun démarchage commercial tiers, respect strict du RGPD).
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!consentChecked}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all disabled:opacity-40 cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmettre mon Diagnostic à l'Équipe ASYT</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
