/**
 * BECM 2K22 Attendance Tracker — public website configuration
 * Creator: K.I.Rohan • Bad Time Studio
 *
 * GOOGLE TRACKING OPTIONS
 * -----------------------
 * Option A (recommended): Google OAuth + Drive API.
 *   1) Create an OAuth 2.0 Web Client in Google Cloud.
 *   2) Enable Google Drive API.
 *   3) Add your GitHub Pages origin as an Authorized JavaScript origin.
 *   4) Paste the client ID below.
 *
 * Option B (simpler): Google Sheet template /copy link.
 *   Paste a Viewer-only Google Sheet template URL below. If both options are
 *   configured, template-copy mode is used first because it needs fewer scopes.
 */
window.TRACKER_CONFIG = {
  googleSheetTemplateUrl: "",
  googleOAuthClientId: "",

  excelDownloadUrl: "./assets/BECM_2K22_3-2_Attendance_Tracker.xlsx",
  googleFileName: "BECM 2K22 — 3rd Year 2nd Term Attendance Tracker",
  creator: "K.I.Rohan",
  studio: "Bad Time Studio"
};
