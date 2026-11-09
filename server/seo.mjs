export const pageMetadata = {
  "/": [
    "Home Appliance Sales, Service & Installation",
    "Expert home appliance repair, installation and AMC services across Prayagraj, Bhadohi, Kaushambi, and Jaunpur. Verified technicians for AC, washing machine, refrigerator & TV repair.",
  ],
  "/about": [
    "About Us",
    "Meet Consumer Point, a customer-focused home-appliance business bringing sales, installation enquiries, service support, and maintenance together.",
  ],
  "/products": [
    "Appliance Buying Guides & Spec Comparison",
    "Don't just buy an appliance. Buy the right appliance. Pre-purchase buying checklists, engineering comparisons, and sizing guides for 12 major home appliance and electrical categories.",
  ],
  "/warranty-guide": [
    "Appliance Warranty Guide | PCB & Manufacturer Coverage Reality",
    "Understand appliance warranties before purchasing. Real facts on comprehensive vs component warranties, inverter PCB coverage, labour exclusions, and warranty claim procedures.",
  ],
  "/services": [
    "Doorstep Appliance Repair & Installation Services",
    "Professional doorstep repair and installation for air conditioners, refrigerators, washing machines, and televisions across Prayagraj, Bhadohi, Kaushambi & Jaunpur.",
  ],
  "/amc-maintenance": [
    "Best Home Appliance Maintenance Services & AMC",
    "Best home appliance maintenance services and annual maintenance contracts (AMC). Scheduled seasonal check-ups, genuine spares, and verified technicians across Prayagraj, Bhadohi, Kaushambi & Jaunpur.",
  ],
  "/careers": [
    "Careers & Recruitment for Electricians & Technicians",
    "Join the Consumer Point service team. Professional opportunities for electricians, AC technicians, appliance specialists, and field service professionals.",
  ],
  "/partnerships": [
    "Appliance Brand & Business Partnerships",
    "Grow your service network with Consumer Point. We partner with appliance brands, manufacturers, distributors, dealers, and service organizations.",
  ],
  "/service-locations": [
    "Appliance Service Locations & PIN Coverage",
    "Check verified doorstep appliance repair and installation coverage across 430+ locations in Prayagraj, Bhadohi, Kaushambi, and Jaunpur. Instant PIN code verification.",
  ],
  "/contact": [
    "Contact & Enquiries",
    "Contact Consumer Point for appliance sales, service, installation, AMC proposals, and brand partnerships using the secure enquiry form.",
  ],
  "/feedback": [
    "Customer Feedback & Service Reviews",
    "Read verified customer reviews and share your feedback on Consumer Point appliance sales, repair, installation, and AMC services.",
  ],
  "/faq": [
    "Frequently Asked Questions",
    "Clear answers about Consumer Point appliance enquiries, repair, installation, maintenance, service locations, and business partnerships.",
  ],
  "/privacy-policy": [
    "Privacy Policy",
    "How Consumer Point handles, protects, and retains customer enquiry information.",
  ],
  "/terms-and-conditions": [
    "Terms & Conditions",
    "Website enquiry terms, information disclosures, and requirements for separate commercial agreements.",
  ],
  "/service-policy": [
    "Service Policy",
    "How appliance service enquiries, estimates, approvals, installation requirements, and maintenance arrangements are handled.",
  ],
  "/refund-cancellation-policy": [
    "Refund & Cancellation Policy",
    "Enquiry cancellation and disclosure requirements for any separately agreed paid service, product, or AMC.",
  ],
};

const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
export function withMetadata(html, path, siteUrl = "") {
  const [title, description] = pageMetadata[path] || [
    "Page Not Found",
    "The requested Consumer Point page could not be found.",
  ];
  let result = html
    .replace(
      /<title>.*?<\/title>/s,
      `<title>${escape(title)} | Consumer Point</title>`,
    )
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escape(description)}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${escape(title)} | Consumer Point" />`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${escape(description)}" />`,
    );
  if (siteUrl && pageMetadata[path])
    result = result.replace(
      "</head>",
      `<link rel="canonical" href="${escape(new URL(path, siteUrl).href)}" /></head>`,
    );
  return result;
}
