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
}: {
  title: string;
  description: string;
}) {
  useEffect(() => {
    document.title = `${title} | Consumer Point`;
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", `${title} | Consumer Point`);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonical)
      canonical.href = new URL(
        window.location.pathname.replace(/\/$/, "") || "/",
        canonical.href,
      ).href;
  }, [title, description]);
  return null;
}
