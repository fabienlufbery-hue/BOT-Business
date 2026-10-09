import { useState, useEffect, useRef, useCallback } from 'react';
import { ConsultantState, ChatMessage, ActiveView, DiagnosticState, ProposalData } from '../types';

const INITIAL_GREETING =
  "Bonjour, bienvenue chez ASYT. Je suis votre conseiller IA. Nous concevons des solutions d'intelligence artificielle qui fonctionnent directement dans votre environnement, sans dépendance au cloud pour vos données internes. Vous souhaitez découvrir notre technologie ou réfléchir à son utilisation dans votre entreprise ?";

export function useVoiceConsultant(
  currentView: ActiveView,
  onViewChange: (view: ActiveView) => void,
  diagnosticState: DiagnosticState,
  onUpdateDiagnostic: (updates: Partial<DiagnosticState>) => void,
  onUpdateProposal: (updates: Partial<ProposalData>) => void
) {
  const [state, setState] = useState<ConsultantState>('idle');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentCaption, setCurrentCaption] = useState<string>('');
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const audioIntervalRef = useRef<any>(null);

  // Initialize SpeechSynthesis and pick high quality French voice
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const pickVoice = () => {
        const voices = synthRef.current?.getVoices() || [];
        // Look for natural French voices
        const frVoice =
          voices.find((v) => v.lang.startsWith('fr') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Neural'))) ||
          voices.find((v) => v.lang.startsWith('fr') && !v.name.includes('compact')) ||
          voices.find((v) => v.lang.startsWith('fr')) ||
          voices[0];
        if (frVoice) {
          selectedVoiceRef.current = frVoice;
        }
      };

      pickVoice();
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = pickVoice;
      }
    }
  }, []);

  // Initialize SpeechRecognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'fr-FR';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
          setState('listening');
          // Start simulated audio level fluctuations for mic
          if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
          audioIntervalRef.current = setInterval(() => {
            setAudioLevel(0.2 + Math.random() * 0.7);
          }, 100);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript && transcript.trim()) {
            handleSendMessage(transcript.trim());
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('SpeechRecognition error:', event.error);
          setIsListening(false);
          setState('idle');
          if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
          setAudioLevel(0);
        };

        recognition.onend = () => {
          setIsListening(false);
          if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
          setAudioLevel(0);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, []);

  // Function to speak text using Web Speech API
  const speakText = useCallback(
    (text: string) => {
      if (isMuted || !synthRef.current) {
        setState('idle');
        return;
      }

      // Stop previous utterance
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoiceRef.current) {
        utterance.voice = selectedVoiceRef.current;
      }
      utterance.lang = 'fr-FR';
      utterance.rate = 1.05; // natural consultant cadence
      utterance.pitch = 0.98;

      utterance.onstart = () => {
        setState('speaking');
        setCurrentCaption(text);
        if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
        audioIntervalRef.current = setInterval(() => {
          setAudioLevel(0.3 + Math.random() * 0.7);
        }, 80);
      };

      utterance.onend = () => {
        setState('idle');
        if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
        setAudioLevel(0);
      };

      utterance.onerror = () => {
        setState('idle');
        if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
        setAudioLevel(0);
      };

      synthRef.current.speak(utterance);
    },
    [isMuted]
  );

  // Interrupt AI speaking immediately
  const interrupt = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    setAudioLevel(0);
    setState('idle');
    setIsListening(false);
  }, [isListening]);

  // Start Voice Session (First greeting)
  const startSession = useCallback(() => {
    setHasStarted(true);
    interrupt();

    const greetingMsg: ChatMessage = {
      id: 'msg-greeting',
      role: 'assistant',
      text: INITIAL_GREETING,
      timestamp: Date.now(),
      visualAction: 'presentation',
    };

    setMessages([greetingMsg]);
    speakText(INITIAL_GREETING);
  }, [interrupt, speakText]);

  // Toggle user voice listening (Mic)
  const toggleListening = useCallback(() => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setState('idle');
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setAudioLevel(0);
    } else {
      // Cut any active speech first
      interrupt();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (err) {
          console.warn('Recognition start error:', err);
        }
      } else {
        // Fallback alert prompt if browser does not support Web Speech Recognition
        const fallbackText = window.prompt(
          'Votre navigateur ne supporte pas la reconnaissance vocale directe. Tapez votre question pour ASYT :'
        );
        if (fallbackText) {
          handleSendMessage(fallbackText);
        }
      }
    }
  }, [isListening, interrupt]);

  // Send message to server backend and process response
  const handleSendMessage = useCallback(
    async (userText: string) => {
      if (!userText.trim()) return;

      interrupt();

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        text: userText,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setState('thinking');

      try {
        const res = await fetch('/api/consultant/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userText,
            history: messages.slice(-6),
            currentView,
            diagnosticState,
          }),
        });

        if (!res.ok) {
          throw new Error('Erreur de réponse serveur');
        }

        const data = await res.json();
        const replyText = data.replyText || "Je vous écoute. Comment puis-je vous accompagner sur vos choix d'IA ?";

        const assistantMsg: ChatMessage = {
          id: `asyt-${Date.now()}`,
          role: 'assistant',
          text: replyText,
          timestamp: Date.now(),
          visualAction: data.visualAction,
          ragHighlight: data.ragHighlight,
        };

        setMessages((prev) => [...prev, assistantMsg]);

        // Process visual action transition
        if (data.visualAction && data.visualAction !== currentView) {
          onViewChange(data.visualAction);
        }

        // Process diagnostic updates if any
        if (data.diagnosticUpdates) {
          onUpdateDiagnostic(data.diagnosticUpdates);
        }

        // Process proposal updates if any
        if (data.proposalData) {
          onUpdateProposal(data.proposalData);
        }

        // Speak response
        speakText(replyText);
      } catch (err) {
        console.error('Error in consultant chat:', err);
        const fallbackMsg: ChatMessage = {
          id: `asyt-fallback-${Date.now()}`,
          role: 'assistant',
          text: "Je suis à votre disposition pour détailler nos solutions d'intelligence artificielle locale et souveraine.",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, fallbackMsg]);
        speakText(fallbackMsg.text);
      }
    },
    [currentView, diagnosticState, messages, interrupt, onViewChange, onUpdateDiagnostic, onUpdateProposal, speakText]
  );

  const toggleMute = () => {
    if (!isMuted) {
      if (synthRef.current) synthRef.current.cancel();
      setState('idle');
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setAudioLevel(0);
    }
    setIsMuted(!isMuted);
  };

  return {
    state,
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
    speakText,
  };
}
