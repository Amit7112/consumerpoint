import { useState, useEffect, useMemo } from "react";
import {
  ClipboardList,
  MessageSquare,
  Search,
  Download,
  LogOut,
  RefreshCw,
  Shield,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  X,
  Star,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { SEO } from "../components/UI";

type AdminUser = {
  id: string;
  username: string;
  name: string;
  role: string;
};

type Enquiry = {
  id: string;
  createdAt: string;
  kind: string;
  status: "Pending" | "In Progress" | "Completed";
  name: string;
  phone: string;
  email?: string;
  service: string;
  brandModel?: string;
  message?: string;
  pincode?: string;
  city?: string;
  address?: string;
  contactMethod?: string;
  preferredDate?: string;
  raw?: Record<string, unknown>;
};

type FeedbackItem = {
  id: string;
  createdAt: string;
  name: string;
  service: string;
  rating: number;
  comment: string;
  verified: boolean;
  status?: string;
};

export default function AdminDashboardPage() {
  // Authentication states
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Navigation tab
  const [activeTab, setActiveTab] = useState<"enquiries" | "feedback">(
    "enquiries",
  );

  // Data states
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search & Filter states (Customer Enquiries)
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");

  // Feedback filter
  const [feedbackRatingFilter, setFeedbackRatingFilter] = useState<string>("all");

  // Detail Modal state
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  // Load existing session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("cp_admin_token");
    const savedUser = localStorage.getItem("cp_admin_user");
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("cp_admin_token");
        localStorage.removeItem("cp_admin_user");
      }
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (token) {
      fetchAllData();
    }
  }, [token]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!username.trim() || !password) {
      setAuthError("Please enter your admin username/email and password.");
      return;
    }

    try {
      setAuthLoading(true);
      const res = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid administrator credentials.");
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("cp_admin_token", data.token);
      localStorage.setItem("cp_admin_user", JSON.stringify(data.user));
      setPassword("");
      showToast(`Welcome back, ${data.user.name}`);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("cp_admin_token");
    localStorage.removeItem("cp_admin_user");
    setEnquiries([]);
    setFeedback([]);
    setSelectedEnquiry(null);
    showToast("You have been signed out.");
  };

  // Fetch enquiries and feedback
  const fetchAllData = async () => {
    if (!token) return;
    setDataLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      // 1. Fetch Enquiries
      const enqRes = await fetch("/api/admin/enquiries", { headers });
      if (enqRes.status === 401 || enqRes.status === 403) {
        handleLogout();
        return;
      }
      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(enqData.items || []);
      }

      // 2. Fetch Feedback
      const fbRes = await fetch("/api/admin/feedback", { headers });
      if (fbRes.ok) {
        const fbData = await fbRes.json();
        setFeedback(fbData.items || []);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setDataLoading(false);
    }
  };

  // Status update handler (Pending / In Progress / Completed)
  const handleStatusChange = async (
    enquiryId: string,
    newStatus: "Pending" | "In Progress" | "Completed",
  ) => {
    if (!token) return;
    setUpdatingStatusId(enquiryId);
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiryId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update status.");
      }

      // Update state locally
      setEnquiries((prev) =>
        prev.map((item) =>
          item.id === enquiryId ? { ...item, status: newStatus } : item,
        ),
      );

      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }

      showToast(`Status updated to "${newStatus}" for #${enquiryId}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Status update failed.");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  // CSV Export handler
  const handleExport = (type: "enquiries" | "feedback") => {
    if (!token) return;
    const url = `/api/admin/export/${type}`;
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Export failed.");
        return res.blob();
      })
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = `consumer-point-${type}-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
        showToast(`${type === "enquiries" ? "Enquiries" : "Feedback"} CSV downloaded successfully!`);
      })
      .catch((err) => {
        alert(err.message || "Failed to download export file.");
      });
  };

  // Filtered Enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      // Search query (name, phone, id, email, service, pincode)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesPhone = item.phone.replace(/\D/g, "").includes(q.replace(/\D/g, ""));
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesEmail = (item.email || "").toLowerCase().includes(q);
        const matchesService = item.service.toLowerCase().includes(q);
        const matchesPin = (item.pincode || "").includes(q);
        if (
          !matchesName &&
          !matchesPhone &&
          !matchesId &&
          !matchesEmail &&
          !matchesService &&
          !matchesPin
        ) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== "all" && item.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }

      // Service filter
      if (serviceFilter !== "all") {
        const s = serviceFilter.toLowerCase();
        if (
          !item.service.toLowerCase().includes(s) &&
          item.kind.toLowerCase() !== s
        ) {
          return false;
        }
      }

      // Date filter
      if (dateFilter.trim()) {
        if (item.createdAt.slice(0, 10) !== dateFilter.trim()) {
          return false;
        }
      }

      return true;
    });
  }, [enquiries, searchQuery, statusFilter, serviceFilter, dateFilter]);

  // Filtered Feedback
  const filteredFeedback = useMemo(() => {
    if (feedbackRatingFilter === "all") return feedback;
    const target = Number(feedbackRatingFilter);
    return feedback.filter((f) => f.rating === target);
  }, [feedback, feedbackRatingFilter]);

  // Metric counts
  const pendingCount = enquiries.filter((e) => e.status === "Pending").length;
  const inProgressCount = enquiries.filter((e) => e.status === "In Progress").length;
  const completedCount = enquiries.filter((e) => e.status === "Completed").length;

  const averageFeedbackRating = useMemo(() => {
    if (feedback.length === 0) return 5.0;
    const sum = feedback.reduce((acc, f) => acc + f.rating, 0);
    return (sum / feedback.length).toFixed(1);
  }, [feedback]);

  // ---------------------------------------------------------------------------
  // RENDER: LOGIN VIEW (If not authenticated)
  // ---------------------------------------------------------------------------
  if (!user || !token) {
    return (
      <div className="admin-portal-login-wrap">
        <SEO
          title="Admin Login - Consumer Point"
          description="Authorized Consumer Point enquiry and feedback portal."
          canonicalPath="/admin"
          noindex={true}
        />
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-badge-icon">
              <Shield size={36} className="text-blue-600" />
            </div>
            <h2>Consumer Point Admin</h2>
            <p>Customer Enquiry & Feedback Management Portal</p>
          </div>

          {authError && (
            <div className="admin-alert-error" role="alert">
              <AlertCircle size={18} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-form-group">
              <label htmlFor="admin-username">Username or Email</label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                required
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                className="admin-input"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="admin-btn-primary w-full"
            >
              {authLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  <Shield size={18} />
                  Sign In to Admin Dashboard
                </>
              )}
            </button>
          </form>

          <div className="admin-login-hint text-center mt-4">
            <p className="text-xs text-gray-500">
              Authorized Personnel Only &bull; Protected by JWT Bearer Authentication
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // RENDER: MAIN ADMIN DASHBOARD
  // ---------------------------------------------------------------------------
  return (
    <div className="admin-portal-container">
      <SEO
        title="Admin Dashboard - Consumer Point"
        description="Consumer Point customer enquiries and feedback management."
        canonicalPath="/admin"
        noindex={true}
      />

      {/* Top Notification Toast */}
      {toastMessage && (
        <div className="admin-notification-toast">
          <CheckCircle2 size={18} className="text-green-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Topbar */}
      <header className="admin-topbar">
        <div className="admin-topbar-inner container">
          <div className="admin-brand-tag">
            <Shield size={22} className="text-blue-500" />
            <div className="admin-brand-info">
              <h1>Consumer Point</h1>
              <span className="text-xs text-gray-400">
                Customer Enquiry Management
              </span>
            </div>
          </div>

          <div className="admin-topbar-actions">
            <div className="admin-user-pill">
              <span className="user-dot"></span>
              <span className="user-name">{user.name}</span>
            </div>

            <button
              onClick={fetchAllData}
              disabled={dataLoading}
              className="admin-btn-secondary"
              title="Refresh Data"
            >
              <RefreshCw
                size={16}
                className={dataLoading ? "animate-spin" : ""}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => handleExport(activeTab)}
              className="admin-btn-secondary"
              title={`Export ${activeTab === "enquiries" ? "Enquiries" : "Feedback"} to CSV`}
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="admin-btn-logout"
              title="Log Out"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="admin-nav-tabs container">
        <button
          className={`admin-tab-btn ${activeTab === "enquiries" ? "active" : ""}`}
          onClick={() => setActiveTab("enquiries")}
        >
          <ClipboardList size={18} />
          <span>Customer Enquiries</span>
          <span className="admin-badge-counter">{enquiries.length}</span>
        </button>

        <button
          className={`admin-tab-btn ${activeTab === "feedback" ? "active" : ""}`}
          onClick={() => setActiveTab("feedback")}
        >
          <MessageSquare size={18} />
          <span>Customer Feedback</span>
          <span className="admin-badge-counter">{feedback.length}</span>
        </button>
      </nav>

      <main className="admin-main-content container py-6">
        {/* ================================================================= */}
        {/* TAB 1: CUSTOMER ENQUIRIES */}
        {/* ================================================================= */}
        {activeTab === "enquiries" && (
          <div className="admin-subview">
            {/* KPI Metric Cards */}
            <div className="admin-kpi-grid mb-6">
              <div className="admin-kpi-card">
                <div className="admin-kpi-icon blue">
                  <ClipboardList size={22} />
                </div>
                <div className="admin-kpi-data">
                  <span className="admin-kpi-label">Total Enquiries</span>
                  <span className="admin-kpi-number">{enquiries.length}</span>
                  <span className="admin-kpi-sub">All submissions</span>
                </div>
              </div>

              <div className="admin-kpi-card">
                <div className="admin-kpi-icon text-amber-600 bg-amber-50">
                  <Clock size={22} />
                </div>
                <div className="admin-kpi-data">
                  <span className="admin-kpi-label">Pending</span>
                  <span className="admin-kpi-number text-amber-600">
                    {pendingCount}
                  </span>
                  <span className="admin-kpi-sub">Needs response</span>
                </div>
              </div>

              <div className="admin-kpi-card">
                <div className="admin-kpi-icon text-blue-600 bg-blue-50">
                  <Sparkles size={22} />
                </div>
                <div className="admin-kpi-data">
                  <span className="admin-kpi-label">In Progress</span>
                  <span className="admin-kpi-number text-blue-600">
                    {inProgressCount}
                  </span>
                  <span className="admin-kpi-sub">Under active service</span>
                </div>
              </div>

              <div className="admin-kpi-card">
                <div className="admin-kpi-icon text-green-600 bg-green-50">
                  <CheckCircle2 size={22} />
                </div>
                <div className="admin-kpi-data">
                  <span className="admin-kpi-label">Completed</span>
                  <span className="admin-kpi-number text-green-600">
                    {completedCount}
                  </span>
                  <span className="admin-kpi-sub">Resolved inquiries</span>
                </div>
              </div>
            </div>

            {/* Search and Filters Bar */}
            <div className="admin-card-panel mb-6 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Search Input */}
                <div className="admin-search-input-wrap">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search name, phone, PIN, #ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="admin-input"
                  />
                </div>

                {/* Status Filter */}
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="admin-select w-full"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Service Filter */}
                <div>
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="admin-select w-full"
                  >
                    <option value="all">All Services & Categories</option>
                    <option value="Air Conditioners">Air Conditioners</option>
                    <option value="Refrigerators">Refrigerators</option>
                    <option value="Washing Machines">Washing Machines</option>
                    <option value="Televisions">Televisions</option>
                    <option value="Water Purifiers">Water Purifiers</option>
                    <option value="Kitchen Appliances">Kitchen Appliances</option>
                    <option value="amc">AMC Maintenance</option>
                    <option value="contact">General Contact</option>
                    <option value="partnership">Brand Partnership</option>
                    <option value="career">Technician Application</option>
                  </select>
                </div>

                {/* Date Filter & Clear */}
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="admin-input flex-1"
                    title="Filter by submission date"
                  />
                  {(searchQuery ||
                    statusFilter !== "all" ||
                    serviceFilter !== "all" ||
                    dateFilter) && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                        setServiceFilter("all");
                        setDateFilter("");
                      }}
                      className="admin-btn-secondary px-3"
                      title="Clear Filters"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                <span>
                  Showing {filteredEnquiries.length} of {enquiries.length}{" "}
                  enquiries
                </span>
                <span className="hidden sm:inline">
                  Email notifications via Resend active
                </span>
              </div>
            </div>

            {/* Enquiries Table / Card List */}
            {filteredEnquiries.length === 0 ? (
              <div className="admin-card-panel text-center py-12">
                <ClipboardList
                  size={42}
                  className="mx-auto text-gray-400 mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-700">
                  No enquiries found
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto mt-1">
                  {enquiries.length === 0
                    ? "No customer enquiries have been recorded yet. New submissions will appear here automatically."
                    : "No enquiries match your current search and filter criteria."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredEnquiries.map((item) => {
                  const statusColors = {
                    Pending:
                      "bg-amber-100 text-amber-800 border-amber-300",
                    "In Progress":
                      "bg-blue-100 text-blue-800 border-blue-300",
                    Completed:
                      "bg-green-100 text-green-800 border-green-300",
                  };

                  const cleanPhone = item.phone.replace(/\D/g, "");

                  return (
                    <div
                      key={item.id}
                      className="admin-card-panel p-4 hover:shadow-md transition-shadow border-l-4"
                      style={{
                        borderLeftColor:
                          item.status === "Pending"
                            ? "#f59e0b"
                            : item.status === "In Progress"
                              ? "#3b82f6"
                              : "#10b981",
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        {/* Reference, Date & Status */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono font-bold text-sm text-gray-900 bg-gray-100 px-2.5 py-1 rounded">
                            #{item.id}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={13} />
                            {new Date(item.createdAt).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </span>
                          <span className="admin-category-pill">
                            {item.service}
                          </span>
                        </div>

                        {/* Status Dropdown Selector */}
                        <div className="flex items-center gap-2">
                          <label className="text-xs font-medium text-gray-600 hidden sm:inline">
                            Status:
                          </label>
                          <select
                            value={item.status}
                            disabled={updatingStatusId === item.id}
                            onChange={(e) =>
                              handleStatusChange(
                                item.id,
                                e.target.value as
                                  | "Pending"
                                  | "In Progress"
                                  | "Completed",
                              )
                            }
                            className={`text-xs font-semibold px-2.5 py-1 rounded-md border focus:ring-2 focus:outline-none ${statusColors[item.status]}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer Details Row */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-100">
                        {/* Customer Info */}
                        <div>
                          <div className="font-semibold text-base text-gray-900">
                            {item.name}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <a
                              href={`tel:${item.phone}`}
                              className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <Phone size={14} />
                              {item.phone}
                            </a>
                            <a
                              href={`https://wa.me/${cleanPhone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 px-2 py-0.5 rounded flex items-center gap-1"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle size={13} />
                              WhatsApp
                            </a>
                          </div>
                          {item.email && (
                            <a
                              href={`mailto:${item.email}`}
                              className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-1 mt-1"
                            >
                              <Mail size={13} />
                              {item.email}
                            </a>
                          )}
                        </div>

                        {/* Location / PIN / Brand */}
                        <div className="text-sm text-gray-600">
                          {(item.city || item.pincode || item.address) && (
                            <div className="flex items-start gap-1">
                              <MapPin size={15} className="mt-0.5 text-gray-400 shrink-0" />
                              <span>
                                {[item.address, item.city, item.pincode ? `PIN: ${item.pincode}` : ""]
                                  .filter(Boolean)
                                  .join(", ")}
                              </span>
                            </div>
                          )}
                          {item.brandModel && (
                            <div className="text-xs text-gray-500 mt-1">
                              Brand/Model: <strong className="text-gray-700">{item.brandModel}</strong>
                            </div>
                          )}
                        </div>

                        {/* Customer Message & Action */}
                        <div className="flex flex-col justify-between">
                          {item.message ? (
                            <p className="text-xs text-gray-700 bg-gray-50 p-2 rounded border border-gray-200 line-clamp-2">
                              "{item.message}"
                            </p>
                          ) : (
                            <span className="text-xs text-gray-400 italic">
                              No customer message attached
                            </span>
                          )}

                          <div className="mt-2 text-right">
                            <button
                              onClick={() => setSelectedEnquiry(item)}
                              className="text-xs text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
                            >
                              <Eye size={14} />
                              View Full Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: CUSTOMER FEEDBACK */}
        {/* ================================================================= */}
        {activeTab === "feedback" && (
          <div className="admin-subview">
            {/* KPI Metric Cards */}
            <div className="admin-kpi-grid mb-6">
              <div className="admin-kpi-card">
                <div className="admin-kpi-icon blue">
                  <MessageSquare size={22} />
                </div>
                <div className="admin-kpi-data">
                  <span className="admin-kpi-label">Total Reviews</span>
                  <span className="admin-kpi-number">{feedback.length}</span>
                  <span className="admin-kpi-sub">Customer submissions</span>
                </div>
              </div>

              <div className="admin-kpi-card">
                <div className="admin-kpi-icon text-amber-500 bg-amber-50">
                  <Star size={22} className="fill-amber-400" />
                </div>
                <div className="admin-kpi-data">
                  <span className="admin-kpi-label">Average Score</span>
                  <span className="admin-kpi-number text-amber-600">
                    {averageFeedbackRating} / 5.0
                  </span>
                  <span className="admin-kpi-sub">Customer rating</span>
                </div>
              </div>

              <div className="admin-kpi-card">
                <div className="admin-kpi-icon text-green-600 bg-green-50">
                  <CheckCircle2 size={22} />
                </div>
                <div className="admin-kpi-data">
                  <span className="admin-kpi-label">5-Star Reviews</span>
                  <span className="admin-kpi-number text-green-600">
                    {feedback.filter((f) => f.rating === 5).length}
                  </span>
                  <span className="admin-kpi-sub">Top satisfaction</span>
                </div>
              </div>

              <div className="admin-kpi-card">
                <div className="admin-kpi-icon text-purple-600 bg-purple-50">
                  <Download size={22} />
                </div>
                <div className="admin-kpi-data">
                  <span className="admin-kpi-label">Export Data</span>
                  <button
                    onClick={() => handleExport("feedback")}
                    className="text-xs font-semibold text-blue-600 hover:underline mt-1 block"
                  >
                    Download CSV
                  </button>
                  <span className="admin-kpi-sub">CSV format</span>
                </div>
              </div>
            </div>

            {/* Rating Filter Bar */}
            <div className="admin-card-panel mb-6 p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Filter by Rating:
                </label>
                <select
                  value={feedbackRatingFilter}
                  onChange={(e) => setFeedbackRatingFilter(e.target.value)}
                  className="admin-select"
                >
                  <option value="all">All Ratings (1 - 5 Stars)</option>
                  <option value="5">5 Stars Only</option>
                  <option value="4">4 Stars Only</option>
                  <option value="3">3 Stars Only</option>
                  <option value="2">2 Stars Only</option>
                  <option value="1">1 Star Only</option>
                </select>
              </div>

              <span className="text-xs text-gray-500">
                Showing {filteredFeedback.length} reviews
              </span>
            </div>

            {/* Feedback Cards List */}
            {filteredFeedback.length === 0 ? (
              <div className="admin-card-panel text-center py-12">
                <MessageSquare
                  size={42}
                  className="mx-auto text-gray-400 mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-700">
                  No feedback reviews found
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto mt-1">
                  Customer feedback submitted through the /feedback page will automatically appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFeedback.map((f) => (
                  <div key={f.id} className="admin-card-panel p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                          {f.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900 leading-tight">
                            {f.name}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {new Date(f.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {f.verified && (
                        <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          Verified
                        </span>
                      )}
                    </div>

                    {/* Star Rating & Service */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={
                              star <= f.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {f.service}
                      </span>
                    </div>

                    {/* Review text */}
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      "{f.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* =================================================================== */}
      {/* CUSTOMER ENQUIRY DETAILS MODAL (Feature 4) */}
      {/* =================================================================== */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50 rounded-t-xl">
              <div>
                <span className="text-xs font-mono font-bold text-gray-500">
                  ENQUIRY REFERENCE
                </span>
                <h3 className="text-lg font-bold text-gray-900">
                  #{selectedEnquiry.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Status Update Banner */}
              <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-medium block">
                    Current Enquiry Status
                  </span>
                  <span className="font-bold text-sm text-gray-900">
                    {selectedEnquiry.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) =>
                      handleStatusChange(
                        selectedEnquiry.id,
                        e.target.value as
                          | "Pending"
                          | "In Progress"
                          | "Completed",
                      )
                    }
                    className="text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-300 bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Customer Contact Information
                </h4>
                <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Full Name:</span>
                    <strong className="text-gray-900">{selectedEnquiry.name}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Mobile Number:</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${selectedEnquiry.phone}`}
                        className="font-bold text-blue-600 hover:underline"
                      >
                        {selectedEnquiry.phone}
                      </a>
                      <a
                        href={`https://wa.me/${selectedEnquiry.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded font-medium"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                  {selectedEnquiry.email && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email Address:</span>
                      <a
                        href={`mailto:${selectedEnquiry.email}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {selectedEnquiry.email}
                      </a>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Submission Date:</span>
                    <span className="text-gray-800 font-medium">
                      {new Date(selectedEnquiry.createdAt).toLocaleString(
                        "en-IN",
                        {
                          timeZone: "Asia/Kolkata",
                          dateStyle: "medium",
                          timeStyle: "short",
                        },
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service & Location Details */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Service & Location Details
                </h4>
                <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Service Requested:</span>
                    <strong className="text-blue-700">
                      {selectedEnquiry.service}
                    </strong>
                  </div>
                  {selectedEnquiry.brandModel && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Brand / Model:</span>
                      <span className="text-gray-900 font-medium">
                        {selectedEnquiry.brandModel}
                      </span>
                    </div>
                  )}
                  {selectedEnquiry.pincode && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">PIN Code:</span>
                      <span className="font-mono font-bold text-gray-900">
                        {selectedEnquiry.pincode}
                      </span>
                    </div>
                  )}
                  {selectedEnquiry.city && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">City / District:</span>
                      <span className="text-gray-900">{selectedEnquiry.city}</span>
                    </div>
                  )}
                  {selectedEnquiry.address && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Full Address:</span>
                      <span className="text-gray-900 text-right max-w-[60%]">
                        {selectedEnquiry.address}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Message */}
              {selectedEnquiry.message && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Customer Message / Problem Description
                  </h4>
                  <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100 text-sm text-gray-800 whitespace-pre-wrap">
                    {selectedEnquiry.message}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-3">
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-center text-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  Open in WhatsApp
                </a>
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center text-sm flex items-center justify-center gap-2"
                >
                  <Phone size={16} />
                  Call Customer
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
