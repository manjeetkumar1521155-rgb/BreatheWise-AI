import React, { useState } from 'react';
import { 
  Fan, 
  Layers, 
  DollarSign, 
  Volume2, 
  Check, 
  HelpCircle, 
  Zap, 
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';

export const CorsiRosenthalSimulator: React.FC = () => {
  const [roomLength, setRoomLength] = useState<number>(18); // feet
  const [roomWidth, setRoomWidth] = useState<number>(14);   // feet
  const [roomHeight, setRoomHeight] = useState<number>(9);   // feet
  const [fanSpeed, setFanSpeed] = useState<1 | 2 | 3>(2);
  const [filterThickness, setFilterThickness] = useState<1 | 2>(2); // inches (2" gives less resistance)
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Math Calculations
  const roomAreaSqFt = roomLength * roomWidth;
  const roomVolumeCuFt = roomAreaSqFt * roomHeight;

  // CADR delivery estimate:
  // Speed 1: ~380 CFM (1" filter) or ~440 CFM (2" filter)
  // Speed 2: ~480 CFM (1" filter) or ~540 CFM (2" filter)
  // Speed 3: ~580 CFM (1" filter) or ~640 CFM (2" filter)
  const baseCadr = fanSpeed === 1 ? 400 : fanSpeed === 2 ? 510 : 620;
  const cadrCfm = filterThickness === 2 ? baseCadr + 50 : baseCadr;

  // Air Changes Per Hour (ACH) = (CADR * 60) / Room Volume
  const calculatedAch = Math.round(((cadrCfm * 60) / Math.max(100, roomVolumeCuFt)) * 10) / 10;
  const minutesFor80PercentDrop = Math.max(10, Math.round((roomVolumeCuFt / (cadrCfm * 0.95)) * 1.5));

  // Noise decibels
  const dbEstimate = fanSpeed === 1 ? 43 : fanSpeed === 2 ? 51 : 58;

  const steps = [
    {
      title: 'Inspect MERV-13 Filters & Airflow Arrows',
      desc: 'Verify all 4 filters have directional arrows pointing INWARD toward the interior cavity. This ensures the wire-mesh backing supports the pleats against the suction.'
    },
    {
      title: 'Construct the Filter Cube Base',
      desc: 'Stand the 4 filters around the 20" cardboard bottom base. Seal all 4 bottom seams with heavy duct tape.'
    },
    {
      title: 'Seal Vertical Corner Seams',
      desc: 'Tape the vertical junctions between all adjacent filters. Ensure an airtight seal with no gap for unscrubbed air bypass.'
    },
    {
      title: 'Mount the 20" Box Fan (Blowing UP)',
      desc: 'Rest the fan on top of the filter cube with airflow exhausting UP into the room. Tape the entire top perimeter securely.'
    },
    {
      title: 'Add the Critical Cardboard Shroud Ring',
      desc: 'Cut a 14-inch circular hole in a piece of cardboard and tape it to the front face of the fan. This blocks the square corner dead zones, boosting clean airflow by 40%!'
    }
  ];

  return (
    <div className="rounded-2xl border border-teal-500/30 bg-slate-900/70 p-6 backdrop-blur-xl space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
              <Fan className="w-5 h-5 animate-spin" style={{ animationDuration: `${4 / fanSpeed}s` }} />
            </div>
            <h3 className="text-lg font-bold text-white">Interactive Corsi-Rosenthal Box Designer</h3>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Calculate exact Clean Air Delivery Rate (CADR) and build a hospital-grade air cleaner for under $60.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Output: <strong className="text-teal-300">{cadrCfm} CFM</strong></span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Room Size Inputs & Metrics */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-teal-400" />
              Room Dimensions
            </h4>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Length (ft)</label>
                <input
                  type="number"
                  min="8"
                  max="40"
                  value={roomLength}
                  onChange={(e) => setRoomLength(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-400"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Width (ft)</label>
                <input
                  type="number"
                  min="8"
                  max="40"
                  value={roomWidth}
                  onChange={(e) => setRoomWidth(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-400"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Ceiling (ft)</label>
                <input
                  type="number"
                  min="7"
                  max="16"
                  value={roomHeight}
                  onChange={(e) => setRoomHeight(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex justify-between pt-1 border-t border-slate-800/80">
              <span>Floor: <strong className="text-slate-200">{roomAreaSqFt} sq.ft</strong></span>
              <span>Air Volume: <strong className="text-slate-200">{roomVolumeCuFt.toLocaleString()} cu.ft</strong></span>
            </div>

            {/* Fan Speed & Filter Options */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <label className="text-[11px] text-slate-300 font-semibold block">Fan Speed Setting</label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setFanSpeed(speed as 1 | 2 | 3)}
                    className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      fanSpeed === speed
                        ? 'bg-teal-500 text-slate-950 border-teal-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    Speed {speed} {speed === 1 ? '(Quiet)' : speed === 2 ? '(Optimal)' : '(Turbo)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Gauges */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400">Air Changes / Hour</span>
              <div className="text-2xl font-black text-teal-300">
                {calculatedAch} <span className="text-xs font-normal text-slate-400">ACH</span>
              </div>
              <p className="text-[10px] text-slate-400">
                {calculatedAch >= 5 ? '✅ Hospital/CDC Grade (>5 ACH)' : '⚠️ Good for moderate spaces (>3 ACH)'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400">Time to 80% PM2.5 Drop</span>
              <div className="text-2xl font-black text-emerald-400">
                ~{minutesFor80PercentDrop} <span className="text-xs font-normal text-slate-400">mins</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Noise: ~{dbEstimate} dB (whisper level)
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Blueprint & Step-by-Step interactive guide */}
        <div className="lg:col-span-7 space-y-4">
          {/* Visual Cube Representation */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center min-h-[200px]">
            {/* Visual Box Fan on top */}
            <div className="w-48 h-12 bg-slate-800 border-2 border-teal-400/80 rounded-t-xl flex items-center justify-center relative shadow-lg">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-teal-300 flex items-center justify-center">
                <Fan className="w-6 h-6 text-teal-300 animate-spin" style={{ animationDuration: `${3 / fanSpeed}s` }} />
              </div>
              <span className="absolute -top-3 px-2 py-0.5 rounded bg-teal-400 text-slate-950 font-black text-[9px]">
                CLEAN AIR UPWARD &uarr;
              </span>
            </div>

            {/* Visual 4-Filter Cube Body */}
            <div className="w-48 h-32 bg-teal-950/40 border-2 border-dashed border-teal-500/50 flex flex-col items-center justify-center relative p-3">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-teal-300 block">4x MERV-13 Filters</span>
                <span className="text-[10px] text-slate-400 block">30+ sq.ft filtration media</span>
                <span className="text-[9px] text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/50">
                  Airflow Arrows Inward &rarr;
                </span>
              </div>

              {/* Side air suction indicators */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-[10px] text-rose-400 font-bold flex items-center">
                &rarr; Smog In
              </div>
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[10px] text-rose-400 font-bold flex items-center">
                Smog In &larr;
              </div>
            </div>

            {/* Bottom Cardboard Base */}
            <div className="w-52 h-4 bg-amber-900/60 border border-amber-700/60 rounded-b-md text-[9px] text-amber-200 text-center flex items-center justify-center font-mono">
              Cardboard Base Sealed
            </div>
          </div>

          {/* Step-by-Step Interactive Tabs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Assembly Protocol (Step {activeStepIndex + 1} of 5)</span>
              <div className="flex gap-1">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStepIndex(i)}
                    className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all ${
                      activeStepIndex === i
                        ? 'bg-teal-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1 text-xs">
              <h5 className="font-bold text-teal-300">{steps[activeStepIndex].title}</h5>
              <p className="text-slate-300 leading-relaxed">{steps[activeStepIndex].desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table: DIY CR-Box vs Commercial HEPA */}
      <div className="pt-4 border-t border-slate-800/80">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
          Benchmark: DIY Corsi-Rosenthal vs. Standard Commercial HEPA Purifiers
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 px-3">Metric</th>
                <th className="py-2 px-3 text-teal-300 font-bold">Corsi-Rosenthal Box (DIY)</th>
                <th className="py-2 px-3 text-slate-300">Commercial Branded HEPA ($250+)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2 px-3 font-medium text-slate-400">Total Upfront Build Cost</td>
                <td className="py-2 px-3 font-bold text-emerald-400">$45 - $65 total</td>
                <td className="py-2 px-3 text-rose-300">$220 - $480 each</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-slate-400">Clean Air Delivery (CADR)</td>
                <td className="py-2 px-3 font-bold text-emerald-400">450 - 600 CFM (Massive)</td>
                <td className="py-2 px-3">120 - 240 CFM (Moderate)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-slate-400">Filter Replacement Cost</td>
                <td className="py-2 px-3 font-bold text-emerald-400">$25 - $35 for 4-pack (6-9 mos)</td>
                <td className="py-2 px-3 text-rose-300">$60 - $110 per proprietary cartridge</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-slate-400">Air Changes in 350 sq.ft Room</td>
                <td className="py-2 px-3 font-bold text-emerald-400">~6.8 ACH (Hospital standard)</td>
                <td className="py-2 px-3">~2.4 ACH</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
