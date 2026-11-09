import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  FileCheck2,
  Layers,
  ArrowRight,
  MessageCircle,
  TrendingDown,
  Wrench,
  Sparkles,
} from "lucide-react";
import { type CategoryGuide } from "../data/applianceGuides";
import BuyingAssistant from "./BuyingAssistant";
import RoomElectricalPlanner from "./RoomElectricalPlanner";
import { whatsappUrl } from "../config";

export default function CategoryGuideView({ guide }: { guide: CategoryGuide }) {
  const [activeTab, setActiveTab] = useState<"product" | "checklist" | "recommend" | "warranty">("product");

  return (
    <div className="category-guide-container" id="guide-details">
      {/* Category Header */}
      <div className="category-guide-hero">
        <div className="category-guide-badge">
          <Compass size={16} />
          INDEPENDENT PRE-PURCHASE GUIDE
        </div>
        <h1>{guide.name} Buying Guide &amp; Technical Analysis</h1>
        <p className="category-guide-tagline">{guide.tagline}</p>
        <p className="category-guide-sub">{guide.shortDesc}</p>
      </div>

      {/* 4 Mandatory Sections Nav Tabs */}
      <nav className="guide-sections-nav" aria-label="Buying guide sections">
        <button
          type="button"
          className={`guide-nav-tab ${activeTab === "product" ? "active" : ""}`}
          onClick={() => setActiveTab("product")}
        >
          <Layers size={17} />
          <span>1. Know Your Product</span>
        </button>
        <button
          type="button"
          className={`guide-nav-tab ${activeTab === "checklist" ? "active" : ""}`}
          onClick={() => setActiveTab("checklist")}
        >
          <SlidersHorizontal size={17} />
          <span>2. Pre-Purchase Checklist</span>
        </button>
        <button
          type="button"
          className={`guide-nav-tab ${activeTab === "recommend" ? "active" : ""}`}
          onClick={() => setActiveTab("recommend")}
        >
          <Sparkles size={17} />
          <span>3. Find What's Right</span>
        </button>
        <button
          type="button"
          className={`guide-nav-tab ${activeTab === "warranty" ? "active" : ""}`}
          onClick={() => setActiveTab("warranty")}
        >
          <ShieldCheck size={17} />
          <span>4. Know Your Warranty</span>
        </button>
      </nav>

      {/* =========================================================================
          SECTION A: KNOW YOUR PRODUCT
         ========================================================================= */}
      {activeTab === "product" && (
        <section className="guide-tab-content section-know-product">
          <div className="section-intro-block">
            <span className="section-number-pill">SECTION 1 OF 4</span>
            <h2>Types, Variants, Technologies &amp; Real Benefits</h2>
            <p>
              Compare the physical formats, core engineering technologies, and practical benefits
              so you don't pay for features that sound impressive in brochures but offer zero everyday value.
            </p>
          </div>

          {/* Types and Variants Comparison */}
          <div className="guide-card-block">
            <h3>Major Types &amp; Formats</h3>
            <div className="types-grid">
              {guide.knowYourProduct.types.map((t, idx) => (
                <div className="type-card" key={idx}>
                  <div className="type-header">
                    <h4>{t.type}</h4>
                    <span className="type-capacity-pill">{t.capacity}</span>
                  </div>
                  <p className="type-best-for">
                    <strong>Best for: </strong> {t.bestFor}
                  </p>
                  <div className="type-pros-cons">
                    <div className="pros">
                      <p className="heading">
                        <CheckCircle2 size={15} /> Advantages
                      </p>
                      <ul>
                        {t.pros.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="cons">
                      <p className="heading">
                        <XCircle size={15} /> Considerations &amp; Drawbacks
                      </p>
                      <ul>
                        {t.cons.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technologies Explained */}
          <div className="guide-card-block">
            <h3>Key Technologies Explained (Without Marketing Jargon)</h3>
            <div className="technologies-grid">
              {guide.knowYourProduct.technologies.map((tech, idx) => (
                <div className="tech-card" key={idx}>
                  <div className="tech-badge">
                    <Zap size={15} /> ENGINEERING DETAIL
                  </div>
                  <h4>{tech.tech}</h4>
                  <div className="tech-row">
                    <strong>How It Works: </strong>
                    <p>{tech.howItWorks}</p>
                  </div>
                  <div className="tech-row benefit">
                    <strong>Real Daily Benefit: </strong>
                    <p>{tech.realBenefit}</p>
                  </div>
                  <div className="tech-row caution">
                    <strong>What to Watch Out For: </strong>
                    <p>{tech.caution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Specifications Table */}
          <div className="guide-card-block">
            <h3>Key Technical Specifications to Compare</h3>
            <div className="specs-table-wrap">
              <table className="specs-table">
                <thead>
                  <tr>
                    <th>Specification</th>
                    <th>Why It Matters to You</th>
                    <th>Recommended Standard to Buy</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.knowYourProduct.keySpecifications.map((s, idx) => (
                    <tr key={idx}>
                      <td className="spec-name">{s.spec}</td>
                      <td>{s.importance}</td>
                      <td className="spec-rec">{s.recommendedStandard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Worth It vs Skip It Grid */}
          <div className="worth-skip-grid">
            <div className="features-worth-it">
              <h4>
                <CheckCircle2 size={20} className="text-emerald" /> Features Worth Paying Extra For
              </h4>
              <ul>
                {guide.knowYourProduct.featuresWorthPayingFor.map((f, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="gimmicks-to-skip">
              <h4>
                <XCircle size={20} className="text-rose" /> Marketing Gimmicks You Can Safely Skip
              </h4>
              <ul>
                {guide.knowYourProduct.gimmicksToSkip.map((g, i) => (
                  <li key={i}>
                    <XCircle size={16} />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Common Misconceptions */}
          <div className="guide-card-block misconceptions-block">
            <h3>Common Buying Misconceptions &amp; Myths</h3>
            <div className="misconceptions-grid">
              {guide.knowYourProduct.commonMisconceptions.map((m, idx) => (
                <div className="misconception-card" key={idx}>
                  <div className="myth-box">
                    <span className="label">THE MYTH:</span>
                    <p>"{m.myth}"</p>
                  </div>
                  <div className="reality-box">
                    <span className="label">THE REALITY:</span>
                    <p>{m.reality}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="guide-tab-footer-action">
            <button
              type="button"
              className="button button-primary"
              onClick={() => setActiveTab("checklist")}
            >
              Next: View Pre-Purchase Checklist
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION B: IMPORTANT THINGS TO CHECK BEFORE BUYING
         ========================================================================= */}
      {activeTab === "checklist" && (
        <section className="guide-tab-content section-buying-checklist">
          <div className="section-intro-block">
            <span className="section-number-pill">SECTION 2 OF 4</span>
            <h2>Pre-Purchase Checklist &amp; Environmental Readiness</h2>
            <p>
              An appliance might be fantastic in the showroom, but if it doesn't fit through your
              doorway, overloads your electrical socket, or lacks adequate tap pressure, you face costly returns.
            </p>
          </div>

          {/* Sizing Matrix */}
          <div className="guide-card-block">
            <h3>1. Household Size &amp; Capacity Matrix</h3>
            <div className="sizing-matrix-grid">
              {guide.buyingChecklist.householdSizing.map((sz, idx) => (
                <div className="sizing-card" key={idx}>
                  <span className="family-size-badge">{sz.familySize}</span>
                  <h4>{sz.capacity}</h4>
                  <p>{sz.guidance}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Space & Pre-requisite Checks */}
          <div className="guide-card-block">
            <h3>2. Space, Electrical &amp; Plumbing Pre-requisites</h3>
            <div className="checks-list-boxed">
              {guide.buyingChecklist.spaceAndInstallationChecks.map((chk, idx) => (
                <div className="check-item-row" key={idx}>
                  <div className="check-icon">
                    <CheckCircle2 size={18} />
                  </div>
                  <p>{chk}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Room-Wise Electrical Point Planner (For Electrical Wiring Category) */}
          {guide.id === "home-electrical-wiring" && (
            <div className="guide-card-block planner-card-block">
              <RoomElectricalPlanner />
            </div>
          )}

          {/* Running Costs and BEE Star Impact */}
          <div className="guide-card-block energy-insights-card">
            <h3>3. Energy Consumption &amp; Running Costs (The Real Math)</h3>
            <div className="energy-grid-cols">
              <div className="energy-col">
                <span className="col-badge">STAR RATING INSIGHT</span>
                <p>{guide.buyingChecklist.energyAndRunningCosts.starRatingImpact}</p>
              </div>
              <div className="energy-col">
                <span className="col-badge">OPERATIONAL TIP</span>
                <p>{guide.buyingChecklist.energyAndRunningCosts.runningCostTip}</p>
              </div>
              <div className="energy-col highlight">
                <span className="col-badge">ESTIMATED ANNUAL SAVINGS</span>
                <p>{guide.buyingChecklist.energyAndRunningCosts.estimatedAnnualSavings}</p>
              </div>
            </div>
          </div>

          {/* Long Term Ownership & Spares Costs */}
          <div className="guide-card-block">
            <h3>4. Long-Term Ownership &amp; Maintenance Costs</h3>
            <p className="subtext">
              Always factor in the periodic consumable replacements and typical out-of-warranty repairs:
            </p>
            <div className="spares-cost-list">
              {guide.buyingChecklist.longTermOwnershipCosts.map((cst, idx) => (
                <div className="spare-cost-row" key={idx}>
                  <TrendingDown size={17} className="text-amber" />
                  <span>{cst}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="guide-tab-footer-action">
            <button
              type="button"
              className="button button-primary"
              onClick={() => setActiveTab("recommend")}
            >
              Next: Find What's Right For You
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION C: FIND WHAT'S RIGHT FOR YOU (INTERACTIVE ASSISTANT)
         ========================================================================= */}
      {activeTab === "recommend" && (
        <section className="guide-tab-content section-recommendation">
          <div className="section-intro-block">
            <span className="section-number-pill">SECTION 3 OF 4</span>
            <h2>Find What's Right For You</h2>
            <p>
              Use our interactive diagnostic assistant to generate a tailored specification profile.
              We prioritize value and durability over high price tags.
            </p>
          </div>

          <BuyingAssistant initialCategory={guide.id} compact={false} />

          {/* Pre-calibrated Scenarios */}
          <div className="guide-card-block" style={{ marginTop: "40px" }}>
            <h3>Popular Need-Based Profiles for {guide.name}</h3>
            <div className="profiles-grid">
              {guide.recommendationProfiles.map((p, idx) => (
                <div className="profile-card" key={idx}>
                  <div className="profile-top">
                    <span className="profile-tag">{p.scenario}</span>
                    <h4>{p.recommendedType}</h4>
                  </div>
                  <div className="profile-detail">
                    <strong>Specs: </strong> {p.recommendedSpecs}
                  </div>
                  <div className="profile-detail">
                    <strong>Why this fit: </strong> {p.whyThisFit}
                  </div>
                  <div className="profile-detail tradeoff">
                    <strong>Trade-off to accept: </strong> {p.tradeOff}
                  </div>
                  <div className="profile-budget">
                    <strong>Target Budget: </strong> {p.budgetBracket}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="guide-tab-footer-action">
            <button
              type="button"
              className="button button-primary"
              onClick={() => setActiveTab("warranty")}
            >
              Next: Inspect True Warranty Terms
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION D: KNOW YOUR WARRANTY
         ========================================================================= */}
      {activeTab === "warranty" && (
        <section className="guide-tab-content section-know-warranty">
          <div className="section-intro-block">
            <span className="section-number-pill">SECTION 4 OF 4</span>
            <h2>Know Your Warranty Before You Pay</h2>
            <p>
              Manufacturer marketing loves promoting 10-year warranty badges. Here is the realistic
              breakdown of what is genuinely covered, what is excluded, and what documents you need.
            </p>
          </div>

          <div className="warranty-terms-grid">
            <div className="term-block">
              <h4>Standard Comprehensive Warranty</h4>
              <p>{guide.warrantyGuidance.standardComprehensive}</p>
            </div>
            <div className="term-block">
              <h4>Key Component Warranty</h4>
              <p>{guide.warrantyGuidance.keyComponentWarranty}</p>
            </div>
            <div className="term-block highlight-pcb">
              <h4>The PCB &amp; Electronic Board Reality</h4>
              <p>{guide.warrantyGuidance.pcbCoverageTruth}</p>
            </div>
            <div className="term-block">
              <h4>Labour &amp; Gas Refill After Year 1</h4>
              <p>{guide.warrantyGuidance.labourAndSpares}</p>
            </div>
          </div>

          {/* Exclusions Warning Box */}
          <div className="warranty-exclusions-box" style={{ marginTop: "32px" }}>
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
          <div className="warranty-claim-box" style={{ marginTop: "24px" }}>
            <h4>
              <FileCheck2 size={20} className="text-emerald" /> Required Documents for Official Warranty Claims
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
              <strong>Consumer Point Advice: </strong>
              {guide.warrantyGuidance.extendedWarrantyAdvice}
            </div>
          </div>

          {/* Warranty Distinction Callout */}
          <div className="warranty-distinction-strip">
            <ShieldCheck size={20} className="text-primary flex-shrink-0" />
            <div style={{ flex: 1 }}>
              <strong>Understanding Warranty Layers: </strong> Manufacturer warranty is provided strictly by the OEM brand. Consumer Point provides independent advisory guidance, professional doorstep installation, and Annual Maintenance Contracts (AMC) across Prayagraj, Bhadohi, Kaushambi, and Jaunpur.
            </div>
            <Link to="/warranty-guide" className="button button-secondary" style={{ whiteSpace: "nowrap" }}>
              Full Warranty Guide
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Action Row */}
          <div className="warranty-footer-actions">
            <a
              href={whatsappUrl(
                "919810863934",
                `Hello Consumer Point, I am evaluating ${guide.name} and have questions about model specifications and warranty. Please guide me.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              <MessageCircle size={16} />
              Consult Consumer Point on WhatsApp Before Buying
            </a>
            <Link to="/services#service-request" className="button button-secondary">
              <Wrench size={16} />
              Book Installation or Inspection Support
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
