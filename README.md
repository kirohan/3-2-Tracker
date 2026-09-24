# BECM 2K22 Attendance Tracker

A simple attendance + CT tracker website made specifically for **BECM 2K22 — 3rd Year, 2nd Term**.

**Creator:** K.I.Rohan  
**Studio:** Bad Time Studio

## Live actions

- **Download Excel** — downloads the offline `.xlsx` tracker.
- **Track with Google** — opens Google's official **Make a copy** screen for the configured master Sheet. Each student signs into their own Google account and saves an independent copy to their own Drive.

The website itself does **not** receive or store Gmail addresses, Google passwords, attendance data, or Drive contents.

## Google master Sheet

Configured template:

`https://docs.google.com/spreadsheets/d/1WRGS7WJIWpgdKtgoLukDnohH_XZkkWoAUH9FyFjlnyQ/edit?usp=sharing`

For the Track with Google button to work for everyone, set the master Sheet sharing to:

**General access → Anyone with the link → Viewer**

Do not make the master template editable by everyone. Each student should edit only their own copied version.

## Publish with GitHub Pages

1. Upload all repository files to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. Save.

The site is static and does not need a backend, Firebase, or Google OAuth client.

## Updating later

To change the Google Sheet template, edit `googleSheetTemplateUrl` in `config.js`.

To change the downloadable workbook, replace:

`assets/BECM_2K22_3-2_Attendance_Tracker.xlsx`

## Copyright

© 2026 K.I.Rohan • Bad Time Studio. Personal academic use only. Keep creator credit intact.

## Routine revision

The workbook bundled in this repository has been updated for the official routine effective **Sunday, 27 September 2026**. Weeks 1–3 remain unchanged; the revised routine applies from Week 4 onward.
