import React from 'react';
import { useApp } from '../context/AppContext';
import { VulnerabilityCategory, HousingType, HeatingSource, CookingSource, CommuteMode } from '../types';
import { Settings, X, Users, Home, Flame, Car, Wind, Check, AlertCircle } from 'lucide-react';

export const ProfileModal: React.FC = () => {
  const { profile, updateProfile, isProfileModalOpen, setIsProfileModalOpen } = useApp();

  if (!isProfileModalOpen) return null;

  const toggleVulnerability = (v: VulnerabilityCategory) => {
    const list = [...profile.vulnerabilities];
    const idx = list.indexOf(v);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(v);
    }
    updateProfile({ vulnerabilities: list });
  };

  const vulnerabilityOptions: { id: VulnerabilityCategory; label: string; desc: string }[] = [
    { id: 'infant', label: 'Infant (<1 year)', desc: 'Higher breathing rate & developing alveoli' },
    { id: 'toddler', label: 'Toddler / Young Child', desc: 'Breathing zone close to ground road soot' },
    { id: 'asthma', label: 'Asthma / Bronchial Issues', desc: 'Severe airway hyper-reactivity to PM2.5' },
    { id: 'elderly', label: 'Elderly (65+)', desc: 'Cardiovascular sensitivity to particulate spikes' },
    { id: 'pregnant', label: 'Pregnant Mother', desc: 'Transplacental ultrafine nanoparticle risks' },
    { id: 'athlete', label: 'Runner / Active Athlete', desc: 'High minute ventilation during workouts' },
    { id: 'heart_condition', label: 'Cardiovascular Patient', desc: 'Blood viscosity & arterial inflammation' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => setIsProfileModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Household Profile & Lifestyle Setup</h3>
          </div>
          <p className="text-xs text-slate-300">
            AeroGuide AI dynamically tailors every routine, CADR metric, and health alert based on your family demographics and living environment.
          </p>
        </div>

        {/* Household Demographics */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-teal-400" />
            Family Members & Vulnerabilities
          </h4>

          <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
            <label className="text-slate-300 font-semibold">Total Household Size:</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => updateProfile({ familyMembersCount: num })}
                  className={`w-7 h-7 rounded-lg font-bold transition-all ${
                    profile.familyMembersCount === num
                      ? 'bg-teal-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {vulnerabilityOptions.map(opt => {
              const checked = profile.vulnerabilities.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleVulnerability(opt.id)}
                  className={`p-2.5 rounded-xl text-left border transition-all flex items-start gap-2.5 ${
                    checked
                      ? 'bg-rose-950/40 border-rose-600/60 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                    checked ? 'bg-rose-500 text-white' : 'border border-slate-700'
                  }`}>
                    {checked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold block">{opt.label}</span>
                    <span className="text-[10px] text-slate-400 block">{opt.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Housing Type & Heating Source */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Housing Type */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Home className="w-4 h-4 text-teal-400" />
              Building Type
            </h4>
            <select
              value={profile.housingType}
              onChange={(e) => updateProfile({ housingType: e.target.value as HousingType })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-400"
            >
              <option value="high_rise_apt">High-Rise Apartment (Floor 6+)</option>
              <option value="mid_rise_apt">Mid-Rise Apartment (Floor 2 - 5)</option>
              <option value="ground_floor">Ground Floor Apartment</option>
              <option value="independent_house">Independent House / Villa</option>
              <option value="older_leaky_home">Older Home (High Draft Leaks)</option>
              <option value="modern_tight_home">Modern Sealed Construction</option>
            </select>
          </div>

          {/* Heating Source */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              Primary Winter Heating
            </h4>
            <select
              value={profile.heatingSource}
              onChange={(e) => updateProfile({ heatingSource: e.target.value as HeatingSource })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-400"
            >
              <option value="electric_heatpump">Inverter Heat Pump (Cleanest)</option>
              <option value="electric_space_heater">Electric Oil/Ceramic Radiator</option>
              <option value="district_steam">Central District Steam / Hot Water</option>
              <option value="gas_radiator">Gas Radiator / Boiler</option>
              <option value="wood_biomass_stove">Wood Stove / Fireplace (High Soot)</option>
              <option value="kerosene_heater">Unvented Kerosene Heater</option>
            </select>
          </div>
        </div>

        {/* Cooking & Commute */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Cooking Source */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-slate-400">
              Kitchen Cooking Method
            </h4>
            <select
              value={profile.cookingSource}
              onChange={(e) => updateProfile({ cookingSource: e.target.value as CookingSource })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-400"
            >
              <option value="induction">Electric Induction / Ceramic (Zero NO2)</option>
              <option value="piped_natural_gas">Piped Natural Gas (Methane)</option>
              <option value="lpg_cylinder">LPG Gas Cylinder</option>
              <option value="wood_chulha">Solid Fuel / Biomass Chulha</option>
            </select>
          </div>

          {/* Commute Mode */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Car className="w-4 h-4 text-teal-400" />
              Daily Commute Mode
            </h4>
            <select
              value={profile.commuteMode}
              onChange={(e) => updateProfile({ commuteMode: e.target.value as CommuteMode })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-400"
            >
              <option value="metro_train">Electric Metro / Rail Transit</option>
              <option value="electric_bus">Public Electric Bus</option>
              <option value="carpool">Shared Carpool (3+ persons)</option>
              <option value="ice_car_solo">Solo Petrol / Diesel Car</option>
              <option value="two_wheeler_bike">Motorcycle / Scooter (High Exposure)</option>
              <option value="bicycle_walking">Bicycle / Walking</option>
              <option value="work_from_home">Work From Home (Zero Commute)</option>
            </select>
          </div>
        </div>

        {/* Purifier & Equipment Checklist */}
        <div className="space-y-3 text-xs">
          <h4 className="font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-teal-400" />
            Existing Clean Air Equipment
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => updateProfile({ hasAirPurifier: !profile.hasAirPurifier })}
              className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                profile.hasAirPurifier
                  ? 'bg-teal-950/40 border-teal-500/60 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400'
              }`}
            >
              <span>Commercial HEPA Purifier</span>
              <div className={`w-4 h-4 rounded flex items-center justify-center ${
                profile.hasAirPurifier ? 'bg-teal-500 text-slate-950 font-bold' : 'border border-slate-700'
              }`}>
                {profile.hasAirPurifier && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => updateProfile({ hasDiyPurifier: !profile.hasDiyPurifier })}
              className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                profile.hasDiyPurifier
                  ? 'bg-teal-950/40 border-teal-500/60 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400'
              }`}
            >
              <span>DIY Corsi-Rosenthal Box</span>
              <div className={`w-4 h-4 rounded flex items-center justify-center ${
                profile.hasDiyPurifier ? 'bg-teal-500 text-slate-950 font-bold' : 'border border-slate-700'
              }`}>
                {profile.hasDiyPurifier && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => updateProfile({ hasExhaustFanInKitchen: !profile.hasExhaustFanInKitchen })}
              className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                profile.hasExhaustFanInKitchen
                  ? 'bg-teal-950/40 border-teal-500/60 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400'
              }`}
            >
              <span>Kitchen Range Exhaust</span>
              <div className={`w-4 h-4 rounded flex items-center justify-center ${
                profile.hasExhaustFanInKitchen ? 'bg-teal-500 text-slate-950 font-bold' : 'border border-slate-700'
              }`}>
                {profile.hasExhaustFanInKitchen && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-md shadow-teal-500/20"
          >
            Save Household Profile
          </button>
        </div>
      </div>
    </div>
  );
};
