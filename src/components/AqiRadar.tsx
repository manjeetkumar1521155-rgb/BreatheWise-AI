import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getAqiDetails, CITIES_DATA } from '../data/airQualityData';
import { 
  Wind, 
  Thermometer, 
  Droplets, 
  Layers, 
  Sliders, 
  RotateCcw, 
  AlertCircle,
  ShieldAlert,
  ArrowDownCircle,
  Eye,
  Info
} from 'lucide-react';

export const AqiRadar: React.FC = () => {
  const { airData, profile, setSimulatedAqi, resetSimulatedAqi, setActiveTab } = useApp();
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const details = getAqiDetails(airData.currentAqi);

  return (
    <div className="space-y-6">
      {/* Hero Overview Card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
        {/* Glow ambient background */}
        <div 
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: details.color }}
        />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          {/* Left: Location & Inversion Status */}
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-teal-300 border border-slate-700">
                {airData.regionType}
              </span>
              <span className="text-xs text-slate-400">
                {airData.lastUpdated}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>{airData.cityName}</span>
              <span className="text-sm font-normal text-slate-400">({airData.country})</span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {details.summary}
            </p>

            {/* Inversion Alert Capsule */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-950/60 text-indigo-400 shrink-0 border border-indigo-800/40">
                <Layers className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-200">Thermal Inversion Ceiling: {airData.thermalInversionHeightMeters}m</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    airData.inversionTrapLevel === 'Severe Trap' 
                      ? 'bg-rose-950/70 text-rose-300 border border-rose-800/50' 
                      : 'bg-amber-950/70 text-amber-300 border border-amber-800/50'
                  }`}>
                    {airData.inversionTrapLevel}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Atmospheric lid is compressing city soot into the lowest {airData.thermalInversionHeightMeters} meters of ground air.
                </p>
              </div>
            </div>
          </div>

          {/* Right: The Major AQI Dial */}
          <div className="flex items-center gap-5 sm:gap-6 bg-slate-950/60 border border-slate-800/90 p-5 rounded-2xl w-full lg:w-auto shrink-0 shadow-inner">
            <div className="relative flex items-center justify-center">
              {/* Radial Meter */}
              <div 
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center border-4 shadow-lg transition-all duration-500"
                style={{ 
                  borderColor: details.color, 
                  boxShadow: `0 0 25px ${details.color}33`,
                  backgroundColor: `${details.color}10`
                }}
              >
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter">
                  {airData.currentAqi}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  AQI (US/NAAQS)
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div 
                className="inline-block px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border"
                style={{ 
                  color: details.color, 
                  borderColor: `${details.color}40`,
                  backgroundColor: `${details.color}15`
                }}
              >
                {details.label}
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Primary: <strong className="text-rose-400">{airData.primaryPollutant}</strong> ({airData.pm25} µg/m³)
              </p>
              <p className="text-[11px] text-slate-400 max-w-[200px]">
                {details.action}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Simulator Toggle & Sliders */}
        <div className="mt-6 pt-4 border-t border-slate-800/70 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSlider(!showSlider)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium border border-slate-700"
            >
              <Sliders className="w-3.5 h-3.5 text-teal-400" />
              <span>{showSlider ? 'Close Smog Simulator' : 'Simulate What-If Smog Scenarios'}</span>
            </button>

            {airData.currentAqi !== (CITIES_DATA[airData.cityName.toLowerCase()]?.currentAqi || 388) && (
              <button
                onClick={resetSimulatedAqi}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-950/40 text-rose-300 hover:bg-rose-900/40 border border-rose-800/50"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Simulation</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-sky-400" /> {airData.temperatureC}°C
            </span>
            <span className="flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-blue-400" /> {airData.humidityPercent}% RH
            </span>
            <span className="flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-emerald-400" /> {airData.windSpeedKmh} km/h (Calm)
            </span>
          </div>
        </div>

        {/* Interactive Scenario Slider */}
        {showSlider && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-teal-500/30 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-teal-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>Simulate City Inversion AQI: <strong className="text-white text-sm">{airData.currentAqi}</strong></span>
              </label>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSimulatedAqi(65)} 
                  className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900"
                >
                  Clear (65)
                </button>
                <button 
                  onClick={() => setSimulatedAqi(185)} 
                  className="px-2 py-0.5 rounded text-[10px] bg-orange-950 text-orange-300 border border-orange-800 hover:bg-orange-900"
                >
                  Unhealthy (185)
                </button>
                <button 
                  onClick={() => setSimulatedAqi(420)} 
                  className="px-2 py-0.5 rounded text-[10px] bg-red-950 text-red-300 border border-red-800 hover:bg-red-900"
                >
                  Severe Smog (420)
                </button>
              </div>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="5"
              value={airData.currentAqi}
              onChange={(e) => setSimulatedAqi(Number(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <p className="text-[11px] text-slate-400">
              Drag slider to preview how AeroGuide AI and daily routines adapt dynamically from mild smog to hazardous winter inversion conditions.
            </p>
          </div>
        )}
      </div>

      {/* Pollutant Micro-Meters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* PM2.5 */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-200">PM2.5</span>
            <span className="text-[10px] px-1 rounded bg-rose-500/20 text-rose-300">Combustion</span>
          </div>
          <div className="text-xl font-bold text-white">{airData.pm25} <span className="text-xs font-normal text-slate-400">µg/m³</span></div>
          <div className="text-[10px] text-slate-400">WHO safe: 15 µg/m³ ({Math.round(airData.pm25 / 15)}x limit)</div>
        </div>

        {/* PM10 */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-200">PM10</span>
            <span className="text-[10px] px-1 rounded bg-amber-500/20 text-amber-300">Coarse Dust</span>
          </div>
          <div className="text-xl font-bold text-white">{airData.pm10} <span className="text-xs font-normal text-slate-400">µg/m³</span></div>
          <div className="text-[10px] text-slate-400">Road & construction dust</div>
        </div>

        {/* NO2 */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-200">NO2</span>
            <span className="text-[10px] px-1 rounded bg-orange-500/20 text-orange-300">Vehicular</span>
          </div>
          <div className="text-xl font-bold text-white">{airData.no2} <span className="text-xs font-normal text-slate-400">ppb</span></div>
          <div className="text-[10px] text-slate-400">Diesel exhaust & gas stoves</div>
        </div>

        {/* CO */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-200">CO</span>
            <span className="text-[10px] px-1 rounded bg-purple-500/20 text-purple-300">Incomplete Burn</span>
          </div>
          <div className="text-xl font-bold text-white">{airData.co} <span className="text-xs font-normal text-slate-400">ppm</span></div>
          <div className="text-[10px] text-slate-400">Cold-starts & biomass heating</div>
        </div>

        {/* SO2 */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-200">SO2</span>
            <span className="text-[10px] px-1 rounded bg-blue-500/20 text-blue-300">Industrial</span>
          </div>
          <div className="text-xl font-bold text-white">{airData.so2} <span className="text-xs font-normal text-slate-400">ppb</span></div>
          <div className="text-[10px] text-slate-400">Coal & refinery plumes</div>
        </div>

        {/* O3 (Ozone) */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-200">O3</span>
            <span className="text-[10px] px-1 rounded bg-teal-500/20 text-teal-300">Photochemical</span>
          </div>
          <div className="text-xl font-bold text-white">{airData.o3} <span className="text-xs font-normal text-slate-400">ppb</span></div>
          <div className="text-[10px] text-slate-400">Lower in winter mornings</div>
        </div>
      </div>

      {/* Household Risk Assessment Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              Vulnerability Assessment for {profile.familyMembersCount} Family Members
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {profile.vulnerabilities.length > 0 
                ? `High concern for: ${profile.vulnerabilities.map(v => v.toUpperCase()).join(', ')}. Keep air purifiers operational in sleeping zones.`
                : 'Adult household: Follow diurnal ventilation protocol to prevent fatigue and respiratory inflammation.'
              }
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('daily-routine')}
            className="w-full md:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-md shadow-teal-500/20 text-center"
          >
            Personalized Daily Routine &rarr;
          </button>
          <button
            onClick={() => setActiveTab('assistant')}
            className="w-full md:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors text-center"
          >
            Ask AeroGuide AI
          </button>
        </div>
      </div>
    </div>
  );
};
