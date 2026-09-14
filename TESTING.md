# Testing checklist

## Before the owner opens intake

- Review the Google privacy notice and retention operations in README.md.
- Confirm spreadsheet sharing is Restricted; confirm only intended collaborators have access.
- Google web app is /exec, executes as the owner's Workspace account and allows Anyone.
- public/site-config.js contains the owner's exact URL and launchApproved remains false until testing.
- Both GitHub root and Vercel Root Directory remain nerdquestr-beta-interest, not public.
- The deployed headers must allow Google form navigation; never omit the updated vercel.json.

## Local checks performed for this update

Offline Chromium checks passed for all 15 role combinations with and without survey permission, the closed launch gate, required currency, paid/total session consistency and submit-event values. All 31 generated payloads passed the current Apps Script normalization function. JavaScript syntax and deployment JSON were checked. No real submissions, emails or spreadsheet writes were made. Browser navigation was restricted in the development environment, so the live hosting policy, Google navigation/redirects, permissions and delivery still require the owner test below.

## Live owner tests before recruitment

1. Review notice, enable launchApproved, wait for Vercel deployment, then run openBetaIntake in Apps Script.
2. In private browsing, confirm the form is usable without a Google login.
3. Submit with an email you control, using a name prefixed TEST. Google must confirm saved, the private sheet must contain one row, and email_notification should indicate delivery status. Check beta inbox and spam.
4. Check all four roles with optional survey consent and representative zero, number, amount/currency and text answers. Check columns match answers.
5. Check no-survey submission: its optional survey columns must be blank. Check artist-only and event-only applicants need not enter game history. Check changing roles strips irrelevant details.
6. Check the under-18/contact consent guards, negative/fractional counts, inconsistent paid counts and incomplete currency fields block submission.
7. Mark all test records Test / exclude in review_status, and exclude them from summaries. Never put real applicant data into GitHub.
8. closeBetaIntake pauses new saves without deleting records. Notification failure or cap is not loss of a saved row; check the sheet directly. Deferred notifications do not auto-retry.

Do not repeatedly submit from many addresses or load-test the live Apps Script endpoint. Its limits and Google's quotas apply.
