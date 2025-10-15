// Utility function to hash password
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

let isLocked = false;
let lockOverlay = null;

// Listen for lock/unlock messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Content script received message:', message.action);
  if (message.action === 'lock') {
    lockPage();
  } else if (message.action === 'unlock') {
    unlockPage();
  }
  sendResponse({success: true});
});

// Create and show lock overlay
function lockPage() {
  console.log('Content: lockPage called on', window.location.href);

  if (lockOverlay) {
    console.log('Content: Lock overlay already exists');
    return;
  }

  isLocked = true;
  console.log('Content: Setting isLocked to true');

  // Create a simple, robust overlay
  lockOverlay = document.createElement('div');
  lockOverlay.id = 'browser-lock-overlay';
  lockOverlay.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    background: #667eea !important;
    z-index: 2147483647 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-family: Arial, sans-serif !important;
  `;

  const content = document.createElement('div');
  content.style.cssText = `
    background: rgba(255, 255, 255, 0.95) !important;
    padding: 40px !important;
    border-radius: 20px !important;
    text-align: center !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
    max-width: 350px !important;
  `;

  content.innerHTML = `
    <div style="font-size: 60px; margin-bottom: 20px;">🔒</div>
    <h1 style="font-size: 28px; font-weight: bold; color: #1a202c; margin-bottom: 15px;">Browser Locked</h1>
    <p style="font-size: 14px; color: #718096; margin-bottom: 20px;">This browser is locked. Click the extension icon to unlock.</p>

    <div style="margin-bottom: 20px;">
      <input type="password" id="lockScreenPassword" placeholder="Enter password" maxlength="50"
             style="width: 100%; padding: 12px 16px; border: 2px solid #e53e3e; border-radius: 8px; font-size: 16px; background: #fef5e7; margin-bottom: 10px;" autofocus>
      <button id="lockScreenUnlockBtn" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer;">Unlock Browser</button>
      <div id="lockScreenError" style="color: #e53e3e; font-size: 14px; margin-top: 8px; display: none;"></div>
    </div>

    <div style="background: #667eea; color: white; padding: 10px 20px; border-radius: 6px; font-weight: bold; display: inline-block;">Protected by Browser Lock Pro</div>
  `;

  lockOverlay.appendChild(content);
  console.log('Content: Created lock overlay element');

  // Try multiple ways to append to document
  let appended = false;

  if (document.body) {
    try {
      document.body.appendChild(lockOverlay);
      console.log('Content: Successfully appended lock overlay to document.body');
      appended = true;
    } catch (e) {
      console.log('Content: Failed to append to body:', e);
    }
  }

  if (!appended && document.documentElement) {
    try {
      document.documentElement.appendChild(lockOverlay);
      console.log('Content: Appended lock overlay to document.documentElement');
      appended = true;
    } catch (e) {
      console.log('Content: Failed to append to documentElement:', e);
    }
  }

  if (!appended) {
    console.log('Content: Document body not ready, waiting...');
    // If body doesn't exist yet, wait
    setTimeout(() => {
      if (document.body && !lockOverlay.parentNode) {
        try {
          document.body.appendChild(lockOverlay);
          console.log('Content: Appended lock overlay after delay');
        } catch (e) {
          console.log('Content: Still failed to append after delay:', e);
        }
      }
    }, 500);
  }

  // Add unlock functionality
  setTimeout(() => {
    const passwordInput = lockOverlay.querySelector('#lockScreenPassword');
    const unlockBtn = lockOverlay.querySelector('#lockScreenUnlockBtn');
    const errorDiv = lockOverlay.querySelector('#lockScreenError');

    if (unlockBtn && passwordInput) {
      unlockBtn.addEventListener('click', async () => {
        const password = passwordInput.value;
        if (!password) {
          errorDiv.textContent = 'Please enter a password';
          errorDiv.style.display = 'block';
          passwordInput.focus();
          return;
        }

        const hash = await hashPassword(password);
        const data = await chrome.storage.local.get(['passwordHash']);

        if (hash === data.passwordHash) {
          // Unlock successful
          await chrome.storage.local.set({ isLocked: false });
          chrome.runtime.sendMessage({ action: 'toggleLock', isLocked: false });
          unlockPage();
        } else {
          // Wrong password
          errorDiv.textContent = '❌ Incorrect password';
          errorDiv.style.display = 'block';
          passwordInput.style.borderColor = '#e53e3e';
          passwordInput.style.backgroundColor = '#fed7d7';
          passwordInput.classList.add('shake');
          setTimeout(() => {
            passwordInput.classList.remove('shake');
            passwordInput.style.borderColor = '#e53e3e';
            passwordInput.style.backgroundColor = '#fef5e7';
          }, 400);
          passwordInput.focus();
        }
      });

      // Enter key support
      passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          unlockBtn.click();
        }
      });

      // Focus the input
      passwordInput.focus();
    }
  }, 100);

  // Block all interactions
  console.log('Content: Adding event listeners to block interactions');
  document.addEventListener('click', blockEvent, true);
  document.addEventListener('keydown', blockEvent, true);
  document.addEventListener('contextmenu', blockEvent, true);
  document.addEventListener('mousedown', blockEvent, true);
  document.addEventListener('mouseup', blockEvent, true);
  document.addEventListener('selectstart', blockEvent, true);
  document.addEventListener('dragstart', blockEvent, true);

  // Add scroll and wheel listeners with passive: false to allow prevention
  document.addEventListener('scroll', blockEvent, { capture: true, passive: false });
  document.addEventListener('wheel', blockEvent, { capture: true, passive: false });
  document.addEventListener('touchstart', blockEvent, { capture: true, passive: false });
  document.addEventListener('touchmove', blockEvent, { capture: true, passive: false });
  document.addEventListener('touchend', blockEvent, { capture: true, passive: false });
}

// Remove lock overlay
function unlockPage() {
  console.log('Content: unlockPage called');

  if (!lockOverlay) {
    console.log('Content: No lock overlay to remove');
    return;
  }

  isLocked = false;
  console.log('Content: Setting isLocked to false');

  // Remove overlay
  if (lockOverlay && lockOverlay.parentNode) {
    lockOverlay.parentNode.removeChild(lockOverlay);
    console.log('Content: Removed lock overlay from DOM');
  }
  lockOverlay = null;

  // Remove event blockers
  console.log('Content: Removing event listeners');
  document.removeEventListener('click', blockEvent, true);
  document.removeEventListener('keydown', blockEvent, true);
  document.removeEventListener('contextmenu', blockEvent, true);
  document.removeEventListener('mousedown', blockEvent, true);
  document.removeEventListener('mouseup', blockEvent, true);
  document.removeEventListener('selectstart', blockEvent, true);
  document.removeEventListener('dragstart', blockEvent, true);
  document.removeEventListener('scroll', blockEvent, { capture: true, passive: false });
  document.removeEventListener('wheel', blockEvent, { capture: true, passive: false });
  document.removeEventListener('touchstart', blockEvent, { capture: true, passive: false });
  document.removeEventListener('touchmove', blockEvent, { capture: true, passive: false });
  document.removeEventListener('touchend', blockEvent, { capture: true, passive: false });
}

// Block all events when locked
function blockEvent(e) {
  if (isLocked) {
    // Don't prevent default for passive events to avoid console warnings
    if (!e.cancelable) {
      return;
    }
    try {
      e.preventDefault();
    } catch (error) {
      // Ignore errors for passive events
    }
    e.stopImmediatePropagation();
    e.stopPropagation();
    return false;
  }
}

// Check initial lock state
console.log('Content: Content script loaded, checking initial lock state');
chrome.storage.local.get(['isLocked'], (data) => {
  console.log('Content: Initial lock state:', data.isLocked);
  if (data.isLocked) {
    lockPage();
  }
});

// Listen for storage changes to handle lock state changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log('Content: Storage changed:', namespace, changes);
  if (namespace === 'local' && changes.isLocked) {
    console.log('Content: Lock state changed from', changes.isLocked.oldValue, 'to', changes.isLocked.newValue);
    if (changes.isLocked.newValue) {
      lockPage();
    } else {
      unlockPage();
    }
  }
});
