# 🌬️ BreatheWise AI — Winter Smog & Urban Air Defense Assistant

> **A GenAI-powered community and household air defense platform that helps families navigate severe winter smog and urban air pollution through low-emission routines, indoor air quality (IAQ) hacks, sustainable alternatives, and direct impact quantification.**

---

## 🌟 Key Capabilities & Features

### 1. 🤖 AeroGuide AI (GenAI Clinical & Environmental Assistant)
- **Context-Aware Reasoning**: Calibrated to your live location, active AQI, meteorological thermal inversion height, and household demographics (infants, asthmatics, pregnant women, elderly, athletes).
- **Gemini API Integration**: Direct connection with `gemini-1.5-flash` via the official Google Generative AI SDK, plus an **Offline Clinical Reasoning Engine** that delivers instant, structured responses even without an API key.
- **Direct Impact Breakdown**: Every assistant response provides an immediate quantified impact metric (e.g., % particulate dose reduction, avoided toxic soot in grams, clean air delivery hours).
- **Audio Read-Aloud**: Built-in speech synthesis for accessibility.

### 2. 📡 Real-Time Air Quality Radar & Inversion Gauge
- **Winter Inversion Tracking**: Tracks boundary mixing height (in meters) and warns when a thermal inversion locks cold air and vehicle soot at breathing level (< 100m).
- **Multi-Pollutant Dashboard**: Real-time readouts for PM2.5, PM10, NO2, CO, SO2, and O3 with WHO guideline comparison factors.
- **Preset Smog Hotspots & Simulator**: Real-time profiles for major winter smog cities (Delhi NCR, Lahore, Salt Lake City Basin, Beijing-Hebei Plain, Krakow-Katowice, London, Bakersfield CA) plus an interactive **What-If Smog Slider** (20 to 500 AQI).

### 3. 🕒 24-Hour Diurnal "Safe Window" Tracker
- **Nocturnal Danger Peak (6:00 – 9:00 AM)**: Alerts against morning jogging, open ventilation, and cold-start vehicular exposure.
- **Golden Solar Dispersion Window (1:30 – 3:30 PM)**: Highlights the exact hours when solar radiation expands the boundary mixing layer, allowing brief pulse ventilation and outdoor errands.
- **Evening Inversion Resurgence (7:00 – 11:00 PM)**: Guides bedtime seals and kitchen isolation protocols.

### 4. 🛠️ Indoor Air Quality (IAQ) Hacks Lab & Corsi-Rosenthal CADR Designer
- **Interactive Corsi-Rosenthal Box Simulator**: Enter your room length, width, and ceiling height to compute room volume, fan speed CFM, and Air Changes per Hour (ACH), comparing the $55 DIY unit against $350+ commercial HEPA purifiers.
- **6 Practical Engineering Hacks**:
  1. *Corsi-Rosenthal Box* (88% PM2.5 cut)
  2. *Winter Stoßlüften Pulse Ventilation* (45% CO2/VOC drop without chilling walls)
  3. *Microfiber Wet-Mopping Anti-Resuspension* (eliminates toxic dust kickup)
  4. *Kitchen Plume Deflection & Range Hood Isolation* (82% indoor soot cut)
  5. *Microclimate Door Sweep & Silicone Draft Blockers* (seals 14,000L/hr smog infiltration)
  6. *Winter 45% Relative Humidity Mucociliary Barrier* (preserves nasal and bronchial particle clearing)

### 5. 🌿 Low-Emission Living & Sustainable Alternatives
- Tailored options across **Heating & Warmth**, **Mobility & Commute**, **Cooking**, **Waste & Garden**, and **Community Action**.
- Quantifies both **Direct Household Health Payoff** and the **Community Multiplier Effect** (e.g., how phasing out 50 neighborhood wood stoves cleans ambient street smog by 18%).

### 6. 📊 Direct Impact Dashboard & Neighborhood Multiplier
- Tracks your monthly avoided CO2 (kg), prevented PM2.5 soot (grams), and bonus clean air sanctuary hours.
- **Collective Scale Simulator**: Adjust community size from 10 to 1,000 homes to simulate tons of avoided emissions and prevented emergency room asthma admissions.

### 7. 🤝 Community Clean Air Defense Hub
- **Action Pledges**: Anti-idling school zones, zero leaf burning, clean carpool pacts with celebratory confetti milestones.
- **Neighborhood Smoke Radar**: Community crowdsourcing and upvoting of illegal trash burning, agricultural plumes, and traffic bottlenecks.

---

## 🚀 Quickstart & Running Locally

The application is already built and running on your system!

```bash
# 1. Navigate to the project directory
cd "C:\Users\manjeet kumar\.gemini\antigravity\scratch\breathe-wise"

# 2. Start the Vite development server (if stopped)
npm.cmd run dev -- --host 127.0.0.1 --port 5173

# 3. Production build verification
npm.cmd run build
```

Open your browser to: **`http://127.0.0.1:5173/`** or **`http://localhost:5173/`**.

---

## 📁 Project Architecture

```
breathe-wise/
├── index.html                       # HTML5 entry with Plus Jakarta Sans & JetBrains typography
├── package.json                     # Dependencies & scripts
├── vite.config.ts                   # Vite bundler configuration
├── tailwind.config.js               # Tailwind styling & custom AQI color scales
├── tsconfig.json                    # TypeScript strict compiler config
└── src/
    ├── main.tsx                     # React root & AppProvider wrapper
    ├── App.tsx                      # Main application view & tab switcher
    ├── index.css                    # Tailwind base, utilities & glassmorphism
    ├── types/                       # TypeScript interfaces for profiles, AQI, hacks
    │   └── index.ts
    ├── services/
    │   └── geminiService.ts         # Google Gemini 1.5 & offline clinical reasoning engine
    ├── context/
    │   └── AppContext.tsx           # Global state, city data, pledges & impact metrics
    ├── data/
    │   ├── airQualityData.ts        # City AQI datasets, diurnal profiles & inversion heights
    │   ├── iaqHacks.ts              # Detailed engineering blueprints for 6 IAQ hacks
    │   ├── sustainableAlternatives.ts # Low-emission alternatives & direct math
    │   └── winterSmogScience.ts     # Atmospheric inversion dynamics & particle toxicology
    └── components/
        ├── Header.tsx               # Brand, location selector, profile & AI key pills
        ├── AqiRadar.tsx             # Radial AQI gauge, pollutant breakdown & what-if slider
        ├── DiurnalForecast.tsx      # 24-hour diurnal smog timeline & safe windows
        ├── DailyRoutineView.tsx     # Personalized 24-hr schedule for family profile
        ├── IaqHacksView.tsx         # IAQ hacks lab & deep-dive modal blueprints
        ├── CorsiRosenthalSimulator.tsx # CADR room calculator & 3D box fan diagram
        ├── SustainableAlternativesView.tsx # Low-emission alternatives & adoption tracker
        ├── DirectImpactDashboard.tsx # Avoided CO2, PM2.5 & community multiplier
        ├── CommunityBoard.tsx       # Live pledges & neighborhood smoke incident reporting
        ├── AiAssistantChat.tsx      # AeroGuide GenAI conversational chat & audio reader
        ├── WinterInversionExplainer.tsx # Atmospheric boundary layer interactive simulator
        ├── ProfileModal.tsx         # Household vulnerabilities & appliances setup
        └── ApiKeyModal.tsx          # Gemini API Key configuration
```
