import { CityAirData, HourlyAqi } from '../types';

export const CITIES_DATA: Record<string, CityAirData> = {
  'delhi-ncr': {
    cityName: 'Delhi NCR',
    country: 'India',
    regionType: 'Agricultural Belt Border',
    currentAqi: 388,
    pm25: 324.5,
    pm10: 468.2,
    no2: 89.4,
    o3: 28.1,
    co: 4.8,
    so2: 24.3,
    temperatureC: 13,
    humidityPercent: 86,
    windSpeedKmh: 4.2,
    thermalInversionHeightMeters: 65,
    inversionTrapLevel: 'Severe Trap',
    primaryPollutant: 'PM2.5',
    lastUpdated: 'Live Winter Radar - 08:30 AM',
    smogAlertMessage: 'CRITICAL WINTER INVERSION: Cold air ceiling at 65m is locking vehicular exhaust & biomass smoke at breathing level. Keep vulnerable family members strictly indoors.',
    hourly24h: [
      { hour: '00:00', aqi: 360, pm25: 300, inversionIntensity: 90, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Dense nocturnal inversion. Bedroom seals active.' },
      { hour: '02:00', aqi: 375, pm25: 315, inversionIntensity: 95, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Radiation cooling peak. Keep purifiers running.' },
      { hour: '04:00', aqi: 395, pm25: 335, inversionIntensity: 98, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Pre-dawn cold trap maximum. Ground layer saturated.' },
      { hour: '06:00', aqi: 425, pm25: 370, inversionIntensity: 100, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Peak Smog Danger: Cold starts + locked inversion. Cancel morning runs.' },
      { hour: '08:00', aqi: 410, pm25: 350, inversionIntensity: 92, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'School rush hour spike. Wear tight-fit N95; recirculate car AC.' },
      { hour: '10:00', aqi: 360, pm25: 295, inversionIntensity: 80, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Solar radiation beginning to break boundary layer.' },
      { hour: '12:00', aqi: 310, pm25: 240, inversionIntensity: 60, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Boundary layer expanding to 400m. Modest dispersion.' },
      { hour: '14:00', aqi: 265, pm25: 195, inversionIntensity: 45, safeOutdoorActivity: false, windowVentilationSafe: true, activityNote: 'Optimal Daily Window: Brief 10-min cross-ventilation if CO2 is high.' },
      { hour: '16:00', aqi: 285, pm25: 215, inversionIntensity: 55, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Sun angle dropping; ground cooling begins.' },
      { hour: '18:00', aqi: 350, pm25: 280, inversionIntensity: 78, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Evening inversion snap. Traffic emissions trapped again.' },
      { hour: '20:00', aqi: 395, pm25: 330, inversionIntensity: 88, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Dinner cooking peak + nocturnal chill. Run kitchen exhaust + HEPA.' },
      { hour: '22:00', aqi: 380, pm25: 320, inversionIntensity: 92, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Stagnant boundary layer < 100m. Pre-sleep bedroom air wash.' },
    ]
  },
  'lahore': {
    cityName: 'Lahore',
    country: 'Pakistan',
    regionType: 'Agricultural Belt Border',
    currentAqi: 415,
    pm25: 368.0,
    pm10: 512.0,
    no2: 95.0,
    o3: 22.0,
    co: 5.2,
    so2: 32.0,
    temperatureC: 12,
    humidityPercent: 88,
    windSpeedKmh: 3.5,
    thermalInversionHeightMeters: 55,
    inversionTrapLevel: 'Severe Trap',
    primaryPollutant: 'PM2.5',
    smogAlertMessage: 'HAZARDOUS SMOG EMERGENCY: Fog-smoke chemical aerosol cocktail trapped by calm winds and shallow thermal ceiling. School/workplace advisories in effect.',
    lastUpdated: 'Live Winter Radar - 08:30 AM',
    hourly24h: [
      { hour: '06:00', aqi: 440, pm25: 410, inversionIntensity: 100, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Severe dense smog. Visibility under 200m. Zero outdoor exertion.' },
      { hour: '10:00', aqi: 390, pm25: 340, inversionIntensity: 85, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Persistent toxic haze. Wear certified N95/FFP2 masks.' },
      { hour: '14:00', aqi: 320, pm25: 260, inversionIntensity: 50, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Marginal daylight thinning. Do not ventilate open air.' },
      { hour: '18:00', aqi: 385, pm25: 330, inversionIntensity: 80, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Rapid evening cooling. Domestic heating & brick kiln plumes sink.' },
      { hour: '22:00', aqi: 430, pm25: 390, inversionIntensity: 95, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Nocturnal boundary lock. Keep air filtration in continuous sleep mode.' }
    ]
  },
  'salt-lake-city': {
    cityName: 'Salt Lake City Basin',
    country: 'United States',
    regionType: 'Basin / Valley',
    currentAqi: 158,
    pm25: 68.4,
    pm10: 82.0,
    no2: 44.0,
    o3: 18.0,
    co: 1.8,
    so2: 4.5,
    temperatureC: -2,
    humidityPercent: 74,
    windSpeedKmh: 5.1,
    thermalInversionHeightMeters: 140,
    inversionTrapLevel: 'Moderate Trap',
    primaryPollutant: 'PM2.5',
    smogAlertMessage: 'VALLEY PERSISTENT COLD-AIR POOL (PCAP): High pressure cap over Wasatch mountains trapping wood burning, mobile sources, and ammonium nitrate aerosols.',
    lastUpdated: 'Live Winter Radar - 08:30 AM',
    hourly24h: [
      { hour: '06:00', aqi: 172, pm25: 82, inversionIntensity: 88, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Basin inversion trapping morning commute exhaust.' },
      { hour: '10:00', aqi: 160, pm25: 72, inversionIntensity: 75, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Sunlight photochemical transformation of NOx into ammonium nitrate.' },
      { hour: '14:00', aqi: 135, pm25: 49, inversionIntensity: 50, safeOutdoorActivity: true, windowVentilationSafe: true, activityNote: 'Best window for essential outdoor tasks. Light exertion acceptable.' },
      { hour: '18:00', aqi: 155, pm25: 65, inversionIntensity: 70, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Evening residential heating additions; valley lid re-tightens.' },
      { hour: '22:00', aqi: 168, pm25: 78, inversionIntensity: 82, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Cool air pooling. No wood burning voluntary curfew.' }
    ]
  },
  'beijing-hebei': {
    cityName: 'Beijing - Hebei Plain',
    country: 'China',
    regionType: 'High-Density Inland',
    currentAqi: 182,
    pm25: 98.2,
    pm10: 160.0,
    no2: 58.0,
    o3: 15.0,
    co: 2.1,
    so2: 12.0,
    temperatureC: 1,
    humidityPercent: 68,
    windSpeedKmh: 6.8,
    thermalInversionHeightMeters: 180,
    inversionTrapLevel: 'Moderate Trap',
    primaryPollutant: 'PM2.5',
    smogAlertMessage: 'WINTER CENTRAL HEATING STAGNATION: Southern low-level moisture combined with stagnant northern cold front creating particulate accumulation.',
    lastUpdated: 'Live Winter Radar - 08:30 AM',
    hourly24h: [
      { hour: '06:00', aqi: 195, pm25: 110, inversionIntensity: 85, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Early morning boiler emissions + low mixing height.' },
      { hour: '12:00', aqi: 165, pm25: 80, inversionIntensity: 55, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Moderate solar heating. Light masking advised outdoors.' },
      { hour: '15:00', aqi: 145, pm25: 65, inversionIntensity: 40, safeOutdoorActivity: true, windowVentilationSafe: true, activityNote: 'Clearest hour of the day. Quick 15m window flush.' },
      { hour: '20:00', aqi: 190, pm25: 105, inversionIntensity: 80, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'District heating surge. Turn on domestic purifiers.' }
    ]
  },
  'krakow-katowice': {
    cityName: 'Krakow - Silesia Basin',
    country: 'Poland',
    regionType: 'Basin / Valley',
    currentAqi: 168,
    pm25: 75.0,
    pm10: 115.0,
    no2: 48.0,
    o3: 20.0,
    co: 1.9,
    so2: 28.0,
    temperatureC: -1,
    humidityPercent: 82,
    windSpeedKmh: 4.8,
    thermalInversionHeightMeters: 120,
    inversionTrapLevel: 'Moderate Trap',
    primaryPollutant: 'PM2.5',
    smogAlertMessage: 'VISTULA VALLEY INVERSION: "Low-stack emissions" from coal/wood domestic furnaces trapped under dense valley fog layer.',
    lastUpdated: 'Live Winter Radar - 08:30 AM',
    hourly24h: [
      { hour: '06:00', aqi: 180, pm25: 88, inversionIntensity: 85, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Morning boiler re-firing. High benzo[a]pyrene concentration.' },
      { hour: '13:00', aqi: 140, pm25: 52, inversionIntensity: 45, safeOutdoorActivity: true, windowVentilationSafe: true, activityNote: 'Sunlight lifts valley fog. Brief errands window.' },
      { hour: '19:00', aqi: 195, pm25: 102, inversionIntensity: 90, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Peak evening home heating smoke. Seal drafty doors & vents.' }
    ]
  },
  'london': {
    cityName: 'Greater London',
    country: 'United Kingdom',
    regionType: 'High-Density Inland',
    currentAqi: 76,
    pm25: 24.5,
    pm10: 38.0,
    no2: 52.0,
    o3: 25.0,
    co: 0.9,
    so2: 5.0,
    temperatureC: 6,
    humidityPercent: 84,
    windSpeedKmh: 9.0,
    thermalInversionHeightMeters: 320,
    inversionTrapLevel: 'Low',
    primaryPollutant: 'NO2',
    smogAlertMessage: 'MODERATE URBAN CANYON STAGNATION: Cold still air trapping diesel bus/van NOx and domestic wood-burning stove particulate in street canyons.',
    lastUpdated: 'Live Winter Radar - 08:30 AM',
    hourly24h: [
      { hour: '07:00', aqi: 92, pm25: 32, inversionIntensity: 65, safeOutdoorActivity: true, windowVentilationSafe: false, activityNote: 'Morning rush hour street canyon NOx surge. Avoid major arterial roads.' },
      { hour: '14:00', aqi: 62, pm25: 18, inversionIntensity: 30, safeOutdoorActivity: true, windowVentilationSafe: true, activityNote: 'Good dispersal window. Ideal for walking & airing out rooms.' },
      { hour: '20:00', aqi: 85, pm25: 28, inversionIntensity: 55, safeOutdoorActivity: true, windowVentilationSafe: false, activityNote: 'Domestic wood stove emissions in residential boroughs.' }
    ]
  },
  'bakersfield-ca': {
    cityName: 'San Joaquin Valley (Bakersfield)',
    country: 'United States',
    regionType: 'Basin / Valley',
    currentAqi: 154,
    pm25: 64.0,
    pm10: 95.0,
    no2: 36.0,
    o3: 30.0,
    co: 1.4,
    so2: 3.0,
    temperatureC: 8,
    humidityPercent: 89,
    windSpeedKmh: 3.8,
    thermalInversionHeightMeters: 130,
    inversionTrapLevel: 'Moderate Trap',
    primaryPollutant: 'PM2.5',
    smogAlertMessage: 'CENTRAL VALLEY TULE FOG & INVERSION: Sierra Nevada and Coast Ranges wall in stagnant cold air, trapping diesel corridor and agricultural dust.',
    lastUpdated: 'Live Winter Radar - 08:30 AM',
    hourly24h: [
      { hour: '06:00', aqi: 165, pm25: 76, inversionIntensity: 85, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Thick tule fog holding fine nitrates. Avoid morning jog.' },
      { hour: '14:00', aqi: 125, pm25: 45, inversionIntensity: 42, safeOutdoorActivity: true, windowVentilationSafe: true, activityNote: 'Afternoon sun burns off fog layer. Moderate air clearing.' },
      { hour: '21:00', aqi: 162, pm25: 72, inversionIntensity: 80, safeOutdoorActivity: false, windowVentilationSafe: false, activityNote: 'Ground cools; fog banks roll back with trapped PM2.5.' }
    ]
  }
};

export const getAqiDetails = (aqi: number) => {
  if (aqi <= 50) {
    return {
      severity: 'Good' as const,
      color: '#10b981',
      bgClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      label: 'Good Air Quality',
      summary: 'Air quality is satisfactory and poses little to no health risk.',
      action: 'Safe for all outdoor activities and natural room ventilation.'
    };
  } else if (aqi <= 100) {
    return {
      severity: 'Moderate' as const,
      color: '#f59e0b',
      bgClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      label: 'Moderate Pollution',
      summary: 'Air quality is acceptable; unusually sensitive individuals should take caution.',
      action: 'Sensitive family members (asthma, infants) should limit prolonged outdoor exertion.'
    };
  } else if (aqi <= 150) {
    return {
      severity: 'UnhealthySensitive' as const,
      color: '#f97316',
      bgClass: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      label: 'Unhealthy for Sensitive Groups',
      summary: 'Members of sensitive groups may experience immediate respiratory irritation.',
      action: 'Children, seniors, and asthmatics should move workouts indoors. Keep windows closed.'
    };
  } else if (aqi <= 200) {
    return {
      severity: 'Unhealthy' as const,
      color: '#ef4444',
      bgClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      label: 'Unhealthy Smog Level',
      summary: 'Everyone may begin to experience adverse health effects; sensitive groups suffer worse.',
      action: 'Wear certified N95/FFP2 masks outdoors. Run indoor air purifiers on high.'
    };
  } else if (aqi <= 300) {
    return {
      severity: 'VeryUnhealthy' as const,
      color: '#a855f7',
      bgClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      label: 'Very Unhealthy / Severe',
      summary: 'Health alert: serious risk of respiratory symptoms and cardiovascular aggravation across population.',
      action: 'Seal all window drafts. Restrict children and elderly to filtered rooms. Avoid outdoor exercise.'
    };
  } else {
    return {
      severity: 'Hazardous' as const,
      color: '#e11d48',
      bgClass: 'bg-red-600/20 text-red-400 border-red-500/40 animate-pulse-slow',
      label: 'Hazardous / Emergency Inversion',
      summary: 'Emergency health conditions: entire population is likely to be severely affected.',
      action: 'Immediate respiratory defense mode: do not open exterior doors needlessly. Operate continuous HEPA/Corsi-Rosenthal filtration.'
    };
  }
};
