let isLocked = false;
let lockOverlay = null;

// Listen for lock/unlock messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'lock') {
    lockPage();
  } else if (message.action === 'unlock') {
    unlockPage();
  }
});

// Create and show lock overlay
function lockPage() {
  if (lockOverlay) return;
  
  isLocked = true;
  
  lockOverlay = document.createElement('div');
  lockOverlay.id = 'browser-lock-overlay';
  lockOverlay.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    ">
      <div style="
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 24px;
        padding: 48px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 400px;
      ">
        <img src="https://d64gsuwffb70l.cloudfront.net/68ef80691fcf98059a4255ff_1760526485471_6f5926fd.webp" 
             alt="Locked" 
             style="width: 80px; height: 80px; margin-bottom: 24px; animation: pulse 2s infinite;">
        <h1 style="
          font-size: 32px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 16px;
        ">Browser Locked</h1>
        <p style="
          font-size: 16px;
          color: #718096;
          margin-bottom: 24px;
        ">This browser is locked. Click the extension icon to unlock.</p>
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          display: inline-block;
        ">🔒 Protected by Browser Lock Pro</div>
      </div>
    </div>
    <style>
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
    </style>
  `;
  
  document.documentElement.appendChild(lockOverlay);
  
  // Prevent scrolling
  document.body.style.overflow = 'hidden';
  
  // Block interactions
  document.addEventListener('click', blockEvent, true);
  document.addEventListener('keydown', blockEvent, true);
  document.addEventListener('contextmenu', blockEvent, true);
}

// Remove lock overlay
function unlockPage() {
  if (!lockOverlay) return;
  
  isLocked = false;
  
  if (lockOverlay && lockOverlay.parentNode) {
    lockOverlay.parentNode.removeChild(lockOverlay);
  }
  lockOverlay = null;
  
  // Restore scrolling
  document.body.style.overflow = '';
  
  // Remove event blockers
  document.removeEventListener('click', blockEvent, true);
  document.removeEventListener('keydown', blockEvent, true);
  document.removeEventListener('contextmenu', blockEvent, true);
}

// Block all events when locked
function blockEvent(e) {
  if (isLocked) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}

// Check initial lock state
chrome.storage.local.get(['isLocked'], (data) => {
  if (data.isLocked) {
    lockPage();
  }
});
