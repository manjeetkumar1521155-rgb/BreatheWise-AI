import React, { useState } from 'react';
import { INDOOR_AIR_HACKS } from '../data/iaqHacks';
import { IndoorHack } from '../types';
import { CorsiRosenthalSimulator } from './CorsiRosenthalSimulator';
import { 
  Wrench, 
  Sparkles, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  X
} from 'lucide-react';

export const IaqHacksView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeHack, setActiveHack] = useState<IndoorHack | null>(null);
  const [showDiyLab, setShowDiyLab] = useState<boolean>(false);

  const filteredHacks = selectedCategory === 'all'
    ? INDOOR_AIR_HACKS
    : INDOOR_AIR_HACKS.filter(h => h.category.includes(selectedCategory));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-teal-400" />
            <h2 className="text-xl font-bold text-white">Indoor Air Quality (IAQ) Hacks Lab</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Practical, low-cost engineering interventions to slash indoor PM2.5, NO2, and toxic resuspension during severe winter smog episodes.
          </p>
        </div>

        <button
          onClick={() => setShowDiyLab(!showDiyLab)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-md shadow-teal-500/20"
        >
          <Layers className="w-4 h-4" />
          <span>{showDiyLab ? 'Hide DIY Purifier Lab' : 'Launch Corsi-Rosenthal CADR Lab'}</span>
        </button>
      </div>

      {/* Embedded Corsi-Rosenthal Simulator if open */}
      {showDiyLab && (
        <div className="animate-fadeIn">
          <CorsiRosenthalSimulator />
        </div>
      )}

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'all', label: 'All Hacks (6)' },
          { id: 'diy-purifier', label: 'DIY Air Purifiers' },
          { id: 'ventilation', label: 'Winter Pulse Ventilation' },
          { id: 'kitchen-exhaust', label: 'Kitchen Smoke Isolation' },
          { id: 'sealing', label: 'Door & Window Sealing' },
          { id: 'humidity', label: 'Mopping & Mucosal RH' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-teal-500 text-slate-950 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Hacks Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredHacks.map(hack => (
          <div
            key={hack.id}
            onClick={() => setActiveHack(hack)}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-teal-500/40 hover:bg-slate-900/90 transition-all cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-lg hover:shadow-teal-950/20"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  hack.costTier === 'Zero Cost' 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {hack.costTier}
                </span>

                <div className="flex items-center gap-1 text-[11px] font-bold text-teal-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>-{hack.pm25ReductionPercent}% PM2.5</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                {hack.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {hack.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Peak in {hack.timeToPeakEffectMinutes}m
              </span>

              <span className="text-teal-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Blueprint &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Deep-Dive Modal for Selected Hack */}
      {activeHack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setActiveHack(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1 pr-8">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {activeHack.difficulty}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {activeHack.costTier}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white pt-1">{activeHack.title}</h3>
              <p className="text-xs text-slate-300">{activeHack.summary}</p>
            </div>

            {/* Direct Impact Box */}
            <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-700/50 space-y-1">
              <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Direct Exposure & Health Impact
              </span>
              <p className="text-xs text-teal-100/90 leading-relaxed font-medium">
                {activeHack.directImpactExplanation}
              </p>
            </div>

            {/* Scientific Mechanism */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Scientific Foundation</h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                {activeHack.scienceBacking}
              </p>
            </div>

            {/* Materials Needed */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Required Materials</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                {activeHack.materialsNeeded.map((mat, i) => (
                  <li key={i} className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Execution Steps */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Step-by-Step Implementation</h4>
              <div className="space-y-2">
                {activeHack.steps.map((step, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Mistakes to avoid */}
            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-1.5 text-xs text-rose-200">
              <span className="font-bold text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Critical Errors to Avoid
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {activeHack.mistakesToAvoid.map((mistake, i) => (
                  <li key={i}>{mistake}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveHack(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
