import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ConsultantState } from '../types';
import { Send, Mic, Sparkles, User, Bot, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface ConversationConsoleProps {
  messages: ChatMessage[];
  consultantState: ConsultantState;
  onSendMessage: (text: string) => void;
  onToggleMic: () => void;
  isListening: boolean;
  onReset: () => void;
}

const QUICK_PROMPTS = [
  'Expliquez-moi votre RAG local et Knowledge Graph',
  'Comment garantissez-vous le 0 fuite de données ?',
  'Lancer le diagnostic pour mon entreprise',
  'Quel équipement hardware préconisez-vous ?',
  'Comparer ASYT avec Azure et OpenAI',
];

export const ConversationConsole: React.FC<ConversationConsoleProps> = ({
  messages,
  consultantState,
  onSendMessage,
  onToggleMic,
  isListening,
  onReset,
}) => {
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, consultantState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div className="flex flex-col h-full rounded-2xl bg-slate-900/70 border border-slate-800/90 overflow-hidden backdrop-blur-md">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-bold text-white tracking-wide uppercase">
            Dialogue avec ASYT
          </span>
        </div>
        <button
          onClick={onReset}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          title="Réinitialiser l'échange"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[380px] sm:max-h-[460px]">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Bot className="w-8 h-8 text-cyan-400 mx-auto mb-2 opacity-80" />
            <p className="text-xs sm:text-sm">
              Cliquez sur « Parler à ASYT » ou sélectionnez une question ci-dessous pour démarrer.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                  isUser ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    isUser
                      ? 'bg-slate-800 text-slate-100 rounded-tr-none'
                      : 'bg-slate-950/90 text-slate-200 border border-slate-800 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })
        )}

        {consultantState === 'thinking' && (
          <div className="flex items-center gap-2 text-xs text-purple-300 animate-pulse bg-purple-950/30 p-2.5 rounded-xl border border-purple-500/20 max-w-fit">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>ASYT analyse votre requête en local...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="px-3 py-2 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(prompt)}
              className="shrink-0 px-2.5 py-1 rounded-lg text-[11px] bg-slate-800/70 hover:bg-slate-700/80 text-cyan-200 border border-slate-700/60 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input box */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800/80 bg-slate-950/80">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleMic}
            className={`p-2.5 rounded-xl transition-all ${
              isListening
                ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400 animate-pulse'
                : 'bg-slate-800 text-cyan-400 hover:bg-slate-700'
            }`}
            title={isListening ? 'Arrêter le micro' : 'Activer le micro'}
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder="Posez votre question à ASYT..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 text-slate-950 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
