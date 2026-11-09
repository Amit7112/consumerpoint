import { type CategoryGuide } from "./applianceGuides.ts";

export const ledLightingGuide: CategoryGuide = {
  id: "led-lighting",
  name: "LED Lighting",
  tagline: "Lumens over watts: light your home efficiently without harsh glare or early driver burnout.",
  shortDesc: "Compare LED bulbs, batten tube lights, slim panel downlights, COB spot lights, colour temperatures (Warm vs Neutral vs Cool White), CRI color fidelity, and surge-protected drivers.",
  image: "led-lighting",
  group: "Electrical & Power",
  knowYourProduct: {
    types: [
      {
        type: "Standard LED Bulbs (B22 / E27, 7W–18W)",
        capacity: "700 – 1,800 Lumens",
        bestFor: "Everyday retrofit into existing wall brackets, table lamps, and hallway holders.",
        pros: [
          "Instant plug-and-play installation in legacy B22 pin and E27 screw sockets",
          "Most affordable upfront price (₹70 – ₹200 per bulb)",
          "Wide 220° beam angle illuminates surrounding walls and ceiling evenly",
        ],
        cons: [
          "Internal miniature drivers run hot in sealed glass globes or unventilated enclosures",
          "Plastic body models suffer accelerated lumen depreciation after 12–18 months",
        ],
      },
      {
        type: "LED Batten Tube Lights (T5 / T8, 20W–36W, 4ft)",
        capacity: "2,000 – 3,800 Lumens",
        bestFor: "Living rooms, kitchens, corridors, study areas, and utility rooms.",
        pros: [
          "Uniform linear illumination eliminates harsh point-source shadows",
          "Replaces flickering legacy fluorescent tubes with zero choke humming",
          "High luminous efficacy (> 100 lm/W) covers large floor areas effortlessly",
        ],
        cons: [
          "Surface-mounted profile is utilitarian; lacks the architectural elegance of recessed lighting",
          "Plastic end-caps can discolour or crack if exposed to direct sun through windows",
        ],
      },
      {
        type: "Slim Recessed Panel Downlights (Round / Square, 6W–18W)",
        capacity: "500 – 1,800 Lumens",
        bestFor: "False ceiling ambient grid lighting in modern living rooms and master bedrooms.",
        pros: [
          "Flush architectural ceiling finish with zero protruding hardware",
          "Edge-lit frosted diffuser provides wide 120° glare-free ambient spread",
          "Spring-loaded clips enable neat, tool-free installation into gypsum cut-outs",
        ],
        cons: [
          "Requires minimum 2.5 to 3.5 inches false ceiling cavity clearance",
          "External driver replacement requires gently pulling down the fixture without tearing gypsum board",
        ],
      },
      {
        type: "Surface & COB Spot Lights (3W–15W)",
        capacity: "300 – 1,500 Lumens",
        bestFor: "Focused accent lighting on artwork, textured feature walls, dining tables, and display niches.",
        pros: [
          "Sharp 24°–36° beam angle creates dramatic depth, shadow contrast, and architectural focus",
          "High-performance Chip-on-Board (COB) diode delivers deep, punchy optical clarity",
          "Adjustable swivel heads allow directional aiming post-installation",
        ],
        cons: [
          "Unsuitable for general ambient lighting; creates high contrast glare if used as sole light source",
          "Requires precision ceiling positioning to avoid casting shadows on seating areas",
        ],
      },
      {
        type: "Outdoor Waterproof LED Floodlights & Bulkheads (IP65 / IP66, 20W–50W)",
        capacity: "2,000 – 5,500 Lumens",
        bestFor: "Building exterior perimeters, car parking porches, open terraces, and garden boundary walls.",
        pros: [
          "Rugged die-cast aluminium housing with silicone seals resists monsoon rain, dust, and insects",
          "High-power wide flood beam deters intruders and illuminates wide driveways",
          "Surge protection ratings typically engineered up to 4kV–6kV for outdoor grid lines",
        ],
        cons: [
          "Intense brightness can create unpleasant glare if mounted below eye level without a visor",
          "Requires dedicated waterproof junction boxes and UV-resistant outdoor cabling",
        ],
      },
    ],
    technologies: [
      {
        tech: "Constant-Current Isolated Driver",
        howItWorks: "Converts incoming 230V AC grid electricity into stabilized low-voltage DC current, actively buffering against Indian grid fluctuations (140V to 285V).",
        realBenefit: "Eliminates imperceptible 100Hz micro-flicker that causes eye strain and headaches, and shields sensitive LED diode chips from premature voltage spike burnout.",
        caution: "Cheap roadside bulbs use non-isolated RC drivers that run hot, flicker invisibly, and burn out in 4–8 months.",
      },
      {
        tech: "Aluminium Core PCB (MCPCB) & Heat Sink",
        howItWorks: "Surface-mount diodes (SMD) are soldered onto a metal-core printed circuit board bonded to an extruded aluminium heat sink that dissipates diode junction heat.",
        realBenefit: "Keeps diode junction temperature below 85°C, ensuring the fixture retains 90%+ brightness over 25,000 hours without yellowing or dimming.",
        caution: "Cheap all-plastic fixtures trap heat inside, leading to 40% lumen loss within the first year of operation.",
      },
      {
        tech: "High Colour Rendering Index (CRI > 80 Ra vs CRI 70)",
        howItWorks: "Measures the fidelity of light across 8 standard color samples compared to natural daylight (CRI 100).",
        realBenefit: "CRI 80+ makes food, skin tones, furniture fabrics, and wall paint look vibrant and true to life rather than washed out.",
        caution: "Substandard CRI 70 industrial chips give living spaces an unpleasant, cold, clinical greenish-grey tint.",
      },
      {
        tech: "Correlated Colour Temperature (CCT) & 3-in-1 Tunable",
        howItWorks: "Dual LED chip strips (3000K Warm White and 6500K Cool White) blend via micro-switch or wall toggling to produce warm, neutral, or cool white illumination.",
        realBenefit: "Allows matching room lighting to circadian rhythm — energizing 6500K cool white for morning chores, cozy 3000K warm white for evening relaxation.",
        caution: "Do not mix different colour temperatures on the same ceiling plane; it creates a mismatched, messy visual appearance.",
      },
    ],
    keySpecifications: [
      {
        spec: "Luminous Efficacy (Lumens per Watt)",
        importance: "Measures true energy efficiency: how much usable light is delivered per single watt of electrical power.",
        recommendedStandard: "Look for >= 100 to 120 lm/W. An efficient 10W LED delivers 1,100 lumens, outperforming an inferior 14W (900 lm) unit.",
      },
      {
        spec: "Driver Surge Protection Rating",
        importance: "Protects the delicate electronic driver from high-voltage transient spikes caused by lightning and grid switching.",
        recommendedStandard: "Minimum 2.5kV surge protection for indoor fixtures; 4.0kV to 6.0kV for outdoor, basement, and terrace floodlights.",
      },
      {
        spec: "Power Factor (PF)",
        importance: "Ratio of real working power to apparent power drawn from the electrical grid.",
        recommendedStandard: "Ensure PF > 0.90 for fittings >= 9W. Low PF (< 0.50) draws excessive reactive current that heats domestic wiring.",
      },
      {
        spec: "Total Harmonic Distortion (THD)",
        importance: "Measures waveform distortion injected back into your home electrical distribution system.",
        recommendedStandard: "BEE and BIS standards require THD < 15%. Keeps neutral wires cool and prevents audio interference in sound systems.",
      },
    ],
    featuresWorthPayingFor: [
      "4kV surge-protected isolated constant-current drivers",
      "High CRI (>= 80 Ra) for natural eye comfort and vivid colors",
      "Extruded or die-cast aluminium heat sink housing",
      "Frosted anti-glare polycarbonate diffusers with wide beam angle",
    ],
    gimmicksToSkip: [
      "Multi-million RGB novelty colour bulbs for primary task rooms (yields low usable lumens for reading and study)",
      "Ultra-cheap unbranded LED bulbs sold in bulk packs without valid BIS R-numbers",
      "Decorative amber filament vintage bulbs in active cooking or study workspaces",
    ],
    commonMisconceptions: [
      {
        myth: "Higher wattage always means a brighter light fixture.",
        reality: "Wattage measures electrical power consumed, not light produced. Brightness is measured strictly in Lumens (lm). An efficient 10W (1,100 lm) LED is brighter and cheaper to run than an inefficient 14W (900 lm) bulb.",
      },
      {
        myth: "LED lights last 50,000 hours forever without failing.",
        reality: "While the LED diode chip can survive 50,000 hours, the electrolytic capacitor inside the internal driver typically degrades after 15,000–20,000 hours if exposed to continuous heat and voltage spikes.",
      },
    ],
  },
  buyingChecklist: {
    householdSizing: [
      {
        familySize: "Master Bedroom (120–160 sq ft)",
        capacity: "1,800 – 2,500 Total Lumens",
        guidance: "Combine 4x 5W 3000K warm-white recessed downlights for cozy ambient glow with 2x 4000K neutral reading lamps.",
      },
      {
        familySize: "Living & Drawing Room (180–250 sq ft)",
        capacity: "3,500 – 5,000 Total Lumens",
        guidance: "Use a layered approach: 6x 7W 4000K neutral downlights on perimeter, 3000K warm cove strip, and 1x decorative central light.",
      },
      {
        familySize: "Modular Kitchen (80–120 sq ft)",
        capacity: "2,400 – 3,200 Total Lumens",
        guidance: "Install 1x 20W 6500K central batten or 4x 7W 6500K ceiling downlights + 4000K under-cabinet task profile strip for shadow-free chopping.",
      },
      {
        familySize: "Study Room / Home Office (100–140 sq ft)",
        capacity: "2,500 – 3,500 Total Lumens",
        guidance: "Strictly select 4000K Neutral White with CRI >= 85 to prevent eye fatigue during long reading or screen sessions.",
      },
    ],
    spaceAndInstallationChecks: [
      "Measure false ceiling void depth: requires 2.5 to 3.5 inches depth for spring-clip recessed panel downlights.",
      "Check driver cut-out diameter before the carpenter cuts gypsum / POP holes (common sizes: 3-inch, 4-inch, 6-inch).",
      "Ensure outdoor terrace, bathroom, and balcony fittings have verified IP65 or IP66 silicone gaskets.",
      "Never connect standard LED drivers to legacy fan speed step regulators (rapidly destroys driver electronic components).",
    ],
    energyAndRunningCosts: {
      starRatingImpact: "Replacing ten legacy 60W incandescent/CFL lamps with 9W/20W BEE-rated LEDs reduces lighting load from 600W to just 95W.",
      runningCostTip: "Using 4000K neutral white with high luminous efficacy (>= 110 lm/W) gives maximum visual acuity with minimum watt burn.",
      estimatedAnnualSavings: "Saves approx. ₹4,500 – ₹6,800 annually on household electricity bills (based on 5 hours daily usage @ ₹7.50/kWh).",
    },
    longTermOwnershipCosts: [
      "Replacement LED driver units (₹120 – ₹250 each after 3–5 years).",
      "Exterior waterproof junction box and silicone sealant maintenance for outdoor floodlights.",
    ],
  },
  recommendationProfiles: [
    {
      scenario: "Compact Apartment Ambient Living (2BHK / 3BHK)",
      household: "3–4 members",
      usage: "Daily evening family lighting, dining, and television viewing",
      budgetBracket: "₹4,500 – ₹8,000 (Full Flat LED Setup)",
      recommendedType: "Layered Slim Downlights + 4ft LED Battens",
      recommendedSpecs: "CRI > 80, 4000K Neutral White for living areas, 3000K for bedrooms, isolated 3kV surge drivers",
      whyThisFit: "Delivers balanced eye comfort, zero harsh glare, and modern false-ceiling aesthetics without inflated costs.",
      tradeOff: "Requires planned false ceiling cut-outs for recessed panels.",
    },
    {
      scenario: "Modular Kitchen Task & Countertop Lighting",
      household: "Active daily cooking",
      usage: "Food preparation, vegetable chopping, and cooking visibility",
      budgetBracket: "₹1,500 – ₹3,500",
      recommendedType: "High-Lumen 6500K Cool White Batten + 4000K Under-Cabinet Profile",
      recommendedSpecs: "20W Slim Batten (2,000 lm) + IP20 LED Strip in Aluminium Profile with milky diffuser",
      whyThisFit: "Casts light directly down on countertops, eliminating shadows cast by ceiling lights behind the cook.",
      tradeOff: "Under-cabinet profile requires a concealed 12V DC power adapter inside a kitchen wall cabinet.",
    },
    {
      scenario: "Study Room & Work-From-Home Office",
      household: "1–2 professionals / students",
      usage: "8–10 hours daily screen work, reading, and writing",
      budgetBracket: "₹1,200 – ₹2,800",
      recommendedType: "High-CRI 4000K Neutral White Panel + Dedicated Desk Lamp",
      recommendedSpecs: "CRI >= 85, Zero Micro-Flicker (< 3% flicker index), 4000K CCT, 15W panel",
      whyThisFit: "Optimal natural spectrum prevents eye strain, drowsiness, and tension headaches during long screen hours.",
      tradeOff: "Slightly higher cost than basic 6500K commercial bulbs.",
    },
    {
      scenario: "Terrace & Perimeter Security Floodlighting",
      household: "Independent house / Villa",
      usage: "Dusk-to-dawn perimeter lighting, driveway security",
      budgetBracket: "₹1,800 – ₹4,000",
      recommendedType: "IP66 Die-Cast Aluminium LED Floodlight (30W–50W)",
      recommendedSpecs: "50W, 5,000 Lumens, 6500K, 4kV Surge Protection, Toughened Glass Cover, IP66 Ingress",
      whyThisFit: "Withstands heavy Indian monsoon downpours and dust storms while casting wide security illumination.",
      tradeOff: "Must be mounted high (at least 9–10 feet) to prevent blinding direct glare to neighbors.",
    },
    {
      scenario: "Budget Retrofit for Rental Home (No False Ceiling)",
      household: "1–3 members",
      usage: "Everyday utility lighting in rental flat",
      budgetBracket: "₹800 – ₹1,500",
      recommendedType: "9W / 12W B22 LED Bulbs + 20W Surface Batten Tubes",
      recommendedSpecs: "BEE 3-Star or 5-Star, B22 Base, 100 lm/W, 2.5kV surge, 6500K",
      whyThisFit: "Zero installation hassle: fits straight into existing bulb and tube fixtures with immediate electricity reduction.",
      tradeOff: "Basic omnidirectional light spread without modern concealed architectural aesthetics.",
    },
  ],
  warrantyGuidance: {
    standardComprehensive: "1 to 2 Years Free Replacement Warranty across reputable brands (Philips, Havells, Wipro, Crompton).",
    keyComponentWarranty: "Covers the entire fixture including internal LED diode clusters and internal/external driver circuits.",
    pcbCoverageTruth: "If an LED bulb or panel stops illuminating, the local retailer or brand service center replaces the entire unit over-the-counter during the warranty period.",
    labourAndSpares: "Domestic bulbs and battens do not include doorstep technician visits; replacement is handled via authorized brand dealer counters.",
    criticalExclusions: [
      "Physical glass or plastic breakage, cracked holder pins, and casing crush damage.",
      "Water ingress inside indoor IP20 rated bulbs and downlights installed in open, exposed areas.",
      "Direct lightning strike damage resulting in complete thermal melting of driver circuit boards.",
    ],
    claimRequirements: [
      "Original retail GST tax invoice clearly showing purchase date and model.",
      "Intact manufacturer serial date stamp or holographic warranty sticker on the bulb base or driver.",
    ],
    extendedWarrantyAdvice: "Extended warranties are not practical for low-cost bulbs. Focus on buying Tier-1 brands with verified 2-year over-the-counter replacement policies.",
  },
};

export const invertersPowerBackupGuide: CategoryGuide = {
  id: "inverters-power-backup",
  name: "Inverters & Power Backup",
  tagline: "Match your real electrical load: pure sine wave clarity with long-cycle battery endurance.",
  shortDesc: "Compare Pure Sine Wave vs Square Wave inverters, Tall Tubular lead-acid batteries, LiFePO4 lithium storage, VA to Watt conversion, and realistic backup runtimes.",
  image: "inverter",
  group: "Electrical & Power",
  knowYourProduct: {
    types: [
      {
        type: "Pure Sine Wave Home Inverter (800VA – 1100VA, 12V Single Battery)",
        capacity: "Supports up to 650W–880W Continuous Load",
        bestFor: "1BHK and 2BHK apartments needing 3–5 hours of essential backup for fans, lights, Wi-Fi, and TV.",
        pros: [
          "Outputs clean, grid-identical sine wave (THD < 3%) that protects delicate electronics",
          "Silent operation for BLDC fans with zero motor humming or buzzing noise",
          "Compact single-battery floor footprint with affordable battery replacement cost",
        ],
        cons: [
          "Cannot handle heavy compressor startup surges from large refrigerators or desert coolers",
          "Limited to 12V battery input; maximum continuous capacity capped at ~850W",
        ],
      },
      {
        type: "Heavy-Duty Double Battery Inverter (1500VA – 2500VA, 24V Twin Battery)",
        capacity: "Supports up to 1,200W–2,000W Continuous Load",
        bestFor: "3BHK/4BHK family homes running multiple rooms, TV, and an Inverter Refrigerator simultaneously.",
        pros: [
          "High surge capacity absorbs the heavy startup spike of refrigerator compressors and coolers",
          "Higher 24V DC bus voltage improves efficiency and reduces cable heating",
          "Provides longer backup runtimes (6–8+ hours) during extended power cuts",
        ],
        cons: [
          "Requires purchasing two identical 12V batteries simultaneously (doubles battery investment)",
          "Substantial floor space and weight (two tall tubular batteries weigh ~120–130 kg combined)",
        ],
      },
      {
        type: "Solar Hybrid Inverter (1kVA – 5kVA, MPPT / PWM)",
        capacity: "Blends Solar PV + Battery Storage + Grid Power",
        bestFor: "Independent houses and villas looking to slash monthly electricity bills alongside power security.",
        pros: [
          "Prioritizes free daytime solar generation to power daytime loads and charge batteries",
          "Intelligent grid-sharing reduces reliance on expensive utility grid units",
          "Built-in MPPT solar charge controller extracts up to 30% more power from solar panels",
        ],
        cons: [
          "Higher initial hardware cost and requires rooftop space for solar panel mounting",
          "Requires dedicated DC disconnect switches, solar lightning arrestors, and separate earthing",
        ],
      },
      {
        type: "Wall-Mount Lithium-Ion (LiFePO4) Inverter System (1.2kWh – 3kWh)",
        capacity: "Sleek Integrated All-in-One Power Wall",
        bestFor: "Modern luxury apartments where floor space, zero maintenance, and aesthetics are paramount.",
        pros: [
          "3x longer cycle life (2,500–3,000 cycles vs 900 in lead-acid) with 8–10 year design life",
          "Rapid 2-hour recharge capability compared to 10–12 hours for lead-acid",
          "Zero water topping maintenance, zero acid fumes, and 70% lighter weight",
        ],
        cons: [
          "High upfront acquisition price (₹45,000 – ₹85,000+)",
          "Cannot be serviced with generic local spares; requires manufacturer-certified BMS replacement",
        ],
      },
      {
        type: "High-Capacity Multi-Phase / Villa Inverter (3.5kVA – 10kVA, 48V–96V)",
        capacity: "Runs Inverter ACs, Water Pumps, Dental Clinics & Entire Multi-Floor Homes",
        bestFor: "Large independent villas, multi-storey residences, and commercial establishments.",
        pros: [
          "Capably runs a 1.5 Ton Inverter AC, submersible water pump, and comprehensive home loads",
          "High 48V–96V DC system reduces resistive line losses across large battery banks",
        ],
        cons: [
          "Requires 4 to 8 batteries connected in series, necessitating a dedicated ventilated battery room",
          "Significant capital investment (₹1,00,000 – ₹2,50,000+)",
        ],
      },
    ],
    technologies: [
      {
        tech: "Pure Sine Wave vs Modified / Square Wave",
        howItWorks: "Pure Sine Wave replicates the smooth, continuous curvature of utility AC grid electricity. Square wave chops voltage abruptly between positive and negative peaks.",
        realBenefit: "Square wave inverters induce harmonic vibration that overheats appliance motors, creates buzzing in fans, and degrades TV/audio power supplies. Pure Sine Wave runs everything silently and coolly.",
        caution: "Never connect modern inverter refrigerators, smart TVs, or BLDC ceiling fans to square-wave inverters.",
      },
      {
        tech: "Tall Tubular Lead-Acid Battery Technology",
        howItWorks: "Positive plates are constructed with high-pressure die-cast spines inside porous polyester tubes (gauntlets), surrounded by a massive electrolyte reservoir.",
        realBenefit: "Withstands frequent deep discharge cycles (up to 80% DoD) and survives harsh 45°C Indian summer ambient temperatures with an active 4 to 6 year lifespan.",
        caution: "Tall tubular batteries are heavy (~60 kg each) and must have their electrolyte level checked and topped up every 3–4 months.",
      },
      {
        tech: "Smart Microcontroller DSP Charging with Low-Voltage Boost",
        howItWorks: "A digital signal processor (DSP) continuously samples battery voltage and delivers multi-stage charging (Bulk, Absorption, Float).",
        realBenefit: "Crucially continues to charge batteries even during severe low-voltage grid slumps (90V–110V) common during peak summer night load-shedding.",
        caution: "Low-cost local inverters stop charging when grid voltage drops below 160V, leaving you with empty batteries during cuts.",
      },
      {
        tech: "Lithium Iron Phosphate (LiFePO4) Battery Chemistry",
        howItWorks: "Lithium ions shuttle between iron-phosphate cathode and graphite anode, governed by an integrated Battery Management System (BMS).",
        realBenefit: "Inherently non-combustible thermal stability, 95% round-trip energy efficiency, and usable depth-of-discharge up to 90% without sulfation damage.",
        caution: "Must be paired strictly with a compatible lithium-profile inverter; connecting to a lead-acid charger will trigger BMS safety cut-off.",
      },
    ],
    keySpecifications: [
      {
        spec: "Power Factor (PF) & Continuous Wattage",
        importance: "Determines actual continuous electrical wattage you can run: Continuous Watts = Inverter VA × Power Factor (typically 0.8).",
        recommendedStandard: "A 1000VA inverter supports only ~800 Watts continuous load, NOT 1,000 Watts! Running 900W will trigger an overload alarm.",
      },
      {
        spec: "Battery Capacity in Ampere-Hours (Ah at C20)",
        importance: "Measures the total chemical energy stored in the battery over a standardized 20-hour discharge window.",
        recommendedStandard: "150Ah to 200Ah for standard household backup. Calculated as: Backup Hours = (Battery Ah × 12V × 0.8 efficiency) ÷ Load Watts.",
      },
      {
        spec: "Mains-to-Battery Switchover Transfer Time",
        importance: "Speed at which the inverter senses utility grid failure and takes over powering the connected load.",
        recommendedStandard: "Look for UPS mode with transfer time < 10–15 milliseconds so desktop PCs, Wi-Fi routers, and smart TVs do not reboot.",
      },
      {
        spec: "Surge / Peak Overload Handling Capacity",
        importance: "Ability to absorb instantaneous starting currents drawn by induction motors (compressors, fans, coolers).",
        recommendedStandard: "Inverter should support at least 300% starting surge for 500ms to comfortably start an Inverter Refrigerator without tripping.",
      },
    ],
    featuresWorthPayingFor: [
      "Pure Sine Wave output (mandatory for all modern home electronics and BLDC fans)",
      "Ultra-low-voltage fast battery charging (operates smoothly across 90V–290V range)",
      "Digital LCD status display showing load percentage, battery charge level, and remaining backup minutes",
      "Comprehensive electronic protection (overload, short-circuit, reverse polarity, battery deep discharge)",
    ],
    gimmicksToSkip: [
      "Cheap local unbranded square-wave inverters (damage appliance motors and void manufacturer warranties)",
      "Automotive starter car batteries for home inverters (designed for brief 5-second cranking; fail within 6 months in cyclic discharge)",
      "Deceptive 'runs 1.5 Ton AC on 1000VA' marketing claims (an AC requires at least a 3.5kVA–5kVA system with high surge buffer)",
    ],
    commonMisconceptions: [
      {
        myth: "A 1000VA inverter can run 1000 Watts of appliances simultaneously.",
        reality: "Inverters operate at a power factor (typically 0.8). A 1000VA inverter handles approximately 800 Watts continuous. Loading it with 900W will cause an overload shutdown.",
      },
      {
        myth: "Ordinary tap water or RO reject water can be topped into tubular batteries.",
        reality: "Tap and RO water contain dissolved minerals, chlorides, and silicates that permanently poison the battery lead plates, causing rapid self-discharge. Use only certified distilled/demineralized water (TDS < 10 ppm).",
      },
    ],
  },
  buyingChecklist: {
    householdSizing: [
      {
        familySize: "1BHK / Compact 2BHK (Essential Backup)",
        capacity: "850VA – 1100VA (12V) + 150Ah Tall Tubular Battery",
        guidance: "Runs 3 ceiling fans (210W) + 4 LED lights (36W) + Wi-Fi router & TV (100W) = ~350W load. Delivers approx. 3.5 to 5 hours backup.",
      },
      {
        familySize: "3BHK Family Home (With Inverter Refrigerator)",
        capacity: "1400VA – 1800VA (24V) + Twin 150Ah / 200Ah Batteries",
        guidance: "Runs 4 fans (280W) + 6 LED lights (54W) + 1 Inverter Refrigerator (~150W running) + TV & Wi-Fi (120W) = ~600W load. Delivers 5 to 7 hours backup.",
      },
      {
        familySize: "Villa / Extended Outage Region (Rural / Outskirts)",
        capacity: "2.5kVA – 3.5kVA (24V or 48V) + High-Ah Battery Bank",
        guidance: "Runs comprehensive household loads including desert cooler, refrigerator, all room fans, lighting, and entertainment systems for 8+ hours.",
      },
      {
        familySize: "Luxury Apartment with Space Constraints",
        capacity: "1.5kVA – 2kVA Pure Sine Wave + 2.4kWh Wall-Mount LiFePO4",
        guidance: "Zero floor footprint, charges fully in 2 hours between rolling cuts, and requires zero distilled water maintenance for 8–10 years.",
      },
    ],
    spaceAndInstallationChecks: [
      "Install tubular lead-acid batteries in an open, cross-ventilated balcony or utility area to safely disperse trace hydrogen gas emitted during boost charging.",
      "Never install lead-acid batteries in a sealed, unventilated bedroom wardrobe or directly on carpet floors.",
      "Use heavy multi-strand copper DC cables (minimum 10 sq. mm) with crimped copper lugs; coat terminals with petroleum jelly to prevent lead-sulphate corrosion.",
      "Ensure proper mains phase-neutral polarization; reverse polarity incoming lines can damage the inverter charging circuit.",
    ],
    energyAndRunningCosts: {
      starRatingImpact: "High-frequency pure sine wave inverters maintain 85%–90% conversion efficiency, losing very little power as heat.",
      runningCostTip: "Upgrading legacy ceiling fans (75W) to BEE 5-Star BLDC fans (28W) more than DOUBLES your inverter backup duration on the same battery capacity.",
      estimatedAnnualSavings: "Pairing a 150Ah battery with BLDC fans reduces battery cyclic wear, extending battery replacement intervals by 18 to 24 months.",
    },
    longTermOwnershipCosts: [
      "Distilled water top-up: ₹50–₹100 every 3 to 4 months for tall tubular batteries.",
      "Battery replacement: Lead-acid batteries require replacement every 4 to 6 years; LiFePO4 lithium batteries last 8 to 10+ years.",
    ],
  },
  recommendationProfiles: [
    {
      scenario: "Standard 2BHK Essential Living Backup",
      household: "2–4 members",
      usage: "Daily 2–4 hours load-shedding (Fans, Lights, TV, Wi-Fi)",
      budgetBracket: "₹18,000 – ₹24,000 (Inverter + 150Ah Battery)",
      recommendedType: "1100VA Pure Sine Wave Inverter + 150Ah Tall Tubular Battery",
      recommendedSpecs: "Pure Sine Wave, 12V DC input, rated continuous wattage ~800W–880W, C20 tall tubular plate, 36M free replacement warranty",
      whyThisFit: "Delivers whisper-quiet BLDC fan operation, protects smart TVs, and provides reliable 4-hour runtime for essential family comfort.",
      tradeOff: "Cannot support high starting surge of a refrigerator.",
    },
    {
      scenario: "Family Home with Refrigerator & Extended Backup",
      household: "4–6 members",
      usage: "4–6 hours power outage, food spoilage prevention",
      budgetBracket: "₹32,000 – ₹42,000 (24V System)",
      recommendedType: "1800VA – 2000VA 24V Inverter + Twin 150Ah / 200Ah Tall Tubular Batteries",
      recommendedSpecs: "24V Dual-battery bus, 300% surge handling for compressor motor, low-voltage charging down to 90V, THD < 3%",
      whyThisFit: "Comfortably starts and runs a 250L–450L Inverter Refrigerator while keeping all room fans, lighting, and Wi-Fi active.",
      tradeOff: "Requires dedicated floor space for two heavy batteries (~120 kg combined weight).",
    },
    {
      scenario: "Work-From-Home Professional & Home Office",
      household: "1–2 professionals",
      usage: "Zero downtime for desktop workstations, multi-monitors, and fiber routers",
      budgetBracket: "₹22,000 – ₹28,000",
      recommendedType: "1100VA Pure Sine Wave Inverter with Dedicated UPS Mode",
      recommendedSpecs: "Switchover time < 10ms, regulated output voltage, 160Ah short/tall tubular battery, bypass switch",
      whyThisFit: "Prevents desktop computers from rebooting or corrupting unsaved files when grid power abruptly drops.",
      tradeOff: "Requires keeping the inverter in strict UPS mode (narrower input voltage tolerance).",
    },
    {
      scenario: "High-Load Independent House / Semi-Rural Outskirts",
      household: "Large joint family / Frequent 6–10 hour outages",
      usage: "Desert coolers, refrigerator, all lighting, submersible water pump",
      budgetBracket: "₹50,000 – ₹75,000",
      recommendedType: "3.5kVA (48V) Heavy-Duty Pure Sine Wave System",
      recommendedSpecs: "48V 4-battery bank, 2,800W continuous capacity, high-surge toroidal transformer, heavy cooling fans",
      whyThisFit: "Acts as a mini captive power plant capable of powering an entire multi-floor house through prolonged load shedding.",
      tradeOff: "Requires a dedicated, well-ventilated utility room or covered terrace space.",
    },
    {
      scenario: "Premium Modern Flat with Space Constraints",
      household: "2–3 members",
      usage: "Aesthetic living, zero maintenance, silent operation",
      budgetBracket: "₹45,000 – ₹65,000",
      recommendedType: "Wall-Mount Integrated LiFePO4 Lithium Power System (1.5kVA / 2kWh)",
      recommendedSpecs: "LiFePO4 cells, 2,500+ cycle life, 2-hour fast recharge, zero water topping, integrated BMS with mobile app",
      whyThisFit: "Elegantly mounts on a utility wall like a decorative cabinet; eliminates messy acid spills and distilled water chores.",
      tradeOff: "Higher initial purchase price compared to traditional lead-acid systems.",
    },
  ],
  warrantyGuidance: {
    standardComprehensive: "2 to 3 Years Comprehensive on-site warranty on the inverter unit; 3 to 5 Years on the battery.",
    keyComponentWarranty: "Inverter warranty covers the main micro-controller motherboard and transformer. Battery warranty covers plate capacity retention.",
    pcbCoverageTruth: "Look carefully at battery warranty terms: manufacturers typically offer 'Free Replacement Months + Pro-Rata Discount Months' (e.g. 36M free replacement + 24M pro-rata discount on prevailing MRP).",
    labourAndSpares: "Leading brands (Luminous, Microtek, Exide, Livguard) provide doorstep service technician visits for inverters and batteries within municipal city limits.",
    criticalExclusions: [
      "Physical plate dry-out and sulfation caused by complete failure to add distilled water over extended months.",
      "Terminal fire or melting caused by loose cable nuts that were not periodically tightened.",
      "Cracked plastic battery casing or acid leakage resulting from external physical impact.",
      "Leaving the battery in a fully discharged state (0% charge) for several weeks, causing permanent plate crystallization.",
    ],
    claimRequirements: [
      "Original stamped manufacturer warranty card with matching serial numbers on battery and inverter.",
      "Original GST purchase invoice from an authorized retail channel.",
    ],
    extendedWarrantyAdvice: "Extended warranties on inverters are rarely needed if you buy Tier-1 pure sine wave models with built-in surge protection. Always buy batteries with the longest FREE replacement period.",
  },
};

export const electricVehiclesGuide: CategoryGuide = {
  id: "electric-vehicles",
  name: "Electric Vehicles (EVs)",
  tagline: "Accelerate with confidence: battery chemistry, real-world range, and total ownership economics.",
  shortDesc: "Compare electric 2-wheelers, 3-wheelers, and electric cars: LFP vs NMC battery chemistry, real-world vs ARAI range, home 16A charging logistics, and running cost parity.",
  image: "electric-vehicle",
  group: "Mobility",
  knowYourProduct: {
    types: [
      {
        type: "High-Speed Electric Scooters (Top Speed 70–90 km/h)",
        capacity: "2.5kWh – 4.0kWh Battery Pack",
        bestFor: "Daily urban office commuters, college students, and family city errands (30–60 km/day).",
        pros: [
          "Real-world city range of 85–130 km per charge covers 2 to 3 days of typical commuting",
          "Zippy, instant torque acceleration with whisper-silent, vibration-free ride comfort",
          "Running cost is approx. ₹0.25–₹0.35 per km (saves 85%+ compared to petrol scooters)",
        ],
        cons: [
          "Requires ground-floor dedicated 16A 3-pin socket or portable removable battery pack",
          "Higher initial acquisition price than entry-level 110cc petrol commuter scooters",
        ],
      },
      {
        type: "Low-Speed / Commercial Delivery E-Scooters (Max Speed 25 km/h)",
        capacity: "1.2kWh – 1.8kWh Battery Pack",
        bestFor: "Hyper-local grocery delivery riders, campus transit, and senior citizens.",
        pros: [
          "Exempt from RTO vehicle registration, road tax, and mandatory driving license requirements",
          "Low upfront price point (₹45,000 – ₹65,000) and rugged utility carrier frames",
          "Low battery capacity charges fully in just 3 to 4 hours from any standard 6A/16A socket",
        ],
        cons: [
          "Restricted to 25 km/h top speed; unsafe on high-speed ring roads and multi-lane flyovers",
          "Limited real-world range (40–55 km); not suitable for multi-stop long commutes",
        ],
      },
      {
        type: "Electric 3-Wheelers (L5M Passenger Auto & L5N Cargo)",
        capacity: "5kWh – 10kWh Battery Pack",
        bestFor: "Last-mile urban public transport, auto-rickshaw drivers, and city parcel delivery.",
        pros: [
          "Massive commercial profitability: operating cost under ₹0.50/km vs ₹3.50/km for CNG/Diesel",
          "Low center of gravity provides superior vehicle stability and reduces driver fatigue",
          "Qualifies for state EV subsidies, zero road tax, and priority green municipal permits",
        ],
        cons: [
          "Recharging a 10kWh battery on a standard 16A socket takes 5–7 hours; requires battery swapping or public DC chargers for double shifts",
          "High replacement cost for commercial heavy-duty battery packs after 4–5 years",
        ],
      },
      {
        type: "Compact City Electric Cars (Entry Hatchbacks)",
        capacity: "19kWh – 26kWh Battery Pack",
        bestFor: "Urban family city commuting, school drop-offs, and daily intra-city office transit.",
        pros: [
          "Real-world city driving range of 170–230 km on a single overnight charge",
          "Effortless single-speed automatic transmission with instant air-conditioning and zero tailpipe emissions",
          "Convenient overnight home charging using a standard 15A/16A wall-box or industrial socket",
        ],
        cons: [
          "Highway intercity travel requires careful pre-planning around public fast-charger availability",
          "Overnight 3.3kW AC charging takes 8 to 10 hours for a 10% to 100% full recharge",
        ],
      },
      {
        type: "Long-Range Electric SUVs",
        capacity: "35kWh – 60kWh+ Battery Pack",
        bestFor: "Primary family vehicles, intercity highway travel, and technology-forward households.",
        pros: [
          "Real-world highway range of 300–450 km per charge",
          "CCS2 DC fast-charging capable (charges from 10% to 80% in 45–60 minutes at highway stations)",
          "5-Star safety crash test ratings, connected vehicle telematics, and regenerative braking",
        ],
        cons: [
          "Higher initial purchase cost (₹14,00,000 – ₹25,00,000+)",
          "Tire wear is slightly faster due to the instantaneous electric motor torque and heavy battery weight",
        ],
      },
    ],
    technologies: [
      {
        tech: "Battery Chemistry: LFP (Lithium Iron Phosphate) vs NMC",
        howItWorks: "LFP uses iron phosphate cathodes with high thermal stability; NMC uses nickel-manganese-cobalt cathodes with higher volumetric energy density.",
        realBenefit: "LFP is exceptionally safe in harsh 45°C Indian summers, tolerates 100% daily charges without degradation, and delivers 2,000–3,000 cycles. NMC is lighter but prefers 20%–80% charging habits.",
        caution: "Indian climate conditions strongly favor LFP chemistry for domestic 2-wheelers and passenger cars.",
      },
      {
        tech: "Smart Battery Management System (BMS)",
        howItWorks: "An onboard multi-sensor microprocessor that monitors individual cell voltages, temperatures, and current flow in real time.",
        realBenefit: "Actively balances cell charge states, prevents over-discharge, and shuts down the pack within milliseconds if temperature thresholds are breached, preventing thermal runaway.",
        caution: "Low-grade unbranded scooters use passive unmonitored BMS boards that fail to detect weak overheating cells.",
      },
      {
        tech: "Motor Architecture: Mid-Mount PMSM vs Hub Motor",
        howItWorks: "Permanent Magnet Synchronous Motors (PMSM) are mounted centrally in the chassis and drive the wheel via a belt or chain. Hub motors reside inside the wheel rim.",
        realBenefit: "Mid-mount PMSM delivers high continuous climbing torque on steep flyovers and keeps the motor protected from road bumps and water immersion.",
        caution: "Wheel hub motors are economical for flat city roads, but expose the motor casing to pothole impacts and road heat.",
      },
      {
        tech: "Regenerative Braking Systems",
        howItWorks: "Reverses the electric motor into an alternator during deceleration, converting vehicle kinetic energy back into electrical charge.",
        realBenefit: "Recovers 5% to 10% of battery charge on downhill slopes and stop-and-go city traffic while dramatically reducing brake shoe wear.",
        caution: "Regenerative braking feels noticeably firmer than freewheeling; takes 1–2 days of driving adjustment.",
      },
    ],
    keySpecifications: [
      {
        spec: "Real-World Range vs ARAI / IDC Certified Range",
        importance: "Measures actual kilometers delivered on Indian roads under real traffic, weather, and passenger load.",
        recommendedStandard: "Real-world city range is typically 25%–35% lower than idealized lab-test ARAI figures. Always budget for real-world range.",
      },
      {
        spec: "Battery Usable Capacity in Kilowatt-Hours (kWh)",
        importance: "The true fuel tank of an EV. Determines realistic driving distance per charge.",
        recommendedStandard: "A 3.5kWh e-scooter consuming ~32 Wh/km delivers approx. 100–110 km real range. A 26kWh car delivers ~180–210 km real range.",
      },
      {
        spec: "Ingress Protection Rating (IP67 / IP68)",
        importance: "Certifies water and dust sealing of the battery pack, traction motor, and BMS controller.",
        recommendedStandard: "Mandatory IP67 or IP68 rating. Guarantees the vehicle can navigate waterlogged monsoon roads up to 300mm without electrical short-circuits.",
      },
      {
        spec: "Home Charging Compatibility (16A / 3.3kW)",
        importance: "Convenience of charging the vehicle overnight at home using standard domestic electrical points.",
        recommendedStandard: "Requires a dedicated 16A 3-pin industrial socket with genuine copper earthing (Earth-to-Neutral voltage < 3.0V).",
      },
    ],
    featuresWorthPayingFor: [
      "IP67 / IP68 certified water & dust-sealed battery and motor casing",
      "Portable removable battery pack (essential for apartment dwellers without ground-floor parking sockets)",
      "Active liquid thermal cooling (on electric cars) or heavy-finned aluminium passive cooling (on scooters)",
      "Combined Braking System (CBS) or ABS with multi-level regenerative braking",
    ],
    gimmicksToSkip: [
      "Laggy touchscreen infotainment dashboards that freeze in direct summer sun and drain the auxiliary 12V battery",
      "Artificial engine noise speakers that produce fake petrol engine exhaust sounds",
      "Dangerous 'Eco-modes' that throttle vehicle acceleration to sub-30 km/h on high-speed flyovers",
    ],
    commonMisconceptions: [
      {
        myth: "EV batteries must be replaced every 2 to 3 years at massive cost.",
        reality: "Modern automotive-grade lithium battery packs (governed by smart BMS) retain 75%–80% health after 100,000–150,000 km, lasting 7 to 10+ years under typical daily usage.",
      },
      {
        myth: "Charging an EV at home burns regular household electrical wiring.",
        reality: "Charging an EV from a dedicated 16A industrial socket wired with minimum 2.5 sq. mm or 4.0 sq. mm copper wire and a dedicated 16A/20A MCB is completely safe and fully compliant with Indian electrical codes.",
      },
    ],
  },
  buyingChecklist: {
    householdSizing: [
      {
        familySize: "Daily City Commuter (20–40 km/day)",
        capacity: "2.5kWh – 3.0kWh High-Speed Electric Scooter",
        guidance: "Charges once every 3 days at home. Eliminates weekly petrol pump visits; pays back initial price difference in ~24 months.",
      },
      {
        familySize: "Heavy Urban Rider / Courier (50–90 km/day)",
        capacity: "3.7kWh – 4.0kWh E-Scooter with Fast Charging",
        guidance: "Delivers reliable 110+ km real city range with plenty of buffer. Slashes daily fuel bills by approx. ₹150–₹220 per day.",
      },
      {
        familySize: "Urban Family City Runabout (3–4 members)",
        capacity: "19kWh – 26kWh Compact Electric Hatchback",
        guidance: "Ideal second car for daily office commute, school runs, and weekend shopping. Smooth, silent, and effortlessly parkable.",
      },
      {
        familySize: "Intercity Highway Commuter (Multi-City Travel)",
        capacity: "40kWh – 60kWh+ Electric SUV with CCS2 DC Fast Charging",
        guidance: "Delivers 320–420 km real highway range. Fast-charges from 10% to 80% in 45–55 minutes at highway charging plazas.",
      },
    ],
    spaceAndInstallationChecks: [
      "Check ground-floor parking electrical provision: Must install a dedicated 16A industrial socket with genuine copper earthing.",
      "Verify Earth-to-Neutral AC voltage: Must be under 3.0V (EV smart chargers will refuse to initiate charging if earthing is missing or weak).",
      "Apartment dwellers: Confirm housing society permissions for running a sub-metered cable from your flat's meter to your designated parking bay.",
      "If parking charging is impossible, select an electric scooter model with a removable, carryable battery pack (weighs ~10–13 kg).",
    ],
    energyAndRunningCosts: {
      starRatingImpact: "Electric mobility running cost: ~₹0.25 to ₹0.35 per km for 2-wheelers; ~₹1.10 to ₹1.40 per km for electric cars.",
      runningCostTip: "Compared to petrol scooters (₹2.20/km) and petrol cars (₹7.50/km), an EV cuts monthly household transportation expenses by 75%–85%.",
      estimatedAnnualSavings: "A commuter riding 40 km daily saves an estimated ₹28,000 to ₹34,000 annually in fuel and routine maintenance costs.",
    },
    longTermOwnershipCosts: [
      "Periodic replacement of brake pads and tires (EV tires wear ~15% faster due to high instantaneous torque).",
      "Zero engine oil, zero oil filter, zero spark plug, zero clutch plate, and zero exhaust system maintenance expenses.",
    ],
  },
  recommendationProfiles: [
    {
      scenario: "Daily Urban Office Commuter (Independent House)",
      household: "Single / Couple",
      usage: "Daily 30–50 km city commute, market errands",
      budgetBracket: "₹1,15,000 – ₹1,45,000 (On-Road)",
      recommendedType: "High-Speed Electric Scooter (3.5kWh – 4.0kWh LFP/NMC)",
      recommendedSpecs: "Real-world range 100–120 km, top speed 85 km/h, IP67 battery, 3.3kW home charger, combined disc brakes",
      whyThisFit: "Delivers effortless zip in city traffic, comfortably covers 2–3 days of commuting per charge, and slashes monthly fuel bills.",
      tradeOff: "Requires dedicated ground-floor 16A socket for overnight charging.",
    },
    {
      scenario: "Apartment Resident Without Fixed Parking Power Socket",
      household: "Apartment dweller",
      usage: "Daily 20–35 km city travel, no basement charger access",
      budgetBracket: "₹95,000 – ₹1,25,000",
      recommendedType: "High-Speed Electric Scooter with Removable Dual Batteries",
      recommendedSpecs: "Portable dual battery packs (under 12 kg each), real-world range 75–90 km, indoor carry-home charging dock",
      whyThisFit: "Allows carrying the battery up to your apartment via lift to charge from any standard 16A bedroom socket.",
      tradeOff: "Lifting and carrying 10–12 kg battery requires physical effort.",
    },
    {
      scenario: "Commercial Delivery / Delivery Fleet Professional",
      household: "Commercial Rider",
      usage: "Daily 80–120 km parcel, grocery, and food delivery",
      budgetBracket: "₹85,000 – ₹1,20,000",
      recommendedType: "Heavy-Duty Commercial E-Scooter with Battery Swapping / Fast Charge",
      recommendedSpecs: "Reinforced steel carrier rack, heavy-duty rear shock absorbers, high-cycle LFP battery, fast-charge capability",
      whyThisFit: "Maximizes daily earnings by reducing operational fuel cost to under ₹35 per day for 100 km.",
      tradeOff: "Basic utilitarian styling with minimal digital luxury features.",
    },
    {
      scenario: "Urban Family Second Car for City Commuting",
      household: "Family (3–5 members)",
      usage: "Daily 40–70 km intra-city driving, school runs, office transit",
      budgetBracket: "₹8,50,000 – ₹12,50,000 (Ex-Showroom)",
      recommendedType: "Compact City Electric Hatchback (19kWh – 26kWh Battery)",
      recommendedSpecs: "Real-world city range 180–220 km, automatic single-speed, 3.3kW AC home wall-box, dual airbags, regenerative braking",
      whyThisFit: "Whisper-quiet air-conditioned city comfort, zero tailpipe pollution, and automatic driving in congested traffic.",
      tradeOff: "Highway road trips require planned stops at DC fast-charging stations.",
    },
    {
      scenario: "Primary Family Vehicle with Intercity Highway Travel",
      household: "Family (4–5 members)",
      usage: "Daily city commute + monthly 300–500 km highway trips",
      budgetBracket: "₹14,50,000 – ₹22,00,000",
      recommendedType: "Long-Range Electric SUV (40kWh – 50kWh+ Battery Pack)",
      recommendedSpecs: "Real-world highway range 320–380 km, CCS2 50kW DC fast-charging, 5-star crash safety, liquid-cooled battery pack",
      whyThisFit: "Spacious family cabin with genuine highway range; fast-charges in 45–55 minutes while family has lunch.",
      tradeOff: "Higher initial upfront capital investment.",
    },
  ],
  warrantyGuidance: {
    standardComprehensive: "Vehicle Warranty: 3 Years / 30,000 to 50,000 km covering chassis, suspension, lights, and standard mechanical hardware.",
    keyComponentWarranty: "Battery & Traction Motor Warranty: 3 to 8 Years (typically 3–5 Years on 2-wheelers; 8 Years / 160,000 km on passenger cars).",
    pcbCoverageTruth: "Manufacturer battery warranties legally guarantee that the battery will retain at least 70% of its original capacity (State of Health / SoH) during the warranty period.",
    labourAndSpares: "Authorized OEM dealerships handle EV servicing. Software updates, BMS firmware calibration, and brake inspections are covered under initial service schedules.",
    criticalExclusions: [
      "Water ingress damage resulting from submerging the vehicle in water above the wheel axle center line.",
      "Physical puncture or crush damage to the bottom battery pack enclosure from off-road rock impacts.",
      "Using unauthorized third-party fast chargers or tampering with wiring harness looms.",
      "Leaving the battery completely drained at 0% state of charge for over 30 days, causing permanent cell degradation.",
    ],
    claimRequirements: [
      "Documented periodic software diagnostic and inspection records at authorized brand service centers.",
      "Original vehicle registration certificate (RC) and GST purchase invoice.",
    ],
    extendedWarrantyAdvice: "Investing in an OEM extended battery warranty (e.g. extending 2-wheeler battery cover from 3 to 5 years) is highly recommended for complete peace of mind.",
  },
};

export const homeElectricalWiringGuide: CategoryGuide = {
  id: "home-electrical-wiring",
  name: "Home Electrical Wiring & Planning",
  tagline: "Build it safe before the walls close: circuit segregation, copper gauges, and future-proof load planning.",
  shortDesc: "Complete pre-construction electrical planning guide: concealed conduit layout, copper wire gauge (sq. mm) selection, MCB/RCCB distribution boards, earthing standards (IS 3043), and room-wise point checklists.",
  image: "electrical-wiring",
  group: "Electrical & Power",
  knowYourProduct: {
    types: [
      {
        type: "Concealed Heavy-Duty PVC Conduit Wiring",
        capacity: "Standard for New Home Construction & Complete Renovations",
        bestFor: "All modern residential construction before brick wall plastering and concrete slab casting.",
        pros: [
          "Completely hidden inside masonry walls for a clean architectural aesthetic finish",
          "Fire-retardant (FRLS) rigid PVC conduits shield wires against moisture, rodents, and accidental nail punctures",
          "Allows pulling new or upgraded wires through existing pipes without re-chiseling walls",
        ],
        cons: [
          "Must be meticulously planned and chiseled before cement plastering and flooring work begin",
          "Choked or crushed conduits cannot be easily fixed once marble flooring and painting are finished",
        ],
      },
      {
        type: "Surface Casing-Capping & Heavy Conduit Wiring",
        capacity: "Standard for Existing Homes, Heritage Structures & Additions",
        bestFor: "Renovations, rental homes, and room additions where wall chiseling is prohibited or impractical.",
        pros: [
          "Zero brick wall chiseling dust; fast and economical installation",
          "100% accessible: electrical circuits can be easily inspected, expanded, or modified at any time",
        ],
        cons: [
          "Visible plastic casing or metal conduits along wall surfaces compromise luxury interior aesthetics",
          "More vulnerable to accidental external mechanical impacts compared to concealed pipes",
        ],
      },
      {
        type: "Multi-Tier Distribution Board (DB) with MCB, RCCB & SPD",
        capacity: "Central Electrical Control & Protection Hub",
        bestFor: "Every independent apartment, floor, and villa distribution system.",
        pros: [
          "Isolates electrical faults: a tripped bathroom geyser circuit never plunges the living room into darkness",
          "Accommodates life-saving Residual Current Circuit Breakers (RCCBs) and Surge Protection Devices (SPDs)",
          "Enables dedicated circuit segregation for heavy-load appliances (ACs, geysers, EV chargers)",
        ],
        cons: [
          "Requires dedicated eye-level wall space in a dry, accessible corridor",
          "Demands disciplined professional wire dressing and neutral wire segregation by the electrician",
        ],
      },
      {
        type: "Chemical Pipe Earthing vs Conventional GI Plate Pit",
        capacity: "Earth Resistance < 2.0 Ohms (IS 3043 Compliant)",
        bestFor: "Grounding all domestic appliance metal bodies, surge protectors, and inverter systems.",
        pros: [
          "Copper-bonded solid electrode (minimum 250-micron coating) surrounded by carbon-bentonite compound",
          "Maintains stable low resistance (< 2 Ohms) for 15+ years without needing regular summer water/salt topping",
          "Quickly dissipates lightning surges and earth fault currents, preventing fatal shocks",
        ],
        cons: [
          "Higher initial material cost compared to cheap rusted galvanised iron (GI) local pipes",
          "Requires deep 3-meter borehole drilling into stable ground soil",
        ],
      },
      {
        type: "Modular Switchboards & Heavy-Duty Power Outlets",
        capacity: "Modular Polycarbonate Front Plates & High-Amp Sockets",
        bestFor: "All living spaces, kitchens, bathrooms, and exterior utility areas.",
        pros: [
          "Flame-retardant polycarbonate construction resists heat distortion and electrical sparking",
          "Safety-shuttered socket holes prevent children from inserting metal pins or fingers",
          "Heavy-duty silver-cadmium contacts handle inductive motor loads without contact welding",
        ],
        cons: [
          "Substandard local knock-off modular switches develop loose spring contacts after 1–2 years",
          "Requires matching metal concealed flush boxes installed straight and level by the mason",
        ],
      },
    ],
    technologies: [
      {
        tech: "FRLS-H (Flame Retardant Low Smoke & Halogen) Copper Wires",
        howItWorks: "Manufactured using 99.97% pure electrolytic grade multi-strand annealed copper insulated with high-grade cross-linked polymer compound.",
        realBenefit: "In the event of an electrical short-circuit fire, FRLS-H insulation self-extinguishes instantly and emits minimal toxic halogen smoke (visibility > 60% vs 20% in standard PVC), allowing family members to safely evacuate.",
        caution: "Never use cheap, unbranded commercial wires claiming 'copper-coated aluminium' (CCA); they overheat, brittle, and pose extreme fire hazards.",
      },
      {
        tech: "Residual Current Circuit Breaker (RCCB / RCBO - 30mA)",
        howItWorks: "Continuously monitors the magnetic balance between outgoing Phase current and incoming Neutral current.",
        realBenefit: "If current leaks to earth (e.g. through human contact or degraded appliance insulation) by as little as 30 milliamperes (30mA), the RCCB trips in under 30 milliseconds — saving lives from fatal electrocution.",
        caution: "Standard MCBs DO NOT protect humans from electric shocks; only an RCCB provides life-saving earth leakage protection.",
      },
      {
        tech: "Type 2 Surge Protection Device (SPD)",
        howItWorks: "Installed inside the main distribution board using heavy-duty Metal Oxide Varistors (MOVs) connected between Phase, Neutral, and Earth.",
        realBenefit: "When lightning strikes nearby overhead power lines or grid switching creates massive transient spikes (> 1,000V), the SPD diverts the voltage spike safely to earth within nanoseconds, saving inverter AC boards, smart TVs, and refrigerators.",
        caution: "An SPD is completely useless if your home does not have a properly tested, low-resistance (< 2 Ohms) chemical earthing pit.",
      },
      {
        tech: "Three-Phase Load Balancing Architecture",
        howItWorks: "For homes with sanction loads >= 5kW, incoming power is delivered across three separate phase lines (Red, Yellow, Blue).",
        realBenefit: "Distributes heavy single-phase appliances (ACs, geysers, induction hobs) evenly across all three phases, preventing phase overload trips and neutral wire overheating.",
        caution: "Unbalanced phase allocation causes heavy neutral current, resulting in fluctuating voltages and burned neutral busbars.",
      },
    ],
    keySpecifications: [
      {
        spec: "Wire Gauge Standards (IS 694 Conformance)",
        importance: "Selecting correct copper cross-sectional area (sq. mm) prevents wire overheating and voltage drops.",
        recommendedStandard: "1.0 sq. mm for lighting/fans; 1.5 sq. mm for 6A sockets; 2.5 sq. mm for refrigerators/washing machines; 4.0 sq. mm for 1.5T/2T ACs & geysers; 6.0–10.0 sq. mm for main DB feeder lines.",
      },
      {
        spec: "Earth Loop Resistance (IS 3043 Standard)",
        importance: "Measures electrical resistance between your home's earthing terminal and true earth ground.",
        recommendedStandard: "Must measure strictly under 2.0 Ohms using a calibrated 3-pin Earth Megger Tester. Earth-to-Neutral AC voltage must measure < 2.0V at sockets.",
      },
      {
        spec: "Circuit Segregation & Independent Neutral",
        importance: "Ensures heavy appliance faults do not back-feed voltage or overheat shared neutral wires.",
        recommendedStandard: "Every high-power appliance circuit (AC, Geyser, Kitchen) MUST have its own independent Phase, Neutral, and Earth wire running straight to the DB.",
      },
      {
        spec: "Conduit Wall Plaster Depth",
        importance: "Prevents unsightly hairline plaster cracks and protects concealed pipes from accidental wall screws.",
        recommendedStandard: "PVC conduits must be chiseled deep enough to have at least 12mm to 15mm of cement mortar plaster cover over the pipe surface.",
      },
    ],
    featuresWorthPayingFor: [
      "100% Electrolytic grade FRLS-H copper wires from certified Tier-1 brands (Havells, Polycab, Finolex, RR Kabel)",
      "30mA Residual Current Circuit Breakers (RCCBs) for all human-accessible socket and wet area circuits",
      "Chemical copper-bonded pipe earthing pit with low-resistance bentonite compound",
      "Dedicated 4.0 sq. mm wiring runs for every air conditioner and bathroom storage geyser",
      "Running extra empty 25mm conduits from the DB to parking (for EV charger) and to roof (for Solar PV)",
    ],
    gimmicksToSkip: [
      "Substandard 'copper coated aluminium' (CCA) wires sold at deep discounts in unorganized markets (severe fire hazard)",
      "Over-complicated touch-switch automation panels without mechanical physical switch overrides",
      "Skipping conduit inspection before plastering (fixing crushed conduits after marble and paint costs 10x more)",
    ],
    commonMisconceptions: [
      {
        myth: "A miniature circuit breaker (MCB) protects people from electric shocks.",
        reality: "An MCB ONLY protects electrical wires from overheating and catching fire during dead short-circuits and current overloads. An MCB will NEVER trip if a child touches an exposed live terminal! Only an RCCB (30mA) detects leakage to earth and prevents fatal electrocution.",
      },
      {
        myth: "One earthing pipe is sufficient for an entire multi-floor house.",
        reality: "Modern households filled with multiple inverter ACs, computers, induction cooktops, and inverters produce high harmonic leakage. Safe Indian Standards (IS 3043) mandate at least two interconnected low-resistance chemical earth pits.",
      },
    ],
  },
  buyingChecklist: {
    householdSizing: [
      {
        familySize: "Living & Dining Room (200–300 sq ft)",
        capacity: "Comprehensive Entertainment & Climate Circuitry",
        guidance: "Plan 1 TV cluster (4x 6A sockets for TV, set-top box, soundbar, console), 2 ceiling fans, 8-10 perimeter downlights, 2 utility 6A points, and 1 dedicated 16A/20A AC point (4.0 sq. mm line).",
      },
      {
        familySize: "Master Bedroom (140–180 sq ft)",
        capacity: "Dedicated Climate, Lighting & Bedside Controls",
        guidance: "2 bedside switchboards (each with 2x 6A sockets + 2-way fan & light control switches), 1 dedicated 16A/20A AC point with 4.0 sq. mm line straight to DB, 1 TV point, 1 dresser point.",
      },
      {
        familySize: "Modular Kitchen & Utility",
        capacity: "High-Load Independent Kitchen Circuits",
        guidance: "Minimum 4 dedicated 16A circuits on separate breakers (Refrigerator, Microwave, Mixer-Grinder, Dishwasher/Induction), 1 chimney point at 7ft, 1 RO water purifier point below sink.",
      },
      {
        familySize: "Bathrooms & Powder Rooms",
        capacity: "Dedicated High-Load Wet Area Protection",
        guidance: "1 dedicated 16A/20A double-pole (DP) switch outside bathroom for Geyser with 4.0 sq. mm wire, 1 6A socket above counter for trimmer/hairdryer, 1 exhaust fan point, all guarded by 30mA RCCB.",
      },
    ],
    spaceAndInstallationChecks: [
      "Verify conduit depth in masonry: Ensure minimum 12mm plaster cover over PVC conduits to avoid plaster cracking along pipe runs.",
      "Mount the Distribution Board (DB) at accessible eye level (1.5 to 1.8 meters) in a dry, ventilated hallway; never inside a bathroom or cramped under-stair cupboard.",
      "Conduct a Megger insulation resistance test (> 1 Mega-ohm) between Phase-Neutral and Phase-Earth BEFORE installing switches and closing junction boxes.",
      "Photograph every chiseled wall conduit route before plastering for future furniture mounting, picture hanging, and nail safety.",
    ],
    energyAndRunningCosts: {
      starRatingImpact: "Correct copper wire gauge sizing (4.0 sq. mm for ACs instead of undersized 1.5 sq. mm) minimizes resistive line heating (I²R loss).",
      runningCostTip: "Properly sized wire eliminates line voltage drop, keeping inverter compressors operating at peak efficiency and saving 2%–4% wasted electricity.",
      estimatedAnnualSavings: "Prevents premature appliance motor burnouts and avoids costly emergency wall-breaking rewiring repairs.",
    },
    longTermOwnershipCosts: [
      "Annual earth pit resistance testing with a Megger tester (under ₹500–₹1,000 technician diagnostic fee).",
      "Periodic checking of distribution board terminal screws to ensure connections remain tightly torqued.",
    ],
  },
  recommendationProfiles: [
    {
      scenario: "Complete 2BHK Apartment Rewiring / Renovation",
      household: "2–4 members",
      usage: "Full electrical overhaul during apartment remodeling",
      budgetBracket: "₹45,000 – ₹75,000 (Wires, Conduits, DB & Switchgear)",
      recommendedType: "Concealed FRLS-H Copper Wiring + 8-Way Double Door DB with 30mA RCCB",
      recommendedSpecs: "FRLS-H wires (1.0, 1.5, 2.5, 4.0 sq. mm), 4.0 sq. mm runs for 2 ACs, 30mA 40A RCCB, modular shuttered switchboards",
      whyThisFit: "Delivers complete modern shock protection, dedicated kitchen appliance lines, and zero electrical flickering.",
      tradeOff: "Requires wall chiseling before painting.",
    },
    {
      scenario: "New 3BHK Contemporary Independent Floor",
      household: "4–6 members",
      usage: "Modern multi-AC family living with heavy kitchen appliances and home inverter",
      budgetBracket: "₹90,000 – ₹1,50,000",
      recommendedType: "Multi-Tier Distribution System with Inverter Segregation & Type 2 SPD",
      recommendedSpecs: "12-Way Double Door DB, Type 2 Surge Protection Device, chemical earthing pit (< 2 Ohms), dedicated inverter sub-circuits",
      whyThisFit: "Guards sensitive inverter AC boards and smart TVs against lightning surges while keeping essential backup circuits neatly isolated.",
      tradeOff: "Requires professional electrical contractor with conduit planning blueprints.",
    },
    {
      scenario: "Independent Multi-Floor Duplex / Villa (Three-Phase)",
      household: "Large joint family / 5+ bedrooms",
      usage: "5+ Inverter ACs, modular kitchen, home office, lift, and EV charging provision",
      budgetBracket: "₹2,00,000 – ₹3,50,000+",
      recommendedType: "Three-Phase Distribution System with Phase Load Balancing & Twin Chemical Earth Pits",
      recommendedSpecs: "Three-Phase 4-pole DB, sub-distribution board on each floor, 32A EV charger conduit run, 2x chemical earth pits (power + surge)",
      whyThisFit: "Evenly balances heavy electrical loads across all three phases, preventing neutral wire overheating and guaranteeing future EV/Solar readiness.",
      tradeOff: "Requires dedicated electrical shaft or riser conduit across floors.",
    },
    {
      scenario: "Rental Property Budget Electrical Refresh",
      household: "Tenants / Rental unit",
      usage: "Safe baseline electricals without heavy wall disruption",
      budgetBracket: "₹20,000 – ₹35,000",
      recommendedType: "FRLS Surface Conduit / Casing-Capping Refresh with Main RCCB",
      recommendedSpecs: "FRLS copper wires, surface-mounted modular gang boxes, 30mA RCCB on main supply, 2.5 sq. mm power sockets",
      whyThisFit: "Ensures life-saving electrical shock protection and fire safety for tenants without tearing into masonry walls.",
      tradeOff: "Visible wall casing lacks luxury concealed aesthetics.",
    },
    {
      scenario: "Commercial Clinic / Design Studio Renovation",
      household: "Professional studio / clinic",
      usage: "Sensitive medical / IT equipment, high lighting loads, uninterrupted power",
      budgetBracket: "₹80,000 – ₹1,60,000",
      recommendedType: "Isolated Grounding Electrical Architecture with Online UPS & SPD Provisions",
      recommendedSpecs: "Independent isolated earth line for sensitive diagnostic/workstation equipment, Type 2 SPD, high-amp busbar DB",
      whyThisFit: "Eliminates electrical ground noise, protects expensive diagnostic machinery, and prevents equipment reboots.",
      tradeOff: "Requires specialized isolated earthing pit separate from general building ground.",
    },
  ],
  warrantyGuidance: {
    standardComprehensive: "10 to 15 Years Manufacturer Warranty on FRLS-H Copper Wires against insulation degradation and copper conductivity failure.",
    keyComponentWarranty: "Modular switches: 5 to 10 Years mechanical operation warranty; Circuit breakers (MCB, RCCB): 2 to 5 Years replacement warranty.",
    pcbCoverageTruth: "Chemical earthing electrodes typically carry a 10-year manufacturer warranty against corrosion when installed in recommended backfill compound.",
    labourAndSpares: "Electrical wiring contracts are executed by independent certified electrical contractors. Always demand a Megger earth and continuity test report upon project completion.",
    criticalExclusions: [
      "Overloading wires beyond rated ampacity without properly matched MCB breaker protection.",
      "Wire joints or splices made inside concealed pipes (all connections must be inside accessible junction boxes).",
      "Damage caused by water seepage through masonry walls into electrical backboxes.",
      "Physical conduit crushing caused by masonry workers or flooring machinery during construction.",
    ],
    claimRequirements: [
      "Original material purchase tax invoices from authorized brand distributors.",
      "Megger insulation test and earth resistance certificate signed by a licensed electrical contractor.",
    ],
    extendedWarrantyAdvice: "Focus your investment on Tier-1 BIS-certified FRLS-H copper wires (IS 694) and 30mA RCCBs. Skimping on wiring is the single largest fire risk in residential homes.",
  },
};
