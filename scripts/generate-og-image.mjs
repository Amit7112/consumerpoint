import sharp from "sharp";

async function createOgImage() {
  const width = 1200;
  const height = 630;

  // Load the trimmed logo
  const logo = await sharp("public/images/logo-consumer-point.png")
    .resize({ width: 480 })
    .toBuffer();

  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#f0f7ff"/>
        </linearGradient>
        <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0084ff"/>
          <stop offset="100%" stop-color="#00d4ee"/>
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      
      <!-- Decorative geometric accents -->
      <circle cx="1100" cy="80" r="260" fill="#e0f2fe" opacity="0.6"/>
      <circle cx="100" cy="580" r="200" fill="#e0f2fe" opacity="0.5"/>
      <rect x="0" y="622" width="${width}" height="8" fill="url(#accent)"/>

      <!-- Badge -->
      <rect x="80" y="60" width="300" height="38" rx="19" fill="#e0f2fe"/>
      <text x="230" y="84" font-family="sans-serif" font-size="13" font-weight="700" fill="#0369a1" text-anchor="middle" letter-spacing="1.5">VERIFIED SERVICE NETWORK</text>

      <!-- Headline -->
      <text x="80" y="360" font-family="sans-serif" font-size="44" font-weight="800" fill="#06152e">Home Appliance Sales, Service &amp; Installation</text>
      
      <!-- Subheadline -->
      <text x="80" y="415" font-family="sans-serif" font-size="24" font-weight="500" fill="#475569">Air Conditioners • Washing Machines • Refrigerators • Televisions • AMC</text>
      
      <!-- Service features pill bar -->
      <rect x="80" y="465" width="1040" height="85" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="120" y="516" font-family="sans-serif" font-size="19" font-weight="700" fill="#0f172a">Jaunpur, Prayagraj &amp; East UP</text>
      <text x="470" y="516" font-family="sans-serif" font-size="19" font-weight="700" fill="#0084ff">430+ Serviced PIN Codes</text>
      <text x="800" y="516" font-family="sans-serif" font-size="19" font-weight="700" fill="#16a34a">Helpline: +91 9810863934</text>
    </svg>
  `);

  await sharp(svgOverlay)
    .composite([
      {
        input: logo,
        top: 125,
        left: 80,
      },
    ])
    .jpeg({ quality: 90 })
    .toFile("public/images/og-image.jpg");

  console.log("public/images/og-image.jpg generated successfully.");
}

createOgImage().catch(console.error);

