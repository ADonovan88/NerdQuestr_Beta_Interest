"use strict";

(() => {
  const form = document.getElementById("interest-form");
  if (!(form instanceof HTMLFormElement)) return;

  const byId = (id) => document.getElementById(id);
  const config = window.NERDQUESTR_BETA_CONFIG || {};
  const endpoint =
    typeof config.googleAppsScriptUrl === "string"
      ? config.googleAppsScriptUrl.trim()
      : "";

  const ready =
    /^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9_-]{20,200}\/exec$/.test(
      endpoint
    ) && config.launchApproved === true;

  const submit = byId("submit-button");
  const error = byId("form-error");
  const roles = Array.from(form.querySelectorAll(".role-checkbox"));

  let submitting = false;

  if (ready) {
    form.action = endpoint;
    byId("setup-notice").hidden = true;
    submit.disabled = false;
  }

  function activeRoles() {
    return new Set(
      roles
        .filter((role) => role.checked)
        .map((role) => role.dataset.role)
    );
  }

  function setSection(id, active, requiredSelector = "") {
    const section = byId(id);
    if (!section) return;

    section.hidden = !active;
    section.disabled = !active;

    for (const field of section.querySelectorAll(
      "input, textarea, select"
    )) {
      if (!active) {
        field.setCustomValidity("");
      }

      if (
        requiredSelector &&
        field.matches(requiredSelector)
      ) {
        field.required = active;
      }
    }
  }

  function updateConditionalCounts() {
    for (const choice of form.querySelectorAll(
      "[data-count-target]"
    )) {
      const include =
        !choice.matches(":disabled") &&
        choice.value === "number";

      setSection(
        choice.dataset.countTarget,
        include,
        "[data-number-entry]"
      );
    }
  }

  function syncNumberOrPrefer(
    numberId,
    preferId,
    statusId,
    active
  ) {
    const number = byId(numberId);
    const prefer = byId(preferId);
    const status = byId(statusId);

    if (!number || !prefer || !status) return;

    if (!active) {
      number.required = false;
      number.disabled = true;
      prefer.disabled = true;
      number.setCustomValidity("");
      status.value = "";
      return;
    }

    prefer.disabled = false;

    if (prefer.checked) {
      number.value = "";
      number.required = false;
      number.disabled = true;
      number.setCustomValidity("");
      status.value = "prefer_not_to_answer";
      return;
    }

    number.disabled = false;
    number.required = true;

    status.value =
      number.value !== "" ? "number" : "";

    number.setCustomValidity(
      number.value === ""
        ? "Please enter a number or select Prefer not to answer."
        : ""
    );
  }

  function syncBudget(active) {
    const amount = byId("player-budget-amount");
    const currency = byId("player-budget-currency");
    const prefer = byId("player-budget-prefer");
    const status = byId("player-budget-status");
    const otherWrap = byId("other-currency-fields");
    const other = byId(
      "player-budget-currency-other"
    );

    if (
      !amount ||
      !currency ||
      !prefer ||
      !status ||
      !otherWrap ||
      !other
    ) {
      return;
    }

    if (!active) {
      amount.required = false;
      currency.required = false;
      other.required = false;

      amount.disabled = true;
      currency.disabled = true;
      prefer.disabled = true;

      otherWrap.hidden = true;
      otherWrap.disabled = true;

      amount.setCustomValidity("");
      currency.setCustomValidity("");
      other.setCustomValidity("");

      status.value = "";
      return;
    }

    prefer.disabled = false;

    if (prefer.checked) {
      amount.value = "";
      currency.value = "";
      other.value = "";

      amount.required = false;
      currency.required = false;
      other.required = false;

      amount.disabled = true;
      currency.disabled = true;

      otherWrap.hidden = true;
      otherWrap.disabled = true;

      amount.setCustomValidity("");
      currency.setCustomValidity("");
      other.setCustomValidity("");

      status.value = "prefer_not_to_answer";
      return;
    }

    amount.disabled = false;
    currency.disabled = false;

    amount.required = true;
    currency.required = true;

    status.value = "amount";

    const otherCurrency =
      currency.value === "other";

    otherWrap.hidden = !otherCurrency;
    otherWrap.disabled = !otherCurrency;
    other.required = otherCurrency;

    if (!otherCurrency) {
      other.value = "";
      other.setCustomValidity("");
    }
  }

  function updateSurveyForRoles() {
    const selected = activeRoles();

    byId("survey-included").value = "yes";

    for (const role of [
      "gm",
      "player",
      "artist",
      "event",
    ]) {
      setSection(
        `survey-${role}`,
        selected.has(role)
      );
    }

    updateConditionalCounts();

    syncNumberOrPrefer(
      "gm_paid_sessions-number",
      "gm-paid-sessions-prefer",
      "gm_paid_sessions-status",
      selected.has("gm")
    );

    syncNumberOrPrefer(
      "player_paid_sessions-number",
      "player-paid-sessions-prefer",
      "player_paid_sessions-status",
      selected.has("player")
    );

    syncBudget(selected.has("player"));
  }

  function updateRoles(announce = false) {
    const selected = activeRoles();

    roles[0].setCustomValidity(
      selected.size
        ? ""
        : "Please select at least one role. You may select all four."
    );

    byId("selected-roles").value = roles
      .filter((role) => role.checked)
      .map((role) => role.value)
      .join(", ");

    for (const role of roles) {
      byId(
        `flag-${role.dataset.role}`
      ).value = role.checked ? "1" : "0";
    }

    if (selected.size) {
      byId("roles-error").hidden = true;
    }

    setSection(
      "artist-section",
      selected.has("artist"),
      "[data-conditional-required]"
    );

    setSection(
      "event-section",
      selected.has("event"),
      "[data-conditional-required]"
    );

    const gaming =
      selected.has("gm") ||
      selected.has("player");

    for (const field of form.querySelectorAll(
      "[data-gaming-required]"
    )) {
      field.required = gaming;
      field.setCustomValidity("");
    }

    for (const marker of form.querySelectorAll(
      ".gaming-required-marker"
    )) {
      marker.textContent = gaming
        ? "*"
        : "(optional)";

      marker.classList.toggle(
        "optional",
        !gaming
      );
    }

    byId("experience-help").textContent =
      gaming
        ? "Please answer these questions for Game Master or Player interest. Newcomers are welcome, and 0 sessions is fine."
        : "These questions are optional unless you select Game Master or Player. You can leave them blank if gaming is not relevant to your interest.";

    byId("select-all").textContent =
      selected.size === roles.length
        ? "Clear selections"
        : "Select all four";

    updateSurveyForRoles();

    if (announce) {
      byId(
        "role-status"
      ).textContent =
        `${selected.size} role${
          selected.size === 1 ? "" : "s"
        } selected. Art, event, and Section 04 role-specific questions update to match your selections.`;
    }
  }

  function validateField(field) {
    if (
      !(
        field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement ||
        field instanceof HTMLSelectElement
      )
    ) {
      return;
    }

    if (
      field.matches(".role-checkbox") ||
      field.type === "checkbox" ||
      field.type === "hidden"
    ) {
      return;
    }

    if (
      ![
        "gm_paid_sessions-number",
        "player_paid_sessions-number",
      ].includes(field.id)
    ) {
      field.setCustomValidity("");
    }

    if (field.matches(":disabled")) {
      return;
    }

    if (
      field.required &&
      !field.value.trim()
    ) {
      field.setCustomValidity(
        "Please complete this field."
      );
    } else if (
      field.type === "url" &&
      field.value.trim()
    ) {
      try {
        const url = new URL(
          field.value.trim()
        );

        if (
          !["https:", "http:"].includes(
            url.protocol
          )
        ) {
          throw new Error(
            "Unsupported protocol"
          );
        }
      } catch {
        field.setCustomValidity(
          "Please enter a complete website link starting with https:// or http://."
        );
      }
    } else if (
      field.type === "number" &&
      field.value !== ""
    ) {
      const value = Number(field.value);

      if (
        !Number.isFinite(value) ||
        value < 0
      ) {
        field.setCustomValidity(
          "Please enter a non-negative number. Zero is allowed."
        );
      } else if (
        field.step !== "any" &&
        !Number.isSafeInteger(value)
      ) {
        field.setCustomValidity(
          "Please enter a whole number, including 0."
        );
      }
    }
  }

  function validatePaidQuestions() {
    const selected = activeRoles();

    syncNumberOrPrefer(
      "gm_paid_sessions-number",
      "gm-paid-sessions-prefer",
      "gm_paid_sessions-status",
      selected.has("gm")
    );

    syncNumberOrPrefer(
      "player_paid_sessions-number",
      "player-paid-sessions-prefer",
      "player_paid_sessions-status",
      selected.has("player")
    );

    syncBudget(selected.has("player"));

    validateField(
      byId("gm_paid_sessions-number")
    );

    validateField(
      byId("player_paid_sessions-number")
    );

    validateField(
      byId("player-budget-amount")
    );

    validateField(
      byId("player-budget-currency")
    );

    validateField(
      byId(
        "player-budget-currency-other"
      )
    );
  }

  // The visitor explicitly chooses a time zone. No IP lookup or geolocation.
  const zoneSelect = byId("time-zone");
  const zones = new Set(["UTC"]);

  try {
    if (
      typeof Intl.supportedValuesOf ===
      "function"
    ) {
      for (const zone of Intl.supportedValuesOf(
        "timeZone"
      )) {
        zones.add(zone);
      }
    }
  } catch {
    /* The fallback below keeps older browsers usable. */
  }

  if (zones.size === 1) {
    for (const zone of [
      "America/Edmonton",
      "America/Vancouver",
      "America/Toronto",
      "America/New_York",
      "America/Chicago",
      "America/Denver",
      "America/Los_Angeles",
      "America/Sao_Paulo",
      "Europe/London",
      "Europe/Paris",
      "Europe/Berlin",
      "Africa/Johannesburg",
      "Asia/Kolkata",
      "Asia/Singapore",
      "Asia/Tokyo",
      "Australia/Sydney",
      "Pacific/Auckland",
    ]) {
      zones.add(zone);
    }
  }

  for (const zone of Array.from(
    zones
  ).sort()) {
    if (zone !== "UTC") {
      zoneSelect.add(
        new Option(
          zone.replaceAll("_", " "),
          zone
        )
      );
    }
  }

  zoneSelect.add(
    new Option(
      "Other / not listed",
      "other"
    )
  );

  byId(
    "use-device-zone"
  ).addEventListener("click", () => {
    try {
      const zone =
        Intl.DateTimeFormat().resolvedOptions()
          .timeZone;

      if (!zone) {
        throw new Error("Unavailable");
      }

      if (
        !Array.from(
          zoneSelect.options
        ).some(
          (option) =>
            option.value === zone
        )
      ) {
        zoneSelect.add(
          new Option(
            zone.replaceAll("_", " "),
            zone
          )
        );
      }

      zoneSelect.value = zone;

      byId(
        "timezone-status"
      ).textContent =
        `Selected ${zone.replaceAll(
          "_",
          " "
        )}. Change or clear it if that is not where you will take part.`;
    } catch {
      byId(
        "timezone-status"
      ).textContent =
        "Your device's time zone was unavailable. Please choose manually or skip.";
    }
  });

  for (const role of roles) {
    role.addEventListener(
      "change",
      () => updateRoles(true)
    );
  }

  byId(
    "select-all"
  ).addEventListener("click", () => {
    const select = !roles.every(
      (role) => role.checked
    );

    roles.forEach((role) => {
      role.checked = select;
    });

    updateRoles(true);
  });

  byId(
    "gm-paid-sessions-prefer"
  ).addEventListener(
    "change",
    validatePaidQuestions
  );

  byId(
    "player-paid-sessions-prefer"
  ).addEventListener(
    "change",
    validatePaidQuestions
  );

  byId(
    "player-budget-prefer"
  ).addEventListener(
    "change",
    validatePaidQuestions
  );

  function clearCorrectedError() {
    if (
      error.textContent.startsWith(
        "Please check"
      ) &&
      !form.querySelector(":invalid")
    ) {
      error.hidden = true;
    }
  }

  form.addEventListener(
    "input",
    (event) => {
      validateField(event.target);
      validatePaidQuestions();
      clearCorrectedError();
    }
  );

  form.addEventListener(
    "change",
    (event) => {
      updateConditionalCounts();
      validateField(event.target);
      validatePaidQuestions();
      clearCorrectedError();
    }
  );

  form.addEventListener(
    "invalid",
    (event) => {
      if (
        event.target === roles[0] &&
        !roles.some(
          (role) => role.checked
        )
      ) {
        byId("roles-error").hidden =
          false;
      }

      error.textContent =
        "Please check the highlighted fields.";

      error.hidden = false;
    },
    true
  );

  form.addEventListener(
    "submit",
    (event) => {
      // Fail closed: never send to an unset or unexpected destination.
      if (!ready || submitting) {
        event.preventDefault();

        if (!ready) {
          error.textContent =
            "Sign-ups are not open on this page yet. No information has been sent.";

          error.hidden = false;
        }

        return;
      }

      updateRoles();
      validatePaidQuestions();

      for (const field of form.querySelectorAll(
        "input, textarea, select"
      )) {
        if (
          [
            "text",
            "email",
            "url",
            "textarea",
          ].includes(field.type)
        ) {
          field.value =
            field.value.trim();
        }

        validateField(field);
      }

      validatePaidQuestions();

      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
        return;
      }

      if (
        navigator.onLine === false
      ) {
        event.preventDefault();

        error.textContent =
          "You appear to be offline. Reconnect before submitting. Your answers have not been saved by this page.";

        error.hidden = false;
        return;
      }

      byId(
        "survey-included"
      ).value = "yes";

      byId(
        "submitted-at"
      ).value =
        new Date().toISOString();

      error.hidden = true;
      submitting = true;
      submit.disabled = true;

      submit.textContent =
        "Continuing to submission confirmation…";

      // Normal HTTPS form POST to our Google Apps Script. The receiving script,
      // not this page, decides whether a record was actually saved and shows the result.
      // No AJAX, no no-cors request, and no invented browser-side success message.
      // Do not disable successful controls before the browser sends them.
      // The browser timestamp and hidden fields are untrusted, not identity proof.
    }
  );

  window.addEventListener(
    "pageshow",
    () => {
      submitting = false;
      submit.disabled = !ready;

      submit.textContent =
        "Join the beta interest list ↗";

      updateRoles();

      for (const field of form.querySelectorAll(
        "input, textarea, select"
      )) {
        validateField(field);
      }

      validatePaidQuestions();
    }
  );

  window.addEventListener(
    "offline",
    () => {
      error.textContent =
        "You appear to be offline. Reconnect before submitting. Your answers have not been saved by this page.";

      error.hidden = false;
    }
  );

  window.addEventListener(
    "online",
    () => {
      if (
        error.textContent.startsWith(
          "You appear to be offline"
        )
      ) {
        error.hidden = true;
      }
    }
  );

  updateRoles();
})();
