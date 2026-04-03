/* ── State Management ── */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    /* State containers */
    [data-state] { display: none; }
    [data-state="content"] { display: block; }

    /* Loading skeleton */
    .skeleton {
      background: linear-gradient(90deg, var(--surface, #191919) 25%, #222 50%, var(--surface, #191919) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 8px;
    }
    .skeleton-line {
      height: 16px;
      margin-bottom: 12px;
      border-radius: 4px;
    }
    .skeleton-line.short { width: 60%; }
    .skeleton-line.medium { width: 80%; }
    .skeleton-card {
      height: 120px;
      border-radius: 12px;
      margin-bottom: 16px;
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* Empty state */
    .empty-state {
      text-align: center;
      padding: 64px 24px;
    }
    .empty-state-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 20px;
      color: var(--text-muted, #555);
      opacity: 0.5;
    }
    .empty-state-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary, #fff);
      margin-bottom: 8px;
    }
    .empty-state-text {
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      color: var(--text-secondary, #868585);
      margin-bottom: 24px;
    }
    .empty-state-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: var(--btn-primary, #ffd955);
      color: var(--btn-text, #000);
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 600;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: all 200ms;
    }
    .empty-state-btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    /* Error state */
    .error-state {
      text-align: center;
      padding: 64px 24px;
    }
    .error-state-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 20px;
      color: var(--destructive, #d80303);
      opacity: 0.6;
    }
    .error-state-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary, #fff);
      margin-bottom: 8px;
    }
    .error-state-text {
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      color: var(--text-secondary, #868585);
      margin-bottom: 24px;
    }
    .error-state-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: transparent;
      color: var(--text-primary, #fff);
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      border: 1px solid var(--border, #333);
      border-radius: 12px;
      cursor: pointer;
      transition: all 200ms;
    }
    .error-state-btn:hover {
      border-color: #555;
    }
  `;
  document.head.appendChild(style);

  // Apply state from URL param ?state=X
  window.applyState = function (containerId, state) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll('[data-state]').forEach(el => {
      el.style.display = el.dataset.state === state ? 'block' : 'none';
    });
  };

  // Read URL param on load
  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const state = params.get('state');
    if (state) {
      document.querySelectorAll('[data-state-container]').forEach(container => {
        applyState(container.id, state);
      });
    }
  });
})();
