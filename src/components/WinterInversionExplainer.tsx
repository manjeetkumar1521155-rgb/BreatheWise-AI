import React, { useState } from 'react';
import { WINTER_SMOG_SCIENCE } from '../data/winterSmogScience';
import { Layers, Activity, Sun, ShieldAlert, ArrowDown, ArrowUp, Info } from 'lucide-react';

export const WinterInversionExplainer: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('thermal-inversion');
  const [activeSimulationMode, setActiveSimulationMode] = useState<'normal' | 'inversion'>('inversion');

  const activeTopic = WINTER_SMOG_SCIENCE.find(t => t.id === selectedTopicId) || WINTER_SMOG_SCIENCE[0];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">The Science of Severe Winter Smog</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Why cold seasons trap lethal toxic air at ground level and how particulate matter bypasses your body's defenses.
          </p>
        </div>

        {/* Science Topic Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {WINTER_SMOG_SCIENCE.map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedTopicId === topic.id
                  ? 'bg-teal-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {topic.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Visual Schematic */}
      {selectedTopicId === 'thermal-inversion' && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Atmospheric Boundary Layer Simulator
            </span>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setActiveSimulationMode('normal')}
                className={`px-3 py-1 rounded-lg border font-medium transition-all ${
                  activeSimulationMode === 'normal'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Normal Summer Day (High Mixing)
              </button>
              <button
                onClick={() => setActiveSimulationMode('inversion')}
                className={`px-3 py-1 rounded-lg border font-medium transition-all ${
                  activeSimulationMode === 'inversion'
                    ? 'bg-rose-600 text-white border-rose-500 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Winter Radiation Inversion (Trapped Lid)
              </button>
            </div>
          </div>

          {/* Graphical Diagram */}
          <div className="relative h-64 w-full rounded-xl border border-slate-800 overflow-hidden flex flex-col justify-between p-4">
            {activeSimulationMode === 'normal' ? (
              <>
                {/* Upper Atmosphere */}
                <div className="h-20 bg-sky-950/40 border-b border-sky-800/40 p-2 rounded-t-lg flex items-center justify-between">
                  <span className="text-[11px] text-sky-300 font-mono">Altitude &gt; 2,000m (Cool Air)</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    Free Dispersal Zone
                  </span>
                </div>

                {/* Upward Convection Arrows */}
                <div className="flex-1 flex items-center justify-around text-emerald-400 font-bold text-xs py-2">
                  <span className="flex flex-col items-center animate-bounce">&uarr; Warm rising air &uarr;</span>
                  <span className="flex flex-col items-center animate-bounce">&uarr; Soot diluting upward &uarr;</span>
                  <span className="flex flex-col items-center animate-bounce">&uarr; High boundary mixing &uarr;</span>
                </div>

                {/* Ground Level */}
                <div className="h-16 bg-emerald-950/40 border-t border-emerald-800/40 p-2 rounded-b-lg flex items-center justify-between">
                  <span className="text-xs text-emerald-200 font-bold">Earth Surface (Warm Solar Heated)</span>
                  <span className="text-xs text-slate-300">PM2.5: ~18 µg/m³ (Dispersed)</span>
                </div>
              </>
            ) : (
              <>
                {/* Warm Inversion Air Blanket (The Lid) */}
                <div className="h-24 bg-amber-950/60 border-b-4 border-dashed border-rose-500 p-3 rounded-t-lg flex flex-col justify-center">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <ArrowDown className="w-4 h-4 text-rose-400" />
                      Warm Air Layer ("Atmospheric Pressure Lid" at ~80m)
                    </span>
                    <span className="text-[10px] font-bold text-rose-300 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                      NO CONVECTIVE ESCAPE
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-200/80 mt-1">
                    Warm air is less dense than the frigid ground air below, creating a thermodynamic lid that prevents vertical air rising.
                  </p>
                </div>

                {/* Dense Ground Smog Pool */}
                <div className="flex-1 bg-gradient-to-b from-stone-900 via-rose-950/80 to-stone-950 p-4 rounded-b-lg flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between z-10">
                    <span className="text-xs font-black text-rose-400 uppercase tracking-tight flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                      Compressed Breathing Zone (&lt; 80 meters)
                    </span>
                    <span className="text-xs font-black text-rose-300 bg-black/60 px-2.5 py-1 rounded border border-rose-700">
                      PM2.5: 350+ µg/m³ (Lethal Concentration)
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 z-10 max-w-lg">
                    Vehicle exhaust, cold-starts, biomass burning, and road dust are concentrated in a tiny 60m vertical slice. Winds are dead calm (&lt; 4 km/h), locking the toxic aerosol soup in place for days.
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 z-10 border-t border-slate-800/80 pt-1">
                    <span>Ground Surface (Rapid Nocturnal Radiative Cooling)</span>
                    <span className="text-rose-400 font-bold">Stagnant Trapping</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Selected Topic Deep Dive */}
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              {activeTopic.subtitle}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {activeTopic.explanation}
          </p>
        </div>

        {/* Key Takeaway Bullets */}
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Clinical & Atmospheric Realities
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {activeTopic.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual Metric Callout */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/30 via-slate-900 to-indigo-950/30 border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              {activeTopic.visualMetric.label}
            </span>
            <span className="text-xl font-black text-teal-300">
              {activeTopic.visualMetric.value}
            </span>
          </div>
          <div className="text-slate-300 text-[11px] max-w-md sm:text-right">
            {activeTopic.visualMetric.comparison}
          </div>
        </div>
      </div>
    </div>
  );
};
