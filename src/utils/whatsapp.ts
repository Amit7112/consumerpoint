export const DEFAULT_WHATSAPP_NUMBER = "919805350321";

export function getWhatsAppUrl(text?: string, phone?: string): string {
  const target = (phone || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, "");
  const msg = text || "Hello Consumer Point, I would like to enquire about your appliance services.";
  return `https://wa.me/${target}?text=${encodeURIComponent(msg)}`;
}

export function formatEnquiryForWhatsApp(
  kind: string,
  data: Record<string, any>,
  reference?: string,
): string {
  const titles: Record<string, string> = {
    service: "Appliance Repair & Service Request",
    amc: "Annual Maintenance Contract (AMC) Request",
    contact: "General Enquiry",
    partnership: "Brand / Business Partnership Enquiry",
  };

  const title = titles[kind] || "Customer Enquiry";
  const lines: string[] = [
    `*CONSUMER POINT - ${title.toUpperCase()}*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  ];

  if (reference) {
    lines.push(`🔖 *Reference ID:* ${reference}`);
  }
  if (data.name) {
    lines.push(`👤 *Customer Name:* ${data.name}`);
  }
  if (data.phone) {
    lines.push(`📞 *Phone Number:* ${data.phone}`);
  }
  if (data.email) {
    lines.push(`📧 *Email:* ${data.email}`);
  }
  if (data.city || data.pin) {
    const loc = [data.city, data.pin ? `(PIN: ${data.pin})` : ""].filter(Boolean).join(" ");
    lines.push(`📍 *Location:* ${loc}`);
  }
  if (data.category) {
    lines.push(`🛠️ *Appliance:* ${data.category}`);
  }
  if (data.brandModel) {
    lines.push(`🏷️ *Brand & Model:* ${data.brandModel}`);
  }
  if (data.plan) {
    lines.push(`📦 *AMC Plan:* ${data.plan}`);
  }
  if (data.enquiryType) {
    lines.push(`📋 *Enquiry Type:* ${data.enquiryType}`);
  }
  if (data.contactMethod) {
    lines.push(`⏰ *Preferred Contact:* ${data.contactMethod}`);
  }
  if (data.message) {
    lines.push(`📝 *Message / Problem:*`);
    lines.push(data.message);
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`_Sent from Consumer Point Website_`);

  return lines.join("\n");
}

export function formatCareerForWhatsApp(
  data: {
    name: string;
    phone: string;
    email?: string;
    role?: string;
    experience?: string;
    city?: string;
    notes?: string;
  },
  reference?: string,
): string {
  const lines: string[] = [
    `*CONSUMER POINT - JOB APPLICATION*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  ];

  if (reference) {
    lines.push(`🔖 *Application Ref:* ${reference}`);
  }
  lines.push(`👤 *Candidate Name:* ${data.name}`);
  lines.push(`📞 *Phone Number:* ${data.phone}`);
  if (data.email) {
    lines.push(`📧 *Email:* ${data.email}`);
  }
  if (data.role) {
    lines.push(`💼 *Role Applied:* ${data.role}`);
  }
  if (data.experience) {
    lines.push(`⏱️ *Experience:* ${data.experience}`);
  }
  if (data.city) {
    lines.push(`📍 *Location / City:* ${data.city}`);
  }
  if (data.notes) {
    lines.push(`📝 *Notes / Background:*`);
    lines.push(data.notes);
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`_Sent from Consumer Point Careers Page_`);

  return lines.join("\n");
}

export function formatFeedbackForWhatsApp(data: {
  name: string;
  phone?: string;
  rating: number;
  service: string;
  feedback: string;
}): string {
  const stars = "★".repeat(Math.max(1, Math.min(5, data.rating)));
  const lines: string[] = [
    `*CONSUMER POINT - CUSTOMER REVIEW*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `⭐ *Rating:* ${stars} (${data.rating}/5)`,
    `👤 *Customer Name:* ${data.name}`,
  ];

  if (data.phone) {
    lines.push(`📞 *Phone Number:* ${data.phone}`);
  }
  if (data.service) {
    lines.push(`🛠️ *Service / Appliance:* ${data.service}`);
  }
  lines.push(`📝 *Review:*`);
  lines.push(`"${data.feedback}"`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`_Sent from Consumer Point Feedback Page_`);

  return lines.join("\n");
}
