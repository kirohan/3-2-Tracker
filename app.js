(() => {
  'use strict';

  const cfg = window.TRACKER_CONFIG || {};
  const buttons = [...document.querySelectorAll('.js-google-track')];
  const toast = document.getElementById('toast');
  const revealEls = document.querySelectorAll('.reveal-up');
  const progressBar = document.getElementById('scroll-progress');
  const navToggle = document.querySelector('.nav-toggle');
  const navPanel = document.querySelector('.nav-panel');
  const navLinks = document.querySelectorAll('.nav-links a');

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

  function setLoading(button, isLoading) {
    if (!button) return;
    if (isLoading) {
      button.dataset.original = button.innerHTML;
      button.innerHTML = '<span class="spinner" aria-hidden="true"></span>Opening Google...';
      button.disabled = true;
    } else if (button.dataset.original) {
      button.innerHTML = button.dataset.original;
      button.disabled = false;
    }
  }

  function trackWithGoogle(ev) {
    const button = ev?.currentTarget;
    const sheetId = getSheetId(cfg.googleSheetTemplateUrl);
    if (!sheetId) {
      showToast('Google tracking is temporarily unavailable. Please use Download Excel.', 'error', 6500);
      return;
    }

    if (button) setLoading(button, true);
    showToast('Opening Google copy screen…', 'success', 2400);

    const copyUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/copy`;
    window.setTimeout(() => {
      window.location.href = copyUrl;
    }, 420);
  }

  buttons.forEach((button) => button.addEventListener('click', trackWithGoogle));

  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  function updateProgress() {
    if (!progressBar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
  }

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  if (navToggle && navPanel) {
    navToggle.addEventListener('click', () => {
      const open = navPanel.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('menu-open', open);
    });

    navLinks.forEach((link) => link.addEventListener('click', () => {
      navPanel.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }));
  }
})();
