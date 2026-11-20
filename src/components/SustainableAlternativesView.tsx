import React, { useState } from 'react';
import { SUSTAINABLE_ALTERNATIVES } from '../data/sustainableAlternatives';
import { SustainableAlternative } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Leaf, 
  Flame, 
  Car, 
  Utensils, 
  Trash2, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  TrendingDown,
  Sparkles,
  Heart
} from 'lucide-react';

export const SustainableAlternativesView: React.FC = () => {
  const { profile, calculatedMetrics, setActiveTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [adoptedList, setAdoptedList] = useState<string[]>(['commute-metro-carpool']);

  const categories = ['All', 'Heating & Warmth', 'Mobility & Commute', 'Cooking & Kitchen', 'Waste & Garden', 'Community Action'];

  const filtered = selectedCategory === 'All'
    ? SUSTAINABLE_ALTERNATIVES
    : SUSTAINABLE_ALTERNATIVES.filter(a => a.category === selectedCategory);

  const toggleAdopt = (id: string) => {
    setAdoptedList(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Low-Emission Living & Sustainable Alternatives</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Clean choices for heating, transit, cooking, and waste that stop feeding the winter inversion cycle while safeguarding your family’s lungs.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block">Your Monthly CO2 Avoided</span>
            <span className="text-sm font-bold text-emerald-400">{calculatedMetrics.co2SavedKg} kg</span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div>
            <span className="text-[10px] text-slate-400 block">Soot Prevented</span>
            <span className="text-sm font-bold text-teal-300">{calculatedMetrics.pm25AvoidedGrams} g</span>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-slate-950 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Alternatives Cards */}
      <div className="space-y-4">
        {filtered.map(alt => {
          const isAdopted = adoptedList.includes(alt.id);

          return (
            <div
              key={alt.id}
              className={`rounded-2xl border p-5 transition-all backdrop-blur-xl ${
                isAdopted
                  ? 'border-emerald-500/50 bg-emerald-950/20 shadow-md shadow-emerald-950/20'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              {/* Category & Adoption toggle */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/70">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-300 border border-slate-700">
                    {alt.category}
                  </span>
                  {isAdopted && (
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1 bg-emerald-900/40 px-2 py-0.5 rounded border border-emerald-700/60">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active in Your Household
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleAdopt(alt.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isAdopted
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                  }`}
                >
                  {isAdopted ? 'Remove from My Plan' : '+ Adopt This Alternative'}
                </button>
              </div>

              {/* Before vs After Comparison */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                {/* Traditional / Problem Practice */}
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                    Standard High-Emission Practice
                  </span>
                  <p className="font-semibold text-rose-200">
                    {alt.currentPractice}
                  </p>
                </div>

                {/* Sustainable Alternative */}
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Recommended Sustainable Switch
                  </span>
                  <p className="font-semibold text-emerald-200">
                    {alt.ecoAlternative}
                  </p>
                </div>
              </div>

              {/* Quantitative Metrics Badge */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Avoided CO2</span>
                  <strong className="text-emerald-400 font-bold">{alt.co2SavedKgMonth} kg/mo</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Prevented PM2.5</span>
                  <strong className="text-teal-300 font-bold">{alt.pm25AvoidedGramsMonth} g/mo</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center col-span-2">
                  <span className="text-[10px] text-slate-400 block">Air Protection Scale</span>
                  <strong className="text-slate-200 font-bold">1 Family = Clean Neighborhood Air</strong>
                </div>
              </div>

              {/* Direct Health Payoff & Community Multiplier */}
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="font-bold text-teal-300 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    Direct Family Health Payoff
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {alt.directHouseholdBenefit}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-900/40 space-y-1">
                  <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    Community Multiplier Effect
                  </span>
                  <p className="text-indigo-100/90 leading-relaxed">
                    {alt.communityMultiplier}
                  </p>
                </div>
              </div>

              {/* Adoption steps */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                  How To Switch In Your Home:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                  {alt.howToAdopt.map((step, i) => (
                    <li key={i} className="flex items-start gap-1.5 bg-slate-950/50 p-2 rounded-lg border border-slate-800/80">
                      <span className="text-emerald-400 font-bold text-[10px]">{i + 1}.</span>
                      <span className="text-[11px]">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
