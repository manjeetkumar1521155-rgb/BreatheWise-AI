import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { AqiRadar } from './components/AqiRadar';
import { DiurnalForecast } from './components/DiurnalForecast';
import { DailyRoutineView } from './components/DailyRoutineView';
import { IaqHacksView } from './components/IaqHacksView';
import { SustainableAlternativesView } from './components/SustainableAlternativesView';
import { DirectImpactDashboard } from './components/DirectImpactDashboard';
import { CommunityBoard } from './components/CommunityBoard';
import { AiAssistantChat } from './components/AiAssistantChat';
import { WinterInversionExplainer } from './components/WinterInversionExplainer';
import { ProfileModal } from './components/ProfileModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { 
  Wind, 
  Sparkles, 
  Calendar, 
  Wrench, 
  Leaf, 
  BarChart3, 
  Users, 
  Layers, 
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, airData, profile, setIsProfileModalOpen } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Header />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Render Tab Contents */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Real-time AQI Radar & Inversion Level */}
            <AqiRadar />

            {/* 24-hr Diurnal Safe Window Tracker */}
            <DiurnalForecast />

            {/* Quick Teaser Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Teaser 1: Daily Routine */}
              <div 
                onClick={() => setActiveTab('daily-routine')}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-teal-500/40 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  Daily Smog Routine
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Avoid morning inversion peaks and utilize the 1:30 PM solar ventilation sweet spot.
                </p>
              </div>

              {/* Teaser 2: IAQ Hacks */}
              <div 
                onClick={() => setActiveTab('iaq-hacks')}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-teal-500/40 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  Indoor IAQ Hacks Lab
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Corsi-Rosenthal DIY box fan purifiers, range hood containment, and anti-resuspension mopping.
                </p>
              </div>

              {/* Teaser 3: GenAI Advisor */}
              <div 
                onClick={() => setActiveTab('assistant')}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-purple-500/40 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                  AeroGuide AI Assistant
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Ask clinical questions about infant safety, exercise timing, and household draft proofing.
                </p>
              </div>
            </div>

            {/* Science Explainer Embedded */}
            <WinterInversionExplainer />
          </div>
        )}

        {activeTab === 'assistant' && (
          <div className="animate-fadeIn">
            <AiAssistantChat />
          </div>
        )}

        {activeTab === 'daily-routine' && (
          <div className="animate-fadeIn">
            <DailyRoutineView />
          </div>
        )}

        {activeTab === 'iaq-hacks' && (
          <div className="animate-fadeIn">
            <IaqHacksView />
          </div>
        )}

        {activeTab === 'alternatives' && (
          <div className="animate-fadeIn">
            <SustainableAlternativesView />
          </div>
        )}

        {activeTab === 'impact-calc' && (
          <div className="animate-fadeIn">
            <DirectImpactDashboard />
          </div>
        )}

        {activeTab === 'community' && (
          <div className="animate-fadeIn">
            <CommunityBoard />
          </div>
        )}
      </main>

      {/* Modals */}
      <ProfileModal />
      <ApiKeyModal />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-8 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-teal-400" />
            <span className="font-bold text-slate-300">BreatheWise AI</span>
            <span>&copy; {new Date().getFullYear()} &middot; Built for community air defense against severe winter smog</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setIsProfileModalOpen(true)} className="hover:text-white transition-colors">
              Household Setup
            </button>
            <span>&middot;</span>
            <button onClick={() => setActiveTab('iaq-hacks')} className="hover:text-white transition-colors">
              Corsi-Rosenthal DIY
            </button>
            <span>&middot;</span>
            <button onClick={() => setActiveTab('community')} className="hover:text-white transition-colors">
              Community Pledges
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
