import { IndoorHack } from '../types';

export const INDOOR_AIR_HACKS: IndoorHack[] = [
  {
    id: 'corsi-rosenthal-box',
    title: 'DIY Corsi-Rosenthal Box Air Purifier',
    category: 'diy-purifier',
    difficulty: 'Intermediate',
    costTier: '$40 - $70',
    pm25ReductionPercent: 88,
    timeToPeakEffectMinutes: 20,
    summary: 'Build a high-volume, low-noise community air cleaner using a 20" box fan and four MERV-13 furnace filters.',
    directImpactExplanation: 'Produces a Clean Air Delivery Rate (CADR) of 450-600 CFM (cubic feet per minute) at 1/5th the upfront cost and 1/3rd the replacement filter cost of branded commercial HEPA units. Capable of dropping a 400 sq.ft living room PM2.5 from 320 µg/m³ to under 35 µg/m³ in 22 minutes.',
    scienceBacking: 'By assembling 4 large pleated MERV-13 filters in a cube with a cardboard shroud on the fan face, you expand the filtration surface area to over 30 square feet. This drastically reduces face velocity (air speed through filter media), increasing particle capture efficiency via electrostatic attraction, impaction, and diffusion while preventing motor burnout.',
    materialsNeeded: [
      '1x 20-inch standard electric box fan (approx $20)',
      '4x MERV-13 furnace filters (20" x 20" x 1" or 2" thickness)',
      '1x Cardboard bottom base (20" x 20")',
      '1x Roll of heavy-duty duct tape or gaffer tape',
      'Cardboard ring (14-inch diameter circle cutout) for fan shroud'
    ],
    steps: [
      'Step 1: Inspect the 4 MERV-13 filters and locate the air-flow directional arrows printed on their frames.',
      'Step 2: Stand the 4 filters in an upright square cube on the cardboard base. IMPORTANT: All directional arrows MUST point INWARD into the cube center.',
      'Step 3: Tape all vertical edges tightly with duct tape, ensuring no air leaks through corners.',
      'Step 4: Tape the bottom of the 4 filters securely to the cardboard bottom plate.',
      'Step 5: Place the 20" box fan on top of the filter cube, blowing UPWARD into the room (arrows pointing up). Tape all 4 top junctions airtight.',
      'Step 6: (Crucial Shroud Hack): Cut a 14-inch diameter circle out of a square cardboard sheet and tape it to the front face of the fan. This blocks aerodynamic blade tip vortex backflow and boosts airflow efficiency by 40-50%!',
      'Step 7: Plug in, set fan to Speed 1 or 2 (Speed 1 is whisper-quiet ~44 dB for bedrooms), and enjoy hospital-grade filtration.'
    ],
    mistakesToAvoid: [
      'Do not face filter arrows outward; particles must be trapped on the outer pre-filter pleats.',
      'Never skip the cardboard shroud ring — without it, air recirculates uselessly at the square fan corners.',
      'Do not use fiberglass MERV-8 filters; they do not capture sub-micron PM2.5 winter soot particles.'
    ]
  },
  {
    id: 'pulse-ventilation-protocol',
    title: 'The Winter "Stoßlüften" Pulse Ventilation Method',
    category: 'ventilation',
    difficulty: 'Beginner',
    costTier: 'Zero Cost',
    pm25ReductionPercent: 45,
    timeToPeakEffectMinutes: 10,
    summary: 'Exchange stagnant CO2 and indoor VOCs without letting freezing toxic smog saturate your home interior.',
    directImpactExplanation: 'Prevents carbon dioxide (CO2) from spiking above 1800 ppm (which causes brain fog, headaches, and impaired immune function) while limiting outdoor PM2.5 ingress by 70% compared to leaving a window cracked open all morning.',
    scienceBacking: 'When windows are tilted open continuously (kippen), cold polluted air seeps in slowly, cooling down walls, furniture, and radiant heat thermal mass without creating effective bulk air displacement. "Pulse ventilation" (Stoßlüften) uses cross-room pressure differentials to flush 100% of room air volume in 5-8 minutes flat, then seals before walls lose their thermal heat, allowing rapid air reheated by indoor purifiers.',
    materialsNeeded: [
      'Opposing windows or external door and interior hallway',
      'A timer or phone stopwatch',
      'AQI tracker app (BreatheWise diurnal sweet spot)'
    ],
    steps: [
      'Step 1: Check BreatheWise Diurnal Radar to confirm the diurnal dispersion peak (typically between 1:30 PM and 3:00 PM when solar heat lifts the inversion boundary layer).',
      'Step 2: Turn off all portable air purifiers temporarily so they do not fight the incoming air velocity.',
      'Step 3: Open opposing windows completely (wide open, not cracked) for exactly 6 to 8 minutes to create a rapid cross-draft pressure flush.',
      'Step 4: Seal all windows tightly and latch them firmly.',
      'Step 5: Immediately turn your HEPA or DIY Corsi-Rosenthal unit on HIGH speed for 15 minutes to scrub whatever transient particulates entered.',
      'Step 6: After 15 minutes, reduce purifier back to low/medium maintenance speed.'
    ],
    mistakesToAvoid: [
      'Never open windows between 6:00 AM and 10:00 AM — this is the peak nocturnal inversion trap window with maximum ground-level soot.',
      'Do not leave windows cracked open all day; this freezes your floors and continuously imports fine soot.'
    ]
  },
  {
    id: 'wet-mopping-particulate-sink',
    title: 'Microfiber Wet-Mopping Anti-Resuspension Protocol',
    category: 'humidity-management',
    difficulty: 'Beginner',
    costTier: 'Under $15',
    pm25ReductionPercent: 62,
    timeToPeakEffectMinutes: 15,
    summary: 'Replace dry broom sweeping with damp microfiber mopping to stop lethal sub-micron particulate resuspension.',
    directImpactExplanation: 'Dry sweeping with a standard broom or unsealed vacuum kicks up to 250,000 toxic settled particles per liter of air back into children’s breathing zone (0.5m - 1.2m above floor). Damp wiping physically captures PM2.5, heavy metals, and PAHs.',
    scienceBacking: 'Fine combustion particles (PM2.5) that settle onto floors and rugs are bound by weak van der Waals forces. Footsteps and dry brooms exert sufficient aerodynamic shear stress to resuspend these particles into the air, where they remain suspended for up to 8 hours. Water surface tension forms liquid capillary bridges that agglomerate the dust and lock it into microfiber loops.',
    materialsNeeded: [
      'Microfiber flat mop or damp cotton cloth',
      'Warm water with 2 drops of eco-friendly dish soap (reduces water surface tension for better wetting)',
      'HEPA-certified vacuum (if carpets are present, with sealed gasket)'
    ],
    steps: [
      'Step 1: Do NOT use a dry straw broom or feather duster during severe winter smog episodes.',
      'Step 2: Lightly dampen a microfiber mop with warm water. It should be moist, not dripping.',
      'Step 3: Mop floors in an "S-pattern" from the furthest corner of the room towards the exit doorway.',
      'Step 4: Wipe high-contact horizontal surfaces (windowsills, TV stands, door frames, bookshelf edges) with a damp microfiber cloth.',
      'Step 5: Rinse mop pad in a bucket and flush water down the drain, physically removing toxic heavy metal soot from the household ecosystem.'
    ],
    mistakesToAvoid: [
      'Never vacuum with a bagless non-HEPA vacuum; their exhaust vents spew PM0.3 particles right into the room like an aerosol cannon.',
      'Do not over-saturate wooden floors; keep cloth merely damp.'
    ]
  },
  {
    id: 'kitchen-capture-efficiency-hack',
    title: 'Range Hood Flow Deflector & Kitchen Sealing',
    category: 'kitchen-exhaust',
    difficulty: 'Beginner',
    costTier: 'Zero Cost',
    pm25ReductionPercent: 82,
    timeToPeakEffectMinutes: 5,
    summary: 'Maximize kitchen hood plume capture by 80% to stop cooking fumes from polluting family bedrooms.',
    directImpactExplanation: 'Frying, roasting, and gas combustion generate indoor PM2.5 spikes exceeding 600 µg/m³ (worse than outdoor smog!). This hack confines the plume and extracts it outside without letting it disperse into living rooms.',
    scienceBacking: 'Thermal plumes from cooking stoves rise in a conical vortex. Uncontained kitchen cross-drafts cause the plume to spill out of the hood catchment area. Applying backburner priority and a cardboard side draft deflector creates a laminar capture envelope, increasing extraction efficiency from 35% to over 85%.',
    materialsNeeded: [
      'Existing kitchen exhaust fan or range hood',
      'Kitchen door or heavy curtain divider',
      'Masking tape / draft barrier'
    ],
    steps: [
      'Step 1: Close the kitchen door or draw the heavy hallway curtain completely before turning on any stove.',
      'Step 2: Turn the exhaust fan ON 2 minutes BEFORE striking the flame to establish an established negative pressure draft.',
      'Step 3: Always cook on the BACK BURNERS when frying or searing — back burners have 2.5x higher capture efficiency than front burners.',
      'Step 4: Crack a small utility window inside the kitchen just 1 inch to supply "makeup air" so the exhaust fan doesn’t pull smoky air backwards from living room cracks.',
      'Step 5: Keep the exhaust running for 8 minutes AFTER cooking finishes until all thermal vapor is exhausted.'
    ],
    mistakesToAvoid: [
      'Do not cook with the kitchen door open to the living room while purifiers are running; it will foul your HEPA filters with greasy aerosols.',
      'Avoid high-temperature wok searing or unlidded deep frying on peak smog days.'
    ]
  },
  {
    id: 'microclimate-door-sweep-sealing',
    title: 'DIY Foam & Silicone Door-Sweep Draft Blockers',
    category: 'sealing-weatherization',
    difficulty: 'Beginner',
    costTier: 'Under $15',
    pm25ReductionPercent: 54,
    timeToPeakEffectMinutes: 30,
    summary: 'Seal the 1/2-inch gap under your main entry door and balcony sliders to stop continuous soot infiltration.',
    directImpactExplanation: 'A single 1/4-inch crack under a standard exterior door leaks the equivalent volume of a 3-inch hole punched directly through your wall, importing up to 14,000 liters of outdoor smoggy air every hour via wind pressure.',
    scienceBacking: 'The "Stack Effect" in winter causes warm indoor air to rise towards the ceiling and upper floors, creating low pressure at the ground/lower levels that relentlessly sucks cold, smog-laden outdoor air through door bottoms and unsealed window tracks.',
    materialsNeeded: [
      'Self-adhesive silicone door bottom sweep OR twin-draft fabric stopper ($6 - $12)',
      'Foam weatherstripping tape (high-density EPDM rubber)',
      'Scissors or utility knife',
      'Rubbing alcohol for cleaning surface'
    ],
    steps: [
      'Step 1: Check for leaks: turn off lights at night and have someone shine a flashlight along the exterior door edges; any light visible inside indicates air entry.',
      'Step 2: Wipe the bottom exterior and frame of your door with rubbing alcohol to remove grease and dust.',
      'Step 3: Peel adhesive backing from the silicone door sweep and press firmly against the bottom of the door, ensuring the flexible silicone fins just touch the floor threshold.',
      'Step 4: Apply rubber foam weatherstripping tape along the door jamb where the door latches.',
      'Step 5: For sliding glass doors or balcony sliders, place a weighted fabric draft snake along the sliding track.'
    ],
    mistakesToAvoid: [
      'Do not mount the door sweep so low that it drags heavily and peels off after two days.',
      'Do not seal so tightly that bathroom exhaust fans pull sewer gases; maintain proper room balances.'
    ]
  },
  {
    id: 'humidity-mucous-barrier-shield',
    title: 'Winter 45% Relative Humidity Mucociliary Defense',
    category: 'humidity-management',
    difficulty: 'Beginner',
    costTier: 'Zero Cost',
    pm25ReductionPercent: 35,
    timeToPeakEffectMinutes: 45,
    summary: 'Maintain indoor humidity between 40-50% to prevent dry mucous membranes from letting smog particles enter your bloodstream.',
    directImpactExplanation: 'When winter heating dries indoor air below 25% RH, the cilia in your respiratory tract become paralyzed, allowing PM2.5 and PM0.1 particles to directly penetrate bronchial epithelial cells. Keeping RH at 45% preserves natural mucosal clearance.',
    scienceBacking: 'The human mucociliary escalator depends on a thin periciliary fluid sol layer and a viscous mucus gel layer. In dry winter air, dehydration collapses this layer, shutting down the rhythmic beating of epithelial cilia (12 Hz) that continuously sweeps particulate debris up and out of the lungs.',
    materialsNeeded: [
      'Digital hygrometer (indoor thermometer + humidity meter ~$8)',
      'Clean mist humidifier OR wide shallow bowls of water placed near radiators / warm air vents',
      'Clean filtered or distilled water'
    ],
    steps: [
      'Step 1: Place a digital hygrometer in the main bedroom away from direct airflow.',
      'Step 2: If reading is below 35% RH, activate a cool-mist ultrasonic humidifier or place a clean damp towel over a warm radiator.',
      'Step 3: Target strictly 40% to 50% relative humidity. Never exceed 55% RH in winter, as high humidity on cold exterior window glass can cause condensation and mold spores.',
      'Step 4: CRUCIAL: Clean humidifier tanks with white vinegar every 3 days. Ultrasonic humidifiers will aerosolize hard mineral tap water into fine "white dust" PM particles unless distilled water or demineralization filters are used.'
    ],
    mistakesToAvoid: [
      'Do not use unpurified high-mineral tap water in ultrasonic humidifiers; it creates mineral PM2.5.',
      'Do not let humidity exceed 55%, which breeds dust mites and fungal spores.'
    ]
  }
];
