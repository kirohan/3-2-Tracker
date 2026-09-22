# Enable “Track with Google”

The repository now has **two separate actions**:

- **Download Excel** — always downloads `assets/BECM_2K22_3-2_Attendance_Tracker.xlsx`.
- **Track with Google** — asks the student to select their own Google/Gmail account and creates a private copy in that account.

The Google button supports two modes. Configure **either one** in `config.js`.

## Option A — Google OAuth + Drive API (recommended)

This mode does **not** require a public master Google Sheet. The website uploads the bundled Excel tracker into the student's selected Google Drive and converts it to Google Sheets.

### 1. Create a Google Cloud project

Open Google Cloud Console and create/select a project for this tracker.

### 2. Enable Google Drive API

Go to **APIs & Services → Library → Google Drive API → Enable**.

### 3. Configure OAuth consent screen

Go to **Google Auth Platform / OAuth consent screen**.

- App name: `BECM 2K22 Attendance Tracker`
- User support email: your email
- Audience: External (unless you intentionally restrict it)
- Add your email as a test user while the app is in Testing.

The website requests only:

`https://www.googleapis.com/auth/drive.file`

This limited scope lets the app create/access files it creates; it does not grant blanket access to the student's entire Drive.

### 4. Create OAuth client

Go to **Credentials → Create Credentials → OAuth client ID → Web application**.

Add your GitHub Pages origin under **Authorized JavaScript origins**.

Example:

`https://YOUR-GITHUB-USERNAME.github.io`

If you use a custom domain, add that HTTPS origin too.

No redirect URI is required for the popup token flow used by this static site.

### 5. Paste the Client ID

Open `config.js` and set:

```js
googleOAuthClientId: "YOUR_CLIENT_ID.apps.googleusercontent.com",
```

Keep `googleSheetTemplateUrl` empty if you want OAuth mode.

### 6. Push to GitHub Pages

Commit and push. After GitHub Pages redeploys, click **Track with Google**.

Expected flow:

1. Google account chooser opens.
2. Student selects their own Gmail/Google account.
3. Student grants the limited Drive permission.
4. Website creates **BECM 2K22 — 3rd Year 2nd Term Attendance Tracker** in that account's Drive.
5. The new Google Sheet opens automatically.

## Option B — Google Sheet template copy

If you prefer not to set up Google Cloud:

1. Upload the Excel tracker to your own Google Drive.
2. Convert it to Google Sheets.
3. Share it as **Anyone with the link → Viewer**.
4. Paste its URL into `config.js`:

```js
googleSheetTemplateUrl: "https://docs.google.com/spreadsheets/d/SHEET_ID/edit?usp=sharing",
```

The site automatically changes the URL to Google's `/copy` route. Google asks each student to sign in and makes a copy in their own Drive.

> If both `googleSheetTemplateUrl` and `googleOAuthClientId` are configured, template-copy mode is used first.

## Privacy

The website is static and has no backend. It does not receive or store:

- Gmail address
- Google password
- attendance entries
- CT marks
- other Drive files

In OAuth mode, the access token is used only in the student's browser to create the tracker and is not sent to K.I.Rohan / Bad Time Studio.
