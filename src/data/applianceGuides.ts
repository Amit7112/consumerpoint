import {
  ledLightingGuide,
  invertersPowerBackupGuide,
  electricVehiclesGuide,
  homeElectricalWiringGuide,
} from "./additionalGuides.ts";

export interface CategoryGuide {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  image: string;
  group: "Cooling" | "Laundry" | "Entertainment" | "Kitchen" | "Heating" | "Electrical & Power" | "Mobility";

  // Section A: Know Your Product
  knowYourProduct: {
    types: Array<{
      type: string;
      capacity: string;
      bestFor: string;
      pros: string[];
      cons: string[];
    }>;
    technologies: Array<{
      tech: string;
      howItWorks: string;
      realBenefit: string;
      caution: string;
    }>;
    keySpecifications: Array<{
      spec: string;
      importance: string;
      recommendedStandard: string;
    }>;
    featuresWorthPayingFor: string[];
    gimmicksToSkip: string[];
    commonMisconceptions: Array<{
      myth: string;
      reality: string;
    }>;
  };

  // Section B: Important Things to Check Before Buying
  buyingChecklist: {
    householdSizing: Array<{
      familySize: string;
      capacity: string;
      guidance: string;
    }>;
    spaceAndInstallationChecks: string[];
    energyAndRunningCosts: {
      starRatingImpact: string;
      runningCostTip: string;
      estimatedAnnualSavings: string;
    };
    longTermOwnershipCosts: string[];
  };

  // Section C: Decision Wizard Criteria
  recommendationProfiles: Array<{
    scenario: string;
    household: string;
    usage: string;
    budgetBracket: string;
    recommendedType: string;
    recommendedSpecs: string;
    whyThisFit: string;
    tradeOff: string;
  }>;

  // Section D: Know Your Warranty
  warrantyGuidance: {
    standardComprehensive: string;
    keyComponentWarranty: string;
    pcbCoverageTruth: string;
    labourAndSpares: string;
    criticalExclusions: string[];
    claimRequirements: string[];
    extendedWarrantyAdvice: string;
  };
}

export const applianceGuides: Record<string, CategoryGuide> = {
  "refrigerators": {
    id: "refrigerators",
    name: "Refrigerators",
    tagline: "Keep it fresh without overpaying for unused cubic feet.",
    shortDesc: "Compare Single Door, Double Door Frost-Free, Triple Door & Side-by-Side refrigerators, inverter compressors, and real energy savings.",
    image: "refrigerator",
    group: "Cooling",
    knowYourProduct: {
      types: [
        {
          type: "Direct Cool Single Door",
          capacity: "180L – 230L",
          bestFor: "Bachelor, couples, and small families (1–3 members).",
          pros: ["Lowest power consumption", "Budget-friendly initial price (₹12,000–₹18,000)", "No fan motor failure risk"],
          cons: ["Manual defrosting required periodically", "Limited freezer space and shelf flexibility"],
        },
        {
          type: "Frost Free Double Door (Top Freezer)",
          capacity: "240L – 450L",
          bestFor: "Nuclear to medium families (3–5 members).",
          pros: ["Zero manual defrosting required", "Even air circulation across all shelves", "Separate freezer door retains cooling"],
          cons: ["Uses ~30-40% more electricity than Direct Cool", "Higher price point (₹22,000–₹45,000)"],
        },
        {
          type: "Bottom Mount Refrigerator",
          capacity: "250L – 400L",
          bestFor: "Families with elderly members or frequent fresh-vegetable cooking.",
          pros: ["Vegetable crisper and fridge shelves at eye level — no frequent bending", "Freezer at the bottom"],
          cons: ["Slightly higher cost than standard top-freezer models", "Limited model options in sub-300L range"],
        },
        {
          type: "Side-by-Side & French Door",
          capacity: "500L – 700L+",
          bestFor: "Large households (6+ members) and spacious kitchens.",
          pros: ["Massive storage capacity", "Dedicated temperature zones", "Water/ice dispensers on premium models"],
          cons: ["Requires minimum 36-inch wide kitchen doorway", "High power consumption and parts cost"],
        },
      ],
      technologies: [
        {
          tech: "Digital Inverter Compressor",
          howItWorks: "Runs continuously at varying speeds (1,200 to 4,500 RPM) depending on internal cooling load, instead of shutting completely on and off.",
          realBenefit: "Cuts electricity consumption by 25-35%, reduces operational hum to sub-38dB, and reduces thermal stress on cooling coils.",
          caution: "Inverter boards (PCBs) are sensitive to raw voltage surges. Always verify if the manufacturer includes comprehensive PCB warranty.",
        },
        {
          tech: "Convertible Multi-Flow Modes",
          howItWorks: "Allows freezer compartments to be temporarily repurposed as regular cooling space using dedicated evaporator dampers.",
          realBenefit: "Increases fresh food storage by up to 25-30% during festival seasons or family gatherings.",
          caution: "Switching modes takes 2 to 4 hours to reach set temperature. It is not an instant on-demand switch.",
        },
        {
          tech: "Dual Fan Cooling / Multi Air Flow",
          howItWorks: "Separate cooling fans for the freezer and refrigerator compartments.",
          realBenefit: "Prevents food odours from mixing between freezer and fresh zone, maintaining optimal 70% humidity in crisper.",
          caution: "More moving parts inside air ducts that require careful handling during periodic deep cleaning.",
        },
      ],
      keySpecifications: [
        {
          spec: "Net Usable Capacity vs Gross Volume",
          importance: "Gross volume includes the internal wall and insulation volume. Net capacity is the true food storage space.",
          recommendedStandard: "Always calculate net usable storage. A 260L Gross fridge usually offers ~235L Net capacity.",
        },
        {
          spec: "BEE Star Rating (2024–2026 Standards)",
          importance: "Ratings became stricter in recent revisions. A 2024 3-Star fridge consumes similar power to an older 4-Star model.",
          recommendedStandard: "Target 3-Star or 4-Star Inverter for optimal price-to-electricity savings balance.",
        },
        {
          spec: "Refrigerant Gas Type",
          importance: "Impacts thermodynamic efficiency and environmental impact.",
          recommendedStandard: "R600a (Isobutane) is the modern industry standard: non-ozone depleting and energy efficient.",
        },
      ],
      featuresWorthPayingFor: [
        "Inverter compressor with minimum 10-year warranty",
        "Toughened glass shelves rated for 150kg+",
        "Moisture-lock vegetable crisper box",
        "Stabilizer-free operation (working range 130V–290V)",
      ],
      gimmicksToSkip: [
        "Wi-Fi touchscreens on exterior doors (cost ₹30,000+ extra with limited practical utility)",
        "Artificial 'Deodorizing' filters that require expensive annual cartridge replacements",
        "Cosmetic metallic finishes with high markup over standard brush-steel",
      ],
      commonMisconceptions: [
        {
          myth: "Buying a 5-Star refrigerator is always the smartest financial choice.",
          reality: "The price difference between a 3-Star and 5-Star fridge can be ₹6,000–₹10,000. In average home usage, the electricity saving is only ₹500–₹800/year, requiring 8–10 years just to break even.",
        },
        {
          myth: "Stabilizer-free fridges never need an external voltage stabilizer.",
          reality: "Internal circuits only handle moderate swings (160V–260V). In areas with frequent extreme spikes (above 290V or below 130V), an external stabilizer is essential to protect the expensive inverter PCB.",
        },
      ],
    },
    buyingChecklist: {
      householdSizing: [
        { familySize: "1 to 2 Members", capacity: "180L – 210L Direct Cool or 235L Double Door", guidance: "Direct cool is sufficient unless you store large amounts of frozen food." },
        { familySize: "3 to 4 Members", capacity: "240L – 340L Double Door Frost-Free", guidance: "The sweet spot for Indian households; ensures ample vegetable crisper capacity." },
        { familySize: "5+ Members", capacity: "350L – 500L+ Triple Door or Side-by-Side", guidance: "Essential for bulk grocery storage and large meal preparations." },
      ],
      spaceAndInstallationChecks: [
        "Measure width and depth of kitchen entrance door, staircase turnings, and final spot (allow +2 inches clearance on sides and back for heat dissipation).",
        "Ensure dedicated 3-pin 6A or 16A earthing socket within 1.5 meters of the refrigerator position.",
        "Verify floor is level; unlevel placement causes compressor vibration, humming noise, and door gasket leaks.",
      ],
      energyAndRunningCosts: {
        starRatingImpact: "A 3-Star 250L Inverter fridge consumes ~190 kWh/year (approx. ₹1,400–₹1,800/year in electricity). A 1-Star or older non-inverter consumes 320+ kWh/year.",
        runningCostTip: "Keep the fridge at least 3 inches away from walls and avoid setting temperature dial to maximum cold during winter months.",
        estimatedAnnualSavings: "₹1,200 to ₹2,000 per year by upgrading from a 10-year-old fridge to a modern inverter model.",
      },
      longTermOwnershipCosts: [
        "Door magnetic gasket replacement after 5–7 years: ₹800–₹1,500.",
        "Inverter PCB replacement outside warranty: ₹3,500–₹6,500.",
        "Compressor gas refilling (R600a) if cooling coil leak develops: ₹1,800–₹2,800.",
      ],
    },
    recommendationProfiles: [
      {
        scenario: "Budget-Conscious / Small Household",
        household: "1–3 members",
        usage: "Daily fresh cooking, minimal frozen storage",
        budgetBracket: "₹14,000 – ₹19,000",
        recommendedType: "190L–215L 3-Star or 4-Star Direct Cool Inverter",
        recommendedSpecs: "Single Door, Inverter compressor, Toughened glass, Stabilizer-free 135V–290V",
        whyThisFit: "Delivers maximum storage per rupee, ultra-low electricity consumption (~130 kWh/yr), and reliable cooling.",
        tradeOff: "Requires manual defrosting once every 10–15 days.",
      },
      {
        scenario: "Standard Family / Optimal Value",
        household: "3–5 members",
        usage: "Regular cooking, dairy, ice, and weekly vegetables",
        budgetBracket: "₹24,000 – ₹34,000",
        recommendedType: "250L–290L 3-Star Inverter Double Door Frost-Free",
        recommendedSpecs: "Convertible 3-in-1 or 5-in-1 modes, toughened glass, multi-air flow vents",
        whyThisFit: "Zero manual defrosting, flexible freezer space, and proven long-term durability for Indian households.",
        tradeOff: "Higher initial price and requires 20% more kitchen floor space.",
      },
    ],
    warrantyGuidance: {
      standardComprehensive: "1 Year Comprehensive Warranty covering all parts (except cosmetic plastics and bulb).",
      keyComponentWarranty: "10 Years or 20 Years warranty strictly on the Compressor body.",
      pcbCoverageTruth: "CRITICAL: The compressor warranty does NOT automatically cover the Inverter Circuit Board (PCB). While some brands offer 5 years on PCB, others cover it for only 1 year. Always inspect the warranty certificate.",
      labourAndSpares: "After Year 1, technician visit fees, gas recharge, and labour charges are payable by the customer even if the replacement compressor itself is free.",
      criticalExclusions: [
        "Physical damage to plastic vegetable boxes, door handles, and glass shelves.",
        "Puncture of cooling coil/freezer plate caused by using sharp knives or ice picks to remove ice.",
        "Burned electrical parts due to extreme external lightning or un-earthed wall sockets.",
        "Gas leakage resulting from external corrosion in coastal or damp open areas.",
      ],
      claimRequirements: [
        "Original GST Retail Tax Invoice with clear dealer stamp and date.",
        "Manufacturer Warranty Card with serial number matching the barcode sticker on the back of the fridge.",
        "Clear photo of the model sticker located on the inside cabinet or rear compressor panel.",
      ],
      extendedWarrantyAdvice: "Prioritize brand-official extended warranty over third-party retailer store warranties. Official brand AMC ensures authentic OEM technicians and genuine R600a gas.",
    },
  },

  "air-conditioners": {
    id: "air-conditioners",
    name: "Air Conditioners",
    tagline: "Size it right for your room before you invest in tons.",
    shortDesc: "Complete guidance on Split vs Window ACs, 100% Copper vs Aluminium, Inverter vs Non-inverter, ISEER ratings, and installation realities.",
    image: "air-conditioner",
    group: "Cooling",
    knowYourProduct: {
      types: [
        {
          type: "Split Inverter AC",
          capacity: "1.0 Ton to 2.0 Ton",
          bestFor: "Bedrooms, living rooms, and modern spaces with wall mounting clearance.",
          pros: ["Whisper-quiet indoor unit (<28 dB)", "High ISEER energy efficiency", "Flexible wall positioning"],
          cons: ["Higher installation cost (copper pipe, brackets, core drilling)", "Indoor and outdoor units must be linked"],
        },
        {
          type: "Window AC",
          capacity: "1.0 Ton to 1.5 Ton",
          bestFor: "Rented apartments, rooms with dedicated window frame cavities, and compact spaces.",
          pros: ["Lower purchase price (₹25,000–₹32,000)", "Simple DIY-style installation — no outdoor piping runs", "Easy to uninstall when moving"],
          cons: ["Higher operational noise (45–55 dB inside room)", "Blocks natural window light", "Fewer 5-star inverter options"],
        },
        {
          type: "Hot and Cold All-Season AC",
          capacity: "1.5 Ton",
          bestFor: "North Indian regions with harsh peak summers (45°C+) and freezing winters (<5°C).",
          pros: ["Year-round utility as both cooler and room heater without high-risk open heating coils"],
          cons: ["10–15% price premium over cooling-only split ACs"],
        },
      ],
      technologies: [
        {
          tech: "Dual Inverter / Twin Rotary Compressor",
          howItWorks: "Uses twin rotary compression chambers with 180-degree phase shift to balance torque and stabilize vibration.",
          realBenefit: "Cools 40% faster on startup, operates silently, and maintains consistent room temperature without chilling-and-warming cycles.",
          caution: "Requires genuine copper interconnecting tubing for optimal refrigerant expansion.",
        },
        {
          tech: "100% Grooved Copper Condenser Coils",
          howItWorks: "Inner grooved copper tubes facilitate superior heat transfer and resist chemical oxidation compared to flat aluminium fins.",
          realBenefit: "Lasts 3x longer, withstands regional humidity, and can easily be brazed/repaired if a leak occurs (aluminium coils cannot be repaired; they require full replacement).",
          caution: "Verify on the brochure that BOTH indoor evaporator and outdoor condenser coils are 100% copper.",
        },
        {
          tech: "ISEER (Indian Seasonal Energy Efficiency Ratio)",
          howItWorks: "Measures cooling output divided by total electrical energy input across typical Indian seasonal temperatures.",
          realBenefit: "Higher ISEER = lower electricity bill. A 5-Star AC typically has ISEER > 5.0, while a 3-Star has ISEER ~3.8 to 4.0.",
          caution: "BEE ISEER tables update every 2 years. Ensure the energy label reflects the current BEE cycle.",
        },
      ],
      keySpecifications: [
        {
          spec: "Cooling Capacity (Watts or BTU)",
          importance: "A '1.5 Ton' AC can range between 4,800W to 5,280W rated capacity. Higher rated wattage cools faster under extreme 45°C heat.",
          recommendedStandard: "Look for rated cooling capacity at 100% load: 5,000W+ for a true 1.5 Ton unit.",
        },
        {
          spec: "Ambient Operating Temperature Limit",
          importance: "Standard ACs trip when outdoor ambient temperature crosses 46°C.",
          recommendedStandard: "Choose models rated to deliver effective cooling up to 52°C or 54°C ambient temperature.",
        },
        {
          spec: "Anti-Corrosion Blue Fin / Gold Fin Coating",
          importance: "Epoxy/hydrophilic coating over outdoor aluminium condenser fins prevents salt, dust, and acid rain corrosion.",
          recommendedStandard: "Mandatory for longevity in industrial, coastal, or high-pollution city areas.",
        },
      ],
      featuresWorthPayingFor: [
        "100% Copper tubes with anti-corrosion protection",
        "Stabilizer-free operation with wide operating voltage range (145V–290V)",
        "Convertible / Adjustable cooling modes (4-in-1 or 6-in-1 capacity scaling)",
        "Self-diagnosis error code display on indoor panel",
      ],
      gimmicksToSkip: [
        "Built-in Mosquito Repellent or Fragrance Cartridges (ineffective and expensive to replace)",
        "Artificial 'PM0.1 Air Purifier' claims in standard AC filters (air conditioners cannot replace standalone HEPA purifiers)",
        "Voice Assistant integration when standard infrared remote handles all daily functions",
      ],
      commonMisconceptions: [
        {
          myth: "Setting the AC to 16°C cools the room faster than setting it to 24°C.",
          reality: "An AC delivers cold air at the exact same temperature regardless of set point. Setting it to 16°C simply forces the compressor to run indefinitely, drastically increasing power consumption without faster cooling.",
        },
        {
          myth: "A bigger 2.0 Ton AC is always better than a 1.5 Ton AC for a medium bedroom.",
          reality: "An oversized AC cools the room too fast without dehumidifying the air, resulting in a cold, clammy, humid atmosphere and excessive compressor short-cycling.",
        },
      ],
    },
    buyingChecklist: {
      householdSizing: [
        { familySize: "Up to 120 sq. ft. (Small Bedroom)", capacity: "1.0 Ton Split Inverter", guidance: "Ideal for ground/middle floors without direct top-roof sun exposure." },
        { familySize: "120 to 180 sq. ft. (Standard Master Bedroom)", capacity: "1.5 Ton Split Inverter", guidance: "The gold standard for Indian bedrooms. If on top floor with direct sun, 1.5 Ton is mandatory." },
        { familySize: "190 to 260 sq. ft. (Living Room / Hall)", capacity: "2.0 Ton Split Inverter", guidance: "Essential for large spaces, open kitchens, or rooms with large west-facing glass windows." },
      ],
      spaceAndInstallationChecks: [
        "Verify outdoor unit mounting location: must have unobstructed airflow, shade from harsh afternoon sun, and sturdy wall bracket anchor.",
        "Check piping distance between indoor and outdoor unit: standard installation includes 3 meters (10 feet) copper tubing. Extra piping costs ₹800–₹1,200 per meter.",
        "Ensure dedicated 16A power socket with adequate MCB (Miniature Circuit Breaker) and true copper earthing.",
      ],
      energyAndRunningCosts: {
        starRatingImpact: "Running a 1.5 Ton 3-Star Inverter AC for 8 hours/day for 6 months costs approx. ₹10,500 in electricity. A 5-Star Inverter saves approx. ₹2,200–₹2,800 annually.",
        runningCostTip: "Run your AC at the BEE-recommended 24°C or 25°C with a ceiling fan on low speed. Each degree higher saves ~6% on electricity bills.",
        estimatedAnnualSavings: "Up to ₹3,500/year when upgrading from a 7-year-old non-inverter AC to a modern 5-Star Dual Inverter.",
      },
      longTermOwnershipCosts: [
        "Pre-summer deep jet water servicing: ₹600–₹900 per season.",
        "Refrigerant gas charging (R32 or R410A) if coil leak occurs: ₹2,200–₹3,200.",
        "Outdoor unit PCB replacement outside warranty: ₹4,500–₹9,000.",
      ],
    },
    recommendationProfiles: [
      {
        scenario: "Moderate Summer Usage (< 6 hrs/day)",
        household: "Standard bedroom (120–160 sq. ft.)",
        usage: "Night-time cooling only during peak summer months",
        budgetBracket: "₹30,000 – ₹36,000",
        recommendedType: "1.5 Ton 3-Star Inverter Split AC",
        recommendedSpecs: "100% Copper, ISEER > 3.85, R32 refrigerant, Dual Inverter compressor",
        whyThisFit: "Lowest purchase cost with dependable cooling. Paying ₹7,000 extra for a 5-star unit won't break even on low operating hours.",
        tradeOff: "Slightly higher monthly electricity bill during peak May–June heat waves.",
      },
      {
        scenario: "Heavy Daily Usage (10+ hrs/day / Top Floor)",
        household: "Master bedroom or living room (140–180 sq. ft.)",
        usage: "Afternoon and night continuous cooling throughout April–September",
        budgetBracket: "₹40,000 – ₹48,000",
        recommendedType: "1.5 Ton 5-Star Inverter Split AC",
        recommendedSpecs: "ISEER > 5.0, 100% Copper with Blue Fin/Gold Fin, convertible capacity scaling",
        whyThisFit: "High efficiency ensures the ₹8,000 price premium pays for itself in electricity savings within 2.5 seasons.",
        tradeOff: "Higher initial purchase price.",
      },
    ],
    warrantyGuidance: {
      standardComprehensive: "1 Year Comprehensive Warranty covering all mechanical and electrical parts.",
      keyComponentWarranty: "10 Years Warranty on the Inverter Compressor.",
      pcbCoverageTruth: "CRITICAL: Outdoor unit PCBs handle massive thermal and electrical stress. Leading brands offer 5 Years warranty on PCB. If a brand offers only 1 year on PCB, ask for written extension or budget ₹6,000+ for replacement risk.",
      labourAndSpares: "Standard installation is usually discounted (₹999–₹1,499) but extra copper piping, wall bracket, drain pipe, and core drilling through concrete are charged extra.",
      criticalExclusions: [
        "Gas leakage caused by un-authorized third-party technician installation.",
        "Corrosion of condenser coils caused by open sewer / 'nullah' acidic fumes unless specifically covered under anti-corrosion guarantee.",
        "Burnt PCB circuits caused by direct lightning strike or raw un-stabilized power lines.",
        "Installation by non-brand certified technicians (can completely void manufacturer warranty).",
      ],
      claimRequirements: [
        "Original GST invoice with matching AC indoor and outdoor unit serial numbers.",
        "Official Brand Installation Job Sheet or SMS confirmation confirming installation was performed by brand-authorized team.",
      ],
      extendedWarrantyAdvice: "Purchase a 2-year or 3-year Comprehensive Annual Maintenance Contract (AMC) directly from the manufacturer or trusted network like Consumer Point for scheduled seasonal servicing and guaranteed genuine parts.",
    },
  },

  "washing-machines": {
    id: "washing-machines",
    name: "Washing Machines",
    tagline: "Fabric care, water efficiency, and wash cycles decoded.",
    shortDesc: "Understand Front Load vs Top Load vs Semi-Automatic, direct drive BLDC motors, in-built heaters, and detergent compatibility.",
    image: "washing-machine",
    group: "Laundry",
    knowYourProduct: {
      types: [
        {
          type: "Fully Automatic Front Load",
          capacity: "6.0 kg to 9.0 kg",
          bestFor: "Families seeking best wash quality, fabric longevity, and minimum water consumption.",
          pros: ["Superior tumble wash without fabric stretching", "Uses 60% less water than top loads", "Built-in water heater for 60°C stain sanitization", "High spin speed (1,200–1,400 RPM) dries clothes faster"],
          cons: ["Higher purchase cost (₹28,000–₹45,000)", "Heavy unit (65–75 kg) difficult to move", "Requires minimum 1.0 bar water tap pressure"],
        },
        {
          type: "Fully Automatic Top Load",
          capacity: "6.5 kg to 10.0 kg",
          bestFor: "Families seeking convenience (add laundry mid-cycle without bending) and moderate budget.",
          pros: ["Easy top-loading — ergonomic for back pain sufferers", "Allows adding clothes mid-cycle", "Works even with low tap water pressure", "Affordable (₹16,000–₹26,000)"],
          cons: ["Uses more water (80–120 liters per cycle)", "Pulsator wash action can tangle delicate clothes", "Lower spin speeds (700–800 RPM) take longer to dry"],
        },
        {
          type: "Semi-Automatic (Twin Tub)",
          capacity: "7.0 kg to 10.5 kg",
          bestFor: "Budget households, locations with severe water shortage, and irregular electricity.",
          pros: ["Lowest price (₹9,000–₹15,000)", "Zero tap pressure needed (manual bucket filling allowed)", "Extremely low power consumption"],
          cons: ["Requires constant manual effort to transfer clothes between wash and spin tubs", "Large physical footprint"],
        },
      ],
      technologies: [
        {
          tech: "Direct Drive (DD) / Inverter Motor",
          howItWorks: "Motor is mounted directly behind the drum without belts or pulleys, controlled by electronic frequency modulation.",
          realBenefit: "Eliminates belt wear, reduces vibration, and operates almost silently during wash cycles.",
          caution: "Repairs require authorized technicians; unauthorized belt bypass cannot be applied.",
        },
        {
          tech: "In-Built Water Heater",
          howItWorks: "Internal heating element raises water temperature up to 60°C or 90°C for intensive allergen and grease removal.",
          realBenefit: "Crucial for households with babies, athletes, or tough kitchen/oil stains. Sanitizes clothes and dissolves detergent completely.",
          caution: "Increases power consumption significantly during heated cycles (~1.8–2.2 kW per wash).",
        },
        {
          tech: "Hexa / Diamond Drum Embossing",
          howItWorks: "Smooth, diamond-shaped ridges and smaller water holes inside the stainless steel drum.",
          realBenefit: "Prevents delicate fabrics (chiffon, silk, wool) from snagging or tearing during high-speed spinning.",
          caution: "Ensure the drum is made of Grade 304 stainless steel rather than plastic.",
        },
      ],
      keySpecifications: [
        {
          spec: "Spin Speed (RPM - Revolutions Per Minute)",
          importance: "Higher RPM extracts more residual moisture from thick jeans and bedsheets, cutting drying time.",
          recommendedStandard: "800 RPM for Top Load; 1,200 to 1,400 RPM for Front Load.",
        },
        {
          spec: "Water Pressure Requirement (bar / psi)",
          importance: "Front load inlet solenoid valves require minimum water pressure to operate.",
          recommendedStandard: "Ensure your overhead tank is at least 8–10 feet above the tap, or install a pressure booster pump if below 0.5 bar.",
        },
        {
          spec: "BEE Star Rating & Water Consumption (L/kg)",
          importance: "BEE Star labels on washing machines indicate both electrical efficiency and water consumption per cycle.",
          recommendedStandard: "Choose 5-Star rated machines with certified low water consumption.",
        },
      ],
      featuresWorthPayingFor: [
        "Inverter / Direct Drive motor with 10-year warranty",
        "In-built heater for hot water stain removal",
        "Stainless steel drum and lint filter",
        "Rat-mesh metal base protection",
      ],
      gimmicksToSkip: [
        "Wi-Fi smartphone remote start (you still have to put the clothes and detergent in manually)",
        "Overly complex 25+ wash programs (90% of homes use only 3 cycles: Daily, Delicates, and Quick Wash)",
        "Glass lid hydraulic dampers sold at steep price markups",
      ],
      commonMisconceptions: [
        {
          myth: "You can use regular bucket-wash detergent in a front-load washing machine.",
          reality: "Regular detergent creates excessive suds that choke the front-load drain pump, trip the pressure sensor, and leave soapy residue on clothes. Front loads require low-suds 'Matics' detergent.",
        },
        {
          myth: "Front-load washing machines require a dedicated technician visit for every minor vibration.",
          reality: "80% of front-load vibration issues are simply caused by failure to remove the 4 rear 'Transit Bolts' installed for shipping protection, or an unlevel floor.",
        },
      ],
    },
    buyingChecklist: {
      householdSizing: [
        { familySize: "1 to 2 Members", capacity: "6.0 kg to 6.5 kg", guidance: "Handles daily clothing and occasional bedsheet wash." },
        { familySize: "3 to 4 Members", capacity: "7.0 kg to 8.0 kg", guidance: "The standard size for nuclear families. Easily fits double bedsheets and curtains." },
        { familySize: "5+ Members", capacity: "8.5 kg to 10.5 kg", guidance: "Essential to prevent running multiple loads every single day." },
      ],
      spaceAndInstallationChecks: [
        "Measure width, depth, and door clearance in bathroom/utility balcony (Front load door swings open 90+ degrees outwards).",
        "Ensure dedicated water tap with threaded nozzle for inlet hose connection.",
        "Ensure drain pipe outlet is positioned at correct height (Front load drain hose must loop up to 60-90cm height to prevent siphon drainage).",
      ],
      energyAndRunningCosts: {
        starRatingImpact: "Front load uses ~45-60 liters of water per cycle vs 110-140 liters in top load. Electricity cost is similar (~0.8 kWh/wash without heater).",
        runningCostTip: "Use normal tap water wash for regular clothes and reserve hot-water cycle for whites and soiled bed linen.",
        estimatedAnnualSavings: "Save 15,000+ liters of water annually by choosing a Front Load over a Top Load.",
      },
      longTermOwnershipCosts: [
        "Descaling powder/tablet (every 2-3 months): ₹400–₹800/year.",
        "Drain pump replacement if coin/pin damage occurs: ₹1,200–₹2,000.",
        "Door rubber gasket (bellow seal) replacement: ₹1,500–₹2,800.",
      ],
    },
    recommendationProfiles: [
      {
        scenario: "Budget Family / Convenient Loading",
        household: "3–4 members",
        usage: "Daily morning laundry, medium tap pressure",
        budgetBracket: "₹18,000 – ₹24,000",
        recommendedType: "7.0 kg 5-Star Top Load Fully Automatic",
        recommendedSpecs: "Inverter motor, stainless steel drum, soft-closing lid, digital display",
        whyThisFit: "Ergonomic top loading, forgiving of water pressure variations, reliable daily performance at reasonable cost.",
        tradeOff: "Uses more water per cycle and takes longer for clothes to line-dry.",
      },
      {
        scenario: "Maximum Fabric Care / Water Efficiency",
        household: "3–5 members",
        usage: "Daily laundry, diverse fabrics, adequate tap pressure",
        budgetBracket: "₹30,000 – ₹42,000",
        recommendedType: "7.5 kg or 8.0 kg 5-Star Front Load Fully Automatic",
        recommendedSpecs: "Direct Drive / Inverter, in-built heater (90°C), 1,200+ RPM spin, steam wash",
        whyThisFit: "Unrivaled wash quality, lowest water consumption, and fast spin drying.",
        tradeOff: "Higher upfront cost and requires low-suds detergent.",
      },
    ],
    warrantyGuidance: {
      standardComprehensive: "2 Years Comprehensive Warranty on the complete machine.",
      keyComponentWarranty: "10 Years or 12 Years Warranty on the Motor (Inverter / Direct Drive).",
      pcbCoverageTruth: "Controller board failures caused by voltage surges or damp utility balconies are typically covered under the 2-year comprehensive period, but NOT the 10-year motor warranty.",
      labourAndSpares: "Installation is generally free with basic inlet and drain hose provided in the box. Stand / trolley and tap adapters are charged separately.",
      criticalExclusions: [
        "Damage to drain pump caused by coins, hairpins, or nails left in pant pockets.",
        "Damage caused by rats biting electrical harnesses through an unprotected base.",
        "Damage caused by running the machine with transit shipping bolts still attached.",
        "Operating with heavily scaled hard water without periodic descaling.",
      ],
      claimRequirements: [
        "Original GST tax invoice with dealer name and serial number.",
        "Warranty card with model details.",
      ],
      extendedWarrantyAdvice: "Front load machines have sophisticated electronics and bearings. A 2-year extended comprehensive plan provides valuable peace of mind.",
    },
  },

  "televisions": {
    id: "televisions",
    name: "Televisions",
    tagline: "Screen size, panel technology, and true viewing distance.",
    shortDesc: "Demystifying 4K, OLED vs QLED vs LED, refresh rates (60Hz vs 120Hz), operating systems (Google TV vs Tizen vs webOS), and sound output.",
    image: "television",
    group: "Entertainment",
    knowYourProduct: {
      types: [
        {
          type: "4K UHD LED TV",
          capacity: "43, 50, 55, 65 inches",
          bestFor: "Everyday family entertainment, cable/DTH, and streaming in well-lit living rooms.",
          pros: ["Best value for screen size (55-inch from ₹28,000–₹40,000)", "High peak brightness for bright Indian daylight rooms", "Low burn-in risk"],
          cons: ["Black levels are dark grey in dim rooms", "Narrower viewing angles on VA panels"],
        },
        {
          type: "QLED (Quantum Dot LED)",
          capacity: "50, 55, 65, 75 inches",
          bestFor: "Movie lovers and gamers wanting vibrant colors, HDR punch, and high brightness.",
          pros: ["100% color volume and high brightness (1000+ nits)", "Superb gaming features with 120Hz on mid/high tiers", "No risk of permanent image burn-in"],
          cons: ["Still relies on backlight; cannot match OLED's perfect black levels"],
        },
        {
          type: "OLED (Organic LED)",
          capacity: "55, 65, 77 inches",
          bestFor: "Cinephiles and premium home theatre enthusiasts watching in controlled dim lighting.",
          pros: ["Infinite contrast ratio and true absolute blacks (self-lit pixels)", "Ultra-wide viewing angles without color fade", "Instantaneous pixel response time for gaming"],
          cons: ["High cost (₹80,000–₹2,00,000+)", "Lower peak brightness in harsh direct sunlight rooms", "Risk of static logo burn-in under extreme misuse"],
        },
      ],
      technologies: [
        {
          tech: "Panel Type: IPS vs VA",
          howItWorks: "IPS (In-Plane Switching) arranges liquid crystals horizontally; VA (Vertical Alignment) arranges them vertically.",
          realBenefit: "IPS offers wide side-viewing angles (great for joint families sitting around). VA offers 3x higher contrast ratio and deeper blacks (great for movie watching straight ahead).",
          caution: "Manufacturers often change panels between batches without changing model names. Verify panel type before buying.",
        },
        {
          tech: "Refresh Rate (60 Hz vs 120 Hz)",
          howItWorks: "Number of times the screen redraws the image per second.",
          realBenefit: "120Hz eliminates motion blur in live cricket, sports, and PS5/Xbox gaming. 60Hz is completely adequate for regular movies and YouTube.",
          caution: "Do not confuse motion smoothing software ('Motion Rate 240') with genuine 120Hz native hardware panels.",
        },
        {
          tech: "Operating System (Google TV vs Tizen vs webOS)",
          howItWorks: "Software platform managing app store, voice search, and streaming connectivity.",
          realBenefit: "Google TV has the widest app library, built-in Chromecast, and seamless Google Assistant voice search.",
          caution: "Budget TVs with weak processors and 1GB RAM become sluggish after 18 months. Ensure at least 2GB RAM.",
        },
      ],
      keySpecifications: [
        {
          spec: "Viewing Distance vs Screen Size",
          importance: "Sitting too close to a small screen strains eyes; sitting too far from 4K misses resolution details.",
          recommendedStandard: "6–8 feet distance = 43 to 50 inch; 8–10 feet = 55 inch; 10–12+ feet = 65 inch.",
        },
        {
          spec: "Audio Output (Watts RMS) & Dolby Atmos",
          importance: "Flat TV speakers have tiny acoustic cavities, leading to muffled dialogues.",
          recommendedStandard: "Minimum 24W to 30W with Dolby Audio; plan for a dedicated soundbar for cinematic movie audio.",
        },
        {
          spec: "HDMI Ports & eARC Support",
          importance: "Connects set-top box, gaming console, and soundbar simultaneously.",
          recommendedStandard: "At least 3 HDMI ports (with minimum one HDMI 2.1 eARC port for soundbar).",
        },
      ],
      featuresWorthPayingFor: [
        "4K UHD resolution with Dolby Vision and HDR10+ support",
        "Minimum 2GB RAM and 16GB internal storage for smooth app navigation",
        "Dual-band Wi-Fi (2.4 GHz + 5 GHz) for buffer-free 4K streaming",
        "Sturdy metal frame or wall-mount bracket with tilt adjustment",
      ],
      gimmicksToSkip: [
        "8K resolution on sub-75 inch TVs (human eye cannot distinguish 8K pixels from normal distance; no 8K content exists)",
        "Curved TV screens (awkward reflections, narrow sweet spot)",
        "Built-in cameras with gesture control (poor responsiveness)",
      ],
      commonMisconceptions: [
        {
          myth: "A 55-inch TV is too large for a standard 12x10 ft bedroom.",
          reality: "With 4K resolution, pixels are so fine that 55-inch TVs are perfectly comfortable from just 7.5 feet away without eye strain or pixelation.",
        },
        {
          myth: "TV screen warranty covers cracked glass from accidental bumps.",
          reality: "Physical panel cracks, liquid damage from spray cleaners, and insect entry behind the backlight are strictly excluded from all brand warranties.",
        },
      ],
    },
    buyingChecklist: {
      householdSizing: [
        { familySize: "Viewing Distance: 5–7 feet", capacity: "43 Inch 4K", guidance: "Ideal for compact bedrooms and kitchen dining walls." },
        { familySize: "Viewing Distance: 7–10 feet", capacity: "50 or 55 Inch 4K", guidance: "The most popular living room size for Indian homes." },
        { familySize: "Viewing Distance: 10–14 feet", capacity: "65 Inch 4K QLED / OLED", guidance: "True cinematic immersion for spacious family living halls." },
      ],
      spaceAndInstallationChecks: [
        "Check wall construction: Concrete/brick walls hold heavy 55-65 inch TVs safely. Drywall/hollow board requires specialized reinforced anchors.",
        "Ensure power point and cable/DTH box connections are within 1 meter to avoid hanging messy wires.",
        "Avoid placing the TV directly opposite large unshaded windows to prevent daytime screen glare.",
      ],
      energyAndRunningCosts: {
        starRatingImpact: "LED TVs consume 75W–140W depending on screen size. Running 6 hrs/day costs ~₹100–₹180/month in electricity.",
        runningCostTip: "Disable 'Vivid/Store Display Mode' and enable 'Eco' or 'Standard' picture mode to save ~25% power and prolong LED backlight life.",
        estimatedAnnualSavings: "Substantial lifespan savings by preventing premature backlight diode burnout.",
      },
      longTermOwnershipCosts: [
        "Wall mount installation charges: ₹500–₹1,200.",
        "Out-of-warranty LED backlight replacement: ₹2,500–₹5,000.",
        "Display panel replacement out of warranty: typically 60–75% of total TV cost.",
      ],
    },
    recommendationProfiles: [
      {
        scenario: "Budget Living Room / Everyday Entertainment",
        household: "General family viewing",
        usage: "News, daily soaps, sports, OTT streaming in normal room light",
        budgetBracket: "₹28,000 – ₹38,000",
        recommendedType: "50-inch or 55-inch 4K UHD LED Google TV",
        recommendedSpecs: "4K HDR10, 2GB RAM / 16GB ROM, Dolby Audio 24W–30W, dual-band Wi-Fi",
        whyThisFit: "Delivers maximum screen real estate per rupee with sharp 4K resolution and smooth streaming.",
        tradeOff: "Standard contrast in pitch-black rooms compared to premium QLED/OLED.",
      },
      {
        scenario: "Cinema Enthusiast / Gaming",
        household: "Movie lovers and console gamers",
        usage: "4K HDR movies, sports, PS5 gaming in ambient/dim lighting",
        budgetBracket: "₹55,000 – ₹85,000+",
        recommendedType: "55-inch or 65-inch QLED or Entry OLED",
        recommendedSpecs: "Quantum Dot, 120Hz native refresh rate, Dolby Vision, HDMI 2.1 eARC",
        whyThisFit: "Rich cinematic colors, deep blacks, high peak brightness, and fluid motion for gaming.",
        tradeOff: "Higher investment cost.",
      },
    ],
    warrantyGuidance: {
      standardComprehensive: "1 Year Comprehensive Warranty on the full television unit.",
      keyComponentWarranty: "Some brands provide 1 Additional Year (Total 2 Years) specifically on the Display Panel.",
      pcbCoverageTruth: "Motherboard and Power Supply Board (SMPS) failures caused by lightning or voltage spikes are only covered during Year 1.",
      labourAndSpares: "Standard brand wall-mount installation is often free for 43-inch and above models if booked through official brand toll-free service.",
      criticalExclusions: [
        "Physical panel damage (hairline cracks, pressure spots on LCD).",
        "Liquid ingress caused by spraying Colin or water directly onto the screen (it seeps into bottom COF ribbon cables).",
        "Damage from high-voltage surge or lightning through external coaxial cable.",
      ],
      claimRequirements: [
        "Original GST tax invoice.",
        "Serial number sticker on the back of the TV and original packaging carton barcode.",
      ],
      extendedWarrantyAdvice: "Because TV panel replacement costs 70% of the entire TV, purchasing an official 2-year extended panel warranty is strongly advised.",
    },
  },

  "water-purifiers": {
    id: "water-purifiers",
    name: "Water Purifiers",
    tagline: "Test your water's TDS before choosing RO, UV, or UF.",
    shortDesc: "Don't strip essential minerals unnecessarily. Learn when you need RO, when UV is enough, TDS controllers, and filter replacement costs.",
    image: "water-purifier",
    group: "Kitchen",
    knowYourProduct: {
      types: [
        {
          type: "RO + UV + UF with TDS Controller",
          capacity: "7L to 10L Storage",
          bestFor: "Borewell / groundwater / tanker supply with high TDS (>300–2,000 ppm) or heavy metals.",
          pros: ["Removes dissolved chemical salts, lead, arsenic, and pesticides", "Provides pure, consistent taste", "Kills bacteria and viruses"],
          cons: ["Wastes 50–65% water as reject brine", "Requires regular filter replacements (₹3,000–₹5,000/year)", "Requires electricity and water tap pressure"],
        },
        {
          type: "UV + UF Purifier (Gravity or Electric)",
          capacity: "7L to 14L Storage",
          bestFor: "Municipal / municipal pipeline corporation water with low TDS (<250 ppm).",
          pros: ["Zero water wastage", "Retains all natural essential minerals (Calcium, Magnesium)", "Low annual maintenance cost (₹1,000–₹1,800)", "Lower purchase price (₹6,000–₹10,000)"],
          cons: ["Cannot reduce water hardness, salty taste, or heavy chemical contaminants"],
        },
      ],
      technologies: [
        {
          tech: "RO (Reverse Osmosis) Membrane",
          howItWorks: "Forces water under high pressure through a semi-permeable membrane with 0.0001-micron pores.",
          realBenefit: "Only technology capable of removing heavy metals, fluoride, nitrates, and dissolved salts.",
          caution: "If your input water TDS is already low (<200 ppm), an aggressive RO strips all healthy minerals and creates slightly acidic demineralized water.",
        },
        {
          tech: "TDS Modulator / Mineral Cartridge",
          howItWorks: "Blends purified UV water back into RO water or adds back measured natural minerals (Calcium, Magnesium).",
          realBenefit: "Restores natural water taste and maintains balanced pH between 7.0 and 7.8.",
          caution: "Check that the mineralizer is authentic and certified, not merely an unverified ceramic stone filter.",
        },
        {
          tech: "UV LED In-Tank Disinfection",
          howItWorks: "Low-power ultraviolet LED inside the storage tank turns on periodically for 15 minutes.",
          realBenefit: "Prevents bacterial slime and secondary contamination in stored water.",
          caution: "Primary UV chamber before storage is still required for instant disinfection during filtration.",
        },
      ],
      keySpecifications: [
        {
          spec: "Input Water TDS (Total Dissolved Solids in ppm)",
          importance: "The single most important factor determining which purifier type to buy.",
          recommendedStandard: "TDS < 250 ppm: Buy UV+UF; TDS > 300 to 2,000 ppm: Buy RO+UV+Mineralizer.",
        },
        {
          spec: "Purification Capacity (Liters/Hour)",
          importance: "Speed at which the purifier refills its internal storage tank.",
          recommendedStandard: "Look for 12 to 15 Liters/Hour purification capacity.",
        },
        {
          spec: "Water Recovery / Reject Ratio",
          importance: "Traditional ROs waste 3 glasses for every 1 glass purified.",
          recommendedStandard: "Look for high-recovery RO models (50%+ recovery) to reduce water waste.",
        },
      ],
      featuresWorthPayingFor: [
        "Authentic Dow Filmtec or certified high-rejection RO membrane",
        "Food-grade, BPA-free anti-bacterial storage tank",
        "Digital filter-life change alert indicator",
        "Pre-filter sediment housing with brass adapter",
      ],
      gimmicksToSkip: [
        "'Alkaline Water' marketing charging ₹10,000 extra with unproven medical health claims",
        "Bluetooth app connectivity displaying water consumption on phone",
        "Multi-colored ambient LED tank lighting",
      ],
      commonMisconceptions: [
        {
          myth: "Everyone in India needs an RO water purifier.",
          reality: "If your municipal corporation water tastes sweet and has TDS below 200 ppm, installing an RO wastes valuable water and strips beneficial minerals. A UV+UF purifier is healthier and cheaper.",
        },
        {
          myth: "TDS zero water is the purest and healthiest water to drink.",
          reality: "TDS zero water is completely demineralized. Human body requires trace minerals (Calcium, Potassium, Magnesium) in drinking water (ideal TDS is 100 to 250 ppm).",
        },
      ],
    },
    buyingChecklist: {
      householdSizing: [
        { familySize: "1 to 3 Members", capacity: "7L Storage Tank", guidance: "Refills automatically in ~35 minutes; ample for daily drinking and cooking." },
        { familySize: "4 to 6 Members", capacity: "8L to 10L Storage Tank", guidance: "Prevents running out during morning rush hours or power cuts." },
        { familySize: "Joint Family / Office", capacity: "12L+ Storage or Commercial 25 LPH", guidance: "Essential for heavy continuous drinking water usage." },
      ],
      spaceAndInstallationChecks: [
        "Test your water source TDS using an inexpensive digital TDS meter (₹250 on Amazon) BEFORE shopping.",
        "Ensure wall has space for purifier near kitchen sink with a dedicated cold water inlet tap.",
        "Ensure nearby 3-pin 6A power socket and clean routing for waste-water discharge pipe.",
      ],
      energyAndRunningCosts: {
        starRatingImpact: "Power consumption is negligible (~30W to 40W during active pumping; ~₹25/month).",
        runningCostTip: "Collect the RO reject water pipe output in a bucket for floor mopping, watering non-edible plants, or utensil pre-cleaning.",
        estimatedAnnualSavings: "Save ₹3,000–₹5,000 every year by avoiding an RO when your tap water only needs UV filtration.",
      },
      longTermOwnershipCosts: [
        "Sediment and Carbon pre-filter replacement (every 6 months): ₹800–₹1,200.",
        "RO membrane replacement (every 18–24 months): ₹1,800–₹3,000.",
        "Total annual maintenance service kit: ₹2,500–₹4,500/year.",
      ],
    },
    recommendationProfiles: [
      {
        scenario: "Municipal / Low-TDS Tap Water (< 250 ppm)",
        household: "Any family size",
        usage: "Sweet tasting city corporation water",
        budgetBracket: "₹7,000 – ₹11,000",
        recommendedType: "UV + UF Active Water Purifier",
        recommendedSpecs: "Stainless steel UV chamber, 0.01-micron UF membrane, 7L storage, food-grade tank",
        whyThisFit: "Zero water wastage, retains natural minerals, lowest annual filter maintenance cost.",
        tradeOff: "Cannot remove dissolved salinity or heavy metals if water source changes.",
      },
      {
        scenario: "Borewell / Tanker / Hard Saline Water (TDS 300–1,800 ppm)",
        household: "3–6 members",
        usage: "Hard groundwater, high salt, mineral scaling in utensils",
        budgetBracket: "₹13,000 – ₹20,000",
        recommendedType: "RO + UV + UF with Active TDS Controller / Mineralizer",
        recommendedSpecs: "High-grade 75 GPD RO membrane, copper/zinc mineralizer, 8L storage",
        whyThisFit: "Effectively eliminates harsh salts, heavy metals, and bacteria while restoring healthy minerals and taste.",
        tradeOff: "Generates reject wastewater and requires annual filter replacements.",
      },
    ],
    warrantyGuidance: {
      standardComprehensive: "1 Year Comprehensive Warranty on electrical parts (booster pump, SMPS power supply, UV lamp, solenoid valve).",
      keyComponentWarranty: "Some brands provide 1 to 2 Years Warranty specifically on the RO Membrane.",
      pcbCoverageTruth: "Consumable filters (sediment filter, pre-carbon, post-carbon) are consumable parts; they are NOT covered under warranty once clogged by dirt.",
      labourAndSpares: "Standard wall installation is usually provided free by the brand; pre-filter external bowl (if not in box) costs ₹500–₹800 extra.",
      criticalExclusions: [
        "Clogging of filters due to extremely muddy or high-iron raw water.",
        "Damage to booster pump caused by running dry without water supply.",
        "Membrane choking caused by input TDS exceeding manufacturer rated limits (e.g. >2,000 ppm).",
      ],
      claimRequirements: [
        "GST Purchase Invoice.",
        "Product serial number located on the underside or rear panel of the purifier.",
      ],
      extendedWarrantyAdvice: "Purchase a comprehensive brand AMC that includes at least one full filter change and two periodic service visits per year.",
    },
  },

  "microwave-ovens": {
    id: "microwave-ovens",
    name: "Microwave Ovens",
    tagline: "Solo, Grill, or Convection: Choose by your cooking style.",
    shortDesc: "Understand Solo for reheating vs Grill for tandoori vs Convection for baking cakes, cavity types, and power levels.",
    image: "kitchen-appliances",
    group: "Kitchen",
    knowYourProduct: {
      types: [
        {
          type: "Solo Microwave",
          capacity: "20L to 23L",
          bestFor: "Bachelors, nuclear families who only need heating, defrosting, and quick steaming.",
          pros: ["Lowest price (₹5,000–₹8,000)", "Compact countertop footprint", "Very simple operation"],
          cons: ["Cannot bake cakes, pizzas, or grill chicken/paneer"],
        },
        {
          type: "Grill Microwave",
          capacity: "20L to 25L",
          bestFor: "Homes that want reheating plus grilling tikka, kebabs, and sandwiches.",
          pros: ["Includes heating coils for browning and grilling", "Affordable (₹7,500–₹11,000)"],
          cons: ["Cannot bake bread, cookies, or cakes (no convection fan for dry circulating heat)"],
        },
        {
          type: "Convection Microwave",
          capacity: "25L to 32L+",
          bestFor: "All-in-one family cooking: reheating, grilling, baking cakes, and roasting.",
          pros: ["Complete versatile cooking solution with fan heater", "Replaces a separate toaster oven", "Large internal capacity"],
          cons: ["Larger footprint on kitchen counter", "Higher power draw (1,400W–2,200W)", "Price: ₹11,000–₹24,000"],
        },
      ],
      technologies: [
        {
          tech: "Ceramic Enamel vs Stainless Steel Cavity",
          howItWorks: "Internal chamber coating material.",
          realBenefit: "Ceramic enamel cavity is 99% bacteria-free, scratch-resistant, and wipes clean easily from oil splatters without discoloration or rusting.",
          caution: "Avoid painted cavity interiors on ultra-cheap microwaves; paint peels off over time with high heat.",
        },
        {
          tech: "Convection Blower Fan",
          howItWorks: "Circulates hot dry air evenly throughout the entire cavity.",
          realBenefit: "Crucial for uniform baking of sponge cakes, cookies, and crispy pizza crusts without burnt edges.",
          caution: "Always use the metal elevated baking rack provided in the box during convection mode.",
        },
      ],
      keySpecifications: [
        {
          spec: "Cavity Capacity (Liters)",
          importance: "Determines maximum dish size, baking tin diameter, and whole-chicken capacity.",
          recommendedStandard: "20L–23L for Solo; 28L–32L for family Convection baking.",
        },
        {
          spec: "Power Output (Watts)",
          importance: "Higher microwave wattage heats food faster and more uniformly.",
          recommendedStandard: "800W to 900W microwave output; 1,200W+ for convection grill.",
        },
        {
          spec: "Control Type: Mechanical Dial vs Touch Keypad",
          importance: "Tactile longevity vs digital preset recipes.",
          recommendedStandard: "Mechanical dials are simpler for elderly users; membrane touchpads offer precise auto-cook timers.",
        },
      ],
      featuresWorthPayingFor: [
        "Ceramic enamel interior with 10-year cavity warranty",
        "Preheat function with precise digital temperature control (40°C–200°C)",
        "Child safety lock on door and control panel",
        "Deodorizer / Steam Clean function",
      ],
      gimmicksToSkip: [
        "150+ 'Auto-Cook Indian Menus' (rarely calibrated to personal taste and spice preferences)",
        "Gimmicky 'Roti / Naan Maker' claims (traditional tawa produces vastly superior chapati)",
        "Smart mobile app recipes",
      ],
      commonMisconceptions: [
        {
          myth: "Microwaving food destroys nutrients or emits dangerous radiation.",
          reality: "Microwaves use non-ionizing radio-frequency waves that only agitate water molecules. Nutrient retention in microwaving is actually higher than boiling because cooking time is much shorter.",
        },
        {
          myth: "You can use metal bowls or aluminum foil inside a microwave.",
          reality: "Metal reflects microwaves, causing sparks (arcing) and severe fire hazard. Metal is only allowed during pure Convection/Grill modes with microwave magnetron turned off.",
        },
      ],
    },
    buyingChecklist: {
      householdSizing: [
        { familySize: "1 to 2 Members", capacity: "20L to 23L Solo", guidance: "Perfect for reheating milk, leftovers, and defrosting." },
        { familySize: "3 to 4 Members", capacity: "25L to 28L Convection", guidance: "Ideal for weekend baking, grilling snacks, and daily heating." },
        { familySize: "5+ Members / Avid Bakers", capacity: "30L to 32L Convection", guidance: "Accommodates 9-inch cake pans and large dinner platters." },
      ],
      spaceAndInstallationChecks: [
        "Measure countertop dimensions: allow at least 4 inches clearance on the top and rear for ventilation exhaust.",
        "Ensure dedicated 16A wall socket (convection microwaves draw 1,500W–2,200W).",
        "Never block top or side air-vent louvers with dishcloths or utensils.",
      ],
      energyAndRunningCosts: {
        starRatingImpact: "Used for 10–20 minutes daily, electricity cost is minor (~₹100–₹180/month).",
        runningCostTip: "Always cover wet food with a microwave-safe lid to trap steam, heating food twice as fast.",
        estimatedAnnualSavings: "Reheating on microwave uses 60% less energy than relighting LPG gas burners for small portions.",
      },
      longTermOwnershipCosts: [
        "Microwave-safe glass bowl / baking set: ₹1,000–₹1,800 one-time.",
        "Magnetron replacement out of warranty: ₹1,500–₹2,500.",
        "Door interlock microswitch replacement: ₹500–₹900.",
      ],
    },
    recommendationProfiles: [
      {
        scenario: "Basic Reheating & Defrosting",
        household: "1–3 members",
        usage: "Heating leftovers, milk, melting butter, making tea",
        budgetBracket: "₹5,500 – ₹7,500",
        recommendedType: "20L or 23L Solo Microwave",
        recommendedSpecs: "800W, ceramic or coated cavity, mechanical dial or simple touchpad",
        whyThisFit: "Does 100% of heating tasks reliably without paying extra for unused baking hardware.",
        tradeOff: "Cannot bake cakes, cookies, or grill tikkas.",
      },
      {
        scenario: "Complete Home Baking & Cooking",
        household: "3–5 members",
        usage: "Weekend cakes, pizzas, paneer tikka, and daily heating",
        budgetBracket: "₹12,000 – ₹17,000",
        recommendedType: "28L Convection Microwave",
        recommendedSpecs: "Ceramic enamel cavity, convection fan, tandoor/grill rack, 900W microwave",
        whyThisFit: "Replaces traditional OTG oven and microwave in a single kitchen countertop appliance.",
        tradeOff: "Requires larger countertop footprint and 16A power socket.",
      },
    ],
    warrantyGuidance: {
      standardComprehensive: "1 Year Comprehensive Warranty on all parts.",
      keyComponentWarranty: "4 to 5 Years Warranty on the Magnetron (the core microwave generator).",
      pcbCoverageTruth: "Front touchpad membrane and main PCB are covered under the 1-year comprehensive period only.",
      labourAndSpares: "Carry-in service is common for solo units under 23L; on-site home technician visits are standard for 28L+ convection models.",
      criticalExclusions: [
        "Burnt wave-guide mica sheet caused by food splatter buildup.",
        "Broken glass turntable plate (treated as cosmetic accessory).",
        "Punctures or scratches caused by abrasive steel-wool scrubbing inside cavity.",
      ],
      claimRequirements: [
        "Original GST tax invoice and warranty card.",
        "Model and serial number on the rear plate.",
      ],
      extendedWarrantyAdvice: "Generally not required for solo microwaves; worth considering for high-end convection units with complex electronic touchpads.",
    },
  },

  "geysers": {
    id: "geysers",
    name: "Geysers & Water Heaters",
    tagline: "Tank longevity, hard-water scaling, and safety valves.",
    shortDesc: "Understand Instant vs Storage vs Gas geysers, glass-lined tanks, magnesium anode rods, and high-rise pressure ratings.",
    image: "geyser",
    group: "Heating",
    knowYourProduct: {
      types: [
        {
          type: "Storage Water Geyser",
          capacity: "10L, 15L, 25L",
          bestFor: "Family bathrooms with bucket baths or rain showers.",
          pros: ["Supplies abundant hot water for full family bath", "Retains heat for hours with PUF insulation", "Works reliably with low and high tap pressures"],
          cons: ["Takes 10–20 minutes to heat up fully", "Larger wall mounting footprint", "Price: ₹6,500–₹12,000"],
        },
        {
          type: "Instant Water Geyser",
          capacity: "3L",
          bestFor: "Kitchen sinks for dishwashing and washbasins for hand/face washing.",
          pros: ["Instant hot water in 10 seconds", "Compact, sleek wall-mounting", "Lower purchase price (₹2,800–₹4,500)"],
          cons: ["High instant electrical load (3.0 kW to 4.5 kW)", "Cannot provide water for a full bucket bath"],
        },
        {
          type: "Gas Water Geyser",
          capacity: "6 L/min Continuous",
          bestFor: "Areas with high electricity tariffs or frequent winter power cuts.",
          pros: ["Zero electricity required", "Instant continuous hot water", "Low running cost on LPG"],
          cons: ["Requires mandatory bathroom ventilation / exhaust to prevent carbon monoxide poisoning", "Periodic battery and burner maintenance"],
        },
      ],
      technologies: [
        {
          tech: "Glass-Lined / Vitreous Enamel Tank",
          howItWorks: "Inner steel tank is fused with a glass enamel coating at 850°C.",
          realBenefit: "Prevents corrosive hard water and chlorine from rusting through tank seams, extending life to 8–10 years.",
          caution: "Avoid plain copper or un-coated stainless steel tanks if you have groundwater/borewell supply.",
        },
        {
          tech: "Sacrificial Magnesium Anode Rod",
          howItWorks: "A solid magnesium rod immersed inside the tank that attracts corrosive ions, corroding itself to protect the steel tank.",
          realBenefit: "Shields heating element and inner tank from aggressive hard water mineral scaling.",
          caution: "Anode rod dissolves over 2–3 years in hard water areas and must be replaced during periodic servicing.",
        },
        {
          tech: "Pressure Rating (8 Bar vs 6 Bar)",
          howItWorks: "Measures internal tank structural strength against incoming water pressure.",
          realBenefit: "8 Bar pressure rating is mandatory for modern multi-story apartments and high-rise buildings (5th floor and above).",
          caution: "Installing a 6-bar geyser in a high-rise building can cause tank rupture or permanent safety valve leakage.",
        },
      ],
      keySpecifications: [
        {
          spec: "Tank Capacity (Liters)",
          importance: "Determines how many consecutive family members can shower without waiting for reheat.",
          recommendedStandard: "15L for bucket bath (1-2 persons); 25L for shower bath / 3-4 member families.",
        },
        {
          spec: "Heating Element Material",
          importance: "Resists calcium scale buildup and prevents premature heating coil burnout.",
          recommendedStandard: "Incoloy 800 or Titanium-coated heating element with 2kW rating.",
        },
        {
          spec: "BEE Star Rating & Standing Loss",
          importance: "Standing loss is the heat lost through tank walls while water sits heated all day.",
          recommendedStandard: "Choose a 5-Star BEE rated geyser with high-density CFC-free PUF insulation.",
        },
      ],
      featuresWorthPayingFor: [
        "Glass-lined tank with 7–8 year warranty",
        "8 Bar high-rise apartment pressure rating with multi-function safety valve",
        "Thermal cut-off thermostat for dry-heating prevention",
        "Magnesium anode rod with easy inspection access",
      ],
      gimmicksToSkip: [
        "Wi-Fi scheduling apps on geysers (setting a 15-minute manual switch is simpler and zero failure risk)",
        "Digital LED temperature displays that fail after 2 years in steamy bathroom environments",
        "Fancy colored front body plates with 20% price markup",
      ],
      commonMisconceptions: [
        {
          myth: "Leaving the geyser turned on 24x7 consumes almost zero power because of the thermostat.",
          reality: "Even 5-star geysers suffer 'standing heat loss'. Water cools down and reheats automatically 5–8 times a day, wasting ₹300–₹500/month. Turn it on 15 minutes before bathing.",
        },
        {
          myth: "Geysers are dangerous and can explode.",
          reality: "Modern geysers have 4 safety layers: primary thermostat, thermal cut-off, pressure release valve, and vacuum relief valve. Explosions only happen if an unlicensed local plumber blocks the safety pressure valve.",
        },
      ],
    },
    buyingChecklist: {
      householdSizing: [
        { familySize: "Kitchen Sink / Basin", capacity: "3L Instant Geyser (3kW)", guidance: "Quick hot water for morning dishwashing and hand hygiene." },
        { familySize: "1 to 2 Members (Bucket bath)", capacity: "10L to 15L Storage (2kW)", guidance: "Heats fast, compact wall footprint, energy efficient." },
        { familySize: "3 to 5 Members (Rain Shower / Back-to-back baths)", capacity: "25L Storage (2kW)", guidance: "Ample hot water volume for rain shower heads and consecutive family baths." },
      ],
      spaceAndInstallationChecks: [
        "Check bathroom wall strength: a 25L geyser full of water weighs 40+ kg. Needs solid brick/concrete wall with heavy-duty metal anchor fasteners.",
        "Ensure distance from shower: install high on the wall away from direct shower water splashes (IPX4 splash-proof rating mandatory).",
        "Verify dedicated 16A socket with proper earthing; geysers draw high continuous current (2,000W).",
      ],
      energyAndRunningCosts: {
        starRatingImpact: "A 5-Star geyser has standing loss below 0.5 kWh/24hrs vs 1.1 kWh on older non-star models, saving ~₹1,200 every winter season.",
        runningCostTip: "Turn on the geyser 15 minutes before bath and switch it off immediately after use.",
        estimatedAnnualSavings: "Save ₹800–₹1,500 each winter by choosing a 5-Star insulated tank over a 3-Star unit.",
      },
      longTermOwnershipCosts: [
        "Magnesium anode rod replacement (every 2 years in hard water): ₹600–₹1,000.",
        "Heating element descaling / replacement: ₹800–₹1,500.",
        "Safety pressure relief valve replacement: ₹350–₹600.",
      ],
    },
    recommendationProfiles: [
      {
        scenario: "Nuclear Family (Bucket Bath / 3–4 Members)",
        household: "3–4 members",
        usage: "Morning bath routine, standard tap pressure",
        budgetBracket: "₹6,800 – ₹8,500",
        recommendedType: "15L 5-Star Storage Geyser",
        recommendedSpecs: "Glass-lined tank, 8-bar pressure, Incoloy 800 element, 2kW, PUF insulation",
        whyThisFit: "Optimal water volume, 12-minute reheat time, low power consumption, and long tank life.",
        tradeOff: "Bucket bath ideal; prolonged 15-minute rain shower may deplete hot water.",
      },
      {
        scenario: "Luxury Shower / High-Rise Apartment",
        household: "3–5 members",
        usage: "Rain shower, high-rise building with booster pump",
        budgetBracket: "₹9,500 – ₹13,000",
        recommendedType: "25L 5-Star Glass-Lined Storage Geyser",
        recommendedSpecs: "8-bar rated, titanium heating element, thick PUF insulation, multi-function valve",
        whyThisFit: "Delivers sustained high-volume hot water for high-pressure overhead shower panels.",
        tradeOff: "Larger wall mounting clearance required.",
      },
    ],
    warrantyGuidance: {
      standardComprehensive: "2 Years Comprehensive Warranty on the full product.",
      keyComponentWarranty: "7 to 8 Years Warranty on the Inner Tank; 2 to 3 Years on the Heating Element.",
      pcbCoverageTruth: "Thermostat and thermal cut-off switches are covered under the 2-year comprehensive terms.",
      labourAndSpares: "Standard brand installation is usually chargeable (₹399–₹600) plus inlet-outlet connection pipes (₹400–₹600 for pair).",
      criticalExclusions: [
        "Tank corrosion caused by failure to replace sacrificial anode rod after recommended interval.",
        "Dry heating failure: turning on geyser before filling tank completely with water (burns heating element in 30 seconds; warranty voided).",
        "Damage caused by using local plumber who bypasses or tightens shut the safety pressure release valve.",
      ],
      claimRequirements: [
        "GST Invoice and Warranty card.",
        "Photo of model rating plate on the geyser underside.",
      ],
      extendedWarrantyAdvice: "If the manufacturer already offers 7+ years on the inner tank and 2+ years comprehensive, third-party extended warranty is unnecessary.",
    },
  },

  "dishwashers": {
    id: "dishwashers",
    name: "Dishwashers",
    tagline: "Indian oily cooking, utensil compatibility, and water savings.",
    shortDesc: "Understand 12 vs 14 place settings, intensive 70°C hygiene wash for kadhais/grease, hard water softener salt, and true water savings.",
    image: "kitchen-appliances",
    group: "Kitchen",
    knowYourProduct: {
      types: [
        {
          type: "Free-Standing Dishwasher",
          capacity: "13 to 15 Place Settings",
          bestFor: "Most Indian kitchens with space under or beside the platform.",
          pros: ["Easy to install without kitchen remodeling", "Can be relocated if moving homes", "Generous capacity for daily Indian vessels"],
          cons: ["Requires 60cm x 60cm floor footprint near kitchen sink"],
        },
        {
          type: "Built-In Dishwasher",
          capacity: "14 to 16 Place Settings",
          bestFor: "Modular kitchens designed with custom cabinetry panels.",
          pros: ["Flushes completely seamless with kitchen cabinets", "Quietest operation (acoustic cabinet insulation)"],
          cons: ["Cannot be moved easily", "Higher purchase and cabinet fitting cost"],
        },
      ],
      technologies: [
        {
          tech: "Intensive 70°C Indian Kadhai Cycle",
          howItWorks: "Heats wash water to 70°C and blasts high-pressure rotating spray jets from multiple angles.",
          realBenefit: "Dissolves stubborn oil, masala, turmeric, and dried gravy stains far better than lukewarm hand sponge washing.",
          caution: "Burnt carbon crusts (e.g. completely burnt milk bottom) still require 2 minutes of hand scraping before loading.",
        },
        {
          tech: "Built-In Water Softener Unit",
          howItWorks: "Ion-exchange resin chamber that uses specialized dishwasher salt to strip Calcium and Magnesium from wash water.",
          realBenefit: "Prevents cloudy white mineral film on glassware and protects internal pump from hard water scaling.",
          caution: "Dishwasher salt chamber must be refilled once every 1–2 months.",
        },
        {
          tech: "BLDC Inverter Wash Pump",
          howItWorks: "Brushless DC motor that varies water pressure smoothly between delicate glasses and heavy bottom pots.",
          realBenefit: "Whisper-quiet operation (<44 dB), reduced electricity, and long motor lifespan.",
          caution: "Ensure regular cleaning of the bottom triple-filter mesh.",
        },
      ],
      keySpecifications: [
        {
          spec: "Place Settings (12 vs 14 vs 15)",
          importance: "1 Place Setting includes 1 dinner plate, 1 side plate, 1 bowl, 1 glass, and silverware.",
          recommendedStandard: "Indian families need minimum 13 to 14 place settings to accommodate large kadhais, pressure cookers, and patilas alongside plates.",
        },
        {
          spec: "Water Consumption Per Cycle",
          importance: "Dishwashers use significantly less water than continuous open-tap hand sink washing.",
          recommendedStandard: "9 to 11 liters per cycle (hand washing typically wastes 60–80 liters).",
        },
        {
          spec: "Adjustable Upper Rack & Foldable Tines",
          importance: "Allows folding down plate prongs to create flat space for large pressure cookers and pans.",
          recommendedStandard: "Mandatory for Indian cooking utensils.",
        },
      ],
      featuresWorthPayingFor: [
        "Intensive 70°C sanitization wash cycle",
        "Adjustable height upper rack and foldable bottom tines",
        "Built-in water softening chamber with salt refill indicator",
        "Half-Load wash option for smaller daily loads",
      ],
      gimmicksToSkip: [
        "Wi-Fi smartphone remote monitoring (you still have to load, scrape, and add detergent manually)",
        "Interior LED showcase lighting (unnecessary cost on an appliance that is closed during operation)",
        "Overly complex 15+ cycles when 3 cycles (Intensive, Normal, Quick) handle 99% of dishes",
      ],
      commonMisconceptions: [
        {
          myth: "Dishwashers cannot clean oily Indian kadhais and pressure cookers.",
          reality: "With hot 70°C water and alkaline enzymes, dishwashers break down oil and turmeric far better than manual hand soap. Only burnt-black charcoal crusts require pre-soaking.",
        },
        {
          myth: "Dishwashers waste an enormous amount of electricity and water.",
          reality: "A full dishwasher cycle consumes just 9–11 liters of water and ~1.0 unit of electricity. Hand washing the same dishes under a running tap wastes 60–80 liters of fresh water.",
        },
      ],
    },
    buyingChecklist: {
      householdSizing: [
        { familySize: "1 to 2 Members", capacity: "8 to 10 Place Settings (Tabletop)", guidance: "Sufficient for plates and cutlery; tight fit for large Indian cookware." },
        { familySize: "3 to 5 Members", capacity: "13 to 14 Place Settings (Standard Free-standing)", guidance: "The gold standard for Indian households; comfortably holds kadhais, cooker, and plates." },
        { familySize: "6+ Members / Joint Family", capacity: "15 to 16 Place Settings with Cutlery Tray", guidance: "Maximum flexibility for twice-daily loading in large households." },
      ],
      spaceAndInstallationChecks: [
        "Measure 60cm width x 60cm depth x 85cm height under kitchen counter near sink.",
        "Check plumbing: requires cold water tap inlet connection and wastewater drain pipe outlet into sink trap.",
        "Ensure dedicated 16A electrical socket with earthing.",
        "Check utensil compatibility: Stainless steel, ceramic, glass, and microwave-safe plastics are 100% dishwasher safe. Pure aluminum, raw cast iron, brass, and wood should NOT be washed in a dishwasher.",
      ],
      energyAndRunningCosts: {
        starRatingImpact: "Consumes ~0.9 to 1.2 kWh per full cycle (approx. ₹7–₹10 in electricity per wash).",
        runningCostTip: "Always scrape food bones/seeds into dustbin before loading; no need to pre-rinse under tap.",
        estimatedAnnualSavings: "Save 15,000+ liters of water annually compared to open-tap kitchen sink washing.",
      },
      longTermOwnershipCosts: [
        "Dishwasher detergent powder / tablets (₹400–₹700/month).",
        "Rinse aid (every 2-3 months): ₹250.",
        "Dishwasher salt for water softener (every 2 months): ₹150.",
      ],
    },
    recommendationProfiles: [
      {
        scenario: "Standard Indian Household (3–5 Members)",
        household: "3–5 members",
        usage: "Daily lunch & dinner utensils, kadhais, cooker, plates",
        budgetBracket: "₹34,000 – ₹45,000",
        recommendedType: "13 or 14 Place Setting Free-Standing Dishwasher",
        recommendedSpecs: "Intensive 70°C cycle, adjustable rack, built-in water softener, BLDC motor",
        whyThisFit: "Proven performance on oily Indian spices, fits standard pressure cookers, and saves massive kitchen labor.",
        tradeOff: "Requires dedicated 60cm floor spot near kitchen sink.",
      },
    ],
    warrantyGuidance: {
      standardComprehensive: "2 Years Comprehensive Warranty on the full dishwasher unit.",
      keyComponentWarranty: "10 Years Warranty on the Inverter BLDC wash motor and 10 Years against Inner Cavity Rust-through.",
      pcbCoverageTruth: "Electronic touch control panel and main control board are covered during the 2-year comprehensive period.",
      labourAndSpares: "Standard brand installation is provided free, including connecting the inlet hose and drain pipe.",
      criticalExclusions: [
        "Internal pump blockage caused by toothpicks, chicken bones, or stickers left on utensils.",
        "Damage caused by using regular hand-dishwash liquid (creates massive foam that floods motor and voids warranty).",
        "Rusting of non-stainless steel racks caused by scratches from knives.",
      ],
      claimRequirements: [
        "Original GST tax invoice and warranty card.",
        "Serial number sticker located on the inner stainless steel door rim.",
      ],
      extendedWarrantyAdvice: "Dishwashers contain water heaters, pumps, and sensor electronics. A 2-year extended brand warranty is a worthwhile investment.",
    },
  },
  "led-lighting": ledLightingGuide,
  "inverters-power-backup": invertersPowerBackupGuide,
  "electric-vehicles": electricVehiclesGuide,
  "home-electrical-wiring": homeElectricalWiringGuide,
};

