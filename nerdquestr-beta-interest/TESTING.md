# Testing notes: survey edition v2

Checked September 14, 2026. The delivered configuration remains blank and launch approval remains false.

## Scope and limitations

The test browser's network navigation was restricted. Tests therefore used the actual HTML/CSS/JavaScript through offline DOM injection in Chromium, without bypassing browser policy. Two native submit events were intercepted before network navigation and their form data inspected. No real Formspree requests were sent, and no successful inbox delivery or provider acceptance is claimed.

The checks cover form state, conditional fields, consent exclusion, browser validation and screen widths. They do not certify security, privacy-law compliance, accessibility or cross-browser support. The Vercel headers were reviewed as configuration only; a deployed response and its CSP behaviour were not tested. Browser-return behaviour was checked with a simulated `pageshow`, not real navigation from Formspree.

No Google Workspace alias, Formspree connection, GitHub repository or Vercel deployment was created by this update. Live delivery, CAPTCHA, spam filtering, provider limits, actual email Reply-To and send-as still need the README checklist.

The screenshots contain synthetic demonstration values, not actual applicants. They show the expanded survey; the delivered page starts with it collapsed and permission unchecked.

## Passed checks

81 assertions passed:

- index.html: unique IDs
- index.html: label and ARIA targets resolve
- index.html: local links resolve; no main-site web links
- privacy.html: unique IDs
- privacy.html: label and ARIA targets resolve
- privacy.html: local links resolve; no main-site web links
- Unconfigured package blocks submission
- Preview notice shown
- Survey initially collapsed and disabled
- No time zone preselected
- Valid endpoint plus approval enables form
- Configured page hides preview notice
- Role combination 0000: validity correct
- Role combination 0001: validity correct
- Role combination 0010: validity correct
- Role combination 0011: validity correct
- Role combination 0100: validity correct
- Role combination 0101: validity correct
- Role combination 0110: validity correct
- Role combination 0111: validity correct
- Role combination 1000: validity correct
- Role combination 1001: validity correct
- Role combination 1010: validity correct
- Role combination 1011: validity correct
- Role combination 1100: validity correct
- Role combination 1101: validity correct
- Role combination 1110: validity correct
- Role combination 1111: validity correct
- All 16 combinations: role flags, conditional sections and payloads correct
- Artist-only applicant can omit gaming questions
- Event-only applicant can omit gaming questions
- GM/player gaming questions still required
- Zero sessions accepted without research participation
- Skipped survey sends neither answers nor research permission
- Device time-zone button uses explicit browser-zone choice
- Budget cannot be sent without currency
- Decimal budget with currency is accepted
- Unlisted currency needs a name or code
- Explicit unlisted currency is supported
- Irrelevant old currency value excluded
- Paid sessions cannot exceed total hosted sessions
- Fractional order/session counts rejected
- Negative counts rejected
- Not-sure excludes stale invalid number and is not zero
- Deselected GM answers excluded
- Deselected artist details and survey answers excluded
- Unchecking permission excludes all previously answered survey fields
- Skip button keeps contact information
- Skip button clears survey answers and permission
- Skip button collapses survey
- Invalid value rejected: #contact-name
- Invalid value rejected: #alternate-email
- Invalid value rejected: #hosted-games
- Invalid value rejected: #played-games
- Age confirmation required
- Beta contact permission required
- Non-HTTP portfolio URL rejected
- Valid optional HTTP(S) URL accepted
- Offline submission blocked with honest message
- Native submit event intercepted before network: skipped survey excluded
- Submit-event payload contains timestamp and versions
- Simulated pageshow restores submission button
- Completed four-role survey valid
- Invalid collapsed survey opens so field is reachable
- Full survey no horizontal overflow at 320px
- Full survey no horizontal overflow at 375px
- Full survey no horizontal overflow at 390px
- Full survey no horizontal overflow at 520px
- Full survey no horizontal overflow at 768px
- Full survey no horizontal overflow at 1024px
- Full survey no horizontal overflow at 1440px
- Native submit event intercepted before network: four-role survey included once
- Submit-event payload preserves currency, decimal amount and zero intent
- Multiple artist goals preserved in separate columns
- Provider reply-to field and separate research permission present
- Privacy page no overflow at 320px
- Privacy page no overflow at 390px
- Privacy page no overflow at 768px
- Privacy page no overflow at 1440px
- No JavaScript runtime errors
- Exactly two representative submit events intercepted; no provider requests sent

JavaScript syntax checks also passed for `form.js` and `site-config.js`.
