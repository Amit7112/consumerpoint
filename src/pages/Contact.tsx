import { Phone, Mail, MapPin, Clock3, MessageCircle } from "lucide-react";
import { useBusiness, whatsappUrl } from "../config";
import { PageHero, SEO } from "../components/UI";
import EnquiryForm from "../components/EnquiryForm";

export default function Contact() {
  const business = useBusiness();
  const details = [
    {
      icon: Phone,
      title: "Call us",
      value: business.phone,
      placeholder: "Business phone number to be provided",
      href: business.phone ? `tel:${business.phone}` : "",
    },
    {
      icon: Mail,
      title: "Write to us",
      value: business.email,
      placeholder: "Business email to be provided",
      href: business.email ? `mailto:${business.email}` : "",
    },
    {
      icon: MapPin,
      title: "Visit us",
      value: business.address,
      placeholder: "Verified office address to be provided",
      href: "",
    },
    {
      icon: Clock3,
      title: "Operating hours",
      value: business.hours,
      placeholder: "Business hours to be confirmed",
      href: "",
    },
  ];
  return (
    <>
      <SEO
        title="Contact & Enquiries"
        description="Contact Consumer Point for appliance sales enquiries, service requests, installation, AMC proposals, and brand partnerships through our secure enquiry form."
      />
      <PageHero
        eyebrow="Contact Us"
        title="A conversation can make all the difference."
      >
        An appliance question, a service requirement, or a business idea. Tell
        us what you have in mind and let's start with the details.
      </PageHero>
      <section className="section form-section" id="enquiry-form">
        <div className="container form-layout">
          <div className="form-intro">
            <p className="eyebrow">
              <span />
              WE'RE HERE TO LISTEN
            </p>
            <h2>
              Let's talk about
              <br />
              what you need.
            </h2>
            <p>
              Use the secure form for all enquiries. Contact details below
              remain clearly marked until verified business information is
              provided.
            </p>
            <div className="contact-details">
              {details.map((item) => (
                <div className="contact-detail" key={item.title}>
                  <item.icon size={19} strokeWidth={1.7} />
                  <div>
                    <h3>{item.title}</h3>
                    {item.value ? (
                      item.href ? (
                        <a href={item.href}>{item.value}</a>
                      ) : (
                        <p>{item.value}</p>
                      )
                    ) : (
                      <p className="unverified-detail">{item.placeholder}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {business.whatsapp ? (
              <a
                className="button button-secondary whatsapp-contact"
                href={whatsappUrl(business.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={17} />
                Chat on WhatsApp
              </a>
            ) : (
              <button
                className="button button-secondary whatsapp-contact"
                disabled
                title="A verified business WhatsApp number has not been provided"
              >
                <MessageCircle size={17} />
                WhatsApp not configured
              </button>
            )}
            <div className="map-placeholder">
              <MapPin size={23} />
              <p>
                {business.mapsUrl && business.address ? (
                  <a
                    href={business.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open verified business location in Google Maps
                  </a>
                ) : (
                  "A map will be available when the verified business address is provided. No placeholder location is displayed."
                )}
              </p>
            </div>
          </div>
          <EnquiryForm kind="contact" />
        </div>
      </section>
    </>
  );
}
