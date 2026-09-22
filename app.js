(() => {
  'use strict';

  const cfg = window.TRACKER_CONFIG || {};
  const dialog = document.getElementById('googleSetupDialog');
  const closeBtn = dialog?.querySelector('.dialog-close');
  const toast = document.getElementById('toast');
  const googleButtons = [...document.querySelectorAll('.js-google-track')];

  const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const GOOGLE_SHEET_MIME = 'application/vnd.google-apps.spreadsheet';
  const DRIVE_FILE_SCOPE = 'https://www.googleapis.com/auth/drive.file';

  let tokenClient = null;
  let googleBusy = false;

  function showToast(message, type = 'info', timeout = 4200) {
    if (!toast) return;
    toast.textContent = message;
    toast.dataset.type = type;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), timeout);
  }

  function setGoogleBusy(isBusy, label) {
    googleBusy = isBusy;
    googleButtons.forEach((btn) => {
      btn.disabled = isBusy;
      if (!btn.dataset.defaultLabel) btn.dataset.defaultLabel = btn.innerHTML;
      btn.innerHTML = isBusy ? `<span class="spinner" aria-hidden="true"></span>${label || 'Opening Google…'}` : btn.dataset.defaultLabel;
    });
  }

  function makeCopyUrl(input) {
    if (!input || !input.includes('docs.google.com/spreadsheets/d/')) return null;
    const match = input.match(/https:\/\/docs\.google\.com\/spreadsheets\/d\/([^/]+)/i);
    return match ? `https://docs.google.com/spreadsheets/d/${match[1]}/copy` : null;
  }

  function showOwnerSetup() {
    if (dialog?.showModal) dialog.showModal();
    else showToast('Google tracking is not configured by the site owner yet. Use Download Excel for now.', 'error', 7000);
  }

  function googleLibraryReady() {
    return Boolean(window.google?.accounts?.oauth2?.initTokenClient);
  }

  async function waitForGoogleLibrary(maxWaitMs = 5000) {
    const started = Date.now();
    while (!googleLibraryReady() && Date.now() - started < maxWaitMs) {
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    return googleLibraryReady();
  }

  async function uploadWorkbookToGoogleDrive(accessToken) {
    showToast('Creating your personal tracker in Google Drive…', 'info', 10000);
    setGoogleBusy(true, 'Creating tracker…');

    const workbookResponse = await fetch(cfg.excelDownloadUrl || './assets/BECM_2K22_3-2_Attendance_Tracker.xlsx', {
      cache: 'no-store'
    });
    if (!workbookResponse.ok) {
      throw new Error(`Could not load the Excel tracker (${workbookResponse.status}).`);
    }

    const workbookBlob = await workbookResponse.blob();
    const boundary = `becm2k22_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const metadata = {
      name: cfg.googleFileName || 'BECM 2K22 Attendance Tracker',
      mimeType: GOOGLE_SHEET_MIME
    };

    const multipartBody = new Blob([
      `--${boundary}\r\n`,
      'Content-Type: application/json; charset=UTF-8\r\n\r\n',
      JSON.stringify(metadata),
      `\r\n--${boundary}\r\n`,
      `Content-Type: ${XLSX_MIME}\r\n\r\n`,
      workbookBlob,
      `\r\n--${boundary}--`
    ], { type: `multipart/related; boundary=${boundary}` });

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: multipartBody
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.id) {
      const message = payload?.error?.message || `Google Drive returned ${response.status}.`;
      throw new Error(message);
    }

    const sheetUrl = payload.webViewLink || `https://docs.google.com/spreadsheets/d/${payload.id}/edit`;
    showToast('Done. Opening your personal Google Sheet…', 'success', 2500);
    window.setTimeout(() => window.location.assign(sheetUrl), 450);
  }

  async function startOAuthGoogleTracking() {
    if (!cfg.googleOAuthClientId) {
      showOwnerSetup();
      return;
    }

    if (googleBusy) return;
    setGoogleBusy(true, 'Connecting Google…');

    const ready = await waitForGoogleLibrary();
    if (!ready) {
      setGoogleBusy(false);
      showToast('Google sign-in could not load. Check your internet connection and try again.', 'error', 6500);
      return;
    }

    try {
      tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: cfg.googleOAuthClientId,
        scope: DRIVE_FILE_SCOPE,
        callback: async (tokenResponse) => {
          if (tokenResponse?.error || !tokenResponse?.access_token) {
            setGoogleBusy(false);
            const msg = tokenResponse?.error_description || tokenResponse?.error || 'Google authorization was cancelled.';
            showToast(msg, 'error', 6000);
            return;
          }

          try {
            await uploadWorkbookToGoogleDrive(tokenResponse.access_token);
          } catch (error) {
            setGoogleBusy(false);
            console.error(error);
            showToast(`Could not create the Google tracker: ${error.message}`, 'error', 9000);
          }
        },
        error_callback: (error) => {
          setGoogleBusy(false);
          console.error(error);
          showToast('Google sign-in was closed or blocked. Please try again.', 'error', 6500);
        }
      });

      // Forces the account chooser so each student can select their own Gmail/Google account.
      tokenClient.requestAccessToken({ prompt: 'select_account' });
    } catch (error) {
      setGoogleBusy(false);
      console.error(error);
      showToast('Could not start Google sign-in. Check the OAuth Client ID setup.', 'error', 7000);
    }
  }

  function trackWithGoogle() {
    const copyUrl = makeCopyUrl(cfg.googleSheetTemplateUrl || '');
    if (copyUrl) {
      // Template mode: Google itself asks for the user's account and makes a private copy.
      window.location.assign(copyUrl);
      return;
    }

    // OAuth mode: creates a new Google Sheet directly inside the selected user's Drive.
    startOAuthGoogleTracking();
  }

  googleButtons.forEach((btn) => btn.addEventListener('click', trackWithGoogle));
  closeBtn?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => {
    const box = dialog.getBoundingClientRect();
    const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
    if (!inside) dialog.close();
  });
})();
