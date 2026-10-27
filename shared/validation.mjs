import { z } from "zod";

export const enquiryTypes = [
  "Product Enquiry",
  "Service Request",
  "Installation",
  "AMC",
  "Brand Partnership",
  "General Enquiry",
];
export const applianceCategories = [
  "Air Conditioners",
  "Refrigerators",
  "Washing Machines",
  "Televisions",
  "Geysers & Water Heaters",
  "Kitchen Appliances",
  "Water Purifiers",
  "Fans & Electrical Appliances",
  "Other Appliances",
];
export const businessTypes = [
  "Appliance Brand / Manufacturer",
  "Distributor",
  "Dealer / Retailer",
  "Corporate / Institution",
  "Other Business",
];
export const partnershipServices = [
  "Service request coordination",
  "Installation support",
  "Technician network coordination",
  "Preventive maintenance",
  "Service reporting & follow-up",
];
export const volumes = [
  "To be discussed",
  "1-25 requests",
  "26-100 requests",
  "101-500 requests",
  "More than 500 requests",
];
export const planNames = [
  "Essential Maintenance",
  "Comprehensive Maintenance",
  "Business & Institutional AMC",
];
export const careerRoles = [
  "Electrician",
  "AC Installation and Repair Technician",
  "Refrigerator and Washing Machine Technician",
  "Home Appliance Repair Professional",
  "Field Service Executive",
  "Service Coordinator",
  "Other Qualified Employee",
];
export const experienceLevels = [
  "Fresher / Less than 1 year",
  "1 - 2 years",
  "3 - 5 years",
  "More than 5 years",
];
export const indiaToday = () =>
  new Date(Date.now() + 330 * 60 * 1000).toISOString().slice(0, 10);

const text = (label, min = 2, max = 100) =>
  z
    .string()
    .trim()
    .min(min, `${label} must be at least ${min} characters.`)
    .max(max, `${label} must be ${max} characters or fewer.`);
const optionalText = (max = 100) =>
  z
    .string()
    .trim()
    .max(max, `Please use ${max} characters or fewer.`)
    .default("");
const email = z
  .string()
  .trim()
  .max(254)
  .refine(
    (value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    "Enter a valid email address.",
  )
  .default("");
const phone = z
  .string()
  .trim()
  .refine(
    (value) =>
      /^(?:\+?91[\s-]?)?[6-9]\d{9}$/.test(value.replace(/[\s()-]/g, "")),
    "Enter a valid 10-digit Indian mobile number, optionally with +91.",
  );
const pin = z
  .string()
  .trim()
  .regex(/^[1-9]\d{5}$/, "Enter a valid 6-digit Indian PIN code.");
const common = {
  name: text("Name", 2, 80),
  phone,
  email,
  consent: z.literal(true, {
    error: "Please consent to being contacted about this enquiry.",
  }),
};
const message = text("Description", 10, 3000);
const contactMethod = z.enum(["Phone", "Email", "WhatsApp"], {
  error: "Choose a preferred contact method.",
});
const category = z.enum(applianceCategories, {
  error: "Choose an appliance category.",
});
const requireContactEmail = (data, context) => {
  if (data.contactMethod === "Email" && !data.email)
    context.addIssue({
      code: "custom",
      path: ["email"],
      message: "Enter your email to use this contact method.",
    });
};

const schemas = {
  contact: z
    .object({
      ...common,
      enquiryType: z.enum(enquiryTypes, { error: "Choose an enquiry type." }),
      category: optionalText(),
      message,
    })
    .strict(),
  service: z
    .object({
      ...common,
      city: text("City", 2, 80),
      pin,
      category,
      brandModel: optionalText(150),
      message,
      preferredDate: z
        .string()
        .refine(
          (value) =>
            value === "" ||
            (/^\d{4}-\d{2}-\d{2}$/.test(value) &&
              !Number.isNaN(Date.parse(value)) &&
              new Date(value).toISOString().slice(0, 10) === value &&
              value >= indiaToday()),
          "Choose today or a future date.",
        )
        .default(""),
      contactMethod,
    })
    .strict()
    .superRefine(requireContactEmail),
  amc: z
    .object({
      ...common,
      city: text("City", 2, 80),
      pin,
      category: z.enum([...applianceCategories, "Multiple appliances"], {
        error: "Choose an appliance category.",
      }),
      plan: z.enum(planNames, { error: "Choose a maintenance plan." }),
      applianceCount: z
        .string()
        .regex(/^\d+$/, "Enter a whole number.")
        .refine(
          (value) => Number(value) >= 1 && Number(value) <= 5000,
          "Enter a number between 1 and 5000.",
        ),
      message,
      contactMethod,
    })
    .strict()
    .superRefine(requireContactEmail),
  partnership: z
    .object({
      ...common,
      company: text("Company name", 2, 150),
      email: z.string().trim().max(254).email("Enter a valid business email."),
      businessType: z.enum(businessTypes, {
        error: "Choose your business type.",
      }),
      requiredServices: z
        .array(z.enum(partnershipServices))
        .min(1, "Select at least one required service.")
        .max(5),
      territories: text("Required cities or PIN codes", 2, 1000),
      volume: z.enum(volumes, { error: "Select an estimated monthly volume." }),
      message: optionalText(3000),
    })
    .strict(),
  career: z
    .object({
      name: text("Full Name", 2, 80),
      phone,
      email,
      location: text("City / Preferred Work Location", 2, 100),
      role: z.enum(careerRoles, { error: "Choose a job role." }),
      experience: z.enum(experienceLevels, {
        error: "Choose your experience level.",
      }),
      skills: text("Technical skills & specialization", 2, 500),
      introduction: text("Short introduction", 5, 2000),
      resumeLink: optionalText(500),
      consent: z.literal(true, {
        error:
          "Please consent to the processing of your application information.",
      }),
    })
    .strict(),
};

export function validateEnquiry(kind, data) {
  if (!Object.hasOwn(schemas, kind))
    return { success: false, errors: { kind: "Choose a valid enquiry type." } };
  const result = schemas[kind].safeParse(data);
  if (result.success) return { success: true, data: result.data, errors: {} };
  const errors = {};
  for (const issue of result.error.issues) {
    const field = String(issue.path[0] || "form");
    if (!errors[field]) errors[field] = issue.message;
  }
  return { success: false, errors };
}

export const feedbackServices = [
  "Air Conditioners",
  "Refrigerators",
  "Washing Machines",
  "Televisions",
  "Geysers & Water Heaters",
  "Kitchen Appliances",
  "Water Purifiers",
  "Fans & Electrical Appliances",
  "AMC & Maintenance",
  "Installation Support",
  "General Service",
];

export const feedbackSchema = z
  .object({
    name: text("Name", 2, 80),
    service: z.enum(feedbackServices, {
      error: "Choose an appliance or service.",
    }),
    rating: z
      .number({ invalid_type_error: "Please select a star rating." })
      .int()
      .min(1, "Please select at least 1 star.")
      .max(5, "Rating cannot exceed 5 stars."),
    comment: text("Feedback / Review", 5, 1000),
    verified: z.boolean().default(true),
  })
  .strict();

export function validateFeedback(data) {
  const result = feedbackSchema.safeParse(data);
  if (result.success) return { success: true, data: result.data, errors: {} };
  const errors = {};
  for (const issue of result.error.issues) {
    const field = String(issue.path[0] || "form");
    if (!errors[field]) errors[field] = issue.message;
  }
  return { success: false, errors };
}

