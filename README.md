# Consumer Point

A complete responsive React application for appliance sales enquiries, installation, service requests, AMC proposals, and B2B partnerships. The same-origin Express API persists real enquiries in an encrypted SQLite database. There is no checkout and no fabricated contact, coverage, pricing, affiliation, or customer-review data.

## Run Locally

Requires Node.js 20.19+ or 22.12+ and npm. A compiler toolchain may be needed if a prebuilt better-sqlite3 binary is unavailable for your platform.

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`. This command runs the Vite frontend and Express API together, including hot reloading. Do not run a standalone Vite server if you need functional forms. No third-party accounts or API keys are required for local use. The first development start creates a private local encryption key and database in `data/`.

## Project Structure

```text
src/App.tsx                 React Router entry point
src/components/            Brand, layout, enquiry form, product grid, UI primitives
src/pages/                 All public pages, policies, and custom 404
src/data.ts                Editable categories, services, AMC scopes, FAQ copy
src/config.tsx             Public business-configuration provider
src/index.css              Responsive design system and reduced-motion support
shared/validation.mjs      Shared Zod validation for browser and server
server/app.mjs             API, origin protection, spam controls, validation
server/store.mjs           AES-256-GCM encryption and SQLite persistence
server/schema.sql          Database schema, automatically applied on startup
server/dev.mjs             Same-origin Vite + API development server
server/index.mjs           Production static serving, security headers, metadata
server/seo.mjs             Route metadata, canonical URLs, sitemap source
config/service-areas.json  Configurable verified coverage data
scripts/manage-enquiries.mjs  Restricted operator CLI
tests/                     Backend, validation, and browser tests
public/images/             Locally served optimized imagery
```

## Business Configuration

Populate `.env` only with verified business information. Empty contact fields are labelled as unprovided. The WhatsApp floating button is hidden until `BUSINESS_WHATSAPP` is configured with an international number. The contact-page WhatsApp button is explicitly disabled while missing. A Google Maps link is enabled only when both a verified address and a valid Google Maps URL are supplied. No social-media accounts or LocalBusiness structured data are invented.

`src/data.ts` holds editable product-category descriptions, service eligibility copy, and AMC proposal frameworks. AMC pricing is deliberately not published; each framework supports editable visits, coverage, exclusions, and terms. Future real product models can be added by extending the category data and product component with verified model, brand, specifications, price, and availability. Reviews are an explicitly labelled development placeholder, never attributed to invented customers.

### Verified Coverage

The coverage file starts unconfirmed and empty. The checker therefore asks customers to contact the team. Only set `confirmed` to `true` when the entire dataset has business approval. Each area must also contain `verified: true`, a real city, an array of six-digit PIN strings, and supported category names matching `shared/validation.mjs`.

Shape only, not real coverage data:

```json
{
  "confirmed": false,
  "areas": [
    {
      "city": "REPLACE_WITH_VERIFIED_CITY",
      "pins": [],
      "categories": ["Air Conditioners"],
      "verified": true
    }
  ]
}
```

Do not publish that example as coverage. Missing, malformed, empty, or unconfirmed coverage files never confirm availability. Matches still require appointment and product eligibility confirmation. Review location-related FAQ and page copy when publishing verified service areas.

## Enquiry Processing

- `GET /api/config`: verified public configuration only.
- `GET /api/form-token`: signed, two-hour form challenge; minimum one-second age.
- `POST /api/enquiries`: validates the shared schema and persists the enquiry before returning `201` with a `CP-...` reference.
- `GET /api/coverage?location=...&category=...`: configurable coverage check.
- `GET /api/health`: deployment health check.

All four forms have custom accessible validation, pending, success, and error states. Indian mobile numbers accept valid ten-digit numbers beginning 6-9 with an optional +91 prefix. PIN codes are six digits and cannot begin with zero. Dates cannot be in the past in the Indian time zone. Email is required for business partnerships and when the preferred contact method is email. Consent is mandatory. Public payloads reject unexpected fields.

The backend uses JSON-only same-origin submissions, explicit origin checks, Helmet headers, a 20 KB body limit, a honeypot, signed time-bound challenges, persistent token replay protection, 150 API requests per IP per 15 minutes in production (1000 in development for hot reload and browser testing), and eight submission attempts per IP per 15 minutes in both environments. API results are not cached. It does not store IP addresses in the enquiry database or log submitted contact data. SQLite statements are parameterized. Rate-limit counters are process-local: use a shared rate-limit store before scaling beyond one server instance.

### Review And Follow Up

The initial implementation records leads in the backend; it does not claim to send notification emails, SMS messages, or confirm appointments. Authorised staff must review the stored requests using the operator CLI on the server. There is intentionally no public endpoint exposing customer data.

```bash
node scripts/manage-enquiries.mjs list
node scripts/manage-enquiries.mjs export enquiries-export-2026.json
node scripts/manage-enquiries.mjs status CP-REFERENCE reviewing
node scripts/manage-enquiries.mjs delete CP-REFERENCE
node scripts/manage-enquiries.mjs purge
```

Exports contain decrypted personal information and are created with owner-only permissions and no overwrite. Never place them inside `public/`, `dist/`, or version control. Limit operator access and remove exports when finished. Add a separately authenticated back-office system or notification channel if required operationally. Verify identity before fulfilling access/deletion requests.

## Database And Privacy

The automatically created schema is in `server/schema.sql`. The SQLite file stores enquiry type, status, timestamp, consent version, token hash, and an AES-256-GCM encrypted payload with a unique IV and authentication tag. Customer contact details are never stored in plaintext columns. The record ID is authenticated as additional encryption data. The server key is not sent to the browser.

Records are purged at startup and hourly after `RETENTION_DAYS` (default 180). CLI reads also enforce retention. Configure this period to your approved legal policy. Restrict the database directory, use encrypted backups, and protect the encryption key separately. Back up the database using SQLite's backup API or a safe stopped-server snapshot, not by blindly copying a live WAL database. Losing the key makes saved data unrecoverable. Key rotation requires a deliberate decrypt/re-encrypt migration; changing the environment value alone will break old records. Operational hosting logs and backups require their own retention policy.

## Production Deployment

Deploy the Node server and frontend together on a service with persistent private disk. A static-only deployment will not process forms. SQLite is suitable for a single-instance initial application, not horizontally scaled multi-writer deployments.

1. Run `npm ci`, then `npm run typecheck`, `npm test`, and `npm run build` in the build environment.
2. Provision a private persistent data directory, such as the platform's mounted disk. Set `DATA_DIR` to that path.
3. Generate a 32-byte encryption key using the command in `.env.example`. Store it as the private `PII_ENCRYPTION_KEY` environment variable. Do not expose it using a `VITE_` prefix. If migrating development records, use the existing development key rather than generating a replacement.
4. Set `NODE_ENV=production`, `SITE_URL` to the verified HTTPS origin, and the platform's `PORT`. Set verified contact information and approve policies. Only set `TRUST_PROXY_HOPS` to the exact trusted proxy count used by the platform.
5. Start with `npm start` behind an HTTPS-enabled reverse proxy. The server serves `dist/`, the API, SPA deep links, route-specific title/description metadata, canonical links, a sitemap, and a genuine HTTP 404 for unknown routes.
6. Verify `/api/health`, submit a real controlled enquiry, verify its encrypted record and staff review workflow, and test WhatsApp/Maps only after verified configuration is present.
7. Configure encrypted backups, monitoring, access controls, dependency updates, and a staff lead-review process. Keep a single instance until the database and rate-limit stores are migrated for scaling.

The production server uses a hash-based script Content Security Policy compatible with the preconfigured single-file Vite build, instead of allowing arbitrary inline JavaScript. Fonts and appliance images are local. Below-the-fold imagery is lazy loaded. TLS must be terminated by the hosting platform; it cannot be provisioned by frontend code.

## Tests

```bash
npm run typecheck
npm test
npx playwright install --with-deps chromium
npm run test:e2e
npm run build
npm run test:production
```

Browser tests start a separate isolated development server and data directory. Tests cover all public routes, links, responsive widths, product filtering, FAQ interaction, category prefill, every form flow, client/server validation, failed submissions, coverage fallbacks, and automated WCAG A/AA checks. Development private-file access is also tested. Backend tests exercise all schemas, replay/timing/honeypot protections, origin rejection, rate limiting, encryption, and configurable coverage. After building, the separate production test starts an isolated production server and checks real browser rendering and submission, hash-based CSP, compression, route metadata, sitemap, private-file protection, and HTTP 404 handling. Test data is synthetic and is not represented as real business details. Automated accessibility checks complement, but do not replace, a full manual assistive-technology audit.

## Content And Launch Checklist

Business phone, email, address, operating hours, coverage, operational capabilities, legal entity information, final commercial policies, and genuine approved reviews have not been supplied. Their placeholders are deliberate. Obtain business approval before public launch; do not treat this initial policy copy as legal advice. No third-party partnership, certification, experience statistic, price, guaranteed response time, or warranty commitment is fabricated. No payment gateway or notification provider is configured.

Appliance imagery is custom illustrative photography. Editorial technician image: Richard Low Hong / Pexels (photo 7347538). Kitchen image: Unsplash photo 1556912172-45b7abe8b7e1. These illustrate context and are not represented as Consumer Point premises or staff. The vector brand mark is an adapted implementation of the supplied CP/house identity; replace it with an official vector master if provided.
