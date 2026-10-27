import {
  ShieldCheck,
  Wrench,
  Users,
  CalendarCheck,
  Headphones,
  FileBarChart,
  MapPin,
  Info,
  Handshake,
} from "lucide-react";
import { ButtonLink, Reveal, SectionHeading, SEO } from "../components/UI";
import EnquiryForm from "../components/EnquiryForm";
import { useBusiness } from "../config";

const capabilities = [
  {
    icon: ShieldCheck,
    name: "Authorized or approved service partnerships",
    text: "Structured representation and authorized service coordination, subject to mutual commercial agreement.",
  },
  {
    icon: Wrench,
    name: "Appliance installation & service coordination",
    text: "Smooth field coordination for newly sold appliances, product setups, and on-demand customer repairs.",
  },
  {
    icon: Users,
    name: "Technician network development",
    text: "Expand verified, trained technician and electrician availability across agreed metropolitan and regional territories.",
  },
  {
    icon: CalendarCheck,
    name: "Annual Maintenance Contract (AMC) coordination",
    text: "Partner-branded or coordinated preventive maintenance contracts and recurring scheduled service management.",
  },
  {
    icon: Headphones,
    name: "After-sales service support",
    text: "Dependable post-purchase service care, escalation management, and customer satisfaction monitoring.",
  },
  {
    icon: FileBarChart,
    name: "Service reporting & operational coordination",
    text: "Transparent digital reporting, turn-around time (TAT) metrics, and structured SLA documentation.",
  },
  {
    icon: MapPin,
    name: "Regional & multi-location collaborations",
    text: "Multi-city coverage models tailored to your distributor clusters, dealership branches, and corporate facilities.",
  },
];

export const partnerBrands = [
  "Samsung",
  "Bajaj",
  "Lloyd",
  "Sony",
  "LG",
  "Voltas",
  "Whirlpool",
  "Daikin",
  "Godrej",
  "Haier",
  "Panasonic",
  "Havells",
  "Blue Star",
  "IFB",
  "Bosch",
  "Philips",
  "Carrier",
  "Hitachi",
];

export default function Partnerships() {
  const business = useBusiness();
  return (
    <>
      <SEO
        title="Appliance Brand & Business Partnerships"
        description="Grow your service network with Consumer Point. We partner with appliance brands, manufacturers, distributors, dealers, and service organizations."
      />
      <section className="partnership-hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">
              <span />
              B2B SERVICE COLLABORATION
            </p>
            <p className="b2b-brand">Consumer Point for Enterprise & Brands.</p>
            <h1>
              Grow Your Service Network
              <br />
              <span>with Consumer Point.</span>
            </h1>
            <p>
              We partner with appliance brands, manufacturers, distributors, dealers,
              and service organizations to coordinate installation, maintenance, and
              after-sales service operations. Let's build a stronger service network together.
            </p>
            <ButtonLink to="/partnerships#partnership-enquiry">
              Discuss a Partnership
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="brand-collaborations-section" aria-label="Brand and Enterprise Collaborations">
        <div className="container">
          <p className="brand-marquee-title">
            BRANDS & ENTERPRISE COLLABORATIONS
          </p>
        </div>
        <div className="brand-marquee-wrapper" aria-label="Brand partners marquee">
          <div className="brand-marquee-track">
            {[...partnerBrands, ...partnerBrands].map((brand, idx) => (
              <div key={idx} className="brand-marquee-pill">
                <span className="brand-pill-dot" />
                <span className="brand-pill-name">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="COLLABORATION OPPORTUNITIES"
              title="Let's Explore a Business Partnership."
            >
              Tailored after-sales infrastructure for brands, distributors, and retailers.
              We start by understanding your scope, territories, and service expectations.
            </SectionHeading>
          </Reveal>
          <div className="capability-grid">
            {capabilities.map((item, index) => (
              <Reveal
                className="capability-item"
                key={item.name}
                delay={index * 0.04}
              >
                <item.icon size={26} strokeWidth={1.6} />
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="notice" style={{ marginTop: 37 }}>
            <Info size={19} />
            <p>
              Proposed capabilities are not claims of a confirmed operational
              network, authorised brand relationship, service territory,
              staffing capacity, or service-level commitment. All
              responsibilities and capabilities require assessment and a written
              agreement.
            </p>
          </div>
        </div>
      </section>
      <section className="section form-section" id="partnership-enquiry">
        <div className="container form-layout">
          <Reveal className="form-intro">
            <p className="eyebrow">
              <span />
              LET'S BUILD SOMETHING USEFUL
            </p>
            <h2>
              A better partnership
              <br />
              starts here.
            </h2>
            <p>
              Share your business, required territories, and expected monthly
              volumes. These details help establish whether the proposed scope
              and operating requirements are a suitable fit.
            </p>
            <div className="form-help">
              <Handshake size={24} />
              <div>
                <h3>Built on mutual clarity.</h3>
                <p>
                  Territories, expected volumes, escalation processes,
                  reporting, commercial terms, and responsibilities are
                  discussed before any commitment.
                </p>
              </div>
            </div>
            <div className="form-help">
              <Info size={22} />
              <div>
                <h3>Business contact</h3>
                <p>
                  {business.email ? (
                    <a href={`mailto:${business.email}`}>{business.email}</a>
                  ) : (
                    "Verified business email to be provided. Please use the secure enquiry form."
                  )}
                </p>
              </div>
            </div>
          </Reveal>
          <EnquiryForm kind="partnership" />
        </div>
      </section>
    </>
  );
}
