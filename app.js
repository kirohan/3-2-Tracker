(() => {
  const cfg = window.TRACKER_CONFIG || {};
  const dialog = document.getElementById('setupDialog');
  const closeBtn = dialog?.querySelector('.dialog-close');

  function makeCopyUrl(input) {
    if (!input || !input.includes('docs.google.com/spreadsheets/d/')) return null;
    const match = input.match(/https:\/\/docs\.google\.com\/spreadsheets\/d\/([^/]+)/i);
    if (!match) return null;
    return `https://docs.google.com/spreadsheets/d/${match[1]}/copy`;
  }

  function track() {
    const copyUrl = makeCopyUrl(cfg.googleSheetTemplateUrl || '');
    if (copyUrl) {
      window.open(copyUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (dialog?.showModal) dialog.showModal();
    else window.location.href = cfg.excelDownloadUrl || './assets/BECM_2K22_3-2_Attendance_Tracker.xlsx';
  }

  document.querySelectorAll('.js-track').forEach(btn => btn.addEventListener('click', track));
  closeBtn?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => {
    const box = dialog.getBoundingClientRect();
    const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
    if (!inside) dialog.close();
  });
})();
