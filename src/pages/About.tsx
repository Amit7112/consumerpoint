import { Link } from "react-router-dom";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  Lightbulb,
  Handshake,
  ArrowUpRight,
} from "lucide-react";
import { whyChooseServices } from "../data";
import {
  ArrowLink,
  FinalCTA,
  PageHero,
  Reveal,
  SectionHeading,
  SEO,
} from "../components/UI";

const values = [
  {
    title: "Trust",
    description: "Honest conversations and clearly agreed next steps.",
    icon: ShieldCheck,
  },
  {
    title: "Quality",
    description: "A considered approach to every product and service enquiry.",
    icon: Sparkles,
  },
  {
    title: "Convenience",
    description: "A simpler way to find the support you need.",
    icon: Handshake,
  },
  {
    title: "Continuous Improvement",
    description: "Listening, learning, and making the experience better.",
    icon: Lightbulb,
  },
  {
    title: "Customer Care",
    description:
      "Putting your everyday needs at the heart of the conversation.",
    icon: Heart,
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Meet Consumer Point, a customer-focused home appliance service network bringing professional repair, installation enquiries, and preventive maintenance together."
      />
      <PageHero
        eyebrow="About Us"
        title={
          <>
            Appliances are part of your life.
            <br />
            Good care should be, too.
          </>
        }
      >
        Consumer Point brings together home appliance repair, installation
        coordination, and preventive maintenance support with a simple focus: making your
        appliance ownership seamless.
      </PageHero>
      <section className="section">
        <div className="container editorial-grid">
          <Reveal className="editorial-copy">
            <p className="eyebrow">
              <span />
              WHO WE ARE
            </p>
            <h2>
              One point of contact.
              <br />A more considered experience.
            </h2>
            <p>
              Choosing an appliance is just the beginning. Understanding what
              fits your home, arranging a suitable setup, and knowing where to
              turn when something needs attention all matter.
            </p>
            <p>
              Consumer Point is a customer-focused home appliance service network
              connecting those needs. We welcome installation, repair,
              and maintenance enquiries, as well as conversations with brands
              and businesses about after-sales service coordination.
            </p>
            <p>
              We believe in listening first, communicating clearly, and agreeing
              on the details before moving forward.
            </p>
            <div style={{ marginTop: 24 }}>
              <ArrowLink to="/contact">
                Let's start with what you need
              </ArrowLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <img
              className="editorial-image"
              src="/images/kitchen.webp"
              alt="A bright, thoughtfully arranged contemporary home kitchen"
              width="1000"
              height="800"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>
      <section className="section values-section">
        <div className="container">
          <div className="mission-grid">
            <Reveal>
              <p className="eyebrow">
                <span />
                OUR MISSION
              </p>
              <h2>
                Simpler ownership.
                <br />
                More everyday convenience.
              </h2>
              <p>Make appliance ownership simpler and more convenient.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow">
                <span />
                OUR VISION
              </p>
              <h2>
                A name you can turn to.
                <br />
                For your home, and beyond.
              </h2>
              <p>Become the most trusted name in home appliance repair, maintenance, and service delivery.</p>
            </Reveal>
          </div>
          <Reveal>
            <SectionHeading
              eyebrow="WHAT GUIDES US"
              title="Good principles. Put into practice."
            />
          </Reveal>
          <div className="values-row">
            {values.map((value, index) => (
              <Reveal
                className="value-item"
                key={value.title}
                delay={index * 0.04}
              >
                <value.icon size={24} strokeWidth={1.6} />
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Section: Why Choose Consumer Point? (7 Core Services) */}
      <section className="section why-choose-complete" id="why-consumer-point">
        <div className="container">
          <Reveal>
            <div className="why-choose-header text-center">
              <p className="eyebrow">
                <span />
                OUR COMMITMENT TO YOU
              </p>
              <h2>Why Choose Consumer Point?</h2>
              <p className="section-description">
                Your Trusted Pre-Purchase Guidance &amp; Complete After-Sales Appliance Partner.
              </p>
            </div>
          </Reveal>

          <div className="why-choose-grid-3">
            {whyChooseServices.map((service, index) => {
              const IconComp = service.icon;
              return (
                <Reveal
                  className="why-card-complete"
                  key={service.id}
                  delay={index * 0.05}
                >
                  <div className="why-card-top">
                    <div className="why-card-icon-wrap">
                      <IconComp size={22} strokeWidth={1.8} />
                    </div>
                    <span className="why-card-step">0{service.stepNumber}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p className="why-card-short">{service.shortDesc}</p>
                  <p className="why-card-full">{service.fullDesc}</p>
                  <Link to={service.linkTo} className="why-card-link">
                    <span>{service.linkText}</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
