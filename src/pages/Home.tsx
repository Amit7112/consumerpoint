import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Quote, Settings2, ShieldCheck, Star, Wrench } from "lucide-react";
import { coreServices, advantages, processSteps } from "../data";
import {
  ArrowLink,
  ButtonLink,
  FAQ,
  FinalCTA,
  Reveal,
  SectionHeading,
  SEO,
} from "../components/UI";
import { ProductGrid } from "../components/Products";

const homeReviews = [
  {
    name: "Rahul Sharma",
    service: "Air Conditioners",
    rating: 5,
    quote:
      "Prompt AC servicing before summer peak. Technician was on time, cleaned both units, and checked pressure thoroughly.",
    initials: "RS",
    avatarBg: "#eff6ff",
    avatarColor: "#0284c7",
  },
  {
    name: "Priya Venkatesh",
    service: "Washing Machines",
    rating: 5,
    quote:
      "Repaired our front-load washing machine drum issue with authentic parts. Clear diagnosis and fair pricing.",
    initials: "PV",
    avatarBg: "#f0fdf4",
    avatarColor: "#16a34a",
  },
  {
    name: "Aniket Kulkarni",
    service: "AMC Maintenance",
    rating: 5,
    quote:
      "Enrolled in Comprehensive AMC. Scheduled quarterly checks are super smooth and give total peace of mind.",
    initials: "AK",
    avatarBg: "#faf5ff",
    avatarColor: "#9333ea",
  },
];

export default function Home() {
  const reduced = useReducedMotion();
  return (
    <>
      <SEO
        title="Home Appliance Sales, Service & Installation"
        description="A better experience for every home. Explore Consumer Point home appliances, repair enquiries, AC installation, preventive maintenance, and business partnerships."
      />
      <section className="hero">
        <motion.img
          className="hero-image"
          src="/images/hero-appliances.webp"
          alt="Refrigerator, washing machine, television, and air conditioner in a refined modern home"
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
              YOUR HOME. OUR PRIORITY.
            </p>
            <p className="hero-brand">
              Consumer Point<span>.</span>
            </p>
            <h1>
              A better experience
              <br />
              for <span>every home.</span>
            </h1>
            <p className="hero-description">
              Your trusted destination for home-appliance sales,
              <br className="desktop-break" /> professional installation, and
              dependable service support.
            </p>
            <div className="button-group">
              <ButtonLink to="/services">Explore Our Services</ButtonLink>
              <ButtonLink to="/partnerships" secondary light>
                Partner With Us
              </ButtonLink>
            </div>
          </motion.div>
        </div>
        <div className="hero-bottom-line" />
      </section>

      <section className="section core-services">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="ONE PARTNER. COMPLETE CARE."
              title={
                <>
                  Everything your appliances need,
                  <br className="desktop-break" /> in one place.
                </>
              }
              center
            >
              From finding the right fit to keeping it running. We're here for
              all of it.
            </SectionHeading>
          </Reveal>
          <div className="service-grid">
            {coreServices.map((service, index) => (
              <Reveal delay={index * 0.07} key={service.title}>
                <Link to={service.path} className="service-card">
                  <div className="service-card-top">
                    <span className="service-icon">
                      <service.icon size={25} strokeWidth={1.65} />
                    </span>
                    <span className="service-number">{service.number}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="text-link">
                    Learn more
                    <ArrowUpRight size={17} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <Reveal className="section-heading-row">
            <SectionHeading
              eyebrow="GOOD CHOICES. BETTER EVERYDAYS."
              title={
                <>
                  Find the right appliances
                  <br className="desktop-break" /> for your home.
                </>
              }
            >
              Every room. Every routine. Something that fits just right.
            </SectionHeading>
            <ArrowLink to="/products">Explore all products</ArrowLink>
          </Reveal>
          <ProductGrid />
          <p className="section-footnote">
            Product images are illustrative. Models, specifications, pricing,
            and availability are confirmed on enquiry.
          </p>
        </div>
      </section>

      <section className="section why-section">
        <div className="container why-layout">
          <Reveal>
            <SectionHeading
              eyebrow="THE CONSUMER POINT APPROACH"
              title={
                <>
                  Built around your needs.
                  <br />
                  Focused on your experience.
                </>
              }
            >
              Good service is more than a repair. It's feeling heard, knowing
              what to expect, and having a clear next step.
            </SectionHeading>
            <ArrowLink to="/about">Get to know Consumer Point</ArrowLink>
          </Reveal>
          <div className="advantages-grid">
            {advantages.map((item, index) => (
              <Reveal
                className="advantage"
                key={item.title}
                delay={index * 0.035}
              >
                <item.icon size={25} strokeWidth={1.6} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="SIMPLE FROM THE START"
              title="A few steps. A lot less hassle."
              center
            >
              From your first enquiry to the service you agree on.
            </SectionHeading>
          </Reveal>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <Reveal
                className="process-step"
                key={step.title}
                delay={index * 0.08}
              >
                <span className="step-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-quick-services">
        <div className="container">
          <Reveal className="quick-services-inner">
            <div className="quick-services-header">
              <p className="eyebrow">
                <span />
                OUR SERVICES
              </p>
              <h2>Dependable Appliance Services.</h2>
              <p className="quick-services-sub">
                Fast doorstep repair, professional installation, and routine maintenance for all your home appliances.
              </p>
            </div>

            <div className="quick-services-grid">
              <div className="quick-service-item">
                <div className="quick-service-icon">
                  <Wrench size={22} strokeWidth={1.75} />
                </div>
                <h3>Repair & Diagnostics</h3>
                <p>
                  Accurate fault finding and reliable repair for ACs, refrigerators, washing machines, and appliances.
                </p>
              </div>

              <div className="quick-service-item">
                <div className="quick-service-icon">
                  <Settings2 size={22} strokeWidth={1.75} />
                </div>
                <h3>Installation & Setup</h3>
                <p>
                  Certified wall-mounting, safe electrical hookup, and complete verification for new appliances.
                </p>
              </div>

              <div className="quick-service-item">
                <div className="quick-service-icon">
                  <ShieldCheck size={22} strokeWidth={1.75} />
                </div>
                <h3>Preventive Maintenance & AMC</h3>
                <p>
                  Thorough cleaning, inspection, and Annual Maintenance Contracts to ensure efficiency and prolong equipment life.
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
                  Verified Service Ratings
                </span>
              </div>
              <p className="eyebrow">REAL PEOPLE. REAL EXPERIENCES.</p>
              <h2>Your trust is our starting point.</h2>
              <p className="home-feedback-sub">
                From prompt emergency repairs to meticulous installations and maintenance,
                see how we help homes stay comfortable everyday.
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
              <ButtonLink to="/feedback">Read All Customer Reviews & Give Feedback</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQ />
      <FinalCTA />
    </>
  );
}
