import { Link, useParams } from "react-router-dom";
import { Info } from "lucide-react";
import { PageHero, SEO } from "../components/UI";
import { useBusiness } from "../config";

const policies: Record<
  string,
  { title: string; intro: string; sections: { title: string; text: string }[] }
> = {
  "privacy-policy": {
    title: "Privacy Policy",
    intro:
      "A clear explanation of how this website handles enquiry information.",
    sections: [
      {
        title: "Information you share",
        text: "Forms collect your name, mobile number, enquiry details, and consent. Depending on the form, you may also provide an email address, location, appliance details, an appointment preference, or business requirements. Only provide information relevant to your enquiry. Do not submit payment card information, identity documents, passwords, or other sensitive records.",
      },
      {
        title: "How information is used",
        text: "Information is used to record, review, respond to, and coordinate your enquiry. Submitting a request does not opt you into unrelated marketing. If information needs to be shared with a service provider for an agreed service, the scope and requirements must first be confirmed with you.",
      },
      {
        title: "Security and access",
        text: "Enquiry payloads are encrypted in the application database. Access is restricted to the server and authorised operators with access to the encryption key. Forms use validation, request-rate limits, and time-bound anti-spam challenges. No enquiry details are stored in browser local storage. Network and hosting providers may process technical connection data according to their own security policies.",
      },
      {
        title: "Cookies and third parties",
        text: "This initial website does not use marketing cookies or analytics tracking. Fonts and images are served locally. If you choose to open WhatsApp or Google Maps, that service receives your connection information and its own privacy terms apply. WhatsApp and map links are enabled only when verified business configuration is provided.",
      },
      {
        title: "Your choices",
        text: "You can choose not to submit a form. To request access, correction, or deletion of an existing enquiry, use the contact form and quote your reference. Avoid posting another person's details without permission. Consent can be withdrawn by requesting that the team stop contacting you about your enquiry, subject to any applicable recordkeeping duties.",
      },
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    intro: "Please read these website terms before submitting an enquiry.",
    sections: [
      {
        title: "Website purpose",
        text: "This website provides general information and records product, service, maintenance, and business enquiries. It is not an online checkout. A submission is not an order, booking, quotation, signed partnership, or confirmed service commitment.",
      },
      {
        title: "Information and illustrations",
        text: "Appliance images are illustrative and do not represent guaranteed models or stock. No price, authorised dealership, brand affiliation, service territory, certification, or operating history is implied unless explicitly verified by the business. Details may be updated as information becomes available.",
      },
      {
        title: "Separate agreements",
        text: "Product specifications, availability, delivery, installation suitability, service scope, parts, charges, warranty arrangements, and commercial terms must be confirmed separately. Business partnerships and AMC arrangements require their own written scope and accepted terms.",
      },
      {
        title: "Responsible use",
        text: "Provide accurate information and only submit details you are entitled to share. Do not use this site for spam, malicious content, unauthorised access attempts, or infringement. Public forms are rate limited to protect the site and other visitors.",
      },
      {
        title: "Business-specific terms",
        text: "The legal business entity, registered address, governing-law details, and applicable consumer disclosures must be provided and reviewed by the business before public commercial launch. Nothing in these website terms limits mandatory consumer rights under applicable law.",
      },
    ],
  },
  "service-policy": {
    title: "Service Policy",
    intro: "A transparent starting point for appliance service enquiries.",
    sections: [
      {
        title: "Enquiry and assessment",
        text: "Submit your appliance type, issue, and location. The team must confirm product eligibility, local service availability, and the proposed next step. A request reference confirms receipt only, not technician allocation or a booked appointment.",
      },
      {
        title: "Estimates and approval",
        text: "Inspection, visit, labour, parts, materials, travel, and other applicable charges must be explained and agreed before the corresponding work is authorised. If an assessment identifies additional work, the scope and revised estimate require your approval.",
      },
      {
        title: "Installation requirements",
        text: "Site readiness, mounting suitability, electrical and plumbing safety, required accessories, and any additional materials must be assessed. Do not assume that civil work, wiring, plumbing alterations, brackets, or consumables are included.",
      },
      {
        title: "Parts and warranty",
        text: "Parts availability, repair feasibility, and any warranty applicable to agreed work are confirmed individually. No brand-authorised status or manufacturer warranty coverage is claimed by this site. Manufacturer warranty enquiries may need to be directed to the relevant brand.",
      },
      {
        title: "Maintenance and follow-up",
        text: "AMC coverage applies only to the equipment, locations, visits, exclusions, and duration set out in an accepted contract. No unlimited repairs, free parts, or guaranteed response times are offered by the general website content.",
      },
    ],
  },
  "refund-cancellation-policy": {
    title: "Refund & Cancellation Policy",
    intro: "Know what is agreed before a booking or payment.",
    sections: [
      {
        title: "Website enquiries",
        text: "There are no payments, deposits, or checkout transactions on this website. Submitting an enquiry does not create a payment obligation. If you no longer need assistance, use the contact form and quote your request reference.",
      },
      {
        title: "Before a paid service",
        text: "Any inspection fee, booking charge, deposit, cancellation condition, rescheduling process, and refund eligibility must be disclosed and accepted before payment or booking. No general refund schedule is published because verified commercial terms have not been supplied.",
      },
      {
        title: "Product and AMC arrangements",
        text: "Product return terms, manufacturer warranty conditions, AMC cancellation, prorating, parts procurement, and any non-refundable agreed costs must be set out in the corresponding written quotation or contract. Applicable statutory consumer rights continue to apply.",
      },
      {
        title: "Request a review",
        text: "Contact the team with your enquiry reference, the relevant agreement or receipt details, and a short explanation of the concern. Do not send bank credentials or card information through the public enquiry form. No refund timeline is promised until the applicable terms and circumstances are confirmed.",
      },
    ],
  },
};

export default function Legal() {
  const { policy = "privacy-policy" } = useParams();
  const content = policies[policy];
  const business = useBusiness();
  if (!content) return <NotFound />;
  return (
    <>
      <SEO title={content.title} description={content.intro} />
      <PageHero eyebrow="The Important Details" title={content.title}>
        {content.intro}
      </PageHero>
      <section className="section">
        <div className="container legal-content">
          <div className="notice">
            <Info size={18} />
            <p>
              Initial website policy. Business identity, verified contact
              details, and commercial terms must be reviewed and approved by the
              business before public launch. Missing details are not invented.
            </p>
          </div>
          {content.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          {policy === "privacy-policy" && (
            <section>
              <h2>Retention</h2>
              <p>
                By default, enquiry records are automatically removed after{" "}
                {business.retentionDays} days. The operator can configure the
                retention period to reflect lawful business requirements.
                Minimal operational metadata and records needed to fulfil legal
                obligations may be treated separately under an approved business
                policy.
              </p>
            </section>
          )}
          <section>
            <h2>Questions or requests</h2>
            <p>
              {business.email ? (
                <>
                  Email{" "}
                  <a href={`mailto:${business.email}`}>{business.email}</a>{" "}
                  or{" "}
                </>
              ) : (
                "Until verified direct contact information is published, please "
              )}
              <Link to="/contact">use our contact form</Link>. Include your
              request reference where relevant.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="This Consumer Point page could not be found. Explore our appliances, services, or contact the team."
      />
      <section className="not-found">
        <div className="container">
          <span>404</span>
          <h1>This one needs a different connection.</h1>
          <p>
            The page you're looking for isn't here.
            <br />
            Let's get you back to something useful.
          </p>
          <Link className="button button-primary" to="/">
            Back to Home
          </Link>
          <Link className="button button-secondary" to="/contact">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
