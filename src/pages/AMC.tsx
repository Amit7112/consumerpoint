import { Info, ShieldCheck, CheckCircle2, Clock, Wrench } from "lucide-react";
import { amcPlans } from "../data";
import { ButtonLink, CheckList, PageHero, Reveal, SEO } from "../components/UI";
import EnquiryForm from "../components/EnquiryForm";

export default function AMC() {
  return (
    <>
      <SEO
        title="AMC & Preventive Appliance Maintenance"
        description="Explore Essential, Comprehensive, and Business appliance maintenance proposal options. Request a tailored annual maintenance contract from Consumer Point."
      />
      <PageHero
        eyebrow="AMC & Maintenance"
        title={
          <>
            A little care today.
            <br />A smoother tomorrow.
          </>
        }
      >
        Explore preventive maintenance options for your home or business. Every
        proposal is shaped around your appliances, location, and agreed
        requirements.
      </PageHero>

      <section className="amc-highlights-section">
        <div className="container">
          <div className="amc-highlights-grid">
            <div className="amc-highlight-item">
              <span className="amc-highlight-icon">
                <CheckCircle2 size={20} />
              </span>
              <div>
                <h4>Preventive Diagnostics</h4>
                <p>Quarterly deep checks to spot wear before breakdown occurs.</p>
              </div>
            </div>
            <div className="amc-highlight-item">
              <span className="amc-highlight-icon">
                <Clock size={20} />
              </span>
              <div>
                <h4>Priority Response</h4>
                <p>Fast-track technician dispatch when you face unexpected faults.</p>
              </div>
            </div>
            <div className="amc-highlight-item">
              <span className="amc-highlight-icon">
                <Wrench size={20} />
              </span>
              <div>
                <h4>Genuine Parts Support</h4>
                <p>Authentic brand components with clear diagnostic accountability.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="amc-grid">
            {amcPlans.map((plan, index) => (
              <Reveal
                key={plan.id}
                delay={index * 0.08}
                className={`amc-plan ${plan.popular ? "amc-plan-popular" : ""}`}
              >
                {plan.popular && (
                  <span className="amc-popular-badge">RECOMMENDED CHOICE</span>
                )}
                <p className="eyebrow">{plan.label}</p>
                <h2>{plan.name}</h2>
                <p>{plan.description}</p>
                <div className="proposal-price">
                  <strong>{plan.pricingLabel}</strong>
                  <span>{plan.pricingNote}</span>
                </div>
                <CheckList items={plan.features} />
                <dl className="plan-details">
                  <dt>Included visits</dt>
                  <dd>{plan.visits}</dd>
                  <dt>Coverage</dt>
                  <dd>{plan.coverage}</dd>
                  <dt>Exclusions</dt>
                  <dd>{plan.exclusions}</dd>
                  <dt>Terms</dt>
                  <dd>{plan.terms}</dd>
                </dl>
                <ButtonLink
                  to={`/amc-maintenance?plan=${encodeURIComponent(plan.name)}#amc-proposal`}
                  secondary={!plan.popular}
                >
                  Request a proposal
                </ButtonLink>
              </Reveal>
            ))}
          </div>
          <div className="notice" style={{ marginTop: 30 }}>
            <Info size={19} />
            <p>
              These are configurable proposal frameworks, not active contracts.
              No unlimited repairs, free parts, guaranteed response times, or
              fixed visit counts are promised. A contract begins only once
              written coverage and commercial terms are accepted.
            </p>
          </div>
        </div>
      </section>
      <section className="section form-section" id="amc-proposal">
        <div className="container form-layout">
          <Reveal className="form-intro">
            <p className="eyebrow">
              <span />
              CARE, PLANNED AROUND YOU
            </p>
            <h2>
              Let's shape a<br />
              maintenance plan.
            </h2>
            <p>
              Tell us about your appliances, your location, and the kind of
              support you are looking for. We'll have the details needed to
              discuss a tailored proposal.
            </p>
            <div className="form-help">
              <ShieldCheck size={23} />
              <div>
                <h3>A proposal, not a commitment.</h3>
                <p>
                  This form does not activate an AMC or create a payment
                  obligation. Coverage, visits, exclusions, and pricing are
                  agreed separately.
                </p>
              </div>
            </div>
          </Reveal>
          <EnquiryForm kind="amc" />
        </div>
      </section>
    </>
  );
}
