import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Info,
  ShieldCheck,
  ArrowRight,
  Check,
  Wind,
  Refrigerator,
  WashingMachine,
  Tv,
  Droplets,
  Microwave,
  Heater,
  UtensilsCrossed,
  Lightbulb,
  Zap,
  Car,
  Home,
} from "lucide-react";
import { applianceGuides } from "../data/applianceGuides";
import CategoryGuideView from "../components/CategoryGuideView";
import BuyingAssistant from "../components/BuyingAssistant";
import { FinalCTA, PageHero, Reveal, SEO } from "../components/UI";

const availableCategories = [
  { id: "refrigerators", name: "Refrigerators", icon: Refrigerator, desc: "Single, Double Door, Side-by-Side & Inverters" },
  { id: "air-conditioners", name: "Air Conditioners", icon: Wind, desc: "Split, Window, 100% Copper & Dual Inverters" },
  { id: "washing-machines", name: "Washing Machines", icon: WashingMachine, desc: "Front Load, Top Load, Inverters & In-built Heaters" },
  { id: "televisions", name: "Televisions", icon: Tv, desc: "4K LED, QLED, OLED & Viewing Distances" },
  { id: "water-purifiers", name: "Water Purifiers", icon: Droplets, desc: "RO vs UV vs UF & TDS Water Testing" },
  { id: "microwave-ovens", name: "Microwave Ovens", icon: Microwave, desc: "Solo, Grill, Convection & Cavity Capacities" },
  { id: "geysers", name: "Geysers & Heaters", icon: Heater, desc: "Instant, Storage, Glass-Lined & 8-Bar Tanks" },
  { id: "dishwashers", name: "Dishwashers", icon: UtensilsCrossed, desc: "13-14 Place Settings, 70°C Intensive & Water Softeners" },
  { id: "led-lighting", name: "LED Lighting", icon: Lightbulb, desc: "Lumens, CCT Warm/Cool White, High CRI & 4kV Surge Drivers" },
  { id: "inverters-power-backup", name: "Inverters & Power Backup", icon: Zap, desc: "Pure Sine Wave, VA to Watt Sizing & Tubular/Lithium Batteries" },
  { id: "electric-vehicles", name: "Electric Vehicles (EVs)", icon: Car, desc: "E-Scooters, City EVs, Real-world Range & 16A Home Charging" },
  { id: "home-electrical-wiring", name: "Home Electrical Wiring", icon: Home, desc: "Concealed Conduits, Wire Gauges, DB RCCB Protection & Point Planning" },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState<string>(
    categoryParam && applianceGuides[categoryParam] ? categoryParam : "refrigerators"
  );

  useEffect(() => {
    if (categoryParam && applianceGuides[categoryParam]) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  function handleSelectCategory(catId: string) {
    setActiveCategory(catId);
    setSearchParams({ category: catId });
    const el = document.getElementById("guide-details");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  const currentGuide = applianceGuides[activeCategory] || applianceGuides["refrigerators"];

  return (
    <>
      <SEO
        title="Appliance Buying Guides & Pre-Purchase Advice | Consumer Point"
        description="Don't just buy an appliance. Buy the right appliance. Explore independent buying guides, technology comparisons, pre-purchase checklists, and verified warranty terms across all major appliances."
      />

      <PageHero
        eyebrow="Consumer Pre-Purchase Guidance Hub"
        title={
          <>
            Don't Just Buy an Appliance.
            <br />
            Buy the Right Appliance.
          </>
        }
      >
        Consumer Point is your independent pre-purchase guide partner. We help you understand appliance
        technologies, verify room and electrical requirements, decode manufacturer warranties, and select
        the exact specifications suited to your family before you spend a single rupee.
      </PageHero>

      {/* Category Selection Carousel / Grid */}
      <section className="section category-hub-section">
        <div className="container">
          <Reveal>
            <div className="section-head-center">
              <p className="eyebrow">
                <span />
                EXPLORE BY APPLIANCE CATEGORY
              </p>
              <h2>Select an Appliance to View its Complete Buying Guide</h2>
              <p className="subtext">
                Every category includes 4 mandatory sections: Know Your Product, Pre-Purchase Checklist,
                Interactive Recommendation Assistant, and Know Your Warranty.
              </p>
            </div>

            <div className="category-selection-grid">
              {availableCategories.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`cat-card-btn ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelectCategory(cat.id)}
                    aria-pressed={isSelected}
                  >
                    <div className="cat-card-top">
                      <div className="cat-icon-wrap">
                        <IconComponent size={22} strokeWidth={1.8} />
                      </div>
                      <span className={`cat-card-badge ${isSelected ? "selected" : ""}`}>
                        {isSelected ? "Active Guide" : "Guide"}
                      </span>
                    </div>
                    <div className="cat-card-body">
                      <h3>{cat.name}</h3>
                      <p>{cat.desc}</p>
                    </div>
                    <div className="cat-card-footer">
                      <span className="cat-footer-text">
                        {isSelected ? "Currently Viewing" : "View Buying Guide"}
                      </span>
                      {isSelected ? (
                        <Check size={14} className="cat-footer-arrow" />
                      ) : (
                        <ArrowRight size={14} className="cat-footer-arrow" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive Buying Assistant Feature */}
      <section className="section assistant-feature-section" id="interactive-assistant">
        <div className="container">
          <Reveal>
            <BuyingAssistant initialCategory={activeCategory} compact={false} />
          </Reveal>
        </div>
      </section>

      {/* The 4-Section Comprehensive Buying Guide View */}
      <section className="section active-guide-section">
        <div className="container">
          <Reveal>
            <CategoryGuideView guide={currentGuide} />
          </Reveal>
        </div>
      </section>

      {/* Dedicated Warranty Highlight Strip */}
      <section className="section warranty-callout-strip">
        <div className="container">
          <Reveal className="warranty-strip-inner">
            <div className="warranty-strip-text">
              <span className="strip-badge">
                <ShieldCheck size={16} /> CENTRAL WARRANTY KNOWLEDGE HUB
              </span>
              <h2>Confused by Inverter PCB or Compressor Warranty Clauses?</h2>
              <p>
                Visit our dedicated Warranty Education Center to understand manufacturer terms,
                authorized installation rules, and how to verify your coverage before signing the receipt.
              </p>
            </div>
            <Link to="/warranty-guide" className="button button-primary strip-btn">
              Explore Central Warranty Center
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="container">
        <div className="notice catalog-notice" style={{ marginTop: "30px", marginBottom: "30px" }}>
          <Info size={19} />
          <p>
            Consumer Point is an independent consumer guidance and after-sales service network. Product
            specifications and warranty structures are compiled from official manufacturer documentation
            and industry standards. Always verify specific model details against the printed manufacturer
            brochure and warranty certificate before purchase.
          </p>
        </div>
      </div>

      <FinalCTA />
    </>
  );
}
