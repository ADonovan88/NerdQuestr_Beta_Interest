# Google Sheets connection update

This update replaces the former paid form-provider connection. The Google Apps Script URL supplied by Amanda is already in public/site-config.js.

## This upload only

1. Extract the update ZIP.
2. In GitHub open NerdQuestr_Beta_Interest > nerdquestr-beta-interest (the folder containing public and vercel.json).
3. Add file > Upload files. Upload the contents of the extracted update, including the public folder intact, into that existing project folder. Do not upload the ZIP or create another nested project folder.
4. Commit to main. Keep the existing Vercel root directory nerdquestr-beta-interest and output directory public.

The browser submit button stays disabled because launchApproved is false. Apps Script intake is also still closed. Neither switch is changed by uploading these files.

## Later, with the owner ready to test

Review public/privacy.html, including the up-to-12-month retention commitment, then set launchApproved to true in public/site-config.js and commit. Run openBetaIntake from the already deployed Apps Script project. This function changes a script property; it does not send an application. Do not replace the Apps Script code or create a second spreadsheet.

Make a real test from the deployed beta website using an email you control. The Google confirmation must say the application was saved. Check the Applications tab and the beta inbox. Mark test records Test / exclude in review_status. Do not count test rows as validation. Check anonymous access in a private browsing window before sharing publicly.

Opening intake makes this public endpoint accept anyone's valid submission, not just a tester. It is not a password-protected private beta gate. Pause using closeBetaIntake whenever needed.

The endpoint URL is public, not a password. Never put spreadsheet links, applicant data, API secrets or account credentials in GitHub.
