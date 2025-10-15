// Background script for Browser Lock Pro
let autoLockTimer = null;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message.action);

  // Handle synchronously to avoid CSP issues
  if (message.action === 'toggleLock') {
    handleLockToggle(message.isLocked).then(() => {
      sendResponse({ success: true });
    }).catch(error => {
      console.error('Error toggling lock:', error);
      sendResponse({ success: false, error: error.message });
    });
  } else if (message.action === 'setAutoLock') {
    setupAutoLock(message.minutes);
    sendResponse({ success: true });
  } else if (message.action === 'passwordSet') {
    setupExtensionProtection();
    sendResponse({ success: true });
  } else {
    sendResponse({ success: false, error: 'Unknown action' });
  }

  return true; // Keep message channel open for async response
});

// Handle lock/unlock toggle
async function handleLockToggle(isLocked) {
  console.log('Background: handleLockToggle called with isLocked:', isLocked);

  try {
    if (isLocked) {
      // Lock the browser
      await chrome.action.setBadgeText({ text: '🔒' });
      await chrome.action.setBadgeBackgroundColor({ color: '#e53e3e' });

      // Block all existing tabs
      const tabs = await chrome.tabs.query({});
      console.log('Background: Found', tabs.length, 'tabs to lock');

      for (const tab of tabs) {
        if (tab.url && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
          console.log('Background: Locking tab', tab.id, tab.url);
          try {
            const response = await chrome.tabs.sendMessage(tab.id, { action: 'lock' });
            console.log('Background: Lock response from tab', tab.id, ':', response);
          } catch (e) {
            console.log('Background: Failed to lock tab', tab.id, 'immediately, will retry:', e);
            // Content script might not be ready, try again after a delay
            setTimeout(() => {
              chrome.tabs.sendMessage(tab.id, { action: 'lock' }).then(response => {
                console.log('Background: Retry lock response from tab', tab.id, ':', response);
              }).catch(e => {
                console.log('Background: Retry lock failed for tab', tab.id, ':', e);
              });
            }, 500);
          }
        }
      }

      // Also lock the current active tab immediately
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (activeTab && activeTab.url && (activeTab.url.startsWith('http://') || activeTab.url.startsWith('https://'))) {
        console.log('Background: Locking active tab', activeTab.id, activeTab.url);
        try {
          const response = await chrome.tabs.sendMessage(activeTab.id, { action: 'lock' });
          console.log('Background: Active tab lock response:', response);
        } catch (e) {
          console.log('Background: Failed to lock active tab immediately, will retry:', e);
          setTimeout(() => {
            chrome.tabs.sendMessage(activeTab.id, { action: 'lock' }).then(response => {
              console.log('Background: Retry active tab lock response:', response);
            }).catch(e => {
              console.log('Background: Retry active tab lock failed:', e);
            });
          }, 500);
        }
      }
    } else {
      // Unlock the browser
      console.log('Background: Unlocking browser');
      await chrome.action.setBadgeText({ text: '' });

      // Unblock all tabs
      const tabs = await chrome.tabs.query({});
      console.log('Background: Found', tabs.length, 'tabs to unlock');

      for (const tab of tabs) {
        if (tab.url && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
          console.log('Background: Unlocking tab', tab.id, tab.url);
          try {
            const response = await chrome.tabs.sendMessage(tab.id, { action: 'unlock' });
            console.log('Background: Unlock response from tab', tab.id, ':', response);
          } catch (e) {
            console.log('Background: Failed to unlock tab', tab.id, 'immediately, will retry:', e);
            setTimeout(() => {
              chrome.tabs.sendMessage(tab.id, { action: 'unlock' }).then(response => {
                console.log('Background: Retry unlock response from tab', tab.id, ':', response);
              }).catch(e => {
                console.log('Background: Retry unlock failed for tab', tab.id, ':', e);
              });
            }, 500);
          }
        }
      }

      // Restart auto-lock timer if enabled
      const data = await chrome.storage.local.get(['autoLockTime']);
      if (data.autoLockTime > 0) {
        setupAutoLock(data.autoLockTime);
      }
    }
  } catch (error) {
    console.error('Error in handleLockToggle:', error);
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
  if (data.isLocked && (tab.url.startsWith('http://') || tab.url.startsWith('https://') || tab.url === 'chrome://newtab/')) {
    // Wait a bit for the tab to load, then lock it
    setTimeout(() => {
      chrome.tabs.sendMessage(tab.id, { action: 'lock' }).catch(() => {});
    }, 200);
  }
});

// Block navigation when locked
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return;

  const data = await chrome.storage.local.get(['isLocked']);
  if (data.isLocked) {
    const tab = await chrome.tabs.get(details.tabId);
    if (tab.url.startsWith('http://') || tab.url.startsWith('https://')) {
      // Small delay to ensure content script is ready
      setTimeout(() => {
        chrome.tabs.sendMessage(details.tabId, { action: 'lock' }).catch(() => {});
      }, 100);
    }
  }
});

// Alternative approach: Monitor extension management page access
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Check if user is trying to access extension management
    if (tab.url.includes('chrome://extensions') ||
        tab.url.includes('edge://extensions') ||
        tab.url.includes('chrome://settings')) {

      const data = await chrome.storage.local.get(['passwordHash']);
      if (data.passwordHash) {
        console.log('Extension management page accessed - showing uninstall warning');

        // Show a notification or alert
        try {
          await chrome.tabs.sendMessage(tabId, {
            action: 'showUninstallWarning',
            extensionId: chrome.runtime.id
          });
        } catch (e) {
          // Content script not available on chrome:// pages, use alternative
          console.log('Cannot inject warning into chrome:// page');
        }
      }
    }
  }
});

// Block extension removal - Note: onUninstallInitiated may not work reliably
// This is a Chrome API limitation - uninstall protection is not fully supported
console.log('Uninstall protection: chrome.management.onUninstallInitiated may not be available or reliable');
console.log('Alternative: Extension management pages will show warnings when accessed');

// Initialize on install
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extension installed/updated');
  try {
    const data = await chrome.storage.local.get(['passwordHash']);
    if (data.passwordHash) {
      setupExtensionProtection();
    }
  } catch (error) {
    console.log('Error during installation:', error);
  }
});

// Check lock status on startup
chrome.runtime.onStartup.addListener(async () => {
  console.log('Browser startup - checking lock status');
  try {
    const data = await chrome.storage.local.get(['isLocked', 'autoLockTime']);
    if (data.isLocked) {
      handleLockToggle(true);
    } else if (data.autoLockTime > 0) {
      setupAutoLock(data.autoLockTime);
    }
  } catch (error) {
    console.log('Error during startup:', error);
  }
});
