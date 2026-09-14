# NerdQuestr beta interest site: Google Sheets edition

A standalone static form hosted on Vercel, with a separate optional research survey. No main-site database or payment integration.

Data flow: browser HTTPS POST -> Google Apps Script -> private Applications sheet -> beta@nerdquestr.com notification when allowed.

## Deployment

Read START-HERE.md. Project root in the current repository: nerdquestr-beta-interest. Framework Other; no build/install command; output public. The updated vercel.json allows form navigation to Google. It does not allow browser AJAX or add tracking.

## Files

- public/index.html: original contact form and role-dependent optional survey; updated provider notice.
- public/form.js: validation, role filtering, consent-based survey exclusion and native form POST.
- public/site-config.js: public Google receiving URL and launchApproved switch, currently false.
- public/privacy.html: Google/Vercel notice for owner review, not a legal opinion.
- public/styles.css and robots.txt: unchanged design and search-indexing preferences.
- vercel.json: static deployment settings and security headers.

Do not run server-only Google functions in GitHub or paste secrets here. The already deployed bound Apps Script is a separate component. Do not make the response spreadsheet public.

## Confirmation and limits

This page never assumes success from a network request. The Google-hosted response says whether the script saved a record. It stays in the same browser tab; use Back to correct answers after an error. No browser local storage or automatic email to applicants is added.

The current receiving script uses owner-defined protective limits of 300 saved records per UTC day, 3 records per email per UTC day and 50 email notifications per UTC day. These are not Google quotas. Google imposes separate limits. After the notification cap, eligible applications can still be saved, with a deferred notification status. There is no automatic retry queue for deferred/failed email; check the sheet. Basic honeypot and repeat limits are not CAPTCHA or full abuse protection. Unverified email submissions are not identity proof.

Review the sheet for abuse, quota failures and duplicates before trusting analytics. See ANALYTICS.md and TESTING.md.

## Privacy operations

Review the stated retention and sharing practices before approving launch. Keep Restricted access, limit collaborators and keep exported copies private. Review monthly for expired records and apply the notice's 12-month maximum or earlier withdrawal requests. Deletion and survey-only withdrawal require a manual response across applicable sheets, exports and correspondence. Do not include names, email addresses or identifiable free text in funding summaries. A privacy notice is not a substitute for carrying out these practices.

## References

- https://developers.google.com/apps-script/guides/web
- https://developers.google.com/apps-script/guides/services/quotas
- https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
