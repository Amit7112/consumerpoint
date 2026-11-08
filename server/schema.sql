CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  kind TEXT NOT NULL CHECK(kind IN ('contact', 'service', 'amc', 'partnership', 'career')),
  status TEXT NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending', 'In Progress', 'Completed', 'new', 'reviewing', 'closed')),
  ciphertext BLOB NOT NULL,
  iv BLOB NOT NULL,
  auth_tag BLOB NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  consent_version TEXT NOT NULL DEFAULT '2026-01'
);
CREATE INDEX IF NOT EXISTS enquiries_created_at ON enquiries(created_at);

CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  service TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  verified INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'published' CHECK(status IN ('published', 'hidden'))
);
CREATE INDEX IF NOT EXISTS feedback_created_at ON feedback(created_at);
CREATE INDEX IF NOT EXISTS feedback_status ON feedback(status);

-- =========================================================================
-- TECHNICIAN MANAGEMENT & SERVICE ALLOCATION SYSTEM TABLES
-- =========================================================================

CREATE TABLE IF NOT EXISTS technicians (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  base_pincode TEXT NOT NULL DEFAULT '',
  home_area TEXT NOT NULL DEFAULT '',
  skills TEXT NOT NULL DEFAULT '',
  service_type TEXT NOT NULL DEFAULT 'Repair, Installation, AMC',
  daily_capacity INTEGER NOT NULL DEFAULT 4,
  availability TEXT NOT NULL DEFAULT 'Available' CHECK(availability IN ('Available', 'On Leave', 'Busy', 'Unavailable')),
  active_status TEXT NOT NULL DEFAULT 'Active' CHECK(active_status IN ('Active', 'Inactive')),
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS technicians_status ON technicians(active_status, availability);

CREATE TABLE IF NOT EXISTS pin_mappings (
  id TEXT PRIMARY KEY,
  pincode TEXT NOT NULL,
  district TEXT NOT NULL,
  locality TEXT NOT NULL,
  appliance_category TEXT NOT NULL DEFAULT 'All Appliances',
  primary_tech_id TEXT,
  backup_tech_id TEXT,
  zone TEXT NOT NULL DEFAULT 'East UP',
  coverage_status TEXT NOT NULL DEFAULT 'Active' CHECK(coverage_status IN ('Active', 'Inactive')),
  travel_notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(primary_tech_id) REFERENCES technicians(id) ON DELETE SET NULL,
  FOREIGN KEY(backup_tech_id) REFERENCES technicians(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS pin_mappings_pin ON pin_mappings(pincode, appliance_category);
CREATE INDEX IF NOT EXISTS pin_mappings_status ON pin_mappings(coverage_status);

CREATE TABLE IF NOT EXISTS service_jobs (
  id TEXT PRIMARY KEY,
  job_date TEXT NOT NULL,
  created_at TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL DEFAULT '',
  customer_pincode TEXT NOT NULL,
  district TEXT NOT NULL DEFAULT '',
  locality TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  appliance_category TEXT NOT NULL,
  service_type TEXT NOT NULL DEFAULT 'Repair',
  problem_description TEXT NOT NULL DEFAULT '',
  priority TEXT NOT NULL DEFAULT 'Normal' CHECK(priority IN ('Normal', 'Urgent', 'Emergency')),
  primary_tech_id TEXT,
  backup_tech_id TEXT,
  assigned_tech_id TEXT,
  assignment_status TEXT NOT NULL DEFAULT 'Pending' CHECK(assignment_status IN ('Auto Assigned (Primary)', 'Auto Assigned (Backup)', 'Manual Override', 'Manual Assignment Required', 'Pending')),
  job_status TEXT NOT NULL DEFAULT 'Assigned' CHECK(job_status IN ('Pending', 'Assigned', 'In Progress', 'Completed', 'Cancelled', 'Manual Assignment Required')),
  completion_date TEXT,
  customer_rating INTEGER CHECK(customer_rating IS NULL OR (customer_rating >= 1 AND customer_rating <= 5)),
  technician_remarks TEXT NOT NULL DEFAULT '',
  admin_notes TEXT NOT NULL DEFAULT '',
  enquiry_ref TEXT,
  FOREIGN KEY(primary_tech_id) REFERENCES technicians(id) ON DELETE SET NULL,
  FOREIGN KEY(backup_tech_id) REFERENCES technicians(id) ON DELETE SET NULL,
  FOREIGN KEY(assigned_tech_id) REFERENCES technicians(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS service_jobs_date ON service_jobs(job_date);
CREATE INDEX IF NOT EXISTS service_jobs_status ON service_jobs(job_status, assignment_status);
CREATE INDEX IF NOT EXISTS service_jobs_assigned ON service_jobs(assigned_tech_id);

CREATE TABLE IF NOT EXISTS job_status_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id TEXT NOT NULL,
  changed_by TEXT NOT NULL,
  old_status TEXT NOT NULL,
  new_status TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  timestamp TEXT NOT NULL,
  FOREIGN KEY(job_id) REFERENCES service_jobs(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS job_history_job_id ON job_status_history(job_id);

CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TEXT NOT NULL
);
