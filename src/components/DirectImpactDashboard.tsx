import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  TrendingDown, 
  ShieldCheck, 
  Users, 
  TreePine, 
  Heart, 
  Wind, 
  Sparkles, 
  Sliders,
  Award
} from 'lucide-react';

export const DirectImpactDashboard: React.FC = () => {
  const { profile, calculatedMetrics, pledges } = useApp();
  const [communitySize, setCommunitySize] = useState<number>(100); // families in apartment or neighborhood

  const myPledgesCount = pledges.filter(p => p.isPledgedByMe).length;

  // Multiplier math
  const communityCo2Tons = Math.round((calculatedMetrics.co2SavedKg * communitySize) / 1000 * 10) / 10;
  const communityPm25Kg = Math.round((calculatedMetrics.pm25AvoidedGrams * communitySize) / 1000 * 10) / 10;
  const asthmaVisitsAvoided = Math.round(communitySize * 0.18 * (myPledgesCount >= 2 ? 1.4 : 1));
  const carExhaustEquivalentKm = Math.round(communityCo2Tons * 4200);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl space-y-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-teal-400" />
          <h2 className="text-xl font-bold text-white">Direct Impact & Community Multiplier</h2>
        </div>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          Every small adjustment—from avoiding cold-starts and choosing induction to building DIY purifiers—directly reduces your family’s systemic toxin exposure and keeps soot out of your localized airshed.
        </p>
      </div>

      {/* Household Individual Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Monthly CO2 Avoided */}
        <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
            <span>Avoided CO2</span>
            <TreePine className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-white">
            {calculatedMetrics.co2SavedKg} <span className="text-sm font-normal text-emerald-300">kg/mo</span>
          </div>
          <p className="text-[11px] text-emerald-200/80">
            Equivalent to planting {calculatedMetrics.treesEquivalent} mature pine trees this winter.
          </p>
        </div>

        {/* Metric 2: Avoided Ground-Level PM2.5 */}
        <div className="p-5 rounded-2xl border border-teal-500/30 bg-teal-950/20 backdrop-blur-xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-teal-400 font-semibold">
            <span>Prevented Toxic Soot</span>
            <Wind className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-white">
            {calculatedMetrics.pm25AvoidedGrams} <span className="text-sm font-normal text-teal-300">g/mo</span>
          </div>
          <p className="text-[11px] text-teal-200/80">
            Direct combustion particulate matter kept out of your neighborhood street air.
          </p>
        </div>

        {/* Metric 3: Family Clean Air Sanctuary */}
        <div className="p-5 rounded-2xl border border-blue-500/30 bg-blue-950/20 backdrop-blur-xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-blue-400 font-semibold">
            <span>Safe Clean Air Hours</span>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-white">
            {calculatedMetrics.hoursOfCleanAirBonus} <span className="text-sm font-normal text-blue-300">hrs/wk</span>
          </div>
          <p className="text-[11px] text-blue-200/80">
            Indoor hours spent breathing filtered air &lt; 25 µg/m³ PM2.5 in sleeping quarters.
          </p>
        </div>

        {/* Metric 4: Community Actions Pledged */}
        <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-purple-400 font-semibold">
            <span>Active Pledges</span>
            <Award className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-white">
            {myPledgesCount} <span className="text-sm font-normal text-purple-300">of {pledges.length}</span>
          </div>
          <p className="text-[11px] text-purple-200/80">
            Collective commitments made to zero-idling, mulching & clean ventilation.
          </p>
        </div>
      </div>

      {/* Interactive Neighborhood Scale Simulator */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                Neighborhood Collective Scale Simulator
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              What happens if your apartment complex or community adopts these routines together?
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">Scale:</span>
            <strong className="text-indigo-300 font-bold">{communitySize} Families</strong>
          </div>
        </div>

        {/* Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>10 Homes (One cul-de-sac)</span>
            <span className="font-semibold text-indigo-300">{communitySize} Participating Families</span>
            <span>1,000 Homes (Entire Suburb)</span>
          </div>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={communitySize}
            onChange={(e) => setCommunitySize(Number(e.target.value))}
            className="w-full accent-indigo-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
        </div>

        {/* Collective Outcomes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400">Community Soot Cut</span>
            <div className="text-2xl font-black text-teal-400">
              {communityPm25Kg} <span className="text-xs font-normal text-slate-400">kg PM2.5</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Equivalent to removing {Math.round(communitySize * 0.8)} diesel trucks off neighborhood roads.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400">CO2 Emissions Prevented</span>
            <div className="text-2xl font-black text-emerald-400">
              {communityCo2Tons} <span className="text-xs font-normal text-slate-400">Metric Tons</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Equal to {carExhaustEquivalentKm.toLocaleString()} km of passenger car travel eliminated.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400">ER & Clinic Visits Prevented</span>
            <div className="text-2xl font-black text-rose-400">
              ~{asthmaVisitsAvoided} <span className="text-xs font-normal text-slate-400">Asthma Episodes</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Fewer pediatric emergency admissions during peak winter inversions.
            </p>
          </div>
        </div>
      </div>

      {/* Science-backed Personal Exposure Breakdown */}
      <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-400" />
          Direct Health Payoff Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-rose-300">Vascular Protection</span>
            <p className="text-slate-300 leading-relaxed">
              Eliminating morning outdoor running under AQI &gt; 250 prevents acute endothelial arterial stiffening and blood pressure spikes.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-teal-300">Pediatric Alveolar Defense</span>
            <p className="text-slate-300 leading-relaxed">
              Filtered bedroom air during nocturnal inversions allows growing children to maintain normal lung volume trajectory.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-indigo-300">Asthma & Bronchospasm Shield</span>
            <p className="text-slate-300 leading-relaxed">
              Back-burner cooking and 45% indoor humidity preservation cuts mucosal hyper-reactivity flare-ups by 50-65%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
