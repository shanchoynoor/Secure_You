let failedAttempts = 0;

// Hash password function
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Handle form submission
document.getElementById('unlockForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const passwordInput = document.getElementById('passwordInput');
  const errorMessage = document.getElementById('errorMessage');
  const attemptsWarning = document.getElementById('attemptsWarning');
  const password = passwordInput.value;
  
  if (!password) {
    return;
  }
  
  try {
    // Get stored password hash
    const data = await chrome.storage.local.get(['passwordHash']);
    const hash = await hashPassword(password);
    
    if (hash === data.passwordHash) {
      // Correct password - unlock browser
      await chrome.storage.local.set({ isLocked: false });
      chrome.runtime.sendMessage({ action: 'toggleLock', isLocked: false });
      
      // Show success and close/redirect
      passwordInput.value = '';
      errorMessage.classList.remove('show');
      
      // Success animation
      document.querySelector('.lock-container').style.animation = 'slideOut 0.3s ease-in';
      
      setTimeout(() => {
        window.close();
        // If window doesn't close, redirect to a blank page
        setTimeout(() => {
          window.location.href = 'about:blank';
        }, 100);
      }, 300);
      
    } else {
      // Incorrect password
      failedAttempts++;
      
      errorMessage.classList.add('show');
      passwordInput.value = '';
      passwordInput.classList.add('shake');
      
      setTimeout(() => {
        passwordInput.classList.remove('shake');
      }, 400);
      
      // Show warning after 3 failed attempts
      if (failedAttempts >= 3) {
        attemptsWarning.classList.add('show');
      }
      
      // Focus back on input
      passwordInput.focus();
    }
  } catch (error) {
    console.error('Error unlocking:', error);
    errorMessage.textContent = 'An error occurred. Please try again.';
    errorMessage.classList.add('show');
  }
});

// Check if browser is actually locked
chrome.storage.local.get(['isLocked'], (data) => {
  if (!data.isLocked) {
    // Not locked, redirect away
    window.location.href = 'about:blank';
  }
});

// Prevent closing tab with Ctrl+W
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
    e.preventDefault();
    return false;
  }
});

// Add slide out animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-30px);
    }
  }
  
  input.shake {
    animation: shake 0.4s ease-in-out;
  }
`;
document.head.appendChild(style);
