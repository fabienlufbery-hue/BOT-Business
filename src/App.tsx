import React, { useState } from 'react';
import { ActiveView, DiagnosticState, ProposalData } from './types';
import { useVoiceConsultant } from './hooks/useVoiceConsultant';
import { VocalOrb } from './components/VocalOrb';
import { ConversationConsole } from './components/ConversationConsole';
import { PresentationView } from './components/PresentationView';
import { RagArchitectureDemo } from './components/RagArchitectureDemo';
import { EnterpriseDiagnostic } from './components/EnterpriseDiagnostic';
import { ExecutiveProposal } from './components/ExecutiveProposal';
import { 
  ShieldCheck, 
  Layers, 
  Share2, 
  FileText, 
  Cpu, 
  Lock, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Radio, 
  Mic,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ActiveView>('presentation');
  const [highlightedNodeIds, setHighlightedNodeIds] = useState<string[]>([]);

  // Diagnostic state
  const [diagnosticState, setDiagnosticState] = useState<DiagnosticState>({
    sector: 'Finance',
    teamSize: '20-100',
    dataSensitivity: 'Secret d\'affaires / R&D',
    useCases: ['RAG & Recherche documentaire sur wikis/fichiers', 'Analyse & synthèse automatisée de contrats'],
    preferredInfra: 'On-Premise GPU',
  });

  // Proposal state
  const [proposalData, setProposalData] = useState<ProposalData>({
    clientProfile: 'Organisation exigeante en souveraineté des données',
    recommendedInfra: 'ASYT Sovereign Enterprise Rack 2U (Appliance Dédiée)',
    hardwareSpec: '2x NVIDIA RTX 6000 Ada (96GB VRAM) + 128GB DDR5 ECC + 4TB NVMe Gen5',
    modelsRecommended: ['Llama-3.3-70B Q4_K_M', 'BGE-M3 Multilingual 1024-dim', 'Qwen-2.5-Coder-32B'],
    modules: ['ASYT Core Inférence Locale', 'ASYT Knowledge Graph RAG', 'ASYT Guard & Privacy Firewall'],
    estimatedMonthlySavings: '72% d’économie sur 3 ans par rapport aux tokens Cloud',
    securityRating: 'A+ Isolation Matérielle Complète (SecNumCloud & RGPD)',
    airGapStatus: '100% Air-Gapped (Zéro transmission réseau sortant)',
    actionPlan: [
      'Semaine 1 : Cadrage technique, inventaire des corpus documentaires & cartographie des accès',
      'Semaine 2 : Livraison et raccordement de l’Appliance ASYT sur votre réseau local privé',
      'Semaine 3 : Ingestion sécurisée in-situ, indexation sémantique et tests de non-régression',
      'Semaine 4 : Déploiement auprès des utilisateurs pilotes et session de transfert de compétences',
    ],
  });

  // Voice Consultant hook
  const {
    state: consultantState,
    isListening,
    isMuted,
    audioLevel,
    messages,
    currentCaption,
    hasStarted,
    startSession,
    toggleListening,
    interrupt,
    handleSendMessage,
    toggleMute,
  } = useVoiceConsultant(
    currentView,
    (newView) => setCurrentView(newView),
    diagnosticState,
    (updates) => setDiagnosticState((prev) => ({ ...prev, ...updates })),
    (updates) => setProposalData((prev) => ({ ...prev, ...updates }))
  );

  const handleOrbClick = () => {
    if (!hasStarted) {
      startSession();
    } else {
      toggleListening();
    }
  };

  const tabs = [
    { id: 'presentation', label: '1. Présentation ASYT', icon: ShieldCheck },
    { id: 'rag_demo', label: '2. Démo RAG & Graphe', icon: Share2 },
    { id: 'diagnostic', label: '3. Diagnostic Entreprise', icon: Cpu },
    { id: 'proposal', label: '4. Proposition Sur-Mesure', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#04060a] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* Background cyber grid & ambient lighting */}
      <div className="fixed inset-0 bg-grid-pattern opacity-25 pointer-events-none -z-10" />
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Sovereign Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-emerald-400 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 font-mono text-sm tracking-tighter">
                  ASYT
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-white">ASYT Experience</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  AI CONSULTANT
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Discover intelligent autonomy. By conversation.
              </p>
            </div>
          </div>

          {/* Status & Sovereign Compliance Pill */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>In-Situ Sovereign Node • Air-Gap Ready</span>
            </div>

            <button
              onClick={toggleMute}
              className={`p-2 rounded-xl border transition-colors ${
                isMuted
                  ? 'bg-slate-900 text-slate-500 border-slate-800'
                  : 'bg-cyan-950/50 text-cyan-400 border-cyan-500/30 hover:border-cyan-500/60'
              }`}
              title={isMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {!hasStarted && (
              <button
                onClick={startSession}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-transform active:scale-95"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Parler à ASYT</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 sm:gap-3 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id as ActiveView)}
                className={`flex items-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Vocal Orb & Dialogue Console */}
        <div className="lg:col-span-5 flex flex-col space-y-5">
          {/* Vocal Orb Unit */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-slate-800/90 p-5 shadow-2xl relative overflow-hidden flex flex-col items-center">
            <div className="absolute top-2 left-3 text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>ASYT Vocal Core Engine</span>
            </div>

            <VocalOrb
              state={consultantState}
              audioLevel={audioLevel}
              onClick={handleOrbClick}
              onInterrupt={interrupt}
              isListening={isListening}
              isMuted={isMuted}
              onToggleMute={toggleMute}
              captionText={currentCaption}
            />
          </div>

          {/* Conversation Transcript & Interaction Box */}
          <div className="flex-1 min-h-[380px]">
            <ConversationConsole
              messages={messages}
              consultantState={consultantState}
              onSendMessage={handleSendMessage}
              onToggleMic={toggleListening}
              isListening={isListening}
              onReset={startSession}
            />
          </div>
        </div>

        {/* Right Column: The Living Interactive Canvas */}
        <div className="lg:col-span-7 flex flex-col">
          {currentView === 'presentation' && (
            <PresentationView
              onSelectAction={(action) => setCurrentView(action)}
              onSendVoicePrompt={handleSendMessage}
            />
          )}

          {currentView === 'rag_demo' && (
            <RagArchitectureDemo
              onAskVoice={handleSendMessage}
              highlightedNodeIds={highlightedNodeIds}
            />
          )}

          {currentView === 'diagnostic' && (
            <EnterpriseDiagnostic
              diagnostic={diagnosticState}
              onUpdateDiagnostic={(updates) => setDiagnosticState((prev) => ({ ...prev, ...updates }))}
              onGenerateProposal={() => setCurrentView('proposal')}
              onAskVoice={handleSendMessage}
            />
          )}

          {currentView === 'proposal' && (
            <ExecutiveProposal
              diagnostic={diagnosticState}
              proposal={proposalData}
              onAskVoice={handleSendMessage}
            />
          )}
        </div>
      </main>

      {/* Floating Welcome Modal if user hasn't interacted yet */}
      {!hasStarted && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/30 p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 mb-3">
              ASYT EXPERIENCE
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Découvrez l’autonomie intelligente. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Par la conversation.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              Discutez directement avec notre conseiller IA vocal. Découvrez notre technologie souveraine sans cloud, observez le RAG en direct et obtenez un diagnostic d'architecture pour votre organisation.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={startSession}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-98"
              >
                <Mic className="w-4 h-4" />
                <span>Parler à ASYT (Vocal)</span>
              </button>

              <button
                onClick={() => {
                  startSession();
                  toggleMute();
                }}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs sm:text-sm transition-colors"
              >
                Explorer sans le son
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/70 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2025 ASYT — Autonomous Systems & Yield Technologies. Tous droits réservés.
          </span>
          <span className="font-mono text-[11px] text-cyan-400/80">
            100% On-Premise Sovereign AI • Zero Cloud Egress • RGPD & SecNumCloud Aligned
          </span>
        </div>
      </footer>
    </div>
  );
}
