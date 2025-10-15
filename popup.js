// Utility function to hash password
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Check password strength
function checkPasswordStrength(password) {
  let strength = 0;
  const strengthIndicator = document.getElementById('strengthIndicator');
  const strengthText = document.getElementById('strengthText');
  
  if (password.length >= 6) strength += 25;
  if (password.length >= 10) strength += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
  if (/\d/.test(password)) strength += 15;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
  
  strengthIndicator.style.width = strength + '%';
  
  if (strength < 25) {
    strengthIndicator.style.background = '#f56565';
    strengthText.textContent = 'Weak';
    strengthText.style.color = '#f56565';
  } else if (strength < 50) {
    strengthIndicator.style.background = '#ed8936';
    strengthText.textContent = 'Fair';
    strengthText.style.color = '#ed8936';
  } else if (strength < 75) {
    strengthIndicator.style.background = '#ecc94b';
    strengthText.textContent = 'Good';
    strengthText.style.color = '#ecc94b';
  } else {
    strengthIndicator.style.background = '#48bb78';
    strengthText.textContent = 'Strong';
    strengthText.style.color = '#48bb78';
  }
}

// Show specific screen
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
  });
  document.getElementById(screenId).classList.remove('hidden');
}

// Initialize popup
async function init() {
  const data = await chrome.storage.local.get(['passwordHash', 'isLocked', 'autoLockTime']);
  
  if (!data.passwordHash) {
    showScreen('setupScreen');
  } else if (data.isLocked) {
    showScreen('unlockScreen');
  } else {
    showScreen('mainScreen');
    updateLockStatus(false);
    if (data.autoLockTime) {
      document.getElementById('autoLockTime').value = data.autoLockTime;
    }
  }
}

// Update lock status UI
function updateLockStatus(isLocked) {
  const statusIcon = document.getElementById('statusIcon');
  const statusBadge = document.getElementById('statusBadge');
  const lockBtn = document.getElementById('lockBtn');
  
  if (isLocked) {
    statusIcon.src = 'https://d64gsuwffb70l.cloudfront.net/68ef80691fcf98059a4255ff_1760526485471_6f5926fd.webp';
    statusBadge.textContent = 'Locked';
    statusBadge.className = 'badge badge-locked';
    lockBtn.innerHTML = '<span class="lock-icon">🔒</span><span>Unlock Browser</span>';
    lockBtn.classList.add('locked');
  } else {
    statusIcon.src = 'https://d64gsuwffb70l.cloudfront.net/68ef80691fcf98059a4255ff_1760526486202_8be4f3eb.webp';
    statusBadge.textContent = 'Unlocked';
    statusBadge.className = 'badge badge-unlocked';
    lockBtn.innerHTML = '<span class="lock-icon">🔓</span><span>Lock Browser</span>';
    lockBtn.classList.remove('locked');
  }
}

// Setup password
document.getElementById('setupBtn')?.addEventListener('click', async () => {
  const password = document.getElementById('setupPassword').value;
  const confirm = document.getElementById('confirmPassword').value;
  
  if (!password || password.length < 4) {
    alert('Password must be at least 4 characters long');
    return;
  }
  
  if (password !== confirm) {
    alert('Passwords do not match');
    return;
  }
  
  const hash = await hashPassword(password);
  await chrome.storage.local.set({ 
    passwordHash: hash, 
    isLocked: false,
    autoLockTime: 0
  });
  
  chrome.runtime.sendMessage({ action: 'passwordSet' });
  showScreen('mainScreen');
  updateLockStatus(false);
});

// Password strength check
document.getElementById('setupPassword')?.addEventListener('input', (e) => {
  checkPasswordStrength(e.target.value);
});

// Lock/Unlock toggle
document.getElementById('lockBtn')?.addEventListener('click', async () => {
  const data = await chrome.storage.local.get(['isLocked']);
  const newLockState = !data.isLocked;

  await chrome.storage.local.set({ isLocked: newLockState });
  chrome.runtime.sendMessage({ action: 'toggleLock', isLocked: newLockState });

  if (newLockState) {
    showScreen('unlockScreen');
  } else {
    updateLockStatus(newLockState);
  }
});

// Instant lock button
document.getElementById('instantLockBtn')?.addEventListener('click', async () => {
  await chrome.storage.local.set({ isLocked: true });
  chrome.runtime.sendMessage({ action: 'toggleLock', isLocked: true });
  showScreen('unlockScreen');
});

// Unlock browser
document.getElementById('unlockBtn')?.addEventListener('click', async () => {
  const password = document.getElementById('unlockPassword').value;
  const hash = await hashPassword(password);
  const data = await chrome.storage.local.get(['passwordHash']);

  if (hash === data.passwordHash) {
    await chrome.storage.local.set({ isLocked: false });
    chrome.runtime.sendMessage({ action: 'toggleLock', isLocked: false });
    document.getElementById('unlockPassword').value = '';
    document.getElementById('unlockError').textContent = '';
    showScreen('mainScreen');
    updateLockStatus(false);
  } else {
    const errorEl = document.getElementById('unlockError');
    const inputEl = document.getElementById('unlockPassword');
    errorEl.textContent = '❌ Incorrect password - try again';
    inputEl.classList.add('shake');
    inputEl.style.borderColor = '#e53e3e';
    inputEl.style.backgroundColor = '#fed7d7';
    setTimeout(() => {
      inputEl.classList.remove('shake');
      inputEl.style.borderColor = '#e53e3e';
      inputEl.style.backgroundColor = '#fef5e7';
    }, 400);
    // Focus back on input for convenience
    inputEl.focus();
  }
});

// Auto-lock time change
document.getElementById('autoLockTime')?.addEventListener('change', async (e) => {
  const minutes = parseInt(e.target.value);
  await chrome.storage.local.set({ autoLockTime: minutes });
  chrome.runtime.sendMessage({ action: 'setAutoLock', minutes });
});

// Change password button
document.getElementById('changePasswordBtn')?.addEventListener('click', () => {
  showScreen('changePasswordScreen');
});

// Cancel change password
document.getElementById('cancelChangeBtn')?.addEventListener('click', () => {
  showScreen('mainScreen');
});

// Save new password
document.getElementById('savePasswordBtn')?.addEventListener('click', async () => {
  const current = document.getElementById('currentPassword').value;
  const newPass = document.getElementById('newPassword').value;
  const confirm = document.getElementById('confirmNewPassword').value;
  
  const currentHash = await hashPassword(current);
  const data = await chrome.storage.local.get(['passwordHash']);
  
  if (currentHash !== data.passwordHash) {
    alert('Current password is incorrect');
    return;
  }
  
  if (!newPass || newPass.length < 4) {
    alert('New password must be at least 4 characters long');
    return;
  }
  
  if (newPass !== confirm) {
    alert('New passwords do not match');
    return;
  }
  
  const newHash = await hashPassword(newPass);
  await chrome.storage.local.set({ passwordHash: newHash });
  
  document.getElementById('currentPassword').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmNewPassword').value = '';
  
  alert('Password changed successfully!');
  showScreen('mainScreen');
});

// Enter key support
document.querySelectorAll('input[type="password"]').forEach(input => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const screen = input.closest('.screen');
      if (screen.id === 'setupScreen') {
        document.getElementById('setupBtn').click();
      } else if (screen.id === 'unlockScreen') {
        document.getElementById('unlockBtn').click();
      } else if (screen.id === 'changePasswordScreen') {
        document.getElementById('savePasswordBtn').click();
      }
    }
  });
});

init();
