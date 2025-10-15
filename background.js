let autoLockTimer = null;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleLock') {
    handleLockToggle(message.isLocked);
  } else if (message.action === 'setAutoLock') {
    setupAutoLock(message.minutes);
  } else if (message.action === 'passwordSet') {
    setupExtensionProtection();
  }
});

// Handle lock/unlock toggle
async function handleLockToggle(isLocked) {
  if (isLocked) {
    // Lock the browser
    chrome.action.setBadgeText({ text: '🔒' });
    chrome.action.setBadgeBackgroundColor({ color: '#e53e3e' });
    
    // Block all tabs
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
      if (!tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
        chrome.tabs.sendMessage(tab.id, { action: 'lock' }).catch(() => {});
      }
    }
  } else {
    // Unlock the browser
    chrome.action.setBadgeText({ text: '' });
    
    // Unblock all tabs
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
      if (!tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
        chrome.tabs.sendMessage(tab.id, { action: 'unlock' }).catch(() => {});
      }
    }
    
    // Restart auto-lock timer if enabled
    const data = await chrome.storage.local.get(['autoLockTime']);
    if (data.autoLockTime > 0) {
      setupAutoLock(data.autoLockTime);
    }
  }
}

// Setup auto-lock timer
function setupAutoLock(minutes) {
  if (autoLockTimer) {
    clearTimeout(autoLockTimer);
    autoLockTimer = null;
  }
  
  if (minutes > 0) {
    autoLockTimer = setTimeout(async () => {
      await chrome.storage.local.set({ isLocked: true });
      handleLockToggle(true);
    }, minutes * 60 * 1000);
  }
}

// Block access to extension management
async function setupExtensionProtection() {
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const data = await chrome.storage.local.get(['isLocked', 'passwordHash']);
    
    if (data.passwordHash && (
      tab.url?.includes('chrome://extensions') ||
      tab.url?.includes('edge://extensions') ||
      tab.url?.includes('chrome://settings')
    )) {
      if (data.isLocked) {
        chrome.tabs.update(tabId, { url: 'about:blank' });
      }
    }
  });
}

// Block new tab creation when locked
chrome.tabs.onCreated.addListener(async (tab) => {
  const data = await chrome.storage.local.get(['isLocked']);
  if (data.isLocked && tab.url !== 'chrome://newtab/') {
    chrome.tabs.sendMessage(tab.id, { action: 'lock' }).catch(() => {});
  }
});

// Block navigation when locked
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return;
  
  const data = await chrome.storage.local.get(['isLocked']);
  if (data.isLocked) {
    const tab = await chrome.tabs.get(details.tabId);
    if (!tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
      chrome.tabs.sendMessage(details.tabId, { action: 'lock' }).catch(() => {});
    }
  }
});

// Initialize on install
chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(['passwordHash']);
  if (data.passwordHash) {
    setupExtensionProtection();
  }
});

// Check lock status on startup
chrome.runtime.onStartup.addListener(async () => {
  const data = await chrome.storage.local.get(['isLocked', 'autoLockTime']);
  if (data.isLocked) {
    handleLockToggle(true);
  } else if (data.autoLockTime > 0) {
    setupAutoLock(data.autoLockTime);
  }
});
