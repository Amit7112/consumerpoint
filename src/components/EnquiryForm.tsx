import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
  MessageCircle,
} from "lucide-react";
import { formatEnquiryForWhatsApp, getWhatsAppUrl } from "../utils/whatsapp";
import {
  applianceCategories,
  businessTypes,
  enquiryTypes,
  indiaToday,
  partnershipServices,
  planNames,
  validateEnquiry,
  volumes,
  type EnquiryData,
  type EnquiryKind,
} from "../../shared/validation.mjs";

type FieldOptions = {
  required?: boolean;
  optional?: boolean;
  type?: string;
  options?: string[];
  placeholder?: string;
  hint?: string;
  full?: boolean;
  min?: string;
  maxLength?: number;
  autoComplete?: string;
};
type FieldProps = FieldOptions & {
  name: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

function Field({
  name,
  label,
  value,
  error,
  onChange,
  required,
  optional,
  type = "text",
  options,
  placeholder,
  hint,
  full,
  min,
  maxLength,
  autoComplete,
}: FieldProps) {
  const common = {
    id: name,
    name,
    value,
    required,
    "aria-required": required,
    "aria-invalid": Boolean(error),
    "aria-describedby": error
      ? `${name}-error`
      : hint
        ? `${name}-hint`
        : undefined,
    className: "form-control",
  };
  return (
    <div className={`field ${full ? "field-full" : ""}`}>
      <label className="field-label" htmlFor={name}>
        {label}
        {required && <span className="required">*</span>}
        {optional && <span className="field-optional">(optional)</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          {...common}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          maxLength={maxLength ?? 3000}
          rows={4}
        />
      ) : options ? (
        <select {...common} onChange={(event) => onChange(event.target.value)}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          type={type}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          min={min}
          maxLength={maxLength ?? 150}
          autoComplete={autoComplete}
          inputMode={
            type === "tel" ? "tel" : name === "pin" ? "numeric" : undefined
          }
        />
      )}
      {error && (
        <p className="field-error" id={`${name}-error`}>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="field-hint" id={`${name}-hint`}>
          {hint}
        </p>
      )}
    </div>
  );
}

function initialData(kind: EnquiryKind, params: URLSearchParams): EnquiryData {
  const base = { name: "", phone: "", email: "", consent: false };
  const category = applianceCategories.includes(params.get("category") || "")
    ? params.get("category") || ""
    : "";
  if (kind === "service")
    return {
      ...base,
      city: "",
      pin: "",
      category,
      brandModel: "",
      message:
        params.get("type") === "Installation"
          ? "I would like to enquire about appliance installation."
          : "",
      preferredDate: "",
      contactMethod: "Phone",
    };
  if (kind === "amc")
    return {
      ...base,
      city: "",
      pin: "",
      category: "",
      plan: planNames.includes(params.get("plan") || "")
        ? params.get("plan") || ""
        : "",
      applianceCount: "1",
      message: "",
      contactMethod: "Phone",
    };
  if (kind === "partnership")
    return {
      ...base,
      company: "",
      businessType: "",
      requiredServices: [],
      territories: "",
      volume: "",
      message: "",
    };
  return {
    ...base,
    enquiryType: enquiryTypes.includes(params.get("type") || "")
      ? params.get("type") || ""
      : "General Enquiry",
    category,
    message: category
      ? `I would like to enquire about ${category.toLowerCase()}.`
      : "",
  };
}

const submitLabels: Record<EnquiryKind, string> = {
  contact: "Send Enquiry",
  service: "Submit Service Request",
  amc: "Request an AMC Proposal",
  partnership: "Send Partnership Enquiry",
};

export default function EnquiryForm({
  kind = "contact",
}: {
  kind?: EnquiryKind;
}) {
  const [params] = useSearchParams();
  const queryString = params.toString();
  const [values, setValues] = useState<EnquiryData>(() =>
    initialData(kind, params),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [reference, setReference] = useState("");
  const [waLink, setWaLink] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const token = useRef({ value: "", obtained: 0 });
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  async function loadToken() {
    const response = await fetch("/api/form-token");
    const data = await response.json();
    if (!response.ok)
      throw new Error(
        data.message ||
          "The secure connection could not be established. Please try again.",
      );
    token.current = { value: data.token, obtained: Date.now() };
    return token.current;
  }

  useEffect(() => {
    loadToken().catch(() => {});
  }, []);
  useEffect(() => {
    setValues((previous) => {
      const fresh = initialData(kind, new URLSearchParams(queryString));
      return {
        ...previous,
        ...(fresh.category ? { category: fresh.category } : {}),
        ...(kind === "contact" ? { enquiryType: fresh.enquiryType } : {}),
        ...(kind === "amc" && fresh.plan ? { plan: fresh.plan } : {}),
        ...(kind === "service" && fresh.message
          ? { message: fresh.message }
          : {}),
      };
    });
  }, [queryString, kind]);

  function update(name: string, value: string | boolean | string[]) {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => {
      const next = { ...previous };
      delete next[name];
      return next;
    });
  }

  function field(name: string, label: string, options: FieldOptions = {}) {
    return (
      <Field
        key={name}
        name={name}
        label={label}
        value={String(values[name] ?? "")}
        error={errors[name]}
        onChange={(value) => update(name, value)}
        {...options}
      />
    );
  }

  function focusError(fieldErrors: Record<string, string>) {
    const name = Object.keys(fieldErrors)[0];
    formRef.current?.querySelector<HTMLElement>(`[name="${name}"]`)?.focus();
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (loading) return;
    setFormError("");
    const validation = validateEnquiry(kind, values);
    if (!validation.success) {
      setErrors(validation.errors);
      focusError(validation.errors);
      return;
    }
    setLoading(true);
    try {
      if (
        !token.current.value ||
        Date.now() - token.current.obtained > 100 * 60 * 1000
      )
        await loadToken();
      // A signed, time-bound challenge and a honeypot supplement server-side rate limiting.
      const wait = Math.max(0, 1100 - (Date.now() - token.current.obtained));
      if (wait)
        await new Promise((resolve) => window.setTimeout(resolve, wait));
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          data: validation.data,
          token: token.current.value,
          website: honeypot,
        }),
      });
      const result = await response.json().catch(() => ({
        message: "The server could not process your request. Please try again.",
      }));
      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
          focusError(result.errors);
        }
        if (response.status === 403) token.current.value = "";
        throw new Error(
          result.message || "Your request was not saved. Please try again.",
        );
      }
      setReference(result.reference);
      const formatted = formatEnquiryForWhatsApp(
        kind,
        validation.data || values,
        result.reference,
      );
      const waUrl = getWhatsAppUrl(formatted, "919805350321");
      setWaLink(waUrl);
      try {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      } catch {
        // Handled by on-screen WhatsApp action button
      }
      token.current.value = "";
      window.setTimeout(() => successRef.current?.focus(), 50);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Unable to connect. Your details have not been saved. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (reference)
    return (
      <div className="enquiry-form">
        <div
          className="form-success"
          role="status"
          tabIndex={-1}
          ref={successRef}
        >
          <CheckCircle2 size={48} strokeWidth={1.4} />
          <h3>Your enquiry is in.</h3>
          <p>
            Your request has been securely recorded for the Consumer Point team
            to review. Please keep your reference for follow-up.
          </p>
          <strong className="reference-label">REFERENCE: {reference}</strong>

          <div className="whatsapp-forward-card">
            <a
              href={
                waLink ||
                getWhatsAppUrl(
                  formatEnquiryForWhatsApp(kind, values, reference),
                  "919805350321",
                )
              }
              target="_blank"
              rel="noopener noreferrer"
              className="button button-whatsapp-action"
            >
              <MessageCircle size={18} />
              Open WhatsApp Chat (9805350321)
            </a>
            <p className="whatsapp-help-note">
              Click above to send your complete enquiry directly to{" "}
              <strong>9805350321</strong> on WhatsApp.
            </p>
          </div>

          <p>
            This is an enquiry confirmation, not a confirmed appointment or
            service commitment.
          </p>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              setReference("");
              setWaLink("");
              setValues(initialData(kind, params));
              setErrors({});
              setFormError("");
              setHoneypot("");
              loadToken().catch(() => {});
            }}
          >
            Send another enquiry
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    );

  return (
    <form
      className="enquiry-form"
      onSubmit={submit}
      noValidate
      ref={formRef}
      aria-label={submitLabels[kind]}
    >
      <p className="required-note">
        Fields marked <span>*</span> are required.
      </p>
      {formError && (
        <div className="form-alert" role="alert">
          {formError}
        </div>
      )}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`website-${kind}`}>Website</label>
        <input
          id={`website-${kind}`}
          name="website"
          tabIndex={-1}
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          autoComplete="off"
        />
      </div>
      <div className="form-grid">
        {kind === "partnership" &&
          field("company", "Company name", {
            required: true,
            full: true,
            autoComplete: "organization",
            placeholder: "Your company or organisation",
          })}
        {field(
          "name",
          kind === "partnership" ? "Contact person's name" : "Your name",
          {
            required: true,
            placeholder: "Full name",
            autoComplete: "name",
            maxLength: 80,
          },
        )}
        {field("phone", "Mobile number", {
          required: true,
          type: "tel",
          placeholder: "10-digit mobile number",
          autoComplete: "tel",
          maxLength: 20,
        })}
        {field(
          "email",
          kind === "partnership" ? "Business email" : "Email address",
          {
            required:
              kind === "partnership" || values.contactMethod === "Email",
            optional:
              kind !== "partnership" && values.contactMethod !== "Email",
            type: "email",
            autoComplete: "email",
            placeholder:
              kind === "partnership" ? "you@company.com" : "you@example.com",
            full: kind === "service",
            maxLength: 254,
          },
        )}
        {kind === "contact" &&
          field("enquiryType", "Enquiry type", {
            required: true,
            options: enquiryTypes,
          })}
        {(kind === "service" || kind === "amc") && (
          <>
            {field("city", "City", {
              required: true,
              placeholder: "Your city",
              autoComplete: "address-level2",
              maxLength: 80,
            })}
            {field("pin", "PIN code", {
              required: true,
              placeholder: "6-digit PIN code",
              autoComplete: "postal-code",
              maxLength: 6,
            })}
          </>
        )}
        {(kind === "service" ||
          kind === "amc" ||
          (kind === "contact" &&
            ["Product Enquiry", "Installation", "Service Request"].includes(
              String(values.enquiryType),
            ))) &&
          field("category", "Appliance category", {
            required: kind !== "contact",
            optional: kind === "contact",
            options:
              kind === "amc"
                ? [...applianceCategories, "Multiple appliances"]
                : applianceCategories,
            full: kind === "contact",
          })}
        {kind === "service" &&
          field("brandModel", "Brand & model", {
            optional: true,
            placeholder: "If you know it",
            maxLength: 150,
          })}
        {kind === "amc" && (
          <>
            {field("applianceCount", "Number of appliances", {
              required: true,
              type: "number",
              min: "1",
              placeholder: "1",
            })}
            {field("plan", "Maintenance plan", {
              required: true,
              options: planNames,
              full: true,
            })}
          </>
        )}
        {kind === "partnership" && (
          <>
            {field("businessType", "Business type", {
              required: true,
              options: businessTypes,
            })}
            <fieldset
              className="field-full"
              style={{ border: 0, padding: 0, margin: 0 }}
            >
              <legend className="field-label">
                Required services <span className="required">*</span>
              </legend>
              <div className="checkbox-group">
                {partnershipServices.map((service) => (
                  <label className="checkbox-option" key={service}>
                    <input
                      type="checkbox"
                      name="requiredServices"
                      value={service}
                      checked={(values.requiredServices as string[]).includes(
                        service,
                      )}
                      onChange={(event) =>
                        update(
                          "requiredServices",
                          event.target.checked
                            ? [
                                ...(values.requiredServices as string[]),
                                service,
                              ]
                            : (values.requiredServices as string[]).filter(
                                (item) => item !== service,
                              ),
                        )
                      }
                      aria-describedby={
                        errors.requiredServices
                          ? "requiredServices-error"
                          : undefined
                      }
                    />
                    {service}
                  </label>
                ))}
              </div>
              {errors.requiredServices && (
                <p className="field-error" id="requiredServices-error">
                  {errors.requiredServices}
                </p>
              )}
            </fieldset>
            {field("territories", "Required cities or PIN codes", {
              required: true,
              full: true,
              placeholder: "Tell us where support is needed",
              maxLength: 1000,
            })}
            {field("volume", "Estimated monthly service volume", {
              required: true,
              full: true,
              options: volumes,
            })}
          </>
        )}
        {field(
          "message",
          kind === "partnership"
            ? "Additional requirements"
            : kind === "service"
              ? "Tell us about the problem"
              : kind === "amc"
                ? "Your maintenance requirements"
                : "How can we help?",
          {
            required: kind !== "partnership",
            optional: kind === "partnership",
            full: true,
            type: "textarea",
            placeholder:
              kind === "service"
                ? "Describe the issue, when it started, and anything we should know."
                : "Share a few details so we can understand what you need.",
          },
        )}
        {kind === "service" &&
          field("preferredDate", "Preferred appointment date", {
            optional: true,
            type: "date",
            min: indiaToday(),
            hint: "A preference only. Subject to confirmation.",
          })}
        {(kind === "service" || kind === "amc") &&
          field("contactMethod", "Preferred contact method", {
            required: true,
            options: ["Phone", "Email", "WhatsApp"],
            full: kind === "amc",
          })}
      </div>
      <div className="consent-field">
        <label className="checkbox-option">
          <input
            name="consent"
            type="checkbox"
            checked={Boolean(values.consent)}
            onChange={(event) => update("consent", event.target.checked)}
            aria-required="true"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I agree to be contacted by Consumer Point about this enquiry and
            have read the{" "}
            <Link
              to="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
            . My details will not be used for unrelated marketing.
          </span>
        </label>
        {errors.consent && (
          <p className="field-error" id="consent-error">
            {errors.consent}
          </p>
        )}
      </div>
      <button
        className="button button-primary form-submit"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <>
            <LoaderCircle size={17} className="spinner" />
            Securely submitting...
          </>
        ) : (
          <>
            {submitLabels[kind]}
            <ArrowUpRight size={17} />
          </>
        )}
      </button>
      <p className="form-privacy">
        <LockKeyhole size={12} />
        Your details are used to handle this enquiry. Availability, scope,
        charges, and appointments are confirmed separately.
      </p>
    </form>
  );
}
