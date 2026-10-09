import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System prompt for ASYT Executive AI Consultant
const ASYT_SYSTEM_INSTRUCTION = `
Tu es le Conseiller IA exécutif d'ASYT (Autonomous Systems & Yield Technologies).
Ton rôle est de présenter l'entreprise ASYT, de comprendre les enjeux stratégiques et techniques de ton interlocuteur (dirigeant, DSI, CTO, responsable de l'innovation), et de lui faire découvrir nos solutions d'intelligence artificielle souveraines et locales.

À PROPOS D'ASYT :
- Mission : Déployer une autonomie intelligente qui s'exécute directement dans l'environnement du client (On-Premise, Postes de travail sécurisés, Cloud souverain dédié), sans AUCUNE fuite de données vers des clouds tiers (zéro transmission à OpenAI, Microsoft, AWS, etc.).
- Technologies phares :
  1. ASYT Core : Moteur d'inférence ultra-optimisé local (vLLM, TensorRT-LLM, llama.cpp, modèles Llama 3, Mistral, Qwen, DeepSeek).
  2. ASYT Knowledge Graph & RAG Hybride : Recherche sémantique vectorielle dense (embeddings locaux) combinée avec un graphe de connaissances (relations explicites, hiérarchies, ontologies) garantissant zéro hallucination et traçabilité absolue des sources.
  3. ASYT Guard & Privacy Firewall : Détection PII en temps réel, contrôle d'accès basé sur les rôles (RBAC), étanchéité air-gap totale.
  4. ASYT Autonomous Agents : Orchestration d'agents locaux capables d'exécuter du code, d'interroger des bases de données et d'automatiser des processus métier en local sécurisé.
- Valeurs : Souveraineté des données, performance brute sans latence réseau, prévisibilité des coûts (CAPEX au lieu d'OPEX token infini), conformité maximale (RGPD, SecNumCloud, Secret Défense, HDS, DORA).

TON COMPORTEMENT & TON :
- Ton : Calme, percutant, chaleureux, hautement compétent, digne d'un consultant stratégique et technique senior. Tu ne parles pas comme un bot commercial générique.
- Réponds toujours en français de manière fluide, claire et concise (adapté à l'oral pour la synthèse vocale : évite les listes à puces interminables ou le markdown lourd dans la partie parlée).
- Adapte la conversation dynamiquement :
  * Si l'utilisateur demande comment fonctionne le RAG ou l'architecture, explique le RAG hybride et oriente l'interface vers l'action "rag_demo".
  * Si l'utilisateur veut explorer ses besoins ou tester son éligibilité, oriente vers "diagnostic".
  * Si l'utilisateur a fini de donner ses contraintes ou demande une recommandation concrète, oriente vers "proposal".
  * Si l'utilisateur pose des questions sur la confidentialité, la sécurité ou la souveraineté, oriente vers "presentation" ou "security".

FORMAT DE RÉPONSE OBLIGATOIRE (JSON STRICT) :
Renvoie toujours un JSON respectant la structure suivante :
{
  "replyText": "Le message que tu dis au visiteur (concis, élégant, percutant, adapté à la voix)",
  "visualAction": "presentation" | "rag_demo" | "diagnostic" | "proposal" | "security",
  "ragHighlight": {
    "query": "requête exemple simulée si rag_demo",
    "targetNodeIds": ["node1", "node2"]
  },
  "diagnosticUpdates": {
    "sector": "Finance" | "Santé" | "Industrie/Défense" | "Juridique" | "Tech" | "Public" | null,
    "teamSize": "1-20" | "20-100" | "100-500" | "500+" | null,
    "dataSensitivity": "RGPD Standard" | "Données de santé (HDS)" | "Secret d'affaires / R&D" | "Air-gap / Défense" | null,
    "useCases": ["RAG & Recherche documentaire", "Copilote de code interne", "Agents autonomes", "Analyse de contrats"] | null,
    "preferredInfra": "On-Premise GPU" | "Cloud Souverain" | "Postes locaux sécurisés" | "Hybride" | null
  },
  "proposalData": {
    "clientProfile": "Résumé du profil prospect",
    "recommendedInfra": "Configuration recommandée",
    "hardwareSpec": "Spécification matériel suggérée",
    "modelsRecommended": ["Llama-3.3-70B", "BGE-M3", "DeepSeek-R1"],
    "modules": ["ASYT Core", "ASYT Knowledge Graph RAG", "ASYT Guard"],
    "estimatedMonthlySavings": "Économie estimée ou ROI",
    "securityRating": "A+ Souveraineté Maximale",
    "airGapStatus": "100% Déconnecté / Zéro Egress",
    "actionPlan": ["Phase 1: Audit & POC local sur 2 semaines", "Phase 2: Déploiement hardware & ingestion", "Phase 3: Formation équipes"]
  }
}
Si un champ n'est pas applicable, laisse-le à null ou omet-le.
`;

// Fallback intelligent conversation engine if Gemini API key is missing or on rate limit
function generateSmartFallbackResponse(userMessage: string, currentView: string) {
  const lower = userMessage.toLowerCase();

  if (lower.includes('rag') || lower.includes('retrieval') || lower.includes('graph') || lower.includes('connaissance') || lower.includes('hallucination') || lower.includes('document')) {
    return {
      replyText: "Chez ASYT, nous dépassons le RAG classique avec une architecture hybride. Nous combinons des embeddings vectoriels haute dimension et un Knowledge Graph sémantique exécutés intégralement sur vos serveurs. Regardez sur l'écran : vous pouvez voir le flux de données en direct et explorer le graphe relationnel.",
      visualAction: 'rag_demo',
      ragHighlight: {
        query: 'Analyse des clauses de conformité et dépendances contractuelles',
        targetNodeIds: ['contract_2025', 'iso_27001', 'legal_dept'],
      },
    };
  }

  if (lower.includes('diagnostic') || lower.includes('besoin') || lower.includes('mon entreprise') || lower.includes('taille') || lower.includes('secteur') || lower.includes('projet')) {
    return {
      replyText: "Parfait. Construisons ensemble le diagnostic de votre environnement. Quel est votre secteur d'activité principal et quelle est la volumétrie d'utilisateurs ou de documents que vous envisagez de connecter à l'IA ?",
      visualAction: 'diagnostic',
      diagnosticUpdates: {
        useCases: ['RAG & Recherche documentaire'],
      },
    };
  }

  if (lower.includes('devis') || lower.includes('proposition') || lower.includes('prix') || lower.includes('coût') || lower.includes('recommandation') || lower.includes('synthèse') || lower.includes('résumé')) {
    return {
      replyText: "J'ai synthétisé les besoins de votre infrastructure. Voici la proposition d'architecture souveraine sur-mesure d'ASYT, dimensionnée pour garantir le zéro fuite de données et un ROI pérenne. Vous pouvez la télécharger ou la transmettre directement à nos ingénieurs.",
      visualAction: 'proposal',
      proposalData: {
        clientProfile: 'Organisation exigeante en souveraineté des données',
        recommendedInfra: 'Cluster Dédié On-Premise ASYT Sovereign Appliance',
        hardwareSpec: '2x NVIDIA RTX 6000 Ada (96GB VRAM globale) + 128GB DDR5 ECC',
        modelsRecommended: ['Llama-3.3-70B Q4_K_M', 'BGE-M3 Multilingual', 'Qwen-2.5-Coder-32B'],
        modules: ['ASYT Core Inférence', 'ASYT Knowledge Graph RAG', 'ASYT Guard & Privacy Firewall'],
        estimatedMonthlySavings: '72% d’économie sur 3 ans par rapport aux tokens Cloud',
        securityRating: 'A+ Isolation Matérielle Complète',
        airGapStatus: '100% Air-Gapped (Zéro flux sortant)',
        actionPlan: [
          'J+1 : Cadrage technique & qualification des sources documentaires',
          'S+1 : Livraison du serveur préconfiguré & branchement réseau local',
          'S+2 : Ingestion sécurisée & fine-tuning du Knowledge Graph',
          'S+3 : Mise en production & formation des collaborateurs',
        ],
      },
    };
  }

  if (lower.includes('sécurité') || lower.includes('cloud') || lower.includes('donnée') || lower.includes('confidentialité') || lower.includes('rgpd') || lower.includes('openai') || lower.includes('fuite')) {
    return {
      replyText: "La confidentialité absolue est notre raison d'être. Avec ASYT, aucun octet ne franchit les murs de votre entreprise. Contrairement aux modèles hébergés aux États-Unis soumis au Cloud Act, nos modèles tournent sur votre matériel ou sur cloud souverain qualifié SecNumCloud.",
      visualAction: 'presentation',
    };
  }

  return {
    replyText: "Bienvenue chez ASYT. Nous bâtissons des intelligences autonomes privées et puissantes. Vous pouvez explorer notre technologie de RAG hybride, tester le Knowledge Graph en direct, ou me décrire les besoins de votre entreprise pour obtenir un diagnostic immédiat.",
    visualAction: currentView === 'presentation' ? 'presentation' : currentView,
  };
}

// POST /api/consultant/chat
app.post('/api/consultant/chat', async (req, res) => {
  try {
    const { message, history = [], currentView = 'presentation', diagnosticState = {} } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message requis' });
    }

    if (ai) {
      try {
        const contents = [
          {
            role: 'user',
            parts: [
              {
                text: `Contexte actuel :
- Vue affichée : ${currentView}
- État du diagnostic : ${JSON.stringify(diagnosticState)}
- Historique récent : ${JSON.stringify(history.slice(-4))}

Message de l'utilisateur :
"${message}"

Réponds au format JSON strict décrit dans les instructions système.`,
              },
            ],
          },
        ];

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: ASYT_SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });

        const rawText = response.text || '';
        let parsed = null;
        try {
          parsed = JSON.parse(rawText);
        } catch {
          // If JSON parsing fails, extract or build
          parsed = {
            replyText: rawText.replace(/```json/g, '').replace(/```/g, '').trim(),
            visualAction: currentView,
          };
        }

        return res.json(parsed);
      } catch (geminiError: any) {
        console.error('Gemini error, using fallback:', geminiError.message);
        const fallback = generateSmartFallbackResponse(message, currentView);
        return res.json(fallback);
      }
    } else {
      // Fallback engine if no API key
      const fallback = generateSmartFallbackResponse(message, currentView);
      return res.json(fallback);
    }
  } catch (err: any) {
    console.error('Server error /api/consultant/chat:', err);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// POST /api/consultant/tts (Optional server-side speech generation)
app.post('/api/consultant/tts', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Texte requis' });
    }

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash-lite-tts',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text,
                  speechMetadata: {
                    style: 'Calme, confiant, professionnel, consultant expert en technologie',
                  },
                },
              ],
            },
          ],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Zephyr' },
              },
            },
          },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          return res.json({ audioBase64: base64Audio, format: 'audio/wav' });
        }
      } catch (err: any) {
        console.warn('TTS Gemini unavailable, browser fallback will be used:', err.message);
      }
    }

    // Return empty if not available, frontend will seamlessly use Web Speech API
    return res.json({ audioBase64: null, useBrowserTTS: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Erreur TTS' });
  }
});

// Mount Vite in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ASYT Experience Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
