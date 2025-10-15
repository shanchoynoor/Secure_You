// Utility function to hash password
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Handle cancel uninstall
document.getElementById('cancelUninstallBtn')?.addEventListener('click', () => {
  window.close();
});

// Handle confirm uninstall
document.getElementById('confirmUninstallBtn')?.addEventListener('click', async () => {
  const password = document.getElementById('uninstallPassword').value;
  const hash = await hashPassword(password);
  const data = await chrome.storage.local.get(['passwordHash']);

  if (hash === data.passwordHash) {
    // Clear all data first
    await chrome.storage.local.clear();

    // Show success message
    document.body.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        color: white;
        text-align: center;
      ">
        <div>
          <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
          <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">Extension Removed</h1>
          <p style="font-size: 16px; opacity: 0.9;">Browser Lock Pro has been successfully uninstalled.</p>
        </div>
      </div>
    `;

    // Close window after showing success message
    setTimeout(() => {
      window.close();
    }, 2000);

  } else {
    const errorEl = document.getElementById('uninstallError');
    const inputEl = document.getElementById('uninstallPassword');
    errorEl.textContent = '❌ Incorrect password';
    inputEl.style.borderColor = '#e53e3e';
    inputEl.style.backgroundColor = '#fed7d7';
    inputEl.classList.add('shake');
    setTimeout(() => {
      inputEl.classList.remove('shake');
      inputEl.style.borderColor = '#e53e3e';
      inputEl.style.backgroundColor = '#fef5e7';
    }, 400);
    inputEl.focus();
  }
});

// Enter key support
document.getElementById('uninstallPassword')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('confirmUninstallBtn').click();
  }
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }

  .shake {
    animation: shake 0.4s ease-in-out;
  }
`;
document.head.appendChild(style);