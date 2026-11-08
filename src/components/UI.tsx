import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  ArrowRight,
  Home,
  Check,
} from "lucide-react";
import { faqs } from "../data";

export function ArrowLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link className={`text-link ${className}`} to={to}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}

export function ButtonLink({
  to,
  children,
  secondary = false,
  light = false,
  className = "",
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${light ? "button-light" : ""} ${className}`}
    >
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`section-heading ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <p className="eyebrow">
          <span />
          {eyebrow}
        </p>
      )}
      <h2>{title}</h2>
      {children && <p className="section-description">{children}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <nav aria-label="Breadcrumb" className="breadcrumbs">
          <Link to="/">
            <Home size={13} />
            Home
          </Link>
          <ArrowRight size={12} />
          <span>{eyebrow}</span>
        </nav>
        <Reveal>
          <p className="eyebrow">
            <span />
            CONSUMER POINT / {eyebrow}
          </p>
          <h1>{title}</h1>
          <p className="page-hero-description">{children}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function CheckList({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={`check-list ${className}`}>
      {items.map((item) => (
        <li key={item}>
          <Check size={17} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const items = faqs;
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-container">
        <Reveal>
          <SectionHeading
            eyebrow="A LITTLE CLARITY GOES A LONG WAY"
            title="Good questions. Clear answers."
            center
          >
            Everything you need to know before getting in touch.
          </SectionHeading>
        </Reveal>
        <div className="accordion">
          {items.map((item, index) => (
            <div
              className={`accordion-item ${open === index ? "is-open" : ""}`}
              key={item.question}
            >
              <h3>
                <button
                  onClick={() => setOpen(open === index ? null : index)}
                  aria-expanded={open === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  {item.question}
                  <ChevronDown size={19} />
                </button>
              </h3>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                hidden={open !== index}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="faq-contact">
          Have something else in mind?{" "}
          <Link to="/contact">
            Let's talk <ArrowUpRight size={14} />
          </Link>
        </p>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container">
        <Reveal>
          <p className="eyebrow">
            <span />
            LET'S MAKE THINGS EASIER
          </p>
          <h2>How can we help you today?</h2>
          <p>
            For your next appliance, a little expert help, or a new business
            possibility.
            <br className="desktop-break" /> Whatever you need, it starts with a
            conversation.
          </p>
          <div className="button-group">
            <ButtonLink to="/services#service-request">
              Request a Service
            </ButtonLink>
            <ButtonLink to="/contact" secondary>
              Contact Us
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function RouteEffects() {
  const { pathname, hash, search } = useLocation();
  useEffect(() => {
    if (hash) {
      const timer = window.setTimeout(
        () =>
          document
            .getElementById(hash.slice(1))
            ?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
              block: "start",
            }),
        150,
      );
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash, search]);
  return null;
}

export function SEO({
  title,
  description,
  noindex = false,
  canonicalPath,
  schema,
}: {
  title: string;
  description: string;
  noindex?: boolean;
  canonicalPath?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
}) {
  useEffect(() => {
    // 1. Title formatting
    const formattedTitle = title.includes("Consumer Point")
      ? title
      : `${title} | Consumer Point`;
    document.title = formattedTitle;

    // Helper to get or create a tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Primary Meta Tags
    setMeta("name", "description", description);
    setMeta(
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    setMeta("name", "author", "Consumer Point");
    setMeta("name", "geo.region", "IN-UP");
    setMeta("name", "geo.placename", "Uttar Pradesh, India");

    // 3. Canonical URL
    const origin =
      window.location.origin === "null" || !window.location.origin.startsWith("http")
        ? "https://www.consumerpoint.co.in"
        : window.location.origin;
    const targetPath = canonicalPath || window.location.pathname.replace(/\/$/, "") || "/";
    const canonicalHref = `${origin}${targetPath}`;

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;

    // 4. Open Graph Metadata
    const ogImage = `${origin}/images/og-image.jpg`;
    setMeta("property", "og:title", formattedTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalHref);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Consumer Point");
    setMeta("property", "og:locale", "en_IN");
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", "Consumer Point Home Appliance Service, Repair and Installation");

    // 5. Twitter / X Cards
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", formattedTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // 6. Schema.org JSON-LD Structured Data
    if (schema) {
      let scriptTag = document.querySelector<HTMLScriptElement>("#schema-seo-dynamic");
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "schema-seo-dynamic";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    }
  }, [title, description, noindex, canonicalPath, schema]);

  return null;
}
