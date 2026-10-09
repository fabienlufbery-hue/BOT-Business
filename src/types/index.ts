export type ConsultantState = 'idle' | 'listening' | 'thinking' | 'speaking';

export type ActiveView = 'presentation' | 'rag_demo' | 'diagnostic' | 'proposal' | 'security';

export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  timestamp: number;
  visualAction?: ActiveView;
  ragHighlight?: {
    query: string;
    targetNodeIds: string[];
  };
}

export interface DiagnosticState {
  sector: string;
  teamSize: string;
  dataSensitivity: string;
  useCases: string[];
  preferredInfra: string;
  notes?: string;
}

export interface ProposalData {
  clientProfile: string;
  recommendedInfra: string;
  hardwareSpec: string;
  modelsRecommended: string[];
  modules: string[];
  estimatedMonthlySavings: string;
  securityRating: string;
  airGapStatus: string;
  actionPlan: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  category: 'document' | 'concept' | 'rule' | 'entity' | 'security';
  summary: string;
  details: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}
