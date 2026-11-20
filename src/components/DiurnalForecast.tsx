import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Clock, ShieldCheck, ShieldAlert, AlertTriangle, ArrowRight } from 'lucide-react';

export const DiurnalForecast: React.FC = () => {
  const { airData, setActiveTab } = useApp();
  const [selectedHour, setSelectedHour] = useState<number>(0);

  const hourly = airData.hourly24h || [];
  const activeItem = hourly[selectedHour] || hourly[0];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">24-Hour Winter Smog & "Safe Window" Tracker</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Diurnal thermal dynamics dictate when outdoor air is most lethal vs. when you can safely run errands or ventilate.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Safe Flush Window (1:30 - 3:30 PM)
          </span>
          <span className="flex items-center gap-1 text-rose-400 ml-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Inversion Lockdown (6 - 10 AM)
          </span>
        </div>
      </div>

      {/* Hourly Bar / Timeline */}
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 pt-2">
        {hourly.map((item, idx) => {
          const isSelected = selectedHour === idx;
          const isDispersionWindow = item.windowVentilationSafe;
          const isSevere = item.aqi > 300;

          return (
            <button
              key={item.hour}
              onClick={() => setSelectedHour(idx)}
              className={`p-2.5 rounded-xl text-center transition-all flex flex-col items-center justify-between border ${
                isSelected
                  ? 'bg-teal-500/20 border-teal-400 ring-2 ring-teal-500/30'
                  : isDispersionWindow
                  ? 'bg-emerald-950/30 border-emerald-800/60 hover:bg-emerald-900/40'
                  : isSevere
                  ? 'bg-rose-950/20 border-rose-900/40 hover:bg-rose-900/30'
                  : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/50'
              }`}
            >
              <span className="text-[11px] font-semibold text-slate-300">{item.hour}</span>

              {/* Inversion visual height bar */}
              <div className="w-full bg-slate-800 h-10 rounded-md my-1.5 flex items-end justify-center p-1 overflow-hidden">
                <div 
                  className={`w-full rounded-sm transition-all duration-300 ${
                    item.aqi > 350 ? 'bg-rose-500' : item.aqi > 250 ? 'bg-orange-500' : 'bg-emerald-500'
                  }`}
                  style={{ height: `${Math.min(100, Math.max(20, (item.aqi / 450) * 100))}%` }}
                />
              </div>

              <span className={`text-xs font-bold ${
                item.aqi > 350 ? 'text-rose-400' : item.aqi > 250 ? 'text-orange-400' : 'text-emerald-400'
              }`}>
                {item.aqi}
              </span>

              <span className="text-[9px] text-slate-400 mt-0.5">
                {isDispersionWindow ? 'Ventilate' : 'Seal'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail Card for Selected Hour */}
      {activeItem && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-xl shrink-0 ${
              activeItem.windowVentilationSafe 
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' 
                : 'bg-rose-950/60 text-rose-400 border border-rose-800/50'
            }`}>
              {activeItem.windowVentilationSafe ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{activeItem.hour} Time Slot</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  Estimated AQI: {activeItem.aqi} (PM2.5: {activeItem.pm25} µg/m³)
                </span>
                <span className="text-xs text-slate-400">
                  Inversion Intensity: {activeItem.inversionIntensity}%
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {activeItem.activityNote}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('daily-routine')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 shrink-0"
          >
            <span>Full Daily Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
