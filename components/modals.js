/* ── Modal System ── */
(function () {
  // Inject modal styles once
  const style = document.createElement('style');
  style.textContent = `
    .modal-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      align-items: center;
      justify-content: center;
      padding: 24px;
      animation: modalFadeIn 200ms ease-out;
    }
    .modal-backdrop[style*="display: flex"] {
      display: flex !important;
    }
    .modal-panel {
      background: var(--surface, #191919);
      border: 1px solid var(--border, #333);
      border-radius: 16px;
      padding: 32px;
      max-width: 440px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      animation: modalSlideIn 250ms ease-out;
    }
    .modal-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary, #fff);
      margin-bottom: 12px;
    }
    .modal-text {
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      color: var(--text-secondary, #868585);
      margin-bottom: 24px;
      line-height: 1.5;
    }
    .modal-field {
      margin-bottom: 20px;
    }
    .modal-field label {
      display: block;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: var(--text-secondary, #868585);
      margin-bottom: 6px;
    }
    .modal-field input,
    .modal-field textarea {
      width: 100%;
      height: 44px;
      padding: 0 14px;
      background: var(--input-bg, #0a0a0c);
      border: 1px solid var(--border, #333);
      border-radius: 8px;
      color: var(--text-primary, #fff);
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      outline: none;
      transition: border-color 200ms, box-shadow 200ms;
    }
    .modal-field textarea {
      height: 80px;
      padding: 12px 14px;
      resize: vertical;
    }
    .modal-field input:focus,
    .modal-field textarea:focus {
      border-color: var(--input-focus, #ffd955);
      box-shadow: 0 0 0 3px rgba(255,217,85,0.12);
    }
    .modal-field input::placeholder,
    .modal-field textarea::placeholder {
      color: var(--text-muted, #555);
    }
    .modal-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
    .modal-btn {
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 200ms ease-out;
      border: none;
    }
    .modal-btn-cancel {
      background: transparent;
      border: 1px solid var(--border, #333);
      color: var(--text-primary, #fff);
    }
    .modal-btn-cancel:hover {
      border-color: #555;
    }
    .modal-btn-primary {
      background: var(--btn-primary, #ffd955);
      color: var(--btn-text, #000);
      font-weight: 600;
    }
    .modal-btn-primary:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
    .modal-btn-danger {
      background: var(--destructive, #d80303);
      color: #fff;
      font-weight: 600;
    }
    .modal-btn-danger:hover {
      opacity: 0.9;
    }
    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes modalSlideIn {
      from { opacity: 0; transform: translateY(12px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `;
  document.head.appendChild(style);

  // Global functions
  window.showModal = function (modalId) {
    const modal = document.querySelector(`.modal-backdrop[data-modal="${modalId}"]`);
    if (!modal) return;
    modal.style.display = 'flex';
    const firstInput = modal.querySelector('input, textarea');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  };

  window.closeModal = function (modalId) {
    const modal = document.querySelector(`.modal-backdrop[data-modal="${modalId}"]`);
    if (!modal) return;
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 150ms';
    setTimeout(() => {
      modal.style.display = 'none';
      modal.style.opacity = '';
      modal.style.transition = '';
    }, 150);
  };

  // Close on backdrop click
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      const modalId = e.target.dataset.modal;
      if (modalId) closeModal(modalId);
    }
  });
})();
