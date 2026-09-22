(() => {
  'use strict';

  const cfg = window.TRACKER_CONFIG || {};
  const buttons = [...document.querySelectorAll('.js-google-track')];
  const toast = document.getElementById('toast');

  function showToast(message, type = 'info', timeout = 4200) {
    if (!toast) return;
    toast.textContent = message;
    toast.dataset.type = type;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), timeout);
  }

  function getSheetId(url) {
    const match = String(url || '').match(/docs\.google\.com\/spreadsheets\/d\/([^/]+)/i);
    return match ? match[1] : null;
  }

  function trackWithGoogle() {
    const sheetId = getSheetId(cfg.googleSheetTemplateUrl);
    if (!sheetId) {
      showToast('Google tracking is temporarily unavailable. Please use Download Excel.', 'error', 6500);
      return;
    }

    // Google's own flow handles account selection/sign-in and creates the copy.
    // The website never receives the student's Gmail address or Drive data.
    const copyUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/copy`;
    window.location.href = copyUrl;
  }

  buttons.forEach((button) => button.addEventListener('click', trackWithGoogle));
})();
