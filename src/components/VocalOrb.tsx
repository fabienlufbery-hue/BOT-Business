import React, { useEffect, useRef } from 'react';
import { ConsultantState } from '../types';
import { Mic, MicOff, Volume2, Sparkles, StopCircle, RefreshCw } from 'lucide-react';

interface VocalOrbProps {
  state: ConsultantState;
  audioLevel?: number; // 0 to 1
  onClick: () => void;
  onInterrupt: () => void;
  isListening: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  captionText?: string;
}

export const VocalOrb: React.FC<VocalOrbProps> = ({
  state,
  audioLevel = 0,
  onClick,
  onInterrupt,
  isListening,
  isMuted,
  onToggleMute,
  captionText,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);
  const currentLevelRef = useRef<number>(0);

  // Smooth lerp for audioLevel
  useEffect(() => {
    currentLevelRef.current = audioLevel;
  }, [audioLevel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = 380);
    let height = (canvas.height = 380);
    const centerX = width / 2;
    const centerY = height / 2;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      phaseRef.current += 0.035;
      const phase = phaseRef.current;

      // Base radius and dynamic reactivity based on state
      let baseRadius = 68;
      let pulseAmp = 0;
      let coreColor = 'rgba(0, 240, 255, ';
      let ringColor = 'rgba(6, 182, 212, ';
      let accentColor = 'rgba(16, 185, 129, ';

      if (state === 'listening') {
        baseRadius = 74;
        pulseAmp = 12 * Math.sin(phase * 2) + currentLevelRef.current * 30;
        coreColor = 'rgba(16, 185, 129, '; // emerald listening
        ringColor = 'rgba(52, 211, 153, ';
        accentColor = 'rgba(0, 240, 255, ';
      } else if (state === 'thinking') {
        baseRadius = 70;
        pulseAmp = 6 * Math.sin(phase * 4);
        coreColor = 'rgba(139, 92, 246, '; // purple thinking
        ringColor = 'rgba(192, 132, 252, ';
        accentColor = 'rgba(56, 189, 248, ';
      } else if (state === 'speaking') {
        baseRadius = 76;
        const speechShake = Math.sin(phase * 6) * 8 + Math.cos(phase * 3.5) * 6;
        pulseAmp = speechShake + (currentLevelRef.current > 0 ? currentLevelRef.current * 35 : 14);
        coreColor = 'rgba(0, 240, 255, '; // radiant cyan
        ringColor = 'rgba(45, 212, 191, ';
        accentColor = 'rgba(129, 140, 248, ';
      } else {
        // idle
        pulseAmp = 5 * Math.sin(phase * 0.9);
      }

      const activeRadius = Math.max(30, baseRadius + pulseAmp);

      // 1. Deep outer ambient aura
      const auraGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        activeRadius * 0.4,
        centerX,
        centerY,
        activeRadius * 2.2
      );
      auraGradient.addColorStop(0, `${coreColor}0.45)`);
      auraGradient.addColorStop(0.5, `${ringColor}0.15)`);
      auraGradient.addColorStop(1, 'rgba(4, 6, 12, 0)');

      ctx.save();
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, activeRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Rotating Segmented Outer Tech Rings
      const ringRot1 = phase * 0.4;
      const ringRot2 = -phase * 0.25;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(ringRot1);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `${ringColor}0.35)`;
      ctx.setLineDash([14, 18, 4, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, activeRadius + 38, 0, Math.PI * 2);
      ctx.stroke();

      // Orbital micro particles
      for (let i = 0; i < 4; i++) {
        const pAngle = (Math.PI / 2) * i + phase * 0.8;
        const px = Math.cos(pAngle) * (activeRadius + 38);
        const py = Math.sin(pAngle) * (activeRadius + 38);
        ctx.fillStyle = `${coreColor}0.8)`;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(ringRot2);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `${accentColor}0.3)`;
      ctx.setLineDash([28, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, activeRadius + 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 3. Fluid undulating harmonic wave boundary
      const wavePoints = 48;
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i <= wavePoints; i++) {
        const theta = (i / wavePoints) * Math.PI * 2;
        const wave1 = Math.sin(theta * 6 + phase * 2.5) * (state === 'speaking' ? 7 : 3.5);
        const wave2 = Math.cos(theta * 4 - phase * 1.8) * (state === 'listening' ? 6 : 2.5);
        const r = activeRadius + wave1 + wave2;
        const x = centerX + Math.cos(theta) * r;
        const y = centerY + Math.sin(theta) * r;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();

      const coreGradient = ctx.createRadialGradient(
        centerX - activeRadius * 0.25,
        centerY - activeRadius * 0.25,
        5,
        centerX,
        centerY,
        activeRadius
      );
      coreGradient.addColorStop(0, '#ffffff');
      coreGradient.addColorStop(0.25, `${coreColor}0.95)`);
      coreGradient.addColorStop(0.7, `${ringColor}0.85)`);
      coreGradient.addColorStop(1, `${accentColor}0.4)`);

      ctx.fillStyle = coreGradient;
      ctx.shadowColor = `${coreColor}0.8)`;
      ctx.shadowBlur = state === 'speaking' || state === 'listening' ? 38 : 22;
      ctx.fill();
      ctx.restore();

      // 4. Central Autonomous Energy Core
      const innerRadius = activeRadius * 0.42;
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
      const innerGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, innerRadius);
      innerGrad.addColorStop(0, '#ffffff');
      innerGrad.addColorStop(0.6, `${coreColor}0.9)`);
      innerGrad.addColorStop(1, 'rgba(5, 10, 20, 0.2)');
      ctx.fillStyle = innerGrad;
      ctx.fill();

      // Neural synapsis spark lines inside the core
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 1.2;
      for (let j = 0; j < 3; j++) {
        const sPhase = phase * 1.5 + (j * Math.PI) / 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX - Math.cos(sPhase) * (innerRadius * 0.6), centerY - Math.sin(sPhase) * (innerRadius * 0.6));
        ctx.quadraticCurveTo(
          centerX + Math.sin(phase * 2) * 8,
          centerY + Math.cos(phase * 2) * 8,
          centerX + Math.cos(sPhase) * (innerRadius * 0.6),
          centerY + Math.sin(sPhase) * (innerRadius * 0.6)
        );
        ctx.stroke();
      }
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [state]);

  const getStateDetails = () => {
    switch (state) {
      case 'listening':
        return {
          label: 'Écoute active...',
          color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40',
          sub: 'Parlez naturellement ou posez votre question',
        };
      case 'thinking':
        return {
          label: 'Synthèse en cours...',
          color: 'text-purple-300 border-purple-500/40 bg-purple-950/40',
          sub: 'Analyse souveraine locale & raisonnement RAG',
        };
      case 'speaking':
        return {
          label: 'ASYT vous répond',
          color: 'text-cyan-300 border-cyan-500/40 bg-cyan-950/40',
          sub: 'Cliquez pour interrompre à tout moment',
        };
      default:
        return {
          label: 'Conseiller IA Prêt',
          color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30',
          sub: 'Cliquez sur l’orbe ou le micro pour démarrer',
        };
    }
  };

  const stateDetails = getStateDetails();

  return (
    <div className="flex flex-col items-center justify-center select-none relative">
      {/* Background radial glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div
          className={`w-72 h-72 rounded-full blur-3xl transition-all duration-700 ${
            state === 'listening'
              ? 'bg-emerald-500/15'
              : state === 'speaking'
              ? 'bg-cyan-500/20'
              : state === 'thinking'
              ? 'bg-purple-600/20'
              : 'bg-cyan-600/10'
          }`}
        />
      </div>

      {/* The Interactive Canvas Orb */}
      <div
        onClick={state === 'speaking' ? onInterrupt : onClick}
        className="relative cursor-pointer group flex items-center justify-center p-2 rounded-full transition-transform active:scale-95"
        title={state === 'speaking' ? 'Interrompre' : 'Parler à ASYT'}
      >
        <canvas ref={canvasRef} className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]" />

        {/* Floating action overlay icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="px-3 py-1.5 rounded-full bg-slate-900/85 border border-cyan-500/40 backdrop-blur-md text-xs font-medium text-cyan-200 shadow-xl flex items-center gap-1.5">
            {state === 'speaking' ? (
              <>
                <StopCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Interrompre</span>
              </>
            ) : isListening ? (
              <>
                <Mic className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Terminer la parole</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Parler à ASYT</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Status Badge & Subtext */}
      <div className="flex flex-col items-center mt-1 text-center max-w-sm">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md transition-all duration-300 ${stateDetails.color}`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              state === 'listening'
                ? 'bg-emerald-400 animate-ping'
                : state === 'speaking'
                ? 'bg-cyan-300 animate-pulse'
                : state === 'thinking'
                ? 'bg-purple-400 animate-spin'
                : 'bg-cyan-400'
            }`}
          />
          {stateDetails.label}
        </div>
        <p className="text-xs text-slate-400 mt-1.5">{stateDetails.sub}</p>
      </div>

      {/* Audio Waveform Equalizer (when speaking or listening) */}
      <div className="flex items-center justify-center gap-1 h-6 my-2 px-4">
        {[40, 75, 55, 90, 65, 30, 85, 45, 95, 60, 35, 70].map((h, idx) => {
          const isActive = state === 'speaking' || state === 'listening';
          const heightPx = isActive
            ? Math.max(4, Math.round((h * (state === 'speaking' ? 0.8 : 0.6)) * (0.4 + Math.random() * 0.6)))
            : 3;
          return (
            <div
              key={idx}
              className={`w-1 rounded-full transition-all duration-150 ${
                state === 'listening'
                  ? 'bg-emerald-400'
                  : state === 'speaking'
                  ? 'bg-cyan-400'
                  : state === 'thinking'
                  ? 'bg-purple-400'
                  : 'bg-slate-700'
              }`}
              style={{ height: `${heightPx}px` }}
            />
          );
        })}
      </div>

      {/* Live Vocal Transcription Streamer */}
      {captionText && (
        <div className="w-full max-w-md px-4 py-2 mt-1 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md text-slate-300 text-xs sm:text-sm text-center leading-relaxed animate-fadeIn line-clamp-3">
          <span className="text-cyan-400 font-semibold mr-1.5">ASYT :</span>
          &ldquo;{captionText}&rdquo;
        </div>
      )}

      {/* Primary Voice Interaction Bar */}
      <div className="flex items-center gap-2.5 mt-3">
        <button
          onClick={onClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-lg ${
            isListening
              ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/25 ring-2 ring-emerald-400'
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/25 active:scale-95'
          }`}
        >
          <Mic className={`w-4 h-4 ${isListening ? 'animate-bounce' : ''}`} />
          <span>{isListening ? 'Arrêter d’écouter' : 'Parler à ASYT'}</span>
        </button>

        {state === 'speaking' && (
          <button
            onClick={onInterrupt}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition-colors"
            title="Couper la parole"
          >
            <StopCircle className="w-4 h-4" />
            <span>Interrompre</span>
          </button>
        )}

        <button
          onClick={onToggleMute}
          className={`p-2 rounded-xl border transition-colors ${
            isMuted
              ? 'bg-slate-800 text-slate-400 border-slate-700'
              : 'bg-slate-900/80 text-cyan-400 border-cyan-500/30 hover:border-cyan-500/60'
          }`}
          title={isMuted ? 'Activer la voix' : 'Couper la voix'}
        >
          <Volume2 className={`w-4 h-4 ${isMuted ? 'opacity-40' : ''}`} />
        </button>
      </div>
    </div>
  );
};
