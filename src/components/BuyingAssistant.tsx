import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Compass,
  MessageCircle,
} from "lucide-react";
import { applianceGuides } from "../data/applianceGuides";
import { whatsappUrl } from "../config";

interface RecommendationResult {
  categoryName: string;
  categoryId: string;
  recommendedType: string;
  specs: string;
  worthPayingFor: string[];
  gimmicksToSkip: string[];
  budgetInsight: string;
  prePurchaseChecks: string[];
  warrantyChecklist: string[];
  tradeOff: string;
}

export default function BuyingAssistant({
  initialCategory = "refrigerators",
  compact = false,
}: {
  initialCategory?: string;
  compact?: boolean;
}) {
  const [category, setCategory] = useState<string>(initialCategory);
  const [householdSize, setHouseholdSize] = useState<string>("3-4");
  const [usagePattern, setUsagePattern] = useState<string>("moderate");
  const [priority, setPriority] = useState<string>("balance");
  const [result, setResult] = useState<RecommendationResult | null>(null);

  const guide = applianceGuides[category] || applianceGuides["refrigerators"];

  function generateRecommendation() {
    let recommendedType = "";
    let specs = "";
    let tradeOff = "";
    let budgetInsight = "";

    if (category === "refrigerators") {
      if (householdSize === "1-2" && (priority === "budget" || priority === "savings")) {
        recommendedType = "190L – 215L 3-Star or 4-Star Inverter Direct Cool Single Door";
        specs = "Net usable capacity ~185L, Inverter Compressor, Toughened Glass Shelves, R600a Gas, 135V–290V Stabilizer-Free Operation";
        tradeOff = "Requires manual push-button defrosting every 10–14 days. Freezer capacity is compact.";
        budgetInsight = "Indicative market price: ₹14,000 – ₹18,500. Estimated annual power: ~130 kWh/year (approx. ₹1,100/yr under standard test conditions).";
      } else if (householdSize === "1-2") {
        recommendedType = "235L – 255L 3-Star Inverter Double Door Frost-Free";
        specs = "Top Freezer, multi-air flow cooling, toughened glass shelves (150kg rated), R600a refrigerant, digital inverter";
        tradeOff = "Consumes ~25% more power than direct cool, but delivers zero ice buildup and separate freezer door.";
        budgetInsight = "Indicative market price: ₹22,000 – ₹27,000. Annual power consumption: ~190–215 kWh/year.";
      } else if (householdSize === "3-4" && priority === "savings") {
        recommendedType = "260L – 280L 3-Star Inverter Double Door Frost-Free (Energy-Optimized)";
        specs = "Smart inverter compressor, Eco thermo sensor, high-density PUF insulation, anti-bacterial door gasket";
        tradeOff = "Standard freezer size without ultra-deep ice storage, but delivers optimized annual utility bills.";
        budgetInsight = "Indicative market price: ₹25,000 – ₹31,000. Estimated annual consumption: ~195–225 kWh/year.";
      } else if (householdSize === "3-4") {
        recommendedType = "280L – 340L 3-Star Inverter Convertible Double Door";
        specs = "Convertible 3-in-1 or 5-in-1 modes, toughened glass shelves, deodorizing air filter, deep crisper box";
        tradeOff = "Higher upfront price; requires at least 30-inch doorway clearance for installation.";
        budgetInsight = "Indicative market price: ₹29,000 – ₹38,000. Estimated annual consumption: ~220–250 kWh/year.";
      } else {
        recommendedType = "390L – 500L+ Multi-Door or Side-by-Side Inverter Frost-Free";
        specs = "Dual-fan independent evaporators, convertible multi-zone compartments, auto-ice maker, exterior digital controls";
        tradeOff = "Substantial floor footprint (requires 36+ inch clearance) and higher replacement spare parts costs.";
        budgetInsight = "Indicative market price: ₹45,000 – ₹75,000+. Estimated annual consumption: ~260–330 kWh/year.";
      }
    } else if (category === "air-conditioners") {
      if (householdSize === "1-2" && priority === "budget") {
        recommendedType = "1.0 Ton 3-Star Inverter Split AC (100% Copper)";
        specs = "Rated Cooling ~3,400W, 100% Grooved Copper Condenser, R32 Refrigerant, Anti-corrosive Blue Fin Coating";
        tradeOff = "Suited strictly for compact rooms (up to 110 sq. ft.). Higher power draw if exposed to direct top-floor sun.";
        budgetInsight = "Indicative market price: ₹28,000 – ₹32,000. Typical seasonal power consumption ~680–740 kWh.";
      } else if (householdSize === "1-2" || (usagePattern === "heavy" && priority === "savings")) {
        recommendedType = "1.0 Ton or 1.5 Ton 5-Star Dual Inverter Split AC";
        specs = "ISEER > 5.0, 100% Copper, Variable Speed Dual Rotary Compressor, 5-in-1 Convertible capacity modes";
        tradeOff = "Higher upfront purchase price, but delivers maximum efficiency for rooms operated 8+ hours daily.";
        budgetInsight = "Indicative market price: ₹38,000 – ₹45,000. Can save an estimated ₹2,000–₹2,800 per typical summer season.";
      } else if (householdSize === "3-4" && priority === "savings") {
        recommendedType = "1.5 Ton 5-Star Inverter Split AC with PM 2.5 Filter";
        specs = "Cooling Capacity ~5,100W, ISEER 5.1+, 100% Copper with Gold Fin corrosion guard, HD dust filter";
        tradeOff = "Higher initial investment; requires genuine annual jet-pump servicing to maintain peak 5-star efficiency.";
        budgetInsight = "Indicative market price: ₹42,000 – ₹48,000. Typical seasonal consumption: ~780–840 kWh.";
      } else if (householdSize === "3-4") {
        recommendedType = "1.5 Ton 3-Star Inverter Split AC (Value Sweet Spot)";
        specs = "Rated Cooling Capacity 5,000W–5,280W, 100% Copper Condenser, R32 Refrigerant, Stabilizer-free 145V–290V";
        tradeOff = "Slightly higher power draw during 45°C peak May heat, but lower upfront purchase cost.";
        budgetInsight = "Indicative market price: ₹33,000 – ₹37,500. Standard choice for 120–160 sq. ft. master bedrooms.";
      } else {
        recommendedType = "2.0 Ton 3-Star or 5-Star Heavy-Duty Inverter Split AC";
        specs = "Cooling Capacity ~6,200W+, High Ambient Cooling (tested to 52°C), 4-Way Swing, High Airflow CFM (>750)";
        tradeOff = "Requires 20A dedicated industrial MCB/switch and higher gauge copper piping (1/4\" and 5/8\").";
        budgetInsight = "Indicative market price: ₹50,000 – ₹62,000. Designed for spacious living rooms (200–260 sq. ft.).";
      }
    } else if (category === "washing-machines") {
      if (householdSize === "1-2" && priority === "budget") {
        recommendedType = "6.5 kg to 7.0 kg Semi-Automatic Twin Tub";
        specs = "Rust-proof polypropylene body, high-torque wash motor, spin shower rinse, rat-mesh base shield";
        tradeOff = "Requires manual transfer of wet garments between wash and spin tubs.";
        budgetInsight = "Indicative market price: ₹9,500 – ₹13,000. Forgiving of low or fluctuating tap water pressure.";
      } else if (householdSize === "1-2") {
        recommendedType = "6.5 kg 5-Star Top Load Fully Automatic";
        specs = "Smart Inverter Motor, Stainless Steel Drum, Soft-close tempered lid, quick wash cycle (15-20 min)";
        tradeOff = "Uses more water (80L–100L per full load) than front loaders, but offers convenient top access.";
        budgetInsight = "Indicative market price: ₹15,500 – ₹19,500. Compact 54cm footprint.";
      } else if (householdSize === "3-4" && (priority === "fabric-care" || priority === "savings")) {
        recommendedType = "7.5 kg or 8.0 kg 5-Star Front Load Fully Automatic";
        specs = "Inverter BLDC / Direct Drive Motor, In-Built Heater (60°C/90°C), 1,200+ RPM spin speed, Diamond drum";
        tradeOff = "Requires minimum 1.0 bar continuous tap water pressure and low-foam front-load Matic detergent.";
        budgetInsight = "Indicative market price: ₹30,000 – ₹42,000. Reduces water consumption by ~60% compared to top load.";
      } else if (householdSize === "3-4") {
        recommendedType = "7.5 kg 5-Star Top Load Fully Automatic with In-Built Heater";
        specs = "Pulsator wash technology, 3-temperature water heater, lint filter, child lock, delayed start";
        tradeOff = "Gentler on budget than front load, but slightly higher fabric wear on delicate silks.";
        budgetInsight = "Indicative market price: ₹20,000 – ₹26,000. Balanced convenience for regular family washing.";
      } else {
        recommendedType = "8.5 kg to 10.5 kg 5-Star Front Load with AI Direct Drive";
        specs = "Heavy-capacity wash drum, steam allergy care, 1,400 RPM spin, reinforced door gasket, anti-vibration body";
        tradeOff = "Heavy net weight (70+ kg); requires solid, vibration-free level flooring.";
        budgetInsight = "Indicative market price: ₹44,000 – ₹62,000. Handles double bed comforters and heavy laundry loads.";
      }
    } else if (category === "televisions") {
      if (householdSize === "1-2" && priority === "budget") {
        recommendedType = "32-inch or 43-inch Full HD LED Google TV";
        specs = "1080p Resolution, Dual HDMI, USB 2.0, 20W Stereo Sound, Chromecast built-in";
        tradeOff = "Standard dynamic range; best viewed from 4 to 6 feet in compact bedrooms.";
        budgetInsight = "Indicative market price: ₹12,000 – ₹20,000. High entertainment value per rupee.";
      } else if (householdSize === "1-2") {
        recommendedType = "43-inch 4K UHD LED Smart TV";
        specs = "3840x2160 4K HDR10, Quad-core processor, 2GB RAM / 16GB Storage, Dual-band Wi-Fi (5GHz)";
        tradeOff = "Standard refresh rate (60Hz); audio is adequate for bedrooms but modest for large halls.";
        budgetInsight = "Indicative market price: ₹24,000 – ₹31,000. Sharp clarity for streaming and OTT apps.";
      } else if (householdSize === "3-4" && priority === "savings") {
        recommendedType = "50-inch or 55-inch 4K UHD LED Google TV (Direct-Lit)";
        specs = "HDR10+, Dolby Audio 24W–30W, Google TV UI, Bluetooth 5.0, low standby power draw (<0.5W)";
        tradeOff = "Viewing angles past 45 degrees exhibit minor contrast drop on VA panels.";
        budgetInsight = "Indicative market price: ₹30,000 – ₹38,000. Ideal for family living rooms with 7–9 ft viewing distance.";
      } else if (householdSize === "3-4" || priority === "fabric-care") {
        recommendedType = "55-inch 4K QLED Google TV with Quantum Dot Panel";
        specs = "Wide Color Gamut (95%+ DCI-P3), Dolby Vision + Atmos, 120Hz DLG / VRR, HDMI 2.1 eARC port";
        tradeOff = "Premium pricing; requires paired soundbar or 2.1 system to match the cinematic video fidelity.";
        budgetInsight = "Indicative market price: ₹44,000 – ₹58,000. Superior color richness in sunlit rooms.";
      } else {
        recommendedType = "65-inch 4K QLED / OLED TV with Full Array Local Dimming";
        specs = "Deep contrast with local dimming zones, peak brightness >800 nits, Dolby Vision IQ, 2.1 ch 50W audio";
        tradeOff = "Requires spacious living room with at least 10–12 feet viewing distance.";
        budgetInsight = "Indicative market price: ₹68,000 – ₹1,20,000+. Ultimate theatre-grade home immersion.";
      }
    } else if (category === "water-purifiers") {
      if (householdSize === "1-2" && priority === "savings") {
        recommendedType = "UV + UF Active Water Purifier (For Municipal / Soft Water, TDS < 200 ppm)";
        specs = "Stainless Steel UV Disinfection Chamber, 0.01-micron UF Hollow Fiber, 7L Food-Grade Tank, Zero Wastewater";
        tradeOff = "Does not remove dissolved chemical salts if water supply transitions to hard borewell.";
        budgetInsight = "Indicative market price: ₹7,500 – ₹10,500. Annual filter upkeep: ₹1,200–₹1,800/yr (saves ~₹3,000/yr vs RO).";
      } else if (householdSize === "1-2") {
        recommendedType = "Compact RO + UV 6.5L Purifier with Mineralizer";
        specs = "75 GPD Membrane, Sediment & Pre-Carbon Cartridges, Copper/Zinc Infusion, Table-top or Wall-Mount";
        tradeOff = "Rejects ~50% wastewater; reject outlet pipe must be directed to bucket for household cleaning.";
        budgetInsight = "Indicative market price: ₹11,000 – ₹15,000. Certified for water sources up to 1,500 ppm TDS.";
      } else if (householdSize === "3-4" && priority === "savings") {
        recommendedType = "Multi-Stage UV + UF with External Sediment Pre-Filter (Municipal Water)";
        specs = "11-Watt High-Intensity UV Lamp, Anti-scale inline filter, 8L Storage, Food-grade BPA-Free cabinet";
        tradeOff = "Not suitable for ground/borewell water with high dissolved solids.";
        budgetInsight = "Indicative market price: ₹9,000 – ₹12,500. Economical running costs and zero reject water wastage.";
      } else if (householdSize === "3-4") {
        recommendedType = "RO + UV + UF with Active TDS Modulator & Mineral Cartridge";
        specs = "75 GPD Thin-Film Membrane, In-tank UV LED, Micro-filtration, Mineral infusion (Ca, Mg, Zn), 8L Tank";
        tradeOff = "Requires annual filter servicing and sediment cartridge replacement every 6–9 months.";
        budgetInsight = "Indicative market price: ₹14,000 – ₹20,000. The standard health safeguard for borewell/tanker water.";
      } else {
        recommendedType = "Heavy-Duty 80–100 GPD RO + UV + Alkaline Mineralizer with 10L+ Tank";
        specs = "High-flow booster pump, 100 GPD membrane, alkaline pH booster, auto-flush membrane cycle, 10L–12L tank";
        tradeOff = "Requires strong input tap pressure (0.5 to 2.0 bar) and larger kitchen wall space.";
        budgetInsight = "Indicative market price: ₹19,000 – ₹28,000. Built for joint families with high daily drinking water consumption.";
      }
    } else if (category === "microwave-ovens") {
      if (householdSize === "1-2" && priority === "budget") {
        recommendedType = "20L Solo Microwave Oven";
        specs = "700W–800W Microwave Power, Mechanical knobs or touch pad, 5 power levels, 30-minute timer";
        tradeOff = "Restricted strictly to reheating, thawing, and simple boiling; cannot bake, crisp, or grill.";
        budgetInsight = "Indicative market price: ₹5,000 – ₹7,200. Durable, low maintenance, and energy-efficient.";
      } else if (householdSize === "1-2") {
        recommendedType = "23L Grill Microwave Oven";
        specs = "800W Microwave + 1,000W Sheathed Quartz Grill, combination cooking modes, turntable glass tray";
        tradeOff = "Grills sandwiches and tikkas, but cannot bake cakes or rise dough (no convection blower).";
        budgetInsight = "Indicative market price: ₹7,500 – ₹9,800. Perfect for breakfast toast, kebabs, and reheating.";
      } else if (householdSize === "3-4" && priority === "savings") {
        recommendedType = "25L Convection Microwave Oven with Tactile Dials";
        specs = "900W Microwave + 1,200W Convection, temperature settings 110°C–200°C, stainless steel cavity";
        tradeOff = "Moderate cavity width; cannot fit large 10-inch rectangular baking trays.";
        budgetInsight = "Indicative market price: ₹9,800 – ₹13,000. Entry-level all-in-one baking and roasting.";
      } else if (householdSize === "3-4") {
        recommendedType = "28L Convection Microwave Oven with Ceramic Enamel Cavity";
        specs = "Ceramic Enamel interior (10-Yr warranty), 1,400W Convection Blower, Pre-heat mode, Auto Indian cook menus";
        tradeOff = "Requires dedicated 16A wall socket and minimum 4-inch rear/top ventilation clearance on kitchen slab.";
        budgetInsight = "Indicative market price: ₹12,500 – ₹17,500. The standard choice for family baking, grilling, and cooking.";
      } else {
        recommendedType = "32L Large-Cavity Convection Microwave Oven with Motorized Rotisserie";
        specs = "High-grade cavity, Tandoor / Fermentation modes, Slim Fry (air-fry feature), Drop-down door";
        tradeOff = "Takes up substantial counter space (approx. 21\" width x 20\" depth x 13\" height).";
        budgetInsight = "Indicative market price: ₹17,500 – ₹25,000. Ideal for party cooking, large cakes, and roast chicken.";
      }
    } else if (category === "geysers") {
      if (householdSize === "1-2" && priority === "budget") {
        recommendedType = "3L Instant Geyser (3kW, Stainless Steel Tank)";
        specs = "3kW High-Speed Copper Heating Element, 304L Grade Stainless Steel Tank, 6.5 Bar Pressure, Neon indicators";
        tradeOff = "Provides immediate hot water for 1–2 minutes; cannot support continuous long shower baths.";
        budgetInsight = "Indicative market price: ₹2,800 – ₹4,200. Best for kitchen dishwashing and quick bathroom handwash.";
      } else if (householdSize === "1-2") {
        recommendedType = "10L or 15L 5-Star Storage Geyser with Glass-Lined Tank";
        specs = "8-Bar High-Rise Pressure Rating, Incoloy 800 Element (2kW), Sacrificial Magnesium Anode, Thick PUF";
        tradeOff = "Requires 10–12 minutes initial warm-up; best suited for bucket baths or short shower.";
        budgetInsight = "Indicative market price: ₹5,800 – ₹7,800. Low standing heat loss and energy-efficient.";
      } else if (householdSize === "3-4" && priority === "savings") {
        recommendedType = "15L 5-Star Energy-Efficient Storage Geyser";
        specs = "BEE 5-Star Certified, Vitreous Enamel Coating, Multi-function safety valve, IPX4 splash-proof casing";
        tradeOff = "Requires short 8-minute reheating buffer between back-to-back family showers.";
        budgetInsight = "Indicative market price: ₹7,000 – ₹9,200. Optimized balance of low electricity bill and hot water volume.";
      } else if (householdSize === "3-4") {
        recommendedType = "25L 5-Star Glass-Lined Storage Geyser (Standard Family)";
        specs = "25L Capacity, Titanium Enamel Tank, Incoloy Element, 8-Bar Pressure, Whirlflow technology";
        tradeOff = "Heavy when full of water (approx. 38–42 kg); must be mounted on solid brick/concrete structural walls.";
        budgetInsight = "Indicative market price: ₹8,500 – ₹11,500. Continuous hot water for overhead rain showers.";
      } else {
        recommendedType = "35L to 50L Heavy-Duty Storage Geyser or Twin 25L Distributed Setup";
        specs = "Heavy-gauge tank, dual 2kW + 2kW heating elements, digital temperature display, anti-corrosion anode";
        tradeOff = "High electrical load (requires 16A/20A line) and requires structural wall anchor bolts.";
        budgetInsight = "Indicative market price: ₹14,000 – ₹22,000. Provides uninterrupted hot water for large joint families.";
      }
    } else if (category === "dishwashers") {
      // Dishwashers
      if (householdSize === "1-2" && priority === "budget") {
        recommendedType = "8 Place Settings Compact Tabletop Dishwasher";
        specs = "6 Wash Programs, 70°C Intensive Cycle, Built-in heater, Cutlery basket, connects to kitchen sink tap";
        tradeOff = "Cannot accommodate large 12-inch pressure cookers or deep traditional kadhais.";
        budgetInsight = "Indicative market price: ₹20,000 – ₹26,000. Fits on kitchen countertop; ideal for bachelors/couples.";
      } else if (householdSize === "1-2") {
        recommendedType = "12 Place Settings Free-Standing Dishwasher";
        specs = "Half-load option, Stainless Steel Tub, Eco 50°C wash, Quick 30-min cycle, Water Softening Chamber";
        tradeOff = "Requires dedicated 60cm floor space adjacent to kitchen sink drainage.";
        budgetInsight = "Indicative market price: ₹28,000 – ₹34,000. Handles regular daily pots, plates, and glasses.";
      } else if (householdSize === "3-4" && priority === "savings") {
        recommendedType = "13 Place Settings 4-Star Inverter Dishwasher (Eco-Optimized)";
        specs = "BLDC Inverter Wash Pump, Active Water Management (~10L/cycle), Intensive 70°C, Foldable racks";
        tradeOff = "Eco cycle runs for ~3 hours for maximum electrical and water savings.";
        budgetInsight = "Indicative market price: ₹33,000 – ₹39,000. Saves an estimated 15,000 liters of water annually.";
      } else if (householdSize === "3-4") {
        recommendedType = "14 Place Settings Free-Standing Dishwasher with Indian Kadhai Cycle";
        specs = "Intensive 70°C Oil & Masala Wash, Height-adjustable upper basket, Dosage Assist, Child Lock";
        tradeOff = "Requires branded dishwasher detergent, rinse aid, and softening salt for streak-free cleaning.";
        budgetInsight = "Indicative market price: ₹37,000 – ₹46,000. Thoroughly sanitizes oily Indian utensils and stainless steel cookware.";
      } else {
        recommendedType = "15 or 16 Place Settings 3-Rack Premium Dishwasher";
        specs = "3rd Rack for Indian Spoons/Ladles, Inverter Motor (10-Yr warranty), Turbo Drying system, Auto-door open";
        tradeOff = "Higher upfront equipment investment; requires 16A power socket and reliable tap water pressure.";
        budgetInsight = "Indicative market price: ₹48,000 – ₹65,000+. Uncompromised cleaning for large households and dinner parties.";
      }
    } else if (category === "led-lighting") {
      // LED Lighting
      if (householdSize === "1-2" && priority === "budget") {
        recommendedType = "Compact Apartment B22/E27 High-Efficacy LED Bulbs + Battens";
        specs = "9W–12W B22 Bulbs (105 lm/W, CRI > 80, 2.5kV surge) + 20W 4ft T5 Slim Batten (2,000 lm, 6500K/4000K)";
        tradeOff = "Surface and holder retrofit without concealed ceiling downlight aesthetics.";
        budgetInsight = "Indicative budget: ₹1,200 – ₹2,400 for complete flat. Replaces legacy CFLs/tubes, saving ~₹4,000 annually.";
      } else if (priority === "savings" || usagePattern === "heavy") {
        recommendedType = "Energy-Optimized 4000K Neutral White Recessed Downlights with High CRI";
        specs = "7W–12W Slim Round Panels, Efficacy >= 110 lm/W, CRI >= 85, Isolated 4kV Surge Driver, THD < 10%";
        tradeOff = "Requires false ceiling cavity clearance of at least 2.5–3.0 inches.";
        budgetInsight = "Indicative budget: ₹4,500 – ₹8,500. Optimal visual acuity for study, cooking, and screen work with zero eye strain.";
      } else if (householdSize === "3-4") {
        recommendedType = "Layered Ambient & Accent LED Downlight + Cove Strip Setup";
        specs = "Combination of 4000K Neutral White ambient downlights + 3000K Warm White indirect cove profile strip + IP65 bathroom/balcony fittings";
        tradeOff = "Requires dual-circuit wiring to control mood cove lighting and task downlights independently.";
        budgetInsight = "Indicative budget: ₹7,000 – ₹14,000 for full 3BHK flat. Balances architectural beauty with task clarity.";
      } else {
        recommendedType = "High-End Architectural COB Spots + Tri-Colour Tunable Panels + IP66 Outdoor Flood";
        specs = "Anti-glare deep baffle COB spotlights (CRI 90+, 36° beam) + 3-in-1 CCT tunable panels + 50W 5,000 lm IP66 perimeter floodlight";
        tradeOff = "Higher upfront fixture cost; requires precision ceiling positioning by interior electrical contractor.";
        budgetInsight = "Indicative budget: ₹15,000 – ₹35,000+. Delivers luxury villa lighting with durable exterior weatherproof security.";
      }
    } else if (category === "inverters-power-backup") {
      // Inverters & Power Backup
      if (householdSize === "1-2" && priority === "budget") {
        recommendedType = "900VA – 1100VA Pure Sine Wave Inverter + 150Ah Tall Tubular Battery";
        specs = "12V Single Battery Bus, 720W–880W Continuous Wattage, Low Voltage Charging (90V–290V), C20 Heavy Spine Tubular Plate";
        tradeOff = "Runs 3 fans + 4 lights + TV + Wi-Fi for 3.5–4.5 hours. Cannot run refrigerator.";
        budgetInsight = "Indicative market price: ₹19,000 – ₹23,500 (complete unit). Essential household backup with whisper-quiet BLDC fan operation.";
      } else if (householdSize === "3-4" && (priority === "savings" || usagePattern === "moderate")) {
        recommendedType = "1400VA – 1600VA Pure Sine Wave Inverter + 160Ah–180Ah Tall Tubular Battery";
        specs = "12V Bus, 1,120W Continuous Capacity, 300% starting surge tolerance for Inverter Refrigerator, Digital LCD Status Display";
        tradeOff = "Delivers 4–5 hours backup for 4 fans, lights, TV, and starts a single Inverter Refrigerator (~150W running).";
        budgetInsight = "Indicative market price: ₹26,000 – ₹32,000. Prevents summer milk/vegetable spoilage during prolonged rolling power cuts.";
      } else if (householdSize === "3-4" || priority === "durability") {
        recommendedType = "1800VA – 2000VA 24V Double-Battery Inverter + Twin 150Ah Batteries";
        specs = "24V Bus, ~1,440W–1,600W Continuous Load, High-efficiency toroidal transformer, THD < 3%, Dual 150Ah C20 Batteries";
        tradeOff = "Requires floor space for two heavy batteries (~120 kg combined).";
        budgetInsight = "Indicative market price: ₹33,000 – ₹42,000. Robust 6–8 hour backup for multiple rooms, refrigerator, and desert coolers.";
      } else {
        recommendedType = "2.5kVA to 3.5kVA (24V or 48V) Commercial/Villa Inverter OR 2.4kWh Wall-Mount LiFePO4";
        specs = "High-surge Pure Sine Wave, runs entire household or clinic, option for 2,500-cycle Lithium Iron Phosphate fast-recharge pack";
        tradeOff = "Higher upfront capital expenditure; requires dedicated ventilated electrical alcove.";
        budgetInsight = "Indicative market price: ₹48,000 – ₹85,000+. Uninterrupted whole-house power security for large families.";
      }
    } else if (category === "electric-vehicles") {
      // Electric Vehicles (EVs)
      if (householdSize === "1-2" && priority === "budget") {
        recommendedType = "High-Speed Commuter E-Scooter (2.5kWh – 3.0kWh LFP/NMC Battery)";
        specs = "Top speed 70–80 km/h, real-world range 75–90 km, IP67 battery & motor, 3.3kW home charger (4-hour recharge)";
        tradeOff = "Standard range suitable for daily city office trips (20–35 km); requires charging every 2 to 3 days.";
        budgetInsight = "Indicative on-road price: ₹95,000 – ₹1,20,000. Running cost ~₹0.28/km; saves ~₹25,000 annually over petrol scooters.";
      } else if (usagePattern === "heavy" || priority === "savings") {
        recommendedType = "Long-Range Premium E-Scooter (3.7kWh – 4.0kWh LFP Chemistry)";
        specs = "Real-world city range 110–135 km, peak motor 6kW, combined disc brakes, fast-charge support (0-80% in 90 mins)";
        tradeOff = "Higher initial price; requires dedicated ground-floor 16A industrial socket or portable battery removal.";
        budgetInsight = "Indicative on-road price: ₹1,25,000 – ₹1,55,000. Ideal for heavy 50+ km daily riders; delivers maximum fuel displacement.";
      } else if (householdSize === "3-4" && priority === "budget") {
        recommendedType = "Compact City Electric Hatchback (19kWh – 24kWh Battery Pack)";
        specs = "Real-world city range 170–210 km, automatic single-speed, 3.3kW AC home charging (7–8 hrs overnight), dual airbags, ABS";
        tradeOff = "Intercity highway trips require pre-planned CCS2 DC fast-charging stops.";
        budgetInsight = "Indicative ex-showroom price: ₹8,00,000 – ₹10,50,000. Running cost ~₹1.15/km vs ₹7.50/km for petrol cars.";
      } else {
        recommendedType = "Long-Range Family Electric SUV (35kWh – 50kWh+ LFP Battery)";
        specs = "Real-world range 300–400 km, CCS2 50kW DC Fast Charging (10-80% in 50 mins), liquid thermal cooling, 5-star crash safety";
        tradeOff = "Higher upfront investment; requires dedicated 3-phase or 7.2kW AC home charger connection.";
        budgetInsight = "Indicative ex-showroom price: ₹14,00,000 – ₹22,00,000+. Uncompromised primary family vehicle for city and interstate travel.";
      }
    } else if (category === "home-electrical-wiring") {
      // Home Electrical Wiring & Planning
      if (householdSize === "1-2" || priority === "budget") {
        recommendedType = "2BHK Complete Concealed FRLS-H Copper Wiring Overhaul";
        specs = "FRLS-H Copper Wires (1.0, 1.5, 2.5, 4.0 sq. mm), 8-Way Double Door DB, 30mA RCCB Shock Protection, 16A Shuttered Sockets";
        tradeOff = "Requires masonry chiseling and conduit laying before room plastering and painting.";
        budgetInsight = "Indicative material budget: ₹35,000 – ₹55,000 (wires, conduits, DB & modular switches). Eliminates electrical fire risks.";
      } else if (householdSize === "3-4" && priority === "savings") {
        recommendedType = "3BHK Multi-Circuit Distribution with Inverter Segregation";
        specs = "12-Way Double Door DB, independent 4.0 sq. mm circuits for 3 ACs & 2 Geysers, 30mA RCCB, chemical copper earthing pit (< 2 Ohms)";
        tradeOff = "Demands disciplined wire dressing and independent neutral wire routing for every heavy appliance.";
        budgetInsight = "Indicative material budget: ₹65,000 – ₹1,10,000. Eliminates voltage drops and prevents appliances from interfering with each other.";
      } else if (householdSize === "3-4") {
        recommendedType = "Contemporary 3BHK/4BHK Full Electrical Infrastructure with Type 2 SPD";
        specs = "Complete FRLS-H copper cabling, Type 2 Surge Protection Device (SPD) for inverter boards, dedicated EV charger conduit to parking";
        tradeOff = "Requires thorough Megger insulation testing before closing junction boxes.";
        budgetInsight = "Indicative material budget: ₹95,000 – ₹1,60,000. Protects high-value inverter appliances from monsoon lightning surges.";
      } else {
        recommendedType = "Three-Phase Villa / Multi-Floor Duplex Infrastructure with Twin Chemical Earthing";
        specs = "Three-Phase 4-pole DB with floor-wise sub-panels, phase balancing, 32A EV charger line, rooftop solar conduit, 2x chemical earth pits";
        tradeOff = "Requires an engineering load sanction of 7kW–15kW and certified electrical contractor oversight.";
        budgetInsight = "Indicative material budget: ₹1,80,000 – ₹3,20,000+. Future-proof foundation ready for central ACs, EV chargers, and solar power.";
      }
    } else {
      recommendedType = `${guide.name} Standard Baseline Model`;
      specs = "BEE Certified Energy Rating, Inverter Technology, Standard Indian Voltage Tolerance";
      tradeOff = "Baseline balance of energy efficiency and upfront cost.";
      budgetInsight = "Contact Consumer Point for verified model-specific pricing and warranty terms.";
    }

    setResult({
      categoryName: guide.name,
      categoryId: category,
      recommendedType,
      specs,
      worthPayingFor: guide.knowYourProduct.featuresWorthPayingFor.slice(0, 3),
      gimmicksToSkip: guide.knowYourProduct.gimmicksToSkip.slice(0, 3),
      budgetInsight,
      prePurchaseChecks: guide.buyingChecklist.spaceAndInstallationChecks.slice(0, 3),
      warrantyChecklist: guide.warrantyGuidance.criticalExclusions.slice(0, 3),
      tradeOff,
    });
  }

  const categoryOptions = [
    { id: "refrigerators", label: "Refrigerators" },
    { id: "air-conditioners", label: "Air Conditioners" },
    { id: "washing-machines", label: "Washing Machines" },
    { id: "televisions", label: "Televisions" },
    { id: "water-purifiers", label: "Water Purifiers" },
    { id: "microwave-ovens", label: "Microwave Ovens" },
    { id: "geysers", label: "Geysers" },
    { id: "dishwashers", label: "Dishwashers" },
    { id: "led-lighting", label: "LED Lighting" },
    { id: "inverters-power-backup", label: "Inverters & Backup" },
    { id: "electric-vehicles", label: "Electric Vehicles (EVs)" },
    { id: "home-electrical-wiring", label: "Home Electrical Planning" },
  ];

  return (
    <div className={`buying-assistant-card ${compact ? "assistant-compact" : ""}`} id="buying-assistant">
      <div className="assistant-header">
        <div className="assistant-badge">
          <Compass size={16} />
          PRE-PURCHASE DECISION ASSISTANT
        </div>
        <h2>Find the Right Appliance for Your Exact Needs</h2>
        <p className="assistant-subtitle">
          Don't buy based on retail sales pressure or flashy marketing. Tell us your household setup
          and get an independent specification profile.
        </p>
      </div>

      <div className="assistant-body">
        {/* Controls */}
        <div className="assistant-form-grid">
          <div className="assistant-field">
            <label htmlFor="assistant-category">Appliance Category</label>
            <select
              id="assistant-category"
              className="form-control"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setResult(null);
              }}
            >
              {categoryOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="assistant-field">
            <label htmlFor="assistant-family">Household Size / Space</label>
            <select
              id="assistant-family"
              className="form-control"
              value={householdSize}
              onChange={(e) => {
                setHouseholdSize(e.target.value);
                setResult(null);
              }}
            >
              <option value="1-2">1 to 2 Members (Compact / Bachelor / Couple)</option>
              <option value="3-4">3 to 4 Members (Standard Nuclear Family)</option>
              <option value="5+">5+ Members (Joint Family / Spacious Home)</option>
            </select>
          </div>

          <div className="assistant-field">
            <label htmlFor="assistant-usage">Daily Usage Pattern</label>
            <select
              id="assistant-usage"
              className="form-control"
              value={usagePattern}
              onChange={(e) => {
                setUsagePattern(e.target.value);
                setResult(null);
              }}
            >
              <option value="light">Light (Occasional / Few hours a day)</option>
              <option value="moderate">Moderate (Standard daily household usage)</option>
              <option value="heavy">Heavy (Continuous / High daily workload)</option>
            </select>
          </div>

          <div className="assistant-field">
            <label htmlFor="assistant-priority">Top Buying Priority</label>
            <select
              id="assistant-priority"
              className="form-control"
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
                setResult(null);
              }}
            >
              <option value="balance">Optimal Value & Durability (Recommended)</option>
              <option value="savings">Lowest Electricity & Running Bills</option>
              <option value="budget">Lowest Initial Purchase Price</option>
              <option value="fabric-care">Highest Performance & Premium Features</option>
            </select>
          </div>
        </div>

        <div className="assistant-action-row">
          <button
            type="button"
            className="button button-primary assistant-generate-btn"
            onClick={generateRecommendation}
          >
            <Sparkles size={17} />
            Generate Pre-Purchase Spec Sheet
          </button>
          {result && (
            <button
              type="button"
              className="button button-secondary"
              onClick={() => setResult(null)}
            >
              <RotateCcw size={16} />
              Reset
            </button>
          )}
        </div>

        {/* Structured Result Display */}
        {result && (
          <div className="assistant-result-box" role="region" aria-live="polite">
            <div className="result-header-banner">
              <span className="result-pill">
                <CheckCircle2 size={15} /> NEED-BASED SPECIFICATION SHEET
              </span>
              <h3>{result.recommendedType}</h3>
              <p className="result-lead-specs">
                <strong>Recommended Specs: </strong> {result.specs}
              </p>
            </div>

            <div className="result-grid-cols">
              {/* Features Worth Paying For */}
              <div className="result-col worth-it">
                <h4>
                  <CheckCircle2 size={17} className="text-emerald" /> Features Worth Paying For
                </h4>
                <ul>
                  {result.worthPayingFor.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Gimmicks to Avoid */}
              <div className="result-col avoid-it">
                <h4>
                  <XCircle size={17} className="text-rose" /> Features You Can Safely Skip
                </h4>
                <ul>
                  {result.gimmicksToSkip.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="result-tradeoff-bar">
              <div className="tradeoff-item">
                <strong>Budget & Price Insight: </strong> {result.budgetInsight}
              </div>
              <div className="tradeoff-item">
                <strong>Realistic Trade-off: </strong> {result.tradeOff}
              </div>
            </div>

            {/* Pre-purchase checks & warranty precautions */}
            <div className="result-checklists-grid">
              <div className="checklist-sub-box">
                <h5>
                  <SlidersHorizontal size={15} /> Pre-Purchase Installation Checks
                </h5>
                <ul>
                  {result.prePurchaseChecks.map((chk, i) => (
                    <li key={i}>{chk}</li>
                  ))}
                </ul>
              </div>
              <div className="checklist-sub-box">
                <h5>
                  <ShieldCheck size={15} /> Warranty Verification Rules
                </h5>
                <ul>
                  {result.warrantyChecklist.map((wr, i) => (
                    <li key={i}>{wr}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Advisory Notice */}
            <div className="assistant-advisory-bar">
              <ShieldCheck size={16} className="text-primary flex-shrink-0" />
              <span>
                <strong>Independent Advisory Notice:</strong> Specifications, price estimates, and energy consumption figures represent indicative market baselines under standard test conditions. Always cross-verify exact model specifications and official manufacturer warranty terms before retail purchase.
              </span>
            </div>

            {/* CTAs */}
            <div className="result-footer-ctas">
              <Link
                to={`/products?category=${result.categoryId}#guide-details`}
                className="button button-primary"
              >
                Read Full {result.categoryName} Buying Guide
                <ArrowRight size={16} />
              </Link>
              <a
                href={whatsappUrl(
                  "919810863934",
                  `Hello Consumer Point, I generated a pre-purchase guide for ${result.categoryName} (${result.recommendedType}). Can you advise me on recommended models and installation?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
              >
                <MessageCircle size={16} />
                Ask a Consumer Point Advisor on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
