# NerdQuestr: standalone beta-interest website

Prepared for Amanda Larson · September 14, 2026 · Survey edition v2

## What is ready, and what is not

The website files are ready to upload. **This package has not been deployed. No email alias, Formspree account, GitHub repository, or Vercel project has been created for you.**

Submissions are intentionally disabled until you add your own Formspree form address and approve launch. Opening the page locally is a visual preview, not a test of email delivery.

This is a separate static website, not a copy of your main app. Use a **new GitHub repository and a new Vercel project**. Do not upload these files into the existing NerdQuestr repository. No existing domain, DNS, database, authentication, or payment settings need to be changed for this site.

The proposed project name is `nerdquestr-beta-interest`. Its eventual public address is the address Vercel assigns; no address has been reserved or verified available.

## What the form collects

- Game Master, Player, Artist and Event creator interests, independently selectable, including all four.
- Preferred contact name, preferred email and an optional alternative email.
- TTRPG experience, including new-player and not-applicable options.
- Individual sessions hosted and played in the past 30 days, separately. Zero is valid. These and the experience answer are optional for people selecting neither GM nor Player.
- Optional game/system preferences.
- Artist details and an optional portfolio URL when Artist is selected.
- Event details and an optional event URL when Event creator is selected.
- Required, initially unchecked 18+ confirmation and beta-specific contact permission.
- A separate optional survey with country/territory, time zone, existing platforms, an open-ended difficulty question, referral source and beta readiness.
- Two additional optional questions for each selected role: paid-GM activity/potential listings; paid-player activity/budget with currency; artist goals/order counts; and events organized/upcoming listing intent.
- A separate, initially unchecked survey-use permission for product planning and non-identifying business/funding summaries.
- Stable column names, role flags, form/survey/privacy versions and a browser-supplied submission timestamp.

Deselecting a role excludes that role’s details and survey answers. Unchecking survey permission excludes all survey answers, even when the browser still displays previously typed values after re-enabling it. “Skip survey” clears just the survey. Closing its panel only hides it; checked permission continues to include answers. This is an interest list, not an account registration, a payment form, or a general newsletter subscription. There are no file uploads.

The design uses CSS and system fonts, with no external font service, image generator, analytics script, or advertising tracker.

## Files

```text
README.md                 This setup guide; not part of the public website
TESTING.md                What was checked and what still needs live testing
ANALYTICS.md              Field definitions, interpretation and privacy-safe summaries
START-HERE.md             Short replacement/upload instructions for this edition
vercel.json               Static deployment settings and proposed HTTP headers
public/
  index.html              Landing page, questions and consent text
  styles.css              Colours, typography and responsive layout
  site-config.js          The two settings you need to edit
  form.js                 Role behaviour, validation and submission handling
  privacy.html            Draft beta-interest privacy notice for your approval
  robots.txt              Allows crawlers to read the page's noindex instruction
```

There is no `package.json`, build step, database, or secret key required by this static implementation.

## Step 1: create and test beta@nerdquestr.com

These steps assume `nerdquestr.com` is already receiving email through your Google Workspace account.

1. Sign in to **Google Admin** using your existing administrator account.
2. Go to **Directory → Users** and open the existing user whose inbox should receive beta applications.
3. Select **Add Alternate Emails**, enter `beta` as the alias, select `nerdquestr.com` where applicable, and save.
4. From an external email account, send a test message to `beta@nerdquestr.com`. Check the selected user's primary inbox and spam folder. Allow up to 24 hours for the alias change to take effect.

Do not create a new paid user just to make this alias. An alias delivers to an existing user's mailbox; it is not a separate Google login. Google currently permits up to 30 aliases per user at no additional cost. [1]

For replies showing **From: beta@nerdquestr.com**, open the receiving Gmail account and go to **Settings → See all settings → Accounts and Import** (or **Accounts**) **→ Send mail as → Add another email address**. Add the alias and complete any verification. Test an outgoing message and check its visible From address. Receiving through an alias does not, by itself, configure outgoing mail. [2]

Do not paste email passwords or verification codes into GitHub or the website.

## Step 2: create the form-delivery connection

Formspree is the proposed third-party form service for this package. It receives submissions, keeps submission history within your plan, and sends notifications to your chosen recipient. Merely adding the email alias to HTML would not create this delivery system. [3]

1. Create/sign in to your own Formspree account and verify your account email.
2. In your account's linked email settings, add and verify `beta@nerdquestr.com` if it is not already verified.
3. Create a new form named **NerdQuestr Beta Interest**.
4. In that form's **Workflow**, open the **Email** action settings and choose the verified beta alias as the **Target Email**. Add an Email action if there isn't one. Some older forms show the target under Settings instead. Save the configuration. [4]
5. In the form's **Integration** section, copy **Your form's endpoint**. It will look like `https://formspree.io/f/XXXXXXXX`. Copy the endpoint only, not the example HTML form. [3]
6. In form settings, enable/retain the available CAPTCHA/spam protection. This site uses a normal form POST so Formspree can handle its own CAPTCHA and confirmation screens. It does not include custom CAPTCHA keys. [5]

The endpoint is a public submission address, not a secret API key. Never add SMTP passwords, secret API keys, your main app's database credentials, or a Gmail password to any of these files.

**Plan limits:** Formspree currently describes its Free plan as starting at 50 submissions per month and retaining 30 days of submission history. Check your account's current limits before a broad recruitment announcement. Do not treat Free submission history as a permanent applicant database. [6]

This implementation sets the primary `email` field so notification replies can target the applicant. That is different from the notification recipient, which must be configured as the beta alias in Formspree. [7]

## Step 3: create a separate GitHub repository

1. Extract the ZIP on your computer. Open the extracted `nerdquestr-beta-interest` folder.
2. In GitHub, create a **new** repository named `nerdquestr-beta-interest`. Private visibility is recommended. Initializing with a README makes the upload screen straightforward. [8]
3. In the new repository, choose **Add file → Upload files**.
4. Upload the **contents** of the extracted folder: `public`, `vercel.json`, `README.md`, `TESTING.md`, `ANALYTICS.md` and `START-HERE.md`. Dragging the folder contents into the upload area preserves `public` and its files. Do not upload the ZIP and do not add an extra outer folder level. [9]
5. Commit the files to the default branch. Replacing the just-created starter README with this guide is intentional.

The repository's top level should show `public` beside `vercel.json`, not an outer `nerdquestr-beta-interest` folder containing everything.

There must not be any real applications, applicant emails, or exported contact lists in the repository. A private repository is not a contact database.

## Step 4: deploy a NEW Vercel project

Import only the new repository. Do not change the settings of the existing NerdQuestr project.

In Vercel, choose **Add New → Project**, select/import `nerdquestr-beta-interest`, and check these settings. A Git-connected project can deploy new changes committed to its production branch. [10]

| Setting | Value for this package |
|---|---|
| Project | A new project, suggested name `nerdquestr-beta-interest` |
| Framework Preset | `Other` |
| Root Directory | Repository root; leave the default, not `public` |
| Build Command | No command / blank; skip the build step |
| Install Command | No command / blank |
| Output Directory | `public` |
| Environment variables | None required for this implementation |

The supplied `vercel.json` already specifies the output and empty build/install commands. These are static-site settings, not Next.js settings. [11]

Deploy and open the **new project's** assigned public URL. Do not connect or transfer `nerdquestr.com` or any of its current domains. Use the stable production URL, not a temporary preview URL, for the eventual recruitment link.

The first deployment will show the preview notice and disabled submit button. That is expected.

**Vercel plan:** Hobby is restricted to non-commercial personal use. This is business beta recruitment; choose an appropriate commercial plan/team rather than assuming a free Hobby project is permitted. Check your existing team before buying anything. This package has not changed your subscription. [12]

## Step 5: review privacy and approve collection

Read `public/privacy.html` and the consent section in `public/index.html` before enabling submissions. They are a **draft for owner/legal review**, not a statement that all international privacy or anti-spam requirements have been satisfied.

In particular, confirm:

- The collector's identity is correct. It currently says **Amanda Larson, operating NerdQuestr in Alberta, Canada**, not a corporation that has not yet been formed.
- Formspree, Vercel and Google Workspace reflect the actual services used. Review their terms and cross-border processing before opening a global interest form.
- You approve the proposed **up to 12 months** retention for interest submissions and will actually manage deletion from both Formspree and email. This is an operational choice for approval, not a legally prescribed retention period. Shorten or change it consistently if needed.
- The beta inbox can receive withdrawal, correction and deletion requests, and access is limited to authorized administrators.
- Contact is about beta invitations/participation only. Do not import these people into unrelated marketing on the strength of this checkbox.
- Optional survey permission is separate. Only opted-in survey responses may be used for that research. Summaries must not identify individuals or include raw answers, names, emails or portfolio links. Survey withdrawal does not automatically withdraw beta-contact permission, and vice versa.
- The proposed retention covers Formspree, email and any spreadsheet or other exports. No automated deletion job is included; assign someone to follow the policy.
- The survey includes self-reported price expectations and activity, not verified income, orders or future commitments. Do not label survey intent as confirmed revenue or signed commitments.

This draft tells visitors the main categories collected, purposes, service providers, cross-border handling and their choices. Meaningful consent also requires an accurate actual process, not just a checkbox. [13]

Use multi-factor authentication on administration accounts. Review incoming data before acting: browser validation, age self-attestation and hidden fields are not proof of identity or server-enforced rules. Public form endpoints can receive forged data. Do not click untrusted portfolio/event links carelessly.

## Step 6: connect and enable your form

In **the new GitHub repository only**, open:

**public → site-config.js → Edit this file (pencil icon)**

Replace the empty value after `formspreeEndpoint` with the real endpoint copied in Step 2. Keep the quotation marks. After completing Steps 1–5, change `launchApproved: false` to `launchApproved: true`.

For example, the two settings will look like this, except you must use your own endpoint:

```js
window.NERDQUESTR_BETA_CONFIG = Object.freeze({
  formspreeEndpoint: "https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID",
  launchApproved: true
});
```

**Do not use that example as an actual endpoint.** Keep the original comments or replace the whole file with the same structure and your real endpoint. Commit the change and let the new Vercel project redeploy.

If the form remains disabled, check the endpoint is exactly a Formspree `/f/` address and that `true` is not in quotation marks. Only a valid-looking endpoint and the explicit approval enable the submit button. The code does not independently verify mailbox delivery.

Once you know the stable site hostname, use Formspree's **Project Settings → Restrict to Domain** to limit expected submissions to that hostname, without `https://` or a path. Then test from that exact deployed URL. Keep this project's existing `strict-origin-when-cross-origin` referrer policy: Formspree uses the referrer for this check, and removing it can send legitimate submissions to spam. This domain check is a spam-reduction measure, not an access-control guarantee. [14]

## Step 7: live test before sharing the link

Use addresses you control, not someone else's address. Your tests count against provider limits.

1. Open the **production URL** in a private browser window while signed out of Vercel. It must be publicly accessible without a Vercel team login. Check this project's deployment protection if it is not; do not alter the main project's protection.
2. Submit one valid player-only test. Complete any CAPTCHA. Check Formspree's actual confirmation, its submissions dashboard, and the beta inbox. Search spam/junk too. A button click alone is not confirmation of receipt.
3. Submit an all-four-roles test with both art and event details, past-30-day counts and an optional alternative email, then opt into and answer each survey section. Verify that every supplied field arrives.
4. Reply to a notification. Confirm the **To** address is the tester's primary email, then select **From: beta@nerdquestr.com** and verify receipt from another inbox.
5. Check required roles, consent, email and conditional descriptions block incomplete entries, while optional empty fields and session zeros work. Submit once with the survey entirely skipped, and once with its permission unchecked after typing answers: neither should send survey data. Test from your phone.
6. Delete the test submissions and their email copies. Check provider usage limits and complete your privacy/operational review before sharing the link widely.

There is no automatic confirmation email to applicants in this package. Formspree provides its submission screen; automatic email responses would be a separate provider setting/plan decision. There is no automatic spreadsheet sync, analytics dashboard or beta account provisioning. The survey captures structured responses; see ANALYTICS.md to analyze exports. Formspree lists CSV/JSON exports on its Personal, Professional and Business plans. Check your current plan before relying on export. [15]

## Editing, pausing and maintenance

Copy/questions: `public/index.html`. Appearance: `public/styles.css`. Collection notice: `public/privacy.html`. Endpoint and launch switch: `public/site-config.js`.

To pause the page, change `launchApproved` to `false` and redeploy. **Also disable the form in Formspree** if you need to stop acceptance immediately or prevent old browser tabs/direct endpoint submissions. Changing the page alone does not revoke its public endpoint.

Review applications and provider usage regularly. The website is not an administrator dashboard, and it does not deduplicate applicants or turn survey responses into market-size estimates. Keep your own limited-access records only as necessary for beta coordination. Do not put applicant data in GitHub or Vercel source files. Deleting a Formspree record does not delete the delivered email copy.

The page and proposed Vercel headers request no search indexing. **Noindex is not password protection, confidentiality, or a guarantee of removal from search engines.** Anyone with the deployed public link can visit it. Its separation is from the main application, not from the NerdQuestr brand.

The Content Security Policy permits the configured Formspree host for form submissions and forbids arbitrary inline scripts/embedded frames. It does not turn browser-side validation into server-side verification. If changing providers, review the code, headers, privacy notice and delivery behaviour together rather than replacing only the email address.

## Official references

Setup details and limits were checked September 14, 2026. Provider interfaces and limits may change.

[1] Google Workspace aliases: https://knowledge.workspace.google.com/admin/users/add-or-delete-an-alternate-email-address-email-alias

[2] Gmail send-as: https://support.google.com/mail/answer/22370

[3] Formspree HTML forms and endpoint: https://help.formspree.io/articles/building-your-form/building-an-html-form

[4] Formspree recipients: https://help.formspree.io/articles/form-and-project-settings/changing-a-form-email-address

[5] Formspree CAPTCHA: https://help.formspree.io/articles/form-and-project-settings/recaptcha-settings

[6] Formspree plan limits: https://help.formspree.io/articles/account-management/account-limits

[7] Formspree Reply-To field: https://help.formspree.io/articles/building-your-form/email-reply-to-address

[8] GitHub create a repository: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository

[9] GitHub file uploads: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

[10] Vercel GitHub integration: https://vercel.com/docs/git/vercel-for-github

[11] Vercel static build configuration: https://vercel.com/docs/builds/configure-a-build

[12] Vercel Hobby restrictions: https://vercel.com/docs/plans/hobby

[13] Meaningful consent guidance: https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/appropriate-handling-of-personal-information/collecting-personal-information-and-consent/consent/gl_omc_201805/

[14] Formspree domain restriction: https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain

[15] Formspree exports: https://help.formspree.io/articles/form-and-project-settings/exporting-submissions
