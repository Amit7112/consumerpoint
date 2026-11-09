import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Quote,
  Settings2,
  ShieldCheck,
  Star,
  Wrench,
  Compass,
  Sparkles,
  Zap,
  SlidersHorizontal,
  ShieldAlert,
  Wind,
  Refrigerator,
  WashingMachine,
  Tv,
  Droplets,
  Microwave,
  Heater,
  UtensilsCrossed,
  Lightbulb,
  Car,
  Home as HomeIcon,
} from "lucide-react";
import {
  ArrowLink,
  ButtonLink,
  FAQ,
  FinalCTA,
  Reveal,
  SectionHeading,
  SEO,
} from "../components/UI";
import PinCodeChecker from "../components/PinCodeChecker";
import BuyingAssistant from "../components/BuyingAssistant";
import { whyChooseServices } from "../data";

const homeReviews = [
  {
    name: "Ritesh Pandey",
    service: "Air Conditioners",
    rating: 5,
    quote:
      "Consumer Point guided me on 1.5 Ton vs 2.0 Ton sizing for my top-floor bedroom. Saved me from buying an oversized AC, and the technician installation was flawless.",
    initials: "RP",
    avatarBg: "#eff6ff",
    avatarColor: "#0284c7",
  },
  {
    name: "Amit Shukla",
    service: "Washing Machines",
    rating: 5,
    quote:
      "Learned the difference between front load water pressure needs and top load convenience from their guide. Booked installation support and couldn't be happier.",
    initials: "AS",
    avatarBg: "#f0fdf4",
    avatarColor: "#16a34a",
  },
  {
    name: "Anurag Jha",
    service: "AMC Maintenance",
    rating: 5,
    quote:
      "Enrolled in Comprehensive AMC. Knowing their technicians prioritize genuine parts and transparent diagnostics gives total peace of mind.",
    initials: "AJ",
    avatarBg: "#faf5ff",
    avatarColor: "#9333ea",
  },
];

const homeCategories = [
  { id: "refrigerators", name: "Refrigerators", icon: Refrigerator, short: "Frost Free, Inverter & Capacities" },
  { id: "air-conditioners", name: "Air Conditioners", icon: Wind, short: "100% Copper, Inverter & Sizing" },
  { id: "washing-machines", name: "Washing Machines", icon: WashingMachine, short: "Front Load, Top Load & BLDC Motors" },
  { id: "televisions", name: "Televisions", icon: Tv, short: "4K LED, QLED, OLED & Viewing Distance" },
  { id: "water-purifiers", name: "Water Purifiers", icon: Droplets, short: "TDS Testing, RO vs UV vs UF" },
  { id: "microwave-ovens", name: "Microwave Ovens", icon: Microwave, short: "Solo, Grill, Convection & Cavities" },
  { id: "geysers", name: "Geysers", icon: Heater, short: "Instant, Storage & 8-Bar Tanks" },
  { id: "dishwashers", name: "Dishwashers", icon: UtensilsCrossed, short: "13-14 Place Settings & 70°C Kadhai Wash" },
  { id: "led-lighting", name: "LED Lighting", icon: Lightbulb, short: "Lumens, CCT & 4kV Surge Drivers" },
  { id: "inverters-power-backup", name: "Inverters & Backup", icon: Zap, short: "Pure Sine Wave & Tubular/Lithium" },
  { id: "electric-vehicles", name: "Electric Vehicles (EVs)", icon: Car, short: "E-Scooters, City EVs & Home 16A" },
  { id: "home-electrical-wiring", name: "Home Electrical Planning", icon: HomeIcon, short: "Conduits, Gauges, DB & Point Planning" },
];

const brandDifferentiators = [
  {
    icon: Compass,
    title: "1. Consumer-First Buying Guidance",
    desc: "Independent, transparent advice. We never push a product merely because it is expensive, heavily advertised, or offers high dealer commissions.",
  },
  {
    icon: Zap,
    title: "2. Technology & Engineering Clarity",
    desc: "Demystifying inverter compressors, dual rotary chambers, BLDC motors, direct cool vs frost-free, and OLED vs QLED so you understand what you are paying for.",
  },
  {
    icon: SlidersHorizontal,
    title: "3. Practical Pre-Purchase Checklists",
    desc: "Preventing costly mistakes: measuring doorway widths, verifying 16A earthing sockets, testing tap water pressure, and checking wall load strength before delivery.",
  },
  {
    icon: Sparkles,
    title: "4. Need-Based Product Recommendations",
    desc: "Tailored specification sheets shaped around your family size, room environment, and realistic usage rather than speculative marketing hype.",
  },
  {
    icon: ShieldAlert,
    title: "5. Real Warranty Transparency",
    desc: "Unmasking the truth behind 10-year compressor badges: what happens to the inverter PCB, labour fees after Year 1, and critical warranty exclusions.",
  },
  {
    icon: Wrench,
    title: "6. Complete Lifecycle & After-Sales Care",
    desc: "From pre-purchase advice to certified doorstep installation, emergency breakdown repairs, and long-term preventive AMC maintenance.",
  },
];

export default function Home() {
  const reduced = useReducedMotion();
  return (
    <>
      <SEO
        title="Consumer Point | Your Pre-Purchase Appliance Guide Partner"
        description="Don't just buy an appliance. Buy the right appliance. Consumer Point helps you understand technologies, compare specifications, verify warranties, and choose the right home appliances — with professional installation and service support."
      />

      {/* Hero Section */}
      <section className="hero">
        <motion.img
          className="hero-image"
          src="/images/hero-appliances.webp"
          alt="Modern home appliances including refrigerator, air conditioner, and washing machine"
          width="1600"
          height="900"
          fetchPriority="high"
          initial={{ scale: reduced ? 1 : 1.055 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
        <div className="hero-shade" />
        <div className="container hero-inner">
          <motion.div
            className="hero-copy"
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="hero-eyebrow">
              <span />
              YOUR PRE-PURCHASE APPLIANCE GUIDE PARTNER
            </p>
            <p className="hero-brand">
              Consumer Point<span>.</span>
            </p>
            <h1>
              Don't Just Buy an Appliance.
              <br />
              Buy the <span>Right Appliance.</span>
            </h1>
            <p className="hero-description">
              Understand appliance technologies before you invest, learn what to inspect before buying,
              decode manufacturer warranty terms, and choose the right specifications for your home —
              backed by professional doorstep installation and after-sales care.
            </p>
            <div className="button-group">
              <ButtonLink to="/products">Explore Buying Guides</ButtonLink>
              <ButtonLink to="/products#interactive-assistant" secondary light>
                Find the Right Appliance
              </ButtonLink>
            </div>
          </motion.div>
        </div>
        <div className="hero-bottom-line" />
      </section>

      {/* 6 Core Pre-Purchase Pillars */}
      <section className="section core-services">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="BEFORE YOU SPEND A SINGLE RUPEE"
              title={
                <>
                  How Consumer Point Helps You
                  <br className="desktop-break" /> Make the Smarter Decision.
                </>
              }
              center
            >
              Most consumers regret an appliance purchase due to poor sizing, unexpected power bills, or
              disputed warranty claims. Here is how we ensure you get it right the first time.
            </SectionHeading>
          </Reveal>

          <div className="pillars-grid-6">
            <div className="pillar-item-card">
              <span className="pillar-num">01</span>
              <h3>Understand Technologies</h3>
              <p>Compare Inverter vs Dual Inverter, BLDC motors, 100% copper coils, and display panels without confusing marketing jargon.</p>
            </div>
            <div className="pillar-item-card">
              <span className="pillar-num">02</span>
              <h3>Pre-Purchase Checklists</h3>
              <p>Verify door clearance widths, 16A earthing points, overhead water pressure, and wall strength before placing an order.</p>
            </div>
            <div className="pillar-item-card">
              <span className="pillar-num">03</span>
              <h3>Evaluate True Running Costs</h3>
              <p>Calculate realistic annual electricity consumption across BEE star ratings rather than assuming high star ratings always save money.</p>
            </div>
            <div className="pillar-item-card">
              <span className="pillar-num">04</span>
              <h3>Need-Based Recommendations</h3>
              <p>Specification profiles shaped strictly around your household size and daily usage — never pushed for sales commission.</p>
            </div>
            <div className="pillar-item-card">
              <span className="pillar-num">05</span>
              <h3>Decode True Warranty Terms</h3>
              <p>Understand the difference between 10-year motor promises and 1-year PCB reality, plus exclusions that void your protection.</p>
            </div>
            <div className="pillar-item-card">
              <span className="pillar-num">06</span>
              <h3>After-Sales Installation &amp; Care</h3>
              <p>Seamless transition from purchase decision to verified doorstep installation, diagnostic repairs, and preventive AMC support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Buying Assistant Feature */}
      <section className="section home-assistant-section">
        <div className="container">
          <Reveal>
            <BuyingAssistant compact={false} />
          </Reveal>
        </div>
      </section>

      {/* Browse By Appliance Category */}
      <section className="section products-section">
        <div className="container">
          <Reveal className="section-heading-row">
            <SectionHeading
              eyebrow="APPLIANCE BUYING GUIDES"
              title={
                <>
                  Comprehensive Pre-Purchase Guides
                  <br className="desktop-break" /> for Every Household Appliance.
                </>
              }
            >
              Select any category to inspect variants, technical specifications, buying checklists, and verified warranty conditions.
            </SectionHeading>
            <ArrowLink to="/products">View All Buying Guides</ArrowLink>
          </Reveal>

          <div className="home-category-grid">
            {homeCategories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Reveal delay={idx * 0.04} key={cat.id}>
                  <Link
                    to={`/products?category=${cat.id}#guide-details`}
                    className="home-cat-card"
                  >
                    <div className="home-cat-top">
                      <div className="home-cat-icon">
                        <IconComp size={24} strokeWidth={1.8} />
                      </div>
                      <span className="home-cat-badge">Buying Guide</span>
                    </div>
                    <div className="home-cat-body">
                      <h3>{cat.name}</h3>
                      <p>{cat.short}</p>
                    </div>
                    <div className="home-cat-action">
                      <span>Explore Guide</span>
                      <ArrowUpRight size={15} />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE CONSUMER POINT? */}
      <section className="section why-consumer-point-section">
        <div className="container">
          <Reveal>
            <div className="differentiation-header">
              <p className="eyebrow">
                <span />
                WHY CHOOSE CONSUMER POINT?
              </p>
              <h2>"Your Money. Your Choice. Our Guidance."</h2>
              <p className="differentiation-sub">
                Consumer Point is not just another appliance sales or service website. We are your
                pre-purchase guidance partner — committed to helping you understand your options,
                protect your hard-earned money, and maintain peace of mind for years to come.
              </p>
            </div>

            <div className="differentiators-grid">
              {brandDifferentiators.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div className="diff-card" key={idx}>
                    <div className="diff-icon-wrap">
                      <Icon size={24} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="differentiation-footer-quote">
              <p>
                "We don't manufacture appliances. We don't push slow-moving inventory. Our only incentive
                is ensuring that when an appliance enters your home, it serves your family reliably."
              </p>
              <div className="diff-actions">
                <ButtonLink to="/products">Browse All Buying Guides</ButtonLink>
                <ButtonLink to="/warranty-guide" secondary light>
                  Explore Warranty Center
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Compact 7 Customer-Support Services Overview */}
      <section className="section why-home-compact" id="why-consumer-point-compact">
        <div className="container">
          <Reveal>
            <div className="text-center section-heading">
              <p className="eyebrow">
                <span />
                COMPLETE SUPPORT LIFECYCLE
              </p>
              <h2>Why Consumer Point?</h2>
              <p className="section-description">
                Seven dedicated customer services designed to help you make informed decisions before buying, and ensure hassle-free ownership for years after.
              </p>
            </div>
          </Reveal>

          <div className="why-compact-grid-7">
            {whyChooseServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Reveal className="why-compact-card" key={service.id} delay={idx * 0.04}>
                  <div className="why-compact-icon">
                    <Icon size={20} />
                  </div>
                  <div className="why-compact-body">
                    <span className="why-compact-num">0{service.stepNumber}</span>
                    <h3>{service.title}</h3>
                    <p>{service.shortDesc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="why-compact-cta text-center">
            <ButtonLink to="/about#why-consumer-point">
              Explore Full 7-Point Advisory on About Us
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* After-Sales Care & Support Section */}
      <section className="home-quick-services">
        <div className="container">
          <Reveal className="quick-services-inner">
            <div className="quick-services-header">
              <p className="eyebrow">
                <span />
                BEYOND THE PURCHASE
              </p>
              <h2>Installation, Repair &amp; Annual Maintenance Support</h2>
              <p className="quick-services-sub">
                Once you make the right choice, our certified network delivers professional setup, genuine spare parts, and long-term maintenance.
              </p>
            </div>

            <div className="quick-services-grid">
              <div className="quick-service-item">
                <div className="quick-service-icon">
                  <Settings2 size={22} strokeWidth={1.75} />
                </div>
                <h3>Installation &amp; Setup</h3>
                <p>
                  Certified wall-mounting, safe 16A electrical connections, water inlet plumbing, and comprehensive operational checks.
                </p>
              </div>

              <div className="quick-service-item">
                <div className="quick-service-icon">
                  <Wrench size={22} strokeWidth={1.75} />
                </div>
                <h3>Doorstep Repair &amp; Diagnostics</h3>
                <p>
                  Accurate fault finding with genuine brand-compatible replacement parts and transparent diagnostic accountability.
                </p>
              </div>

              <div className="quick-service-item">
                <div className="quick-service-icon">
                  <ShieldCheck size={22} strokeWidth={1.75} />
                </div>
                <h3>Preventive Maintenance &amp; AMC</h3>
                <p>
                  Seasonal AC jet servicing, washing machine descaling, and Annual Maintenance Contracts for complete peace of mind.
                </p>
              </div>
            </div>

            <div className="quick-services-action">
              <ButtonLink to="/services">View All Services</ButtonLink>
              <ButtonLink to="/amc-maintenance" secondary light>
                Explore AMC Plans
              </ButtonLink>
              <ButtonLink to="/services#service-request" secondary light>
                Request a Service
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Service Availability Checker */}
      <section className="section home-pincode-section" id="check-service-availability">
        <div className="container">
          <Reveal>
            <PinCodeChecker showDirectory={false} compact={true} />
            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <Link
                to="/service-locations#location-directory"
                className="text-link"
                style={{ justifyContent: "center", fontSize: "14px", fontWeight: 600 }}
              >
                Browse complete directory of 430+ locations &amp; post offices across Prayagraj, Bhadohi, Kaushambi &amp; Jaunpur
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Customer Trust & Reviews */}
      <section className="testimonial-section">
        <div className="container">
          <Reveal>
            <div className="home-feedback-header">
              <div className="home-rating-badge">
                <div className="home-star-row">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={15} className="star-gold" fill="#f59e0b" strokeWidth={0} />
                  ))}
                </div>
                <span className="home-score-num">4.9 / 5.0</span>
                <span className="home-rating-divider" />
                <span className="home-score-text">
                  <span className="verified-live-dot" />
                  Verified Consumer Experiences
                </span>
              </div>
              <p className="eyebrow">HONEST GUIDANCE. TRUSTED SERVICE.</p>
              <h2>Guidance you can rely on. Service you can trust.</h2>
              <p className="home-feedback-sub">
                See how Consumer Point helps families avoid purchasing blunders, select optimal appliances, and enjoy dependable doorstep care.
              </p>
            </div>

            <div className="home-testimonials-grid">
              {homeReviews.map((item) => (
                <div className="home-test-card" key={item.name}>
                  <div className="test-card-top">
                    <div className="star-row">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={15} className="star-gold" fill="#f59e0b" strokeWidth={0} />
                      ))}
                    </div>
                    <Quote size={20} className="test-card-quote-icon" />
                  </div>
                  <p className="test-quote">"{item.quote}"</p>
                  <div className="test-author-row">
                    <div
                      className="test-avatar"
                      style={{ background: item.avatarBg, color: item.avatarColor }}
                    >
                      {item.initials}
                    </div>
                    <div className="test-author-info">
                      <div className="test-author-name">
                        {item.name}
                        <CheckCircle2 size={13} className="test-verified-icon" />
                      </div>
                      <span className="test-service-pill">{item.service}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="home-feedback-cta">
              <ButtonLink to="/feedback">Read All Customer Reviews &amp; Share Feedback</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQ />
      <FinalCTA />
    </>
  );
}
