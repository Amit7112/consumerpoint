import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Wrench,
  ArrowUpRight,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Brand } from "./Brand";
import { navigation } from "../data";
import { useBusiness, whatsappUrl } from "../config";
import { RouteEffects } from "./UI";

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink to={item.path} key={item.path} end={item.path === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/services#service-request"
          className="button button-primary header-cta"
        >
          <Wrench size={15} />
          Request a Service
          <ArrowUpRight size={15} />
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {navigation.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              end={item.path === "/"}
              onClick={() => setOpen(false)}
            >
              {item.label}
              <ArrowUpRight size={16} />
            </NavLink>
          ))}
          <Link
            className="button button-primary"
            to="/services#service-request"
            onClick={() => setOpen(false)}
          >
            Request a Service
            <Wrench size={16} />
          </Link>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand light />
            <p>
              For the appliances you choose.
              <br />
              And the care that comes after.
            </p>
            <Link className="footer-contact-link" to="/contact">
              Start a conversation
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div>
            <h3>Explore</h3>
            <ul>
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Here to help</h3>
            <ul>
              <li>
                <Link to="/services#service-request">Request a Service</Link>
              </li>
              <li>
                <Link to="/amc-maintenance">AMC & Maintenance</Link>
              </li>
              <li>
                <Link to="/service-locations">Service Locations</Link>
              </li>
              <li>
                <Link to="/faq">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>The important details</h3>
            <ul>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/service-policy">Service Policy</Link>
              </li>
              <li>
                <Link to="/refund-cancellation-policy">
                  Refund & Cancellation
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Consumer Point. All rights
            reserved.
          </p>
          <p>
            A little more care. A better everyday.
            <ArrowRight size={15} />
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const business = useBusiness();
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <RouteEffects />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      {/^\+?[1-9]\d{9,14}$/.test(business.whatsapp || "919805350321") && (
        <a
          className="whatsapp-float"
          href={whatsappUrl(business.whatsapp || "919805350321")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enquire on WhatsApp"
        >
          <MessageCircle size={25} />
        </a>
      )}
    </>
  );
}
