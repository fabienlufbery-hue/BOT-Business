import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Share2, 
  Search, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';
import { GraphNode, GraphEdge } from '../types';

interface RagArchitectureDemoProps {
  onAskVoice: (prompt: string) => void;
  highlightedNodeIds?: string[];
}

const SAMPLE_NODES: GraphNode[] = [
  {
    id: 'contract_2025',
    label: 'Contrat Cadre Partenaire 2025',
    category: 'document',
    summary: 'Convention bilatérale avec engagements de non-divulgation.',
    details: 'Article 8.3 : Aucune donnée de calcul ne peut être traitée hors du territoire européen. Sanction en cas de fuite vers tiers.',
    x: 180,
    y: 100,
  },
  {
    id: 'clause_rd',
    label: 'Clause d’Exclusivité R&D',
    category: 'rule',
    summary: 'Règle stricte protégeant les poids de modèles et brevets.',
    details: 'Les modèles fine-tunés sur les données internes restent la propriété exclusive et inaliénable de l’organisation.',
    x: 420,
    y: 90,
  },
  {
    id: 'iso_27001',
    label: 'Norme ISO 27001 / SecNumCloud',
    category: 'security',
    summary: 'Contrôle A.12.3 : Sauvegarde et isolation physique des calculs.',
    details: 'Exige que les données classifiées soient isolées des réseaux publics externes (air-gapped ou VLAN crypté dédié).',
    x: 620,
    y: 180,
  },
  {
    id: 'project_phoenix',
    label: 'Projet Alpha / Phoenix IA',
    category: 'concept',
    summary: 'Déploiement de copilotes internes pour 250 ingénieurs.',
    details: 'Objectif : Automatiser la documentation technique et l’audit de code sans aucun appel externe vers des serveurs US.',
    x: 320,
    y: 250,
  },
  {
    id: 'legal_dept',
    label: 'Direction Juridique & DPO',
    category: 'entity',
    summary: 'Autorité de validation des accès et des politiques de rétention.',
    details: 'Valide les requêtes sensibles et gère les droits d’accès RBAC injectés dans le RAG hybride ASYT.',
    x: 150,
    y: 330,
  },
  {
    id: 'cluster_onprem',
    label: 'Cluster GPU Souverain ASYT',
    category: 'security',
    summary: 'Serveur 2U local Nvidia RTX 6000 Ada - 96GB VRAM.',
    details: 'Héberge le modèle Llama-3.3-70B et la base vectorielle locale Qdrant sans accès Internet sortant.',
    x: 520,
    y: 340,
  },
];

const SAMPLE_EDGES: GraphEdge[] = [
  { id: 'e1', source: 'contract_2025', target: 'clause_rd', label: 'stipule' },
  { id: 'e2', source: 'clause_rd', target: 'project_phoenix', label: 's’applique à' },
  { id: 'e3', source: 'iso_27001', target: 'cluster_onprem', label: 'certifie' },
  { id: 'e4', source: 'project_phoenix', target: 'cluster_onprem', label: 's’exécute sur' },
  { id: 'e5', source: 'legal_dept', target: 'contract_2025', label: 'administre' },
  { id: 'e6', source: 'legal_dept', target: 'iso_27001', label: 'contrôle' },
];

export const RagArchitectureDemo: React.FC<RagArchitectureDemoProps> = ({
  onAskVoice,
  highlightedNodeIds = [],
}) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(SAMPLE_NODES[0]);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeQuery, setActiveQuery] = useState<string>(
    'Quelles sont les clauses applicables au projet Phoenix et comment le cluster GPU assure-t-il la conformité ISO 27001 ?'
  );
  const [activeHighlightNodes, setActiveHighlightNodes] = useState<string[]>([
    'contract_2025',
    'clause_rd',
    'project_phoenix',
    'cluster_onprem',
  ]);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  useEffect(() => {
    if (highlightedNodeIds.length > 0) {
      setActiveHighlightNodes(highlightedNodeIds);
      const found = SAMPLE_NODES.find((n) => highlightedNodeIds.includes(n.id));
      if (found) setSelectedNode(found);
    }
  }, [highlightedNodeIds]);

  const runSimulation = (queryText: string, targetNodes: string[]) => {
    setActiveQuery(queryText);
    setActiveHighlightNodes(targetNodes);
    setIsSimulating(true);
    setActiveStage(1);
    setSimulationResult(null);

    // Sequence stages 1 through 6
    const timer1 = setTimeout(() => setActiveStage(2), 700);
    const timer2 = setTimeout(() => setActiveStage(3), 1400);
    const timer3 = setTimeout(() => setActiveStage(4), 2100);
    const timer4 = setTimeout(() => setActiveStage(5), 2800);
    const timer5 = setTimeout(() => {
      setActiveStage(6);
      setIsSimulating(false);
      setSimulationResult(
        `[Réponse certifiée ASYT - Zéro Hallucination]\n` +
        `• Selon le Contrat Cadre 2025 (Art. 8.3) et la Clause d'Exclusivité R&D, l'intégralité du Projet Phoenix bénéficie d'une étanchéité de propriété intellectuelle stricte.\n` +
        `• L'exécution sur le Cluster GPU Souverain ASYT garantit la conformité ISO 27001 / A.12.3 via un isolement physique du matériel (0 octet transmis hors LAN).\n` +
        `• Traçabilité validée : Nœuds #contract_2025, #clause_rd, #cluster_onprem consultés avec 100% de concordance sémantique.`
      );
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  };

  const stages = [
    {
      num: 1,
      title: 'Ingestion & Découpage',
      desc: 'Parsing multi-formats (PDF, Word, Code, Base de données SQL)',
      icon: FileText,
      tech: 'ASYT Parser Engine',
    },
    {
      num: 2,
      title: 'Embeddings Locaux',
      desc: 'Modèle vectoriel dense 1024 dimensions exécuté sur GPU local',
      icon: Layers,
      tech: 'BGE-M3 Dense (Local)',
    },
    {
      num: 3,
      title: 'Index Hybride + Graphe',
      desc: 'Recherche vectorielle combinée au Knowledge Graph sémantique',
      icon: Share2,
      tech: 'Qdrant + Neo4j On-Prem',
    },
    {
      num: 4,
      title: 'Extraction Contextuelle',
      desc: 'Traversée des relations d’entités et validation des dépendances',
      icon: Search,
      tech: 'Ontologie & Rapprochement',
    },
    {
      num: 5,
      title: 'Contrôle RBAC & Re-ranking',
      desc: 'Filtrage des droits selon l’utilisateur et tri haute pertinence',
      icon: ShieldCheck,
      tech: 'ASYT Security Guard',
    },
    {
      num: 6,
      title: 'Inférence LLM Souverain',
      desc: 'Génération de la réponse avec citations exactes par le modèle local',
      icon: Cpu,
      tech: 'Llama-3.3-70B / Mistral Local',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-1.5">
            <Share2 className="w-3.5 h-3.5" />
            <span>Architecture RAG Hybride & Knowledge Graph</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Comment fonctionne l’IA d’ASYT sans hallucination ?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Contrairement au RAG vectoriel simple qui mélange des bribes de texte sans logique de causalité, ASYT superpose un <strong className="text-cyan-300">Graphe de Connaissances</strong> pour lier documents, règles juridiques et hiérarchies métier.
          </p>
        </div>

        <button
          onClick={() =>
            runSimulation(
              'Vérifier les droits de propriété intellectuelle du Projet Phoenix et les contraintes de déploiement ISO 27001',
              ['contract_2025', 'clause_rd', 'project_phoenix', 'cluster_onprem']
            )
          }
          disabled={isSimulating}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
        >
          <Play className={`w-4 h-4 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'Simulation en cours...' : 'Lancer une requête en direct'}</span>
        </button>
      </div>

      {/* 6-Stage Pipeline Flow */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Pipeline de Traitement Souverain (100% In-Situ)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Étape active : {activeStage > 0 ? `${activeStage}/6` : 'En veille'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5">
          {stages.map((stg) => {
            const Icon = stg.icon;
            const isCurrent = activeStage === stg.num;
            const isCompleted = activeStage > stg.num;

            return (
              <div
                key={stg.num}
                className={`relative rounded-xl p-3 border transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-500/20 shadow-lg shadow-cyan-500/10'
                    : isCompleted
                    ? 'bg-slate-950/70 border-emerald-500/40 text-slate-300'
                    : 'bg-slate-950/50 border-slate-800/80 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                        isCurrent
                          ? 'bg-cyan-400 text-slate-950 animate-pulse'
                          : isCompleted
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isCompleted ? '✓' : stg.num}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isCurrent ? 'text-cyan-300' : isCompleted ? 'text-emerald-400' : 'text-slate-500'
                      }`}
                    />
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight">{stg.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{stg.desc}</p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/80 text-[9px] font-mono text-cyan-400/90 truncate">
                  {stg.tech}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Knowledge Graph & Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Graph Canvas Visualizer */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/70 border border-slate-800 p-4 relative overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-2 z-10">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Explorateur de Graphe Sémantique (Données Entreprise Fictives)
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Cliquez sur un nœud pour inspecter</span>
          </div>

          {/* SVG Canvas */}
          <div className="relative w-full h-[360px] bg-slate-950/70 rounded-xl border border-slate-800/80 overflow-hidden flex items-center justify-center">
            {/* Background cyber grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

            <svg viewBox="0 0 760 400" className="w-full h-full select-none">
              {/* Edges */}
              {SAMPLE_EDGES.map((edge) => {
                const source = SAMPLE_NODES.find((n) => n.id === edge.source);
                const target = SAMPLE_NODES.find((n) => n.id === edge.target);
                if (!source || !target) return null;

                const isEdgeActive =
                  activeHighlightNodes.includes(edge.source) && activeHighlightNodes.includes(edge.target);

                return (
                  <g key={edge.id}>
                    <line
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={isEdgeActive ? '#00f0ff' : '#1e293b'}
                      strokeWidth={isEdgeActive ? 2.5 : 1.5}
                      strokeDasharray={isEdgeActive ? '6,3' : undefined}
                      className={isEdgeActive ? 'animate-pulse' : ''}
                    />
                    {/* Edge Label Pill */}
                    <rect
                      x={(source.x + target.x) / 2 - 28}
                      y={(source.y + target.y) / 2 - 8}
                      width={56}
                      height={16}
                      rx={4}
                      fill="#0b1120"
                      stroke={isEdgeActive ? '#06b6d4' : '#1e293b'}
                      strokeWidth={1}
                    />
                    <text
                      x={(source.x + target.x) / 2}
                      y={(source.y + target.y) / 2 + 3}
                      textAnchor="middle"
                      fill={isEdgeActive ? '#67e8f9' : '#64748b'}
                      fontSize={9}
                      fontFamily="monospace"
                    >
                      {edge.label}
                    </text>
                  </g>
                );
              })}

              {/* Nodes */}
              {SAMPLE_NODES.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const isHighlighted = activeHighlightNodes.includes(node.id);

                let fillBg = '#0f172a';
                let strokeColor = '#334155';
                if (node.category === 'document') {
                  strokeColor = '#06b6d4';
                } else if (node.category === 'rule') {
                  strokeColor = '#f59e0b';
                } else if (node.category === 'security') {
                  strokeColor = '#10b981';
                } else if (node.category === 'entity') {
                  strokeColor = '#8b5cf6';
                }

                if (isHighlighted) {
                  strokeColor = '#00f0ff';
                }

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer transition-transform hover:scale-105"
                  >
                    {/* Glow circle if highlighted or selected */}
                    {(isHighlighted || isSelected) && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={34}
                        fill="none"
                        stroke="#00f0ff"
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                        opacity={0.7}
                        className="animate-spin-slow"
                      />
                    )}

                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={24}
                      fill={isSelected ? '#164e63' : fillBg}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? 3 : 2}
                    />

                    {/* Node center indicator */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={7}
                      fill={isHighlighted ? '#00f0ff' : strokeColor}
                    />

                    {/* Label */}
                    <text
                      x={node.x}
                      y={node.y + 38}
                      textAnchor="middle"
                      fill={isSelected ? '#ffffff' : '#cbd5e1'}
                      fontSize={11}
                      fontWeight="600"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Preset Queries */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Tester une autre requête :</span>
            </span>
            <button
              onClick={() =>
                runSimulation(
                  'Quel cluster est qualifié SecNumCloud et ISO 27001 pour le traitement de données confidentielles ?',
                  ['iso_27001', 'cluster_onprem', 'legal_dept']
                )
              }
              className="px-2.5 py-1 rounded-lg text-xs bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 border border-slate-700"
            >
              Certification ISO 27001
            </button>
            <button
              onClick={() =>
                runSimulation(
                  'Quelles sont les clauses de non-divulgation qui s’appliquent à la R&D ?',
                  ['contract_2025', 'clause_rd']
                )
              }
              className="px-2.5 py-1 rounded-lg text-xs bg-slate-800/80 hover:bg-slate-700/80 text-emerald-300 border border-slate-700"
            >
              Clause R&D & Confidentialité
            </button>
          </div>
        </div>

        {/* Node Details Inspector & Simulation Result */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Selected Node Card */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Propriétés du Nœud</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                {selectedNode?.category}
              </span>
            </div>

            {selectedNode ? (
              <div className="space-y-3">
                <h4 className="text-base font-bold text-white">{selectedNode.label}</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  {selectedNode.summary}
                </p>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Extrait textuel indexé :</span>
                  <div className="text-xs text-emerald-300 font-mono bg-slate-950/80 p-3 rounded-xl border border-emerald-500/20 mt-1 leading-relaxed">
                    {selectedNode.details}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() =>
                      onAskVoice(`Explique-moi les liens entre ${selectedNode.label} et la sécurité ASYT`)
                    }
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors"
                  >
                    <span>Interroger ASYT sur ce nœud</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Sélectionnez un nœud sur le graphe pour inspecter son contenu.</p>
            )}
          </div>

          {/* Generated Result Output */}
          {simulationResult && (
            <div className="rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900/90 to-slate-950 border border-cyan-500/30 p-4 animate-fadeIn">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Réponse Générée par le LLM Local</span>
              </div>
              <pre className="text-xs text-slate-200 font-sans whitespace-pre-wrap leading-relaxed">
                {simulationResult}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
