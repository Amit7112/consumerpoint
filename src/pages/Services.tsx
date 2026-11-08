import { Info, ShieldCheck } from "lucide-react";
import { detailedServices } from "../data";
import { ButtonLink, CheckList, PageHero, Reveal, SEO } from "../components/UI";
import EnquiryForm from "../components/EnquiryForm";

export default function Services() {
  return (
    <>
      <SEO
        title="Doorstep Appliance Repair & Installation Services"
        description="Professional doorstep repair and installation for air conditioners, refrigerators, washing machines, televisions, geysers, and water purifiers across Prayagraj, Bhadohi, Kaushambi & Jaunpur."
      />
      <PageHero
        eyebrow="Services"
        title={
          <>
            Doorstep Appliance Repair
            <br />&amp; Installation Services.
          </>
        }
      >
        Expert doorstep repair and professional installation for your essential home appliances across Prayagraj, Bhadohi, Kaushambi, and Jaunpur. Share what you need and our verified technicians will confirm the right next step.
      </PageHero>
      <section className="section">
        <div className="container">
          <div className="notice" style={{ marginBottom: 38 }}>
            <Info size={19} />
            <p>
              The options below are available for enquiry. Product eligibility,
              service areas, technician availability, site requirements, and
              charges must be confirmed before any work is booked.
            </p>
          </div>
          {detailedServices.map((service) => (
            <Reveal className="service-detail" key={service.name}>
              <span className="service-detail-icon">
                <service.icon size={28} strokeWidth={1.6} />
              </span>
              <div>
                <h2>{service.name}</h2>
                <p>{service.overview}</p>
                <CheckList items={service.options} />
                <p className="service-process">
                  <strong>How it works: </strong>
                  {service.process}
                </p>
              </div>
              <ButtonLink
                to={`/services?category=${encodeURIComponent(service.category)}#service-request`}
                secondary
              >
                Enquire about service
              </ButtonLink>
            </Reveal>
          ))}
          <Reveal className="services-amc-card">
            <div className="services-amc-badge">ANNUAL MAINTENANCE CONTRACTS</div>
            <div className="services-amc-body">
              <div className="services-amc-text">
                <h2>Looking for long-term care? Protect with AMC.</h2>
                <p>
                  Get scheduled seasonal inspections, priority emergency response, genuine replacement parts, and total peace of mind for your ACs, refrigerators, and washing machines.
                </p>
              </div>
              <ButtonLink to="/amc-maintenance" className="services-amc-btn">
                Explore AMC Plans
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section form-section" id="service-request">
        <div className="container form-layout">
          <Reveal className="form-intro">
            <p className="eyebrow">
              <span />
              LET'S GET STARTED
            </p>
            <h2>
              Tell us what
              <br />
              needs attention.
            </h2>
            <p>
              Share your appliance details and location. Your enquiry will be
              recorded securely so the team can review your requirements.
            </p>
            <div className="form-help">
              <ShieldCheck size={23} />
              <div>
                <h3>Clear details. No surprises.</h3>
                <p>
                  No appointment is confirmed by this form. Availability,
                  inspection charges, repair scope, and any parts are discussed
                  before you agree to proceed.
                </p>
              </div>
            </div>
          </Reveal>
          <EnquiryForm kind="service" />
        </div>
      </section>
    </>
  );
}
