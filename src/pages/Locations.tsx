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
import { useBusiness } from "../config";

type CoverageResult = {
  status: "available" | "unavailable" | "unconfirmed";
  message: string;
};

export default function Locations() {
  const business = useBusiness();
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
        title="Check Appliance Service Locations"
        description="Check service availability by city or Indian PIN code. Consumer Point confirms appliance eligibility and local service coverage before an appointment is agreed."
      />
      <PageHero
        eyebrow="Service Locations"
        title="Good service starts with the right location."
      >
        Tell us where you need support. Coverage is checked by appliance
        category and confirmed before any visit is arranged.
      </PageHero>
      <section className="section">
        <div className="container coverage-layout">
          <form
            className="coverage-form"
            onSubmit={check}
            noValidate
            aria-label="Check service availability"
          >
            <h2>Let's check your area.</h2>
            <p>Enter your city or PIN code and choose an appliance.</p>
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
                placeholder="Your city or 6-digit PIN code"
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
              Check Availability
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
              Service coverage can vary by appliance, brand, type of work, and
              local capacity. An area listing is not a guaranteed appointment.
            </p>
            <CheckList
              items={[
                "Share your exact city and PIN code.",
                "Tell us the appliance category and service needed.",
                "Wait for the team to confirm scope and charges.",
                "Agree on arrangements before a visit is booked.",
              ]}
            />
            {!business.coveragePublished && (
              <p>
                Verified service-area data has not yet been published. Until it
                is configured, this checker will ask you to contact the team
                rather than confirm availability.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
