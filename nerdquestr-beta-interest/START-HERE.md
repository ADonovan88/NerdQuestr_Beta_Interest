# Start here: NerdQuestr beta-interest + optional survey

This is a full replacement package, not a small snippet to paste into the main app.
The delivered site is a preview with submissions OFF. There are no credentials or live form addresses inside it.

## Not uploaded the earlier version yet?

1. Extract this ZIP on your computer.
2. Open its `nerdquestr-beta-interest` folder.
3. Use the files from THIS folder for the separate beta GitHub repository.
4. Put `public` and `vercel.json` at the repository's top level. Do not upload the ZIP itself or an extra outer folder.
5. Follow `README.md` for the beta alias, Formspree and new Vercel project.

Do not place these files in the main NerdQuestr repository.

## Already uploaded the earlier beta version?

In the SEPARATE beta repository, replace these five files with the supplied versions:

- `public/index.html`
- `public/form.js`
- `public/styles.css`
- `public/privacy.html`
- `README.md`

Also add/replace `TESTING.md`, `ANALYTICS.md` and `START-HERE.md` for your records.

`public/site-config.js` and `vercel.json` have not changed. Keep your own real form endpoint if you have already added it. Do not replace it with this package's blank setting by accident.

Pause collection (`launchApproved: false`) while reviewing the updated notice, testing conditional fields and verifying delivery. If collection must stop entirely, disable the form in Formspree too; a page switch alone does not stop direct submissions or old browser tabs.

## Owner approval before launch

Review `public/privacy.html`: it names Amanda Larson as the current operator, separates optional research from beta contact, and proposes up to 12 months of identifiable-data retention. These commitments need your approval and an actual deletion process.

## Live test still needed

Use addresses you control. Check a survey-skipped application and an all-four-roles survey application in BOTH the Formspree dashboard and beta inbox. The local tests do not establish actual inbox delivery, CAPTCHA behaviour or provider acceptance.

The service still needs its verified recipient set to `beta@nerdquestr.com`. No new mailing list, account or payment flow has been added.
