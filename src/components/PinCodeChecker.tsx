import { useState, useMemo, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  RotateCcw,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import rawPincodesData from "../../config/pincodes.json";
import type { LocationRecord, PincodeCheckResult } from "../types/pincode";
import { useBusiness, whatsappUrl } from "../config";
import { getLocationWhatsAppUrl } from "../utils/whatsapp";

const allLocations: LocationRecord[] = rawPincodesData as LocationRecord[];

export default function PinCodeChecker({
  showDirectory = true,
  compact = false,
}: {
  showDirectory?: boolean;
  compact?: boolean;
}) {
  const business = useBusiness();
  const whatsappNumber = business.whatsapp || "919805350321";

  // Checker states
  const [pinInput, setPinInput] = useState("");
  const [checkerLoading, setCheckerLoading] = useState(false);
  const [checkerError, setCheckerError] = useState("");
  const [checkResult, setCheckResult] = useState<PincodeCheckResult | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    function checkHash() {
      if (
        typeof window !== "undefined" &&
        (window.location.hash === "#availability-checker" ||
          window.location.hash === "#check-pincode" ||
          window.location.hash === "#service-checker")
      ) {
        setIsHighlighted(true);
        const t = setTimeout(() => setIsHighlighted(false), 2400);
        return () => clearTimeout(t);
      }
    }
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // Directory Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All");
  const [selectedTaluk, setSelectedTaluk] = useState<string>("All");
  const [selectedOfficeType, setSelectedOfficeType] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Extract unique filter lists
  const districts = useMemo(() => {
    const list = Array.from(new Set(allLocations.map((item) => item.district))).sort();
    return ["All", ...list];
  }, []);

  const taluks = useMemo(() => {
    let filtered = allLocations;
    if (selectedDistrict !== "All") {
      filtered = filtered.filter((i) => i.district === selectedDistrict);
    }
    const list = Array.from(
      new Set(
        filtered
          .map((item) => item.taluk)
          .filter((t) => t && t !== "Not Available"),
      ),
    ).sort();
    return ["All", ...list];
  }, [selectedDistrict]);

  // Handle PIN check
  async function handleCheck(e?: FormEvent) {
    if (e) e.preventDefault();
    setCheckerError("");
    const cleaned = pinInput.trim().replace(/\D/g, "");

    if (!cleaned) {
      setCheckerError("Please enter a 6-digit Indian PIN code.");
      return;
    }
    if (cleaned.length !== 6) {
      setCheckerError("PIN code must be exactly 6 digits.");
      return;
    }

    setCheckerLoading(true);

    // Simulate smooth checking animation (300ms) for high-end feel
    await new Promise((r) => setTimeout(r, 300));

    const matches = allLocations.filter((item) => item.pincode === cleaned);
    if (matches.length > 0) {
      setCheckResult({
        checkedPin: cleaned,
        available: true,
        message:
          "Great! Your location is listed in our service area. Contact our team to confirm service availability.",
        locations: matches,
      });
    } else {
      setCheckResult({
        checkedPin: cleaned,
        available: false,
        message:
          "Sorry! We currently don't have this PIN code listed in our database. Please contact our team for assistance.",
        locations: [],
      });
    }

    setCheckerLoading(false);
  }

  // Quick PIN check from badge / example chips
  function handleQuickCheck(pin: string) {
    setPinInput(pin);
    setCheckerError("");
    setCheckerLoading(true);

    setTimeout(() => {
      const matches = allLocations.filter((item) => item.pincode === pin);
      setCheckResult({
        checkedPin: pin,
        available: matches.length > 0,
        message:
          matches.length > 0
            ? "Great! Your location is listed in our service area. Contact our team to confirm service availability."
            : "Sorry! We currently don't have this PIN code listed in our database. Please contact our team for assistance.",
        locations: matches,
      });
      setCheckerLoading(false);
      // Scroll smoothly to results
      const resultEl = document.getElementById("pincode-result-anchor");
      if (resultEl) {
        resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  }

  // Filtered locations for the directory
  const filteredDirectory = useMemo(() => {
    let list = allLocations;

    if (selectedDistrict !== "All") {
      list = list.filter((item) => item.district === selectedDistrict);
    }

    if (selectedTaluk !== "All") {
      list = list.filter((item) => item.taluk === selectedTaluk);
    }

    if (selectedOfficeType !== "All") {
      list = list.filter((item) => item.officeType === selectedOfficeType);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (item) =>
          item.pincode.includes(q) ||
          item.officeName.toLowerCase().includes(q) ||
          item.district.toLowerCase().includes(q) ||
          item.taluk.toLowerCase().includes(q) ||
          item.relatedHeadOffice.toLowerCase().includes(q),
      );
    }

    return list;
  }, [searchQuery, selectedDistrict, selectedTaluk, selectedOfficeType]);

  const displayedLocations = useMemo(() => {
    return filteredDirectory.slice(0, visibleCount);
  }, [filteredDirectory, visibleCount]);

  return (
    <div className="pincode-feature-root">
      {/* =========================================================================
          SECTION 1 & 2: PIN CODE AVAILABILITY CHECKER
         ========================================================================= */}
      <section className="pincode-checker-section" id="availability-checker">
        <div
          className={`pincode-card-main ${compact ? "pincode-card-compact" : ""} ${
            isHighlighted ? "highlight-pulse" : ""
          } ${isFocused ? "is-focused" : ""}`}
        >
          <div className="pincode-header-block">
            <span className="pincode-badge">
              <Sparkles size={14} />
              VERIFIED SERVICE COVERAGE
            </span>
            <h2 className="pincode-title">Check Service Availability in Your Area</h2>
            <p className="pincode-subtitle">
              Enter your PIN code to find out whether Consumer Point services are available
              in your location.
            </p>
          </div>

          <form onSubmit={handleCheck} className="pincode-form" noValidate>
            <div
              className={`pincode-input-wrap ${isFocused ? "is-focused" : ""} ${
                pinInput.length === 6 ? "is-ready" : ""
              }`}
            >
              <MapPin className="pincode-input-icon" size={20} />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={pinInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setPinInput(val);
                  if (checkerError) setCheckerError("");
                }}
                placeholder="Enter 6-digit PIN code (e.g. 222001)"
                className={`pincode-input ${checkerError ? "has-error" : ""}`}
                aria-label="Enter 6-digit PIN code"
              />
              {pinInput && (
                <button
                  type="button"
                  className="pincode-clear-btn"
                  onClick={() => {
                    setPinInput("");
                    setCheckerError("");
                  }}
                  aria-label="Clear PIN code"
                >
                  &times;
                </button>
              )}
              <button
                type="submit"
                disabled={checkerLoading}
                className={`button button-primary pincode-submit-btn ${
                  pinInput.length === 6 ? "btn-ready-pulse" : ""
                }`}
              >
                {checkerLoading ? (
                  <>
                    <LoaderCircle size={18} className="spinner" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    Check Availability
                  </>
                )}
              </button>
            </div>

            {checkerError && (
              <p className="pincode-error-text" role="alert">
                <AlertCircle size={15} />
                {checkerError}
              </p>
            )}

            <div className="pincode-quick-chips">
              <span className="chips-label">Quick samples:</span>
              {[
                { name: "Jaunpur H.O", pin: "222001" },
                { name: "Chandwak", pin: "222129" },
                { name: "Shahganj", pin: "223101" },
                { name: "Badlapur", pin: "222125" },
                { name: "Sirathu", pin: "212217" },
              ].map((sample) => (
                <button
                  key={sample.pin}
                  type="button"
                  onClick={() => handleQuickCheck(sample.pin)}
                  className="quick-chip"
                >
                  {sample.name} ({sample.pin})
                </button>
              ))}
            </div>
          </form>

          {/* Result Anchor */}
          <div id="pincode-result-anchor" />

          {/* =========================================================================
              RESULT CARD (Section 2 of requirements)
             ========================================================================= */}
          {checkResult && (
            <div
              className={`pincode-result-card ${
                checkResult.available ? "result-success" : "result-not-found"
              }`}
              role="status"
            >
              <div className="result-top-banner">
                {checkResult.available ? (
                  <CheckCircle2 size={30} className="banner-icon-success" />
                ) : (
                  <AlertCircle size={30} className="banner-icon-alert" />
                )}
                <div>
                  <h3 className="result-banner-title">
                    {checkResult.available
                      ? "Service Area Verified"
                      : "PIN Code Not In Database"}
                  </h3>
                  <p className="result-banner-msg">{checkResult.message}</p>
                </div>
              </div>

              {/* If PIN Code Exists: Display Location Details */}
              {checkResult.available && checkResult.locations.length > 0 && (
                <div className="matching-locations-container">
                  <div className="matching-locations-header">
                    <h4>
                      Matching Locations for PIN <span>{checkResult.checkedPin}</span>
                    </h4>
                    <span className="match-pill">
                      {checkResult.locations.length}{" "}
                      {checkResult.locations.length === 1
                        ? "Post Office Found"
                        : "Post Offices Found"}
                    </span>
                  </div>

                  <div className="location-cards-grid">
                    {checkResult.locations.map((loc) => (
                      <div className="loc-detail-card" key={loc.id}>
                        <div className="loc-card-header">
                          <div>
                            <div className="loc-card-tag-row">
                              <span
                                className={`office-type-tag ${
                                  loc.officeType === "H.O"
                                    ? "tag-ho"
                                    : loc.officeType === "S.O"
                                      ? "tag-so"
                                      : "tag-bo"
                                }`}
                              >
                                {loc.officeType === "H.O"
                                  ? "Head Post Office (H.O)"
                                  : loc.officeType === "S.O"
                                    ? "Sub Post Office (S.O)"
                                    : loc.officeType === "B.O"
                                      ? "Branch Post Office (B.O)"
                                      : loc.officeType}
                              </span>
                              <span className="category-tag">{loc.areaCategory}</span>
                            </div>
                            <h5 className="loc-office-name">{loc.officeName}</h5>
                          </div>
                          <span className="loc-pin-badge">{loc.pincode}</span>
                        </div>

                        <div className="loc-specs-grid">
                          <div className="spec-row">
                            <span className="spec-label">District:</span>
                            <strong className="spec-value">{loc.district}</strong>
                          </div>
                          <div className="spec-row">
                            <span className="spec-label">Sub-district / Taluk:</span>
                            <span className="spec-value">{loc.taluk}</span>
                          </div>
                          <div className="spec-row">
                            <span className="spec-label">Related Head Office:</span>
                            <span className="spec-value">{loc.relatedHeadOffice}</span>
                          </div>
                          {loc.relatedSuboffice && loc.relatedSuboffice !== "Not Available" && (
                            <div className="spec-row">
                              <span className="spec-label">Related Sub Office:</span>
                              <span className="spec-value">{loc.relatedSuboffice}</span>
                            </div>
                          )}
                        </div>

                        <div className="loc-card-actions">
                          <a
                            href={getLocationWhatsAppUrl(
                              loc.officeName,
                              loc.district,
                              loc.pincode,
                              whatsappNumber,
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button button-whatsapp"
                          >
                            <img
                              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z'/%3E%3C/svg%3E"
                              alt=""
                              width="18"
                              height="18"
                            />
                            Enquire on WhatsApp
                          </a>
                          <Link
                            to={`/services?type=Service%20Request&location=${encodeURIComponent(
                              loc.officeName,
                            )}&pin=${loc.pincode}#service-request`}
                            className="button button-outline-sm"
                          >
                            Book Service
                            <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* If PIN Code Does Not Exist */}
              {!checkResult.available && (
                <div className="not-found-action-box">
                  <p>
                    Even if your PIN code is not in our primary database, we frequently
                    arrange service visits for nearby areas through our verified technician
                    network.
                  </p>
                  <div className="not-found-buttons">
                    <a
                      href={whatsappUrl(
                        whatsappNumber,
                        `Hello Consumer Point, I want to enquire about service availability for PIN Code: ${checkResult.checkedPin}. Please assist me.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-whatsapp"
                    >
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z'/%3E%3C/svg%3E"
                        alt=""
                        width="18"
                        height="18"
                      />
                      Enquire on WhatsApp
                    </a>
                    <Link to="/contact" className="button button-outline-sm">
                      Send Location Request Form
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: COMPREHENSIVE LOCATION SEARCH & DIRECTORY
         ========================================================================= */}
      {showDirectory && (
        <section className="section location-directory-section" id="location-directory">
          <div className="container">
            <div className="directory-header-row">
              <div>
                <p className="eyebrow">
                  <span />
                  SEARCHABLE SERVICE DIRECTORY
                </p>
                <h3 className="directory-title">Search Service Locations & Post Offices</h3>
                <p className="directory-subtitle">
                  Browse and search across all {allLocations.length} locations by PIN code,
                  post office name, district, or sub-district.
                </p>
              </div>

              <div className="directory-stats-pills">
                <div className="stat-pill">
                  <strong>430+</strong>
                  <span>Post Offices</span>
                </div>
                <div className="stat-pill">
                  <strong>45</strong>
                  <span>PIN Codes</span>
                </div>
                <div className="stat-pill">
                  <strong>3</strong>
                  <span>Districts</span>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="directory-filter-bar">
              <div className="search-field-box">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(12);
                  }}
                  placeholder="Search by PIN code, post office, district, or taluk..."
                  className="directory-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    &times;
                  </button>
                )}
              </div>

              <div className="filter-selects-row">
                <div className="filter-select-box">
                  <label htmlFor="filter-district">District:</label>
                  <select
                    id="filter-district"
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setSelectedTaluk("All");
                      setVisibleCount(12);
                    }}
                    className="filter-select"
                  >
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d === "All" ? "All Districts" : d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-select-box">
                  <label htmlFor="filter-taluk">Sub-district:</label>
                  <select
                    id="filter-taluk"
                    value={selectedTaluk}
                    onChange={(e) => {
                      setSelectedTaluk(e.target.value);
                      setVisibleCount(12);
                    }}
                    className="filter-select"
                  >
                    {taluks.map((t) => (
                      <option key={t} value={t}>
                        {t === "All" ? "All Sub-districts" : t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-select-box">
                  <label htmlFor="filter-type">Office Type:</label>
                  <select
                    id="filter-type"
                    value={selectedOfficeType}
                    onChange={(e) => {
                      setSelectedOfficeType(e.target.value);
                      setVisibleCount(12);
                    }}
                    className="filter-select"
                  >
                    <option value="All">All Types</option>
                    <option value="H.O">Head Office (H.O)</option>
                    <option value="S.O">Sub Office (S.O)</option>
                    <option value="B.O">Branch Office (B.O)</option>
                  </select>
                </div>

                {(searchQuery ||
                  selectedDistrict !== "All" ||
                  selectedTaluk !== "All" ||
                  selectedOfficeType !== "All") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedDistrict("All");
                      setSelectedTaluk("All");
                      setSelectedOfficeType("All");
                      setVisibleCount(12);
                    }}
                    className="reset-filters-btn"
                  >
                    <RotateCcw size={14} />
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* Results Counter Bar */}
            <div className="directory-count-bar">
              <span className="count-label">
                Showing <strong>{Math.min(visibleCount, filteredDirectory.length)}</strong> of{" "}
                <strong>{filteredDirectory.length}</strong> matching locations
              </span>

              {selectedDistrict !== "All" && (
                <span className="filter-chip-tag">District: {selectedDistrict}</span>
              )}
              {selectedTaluk !== "All" && (
                <span className="filter-chip-tag">Taluk: {selectedTaluk}</span>
              )}
              {selectedOfficeType !== "All" && (
                <span className="filter-chip-tag">Type: {selectedOfficeType}</span>
              )}
            </div>

            {/* Directory Cards / Table */}
            {filteredDirectory.length === 0 ? (
              <div className="directory-empty-box">
                <MapPin size={42} className="empty-icon" />
                <h4>No matching locations found</h4>
                <p>
                  No post office or PIN code matches your current search criteria. Try
                  resetting filters or entering a 6-digit PIN code.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedDistrict("All");
                    setSelectedTaluk("All");
                    setSelectedOfficeType("All");
                  }}
                  className="button button-outline"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="directory-grid">
                  {displayedLocations.map((loc) => (
                    <div key={loc.id} className="directory-card">
                      <div className="card-top-row">
                        <div>
                          <span
                            className={`office-badge ${
                              loc.officeType === "H.O"
                                ? "badge-ho"
                                : loc.officeType === "S.O"
                                  ? "badge-so"
                                  : "badge-bo"
                            }`}
                          >
                            {loc.officeType}
                          </span>
                          <h4 className="card-location-name">{loc.officeName}</h4>
                        </div>
                        <span className="card-pincode">{loc.pincode}</span>
                      </div>

                      <div className="card-meta-list">
                        <div className="meta-item">
                          <span className="meta-k">District:</span>
                          <span className="meta-v">{loc.district}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-k">Taluk / Sub-district:</span>
                          <span className="meta-v">{loc.taluk}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-k">Head Office:</span>
                          <span className="meta-v">{loc.relatedHeadOffice}</span>
                        </div>
                      </div>

                      <div className="card-footer-actions">
                        <a
                          href={getLocationWhatsAppUrl(
                            loc.officeName,
                            loc.district,
                            loc.pincode,
                            whatsappNumber,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button button-whatsapp-card"
                          aria-label={`Enquire on WhatsApp for ${loc.officeName}`}
                        >
                          <img
                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z'/%3E%3C/svg%3E"
                            alt=""
                            width="16"
                            height="16"
                          />
                          Enquire on WhatsApp
                        </a>

                        <button
                          type="button"
                          className="button-icon-check"
                          title="Check this PIN code above"
                          onClick={() => handleQuickCheck(loc.pincode)}
                        >
                          Check PIN
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {visibleCount < filteredDirectory.length && (
                  <div className="directory-load-more">
                    <button
                      type="button"
                      className="button button-secondary"
                      onClick={() => setVisibleCount((prev) => prev + 18)}
                    >
                      Load More Locations ({filteredDirectory.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
