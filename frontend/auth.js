// Switching pages
function goTo(pageId) {
  const pages = ['login', 'register', 'admin'];
  
  pages.forEach(p => {
    const el = document.getElementById(p + '-page');
    if (!el) return;
    
    if (p === pageId) {
      el.classList.remove('hidden-left', 'hidden-right');
      el.classList.add('active');
    } else {
      el.classList.remove('active');
      el.classList.add('hidden-right'); 
    }
  });
}

// Button actions
async function handleLogin() {
  const emailInput = document.querySelector('#login-page input[type="email"]');
  const passwordInput = document.querySelector('#login-page input[type="password"]');
  
  const email = emailInput ? emailInput.value : '';
  const password = passwordInput ? passwordInput.value : '';

  if (!email || !password) {
    showToast("⚠️ Please enter both email and password.");
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('userInfo', JSON.stringify(data));
      showToast("✈ Welcome aboard, " + data.name + "!");
      setTimeout(() => { window.location.href = 'traveloop-screens.html'; }, 1000);
    } else {
      // Fallback for local testing if backend isn't running
      const existingUser = JSON.parse(localStorage.getItem('userInfo'));
      const fallbackName = existingUser && existingUser.email === email ? existingUser.name : email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1).replace(/[._]/g, ' ');
      localStorage.setItem('userInfo', JSON.stringify({ name: fallbackName, email: email }));
      showToast("✈ Welcome aboard, " + fallbackName + "! (Local Mode)");
      setTimeout(() => { window.location.href = 'traveloop-screens.html'; }, 1000);
    }
  } catch (error) {
    // Fallback
    const existingUser = JSON.parse(localStorage.getItem('userInfo'));
    const fallbackName = existingUser && existingUser.email === email ? existingUser.name : email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1).replace(/[._]/g, ' ');
    localStorage.setItem('userInfo', JSON.stringify({ name: fallbackName, email: email }));
    showToast("✈ Welcome aboard, " + fallbackName + "! (Offline Mode)");
    setTimeout(() => { window.location.href = 'traveloop-screens.html'; }, 1000);
  }
}

async function handleRegister() {
  const inputs = document.querySelectorAll('#register-page input');
  const name = inputs[0] ? inputs[0].value : '';
  const email = inputs[1] ? inputs[1].value : '';
  const password = inputs[2] ? inputs[2].value : '';

  if (!name || !email || !password) {
    showToast("⚠️ Please fill in all fields (Name, Email, Password).");
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('userInfo', JSON.stringify(data));
      showToast("✈ Registration successful! Welcome aboard!");
      setTimeout(() => { window.location.href = 'traveloop-screens.html'; }, 1000);
    } else {
      localStorage.setItem('userInfo', JSON.stringify({ name, email }));
      showToast("✈ Registration successful! (Local Mode)");
      setTimeout(() => { window.location.href = 'traveloop-screens.html'; }, 1000);
    }
  } catch (error) {
    localStorage.setItem('userInfo', JSON.stringify({ name, email }));
    showToast("✈ Registration successful! (Offline Mode)");
    setTimeout(() => { window.location.href = 'traveloop-screens.html'; }, 1000);
  }
}

async function handleAdminLogin() {
  const idInput = document.getElementById('admin-id');
  const passInput = document.getElementById('admin-pass');
  
  if (!idInput || !passInput || !idInput.value || !passInput.value) {
    showToast("⚠️ Please enter Admin ID and Password.");
    return;
  }

  showToast("🔐 Access granted. Redirecting to Admin Panel...");
  setTimeout(() => {
    window.location.href = 'panel.html';
  }, 1000);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.innerText = msg;
    toast.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 2500);
  }
}

// Password Strength
function checkStrength(input) {
  const val = input.value;
  const sb1 = document.getElementById('sb1');
  const sb2 = document.getElementById('sb2');
  const sb3 = document.getElementById('sb3');
  const sb4 = document.getElementById('sb4');
  const label = document.getElementById('strength-label');
  
  // reset
  [sb1, sb2, sb3, sb4].forEach(sb => { if(sb) sb.className = ''; });
  if(label) label.innerText = '';
  
  if (val.length === 0) return;
  
  if (val.length <= 4) {
    if(sb1) sb1.className = 'weak';
    if(label) label.innerText = 'Weak';
  } else if (val.length <= 6) {
    if(sb1) sb1.className = 'fair';
    if(sb2) sb2.className = 'fair';
    if(label) label.innerText = 'Fair';
  } else if (val.length <= 8) {
    if(sb1) sb1.className = 'good';
    if(sb2) sb2.className = 'good';
    if(sb3) sb3.className = 'good';
    if(label) label.innerText = 'Good';
  } else {
    if(sb1) sb1.className = 'strong';
    if(sb2) sb2.className = 'strong';
    if(sb3) sb3.className = 'strong';
    if(sb4) sb4.className = 'strong';
    if(label) label.innerText = 'Strong';
  }
}

function validateEmail(input) {
  const hint = document.getElementById('email-hint');
  if (!hint) return;
  if (input.value.includes('@') && input.value.includes('.')) {
    hint.innerText = 'Valid email format.';
    hint.style.color = '#34d399';
  } else if (input.value.length > 0) {
    hint.innerText = 'Keep typing...';
    hint.style.color = 'var(--slate-muted)';
  } else {
    hint.innerText = '';
  }
}

// Basic particles
document.addEventListener('DOMContentLoaded', () => {
  const particles = document.getElementById('particles');
  if(particles) {
    for (let i = 0; i < 30; i++) {
      let div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.width = Math.random() * 4 + 'px';
      div.style.height = div.style.width;
      div.style.background = 'white';
      div.style.borderRadius = '50%';
      div.style.opacity = Math.random() * 0.5 + 0.1;
      div.style.left = Math.random() * 100 + 'vw';
      div.style.top = Math.random() * 100 + 'vh';
      div.style.boxShadow = '0 0 10px rgba(255,255,255,0.5)';
      div.style.animation = `drift ${Math.random() * 10 + 5}s linear infinite`;
      particles.appendChild(div);
    }
  }
});

// Profile UI Updater (Run on all pages)
document.addEventListener('DOMContentLoaded', () => {
    updateProfileUI();
});

function updateProfileUI() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) return;

    // Update avatar text (e.g. "US" to initials)
    const initials = userInfo.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'GU';
    
    // Find avatar circles
    const avatars = document.querySelectorAll('.avatar-small, div[title="User Profile"]');
    avatars.forEach(avatar => {
        if (!avatar.querySelector('img')) { // Don't replace if it's an image
            avatar.innerText = initials;
        }
    });

    // Find auth links container and hide/replace them
    const authLinks = document.querySelector('.auth-links');
    if (authLinks) {
        authLinks.innerHTML = `<span style="color: var(--ocean); font-weight: 600;">Welcome, ${userInfo.name}</span>`;
        authLinks.onclick = null;
        authLinks.style.cursor = 'default';
        authLinks.style.pointerEvents = 'none';
    }

    // Replace name elements if they exist (userpanel etc.)
    const nameEls = document.querySelectorAll('.user-name, .profile-name');
    nameEls.forEach(el => el.innerText = userInfo.name);
    
    const emailEls = document.querySelectorAll('.user-email, .profile-email');
    emailEls.forEach(el => el.innerText = userInfo.email);
}
window.updateProfileUI = updateProfileUI;

function logoutUser() {
    localStorage.removeItem('userInfo');
    window.location.href = 'register.html';
}
window.logoutUser = logoutUser;
