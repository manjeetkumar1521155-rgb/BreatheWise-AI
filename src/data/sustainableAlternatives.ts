import { SustainableAlternative } from '../types';

export const SUSTAINABLE_ALTERNATIVES: SustainableAlternative[] = [
  {
    id: 'heating-heatpump-transition',
    category: 'Heating & Warmth',
    currentPractice: 'Open fireplace, wood stove, or unvented kerosene/gas space heater',
    ecoAlternative: 'Sealed Inverter Heat Pump / Mica-Thermic Convective Electric Panel',
    co2SavedKgMonth: 145,
    pm25AvoidedGramsMonth: 1200,
    directHouseholdBenefit: 'Eliminates deadly carbon monoxide (CO) and cancer-causing polycyclic aromatic hydrocarbons (PAHs) inside the living room. Cuts child asthma flare-ups by up to 65%.',
    communityMultiplier: 'A single wood-burning stove operating for 4 hours releases as much PM2.5 as 18 modern diesel cars driving simultaneously. Replacing 50 neighborhood stoves cleans ambient street smog by 14-22%.',
    howToAdopt: [
      'Replace unvented kerosene heaters with electric oil-filled radiators or reverse-cycle inverter ACs (heat pumps).',
      'Seal off unused chimney flues with an inflatable chimney balloon to stop outdoor smog back-drafting into the living room.',
      'Wear thermal base layers (merino wool/fleece) indoors to maintain comfort at 20°C (68°F) rather than cranking combustion heating.'
    ]
  },
  {
    id: 'commute-metro-carpool',
    category: 'Mobility & Commute',
    currentPractice: 'Solo driving in diesel/petrol SUV with cold-start morning idling',
    ecoAlternative: 'Electric Metro rail, commuter rail, or smart carpool with cabin HEPA filter',
    co2SavedKgMonth: 92,
    pm25AvoidedGramsMonth: 380,
    directHouseholdBenefit: 'Commuters in private cars stuck in bumper-to-bumper traffic inhale up to 40% MORE toxic ultrafine particulates than train riders because cars suck vehicle exhaust from the tailpipe directly ahead.',
    communityMultiplier: 'If 250 commuters switch to rail or shared bus lines during winter inversion months, peak morning road emissions plummet by 1.8 metric tons of NOx and 45 kg of ground soot per week.',
    howToAdopt: [
      'Map your nearest metro/rapid bus transit station with a multi-modal e-rickshaw or electric shuttle first-mile connection.',
      'If driving is unavoidable, ALWAYS switch cabin climate control to "RECIRCULATE" mode 30 seconds before hitting congested junctions.',
      'Replace your standard vehicle cabin air filter with an activated carbon + HEPA cabin filter ($15 DIY change).'
    ]
  },
  {
    id: 'cooking-induction-transition',
    category: 'Cooking & Kitchen',
    currentPractice: 'Gas burner without exterior exhaust or kerosene stove',
    ecoAlternative: 'Portable Smart Induction Cooktop + Lidded Steaming & Simmering',
    co2SavedKgMonth: 38,
    pm25AvoidedGramsMonth: 210,
    directHouseholdBenefit: 'Gas stoves emit nitrogen dioxide (NO2) at levels that regularly violate WHO 1-hour limits, causing 12.7% of childhood asthma cases. Induction produces ZERO combustion gases, ZERO NO2, and cuts indoor heat loss by 85%.',
    communityMultiplier: 'Widespread urban adoption of induction cooking reduces localized indoor building venting loads, lowering evening street-level nitrogen oxide peaks across dense apartment complexes.',
    howToAdopt: [
      'Acquire a 1800W - 2000W countertop induction cooktop ($40 - $60) for daily boiling, simmering, and curries.',
      'Always cook with tight-fitting glass lids on pots to trap moisture and prevent oily vapor aerosols from aerosolizing.',
      'Avoid high-heat open-flame charring and deep frying during "Severe Trap" winter inversion days.'
    ]
  },
  {
    id: 'waste-composting-mulching',
    category: 'Waste & Garden',
    currentPractice: 'Sweeping and burning dry autumn leaves, garden clippings, and plastic waste',
    ecoAlternative: 'Community Leaf Composting Pit / Soil Mulching / Municipality Organic Bin',
    co2SavedKgMonth: 65,
    pm25AvoidedGramsMonth: 950,
    directHouseholdBenefit: 'Prevents acute localized choking smog plumes from entering your own windows and air intake grates. Protects pets and toddlers playing outdoors.',
    communityMultiplier: 'Leaf and trash burning is responsible for 15-28% of winter ground-level toxic haze in urban fringes. Shredding and mulching keeps 100% of organic carbon in the soil as nutrient fertilizer.',
    howToAdopt: [
      'Designate a 3x3 ft corner of the community yard or balcony tumbler for fallen leaves and organic trimmings.',
      'Layer dry brown leaves with green vegetable scraps and a splash of water for rapid aerobic composting.',
      'Report any illegal street-corner trash burning immediately through the BreatheWise Community Board.'
    ]
  },
  {
    id: 'community-school-anti-idling',
    category: 'Community Action',
    currentPractice: 'Leaving car engine idling with heater on during 25-minute school pickup lines',
    ecoAlternative: 'Community "Engine-Off" School Pledge Zone + Coordinated Walking School Bus',
    co2SavedKgMonth: 45,
    pm25AvoidedGramsMonth: 290,
    directHouseholdBenefit: 'Idling cars create an invisible toxic cloud of benzene, carbon monoxide, and black carbon at exactly the height of children’s lungs waiting on the sidewalk.',
    communityMultiplier: 'A zero-idling school zone drops playground PM2.5 levels by 42% between 2:30 PM and 3:30 PM, preventing acute childhood bronchospasms.',
    howToAdopt: [
      'Turn off your car engine if parked for more than 10 seconds. Modern engines use less fuel restarting than idling for 10s.',
      'Organize school parents into a 4-family rotation carpool, taking 3 cars off the road every single morning.',
      'Introduce the BreatheWise Anti-Idling School Flyer to your Parent-Teacher Association (PTA).'
    ]
  }
];
