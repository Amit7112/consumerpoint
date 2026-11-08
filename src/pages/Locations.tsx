import { useState, type FormEvent } from "react";
import {
  MapPin,
  Search,
  LoaderCircle,
  CircleHelp,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { applianceCategories } from "../../shared/validation.mjs";
import { CheckList, PageHero, SEO } from "../components/UI";
import PinCodeChecker from "../components/PinCodeChecker";

type CoverageResult = {
  status: "available" | "unavailable" | "unconfirmed";
  message: string;
};

export default function Locations() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CoverageResult | null>(null);

  async function check(event: FormEvent) {
    event.preventDefault();
    setError("");
    setResult(null);
    if (
      location.trim().length < 2 ||
      location.trim().length > 80 ||
      (/^\d+$/.test(location.trim()) && !/^[1-9]\d{5}$/.test(location.trim()))
    ) {
      setError("Enter a city name or a valid 6-digit Indian PIN code.");
      return;
    }
    if (!category) {
      setError("Choose the appliance category you need support for.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `/api/coverage?location=${encodeURIComponent(location.trim())}&category=${encodeURIComponent(category)}`,
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setResult(data);
    } catch {
      setResult({
        status: "unconfirmed",
        message:
          "The coverage checker is unavailable right now. Please send an enquiry with your city or PIN code so the team can confirm availability.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SEO
        title="Appliance Service Locations & PIN Coverage | Prayagraj, Bhadohi, Kaushambi, Jaunpur"
        description="Check verified doorstep appliance repair and installation coverage across 430+ locations in Prayagraj, Bhadohi, Kaushambi, and Jaunpur. Instant PIN code verification."
      />

      <PageHero
        eyebrow="Service Locations & Network"
        title="Check service availability in your area."
      >
        Serving 430+ post office locations and PIN codes across Prayagraj,
        Bhadohi, Kaushambi, and Jaunpur. Enter your 6-digit PIN code below for instant confirmation.
      </PageHero>

      {/* Main PIN Code Availability Checker & Directory Section */}
      <PinCodeChecker showDirectory={true} />

      {/* Secondary: Appliance Category Specific Verification */}
      <section className="section appliance-coverage-section">
        <div className="container coverage-layout">
          <form
            className="coverage-form"
            onSubmit={check}
            noValidate
            aria-label="Check appliance-specific service availability"
          >
            <h2>Check by Appliance Category</h2>
            <p>
              Verify whether technician capacity and spare parts are confirmed for your
              specific appliance type in your area.
            </p>
            <div className="field">
              <label className="field-label" htmlFor="coverage-location">
                City or PIN code <span className="required">*</span>
              </label>
              <input
                id="coverage-location"
                className="form-control"
                required
                value={location}
                maxLength={80}
                onChange={(event) => {
                  setLocation(event.target.value);
                  setResult(null);
                  setError("");
                }}
                placeholder="e.g. 222001 or Jaunpur"
                aria-describedby={error ? "coverage-error" : undefined}
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="coverage-category">
                Appliance category <span className="required">*</span>
              </label>
              <select
                id="coverage-category"
                className="form-control"
                required
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setResult(null);
                  setError("");
                }}
              >
                <option value="">Choose an appliance</option>
                {applianceCategories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            {error && (
              <p id="coverage-error" className="field-error" role="alert">
                {error}
              </p>
            )}
            <button
              className="button button-primary"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <LoaderCircle size={16} className="spinner" />
              ) : (
                <Search size={16} />
              )}
              Verify Appliance Coverage
            </button>
            {result && (
              <div className="coverage-result" role="status">
                {result.status === "available" ? (
                  <CheckCircle2 size={26} />
                ) : (
                  <CircleHelp size={26} />
                )}
                <h3>
                  {result.status === "available"
                    ? "Your area is listed."
                    : result.status === "unavailable"
                      ? "Your area is not currently listed."
                      : "Let us confirm that for you."}
                </h3>
                <p>{result.message}</p>
                <Link
                  className="text-link"
                  to={`/contact?type=Service%20Request&category=${encodeURIComponent(category)}#enquiry-form`}
                >
                  Send a location enquiry
                  <MapPin size={14} />
                </Link>
              </div>
            )}
          </form>

          <div className="coverage-copy">
            <p className="eyebrow">
              <span />
              CLARITY BEFORE COMMITMENT
            </p>
            <h2>
              Your location.
              <br />
              Your appliance.
              <br />A confirmed next step.
            </h2>
            <p>
              Service coverage can vary by appliance type, brand, spare part availability,
              and technician schedule. An area listing confirms our service reach.
            </p>
            <CheckList
              items={[
                "Enter your exact 6-digit PIN code for instant verification.",
                "View related head offices and sub-district post offices.",
                "Click 'Enquire on WhatsApp' for rapid confirmation with our coordination desk.",
                "Transparent diagnostic charges agreed before any visit.",
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
