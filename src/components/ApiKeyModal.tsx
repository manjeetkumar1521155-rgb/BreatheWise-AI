import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Key, X, Check, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export const ApiKeyModal: React.FC = () => {
  const { isApiKeyModalOpen, setIsApiKeyModalOpen, geminiApiKey, setGeminiApiKey } = useApp();
  const [tempKey, setTempKey] = useState<string>(geminiApiKey);

  if (!isApiKeyModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setGeminiApiKey(tempKey.trim());
    setIsApiKeyModalOpen(false);
  };

  const handleClear = () => {
    setTempKey('');
    setGeminiApiKey('');
    setIsApiKeyModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl relative">
        <button
          onClick={() => setIsApiKeyModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Gemini API Settings</h3>
          </div>
          <p className="text-xs text-slate-300">
            Connect your Google Gemini API key to activate live generative reasoning, or use the pre-calibrated offline clinical reasoning engine.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Google Gemini API Key
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-purple-400"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Stored securely in your local browser storage. Never sent to any third party.
            </span>
          </div>

          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 space-y-1 text-purple-200">
            <div className="flex items-center gap-1.5 font-bold text-purple-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offline Intelligence Ready</span>
            </div>
            <p className="text-[11px] text-purple-200/90 leading-relaxed">
              If no API key is provided, BreatheWise uses its built-in rule and domain-knowledge engine with comprehensive winter inversion protocols and direct impact calculations.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            {geminiApiKey ? (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-1.5 rounded-lg text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/40 border border-rose-800/50"
              >
                Clear Key
              </button>
            ) : <div />}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsApiKeyModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md shadow-purple-600/30"
              >
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
