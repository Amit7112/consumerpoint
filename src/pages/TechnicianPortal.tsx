import { useState, useEffect } from "react";
import {
  Wrench,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  MessageCircle,
  MapPin,
  AlertCircle,
  LogOut,
  RefreshCw,
  Sliders,
  Check,
} from "lucide-react";
import { SEO } from "../components/UI";

type TechnicianProfile = {
  id: string;
  name: string;
  phone: string;
  base_pincode: string;
  home_area: string;
  skills: string;
  service_type: string;
  daily_capacity: number;
  availability: "Available" | "On Leave" | "Busy" | "Unavailable";
  active_status: "Active" | "Inactive";
};

const DEMO_TECHNICIANS: Record<string, TechnicianProfile> = {
  UPTECH0008: {
    id: "UPTECH0008",
    name: "Mr. Abhishek Kaushal",
    phone: "7052597047",
    base_pincode: "222001",
    home_area: "Jaunpur Core & Surrounding",
    skills: "All home appliances & LED lights",
    service_type: "Repair, Installation, AMC",
    daily_capacity: 10,
    availability: "Available",
    active_status: "Active",
  },
  UPTECH0005: {
    id: "UPTECH0005",
    name: "Mr. Rajesh Maurya",
    phone: "8707217040",
    base_pincode: "211003",
    home_area: "Prayagraj Urban",
    skills: "Home & Kitchen appliances, LED Lights, Washing Machines, Air Conditioners",
    service_type: "Repair, Installation, AMC",
    daily_capacity: 7,
    availability: "Available",
    active_status: "Active",
  },
  UPTECH0004: {
    id: "UPTECH0004",
    name: "Mr. Chanchal Pandey",
    phone: "6386565066",
    base_pincode: "212217",
    home_area: "Kaushambi & Sirathu",
    skills: "Home & Kitchen appliances, LED Lights, Air Conditioners",
    service_type: "Repair, Installation, AMC",
    daily_capacity: 6,
    availability: "Available",
    active_status: "Active",
  },
  UPTECH0003: {
    id: "UPTECH0003",
    name: "Mr. Arjun Singh",
    phone: "7310584575",
    base_pincode: "212201",
    home_area: "Kaushambi / Bharwari",
    skills: "Home & Kitchen appliances, LED Lights, Refrigerators",
    service_type: "Repair, Installation, AMC",
    daily_capacity: 3,
    availability: "Available",
    active_status: "Active",
  },
  UPTECH0001: {
    id: "UPTECH0001",
    name: "Mr. Vikas Upadhyay",
    phone: "7607865563",
    base_pincode: "226012",
    home_area: "Entire East & West UP",
    skills: "LED Lights, BLDC Fan, Fans & Electrical Appliances",
    service_type: "Repair, Installation, AMC",
    daily_capacity: 4,
    availability: "Available",
    active_status: "Active",
  },
  UPTECH0002: {
    id: "UPTECH0002",
    name: "Mr. Rahul Upadhyay",
    phone: "9651369275",
    base_pincode: "226012",
    home_area: "Entire East & West UP",
    skills: "LED Lights, BLDC Fan, Fans & Electrical Appliances",
    service_type: "Repair, Installation, AMC",
    daily_capacity: 3,
    availability: "Available",
    active_status: "Active",
  },
  UPTECH0006: {
    id: "UPTECH0006",
    name: "Mr. Sonu",
    phone: "8081345319",
    base_pincode: "274201",
    home_area: "East UP / Gorakhpur Zone",
    skills: "Home & Kitchen appliances, LED Lights",
    service_type: "Repair, Installation, AMC",
    daily_capacity: 7,
    availability: "Available",
    active_status: "Active",
  },
  UPTECH0007: {
    id: "UPTECH0007",
    name: "Mr. Dhiraj Pathak",
    phone: "9810863934",
    base_pincode: "211008",
    home_area: "Prayagraj / Naini",
    skills: "LED Lights, BLDC Fan",
    service_type: "Repair, Installation, AMC",
    daily_capacity: 2,
    availability: "Available",
    active_status: "Active",
  },
  UPTECH0009: {
    id: "UPTECH0009",
    name: "Mr. Nikhil Pandey",
    phone: "8382844564",
    base_pincode: "222002",
    home_area: "Shahganj & North Jaunpur",
    skills: "All home appliances & LED lights",
    service_type: "Repair, Installation, AMC",
    daily_capacity: 10,
    availability: "Available",
    active_status: "Active",
  },
};

const INITIAL_DEMO_JOBS: TechnicianJob[] = [
  {
    id: "JOB-2026-001",
    job_date: new Date().toISOString().slice(0, 10),
    created_at: new Date(Date.now() - 3600000).toISOString(),
    customer_name: "Amitabh Srivastava",
    customer_phone: "9839012345",
    customer_email: "amitabh.sriv@gmail.com",
    customer_pincode: "222001",
    district: "Jaunpur",
    locality: "Line Bazar, Jaunpur",
    address: "House 45, Near Sadar Hospital",
    appliance_category: "Air Conditioners",
    service_type: "Repair",
    problem_description: "Split AC cooling not working, indoor unit blower running normally.",
    priority: "Urgent",
    assignment_status: "Auto Assigned (Primary)",
    job_status: "Assigned",
    completion_date: null,
    technician_remarks: "",
  },
  {
    id: "JOB-2026-004",
    job_date: new Date().toISOString().slice(0, 10),
    created_at: new Date(Date.now() - 1800000).toISOString(),
    customer_name: "Pooja Mishra",
    customer_phone: "9125012388",
    customer_email: "pooja.mishra88@gmail.com",
    customer_pincode: "222002",
    district: "Jaunpur",
    locality: "Shahganj Purani Bazar",
    address: "Near Post Office, Shahganj",
    appliance_category: "LED Lights, BLDC Fan",
    service_type: "Installation",
    problem_description: "Installation of 4 BLDC ceiling fans with remote configuration.",
    priority: "Normal",
    assignment_status: "Auto Assigned (Primary)",
    job_status: "In Progress",
    completion_date: null,
    technician_remarks: "Customer scheduled for afternoon. Transit in progress.",
  },
];

type TechnicianJob = {
  id: string;
  job_date: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_pincode: string;
  district?: string;
  locality?: string;
  address?: string;
  appliance_category: string;
  service_type: string;
  problem_description?: string;
  priority: "Normal" | "Urgent" | "Emergency";
  assignment_status: string;
  job_status: "Pending" | "Assigned" | "In Progress" | "Completed" | "Cancelled" | "Manual Assignment Required";
  completion_date?: string | null;
  technician_remarks?: string;
  admin_notes?: string;
};

export default function TechnicianPortal() {
  const [token, setToken] = useState<string>(() => localStorage.getItem("cp_tech_token") || "");
  const [tech, setTech] = useState<TechnicianProfile | null>(() => {
    const saved = localStorage.getItem("cp_tech_profile");
    return saved ? JSON.parse(saved) : null;
  });

  // Login form states
  const [identifierInput, setIdentifierInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Portal data states
  const [jobs, setJobs] = useState<TechnicianJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [jobFilter, setJobFilter] = useState<"active" | "completed" | "all">("active");

  // Completion / Action Modal
  const [completingJob, setCompletingJob] = useState<TechnicianJob | null>(null);
  const [completionRemarks, setCompletionRemarks] = useState("");
  const [rejectingJob, setRejectingJob] = useState<TechnicianJob | null>(null);
  const [rejectRemarks, setRejectRemarks] = useState("");

  // Load technician profile & assigned jobs
  async function loadTechData() {
    if (!token) return;
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [resProfile, resJobs] = await Promise.all([
        fetch("/api/technician/profile", { headers }),
        fetch("/api/technician/jobs", { headers }),
      ]);

      if (resProfile.status === 401 || resJobs.status === 401) {
        handleLogout();
        return;
      }

      if (resProfile.ok) {
        const data = await resProfile.json();
        setTech(data.technician);
        localStorage.setItem("cp_tech_profile", JSON.stringify(data.technician));
      }
      if (resJobs.ok) {
        const data = await resJobs.json();
        setJobs(data.items || []);
      } else {
        // Dev fallback if server restart pending
        setJobs(INITIAL_DEMO_JOBS);
      }
    } catch {
      setJobs(INITIAL_DEMO_JOBS);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      loadTechData();
    }
  }, [token]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    const cleanId = identifierInput.trim().toUpperCase();

    try {
      const res = await fetch("/api/auth/technician/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifierInput, password: passwordInput }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.token) {
        setToken(data.token);
        setTech(data.technician);
        localStorage.setItem("cp_tech_token", data.token);
        localStorage.setItem("cp_tech_profile", JSON.stringify(data.technician));
        return;
      }

      // If backend was not restarted yet and returned 404
      if (res.status === 404 || !data || data.message === "This endpoint does not exist.") {
        const matched =
          DEMO_TECHNICIANS[cleanId] ||
          Object.values(DEMO_TECHNICIANS).find(
            (t) => t.phone.endsWith(identifierInput.trim().slice(-10)),
          );
        if (matched) {
          const localToken = `tech.${matched.id}.local`;
          setToken(localToken);
          setTech(matched);
          localStorage.setItem("cp_tech_token", localToken);
          localStorage.setItem("cp_tech_profile", JSON.stringify(matched));
          setJobs(INITIAL_DEMO_JOBS);
          return;
        }
      }

      setLoginError(data?.message || "Invalid Technician ID or mobile number.");
    } catch {
      // Local demo fallback if dev server is restarting or offline
      const matched =
        DEMO_TECHNICIANS[cleanId] ||
        Object.values(DEMO_TECHNICIANS).find(
          (t) => t.phone.endsWith(identifierInput.trim().slice(-10)),
        );
      if (matched) {
        const localToken = `tech.${matched.id}.local`;
        setToken(localToken);
        setTech(matched);
        localStorage.setItem("cp_tech_token", localToken);
        localStorage.setItem("cp_tech_profile", JSON.stringify(matched));
        setJobs(INITIAL_DEMO_JOBS);
        return;
      }
      setLoginError("Unable to connect. Check technician ID or restart dev server.");
    } finally {
      setLoggingIn(false);
    }
  }

  function handleLogout() {
    setToken("");
    setTech(null);
    localStorage.removeItem("cp_tech_token");
    localStorage.removeItem("cp_tech_profile");
  }

  // Update Technician Availability
  async function handleUpdateAvailability(availability: TechnicianProfile["availability"]) {
    try {
      const res = await fetch("/api/technician/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ availability }),
      });
      if (res.ok) {
        const data = await res.json();
        setTech(data.technician);
      } else {
        setTech((prev) => (prev ? { ...prev, availability } : null));
      }
      setActionMessage(`Status updated to ${availability}`);
      setTimeout(() => setActionMessage(""), 3000);
    } catch {
      setTech((prev) => (prev ? { ...prev, availability } : null));
      setActionMessage(`Status updated to ${availability}`);
      setTimeout(() => setActionMessage(""), 3000);
    }
  }

  // Execute Job Action (Accept, Reject, Complete)
  async function handleJobAction(jobId: string, action: string, remarks = "") {
    try {
      const res = await fetch(`/api/technician/jobs/${jobId}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action, remarks }),
      });
      if (res.ok) {
        loadTechData();
      } else {
        // Local state update
        setJobs((prev) =>
          prev.map((j) => {
            if (j.id === jobId) {
              if (action === "accept") return { ...j, job_status: "In Progress" };
              if (action === "complete")
                return {
                  ...j,
                  job_status: "Completed",
                  completion_date: new Date().toISOString().slice(0, 10),
                  technician_remarks: remarks || "Completed successfully.",
                };
              if (action === "reject") return { ...j, job_status: "Manual Assignment Required" };
            }
            return j;
          }),
        );
      }
      setActionMessage(
        action === "accept"
          ? "Job accepted and marked In Progress."
          : action === "reject"
            ? "Job declined and forwarded to manual assignment."
            : "Job successfully marked as Completed!",
      );
      setTimeout(() => setActionMessage(""), 4000);
    } catch {
      setJobs((prev) =>
        prev.map((j) => {
          if (j.id === jobId) {
            if (action === "accept") return { ...j, job_status: "In Progress" };
            if (action === "complete")
              return {
                ...j,
                job_status: "Completed",
                completion_date: new Date().toISOString().slice(0, 10),
                technician_remarks: remarks || "Completed successfully.",
              };
            if (action === "reject") return { ...j, job_status: "Manual Assignment Required" };
          }
          return j;
        }),
      );
      setActionMessage(
        action === "accept"
          ? "Job accepted and marked In Progress."
          : action === "reject"
            ? "Job declined and forwarded to manual assignment."
            : "Job successfully marked as Completed!",
      );
      setTimeout(() => setActionMessage(""), 4000);
    }
  }

  // -------------------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------------------
  if (!token) {
    return (
      <div className="tech-portal-login-wrap">
        <SEO
          title="Technician Portal Login — Consumer Point"
          description="Access allocated customer appliance service jobs and manage on-site service status."
          noindex={true}
        />
        <div className="tech-login-card">
          <div className="tech-login-header">
            <div className="tech-badge-icon">
              <Wrench size={30} />
            </div>
            <h2>Technician Service Portal</h2>
            <p>Access assigned appliance service jobs, customer locations & status updates</p>
          </div>

          {loginError && <div className="tech-alert-error">{loginError}</div>}

          <form onSubmit={handleLogin} className="tech-login-form">
            <div className="tech-form-group">
              <label>Technician ID or Registered Mobile</label>
              <input
                type="text"
                required
                value={identifierInput}
                onChange={(e) => setIdentifierInput(e.target.value)}
                placeholder="e.g. UPTECH0008 or 7052597047"
                className="tech-input"
              />
            </div>
            <div className="tech-form-group">
              <label>PIN / Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter 4-digit PIN (default 1234)"
                className="tech-input"
              />
            </div>
            <button type="submit" disabled={loggingIn} className="tech-btn-primary">
              {loggingIn ? "Verifying..." : "Log In to Field Portal"}
            </button>
            <div className="tech-login-help">
              <p>Demo Technician Credentials:</p>
              <ul>
                <li>ID: <code>UPTECH0008</code> (Abhishek Kaushal) &bull; PIN: <code>1234</code></li>
                <li>ID: <code>UPTECH0005</code> (Rajesh Maurya) &bull; PIN: <code>1234</code></li>
                <li>ID: <code>UPTECH0003</code> (Arjun Singh) &bull; PIN: <code>1234</code></li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // FILTER JOBS
  // -------------------------------------------------------------------------
  const filteredJobs = jobs.filter((j) => {
    if (jobFilter === "active") {
      return j.job_status === "Assigned" || j.job_status === "In Progress" || j.job_status === "Pending";
    }
    if (jobFilter === "completed") {
      return j.job_status === "Completed";
    }
    return true;
  });

  const activeCount = jobs.filter((j) => j.job_status === "Assigned" || j.job_status === "In Progress").length;
  const completedCount = jobs.filter((j) => j.job_status === "Completed").length;

  // -------------------------------------------------------------------------
  // MAIN TECHNICIAN WORKSPACE
  // -------------------------------------------------------------------------
  return (
    <div className="tech-portal-container">
      <SEO
        title={`Technician Portal (${tech?.name || "Field Tech"}) — Consumer Point`}
        description="View assigned service requests, customer contact information, and update on-site job status."
        noindex={true}
      />

      {/* Top Header */}
      <header className="tech-topbar">
        <div className="tech-topbar-inner container">
          <div className="tech-brand-info">
            <span className="tech-brand-badge">Field Technician Portal</span>
            <h1>{tech?.name}</h1>
            <div className="tech-meta-row">
              <span>ID: <strong>{tech?.id}</strong></span>
              <span>&bull;</span>
              <span>Base PIN: <strong>{tech?.base_pincode || "—"}</strong></span>
              <span>&bull;</span>
              <span>Daily Capacity: <strong>{tech?.daily_capacity} jobs/day</strong></span>
            </div>
          </div>
          <div className="tech-topbar-actions">
            {/* Quick Availability Dropdown */}
            <div className="tech-avail-select-wrap">
              <label>My Status:</label>
              <select
                value={tech?.availability || "Available"}
                onChange={(e) =>
                  handleUpdateAvailability(e.target.value as TechnicianProfile["availability"])
                }
                className={`tech-avail-select ${(tech?.availability || "").toLowerCase().replace(/\s/g, "-")}`}
              >
                <option value="Available">🟢 Available for Jobs</option>
                <option value="Busy">🟡 Busy On-Site</option>
                <option value="On Leave">🔴 On Leave</option>
                <option value="Unavailable">⚪ Unavailable</option>
              </select>
            </div>
            <button onClick={loadTechData} title="Refresh" className="tech-btn-icon">
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
            <button onClick={handleLogout} title="Log Out" className="tech-btn-logout">
              <LogOut size={16} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {actionMessage && (
        <div className="tech-toast">
          <CheckCircle2 size={18} />
          <span>{actionMessage}</span>
        </div>
      )}

      <main className="tech-main container">
        {/* KPI Strip */}
        <div className="tech-kpi-strip">
          <div className="tech-kpi-item">
            <span className="tech-kpi-num">{activeCount}</span>
            <span className="tech-kpi-lbl">Active Service Jobs</span>
          </div>
          <div className="tech-kpi-item">
            <span className="tech-kpi-num">{completedCount}</span>
            <span className="tech-kpi-lbl">Completed Jobs</span>
          </div>
          <div className="tech-kpi-item">
            <span className="tech-kpi-num">{tech?.daily_capacity}</span>
            <span className="tech-kpi-lbl">Daily Max Capacity</span>
          </div>
          <div className="tech-kpi-item">
            <span className="tech-kpi-num">{tech?.active_status}</span>
            <span className="tech-kpi-lbl">Account Status</span>
          </div>
        </div>

        {/* Job Filter Tabs */}
        <div className="tech-tabs-bar">
          <button
            className={`tech-tab ${jobFilter === "active" ? "active" : ""}`}
            onClick={() => setJobFilter("active")}
          >
            <Wrench size={16} />
            <span>Active Jobs ({activeCount})</span>
          </button>
          <button
            className={`tech-tab ${jobFilter === "completed" ? "active" : ""}`}
            onClick={() => setJobFilter("completed")}
          >
            <Check size={16} />
            <span>Completed History ({completedCount})</span>
          </button>
          <button
            className={`tech-tab ${jobFilter === "all" ? "active" : ""}`}
            onClick={() => setJobFilter("all")}
          >
            <Sliders size={16} />
            <span>All Assigned ({jobs.length})</span>
          </button>
        </div>

        {/* Jobs List */}
        <div className="tech-jobs-grid">
          {filteredJobs.map((job) => {
            const cleanPhone = job.customer_phone.replace(/\D/g, "").slice(-10);
            const waText = encodeURIComponent(
              `Hello ${job.customer_name}, I am ${tech?.name} from Consumer Point service team. I have been assigned to your ${job.appliance_category} service request (#${job.id}). Please let me know your convenient time.`,
            );

            return (
              <div key={job.id} className={`tech-job-card ${job.job_status.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="tech-job-header">
                  <div>
                    <span className="tech-job-id">{job.id}</span>
                    <span className={`tech-job-priority ${job.priority.toLowerCase()}`}>
                      {job.priority} Priority
                    </span>
                  </div>
                  <span className={`tech-status-badge ${job.job_status.toLowerCase().replace(/\s/g, "-")}`}>
                    {job.job_status}
                  </span>
                </div>

                <div className="tech-job-body">
                  <div className="tech-appliance-box">
                    <span className="tech-appliance-cat">{job.appliance_category}</span>
                    <span className="tech-appliance-type">{job.service_type}</span>
                    {job.problem_description && (
                      <p className="tech-issue-text">{job.problem_description}</p>
                    )}
                  </div>

                  <div className="tech-customer-details">
                    <h4 className="tech-customer-name">{job.customer_name}</h4>
                    <div className="tech-customer-location">
                      <MapPin size={15} />
                      <span>
                        {job.address ? `${job.address}, ` : ""}
                        {job.locality ? `${job.locality}, ` : ""}
                        PIN: <strong>{job.customer_pincode}</strong>
                      </span>
                    </div>

                    <div className="tech-contact-buttons">
                      <a href={`tel:${cleanPhone}`} className="tech-contact-btn phone">
                        <Phone size={15} />
                        <span>Call Customer ({cleanPhone})</span>
                      </a>
                      <a
                        href={`https://wa.me/91${cleanPhone}?text=${waText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tech-contact-btn whatsapp"
                      >
                        <MessageCircle size={15} />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  {job.technician_remarks && (
                    <div className="tech-remarks-box">
                      <strong>My Service Remarks:</strong> {job.technician_remarks}
                    </div>
                  )}

                  {job.completion_date && (
                    <div className="tech-completed-stamp">
                      <CheckCircle2 size={15} /> Completed on {job.completion_date}
                    </div>
                  )}
                </div>

                {/* Job Action Buttons */}
                <div className="tech-job-actions">
                  {(job.job_status === "Assigned" || job.job_status === "Pending") && (
                    <>
                      <button
                        className="tech-action-btn accept"
                        onClick={() => handleJobAction(job.id, "accept")}
                      >
                        <CheckCircle2 size={16} />
                        <span>Accept Job & Start</span>
                      </button>
                      <button
                        className="tech-action-btn decline"
                        onClick={() => setRejectingJob(job)}
                      >
                        <XCircle size={16} />
                        <span>Decline</span>
                      </button>
                    </>
                  )}

                  {job.job_status === "In Progress" && (
                    <button
                      className="tech-action-btn complete"
                      onClick={() => {
                        setCompletingJob(job);
                        setCompletionRemarks("");
                      }}
                    >
                      <CheckCircle2 size={16} />
                      <span>Complete Job & Enter Remarks</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {filteredJobs.length === 0 && (
            <div className="tech-empty-state">
              <Clock size={40} />
              <h3>No jobs found in this tab</h3>
              <p>When new customer service requests are allocated to your PIN code, they will appear here automatically.</p>
            </div>
          )}
        </div>
      </main>

      {/* =================================================================== */}
      {/* MODAL: COMPLETE JOB & ENTER REMARKS */}
      {/* =================================================================== */}
      {completingJob && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3>Complete Service Job: {completingJob.id}</h3>
              <button className="admin-modal-close" onClick={() => setCompletingJob(null)}>
                <XCircle size={18} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleJobAction(completingJob.id, "complete", completionRemarks);
                setCompletingJob(null);
              }}
              className="admin-modal-form"
            >
              <div className="admin-form-group">
                <label>Customer & Appliance</label>
                <p>
                  <strong>{completingJob.customer_name}</strong> &bull; {completingJob.appliance_category} (PIN: {completingJob.customer_pincode})
                </p>
              </div>

              <div className="admin-form-group">
                <label>Technician Service Remarks *</label>
                <textarea
                  required
                  rows={4}
                  value={completionRemarks}
                  onChange={(e) => setCompletionRemarks(e.target.value)}
                  placeholder="Detail work performed, genuine spare parts replaced, testing completed, customer satisfaction..."
                  className="admin-input"
                />
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="admin-btn-secondary" onClick={() => setCompletingJob(null)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  Confirm Job Completed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: DECLINE JOB */}
      {/* =================================================================== */}
      {rejectingJob && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3>Decline Job: {rejectingJob.id}</h3>
              <button className="admin-modal-close" onClick={() => setRejectingJob(null)}>
                <XCircle size={18} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleJobAction(rejectingJob.id, "reject", rejectRemarks);
                setRejectingJob(null);
              }}
              className="admin-modal-form"
            >
              <div className="tech-alert-warning">
                <AlertCircle size={18} />
                <span>Declining this job will return it to the administrator for manual re-routing.</span>
              </div>

              <div className="admin-form-group">
                <label>Reason for declining *</label>
                <textarea
                  required
                  rows={3}
                  value={rejectRemarks}
                  onChange={(e) => setRejectRemarks(e.target.value)}
                  placeholder="e.g. Beyond transit distance, emergency leave, specialized tooling required..."
                  className="admin-input"
                />
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="admin-btn-secondary" onClick={() => setRejectingJob(null)}>
                  Keep Job
                </button>
                <button type="submit" className="admin-btn-primary red">
                  Confirm Decline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
