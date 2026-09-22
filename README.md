# BECM 2K22 — Attendance Tracker Website

A GitHub Pages-ready companion website for the **BECM 2K22, 3rd Year, 2nd Term** attendance and class-test tracker.

**Creator:** K.I.Rohan  
**Studio:** Bad Time Studio  
**Copyright:** © 2026 K.I.Rohan

## What is included

- `index.html` — landing page, tutorial, academic rules and Track buttons.
- `style.css` — responsive design; no framework or build step.
- `app.js` — Google Sheets copy-link logic.
- `config.js` — one place to configure the Google Sheet template URL.
- `assets/BECM_2K22_3-2_Attendance_Tracker.xlsx` — Excel tracker.
- `assets/dashboard-preview.png` — dashboard preview used on the website.
- `LICENSE.md` — personal academic-use license / copyright notice.

## Publish with GitHub Pages

1. Create a new **public** repository, for example `becm-2k22-attendance-tracker`.
2. Upload every file/folder from this repository bundle to the repository root.
3. On GitHub open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main`, folder `/ (root)`, then Save.
6. GitHub will show the live Pages URL after deployment.

No npm, build command or hosting server is required.

## Activate the **Track** button (Google / Gmail copy)

This is the recommended method because each visitor gets a separate copy in their own Google Drive without your site storing any student data.

1. Upload `assets/BECM_2K22_3-2_Attendance_Tracker.xlsx` to Google Drive.
2. Open it with **Google Sheets** and save/convert it as a Google Sheet.
3. Confirm formulas, dropdowns and formatting after conversion.
4. Click **Share → General access → Anyone with the link → Viewer**.
5. Copy the Google Sheet URL. It will look like:
   `https://docs.google.com/spreadsheets/d/SHEET_ID/edit?usp=sharing`
6. Open `config.js` and paste the URL into:
   ```js
   googleSheetTemplateUrl: "PASTE_URL_HERE"
   ```
7. Commit the change.

The website automatically converts the template URL to Google's `/copy` route. When a student clicks **Track**, Google asks them to sign in if necessary and then shows **Make a copy**. The resulting tracker belongs to that student's Google account.

> Keep the template itself Viewer-only. Students should work on their own copies, not the master.

## How students use the tracker

1. Make a personal Google copy or download the Excel file.
2. On **Dashboard**, select the three sessional slots and the BECM 3200 odd/even-week cycle.
3. In **Class Log**, mark each class `Attended`, `Missed` or `Cancelled`.
4. For a spot test / CT / quiz, fill Test Type, Test By, Score and Out Of.
5. For an extra class, use the **EXTRA / MAKE-UP CLASS ENTRIES** section.
6. For a new KUET closure, add the date in **Routine & Holidays**.
7. Read attendance percentage, 60% eligibility, course progress, weekly progression and teacher-wise CT status from **Dashboard**.

## Spreadsheet logic

- Minimum exam attendance: **60%**.
- Theory courses: **3.00 credits**, 3 scheduled classes/week, 13 teaching weeks.
- Sessional courses: **1.50 credits**, one 3-hour class/week.
- BECM 3200: **0.75 credits**, one 3-hour class every two weeks.
- Theory CT: **30 marks from each teacher's course part** (60 total across both teacher parts).
- Cancelled classes do not count as attended or missed.
- Extra classes count when marked Attended or Missed.

## Credits / copyright

The visible creator credit is intentionally included in the website and workbook.

**© 2026 K.I.Rohan • Bad Time Studio**  
Created for BECM 2K22, 3rd Year, 2nd Term.

See `LICENSE.md` before redistributing or adapting the project.
