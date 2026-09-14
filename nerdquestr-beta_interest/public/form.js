"use strict";

(() => {
  const form = document.getElementById("interest-form");
  if (!(form instanceof HTMLFormElement)) return;

  const byId = (id) => document.getElementById(id);
  const config = window.NERDQUESTR_BETA_CONFIG || {};
  const endpoint = typeof config.googleAppsScriptUrl === "string" ? config.googleAppsScriptUrl.trim() : "";
  const ready = /^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9_-]{20,200}\/exec$/.test(endpoint) && config.launchApproved === true;
  const submit = byId("submit-button");
  const error = byId("form-error");
  const roles = Array.from(form.querySelectorAll(".role-checkbox"));
  const surveyPermission = byId("survey-permission");
  const surveyPanel = byId("survey-panel");
  let submitting = false;

  if (ready) {
    form.action = endpoint;
    byId("setup-notice").hidden = true;
    submit.disabled = false;
  }

  function activeRoles() {
    return new Set(roles.filter((role) => role.checked).map((role) => role.dataset.role));
  }

  function setSection(id, active, requiredSelector = "") {
    const section = byId(id);
    section.hidden = !active;
    section.disabled = !active;
    for (const field of section.querySelectorAll("input, textarea, select")) {
      if (!active) field.setCustomValidity("");
      if (requiredSelector && field.matches(requiredSelector)) field.required = active;
    }
  }

  function updateSurvey() {
    const enabled = surveyPermission.checked;
    const selected = activeRoles();
    setSection("survey-fields", enabled);
    byId("survey-included").value = enabled ? "yes" : "no";
    for (const role of ["gm", "player", "artist", "event"]) {
      setSection(`survey-${role}`, enabled && selected.has(role));
    }
    for (const choice of form.querySelectorAll("[data-count-target]")) {
      const include = !choice.matches(":disabled") && choice.value === "number";
      setSection(choice.dataset.countTarget, include, "[data-number-entry]");
    }
    const budgetChoice = byId("player-budget-status");
    const budgetActive = !budgetChoice.matches(":disabled") && budgetChoice.value === "amount";
    setSection("player-budget-fields", budgetActive);
    byId("player-budget-amount").required = budgetActive;
    byId("player-budget-currency").required = budgetActive;
    const otherCurrency = budgetActive && byId("player-budget-currency").value === "other";
    setSection("other-currency-fields", otherCurrency, "input");
  }

  function updateRoles(announce = false) {
    const selected = activeRoles();
    roles[0].setCustomValidity(selected.size ? "" : "Please select at least one role. You may select all four.");
    byId("selected-roles").value = roles.filter((role) => role.checked).map((role) => role.value).join(", ");
    for (const role of roles) byId(`flag-${role.dataset.role}`).value = role.checked ? "1" : "0";
    if (selected.size) byId("roles-error").hidden = true;
    setSection("artist-section", selected.has("artist"), "[data-conditional-required]");
    setSection("event-section", selected.has("event"), "[data-conditional-required]");
    const gaming = selected.has("gm") || selected.has("player");
    for (const field of form.querySelectorAll("[data-gaming-required]")) {
      field.required = gaming;
      field.setCustomValidity("");
    }
    for (const marker of form.querySelectorAll(".gaming-required-marker")) {
      marker.textContent = gaming ? "*" : "(optional)";
      marker.classList.toggle("optional", !gaming);
    }
    byId("experience-help").textContent = gaming
      ? "Please answer these questions for Game Master or Player interest. Newcomers are welcome, and 0 sessions is fine."
      : "These questions are optional unless you select Game Master or Player. You can leave them blank if gaming is not relevant to your interest.";
    byId("select-all").textContent = selected.size === roles.length ? "Clear selections" : "Select all four";
    updateSurvey();
    if (announce) {
      byId("role-status").textContent = `${selected.size} role${selected.size === 1 ? "" : "s"} selected. Art and event details appear for those roles. Optional survey questions also follow your selections.`;
    }
  }

  function validateField(field) {
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) return;
    if (field.matches(".role-checkbox") || field.type === "checkbox" || field.type === "hidden") return;
    field.setCustomValidity("");
    if (field.matches(":disabled")) return;
    if (field.required && !field.value.trim()) {
      field.setCustomValidity(field.closest("#survey-fields") ? "Please complete this field, or skip the optional question using its choice above." : "Please complete this field.");
    } else if (field.type === "url" && field.value.trim()) {
      try {
        const url = new URL(field.value.trim());
        if (!["https:", "http:"].includes(url.protocol)) throw new Error("Unsupported protocol");
      } catch {
        field.setCustomValidity("Please enter a complete website link starting with https:// or http://.");
      }
    } else if (field.type === "number" && field.value !== "") {
      const value = Number(field.value);
      if (!Number.isFinite(value) || value < 0) {
        field.setCustomValidity("Please enter a non-negative number. Zero is allowed.");
      } else if (field.step !== "any" && !Number.isSafeInteger(value)) {
        field.setCustomValidity("Please enter a whole number, including 0, or skip this optional question.");
      }
    }
  }

    // Check each answer independently, without comparing it to other answers.
  function validateSessionConsistency() {
    validateField(byId("gm_paid_sessions-number"));
    validateField(byId("player_paid_sessions-number"));
  }

  // The visitor explicitly chooses a time zone. No IP lookup or geolocation.
  const zoneSelect = byId("time-zone");
  const zones = new Set(["UTC"]);
  try {
    if (typeof Intl.supportedValuesOf === "function") {
      for (const zone of Intl.supportedValuesOf("timeZone")) zones.add(zone);
    }
  } catch { /* The fallback below keeps older browsers usable. */ }
  if (zones.size === 1) {
    for (const zone of ["America/Edmonton", "America/Vancouver", "America/Toronto", "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "America/Sao_Paulo", "Europe/London", "Europe/Paris", "Europe/Berlin", "Africa/Johannesburg", "Asia/Kolkata", "Asia/Singapore", "Asia/Tokyo", "Australia/Sydney", "Pacific/Auckland"]) zones.add(zone);
  }
  for (const zone of Array.from(zones).sort()) {
    if (zone !== "UTC") zoneSelect.add(new Option(zone.replaceAll("_", " "), zone));
  }
  zoneSelect.add(new Option("Other / not listed", "other"));
  byId("use-device-zone").addEventListener("click", () => {
    try {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (!zone) throw new Error("Unavailable");
      if (!Array.from(zoneSelect.options).some((option) => option.value === zone)) {
        zoneSelect.add(new Option(zone.replaceAll("_", " "), zone));
      }
      zoneSelect.value = zone;
      byId("timezone-status").textContent = `Selected ${zone.replaceAll("_", " ")}. Change or clear it if that is not where you will take part.`;
    } catch {
      byId("timezone-status").textContent = "Your device's time zone was unavailable. Please choose manually or skip.";
    }
  });

  for (const role of roles) role.addEventListener("change", () => updateRoles(true));
  byId("select-all").addEventListener("click", () => {
    const select = !roles.every((role) => role.checked);
    roles.forEach((role) => { role.checked = select; });
    updateRoles(true);
  });
  surveyPermission.addEventListener("change", updateSurvey);
  byId("skip-survey").addEventListener("click", () => {
    surveyPermission.checked = false;
    // Explicitly skipping clears survey-only answers, not contact/role details.
    for (const field of byId("survey-fields").querySelectorAll("input, select, textarea")) {
      if (field.type === "checkbox" || field.type === "radio") field.checked = false;
      else field.value = "";
      field.setCustomValidity("");
    }
    byId("timezone-status").textContent = "Choose where you'll usually take part. We do not request your device location.";
    updateSurvey();
    surveyPanel.open = false;
    byId("survey-summary").focus();
    error.hidden = true;
  });
  function clearCorrectedError() {
    if (error.textContent.startsWith("Please check") && !form.querySelector(":invalid")) error.hidden = true;
  }
  form.addEventListener("input", (event) => {
    validateField(event.target);
    validateSessionConsistency();
    clearCorrectedError();
  });
  form.addEventListener("change", (event) => {
    updateSurvey();
    validateField(event.target);
    validateSessionConsistency();
    clearCorrectedError();
  });
  form.addEventListener("invalid", (event) => {
    if (surveyPanel.contains(event.target)) surveyPanel.open = true;
    if (event.target === roles[0] && !roles.some((role) => role.checked)) byId("roles-error").hidden = false;
    error.textContent = "Please check the highlighted fields. Optional survey questions can be skipped.";
    error.hidden = false;
  }, true);

  form.addEventListener("submit", (event) => {
    // Fail closed: never send to an unset or unexpected destination.
    if (!ready || submitting) {
      event.preventDefault();
      if (!ready) {
        error.textContent = "Sign-ups are not open on this page yet. No information has been sent.";
        error.hidden = false;
      }
      return;
    }
    updateRoles();
    for (const field of form.querySelectorAll("input, textarea, select")) {
      if (["text", "email", "url", "textarea"].includes(field.type)) field.value = field.value.trim();
      validateField(field);
    }
    validateSessionConsistency();
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }
    if (navigator.onLine === false) {
      event.preventDefault();
      error.textContent = "You appear to be offline. Reconnect before submitting. Your answers have not been saved by this page.";
      error.hidden = false;
      return;
    }
    byId("submitted-at").value = new Date().toISOString();
    error.hidden = true;
    submitting = true;
    submit.disabled = true;
    submit.textContent = "Continuing to submission confirmation…";
    // Normal HTTPS form POST to our Google Apps Script. The receiving script,
    // not this page, decides whether a record was actually saved and shows the result.
    // No AJAX, no no-cors request, and no invented browser-side success message.
    // Do not disable successful controls before the browser sends them.
    // The browser timestamp and hidden fields are untrusted, not identity proof.
  });

  window.addEventListener("pageshow", () => {
    submitting = false;
    submit.disabled = !ready;
    submit.textContent = "Join the beta interest list ↗";
    updateRoles();
    for (const field of form.querySelectorAll("input, textarea, select")) validateField(field);
    validateSessionConsistency();
  });
  window.addEventListener("offline", () => {
    error.textContent = "You appear to be offline. Reconnect before submitting. Your answers have not been saved by this page.";
    error.hidden = false;
  });
  window.addEventListener("online", () => {
    if (error.textContent.startsWith("You appear to be offline")) error.hidden = true;
  });
  updateRoles();
})();
