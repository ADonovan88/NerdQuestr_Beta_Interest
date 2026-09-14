# Current storage: private Google Sheet

The Applications tab in the bound response spreadsheet is now the source record. No paid integration or provider export is needed. 

Extra server columns: received_at_utc, submission_id, review_status, email_notification, email_key and request_fingerprint. Do not rename source headings. Use a separate analysis tab or workbook for summaries. Never count notification emails as application totals: emails can be capped or fail while the row remains saved. Review_status starts Needs review. Mark test records Test / exclude; separately review duplicates and suspected spam. Role totals can overlap; each person is still one applicant. Email case normalization helps deduplication but does not prove identity or perfectly identify unique people. The intake has no email verification.

Survey_version stays 2026-09-14-v2 because the questions are unchanged. Form and privacy versions are 2026-09-14-google-v1 because delivery and the notice changed. Blank optional values are not zeros. Survey_included=yes records the separate permission, not a guarantee that any optional answers were filled.

For Futurpreneur: share only non-identifying aggregates. Distinguish self-reported interest, verified follow-up commitments and actual beta participation. State your recruitment sources and the number answering each optional question. Exclude tests, obvious spam and duplicates before reporting totals. Avoid small subgroups or quotes that identify people. Review withdrawal/deletion requests before preparing a new report.

## Reading NerdQuestr's beta-interest results

Survey edition: 2026-09-14-v2. This is an interpretation guide, not a live analytics dashboard. The response spreadsheet is configured separately in Apps Script. The ZIP contains no actual applicant data.

## What to report first

| Measure | Count or filter | Important qualification |
|---|---|---|
| Unique interest-list applicants | Valid applications, after manual review and deduplication | One person with four roles is one applicant. The script blocks identical submissions within ten minutes, but manual review is still needed for applicant-level deduplication. |
| Interest by role | `role_gm`, `role_player`, `role_artist`, `role_event` | These categories overlap. Never add them together to estimate the number of people. |
| Active-testing interest | Research permission present, `survey_included=yes`, `beta_readiness=active_testing` | These people expressed interest, not a binding testing commitment. |
| Existing paid-GM activity | Consenting GMs with `gm_paid_sessions_status=number`, count greater than zero | Use the number answering this question as the denominator. Exclude blank/not-sure answers from the numeric denominator. |
| Existing paid-player activity | Consenting players with `player_paid_sessions_status=number`, count greater than zero | The number is sessions attended, not transactions or unique GMs. |
| Potential first-month listings | Consenting GMs with `gm_beta_listings_status=number` | Label as prospective session-listing estimates. Do not report as confirmed bookings or commitments. |
| Player budget expectations | `player_budget_status=amount`, valid amount and currency | Report currencies separately. Do not average CAD and USD together. |
| Artist audience | Selected `artist_goal_*` fields and `artist_orders_status` | Artist goals are multi-select. Their percentages can exceed 100% in total. Orders are not revenue. |
| Near-term event supply | `event_listing_next_3mo=planned` or `possible` | Report these two groups separately. Neither is a confirmed NerdQuestr listing. |
| Recruitment channels | Nonblank `referral_source` for survey participants | This is self-reported source, not verified attribution or advertising ROI. |
| Country / time-zone distribution | Nonblank answers from consenting survey participants | Not every applicant answers the survey, and a time zone is not a verified residence. |

The optional survey is self-selected and not a representative sample of the entire TTRPG market. Report the recruitment period, where the form was shared, the total valid applicant count, and how many answered each reported question. A useful wording is “Among [n] beta applicants who answered this question, [x] reported …”. Do not substitute invented numbers or treat intent as sales. This interpretation is consistent with the AAPOR survey guidance linked below.

## Before analyzing responses

Keep raw files in a restricted-access business storage location, not GitHub, Vercel/public, a public dashboard, or a funding attachment. The website does not collect data into a public JSON file and does not provide an administrator page.

Filter out tests, spam, invalid/withdrawn permissions and obvious duplicates. Use the server-generated received_at_utc and submission_id columns. `submitted_at_client_utc` is a browser-supplied fallback; it can be inaccurate or forged. All browser-submitted fields are untrusted and should be reviewed.

Normalize accidental leading/trailing spaces when comparing email addresses, and review likely duplicates rather than merging automatically. Do not remove periods or plus suffixes across all email providers, assume two different addresses are two people, or assume one shared address is one person. Keep the applicable consent history and respect subsequent withdrawals.

For research using optional answers, use only records with recorded research permission and `survey_included=yes`, subject to later withdrawals. Opting in with all questions blank is not a completed survey. For each question, separately report numeric answers, “not sure”, explicit refusal and skipped answers as appropriate. **Blank is not zero.** Neither `not_selling_yet` nor `not_sure` should silently be converted into a number.

When sharing results, use non-identifying aggregates. Remove names, emails, websites and raw open-text responses. Avoid narrow combinations of country, role, event type and other details that could identify someone. Combine or omit tiny categories as needed; no fixed group-size rule guarantees anonymity. Do not quote a recognizable response or describe a specific person's promised participation without separate permission.

Do not include raw survey data in a Futurpreneur package. Use aggregated counts and a description of the method instead. Keep identifiable survey answers subject to the retention and withdrawal process approved for the site; deleting a sheet row does not delete related email or export copies.

## Field dictionary

Fields use stable, machine-readable names. The browser posts text; Apps Script validates selected fields and stores valid session counts and budget amounts as numbers. The server prepends the administrative columns described above.

### Core form and metadata

| Field | Meaning / values |
|---|---|
| `name` | Preferred contact name, not a required legal name. |
| `email` | Primary contact email; used by Apps Script as the notification Reply-To address. |
| `alternate_email` | Optional additional contact email. |
| `selected_roles` | Human-readable list of selected role labels. |
| `role_gm`, `role_player`, `role_artist`, `role_event` | Each is `1` selected or `0` not selected. Count people once, roles separately. |
| `ttrpg_experience` | Selected experience label; optional with no gaming role. |
| `hosted_sessions_30d` | Individual sessions run as GM in the past 30 days. Blank is not zero. |
| `played_sessions_30d` | Individual sessions attended as player in the past 30 days. |
| `preferred_systems` | Optional free text about games/systems. |
| `art_details`, `art_portfolio_url` | Relevant only when Artist is selected; link is optional. |
| `event_details`, `event_website_url` | Relevant only when Event creator is selected; link is optional. |
| `age_confirmation` | Self-attestation text for age 18+. Not age verification or an ID check. |
| `beta_contact_permission` | The checked beta-contact permission wording. |
| `survey_research_permission` | Checked research-permission wording, only present when opted in. |
| `survey_included` | `yes` or `no`. `yes` does not mean every survey question was answered. |
| `form_version`, `privacy_notice_version` | `2026-09-14-google-v1`; preserve version fields when comparing results. |
| `survey_version` | `2026-09-14-v2`; questions are unchanged in the Google migration. |
| `submitted_at_client_utc` | ISO timestamp generated on attempted valid submission, from the browser clock. Use received_at_utc in preference to the browser clock. |
| `_gotcha` | Honeypot field; expected blank. A spam signal, not a security guarantee. |

### Shared optional survey

| Field | Meaning / values |
|---|---|
| `country_code` | Country/territory code, `XK` for Kosovo, `other`, `prefer_not_to_say`, or blank. |
| `time_zone` | Chosen IANA-style time-zone identifier, `UTC`, `other`, `not_sure`, or blank. No location lookup. |
| `current_platforms` | Optional free text; can mention more than one service. |
| `current_challenge` | Optional free text. Code into broad themes manually; do not publish raw identifying responses. |
| `referral_source` | `discord`, `reddit`, `social_other`, `friend_colleague`, `group_store_event`, `web_search`, `other`, `dont_remember`, or blank. |
| `beta_readiness` | `active_testing`, `explore_beta`, `beta_updates`, `not_sure`, or blank. `beta_updates` means beta-opening updates, not unrelated product marketing. |

### Role-specific optional survey

| Status field | Associated value | Status choices |
|---|---|---|
| `gm_paid_sessions_status` | `gm_paid_sessions_30d` | `number`, `not_sure`, blank |
| `gm_beta_listings_status` | `gm_beta_listings_first_month` | `number`, `not_sure`, blank |
| `player_paid_sessions_status` | `player_paid_sessions_30d` | `number`, `not_sure`, blank |
| `artist_orders_status` | `artist_orders_30d` | `number`, `not_selling_yet`, `not_sure`, `prefer_not_to_answer`, blank |
| `event_count_status` | `events_organized_12mo` | `number`, `not_sure`, blank |

Numeric values are included only when `number` is selected. They must be non-negative whole numbers in the browser. Changing to an uncertainty/skip choice excludes an earlier number from the submission, even when the visitor could restore it by selecting the number option again.

`player_budget_status`: `amount`, `not_interested`, `depends`, or blank. Only `amount` includes `player_budget_amount` and `player_budget_currency`. Currency is required with an amount; choosing `other` also requires `player_budget_currency_other`. The amount can be decimal. Do not collapse `not_interested`, `depends`, blank and zero into the same category. Currency selections are not proof of location.

`artist_goal_commissions`, `artist_goal_originals`, `artist_goal_prints_merch`, `artist_goal_digital_assets`, `artist_goal_portfolio`, `artist_goal_other`: each checked choice submits `yes`. Unchecked choices are omitted. If none is checked, treat the question as skipped, not as an explicit rejection of every goal.

`event_listing_next_3mo`: `planned`, `possible`, `no`, `not_sure`, or blank. The preceding event activity question uses a 12-month lookback; the listing question uses a three-month forward window. Do not combine their time periods.

## Comparing earlier versions

Preserve all version fields. Older typical-month session questions are not equivalent to the present past-30-days wording. Do not merge old contact permissions with the new optional research permission. The Google migration changes form/privacy versions, not the questions or the survey_version field.

## Reference information

- Google Apps Script web apps: https://developers.google.com/apps-script/guides/web
- Google usage limits: https://developers.google.com/apps-script/guides/services/quotas
- AAPOR survey best practices: https://aapor.org/standards-and-ethics/best-practices/
