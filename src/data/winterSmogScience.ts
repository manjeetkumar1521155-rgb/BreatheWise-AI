export interface ScienceTopic {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  explanation: string;
  keyPoints: string[];
  visualMetric: {
    label: string;
    value: string;
    comparison: string;
  };
}

export const WINTER_SMOG_SCIENCE: ScienceTopic[] = [
  {
    id: 'thermal-inversion',
    title: 'The "Atmospheric Lid": Why Winter Traps Smog',
    subtitle: 'Understanding Temperature Inversions & The Ground Boundary Layer',
    icon: 'Layers',
    explanation: 'Under normal meteorological conditions, air near the Earth\'s surface is warm and buoyant. As it rises, it disperses smoke, vehicle emissions, and dust upwards into the troposphere. In winter, during clear calm nights, the ground rapidly radiates its heat into space. The air in direct contact with the frigid ground cools much faster than the air above it. This traps a dense layer of cold, heavy air at the bottom, topped by a "warm blanket" of air above. Because cold air cannot rise through warm air, this thermal inversion acts like an airtight pressure cooker lid locked down at just 50 to 150 meters height.',
    keyPoints: [
      'Normal Days: Warm air at surface rises -> pollutants disperse into upper atmosphere (mixing height > 2,000m).',
      'Winter Inversion Days: Cold air trapped at surface -> mixing height collapses to < 100m, concentrating all emissions by 10x to 25x.',
      'Valleys & Basins (Salt Lake, Los Angeles, Kathmandu, Po Valley, Indo-Gangetic Basin) amplify this effect by physically walling in the cold pool.'
    ],
    visualMetric: {
      label: 'Boundary Mixing Height',
      value: '60m - 120m',
      comparison: 'Compared to 2,500m on a summer afternoon (a 95% volume compression of breathable air)'
    }
  },
  {
    id: 'pm25-lung-bloodstream',
    title: 'The Sub-Micron Threat: PM2.5 & Ultrafine Particles',
    subtitle: 'How Combustion Soot Bypasses Your Nose and Enters Your Arteries',
    icon: 'Activity',
    explanation: 'Particulate matter is classified by aerodynamic diameter. PM10 (coarse dust, pollen) is largely filtered out by the mucus and hair in your nasal passages. PM2.5 particles are less than 2.5 micrometers in diameter—roughly 1/30th the width of a single human hair. When inhaled, PM2.5 bypasses upper airways and deposits deep within the terminal alveoli of the lungs. Ultrafine particles (PM0.1 from diesel combustion and biomass smoke) are small enough to pass directly through the alveolar-capillary membrane into the bloodstream, triggering systemic arterial inflammation, platelet aggregation, and cardiovascular events.',
    keyPoints: [
      'Nasal & Throat Defense: Blocks coarse PM10 dust (> 10 µm). Completely useless against PM2.5 soot.',
      'Deep Alveoli Deposition: PM2.5 triggers pulmonary macrophage activation, releasing cytokine storms and causing bronchial constriction.',
      'Translocation to Blood: Ultrafine nanoparticles cross into circulation, increasing blood viscosity and 24-hr heart attack risks during smog spikes.'
    ],
    visualMetric: {
      label: 'Particle Scale Comparison',
      value: '2.5 µm vs 70 µm',
      comparison: 'A single human hair strand can hold 28 PM2.5 particles across its diameter'
    }
  },
  {
    id: 'diurnal-smog-cycle',
    title: 'The Diurnal Rhythm: Timing Your Exposure',
    subtitle: 'Why 7:00 AM is the Deadliest Hour and 2:00 PM is the Safest',
    icon: 'Sun',
    explanation: 'Urban air pollution follows a predictable 24-hour diurnal cycle governed by surface thermodynamics. Peak ground pollution occurs between 6:00 AM and 9:00 AM: the nocturnal inversion layer is at its lowest altitude, combined with morning cold-engine traffic starts and domestic heating fires. By 1:00 PM - 3:00 PM, incoming solar solar shortwave radiation warms the ground, breaking the inversion lid and expanding the mixing layer upwards. By 7:00 PM, sunset removes thermal buoyancy and the cold trap snaps shut again for the night.',
    keyPoints: [
      '06:00 - 09:00 (Danger Peak): Nocturnal inversion ceiling < 80m. Zero outdoor running or school exercises.',
      '13:00 - 15:30 (Golden Window): Solar convection expands boundary layer; ideal time for short errands and 10-minute pulse room ventilation.',
      '19:00 - 23:00 (Evening Resurgence): Inversion locks down again as cooking and heating smoke rises and stays trapped.'
    ],
    visualMetric: {
      label: 'Morning vs Afternoon PM2.5 Delta',
      value: 'Down 40% - 60%',
      comparison: 'Particulate density drops significantly between 1:30 PM and 3:00 PM before rebounding at dusk'
    }
  }
];
