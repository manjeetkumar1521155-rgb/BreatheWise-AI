import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DailyRoutineItem } from '../types';
import { 
  Sun, 
  Moon, 
  Clock, 
  Car, 
  ShieldCheck, 
  AlertOctagon, 
  Wind, 
  Flame, 
  Sparkles, 
  Printer, 
  Baby, 
  HeartPulse, 
  CheckCircle2,
  Lock,
  Unlock,
  ChevronRight
} from 'lucide-react';

export const DailyRoutineView: React.FC = () => {
  const { airData, profile, setActiveTab } = useApp();
  const [filterPhase, setFilterPhase] = useState<'all' | 'morning' | 'midday' | 'evening' | 'night'>('all');

  const routines: DailyRoutineItem[] = [
    {
      timeBlock: '06:30 - 08:30 AM',
      title: 'Morning Smog Lock: Commute & School Departures',
      phase: 'morning',
      outdoorRiskLevel: 'Dangerous',
      iconName: 'Lock',
      recommendedAction: profile.commuteMode === 'ice_car_solo' 
        ? 'Switch vehicle AC strictly to RECIRCULATE before driving. Wear a well-fitted N95 mask while walking to the garage.' 
        : profile.commuteMode === 'metro_train'
        ? 'Wear a certified N95/FFP2 respirator through transit station platforms. The metro underground/cabin has lower PM2.5 than open roads.'
        : 'Avoid open-air two-wheeler/bike commuting during morning inversion. If mandatory, use dual-valved active carbon respirator.',
      whyThisMatters: `At 7:00 AM, the nocturnal inversion height is compressed to ${airData.thermalInversionHeightMeters}m. Cold engine starts produce 4x more carbon monoxide and unburnt fuel aerosols in stagnant air.`,
      directEmissionAvoidance: 'Recirculating car air cuts commuter in-cabin toxic ultrafine particle inhalation by 65-80%.',
      vulnerableGroupAlert: profile.vulnerabilities.includes('infant') || profile.vulnerabilities.includes('asthma')
        ? 'CRITICAL: Cancel outdoor school assemblies and playground runs. Keep infants indoors until afternoon.'
        : undefined
    },
    {
      timeBlock: '08:30 - 11:30 AM',
      title: 'Indoor Clean Sanctuary Maintenance',
      phase: 'morning',
      outdoorRiskLevel: 'High Risk',
      iconName: 'ShieldCheck',
      recommendedAction: `${profile.hasAirPurifier ? 'Keep your HEPA filter on MEDIUM speed in occupied rooms.' : 'Activate your DIY Corsi-Rosenthal unit on Speed 1.'} Do not sweep floors with dry brooms; use a damp microfiber mop to capture settled soot.`,
      whyThisMatters: 'Dry sweeping resuspends up to 250,000 fine particles per liter of air back into the breathing zone where children and pets play.',
      directEmissionAvoidance: 'Damp mopping reduces indoor airborne particulate resuspension by 62%.',
      vulnerableGroupAlert: profile.vulnerabilities.includes('elderly')
        ? 'Seniors with cardiovascular history should remain in the filtered central room during morning pressure drops.'
        : undefined
    },
    {
      timeBlock: '01:30 - 03:00 PM',
      title: 'The Golden Dispersion Window: Pulse Ventilation & Errands',
      phase: 'midday',
      outdoorRiskLevel: 'Caution',
      iconName: 'Unlock',
      recommendedAction: 'Execute the 6-minute "Stoßlüften" pulse ventilation: open opposing windows wide for exactly 6-8 minutes to flush stagnant carbon dioxide, then seal tightly and run purifiers on HIGH for 15 minutes.',
      whyThisMatters: 'Solar radiation warms the ground surface, temporarily lifting the boundary mixing layer from 65m to 400m+, resulting in the lowest PM2.5 concentration of the 24-hour cycle.',
      directEmissionAvoidance: 'Prevents indoor CO2 from exceeding 1,600 ppm (which impairs cognitive function and immune response) without chilling the walls.',
      vulnerableGroupAlert: 'Safest window of the day for brief doctor visits, essential grocery runs, or gentle outdoor walking.'
    },
    {
      timeBlock: '05:30 - 07:30 PM',
      title: 'Evening Return & Kitchen Plume Containment',
      phase: 'evening',
      outdoorRiskLevel: 'High Risk',
      iconName: 'Flame',
      recommendedAction: 'Close the kitchen door completely before cooking. Turn on range exhaust 2 minutes prior to frying, prioritizing back burners. If using gas, open a 1-inch utility crack inside the kitchen.',
      whyThisMatters: 'As the sun sets, ground cooling causes the temperature inversion to slam shut again. Cooking oil breakdown and gas combustion generate indoor PM2.5 spikes up to 600 µg/m³ if unvented.',
      directEmissionAvoidance: 'Back-burner priority and kitchen sealing blocks 82% of cooking soot from migrating to family bedrooms.',
      vulnerableGroupAlert: profile.cookingSource === 'lpg_cylinder' || profile.cookingSource === 'wood_chulha'
        ? 'Gas flame combustion produces hazardous NO2 peaks. Keep children and asthma patients outside the kitchen.'
        : undefined
    },
    {
      timeBlock: '08:30 - 10:30 PM',
      title: 'Night Bedroom Seal & Mucosal Hydration Shield',
      phase: 'night',
      outdoorRiskLevel: 'Dangerous',
      iconName: 'Moon',
      recommendedAction: 'Slide door-bottom draft stoppers into place. Turn bedroom air purifiers to Sleep/Quiet mode (under 40 dB). Verify indoor relative humidity is between 40% and 50% using a clean mist humidifier or water tray.',
      whyThisMatters: 'Nocturnal radiation cooling creates the highest ground-level stagnation of the day. Dry winter heating drops indoor RH below 25%, paralyzing bronchial cilia and allowing soot to enter deeper airways.',
      directEmissionAvoidance: 'Maintaining 45% RH preserves the mucociliary escalator, filtering 3x more inhaled particulates before they reach alveolar sacs.',
      vulnerableGroupAlert: 'Keep bedtime inhalers and saline nasal sprays at bedside for children or seniors with bronchial hyper-reactivity.'
    }
  ];

  const filteredRoutines = filterPhase === 'all' 
    ? routines 
    : routines.filter(r => r.phase === filterPhase);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-teal-400" />
            <h2 className="text-xl font-bold text-white">
              Personalized Smog-Defense Daily Routine
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Custom-calibrated for <strong className="text-teal-300">{profile.cityName}</strong> (AQI {airData.currentAqi}) and your family profile ({profile.familyMembersCount} members, {profile.vulnerabilities.length > 0 ? profile.vulnerabilities.join(', ') : 'standard risk'}).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save Plan</span>
          </button>
          <button
            onClick={() => setActiveTab('assistant')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-md shadow-teal-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI to Adapt</span>
          </button>
        </div>
      </div>

      {/* Phase Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilterPhase('all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            filterPhase === 'all'
              ? 'bg-teal-500 text-slate-950 font-semibold'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          Full 24-Hour Cycle
        </button>
        <button
          onClick={() => setFilterPhase('morning')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            filterPhase === 'morning'
              ? 'bg-teal-500 text-slate-950 font-semibold'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          Morning Inversion (6 - 11 AM)
        </button>
        <button
          onClick={() => setFilterPhase('midday')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            filterPhase === 'midday'
              ? 'bg-teal-500 text-slate-950 font-semibold'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          Midday Safe Window (1:30 - 3:30 PM)
        </button>
        <button
          onClick={() => setFilterPhase('evening')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            filterPhase === 'evening'
              ? 'bg-teal-500 text-slate-950 font-semibold'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          Evening Rush & Kitchen (5:30 - 8 PM)
        </button>
        <button
          onClick={() => setFilterPhase('night')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            filterPhase === 'night'
              ? 'bg-teal-500 text-slate-950 font-semibold'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          Night Bedroom Seal (8:30 PM - Dawn)
        </button>
      </div>

      {/* Routine Cards List */}
      <div className="space-y-4">
        {filteredRoutines.map((routine, idx) => {
          const isSafeWindow = routine.phase === 'midday';
          const isDangerous = routine.outdoorRiskLevel === 'Dangerous';

          return (
            <div
              key={idx}
              className={`rounded-2xl border p-5 transition-all backdrop-blur-xl ${
                isSafeWindow
                  ? 'border-emerald-500/40 bg-emerald-950/20 shadow-lg shadow-emerald-950/30'
                  : isDangerous
                  ? 'border-rose-800/40 bg-slate-900/70 hover:border-rose-500/40'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-slate-800/70">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${
                    isSafeWindow 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : isDangerous
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-slate-800 text-teal-300'
                  }`}>
                    {isSafeWindow ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-teal-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {routine.timeBlock}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isSafeWindow
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        Outdoor Risk: {routine.outdoorRiskLevel}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">
                      {routine.title}
                    </h3>
                  </div>
                </div>

                {isSafeWindow && (
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-900/40 px-3 py-1 rounded-lg border border-emerald-700/50 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-300" />
                    Recommended Daily Ventilation Window
                  </span>
                )}
              </div>

              {/* Routine Action Content */}
              <div className="mt-4 space-y-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                    Recommended Action
                  </span>
                  <p className="text-slate-200 leading-relaxed font-medium">
                    {routine.recommendedAction}
                  </p>
                </div>

                {/* Direct Impact Callout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-800/40 space-y-1">
                    <span className="text-[11px] font-bold text-teal-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Direct Exposure Impact
                    </span>
                    <p className="text-xs text-teal-100/90 leading-relaxed">
                      {routine.directEmissionAvoidance}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Meteorological Mechanism
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {routine.whyThisMatters}
                    </p>
                  </div>
                </div>

                {/* Vulnerable Group Callout if applicable */}
                {routine.vulnerableGroupAlert && (
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/50 flex items-start gap-2 text-rose-200 text-xs">
                    <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-rose-300">Family Health Advisory:</strong>{' '}
                      {routine.vulnerableGroupAlert}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  );
}
