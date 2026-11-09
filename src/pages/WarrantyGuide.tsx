import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  FileText,
  CheckCircle2,
  ArrowRight,
  Info,
  Clock,
  MessageCircle,
} from "lucide-react";
import { applianceGuides } from "../data/applianceGuides";
import { FinalCTA, PageHero, Reveal, SEO } from "../components/UI";
import { whatsappUrl } from "../config";

export default function WarrantyGuide() {
  const [selectedCat, setSelectedCat] = useState("refrigerators");
  const guide = applianceGuides[selectedCat] || applianceGuides["refrigerators"];

  const categoriesList = [
    { id: "refrigerators", name: "Refrigerators" },
    { id: "air-conditioners", name: "Air Conditioners" },
    { id: "washing-machines", name: "Washing Machines" },
    { id: "televisions", name: "Televisions" },
    { id: "water-purifiers", name: "Water Purifiers" },
    { id: "microwave-ovens", name: "Microwave Ovens" },
    { id: "geysers", name: "Geysers" },
    { id: "dishwashers", name: "Dishwashers" },
    { id: "led-lighting", name: "LED Lighting" },
    { id: "inverters-power-backup", name: "Inverters & Power Backup" },
    { id: "electric-vehicles", name: "Electric Vehicles (EVs)" },
    { id: "home-electrical-wiring", name: "Home Electrical Wiring" },
  ];

  return (
    <>
      <SEO
        title="Know Your Warranty | Appliance Warranty Guide & Verification"
        description="Decode home appliance warranties before purchasing. Learn the truth about compressor warranties, inverter PCB coverage, manufacturer vs third-party protection, and claim requirements."
      />

      <PageHero
        eyebrow="Consumer Protection & Knowledge"
        title={
          <>
            Know Your Warranty.
            <br />
            Before You Invest.
          </>
        }
      >
        A 10-year compressor sticker does not mean 10 years of free repairs. Understand what is
        actually protected, what voids a warranty, and how to verify your coverage before payment.
      </PageHero>

      {/* Educational Foundation */}
      <section className="section warranty-foundations">
        <div className="container">
          <Reveal>
            <div className="warranty-grid-3">
              <div className="warranty-card">
                <div className="warranty-icon-wrap primary">
                  <ShieldCheck size={26} />
                </div>
                <h3>1. Comprehensive Warranty</h3>
                <p>
                  Covers all mechanical, electrical, and cooling components for a fixed initial period
                  (typically 1 or 2 years). Plastic accessories, light bulbs, and physical cracks are
                  always excluded.
                </p>
                <span className="warranty-pill green">Standard: 1–2 Years</span>
              </div>

              <div className="warranty-card">
                <div className="warranty-icon-wrap warning">
                  <Shield size={26} />
                </div>
                <h3>2. Component Warranty</h3>
                <p>
                  Applies ONLY to a single major mechanical component (Compressor, Inverter Motor, or
                  Magnetron). It does NOT cover the circuit board (PCB), refrigerant gas recharge, or
                  technician visit fees after Year 1.
                </p>
                <span className="warranty-pill amber">Part-Only Coverage: 5–10 Years</span>
              </div>

              <div className="warranty-card">
                <div className="warranty-icon-wrap info">
                  <FileText size={26} />
                </div>
                <h3>3. Extended Warranty vs Consumer Point AMC</h3>
                <p>
                  <strong>Manufacturer Warranty:</strong> Handled by official OEM brand service centers.
                  <br />
                  <strong>Consumer Point AMC:</strong> Independent preventive maintenance contracts providing scheduled deep cleaning, priority local technician dispatch, and diagnostic accountability across Prayagraj, Bhadohi, Kaushambi, and Jaunpur.
                </p>
                <span className="warranty-pill blue">Clear Distinction</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Category Specific Deep Dive */}
      <section className="section warranty-deep-dive">
        <div className="container">
          <Reveal>
            <div className="section-head-center">
              <p className="eyebrow">
                <span />
                CATEGORY-BY-CATEGORY BREAKDOWN
              </p>
              <h2>Select an Appliance to Inspect True Warranty Terms</h2>
              <p className="subtext">
                Terms compiled from major manufacturer standards across India (LG, Samsung, Daikin,
                Whirlpool, IFB, Voltas, Havells, etc.). Always verify against the specific model's
                printed warranty card.
              </p>
            </div>

            {/* Category Selector Tabs */}
            <div className="category-pill-selector">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`pill-btn ${selectedCat === cat.id ? "active" : ""}`}
                  onClick={() => setSelectedCat(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Active Category Warranty Details */}
            <div className="warranty-detail-panel">
              <div className="warranty-panel-header">
                <h3>{guide.name} — Detailed Warranty Terms & Reality Check</h3>
                <span className="warranty-verified-badge">
                  <CheckCircle2 size={16} /> Verified Guidance
                </span>
              </div>

              <div className="warranty-terms-grid">
                <div className="term-block">
                  <h4>
                    <Clock size={18} className="text-primary" /> Comprehensive Coverage
                  </h4>
                  <p>{guide.warrantyGuidance.standardComprehensive}</p>
                </div>

                <div className="term-block">
                  <h4>
                    <Shield size={18} className="text-amber" /> Key Component Warranty
                  </h4>
                  <p>{guide.warrantyGuidance.keyComponentWarranty}</p>
                </div>

                <div className="term-block highlight-pcb">
                  <h4>
                    <ShieldAlert size={18} className="text-rose" /> The PCB & Electronics Truth
                  </h4>
                  <p>{guide.warrantyGuidance.pcbCoverageTruth}</p>
                </div>

                <div className="term-block">
                  <h4>
                    <Info size={18} className="text-blue" /> Labour & Spare Parts After Year 1
                  </h4>
                  <p>{guide.warrantyGuidance.labourAndSpares}</p>
                </div>
              </div>

              {/* Exclusions Warning Box */}
              <div className="warranty-exclusions-box">
                <h4>
                  <AlertTriangle size={20} className="text-amber" /> What Voids the Warranty? (Critical Exclusions)
                </h4>
                <ul>
                  {guide.warrantyGuidance.criticalExclusions.map((exc, idx) => (
                    <li key={idx}>
                      <span className="exclusion-bullet">&times;</span>
                      {exc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Claim Checklist */}
              <div className="warranty-claim-box">
                <h4>
                  <FileText size={20} className="text-emerald" /> Required Documents for Official Warranty Claims
                </h4>
                <div className="claim-items-grid">
                  {guide.warrantyGuidance.claimRequirements.map((req, idx) => (
                    <div className="claim-item" key={idx}>
                      <CheckCircle2 size={16} />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
                <div className="extended-advice-note">
                  <strong>Consumer Point Recommendation: </strong>
                  {guide.warrantyGuidance.extendedWarrantyAdvice}
                </div>
              </div>

              <div className="warranty-panel-cta">
                <Link
                  to={`/products?category=${selectedCat}#guide-details`}
                  className="button button-primary"
                >
                  Explore Complete {guide.name} Buying Guide
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={whatsappUrl(
                    "919810863934",
                    `Hello Consumer Point, I have a warranty question regarding ${guide.name}. Can you advise me?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-secondary"
                >
                  <MessageCircle size={16} />
                  Ask a Warranty Question on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Consumer Rights Checklist */}
      <section className="section warranty-rights-section">
        <div className="container">
          <Reveal className="rights-content-box">
            <h2>3 Golden Rules Before Signing the Delivery Receipt</h2>
            <div className="rights-steps-grid">
              <div className="step-card">
                <span className="step-num">01</span>
                <h3>Check the Outer Carton</h3>
                <p>
                  Never accept an appliance carton with deep forklift punctures, water stains, or torn seals.
                  Inspect the box condition in front of the delivery agent.
                </p>
              </div>
              <div className="step-card">
                <span className="step-num">02</span>
                <h3>Verify Serial Numbers</h3>
                <p>
                  Check that the serial number printed on your GST Tax Invoice exactly matches the barcode
                  sticker on the back of the appliance and the warranty booklet.
                </p>
              </div>
              <div className="step-card">
                <span className="step-num">03</span>
                <h3>Official Installation Only</h3>
                <p>
                  Wait for the brand-authorized or certified technician. Never unbox or power on air
                  conditioners or front-load washing machines yourself; doing so can instantly void transit
                  damage claims.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
