import { useState, useEffect, type FormEvent } from "react";
import {
  Zap,
  Wind,
  Refrigerator,
  Wrench,
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Briefcase,
  Sparkles,
  LockKeyhole,
} from "lucide-react";
import { Reveal, SEO } from "../components/UI";
import { careerRoles, experienceLevels } from "../data";

const whoCanApply = [
  {
    icon: Zap,
    title: "Electricians",
    description:
      "Residential & commercial wiring, switchgear installations, and electrical safety audits.",
  },
  {
    icon: Wind,
    title: "AC Technicians",
    description:
      "Split, inverter, and window AC diagnostics, precision mounting, and refrigerant servicing.",
  },
  {
    icon: Refrigerator,
    title: "Refrigerator & Washer Specialists",
    description:
      "Inverter compressor repairs, front/top load washer motors, and PCB fault diagnostics.",
  },
  {
    icon: Wrench,
    title: "Home Appliance Technicians",
    description:
      "Geysers, water purifiers, microwave ovens, kitchen appliances, and small electricals.",
  },
];

const whyJoinUs = [
  {
    icon: Briefcase,
    title: "Steady Service Calls",
    description:
      "Consistent, organized work requests across households, commercial clients, and brand partners.",
  },
  {
    icon: Award,
    title: "Skill Growth & Modern Tooling",
    description:
      "Hands-on experience with modern multi-brand inverter appliances and professional diagnostic gear.",
  },
  {
    icon: ShieldCheck,
    title: "Fair Terms & Respect",
    description:
      "Transparent compensation, worker safety protocols, and a culture that values skilled craftsmanship.",
  },
];

export default function Careers() {
  // Form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState<string>(careerRoles[0]);
  const [experience, setExperience] = useState<string>(experienceLevels[1]);
  const [skills, setSkills] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [token, setToken] = useState("");

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const fetchToken = async () => {
    try {
      const res = await fetch("/api/form-token");
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
      }
    } catch {
      // Token fetch fail
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    if (!consent) {
      setErrorMessage("Please consent to the processing of your application information.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "career",
          data: {
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            location: location.trim(),
            role,
            experience,
            skills: skills.trim(),
            introduction: introduction.trim(),
            resumeLink: resumeLink.trim(),
            consent,
          },
          token,
          website: honeypot,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        if (result.errors) setFieldErrors(result.errors);
        setErrorMessage(
          result.message || "Failed to submit application. Please check the fields and try again.",
        );
        fetchToken();
        return;
      }

      setReference(result.reference || "CP-APPLICATION");
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      fetchToken();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Careers & Recruitment for Electricians & Technicians"
        description="Build your career with Consumer Point. Work opportunities for electricians, AC technicians, refrigerator & washing machine specialists, and field service professionals."
      />

      {/* Hero Section */}
      <section className="career-hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">
              <span />
              CAREERS & RECRUITMENT
            </p>
            <h1 className="career-hero-title">
              Build Your Career with
              <br />
              <span>Consumer Point.</span>
            </h1>
            <p className="career-hero-subtext">
              Are you an electrician, AC technician, appliance repair professional,
              or skilled service technician? Join our growing team and build your
              future with Consumer Point.
            </p>
            <div className="career-hero-buttons">
              <a href="#apply" className="button button-primary">
                Apply as a Technician
                <ArrowRight size={16} />
              </a>
            </div>
            <p className="career-hero-trust">
              <Sparkles size={16} className="trust-icon" />
              Skilled Professionals. Better Service. Stronger Careers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Section A: Who Can Apply? */}
      <section className="section who-can-apply-section">
        <div className="container">
          <Reveal>
            <div className="section-head-center">
              <p className="eyebrow">OPPORTUNITIES ACROSS ALL APPLIANCES</p>
              <h2>Who Can Apply?</h2>
              <p>
                We welcome skilled technical and operational talent ready to deliver
                exceptional service standards to households and commercial partners.
              </p>
            </div>
          </Reveal>

          <div className="role-cards-grid">
            {whoCanApply.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.04}>
                <div className="role-card">
                  <div className="role-icon-box">
                    <item.icon size={26} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="section-footnote" style={{ textAlign: "center", marginTop: 24 }}>
            Also welcoming applications from service coordinators, ITI / Diploma holders, and field executives.
          </p>
        </div>
      </section>

      {/* Section B: Why Join Consumer Point? */}
      <section className="section why-join-section">
        <div className="container">
          <Reveal>
            <div className="section-head-center">
              <p className="eyebrow">WORK WITH PURPOSE & INTEGRITY</p>
              <h2>Why Join Consumer Point?</h2>
              <p>
                We believe great customer service begins with respecting and empowering
                our technical workforce.
              </p>
            </div>
          </Reveal>

          <div className="benefits-cards-grid">
            {whyJoinUs.map((b, idx) => (
              <Reveal key={b.title} delay={idx * 0.05}>
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <b.icon size={24} />
                  </div>
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="career-compliance-note">
            <p>
              * Note: Consumer Point provides structured work opportunities based on
              merit, technical qualifications, and operational requirements. Terms of
              engagement, scope of work, and compensation are discussed and agreed in
              writing upon evaluation.
            </p>
          </div>
        </div>
      </section>

      {/* Section C: Application Form */}
      <section className="section career-form-section" id="apply">
        <div className="container">
          <div className="career-form-layout">
            <Reveal className="career-form-intro">
              <p className="eyebrow">
                <span />
                APPLICATION FORM
              </p>
              <h2>Submit Your Application</h2>
              <p>
                Fill out the form below with your technical background, experience,
                and preferred work location. Our operations team reviews all
                submissions and contacts qualified candidates for interview and
                practical skill assessment.
              </p>

              <div className="form-feature-list">
                <div className="feature-item">
                  <CheckCircle2 size={18} className="feat-icon" />
                  <span>Verified technical coordination network</span>
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={18} className="feat-icon" />
                  <span>Equal opportunity recruitment for all skilled workers</span>
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={18} className="feat-icon" />
                  <span>Respect for worker safety and ethical practices</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="career-form-card" delay={0.1}>
              {reference ? (
                <div className="application-success-box">
                  <CheckCircle2 size={54} className="success-icon" />
                  <h3>Application Submitted Successfully!</h3>
                  <p>
                    Thank you for applying to Consumer Point. Your application has been
                    securely recorded in our recruitment database.
                  </p>
                  <div className="reference-pill">
                    <span>Application Reference:</span>
                    <strong>{reference}</strong>
                  </div>
                  <p className="reference-subtext">
                    Please note down this reference. Our technical operations manager will
                    review your profile and contact you on your registered phone number.
                  </p>
                  <button
                    type="button"
                    className="button button-outline"
                    onClick={() => {
                      setReference(null);
                      setName("");
                      setPhone("");
                      setEmail("");
                      setLocation("");
                      setSkills("");
                      setIntroduction("");
                      setResumeLink("");
                      setConsent(false);
                      fetchToken();
                    }}
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="career-form">
                  {/* Honeypot anti-spam */}
                  <div className="honeypot" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {errorMessage && (
                    <div className="feedback-alert alert-error" role="alert">
                      <AlertCircle size={20} />
                      <div>
                        <strong>Notice:</strong> {errorMessage}
                      </div>
                    </div>
                  )}

                  <div className="form-grid-2">
                    {/* Full Name */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="app-name">
                        Full Name <span className="required">*</span>
                      </label>
                      <input
                        id="app-name"
                        type="text"
                        className={`form-input ${fieldErrors.name ? "input-error" : ""}`}
                        placeholder="e.g. Ramesh Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength={2}
                        maxLength={80}
                      />
                      {fieldErrors.name && (
                        <span className="field-error-msg">{fieldErrors.name}</span>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="app-phone">
                        Mobile Number <span className="required">*</span>
                      </label>
                      <input
                        id="app-phone"
                        type="tel"
                        className={`form-input ${fieldErrors.phone ? "input-error" : ""}`}
                        placeholder="10-digit mobile, e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                      {fieldErrors.phone && (
                        <span className="field-error-msg">{fieldErrors.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-grid-2">
                    {/* Email (Optional) */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="app-email">
                        Email Address <span className="optional-tag">(Optional)</span>
                      </label>
                      <input
                        id="app-email"
                        type="email"
                        className={`form-input ${fieldErrors.email ? "input-error" : ""}`}
                        placeholder="e.g. ramesh@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {fieldErrors.email && (
                        <span className="field-error-msg">{fieldErrors.email}</span>
                      )}
                    </div>

                    {/* City and Preferred Work Location */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="app-location">
                        City & Preferred Work Area <span className="required">*</span>
                      </label>
                      <input
                        id="app-location"
                        type="text"
                        className={`form-input ${fieldErrors.location ? "input-error" : ""}`}
                        placeholder="e.g. Mumbai, Navi Mumbai, Thane"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                      {fieldErrors.location && (
                        <span className="field-error-msg">{fieldErrors.location}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-grid-2">
                    {/* Job Role Applying For */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="app-role">
                        Job Role Applying For <span className="required">*</span>
                      </label>
                      <select
                        id="app-role"
                        className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                      >
                        {careerRoles.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Years of Experience */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="app-exp">
                        Years of Experience <span className="required">*</span>
                      </label>
                      <select
                        id="app-exp"
                        className="form-select"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                      >
                        {experienceLevels.map((lvl) => (
                          <option key={lvl} value={lvl}>
                            {lvl}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Technical Skills and Specialization */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="app-skills">
                      Technical Skills & Specialization <span className="required">*</span>
                    </label>
                    <textarea
                      id="app-skills"
                      className={`form-textarea ${fieldErrors.skills ? "input-error" : ""}`}
                      rows={3}
                      placeholder="e.g. Inverter AC installation, PCB diagnosis, gas charging, washing machine motor repair, 3-phase commercial wiring..."
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      required
                      minLength={2}
                      maxLength={500}
                    />
                    {fieldErrors.skills && (
                      <span className="field-error-msg">{fieldErrors.skills}</span>
                    )}
                  </div>

                  {/* Short Introduction */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="app-intro">
                      Short Introduction / About Yourself <span className="required">*</span>
                    </label>
                    <textarea
                      id="app-intro"
                      className={`form-textarea ${fieldErrors.introduction ? "input-error" : ""}`}
                      rows={3}
                      placeholder="Tell us briefly about your past experience, certifications (ITI/Diploma), tools you own, and availability..."
                      value={introduction}
                      onChange={(e) => setIntroduction(e.target.value)}
                      required
                      minLength={5}
                      maxLength={2000}
                    />
                    {fieldErrors.introduction && (
                      <span className="field-error-msg">{fieldErrors.introduction}</span>
                    )}
                  </div>

                  {/* Upload Resume / Portfolio Link */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="app-resume">
                      Resume Link / Online Portfolio / Drive URL{" "}
                      <span className="optional-tag">(Optional)</span>
                    </label>
                    <input
                      id="app-resume"
                      type="url"
                      className="form-input"
                      placeholder="e.g. https://drive.google.com/your-resume or LinkedIn"
                      value={resumeLink}
                      onChange={(e) => setResumeLink(e.target.value)}
                      maxLength={500}
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="form-consent-box">
                    <label className="consent-label" htmlFor="app-consent">
                      <input
                        id="app-consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                      />
                      <span>
                        I consent to the processing of my application details by Consumer
                        Point for technical assessment and recruitment evaluation.{" "}
                        <span className="required">*</span>
                      </span>
                    </label>
                    {fieldErrors.consent && (
                      <span className="field-error-msg">{fieldErrors.consent}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="button button-primary submit-career-btn"
                  >
                    {submitting ? "Submitting Application..." : "Submit Application"}
                    <ArrowRight size={16} />
                  </button>

                  <p className="form-privacy-note">
                    <LockKeyhole size={13} />
                    <span>Your application details are encrypted and securely reviewed by our recruitment team.</span>
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
