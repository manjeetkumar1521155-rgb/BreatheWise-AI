import React from 'react';
import { useApp } from '../context/AppContext';
import { CITIES_DATA } from '../data/airQualityData';
import { 
  Wind, 
  Sparkles, 
  Users, 
  MapPin, 
  Settings, 
  Key, 
  ShieldCheck, 
  Calendar, 
  Wrench, 
  Leaf, 
  BarChart3, 
  Compass,
  AlertTriangle
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    selectedCityKey, 
    setSelectedCityKey, 
    airData, 
    profile, 
    activeTab, 
    setActiveTab, 
    setIsProfileModalOpen, 
    setIsApiKeyModalOpen,
    geminiApiKey 
  } = useApp();

  const cityOptions = Object.entries(CITIES_DATA).map(([key, data]) => ({
    key,
    name: data.cityName,
    country: data.country,
    aqi: data.currentAqi,
  }));

  const navTabs = [
    { id: 'dashboard', label: 'Air Radar', icon: Compass },
    { id: 'assistant', label: 'AeroGuide AI', icon: Sparkles, badge: 'GenAI' },
    { id: 'daily-routine', label: 'Daily Routine', icon: Calendar },
    { id: 'iaq-hacks', label: 'Indoor IAQ Hacks', icon: Wrench },
    { id: 'alternatives', label: 'Low-Emission Living', icon: Leaf },
    { id: 'impact-calc', label: 'Direct Impact', icon: BarChart3 },
    { id: 'community', label: 'Community Board', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      {/* Top Banner for severe smog */}
      {airData.currentAqi > 200 && (
        <div className="bg-gradient-to-r from-red-900/60 via-amber-900/50 to-red-900/60 border-b border-red-500/30 px-4 py-1.5 text-xs text-red-200 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-4xl mx-auto overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
            <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="font-semibold text-red-100">Severe Winter Inversion Advisory:</span>
            <span className="text-red-200/90 truncate">{airData.smogAlertMessage}</span>
          </div>
          <button 
            onClick={() => setActiveTab('daily-routine')}
            className="text-[11px] font-medium text-amber-300 hover:text-amber-200 underline shrink-0 ml-3"
          >
            View Safe Windows &rarr;
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-teal-500/20 text-slate-950">
              <Wind className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 ring-2 ring-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white">BreatheWise</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">AI</span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Winter Smog & Urban Air Defense</p>
            </div>
          </div>

          {/* Location Selector */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <select
              value={selectedCityKey}
              onChange={(e) => setSelectedCityKey(e.target.value)}
              className="bg-transparent font-medium text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              {cityOptions.map((city) => (
                <option key={city.key} value={city.key} className="bg-slate-900 text-slate-200">
                  {city.name} ({city.country}) - AQI {city.aqi}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Profile & AI Key Controls */}
          <div className="flex items-center gap-2">
            {/* AI Key Status Button */}
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                geminiApiKey
                  ? 'bg-purple-950/40 text-purple-300 border-purple-800/60 hover:bg-purple-900/50'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title={geminiApiKey ? 'Gemini 1.5 Flash Connected' : 'Using AeroGuide Clinical Reasoning Engine'}
            >
              <Key className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden md:inline">{geminiApiKey ? 'Gemini Live' : 'AI Engine: Active'}</span>
            </button>

            {/* Profile Customization Pill */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-all shadow-sm"
            >
              <Settings className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Household ({profile.familyMembersCount})</span>
              {profile.vulnerabilities.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-semibold border border-rose-500/30">
                  {profile.vulnerabilities.length} sensitive
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center space-x-1 overflow-x-auto py-2 no-scrollbar border-t border-slate-800/60 text-xs">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && !isActive && (
                  <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
