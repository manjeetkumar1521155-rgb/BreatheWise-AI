export type VulnerabilityCategory = 'infant' | 'toddler' | 'elderly' | 'asthma' | 'pregnant' | 'athlete' | 'heart_condition';

export type HousingType = 'high_rise_apt' | 'mid_rise_apt' | 'ground_floor' | 'independent_house' | 'older_leaky_home' | 'modern_tight_home';

export type HeatingSource = 'electric_heatpump' | 'electric_space_heater' | 'district_steam' | 'gas_radiator' | 'wood_biomass_stove' | 'kerosene_heater';

export type CookingSource = 'induction' | 'piped_natural_gas' | 'lpg_cylinder' | 'wood_chulha';

export type CommuteMode = 'metro_train' | 'electric_bus' | 'ice_car_solo' | 'carpool' | 'two_wheeler_bike' | 'bicycle_walking' | 'work_from_home';

export interface HouseholdProfile {
  id: string;
  cityName: string;
  neighborhood: string;
  familyMembersCount: number;
  vulnerabilities: VulnerabilityCategory[];
  housingType: HousingType;
  floorLevel: number;
  heatingSource: HeatingSource;
  cookingSource: CookingSource;
  commuteMode: CommuteMode;
  commuteMinutesOneWay: number;
  hasAirPurifier: boolean;
  airPurifierCount: number;
  hasDiyPurifier: boolean;
  hasExhaustFanInKitchen: boolean;
  ventilationHabit: 'morning' | 'afternoon' | 'evening' | 'sealed_always';
  indoorPlantsCount: number;
}

export type AqiSeverity = 'Good' | 'Moderate' | 'UnhealthySensitive' | 'Unhealthy' | 'VeryUnhealthy' | 'Hazardous' | 'Emergency';

export interface HourlyAqi {
  hour: string; // e.g. "06:00"
  aqi: number;
  pm25: number; // in µg/m³
  inversionIntensity: number; // 0-100%
  safeOutdoorActivity: boolean;
  windowVentilationSafe: boolean;
  activityNote: string;
}

export interface CityAirData {
  cityName: string;
  country: string;
  regionType: 'Basin / Valley' | 'Mega-City Coastal' | 'High-Density Inland' | 'Agricultural Belt Border';
  currentAqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  o3: number;
  co: number;
  so2: number;
  temperatureC: number;
  humidityPercent: number;
  windSpeedKmh: number;
  thermalInversionHeightMeters: number; // Low = trapped smog
  inversionTrapLevel: 'Severe Trap' | 'Moderate Trap' | 'Low' | 'Dispersed';
  primaryPollutant: 'PM2.5' | 'NO2' | 'PM10';
  lastUpdated: string;
  hourly24h: HourlyAqi[];
  smogAlertMessage: string;
}

export interface DailyRoutineItem {
  timeBlock: string;
  title: string;
  phase: 'morning' | 'midday' | 'evening' | 'night';
  outdoorRiskLevel: 'Safe' | 'Caution' | 'High Risk' | 'Dangerous';
  recommendedAction: string;
  whyThisMatters: string;
  directEmissionAvoidance: string;
  vulnerableGroupAlert?: string;
  iconName: string;
}

export interface IndoorHack {
  id: string;
  title: string;
  category: 'diy-purifier' | 'ventilation' | 'kitchen-exhaust' | 'sealing-weatherization' | 'heating-safety' | 'humidity-management';
  difficulty: 'Beginner' | 'Intermediate' | 'Weekend Project';
  costTier: 'Zero Cost' | 'Under $15' | '$15 - $40' | '$40 - $70';
  pm25ReductionPercent: number;
  timeToPeakEffectMinutes: number;
  summary: string;
  directImpactExplanation: string;
  scienceBacking: string;
  materialsNeeded: string[];
  steps: string[];
  mistakesToAvoid: string[];
}

export interface SustainableAlternative {
  id: string;
  category: 'Heating & Warmth' | 'Mobility & Commute' | 'Cooking & Kitchen' | 'Waste & Garden' | 'Community Action';
  currentPractice: string;
  ecoAlternative: string;
  co2SavedKgMonth: number;
  pm25AvoidedGramsMonth: number;
  directHouseholdBenefit: string;
  communityMultiplier: string;
  howToAdopt: string[];
}

export interface CommunityPledge {
  id: string;
  title: string;
  description: string;
  category: string;
  impactScore: number;
  pledgedUsersCount: number;
  isPledgedByMe: boolean;
}

export interface CommunityAlert {
  id: string;
  title: string;
  location: string;
  category: 'Crop Burning Smoke' | 'Waste Incineration' | 'Industrial Smoke' | 'Low-Inversion Peak' | 'Dust Resuspension';
  reportedAt: string;
  status: 'Active' | 'Investigating' | 'Cleared';
  upvotes: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedPrompts?: string[];
  directImpactData?: {
    metric: string;
    value: string;
    details: string;
  };
}
