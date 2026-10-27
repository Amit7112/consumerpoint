import { useEffect, useState, useTransition, type FormEvent } from "react";
import {
  Star,
  CheckCircle2,
  AlertCircle,
  MessageSquarePlus,
  ShieldCheck,
  Filter,
  Sparkles,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import { PageHero, Reveal, SEO } from "../components/UI";
import { feedbackServices } from "../data";


interface FeedbackItem {
  id: string;
  createdAt: string;
  name: string;
  service: string;
  rating: number;
  comment: string;
  verified: boolean;
}

interface FeedbackSummary {
  total: number;
  average: number;
  breakdown: Record<number, number>;
}

const ratingLabels: Record<number, { text: string; color: string }> = {
  5: { text: "Outstanding - Exceeded Expectations", color: "#10b981" },
  4: { text: "Very Good - Highly Satisfied", color: "#2563eb" },
  3: { text: "Good - Met Expectations", color: "#f59e0b" },
  2: { text: "Fair - Needs Improvement", color: "#f97316" },
  1: { text: "Poor - Unsatisfactory", color: "#ef4444" },
};

export default function FeedbackPage() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [summary, setSummary] = useState<FeedbackSummary>({
    total: 0,
    average: 5.0,
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });
  const [selectedService, setSelectedService] = useState<string>("All");
  const [selectedRating, setSelectedRating] = useState<number | "All">("All");
  const [loading, setLoading] = useState(true);

  // Form states
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState("");
  const [service, setService] = useState<string>(feedbackServices[0]);
  const [comment, setComment] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [token, setToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // Load reviews and summary
  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/feedback");
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        if (data.summary) setSummary(data.summary);
      }
    } catch (err) {
      console.error("Failed to load feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch form challenge token
  const fetchToken = async () => {
    try {
      const res = await fetch("/api/form-token");
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
      }
    } catch (err) {
      console.error("Failed to load token:", err);
    }
  };

  useEffect(() => {
    fetchFeedback();
    fetchToken();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!rating || rating < 1 || rating > 5) {
      setErrorMessage("Please select a star rating between 1 and 5.");
      return;
    }
    if (name.trim().length < 2) {
      setErrorMessage("Please enter your name (at least 2 characters).");
      return;
    }
    if (comment.trim().length < 5) {
      setErrorMessage("Please write a short review (at least 5 characters).");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            name: name.trim(),
            service,
            rating,
            comment: comment.trim(),
            verified: true,
          },
          token,
          website: honeypot,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        setErrorMessage(
          result.message || "Failed to submit feedback. Please try again.",
        );
        fetchToken();
        return;
      }

      setSuccessMessage(
        result.message || "Thank you! Your feedback has been published.",
      );
      if (result.item) {
        startTransition(() => {
          setItems((prev) => [result.item, ...prev]);
          if (result.summary) setSummary(result.summary);
        });
      }
      setName("");
      setComment("");
      setRating(5);
      fetchToken();
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      fetchToken();
    } finally {
      setSubmitting(false);
    }
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesService =
      selectedService === "All" || item.service === selectedService;
    const matchesRating =
      selectedRating === "All" || item.rating === selectedRating;
    return matchesService && matchesRating;
  });

  const activeRatingDisplay = hoverRating || rating;

  return (
    <>
      <SEO
        title="Customer Feedback & Service Reviews"
        description="Read verified customer reviews and share your experience with Consumer Point home appliance sales, installation, repairs, and AMC maintenance."
      />

      <PageHero
        eyebrow="Customer Reviews & Ratings"
        title="Real experiences from homes we serve."
      >
        Read genuine feedback from verified appliance sales and service customers,
        or share your own thoughts to help us keep improving.
      </PageHero>

      <section className="section feedback-section">
        <div className="container">
          <div className="feedback-layout">
            {/* Left Column: Rating Summary & Submission Form */}
            <div className="feedback-sidebar">
              {/* Aggregate Score Card */}
              <Reveal>
                <div className="feedback-score-card">
                  <div className="score-header">
                    <div className="score-big">{summary.average.toFixed(1)}</div>
                    <div className="score-stars">
                      <div className="star-row">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={20}
                            className={
                              star <= Math.round(summary.average)
                                ? "star-gold"
                                : "star-muted"
                            }
                            fill={
                              star <= Math.round(summary.average)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        ))}
                      </div>
                      <p className="score-subtext">
                        Based on {summary.total} verified{" "}
                        {summary.total === 1 ? "review" : "reviews"}
                      </p>
                    </div>
                  </div>

                  {/* Breakdown Bars */}
                  <div className="score-breakdown">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = summary.breakdown[stars] || 0;
                      const pct = summary.total
                        ? Math.round((count / summary.total) * 100)
                        : 0;
                      return (
                        <button
                          key={stars}
                          type="button"
                          className={`breakdown-row ${selectedRating === stars ? "active" : ""}`}
                          onClick={() =>
                            setSelectedRating((prev) =>
                              prev === stars ? "All" : stars,
                            )
                          }
                          aria-label={`Filter by ${stars} stars (${count} reviews)`}
                        >
                          <span className="breakdown-star-label">
                            {stars} <Star size={13} fill="currentColor" />
                          </span>
                          <div className="breakdown-bar-bg">
                            <div
                              className="breakdown-bar-fill"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="breakdown-count">{count}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="score-trust-badge">
                    <ShieldCheck size={18} className="trust-icon" />
                    <span>100% verified customer service reviews</span>
                  </div>
                </div>
              </Reveal>

              {/* Feedback Submission Form */}
              <Reveal delay={0.1}>
                <div className="feedback-form-card" id="leave-feedback">
                  <div className="form-card-title">
                    <MessageSquarePlus size={22} className="form-icon" />
                    <div>
                      <h3>Leave Your Feedback</h3>
                      <p>Tell us how your service or product enquiry went.</p>
                    </div>
                  </div>

                  {successMessage && (
                    <div className="feedback-alert alert-success" role="alert">
                      <CheckCircle2 size={20} />
                      <div>
                        <strong>Thank you!</strong> {successMessage}
                      </div>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="feedback-alert alert-error" role="alert">
                      <AlertCircle size={20} />
                      <div>
                        <strong>Notice:</strong> {errorMessage}
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="feedback-form">
                    {/* Honeypot anti-spam field */}
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

                    {/* Star Rating Interactive Selector */}
                    <div className="form-group">
                      <label className="form-label" id="star-rating-label">
                        Your Rating <span className="required">*</span>
                      </label>
                      <div
                        className="interactive-stars"
                        role="radiogroup"
                        aria-labelledby="star-rating-label"
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            role="radio"
                            aria-checked={rating === star}
                            aria-label={`${star} Star${star > 1 ? "s" : ""}`}
                            className={`star-button ${
                              star <= activeRatingDisplay ? "active" : ""
                            }`}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                          >
                            <Star
                              size={28}
                              fill={
                                star <= activeRatingDisplay
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>
                        ))}
                      </div>
                      <div
                        className="rating-sentiment"
                        style={{ color: ratingLabels[activeRatingDisplay]?.color }}
                      >
                        <Sparkles size={14} />
                        <span>{ratingLabels[activeRatingDisplay]?.text}</span>
                      </div>
                    </div>

                    {/* Service Used Dropdown */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="feedback-service">
                        Appliance / Service <span className="required">*</span>
                      </label>
                      <select
                        id="feedback-service"
                        className="form-select"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                      >
                        {feedbackServices.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Customer Name */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="feedback-name">
                        Your Name <span className="required">*</span>
                      </label>
                      <input
                        id="feedback-name"
                        type="text"
                        className="form-input"
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        minLength={2}
                        maxLength={80}
                        required
                      />
                    </div>

                    {/* Feedback Comment */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="feedback-comment">
                        Your Experience & Review <span className="required">*</span>
                      </label>
                      <textarea
                        id="feedback-comment"
                        className="form-textarea"
                        rows={4}
                        placeholder="Share details about the technician's punctuality, repair quality, diagnosis, or installation..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        minLength={5}
                        maxLength={1000}
                        required
                      />
                      <span className="character-count">
                        {comment.length} / 1000 characters
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="button button-primary submit-feedback-btn"
                    >
                      {submitting ? "Submitting Review..." : "Submit Feedback"}
                      <ArrowRight size={16} />
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Customer Reviews Feed */}
            <div className="feedback-content">
              {/* Filter Bar */}
              <div className="feedback-filters-bar">
                <div className="filters-header">
                  <Filter size={16} />
                  <span>Filter by Service:</span>
                </div>
                <div className="filter-chips">
                  <button
                    type="button"
                    className={`filter-chip ${selectedService === "All" ? "active" : ""}`}
                    onClick={() => setSelectedService("All")}
                  >
                    All Services ({items.length})
                  </button>
                  {feedbackServices.map((s) => {
                    const count = items.filter((i) => i.service === s).length;
                    if (count === 0) return null;
                    return (
                      <button
                        key={s}
                        type="button"
                        className={`filter-chip ${selectedService === s ? "active" : ""}`}
                        onClick={() => setSelectedService(s)}
                      >
                        {s} ({count})
                      </button>
                    );
                  })}
                </div>

                {selectedRating !== "All" && (
                  <div className="active-rating-filter">
                    <span>Showing only {selectedRating}-star reviews</span>
                    <button
                      type="button"
                      className="clear-filter"
                      onClick={() => setSelectedRating("All")}
                    >
                      Show all stars &times;
                    </button>
                  </div>
                )}
              </div>

              {/* Reviews List */}
              {loading ? (
                <div className="feedback-loading">
                  <div className="spinner" />
                  <p>Loading customer reviews...</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="feedback-empty">
                  <Star size={36} className="empty-icon" />
                  <h4>No reviews match this filter</h4>
                  <p>Try selecting another service category or star rating.</p>
                  <button
                    type="button"
                    className="button button-outline"
                    onClick={() => {
                      setSelectedService("All");
                      setSelectedRating("All");
                    }}
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="feedback-list">
                  {filteredItems.map((item, index) => {
                    const dateFormatted = new Date(item.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    );
                    const initials = item.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();

                    return (
                      <Reveal key={item.id} delay={(index % 4) * 0.05}>
                        <article className="review-card">
                          <div className="review-card-header">
                            <div className="reviewer-info">
                              <div className="reviewer-avatar">{initials}</div>
                              <div>
                                <h4 className="reviewer-name">{item.name}</h4>
                                <div className="reviewer-badge-row">
                                  <span className="verified-badge">
                                    <UserCheck size={12} />
                                    Verified Customer
                                  </span>
                                  <span className="review-date">{dateFormatted}</span>
                                </div>
                              </div>
                            </div>
                            <div
                              className="review-stars"
                              aria-label={`${item.rating} out of 5 stars`}
                            >
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={16}
                                  className={
                                    star <= item.rating
                                      ? "star-gold"
                                      : "star-muted"
                                  }
                                  fill={
                                    star <= item.rating
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              ))}
                            </div>
                          </div>

                          <div className="review-service-tag">
                            Service: <strong>{item.service}</strong>
                          </div>

                          <p className="review-text">{item.comment}</p>
                        </article>
                      </Reveal>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
