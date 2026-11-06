/**
 * Consumer Point — Automatic Service Job Allocation Engine
 *
 * Implements the automatic allocation logic based on:
 * 1. Customer PIN code and Appliance Category
 * 2. Primary Technician eligibility (Active, Available, Skill match, Daily Capacity)
 * 3. Backup Technician fallback if primary is unavailable or full
 * 4. Automatic flagging for "Manual Assignment Required" when neither is eligible
 */

export function checkSkillMatch(technicianSkills, category) {
  if (!technicianSkills || !category) return true; // Default permissive if unspecified
  const techSkillsLower = technicianSkills.toLowerCase();
  const catLower = category.toLowerCase();

  // Universal match keywords
  if (
    techSkillsLower.includes("all appliances") ||
    techSkillsLower.includes("all home appliances") ||
    techSkillsLower.includes("general appliance")
  ) {
    return true;
  }

  // Common cross-category matches for general Home & Kitchen technician
  if (
    techSkillsLower.includes("home & kitchen appliances") ||
    techSkillsLower.includes("home appliances") ||
    techSkillsLower.includes("kitchen appliances")
  ) {
    if (
      catLower.includes("refrigerator") ||
      catLower.includes("washing") ||
      catLower.includes("kitchen") ||
      catLower.includes("water purifier") ||
      catLower.includes("geyser") ||
      catLower.includes("microwave") ||
      catLower.includes("fan") ||
      catLower.includes("chimney") ||
      catLower.includes("air conditioner") ||
      catLower.includes("ac") ||
      catLower.includes("light")
    ) {
      return true;
    }
  }

  if (catLower.includes("air conditioner") || catLower.includes("ac")) {
    return (
      techSkillsLower.includes("air conditioner") ||
      techSkillsLower.includes("ac") ||
      techSkillsLower.includes("cooling") ||
      techSkillsLower.includes("home")
    );
  }

  if (catLower.includes("fan") || catLower.includes("light") || catLower.includes("electrical")) {
    return (
      techSkillsLower.includes("fan") ||
      techSkillsLower.includes("light") ||
      techSkillsLower.includes("electrical") ||
      techSkillsLower.includes("bldc") ||
      techSkillsLower.includes("home")
    );
  }

  if (catLower.includes("refrigerator") || catLower.includes("fridge")) {
    return techSkillsLower.includes("refrigerator") || techSkillsLower.includes("fridge") || techSkillsLower.includes("home");
  }

  if (catLower.includes("washing")) {
    return techSkillsLower.includes("washing") || techSkillsLower.includes("home");
  }

  if (catLower.includes("television") || catLower.includes("tv")) {
    return techSkillsLower.includes("television") || techSkillsLower.includes("tv") || techSkillsLower.includes("led");
  }

  // Token-based matching fallback
  const catTokens = catLower.split(/[\s,&/]+/).filter((t) => t.length > 2);
  for (const token of catTokens) {
    if (techSkillsLower.includes(token)) return true;
  }

  return false;
}

/**
 * Execute allocation for a service job.
 *
 * @param {object} params
 * @param {string} params.pincode
 * @param {string} params.applianceCategory
 * @param {string} [params.jobDate] YYYY-MM-DD
 * @param {object} params.store SQLite store
 * @returns {object} Allocation decision
 */
export function allocateTechnician({ pincode, applianceCategory, jobDate, store }) {
  const date = jobDate || new Date().toISOString().slice(0, 10);
  const cleanPin = String(pincode || "").trim();
  const cleanCat = String(applianceCategory || "").trim();

  // 1. Search PIN mapping database
  const mappings = store.getPinMappingsByPincode(cleanPin);

  if (!mappings || mappings.length === 0) {
    return {
      assignedTechId: null,
      primaryTechId: null,
      backupTechId: null,
      assignmentStatus: "Manual Assignment Required",
      jobStatus: "Manual Assignment Required",
      reason: `No service mapping configured for PIN code ${cleanPin}.`,
    };
  }

  // Find most specific mapping: exact category match first, then "All Appliances", then first active mapping
  let selectedMapping = mappings.find(
    (m) =>
      m.coverage_status === "Active" &&
      m.appliance_category.toLowerCase() === cleanCat.toLowerCase(),
  );

  if (!selectedMapping) {
    selectedMapping = mappings.find(
      (m) =>
        m.coverage_status === "Active" &&
        (m.appliance_category.toLowerCase() === "all appliances" ||
          checkSkillMatch(m.appliance_category, cleanCat)),
    );
  }

  if (!selectedMapping) {
    selectedMapping = mappings.find((m) => m.coverage_status === "Active");
  }

  if (!selectedMapping) {
    return {
      assignedTechId: null,
      primaryTechId: null,
      backupTechId: null,
      assignmentStatus: "Manual Assignment Required",
      jobStatus: "Manual Assignment Required",
      reason: `Service coverage for PIN ${cleanPin} is currently inactive.`,
    };
  }

  const primaryTechId = selectedMapping.primary_tech_id;
  const backupTechId = selectedMapping.backup_tech_id;

  // 2. Evaluate Primary Technician
  if (primaryTechId) {
    const primaryTech = store.getTechnician(primaryTechId);
    if (primaryTech && primaryTech.active_status === "Active" && primaryTech.availability === "Available") {
      const hasSkill = checkSkillMatch(primaryTech.skills, cleanCat);
      if (hasSkill) {
        const assignedCount = store.getTechnicianDailyJobCount(primaryTech.id, date);
        if (assignedCount < primaryTech.daily_capacity) {
          return {
            assignedTechId: primaryTech.id,
            primaryTechId: primaryTech.id,
            backupTechId,
            assignmentStatus: "Auto Assigned (Primary)",
            jobStatus: "Assigned",
            reason: `Assigned to primary technician ${primaryTech.name} (${assignedCount + 1}/${primaryTech.daily_capacity} jobs today).`,
          };
        }
      }
    }
  }

  // 3. Evaluate Backup Technician
  if (backupTechId) {
    const backupTech = store.getTechnician(backupTechId);
    if (backupTech && backupTech.active_status === "Active" && backupTech.availability === "Available") {
      const hasSkill = checkSkillMatch(backupTech.skills, cleanCat);
      if (hasSkill) {
        const assignedCount = store.getTechnicianDailyJobCount(backupTech.id, date);
        if (assignedCount < backupTech.daily_capacity) {
          return {
            assignedTechId: backupTech.id,
            primaryTechId,
            backupTechId: backupTech.id,
            assignmentStatus: "Auto Assigned (Backup)",
            jobStatus: "Assigned",
            reason: `Primary unavailable or at capacity. Allocated to backup technician ${backupTech.name} (${assignedCount + 1}/${backupTech.daily_capacity} jobs today).`,
          };
        }
      }
    }
  }

  // 4. Fallback: Manual Assignment Required
  return {
    assignedTechId: null,
    primaryTechId,
    backupTechId,
    assignmentStatus: "Manual Assignment Required",
    jobStatus: "Manual Assignment Required",
    reason: "Primary and backup technicians are either unavailable, not skilled for this appliance, or reached daily capacity.",
  };
}
