import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Flame, 
  CheckCircle2, 
  ThumbsUp, 
  Plus, 
  AlertTriangle, 
  Share2, 
  ShieldCheck, 
  Filter,
  Check,
  Send
} from 'lucide-react';

export const CommunityBoard: React.FC = () => {
  const { pledges, togglePledge, alerts, addAlert, upvoteAlert } = useApp();
  const [showNewAlertModal, setShowNewAlertModal] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>('');
  const [alertLocation, setAlertLocation] = useState<string>('');
  const [alertCategory, setAlertCategory] = useState<'Waste Incineration' | 'Crop Burning Smoke' | 'Industrial Smoke' | 'Low-Inversion Peak'>('Waste Incineration');

  const handlePostAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle.trim() || !alertLocation.trim()) return;

    addAlert({
      title: alertTitle.trim(),
      location: alertLocation.trim(),
      category: alertCategory
    });

    setAlertTitle('');
    setAlertLocation('');
    setShowNewAlertModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Community Clean Air Defense Hub</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Air is a shared commons. Collaborate with neighbors to pledge low-emission routines, report toxic open burning, and share clean air resources.
          </p>
        </div>

        <button
          onClick={() => setShowNewAlertModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors shadow-md shadow-rose-600/20"
        >
          <Flame className="w-4 h-4" />
          <span>Report Smoke / Hazard</span>
        </button>
      </div>

      {/* Two Column Section: Pledges on Left, Incident Alerts on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Community Pledges */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Community Action Pledges
            </h3>
            <span className="text-xs text-slate-400">
              {pledges.filter(p => p.isPledgedByMe).length} Pledged by You
            </span>
          </div>

          <div className="space-y-3">
            {pledges.map(pledge => (
              <div
                key={pledge.id}
                className={`p-4 rounded-xl border transition-all ${
                  pledge.isPledgedByMe
                    ? 'border-emerald-500/50 bg-emerald-950/20'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {pledge.category}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-400">
                        +{pledge.impactScore} Eco pts
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white pt-0.5">
                      {pledge.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pledge.description}
                    </p>
                  </div>

                  <button
                    onClick={() => togglePledge(pledge.id)}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      pledge.isPledgedByMe
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {pledge.isPledgedByMe ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Pledged</span>
                      </>
                    ) : (
                      <span>+ Pledge</span>
                    )}
                  </button>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{pledge.pledgedUsersCount} community members committed</span>
                  <span className="text-teal-400 font-medium cursor-pointer hover:underline">
                    Share pledge &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Local Smoke & Hazard Alerts */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Live Neighborhood Smoke Radar
            </h3>
            <span className="text-xs text-slate-400">
              Community Verified
            </span>
          </div>

          <div className="space-y-3">
            {alerts.map(alert => (
              <div
                key={alert.id}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/50">
                      {alert.category}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {alert.reportedAt}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    alert.status === 'Active' 
                      ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {alert.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white">
                  {alert.title}
                </h4>

                <p className="text-xs text-slate-300 flex items-center gap-1 font-mono">
                  📍 {alert.location}
                </p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">
                    Warned {alert.upvotes * 4} nearby residents
                  </span>

                  <button
                    onClick={() => upvoteAlert(alert.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-teal-400" />
                    <span>Confirm / Upvote ({alert.upvotes})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showNewAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-400" />
                Report Local Smoke or Burning Plume
              </h3>
              <button 
                onClick={() => setShowNewAlertModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostAlert} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Issue Category</label>
                <select
                  value={alertCategory}
                  onChange={(e: any) => setAlertCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-400"
                >
                  <option value="Waste Incineration">Open Trash / Leaf Incineration</option>
                  <option value="Crop Burning Smoke">Agricultural Stubble Plume</option>
                  <option value="Industrial Smoke">Factory / Generator Black Smoke</option>
                  <option value="Low-Inversion Peak">Severe Diesel Exhaust Bottleneck</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">What did you observe?</label>
                <input
                  type="text"
                  placeholder="e.g. Dry leaf pile burning along park perimeter road"
                  value={alertTitle}
                  onChange={(e) => setAlertTitle(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Exact Neighborhood / Street Location</label>
                <input
                  type="text"
                  placeholder="e.g. Block B Park, near eastern exit gate"
                  value={alertLocation}
                  onChange={(e) => setAlertLocation(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewAlertModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-md shadow-rose-600/30"
                >
                  Post Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
