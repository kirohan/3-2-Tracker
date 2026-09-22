# BECM 2K22 — 3rd Year 2nd Term Attendance Tracker

A GitHub Pages-ready attendance + CT tracker created specifically for **BECM 2K22, 3rd Year, 2nd Term**.

**Creator:** K.I.Rohan  
**Website / Studio credit:** Bad Time Studio  
**Copyright:** © 2026 K.I.Rohan

## Student actions

The website intentionally keeps the two actions separate:

- **Download Excel** → downloads the offline `.xlsx` tracker.
- **Track with Google** → asks the student to choose their own Google/Gmail account and creates/opens a private tracker in that account.

Google tracking never silently falls back to downloading Excel, so students always know which mode they are using.

## Repository contents

- `index.html` — responsive landing page + tutorial.
- `style.css` — complete website styling.
- `app.js` — Google account selection / Drive upload logic + template-copy fallback.
- `config.js` — one-time owner configuration.
- `GOOGLE_SETUP.md` — exact Google setup instructions.
- `assets/BECM_2K22_3-2_Attendance_Tracker.xlsx` — Excel tracker.
- `assets/dashboard-preview.png` — website dashboard preview.
- `LICENSE.md` — copyright / use terms.

## Publish with GitHub Pages

1. Upload every file/folder in this repository to your GitHub repository root.
2. Open **GitHub → Repository → Settings → Pages**.
3. Choose **Deploy from a branch**.
4. Branch: `main`; folder: `/ (root)`.
5. Save and wait for the Pages URL.

There is no npm install, build command, database, or server.

## Enable Track with Google

Read **`GOOGLE_SETUP.md`**.

Recommended method: configure a Google OAuth Web Client ID and enable Drive API. The site then asks each student to select their own Google account and creates the tracker directly in that Drive using only the limited `drive.file` scope.

Alternative method: put a Viewer-only Google Sheet template URL in `config.js`; the site sends students to Google's official **Make a copy** screen.

## Tracker logic

- Exam attendance threshold: **60%**.
- Theory: **3.00 credits → 3 routine classes/week**.
- Sessional: **1.50 credits → one 3-hour class/week**.
- BECM 3200: **0.75 credits → one 3-hour class every two weeks**.
- Theory CT: **30 + 30 marks**, one 30-mark part per teacher.
- Cancelled classes are excluded from attended/missed totals.
- Extra / make-up classes count when marked Attended or Missed.
- Spot tests / CT / quiz events can be logged against the class where they happened.

## Credits

The creator credit is present in the website and workbook:

**K.I.Rohan • Bad Time Studio**

The workbook also includes creator credit on Dashboard, Class Log and Routine & Holidays.

See `LICENSE.md` before redistributing, selling, rebranding or adapting the project.
