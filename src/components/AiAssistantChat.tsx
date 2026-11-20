import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { GeminiService, AssistantResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  RotateCcw, 
  ShieldCheck, 
  Key, 
  ArrowRight,
  Info
} from 'lucide-react';

export const AiAssistantChat: React.FC = () => {
  const { profile, airData, geminiApiKey, setIsApiKeyModalOpen } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: `### 👋 Welcome to AeroGuide AI!

I am your clinical air quality and low-emission lifestyle assistant. I am currently monitoring the winter inversion in **${airData.cityName}** (AQI: ${airData.currentAqi}, PM2.5: ${airData.pm25} µg/m³).

I see your household has **${profile.familyMembersCount} family members** ${profile.vulnerabilities.length > 0 ? `including sensitive individuals (${profile.vulnerabilities.join(', ')})` : ''}.

Ask me anything about daily routines, protecting children or seniors, building DIY air cleaners, kitchen exhaust tactics, or low-emission heating.`,
      timestamp: 'Just now',
      suggestedPrompts: [
        'Can I take my child for a walk in the stroller today?',
        'How do I build a $50 Corsi-Rosenthal air purifier?',
        'Is it safe to go for a run at 7:00 AM?',
        'How to cook without spiking indoor PM2.5 and NO2?',
        'What hour today has the cleanest outdoor air?'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.sender === 'user' ? 'user' as const : 'model' as const,
          parts: [{ text: m.content }]
        }));

      const res: AssistantResponse = await GeminiService.askAssistant(
        query,
        profile,
        airData,
        history
      );

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: res.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: res.suggestedPrompts,
        directImpactData: res.directImpactData
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        content: "I encountered an error communicating with the model. Please check your network or API settings.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeech = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Strip markdown formatting symbols for clean text-to-speech
    const cleanText = text
      .replace(/#{1,6}\s?/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/`{1,3}[^`]*`{1,3}/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setMessages([messages[0]]);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl flex flex-col h-[750px] shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 shadow-md shadow-teal-500/20 text-slate-950">
            <Sparkles className="w-5 h-5 text-slate-950" />
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">AeroGuide AI Assistant</h3>
              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                geminiApiKey 
                  ? 'bg-purple-950/60 text-purple-300 border-purple-800/60' 
                  : 'bg-teal-950/60 text-teal-300 border-teal-800/60'
              }`}>
                {geminiApiKey ? 'Gemini 1.5 Flash' : 'Clinical AI Engine'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Calibrated for {profile.cityName} &middot; AQI {airData.currentAqi} &middot; {profile.familyMembersCount} household members
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!geminiApiKey && (
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="flex items-center gap-1 text-[11px] font-semibold text-purple-400 hover:text-purple-300 bg-purple-950/30 px-2.5 py-1 rounded-lg border border-purple-800/40"
            >
              <Key className="w-3 h-3" />
              <span>Connect Gemini Key</span>
            </button>
          )}

          <button
            onClick={resetChat}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {messages.map((message) => {
          const isUser = message.sender === 'user';

          return (
            <div
              key={message.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                isUser 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-2 max-w-[85%] sm:max-w-[88%]">
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                    : 'bg-slate-950/90 text-slate-200 border border-slate-800/80 rounded-tl-none shadow-md'
                }`}>
                  {/* Markdown-like formatting helper */}
                  <div className="space-y-2 whitespace-pre-line">
                    {message.content}
                  </div>

                  {/* Direct Impact Badge */}
                  {message.directImpactData && (
                    <div className="mt-3 pt-3 border-t border-slate-800 flex items-start gap-2 bg-teal-950/30 p-2.5 rounded-xl border border-teal-800/40 text-teal-200 text-xs">
                      <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-teal-300 font-bold block">
                          Direct Impact: {message.directImpactData.metric} ({message.directImpactData.value})
                        </strong>
                        <span className="text-[11px] text-teal-200/90">
                          {message.directImpactData.details}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Controls: Audio, Copy, Timestamp */}
                <div className={`flex items-center gap-2 text-[10px] text-slate-500 px-1 ${
                  isUser ? 'justify-end' : 'justify-start'
                }`}>
                  <span>{message.timestamp}</span>
                  {!isUser && (
                    <>
                      <button
                        onClick={() => handleSpeech(message.content)}
                        className="hover:text-slate-300 flex items-center gap-0.5"
                        title={isSpeaking ? 'Stop audio' : 'Listen with text-to-speech'}
                      >
                        {isSpeaking ? <VolumeX className="w-3 h-3 text-teal-400" /> : <Volume2 className="w-3 h-3" />}
                        <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                      </button>

                      <button
                        onClick={() => handleCopy(message.id, message.content)}
                        className="hover:text-slate-300 flex items-center gap-0.5"
                        title="Copy message"
                      >
                        {copiedId === message.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === message.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Suggested Follow-up chips */}
                {message.suggestedPrompts && message.suggestedPrompts.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {message.suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-[11px] text-left px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-teal-300 hover:text-white border border-teal-500/20 hover:border-teal-500/40 transition-all flex items-center gap-1"
                      >
                        <span>{prompt}</span>
                        <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-md mr-auto animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 rounded-tl-none text-xs text-slate-400 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-ping" />
              <span>Analyzing inversion meteorology & calculating personalized impact...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask AeroGuide about routines, indoor hacks, DIY air cleaners, or family health..."
            disabled={isLoading}
            className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-md shadow-teal-500/20 shrink-0"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
};
