import {
  ShoppingBag,
  Wrench,
  Settings2,
  Wind,
  Refrigerator,
  WashingMachine,
  Tv,
  Heater,
  CookingPot,
  Droplets,
  Fan,
  Microwave,
  UtensilsCrossed,
  HeartHandshake,
  MessagesSquare,
  ClipboardCheck,
  CalendarCheck,
  LifeBuoy,
  FileCheck2,
  Briefcase,
  MapPin,
  Receipt,
  ShieldCheck,
  SlidersHorizontal,
  Lightbulb,
  Zap,
} from "lucide-react";

export const navigation = [
  { label: "Home", path: "/" },
  { label: "Buying Guides", path: "/products" },
  { label: "Warranty Guide", path: "/warranty-guide" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "AMC Plans", path: "/amc-maintenance" },
  { label: "Service Locations", path: "/service-locations" },
  { label: "Reviews", path: "/feedback" },
  { label: "Brand Partnerships", path: "/partnerships" },
  { label: "Careers", path: "/careers" },
  { label: "Contact Us", path: "/contact" },
];

export const careerRoles = [
  "Electrician",
  "AC Installation and Repair Technician",
  "Refrigerator and Washing Machine Technician",
  "Home Appliance Repair Professional",
  "Field Service Executive",
  "Service Coordinator",
  "Other Qualified Employee",
] as const;

export const experienceLevels = [
  "Fresher / Less than 1 year",
  "1 - 2 years",
  "3 - 5 years",
  "More than 5 years",
] as const;

export const feedbackServices = [
  "Air Conditioners",
  "Refrigerators",
  "Washing Machines",
  "Televisions",
  "Geysers & Water Heaters",
  "Kitchen Appliances",
  "Water Purifiers",
  "Fans & Electrical Appliances",
  "Installation Support",
  "General Service",
] as const;

export const coreServices = [
  {
    title: "Appliance Sales",
    description:
      "The right appliances for your home, your needs, and your budget.",
    icon: ShoppingBag,
    path: "/products",
    number: "01",
  },
  {
    title: "Repair & Service",
    description:
      "Thoughtful diagnosis and dependable support for your everyday essentials.",
    icon: Wrench,
    path: "/services",
    number: "02",
  },
  {
    title: "Installation",
    description:
      "A smooth start with appliance installation and setup coordination.",
    icon: Settings2,
    path: "/services?type=Installation#service-request",
    number: "03",
  },
  {
    title: "Careers & Recruitment",
    description:
      "Join our professional network of certified electricians and technicians.",
    icon: Briefcase,
    path: "/careers",
    number: "04",
  },
];

export const categories = [
  {
    id: "air-conditioners",
    name: "Air Conditioners",
    short: "Comfort, in every season.",
    description:
      "Explore cooling options suited to your room, usage, and installation needs.",
    group: "Cooling",
    image: "air-conditioner",
    icon: Wind,
  },
  {
    id: "refrigerators",
    name: "Refrigerators",
    short: "Freshness for everyday living.",
    description:
      "Find practical refrigeration options for your household and kitchen space.",
    group: "Cooling",
    image: "refrigerator",
    icon: Refrigerator,
  },
  {
    id: "washing-machines",
    name: "Washing Machines",
    short: "A little less laundry day.",
    description:
      "Enquire about front-load, top-load, and everyday laundry solutions.",
    group: "Laundry",
    image: "washing-machine",
    icon: WashingMachine,
  },
  {
    id: "televisions",
    name: "Televisions",
    short: "Bring entertainment home.",
    description:
      "Discuss screen sizes, viewing preferences, and television setup requirements.",
    group: "Entertainment",
    image: "television",
    icon: Tv,
  },
  {
    id: "water-purifiers",
    name: "Water Purifiers",
    short: "Thoughtful choices. Clearer water.",
    description:
      "Discuss water purification options based on your household requirements.",
    group: "Kitchen",
    image: "water-purifier",
    icon: Droplets,
  },
  {
    id: "microwave-ovens",
    name: "Microwave Ovens",
    short: "Fast, versatile cooking solutions.",
    description:
      "Compare Solo, Grill, and Convection models tailored to your family's cooking needs.",
    group: "Kitchen",
    image: "microwave",
    icon: Microwave,
  },
  {
    id: "geysers",
    name: "Geysers & Water Heaters",
    short: "Warmth when you need it.",
    description:
      "Explore water-heating options and discuss suitable installation requirements.",
    group: "Electrical",
    image: "geyser",
    icon: Heater,
  },
  {
    id: "dishwashers",
    name: "Dishwashers",
    short: "Effortless hygiene & vessel cleaning.",
    description:
      "Select place settings, intensive wash cycles, and Indian utensil compatibility.",
    group: "Kitchen",
    image: "dishwasher",
    icon: UtensilsCrossed,
  },
  {
    id: "kitchen-appliances",
    name: "Kitchen Appliances",
    short: "Make room for easier days.",
    description:
      "Discover useful kitchen appliances for cooking, preparation, and daily routines.",
    group: "Kitchen",
    image: "kitchen-appliances",
    icon: CookingPot,
  },
  {
    id: "fans-electrical",
    name: "Fans & Electrical Appliances",
    short: "Everyday essentials, considered.",
    description:
      "Enquire about fans and other eligible electrical appliances for your home.",
    group: "Electrical",
    image: "fan",
    icon: Fan,
  },
  {
    id: "led-lighting",
    name: "LED Lighting",
    short: "Energy-efficient illumination.",
    description: "Bulbs, battens, downlights, and commercial lighting advisory.",
    group: "Electrical",
    image: "led-lighting",
    icon: Lightbulb,
  },
  {
    id: "inverters-power-backup",
    name: "Inverters & Power Backup",
    short: "Uninterrupted home power security.",
    description: "Pure sine wave inverters, tubular batteries, and lithium power systems.",
    group: "Electrical",
    image: "inverter",
    icon: Zap,
  },
  {
    id: "electric-vehicles",
    name: "Electric Vehicles (EVs)",
    short: "Electric mobility & charging setup.",
    description: "Electric 2-wheelers, 3-wheelers, and residential charging infrastructure.",
    group: "Electrical",
    image: "electric-vehicle",
    icon: Briefcase,
  },
  {
    id: "home-electrical-wiring",
    name: "Home Electrical Wiring",
    short: "Concealed planning & shock protection.",
    description: "Concealed conduit planning, copper wire gauges, DB layout, and earthing.",
    group: "Electrical",
    image: "electrical-wiring",
    icon: Settings2,
  },
];

export const advantages = [
  {
    title: "People-first assistance",
    text: "Support that starts with listening to you.",
    icon: HeartHandshake,
  },
  {
    title: "Clear communication",
    text: "Understand the scope and estimate first.",
    icon: MessagesSquare,
  },
  {
    title: "Organised service handling",
    text: "One enquiry, a considered next step.",
    icon: ClipboardCheck,
  },
  {
    title: "Installation coordination",
    text: "Help with getting your appliance set up.",
    icon: CalendarCheck,
  },
  {
    title: "Ongoing maintenance",
    text: "Explore care beyond the first service.",
    icon: LifeBuoy,
  },
  {
    title: "Transparent service terms",
    text: "Know what is included before you agree.",
    icon: FileCheck2,
  },
];

export const processSteps = [
  { title: "Submit your enquiry", text: "Tell us how we can help." },
  {
    title: "Share appliance details",
    text: "A few details help us understand your needs.",
  },
  {
    title: "Confirm availability & charges",
    text: "Review availability, scope, and charges.",
  },
  {
    title: "Receive the agreed service",
    text: "Proceed once everything is confirmed.",
  },
];

export const faqs = [
  {
    question: "Which appliances do you support?",
    answer:
      "You can enquire about air conditioners, refrigerators, washing machines, televisions, geysers, kitchen appliances, water purifiers, and other eligible electrical appliances. Support for a specific brand, model, or issue must be confirmed by the team before any booking.",
  },
  {
    question: "How can I request an appliance repair?",
    answer:
      "Use the Request a Service form and share your appliance category, location, and a description of the problem. Your request is recorded with a reference number. The team must then confirm service availability, the scope of work, and any charges. Submitting the form does not confirm an appointment.",
  },
  {
    question: "Do you provide installation services?",
    answer:
      "We welcome installation enquiries for eligible appliances. Installation availability, site requirements, technician allocation, and charges are subject to confirmation. Any electrical, plumbing, mounting, or additional material requirements will need to be agreed separately.",
  },
  {
    question: "How can I enquire about AMC packages?",
    answer:
      "Visit AMC & Maintenance and request a proposal. Share your appliance details and location so the team can discuss a suitable scope. Pricing, visits, coverage, exclusions, parts, and response arrangements are confirmed only in a written proposal.",
  },
  {
    question: "Which locations do you serve?",
    answer:
      "Use the Service Locations checker to look up your city or PIN code and appliance category. If verified coverage has not been published or your area is not listed, please send an enquiry. The team must confirm local availability, product eligibility, and charges before any booking.",
  },
  {
    question: "How can a brand or distributor become a partner?",
    answer:
      "Visit Brand Partnerships and complete the business enquiry form with your required services, territories, and expected volumes. Listed partnership capabilities are proposals for discussion, not claims of an existing authorised relationship or confirmed operational network.",
  },
];

export const detailedServices = [
  {
    name: "Air conditioner installation & maintenance",
    category: "Air Conditioners",
    icon: Wind,
    overview:
      "Discuss installation needs, cooling concerns, and preventive care for your air conditioner.",
    options: [
      "Installation and setup assessment",
      "Cooling and performance inspection",
      "Cleaning and preventive maintenance",
    ],
    process:
      "Share your AC type and room details. The team checks eligibility, site requirements, and the estimate before confirming a visit.",
  },
  {
    name: "Refrigerator inspection & repair",
    category: "Refrigerators",
    icon: Refrigerator,
    overview:
      "Request an assessment for cooling issues, unusual sounds, or other refrigerator concerns.",
    options: [
      "Fault inspection and diagnosis",
      "Repair scope and parts assessment",
      "Preventive maintenance guidance",
    ],
    process:
      "Describe the issue and share the model if available. Inspection availability, charges, and any repairs are agreed before work proceeds.",
  },
  {
    name: "Washing machine repair & maintenance",
    category: "Washing Machines",
    icon: WashingMachine,
    overview:
      "Find a next step for wash-cycle, drainage, vibration, and performance concerns.",
    options: [
      "Operational issue assessment",
      "Repair and maintenance enquiries",
      "Setup and connection guidance",
    ],
    process:
      "Share your machine type and symptoms. The team confirms eligibility and inspection arrangements, then discusses the proposed work.",
  },
  {
    name: "Television installation support",
    category: "Televisions",
    icon: Tv,
    overview:
      "Enquire about a considered setup for your screen and viewing space.",
    options: [
      "Wall-mounting requirement assessment",
      "Installation coordination",
      "Basic setup support enquiries",
    ],
    process:
      "Provide your TV size, mount details, and wall type. Site suitability, materials, and installation charges require confirmation.",
  },
  {
    name: "Geyser installation & maintenance",
    category: "Geysers & Water Heaters",
    icon: Heater,
    overview:
      "Discuss water-heater installation requirements and routine maintenance needs.",
    options: [
      "Installation requirement assessment",
      "Heating issue inspection",
      "Preventive maintenance enquiries",
    ],
    process:
      "Share the geyser type and existing connections. Electrical and plumbing suitability must be checked before installation is agreed.",
  },
  {
    name: "Kitchen appliance support",
    category: "Kitchen Appliances",
    icon: CookingPot,
    overview:
      "Get guidance on service options for eligible kitchen appliances.",
    options: [
      "Appliance eligibility checks",
      "Inspection and repair enquiries",
      "Care and maintenance guidance",
    ],
    process:
      "Tell us the appliance, brand, and issue. Support depends on product eligibility, local availability, and any parts requirements.",
  },
  {
    name: "Other eligible appliance services",
    category: "Other Appliances",
    icon: Settings2,
    overview:
      "Not sure where your appliance fits? Send the details and ask the team.",
    options: [
      "Water purifier service enquiries",
      "Fan and electrical appliance enquiries",
      "Other appliance assessments",
    ],
    process:
      "Submit your appliance details and location. The team will confirm whether a suitable service option can be offered.",
  },
];

const amcCommercialDefaults = {
  pricingLabel: "Tailored proposal",
  pricingNote: "No published pricing. Scope and charges agreed in writing.",
  terms:
    "Duration, payment, cancellation, and service arrangements set out in the final contract.",
  popular: false,
};

export const amcPlans = [
  {
    ...amcCommercialDefaults,
    id: "essential",
    name: "Essential Maintenance",
    label: "FOR EVERYDAY CARE",
    description: "A considered starting point for routine appliance care.",
    features: [
      "Preventive inspection scope",
      "Scheduled maintenance proposal",
      "Basic care recommendations",
    ],
    visits: "Visit frequency to be agreed",
    coverage: "Selected eligible appliances",
    exclusions:
      "Repairs, spare parts, and consumables unless specifically included in writing.",
  },
  {
    ...amcCommercialDefaults,
    id: "comprehensive",
    name: "Comprehensive Maintenance",
    label: "FOR MORE INVOLVED SUPPORT",
    popular: true,
    description: "A broader maintenance scope, shaped around your needs.",
    features: [
      "Expanded maintenance assessment",
      "Appliance-specific care planning",
      "Service follow-up arrangements",
    ],
    visits: "Visits defined in your proposal",
    coverage: "Agreed appliances and service scope",
    exclusions:
      "Parts, major repairs, and third-party work unless expressly included in the contract.",
  },
  {
    ...amcCommercialDefaults,
    id: "business",
    name: "Business & Institutional AMC",
    label: "FOR WORKPLACES & ORGANISATIONS",
    description: "Maintenance planning for multiple appliances and locations.",
    features: [
      "Multi-appliance requirements review",
      "Site-wise maintenance planning",
      "Reporting and coordination proposals",
    ],
    visits: "Site and volume-based schedule",
    coverage: "Contract-specific sites and appliances",
    exclusions:
      "Unlisted locations, equipment, materials, and work outside the agreed scope.",
  },
];

export const defaultEnquiryItems = [
  {
    id: "CP-29690B27D140",
    createdAt: "2026-11-05T10:01:35.432Z",
    kind: "service",
    status: "Pending" as const,
    name: "Amit Gupta",
    phone: "+919939194982",
    email: "arcmit906@gmail.com",
    service: "Kitchen Appliances",
    brandModel: "LG",
    message: "Inspection and service required for kitchen appliance.",
    pincode: "492101",
    city: "Raipur",
    address: "Raipur Core",
    contactMethod: "WhatsApp",
  },
  {
    id: "CP-AAAFABCF390E",
    createdAt: "2026-11-05T09:54:27.645Z",
    kind: "service",
    status: "Pending" as const,
    name: "Sunil Verma",
    phone: "9876543210",
    email: "sunil@example.com",
    service: "Water Purifiers",
    brandModel: "Kent RO",
    message: "Water filter membrane replacement and general sanitization.",
    pincode: "222001",
    city: "Jaunpur",
    address: "Civil Lines, Jaunpur",
    contactMethod: "WhatsApp",
  },
  {
    id: "CP-1456CBD26053",
    createdAt: "2026-11-05T09:31:38.384Z",
    kind: "service",
    status: "Pending" as const,
    name: "Pooja Mishra",
    phone: "9810863934",
    email: "pooja.m@example.com",
    service: "Refrigerators",
    brandModel: "Samsung Double Door",
    message: "Cooling coil inspection and temperature sensor diagnostic.",
    pincode: "211001",
    city: "Prayagraj",
    address: "Civil Lines, Prayagraj",
    contactMethod: "Phone",
  },
  {
    id: "CP-209BFFBE77D3",
    createdAt: "2026-10-26T18:21:06.088Z",
    kind: "career",
    status: "Pending" as const,
    name: "Vikas Upadhyay",
    phone: "7607865563",
    email: "vikas.up@example.com",
    service: "Technician Application",
    brandModel: "AC & Electrical Specialist",
    message: "Certified ITI technician with 5 years experience across East UP.",
    pincode: "226012",
    city: "Lucknow / East UP",
    address: "Lucknow East",
    contactMethod: "Phone",
  },
];

export interface WhyChooseService {
  id: string;
  stepNumber: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: typeof MessagesSquare;
  linkText: string;
  linkTo: string;
}

export const whyChooseServices: WhyChooseService[] = [
  {
    id: "pre-purchase-consultation",
    stepNumber: 1,
    title: "Pre-Purchase Consultation",
    shortDesc: "Help customers understand installation and service requirements before selecting a product.",
    fullDesc: "Discuss room dimensions, electrical loads, plumbing layouts, and ventilation with an appliance specialist before ordering so you invest in appliances that actually fit your household space.",
    icon: MessagesSquare,
    linkText: "Request Consultation",
    linkTo: "/contact",
  },
  {
    id: "pincode-check",
    stepNumber: 2,
    title: "PIN-Code Serviceability Check",
    shortDesc: "Confirm whether Consumer Point has service coverage and suitable technician availability in the customer's area.",
    fullDesc: "Verify coverage across 432 postal PIN codes in Prayagraj, Bhadohi, Kaushambi, and Jaunpur with real-time technician availability and doorstep turnaround timelines.",
    icon: MapPin,
    linkText: "Check PIN Coverage",
    linkTo: "/service-locations",
  },
  {
    id: "installation-cost-guidance",
    stepNumber: 3,
    title: "Installation Cost Guidance",
    shortDesc: "Explain standard installation charges, additional material costs and possible site-dependent expenses.",
    fullDesc: "Clear breakdowns of base technician installation fees, copper tubing extensions, outdoor heavy brackets, drain line plumbing, and electrical isolators with zero surprise bills.",
    icon: Receipt,
    linkText: "View Installation Details",
    linkTo: "/services",
  },
  {
    id: "site-readiness-assessment",
    stepNumber: 4,
    title: "Site Readiness Assessment",
    shortDesc: "Help customers prepare electrical points, plumbing, mounting locations, space and accessories before installation.",
    fullDesc: "Pre-installation assessment covering dedicated 16A earthing sockets, water inlet pressure, drain gradient, wall load capacity, and doorway clearance to guarantee first-time installation success.",
    icon: ClipboardCheck,
    linkText: "Prepare Your Site",
    linkTo: "/contact",
  },
  {
    id: "warranty-awareness",
    stepNumber: 5,
    title: "Warranty Awareness",
    shortDesc: "Help customers understand manufacturer warranty conditions, component coverage, exclusions, installation requirements and claim procedures.",
    fullDesc: "Unpack manufacturer warranties — distinguish 1-year comprehensive coverage from 10-year motor/compressor parts-only badges, identify exclusions, and understand brand claim requirements.",
    icon: ShieldCheck,
    linkText: "Explore Warranty Guide",
    linkTo: "/warranty-guide",
  },
  {
    id: "product-buying-guidance",
    stepNumber: 6,
    title: "Product Buying Guidance",
    shortDesc: "Help customers understand appliance technologies, compare specifications, identify useful features and select products according to their requirements and budget.",
    fullDesc: "Independent, engineer-reviewed buying guides and technical comparisons across 8 major household appliance categories to eliminate marketing gimmicks and match your budget.",
    icon: SlidersHorizontal,
    linkText: "Browse Buying Guides",
    linkTo: "/products",
  },
  {
    id: "after-sales-amc-support",
    stepNumber: 7,
    title: "After-Sales Service & AMC Support",
    shortDesc: "Assist customers with appliance installation, servicing, repairs, maintenance and available Annual Maintenance Contract plans.",
    fullDesc: "Doorstep maintenance by verified local technicians, genuine spare parts replacement, rapid emergency repairs, and comprehensive annual maintenance coverage for long-term reliability.",
    icon: Wrench,
    linkText: "Explore AMC Plans",
    linkTo: "/amc-maintenance",
  },
];
