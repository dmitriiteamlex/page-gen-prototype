/* ── Toast System ── */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .toast-container {
      position: fixed;
      top: 72px;
      right: 20px;
      z-index: 2000;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
    }
    .toast {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 20px;
      border-radius: 10px;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      min-width: 240px;
      max-width: 400px;
      pointer-events: auto;
      animation: toastSlideIn 300ms ease-out;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      border: 1px solid var(--border, #333);
    }
    .toast-success {
      background: var(--surface, #191919);
      color: var(--success, #0ab95a);
    }
    .toast-error {
      background: var(--surface, #191919);
      color: var(--destructive, #d80303);
    }
    .toast-info {
      background: var(--surface, #191919);
      color: var(--text-primary, #fff);
    }
    .toast-icon {
      flex-shrink: 0;
      font-size: 16px;
    }
    .toast-message {
      flex: 1;
      color: var(--text-primary, #fff);
    }
    .toast-dismiss {
      opacity: 0;
      transition: opacity 200ms;
    }
    .toast:hover .toast-dismiss {
      opacity: 1;
    }
    .toast.removing {
      animation: toastSlideOut 200ms ease-in forwards;
    }
    @keyframes toastSlideIn {
      from { opacity: 0; transform: translateX(40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes toastSlideOut {
      from { opacity: 1; transform: translateX(0); }
      to { opacity: 0; transform: translateX(40px); }
    }
  `;
  document.head.appendChild(style);

  // Ensure container exists
  function getContainer() {
    let c = document.querySelector('.toast-container');
    if (!c) {
      c = document.createElement('div');
      c.className = 'toast-container';
      document.body.appendChild(c);
    }
    return c;
  }

  const icons = {
    success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    error: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  };

  window.showToast = function (message, type = 'info') {
    const container = getContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span class="toast-message">${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 200);
    }, 3000);
  };
})();
