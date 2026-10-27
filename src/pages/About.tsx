import {
  Heart,
  ShieldCheck,
  Sparkles,
  Lightbulb,
  Handshake,
} from "lucide-react";
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
        description="Meet Consumer Point, a customer-focused home-appliance business bringing sales, installation enquiries, service support, and maintenance together."
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
        Consumer Point brings together home-appliance sales, installation
        coordination, and service support with a simple focus: making your
        experience easier.
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
              Consumer Point is a customer-focused home-appliance business
              connecting those needs. We welcome product, installation, repair,
              and maintenance enquiries, as well as conversations with brands
              and businesses about after-sales coordination.
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
              <p>Become a trusted name in home-appliance sales and services.</p>
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
      <FinalCTA />
    </>
  );
}
