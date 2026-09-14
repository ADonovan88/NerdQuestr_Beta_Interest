/*
 * Public receiving address only. Do not put passwords or spreadsheet IDs here.
 * Apps Script writes to the private sheet; applicants never need sheet access.
 * Keep launchApproved false until the notice is reviewed and we are ready to test.
 * The separate Apps Script NQ_INTAKE_OPEN switch must also be opened for saving.
 */
window.NERDQUESTR_BETA_CONFIG = Object.freeze({
  googleAppsScriptUrl: "https://script.google.com/macros/s/AKfycbw_pLWmMJP6AWzQgNA0JhhXxdvDdrS9LXR42oUZX6HcQeOmXNmBRdLGJSmS4dOcgTj6Tw/exec",
  launchApproved: false
});
