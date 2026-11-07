import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, join, dirname } from "node:path";

const SITE_URL = process.env.SITE_URL || "https://consumerpoint.co.in";

export const routesConfig = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
    title: "Consumer Point | Home Appliance Sales, Service, Repair & Installation",
    description: "Expert home appliance repair, installation and AMC services across Jaunpur, Prayagraj, Kaushambi and surrounding areas. AC, washing machine, refrigerator, TV & RO service.",
    type: "website",
    schemaType: "HomeAndConstructionBusiness",
  },
  {
    path: "/services",
    priority: "0.9",
    changefreq: "weekly",
    title: "Appliance Repair & Installation Services | Consumer Point",
    description: "Professional doorstep repair and installation for air conditioners, refrigerators, washing machines, televisions, geysers, and water purifiers. Verified technicians.",
    type: "service",
    schemaType: "Service",
  },
  {
    path: "/amc-maintenance",
    priority: "0.9",
    changefreq: "weekly",
    title: "Appliance AMC & Preventive Maintenance Contracts | Consumer Point",
    description: "Comprehensive and Essential Annual Maintenance Contracts (AMC) for home appliances. Scheduled seasonal check-ups, genuine spares, and priority breakdown support.",
    type: "service",
    schemaType: "Service",
  },
  {
    path: "/products",
    priority: "0.8",
    changefreq: "weekly",
    title: "Home Appliances & Equipment Enquiries | Consumer Point",
    description: "Explore energy-efficient inverter ACs, double-door refrigerators, front-load washing machines, 4K Smart TVs, and water purifiers. Transparent advice & service backup.",
    type: "website",
    schemaType: "WebPage",
  },
  {
    path: "/service-locations",
    priority: "0.9",
    changefreq: "weekly",
    title: "Check Service Coverage by PIN Code | 430+ Locations | Consumer Point",
    description: "Check verified doorstep service coverage across 430+ locations in Jaunpur, Prayagraj, Kaushambi, Varanasi, and East UP. Instant PIN code verification.",
    type: "website",
    schemaType: "ItemPage",
  },
  {
    path: "/feedback",
    priority: "0.8",
    changefreq: "daily",
    title: "Customer Reviews & Service Feedback | Consumer Point",
    description: "Read genuine customer reviews for appliance repair, AC servicing, and AMC maintenance. 100% verified customer experiences with Consumer Point technicians.",
    type: "website",
    schemaType: "WebPage",
  },
  {
    path: "/faq",
    priority: "0.8",
    changefreq: "monthly",
    title: "Frequently Asked Questions (FAQ) | Appliance Services & AMC",
    description: "Got questions about appliance repair costs, technician visits, AMC coverage, or service warranty? Find clear answers in our Consumer Point FAQ.",
    type: "website",
    schemaType: "FAQPage",
  },
  {
    path: "/about",
    priority: "0.7",
    changefreq: "monthly",
    title: "About Consumer Point | Trusted Home Appliance Service Network",
    description: "Learn about Consumer Point, our mission, verified technician network, and commitment to dependable after-sales appliance service and maintenance across Uttar Pradesh.",
    type: "website",
    schemaType: "AboutPage",
  },
  {
    path: "/partnerships",
    priority: "0.7",
    changefreq: "monthly",
    title: "Brand & B2B Service Partnerships | Consumer Point Enterprise",
    description: "Partner with Consumer Point for authorized after-sales service, warranty fulfilment, and field service infrastructure across eastern Uttar Pradesh.",
    type: "website",
    schemaType: "WebPage",
  },
  {
    path: "/careers",
    priority: "0.6",
    changefreq: "monthly",
    title: "Careers for Technicians & Electricians | Consumer Point Recruitment",
    description: "Join the verified field service team at Consumer Point. Opportunities for certified AC technicians, appliance specialists, and electricians with fair pay and training.",
    type: "website",
    schemaType: "WebPage",
  },
  {
    path: "/contact",
    priority: "0.8",
    changefreq: "monthly",
    title: "Contact Consumer Point | Support Helpline & Service Booking",
    description: "Get in touch with Consumer Point. Call 9810863934, email support@consumerpoint.co.in, or chat on WhatsApp for fast home appliance repair and installation bookings.",
    type: "website",
    schemaType: "ContactPage",
  },
  {
    path: "/privacy-policy",
    priority: "0.3",
    changefreq: "yearly",
    title: "Privacy Policy | Consumer Point",
    description: "Read how Consumer Point collects, protects, uses, and retains customer enquiry information in full compliance with data privacy regulations.",
    type: "website",
    schemaType: "WebPage",
  },
  {
    path: "/terms-and-conditions",
    priority: "0.3",
    changefreq: "yearly",
    title: "Terms & Conditions | Consumer Point",
    description: "Review website terms of service, enquiry process, quotation guidelines, and customer service conditions for Consumer Point.",
    type: "website",
    schemaType: "WebPage",
  },
  {
    path: "/service-policy",
    priority: "0.3",
    changefreq: "yearly",
    title: "Service Policy & Repair Standards | Consumer Point",
    description: "Learn about Consumer Point inspection procedures, genuine spare parts policy, workmanship warranties, and customer satisfaction commitments.",
    type: "website",
    schemaType: "WebPage",
  },
  {
    path: "/refund-cancellation-policy",
    priority: "0.3",
    changefreq: "yearly",
    title: "Refund & Cancellation Policy | Consumer Point",
    description: "Clear guidelines on cancellation of service requests, AMC contract terms, and fee adjustments at Consumer Point.",
    type: "website",
    schemaType: "WebPage",
  },
];

// Helper to escape XML/HTML
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function generateSitemapXml() {
  const today = new Date().toISOString().split("T")[0];
  const urlEntries = routesConfig
    .map(
      (r) => `  <url>
    <loc>${new URL(r.path, SITE_URL).href}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;
}

export function generateRobotsTxt() {
  return `# Consumer Point Robots.txt
# https://consumerpoint.co.in

User-agent: *
Allow: /

# Private operational routes & endpoints
Disallow: /api/
Disallow: /admin
Disallow: /admin/
Disallow: /technician
Disallow: /technician/

# Crawl delay & sitemap location
Sitemap: ${new URL("/sitemap.xml", SITE_URL).href}
`;
}

export function generateJsonLd(route) {
  const baseOrg = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: "Consumer Point",
    legalName: "Consumer Point Home Appliance Sales, Service & Installation",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-consumer-point.png`,
    image: `${SITE_URL}/images/og-image.jpg`,
    description:
      "Professional home appliance repair, AC installation, preventive maintenance and Comprehensive AMC services across Uttar Pradesh.",
    telephone: "+91-9810863934",
    email: "support@consumerpoint.co.in",
    priceRange: "₹₹",
    openingHours: "Mo-Sa 09:00-20:00",
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Jaunpur",
      },
      {
        "@type": "AdministrativeArea",
        name: "Prayagraj",
      },
      {
        "@type": "AdministrativeArea",
        name: "Kaushambi",
      },
      {
        "@type": "AdministrativeArea",
        name: "Eastern Uttar Pradesh",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Appliance Services & AMC",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Air Conditioner Repair & Installation",
            description: "Split and window AC installation, gas charging, deep jet cleaning and cooling coil repair.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Washing Machine Repair & Service",
            description: "Front load, top load and semi-automatic washing machine drum, motor and PCB repairs.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Refrigerator Repair & Maintenance",
            description: "Single and double door refrigerator cooling troubleshooting, compressor check, and gas refill.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Annual Maintenance Contracts (AMC)",
            description: "Comprehensive and Essential preventive maintenance for household appliances.",
          },
        },
      ],
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...(route.path !== "/"
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: route.title.split("|")[0].trim(),
              item: `${SITE_URL}${route.path}`,
            },
          ]
        : []),
    ],
  };

  const schemas = [baseOrg, breadcrumbs];

  if (route.path === "/faq") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How quickly can a technician visit my location?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Technician visits are generally scheduled within 24 to 48 hours depending on technician availability and PIN code service coverage.",
          },
        },
        {
          "@type": "Question",
          name: "Are spare parts used during repairs genuine?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Consumer Point technicians prioritize authentic, brand-compatible replacement parts with transparent diagnostic accountability.",
          },
        },
        {
          "@type": "Question",
          name: "What is covered under Consumer Point AMC plans?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our Annual Maintenance Contracts include periodic preventive check-ups, deep cleaning, priority emergency breakdown response, and discounted or inclusive spare parts depending on the chosen tier (Essential, Comprehensive, or Business).",
          },
        },
      ],
    });
  }

  return schemas;
}

export function prerenderRoutes() {
  const distDir = resolve("dist");
  if (!existsSync(distDir)) {
    console.log("No dist directory found. Run vite build first.");
    return;
  }

  const baseHtmlPath = join(distDir, "index.html");
  if (!existsSync(baseHtmlPath)) {
    console.error("dist/index.html not found!");
    return;
  }

  const baseHtml = readFileSync(baseHtmlPath, "utf8");

  // Write sitemap and robots into dist and public
  const sitemapXml = generateSitemapXml();
  const robotsTxt = generateRobotsTxt();

  writeFileSync(join(distDir, "sitemap.xml"), sitemapXml, "utf8");
  writeFileSync(resolve("public/sitemap.xml"), sitemapXml, "utf8");
  writeFileSync(join(distDir, "robots.txt"), robotsTxt, "utf8");
  writeFileSync(resolve("public/robots.txt"), robotsTxt, "utf8");

  console.log("Sitemap and robots.txt written to public and dist.");

  // Now prerender each route
  for (const route of routesConfig) {
    const canonicalUrl = new URL(route.path, SITE_URL).href;
    const ogImageUrl = `${SITE_URL}/images/og-image.jpg`;
    const jsonLd = JSON.stringify(generateJsonLd(route));

    let pageHtml = baseHtml;

    // Replace Title
    pageHtml = pageHtml.replace(
      /<title>.*?<\/title>/s,
      `<title>${escapeHtml(route.title)}</title>`,
    );

    // Replace Description
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"[\s\S]*?\/?>/i,
      `<meta name="description" content="${escapeHtml(route.description)}" />`,
    );

    // Replace Canonical Link
    pageHtml = pageHtml.replace(
      /<link\s+rel="canonical"[\s\S]*?\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`,
    );

    // Replace OG Tags
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"[\s\S]*?\/?>/i,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"[\s\S]*?\/?>/i,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:url"[\s\S]*?\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`,
    );

    // Replace Twitter Tags
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:title"[\s\S]*?\/?>/i,
      `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"[\s\S]*?\/?>/i,
      `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    );

    // Replace or Inject Structured Data Schema
    const schemaScript = `<script type="application/ld+json">\n${jsonLd}\n    </script>`;
    if (pageHtml.includes('type="application/ld+json"')) {
      pageHtml = pageHtml.replace(
        /<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/i,
        () => schemaScript,
      );
    } else {
      pageHtml = pageHtml.replace(
        "</head>",
        () => `  ${schemaScript}\n</head>`,
      );
    }

    // Determine output file path
    let outPath;
    if (route.path === "/") {
      outPath = join(distDir, "index.html");
    } else {
      const folder = join(distDir, route.path.replace(/^\//, ""));
      if (!existsSync(folder)) mkdirSync(folder, { recursive: true });
      outPath = join(folder, "index.html");
    }

    writeFileSync(outPath, pageHtml, "utf8");
    console.log(`Prerendered: ${route.path} -> ${outPath}`);
  }

  // Create 404.html
  const notFoundHtml = baseHtml
    .replace(
      /<title>.*?<\/title>/s,
      "<title>Page Not Found | Consumer Point</title>",
    )
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      '<meta name="description" content="The page you requested could not be found." />',
    )
    .replace(
      "</head>",
      '  <meta name="robots" content="noindex, follow" />\n</head>',
    );
  writeFileSync(join(distDir, "404.html"), notFoundHtml, "utf8");
  console.log("Created dist/404.html");
}

if (process.argv[1]?.endsWith("build-seo.mjs")) {
  prerenderRoutes();
}
