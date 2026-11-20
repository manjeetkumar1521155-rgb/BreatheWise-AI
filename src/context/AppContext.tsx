import React, { createContext, useContext, useState, useEffect } from 'react';
import { HouseholdProfile, CityAirData, CommunityPledge, CommunityAlert } from '../types';
import { CITIES_DATA } from '../data/airQualityData';
import { GeminiService } from '../services/geminiService';
import confetti from 'canvas-confetti';

interface AppContextType {
  profile: HouseholdProfile;
  updateProfile: (updates: Partial<HouseholdProfile>) => void;
  selectedCityKey: string;
  setSelectedCityKey: (key: string) => void;
  airData: CityAirData;
  setSimulatedAqi: (aqi: number) => void;
  resetSimulatedAqi: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pledges: CommunityPledge[];
  togglePledge: (id: string) => void;
  alerts: CommunityAlert[];
  addAlert: (alert: Omit<CommunityAlert, 'id' | 'reportedAt' | 'upvotes' | 'status'>) => void;
  upvoteAlert: (id: string) => void;
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  isApiKeyModalOpen: boolean;
  setIsApiKeyModalOpen: (open: boolean) => void;
  calculatedMetrics: {
    co2SavedKg: number;
    pm25AvoidedGrams: number;
    hoursOfCleanAirBonus: number;
    treesEquivalent: number;
  };
}

const DEFAULT_PROFILE: HouseholdProfile = {
  id: 'default-profile',
  cityName: 'Delhi NCR',
  neighborhood: 'Civil Lines / North Enclave',
  familyMembersCount: 4,
  vulnerabilities: ['infant', 'asthma'],
  housingType: 'mid_rise_apt',
  floorLevel: 3,
  heatingSource: 'electric_space_heater',
  cookingSource: 'lpg_cylinder',
  commuteMode: 'metro_train',
  commuteMinutesOneWay: 35,
  hasAirPurifier: true,
  airPurifierCount: 1,
  hasDiyPurifier: false,
  hasExhaustFanInKitchen: true,
  ventilationHabit: 'afternoon',
  indoorPlantsCount: 5,
};

const INITIAL_PLEDGES: CommunityPledge[] = [
  {
    id: 'pledge-anti-idling',
    title: 'Zero Vehicle Idling in School Zones',
    description: 'Pledge to switch off car engine during pickup/dropoff waits over 10 seconds.',
    category: 'Mobility',
    impactScore: 40,
    pledgedUsersCount: 184,
    isPledgedByMe: true,
  },
  {
    id: 'pledge-no-leaf-burn',
    title: 'Zero Biomass & Waste Burning Neighborhood',
    description: 'Pledge to mulch garden clippings and immediately report open trash burning to local marshals.',
    category: 'Waste',
    impactScore: 85,
    pledgedUsersCount: 312,
    isPledgedByMe: true,
  },
  {
    id: 'pledge-shared-carpool',
    title: 'Smog-Season Carpool / Transit Shift',
    description: 'Pledge to use metro, bus, or shared 3+ person carpool at least 3 days per week this winter.',
    category: 'Transit',
    impactScore: 60,
    pledgedUsersCount: 228,
    isPledgedByMe: false,
  },
  {
    id: 'pledge-corsi-rosenthal',
    title: 'Build or Sponsor a Classroom DIY Air Cleaner',
    description: 'Build or co-fund a $50 Corsi-Rosenthal MERV-13 air purifier for a local nursery, daycare, or school room.',
    category: 'Indoor IAQ',
    impactScore: 95,
    pledgedUsersCount: 147,
    isPledgedByMe: false,
  },
  {
    id: 'pledge-clean-cooking',
    title: 'Kitchen Containment & Induction Priority',
    description: 'Pledge to isolate kitchen drafts and shift boiling/stewing to induction during severe inversion warnings.',
    category: 'Indoor IAQ',
    impactScore: 35,
    pledgedUsersCount: 195,
    isPledgedByMe: false,
  }
];

const INITIAL_ALERTS: CommunityAlert[] = [
  {
    id: 'alert-1',
    title: 'Open trash incinerating behind sector 4 commercial market',
    location: 'North Zone - Sector 4 Service Alley',
    category: 'Waste Incineration',
    reportedAt: '25 mins ago',
    status: 'Active',
    upvotes: 29
  },
  {
    id: 'alert-2',
    title: 'Thick agricultural crop smoke plume drifting from northwest peri-urban belt',
    location: 'North-West Border Toll Area',
    category: 'Crop Burning Smoke',
    reportedAt: '1 hour ago',
    status: 'Active',
    upvotes: 56
  },
  {
    id: 'alert-3',
    title: 'High diesel particulate hotspot near ring road container truck bottleneck',
    location: 'Eastern Bypass Flyover',
    category: 'Low-Inversion Peak',
    reportedAt: '2 hours ago',
    status: 'Investigating',
    upvotes: 41
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<HouseholdProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('breathewise_profile');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
    }
    return DEFAULT_PROFILE;
  });

  const [selectedCityKey, setSelectedCityKey] = useState<string>('delhi-ncr');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [geminiApiKey, setGeminiApiKeyState] = useState<string>(() => GeminiService.getApiKey());
  
  const [pledges, setPledges] = useState<CommunityPledge[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('breathewise_pledges');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
    }
    return INITIAL_PLEDGES;
  });

  const [alerts, setAlerts] = useState<CommunityAlert[]>(INITIAL_ALERTS);
  const [simulatedAqiOffset, setSimulatedAqiOffset] = useState<number | null>(null);

  // Sync profile to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('breathewise_profile', JSON.stringify(profile));
    }
  }, [profile]);

  // Sync pledges to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('breathewise_pledges', JSON.stringify(pledges));
    }
  }, [pledges]);

  const updateProfile = (updates: Partial<HouseholdProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const setGeminiApiKey = (key: string) => {
    setGeminiApiKeyState(key);
    GeminiService.setApiKey(key);
  };

  const togglePledge = (id: string) => {
    setPledges(prev => prev.map(p => {
      if (p.id === id) {
        const nextState = !p.isPledgedByMe;
        if (nextState) {
          // Trigger joyful celebration confetti
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 }
            });
          } catch (e) {}
        }
        return {
          ...p,
          isPledgedByMe: nextState,
          pledgedUsersCount: nextState ? p.pledgedUsersCount + 1 : p.pledgedUsersCount - 1
        };
      }
      return p;
    }));
  };

  const addAlert = (alertData: Omit<CommunityAlert, 'id' | 'reportedAt' | 'upvotes' | 'status'>) => {
    const newAlert: CommunityAlert = {
      id: `alert-${Date.now()}`,
      title: alertData.title,
      location: alertData.location,
      category: alertData.category,
      reportedAt: 'Just now',
      status: 'Active',
      upvotes: 1
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const upvoteAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, upvotes: a.upvotes + 1 } : a));
  };

  // Base city air data with optional simulation override
  const baseCity = CITIES_DATA[selectedCityKey] || CITIES_DATA['delhi-ncr'];
  const airData: CityAirData = simulatedAqiOffset !== null ? {
    ...baseCity,
    currentAqi: Math.max(10, Math.min(600, simulatedAqiOffset)),
    pm25: Math.round(simulatedAqiOffset * 0.85 * 10) / 10,
    pm10: Math.round(simulatedAqiOffset * 1.25 * 10) / 10,
    inversionTrapLevel: simulatedAqiOffset > 250 ? 'Severe Trap' : simulatedAqiOffset > 150 ? 'Moderate Trap' : 'Low'
  } : baseCity;

  const setSimulatedAqi = (aqi: number) => {
    setSimulatedAqiOffset(aqi);
  };

  const resetSimulatedAqi = () => {
    setSimulatedAqiOffset(null);
  };

  // Calculate direct impact metrics based on profile and pledges
  const myPledgesCount = pledges.filter(p => p.isPledgedByMe).length;
  const transitBonus = profile.commuteMode === 'metro_train' || profile.commuteMode === 'electric_bus' ? 92 : 0;
  const heatingBonus = profile.heatingSource === 'electric_heatpump' || profile.heatingSource === 'electric_space_heater' ? 110 : 0;
  const filterBonus = (profile.hasAirPurifier ? 1 : 0) + (profile.hasDiyPurifier ? 1.5 : 0);

  const calculatedMetrics = {
    co2SavedKg: Math.round(transitBonus + heatingBonus + (myPledgesCount * 28)),
    pm25AvoidedGrams: Math.round((transitBonus * 3.8) + (heatingBonus * 8.2) + (myPledgesCount * 125)),
    hoursOfCleanAirBonus: Math.round(filterBonus * 14 * 7),
    treesEquivalent: Math.max(1, Math.round((transitBonus + heatingBonus) / 15))
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        selectedCityKey,
        setSelectedCityKey,
        airData,
        setSimulatedAqi,
        resetSimulatedAqi,
        activeTab,
        setActiveTab,
        pledges,
        togglePledge,
        alerts,
        addAlert,
        upvoteAlert,
        geminiApiKey,
        setGeminiApiKey,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isApiKeyModalOpen,
        setIsApiKeyModalOpen,
        calculatedMetrics
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
