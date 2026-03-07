/* ════════════════════════════════════════
   Store Management System — Auth Script
   ════════════════════════════════════════ */

const container    = document.querySelector('.container');
const loginLink    = document.querySelector('.SignInLink');
const registerLink = document.querySelector('.SignUpLink');

/* ══════════════════════════════
   SWITCH between Login / Register
   ══════════════════════════════ */
registerLink.addEventListener('click', e => {
    e.preventDefault();
    container.classList.add('active');
    resetForms();
});

loginLink.addEventListener('click', e => {
    e.preventDefault();
    container.classList.remove('active');
    resetForms();
});

/* ══════════════════════════════
   PASSWORD VISIBILITY TOGGLE
   ══════════════════════════════ */
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon  = btn.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('bx-hide', 'bx-show');
    } else {
        input.type = 'password';
        icon.classList.replace('bx-show', 'bx-hide');
    }
}

/* ══════════════════════════════
   VALIDATION HELPERS
   ══════════════════════════════ */
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(inputId, errorId, msg) {
    document.getElementById(inputId).parentElement.classList.add('error');
    const el = document.getElementById(errorId);
    el.textContent = msg;
    el.style.display = 'block';
    return false;
}

function hideError(inputId) {
    document.getElementById(inputId).parentElement.classList.remove('error');
    const el = document.getElementById(inputId).parentElement.querySelector('.error-message');
    if (el) el.style.display = 'none';
    return true;
}

/* ══════════════════════════════
   LOGIN FORM SUBMIT
   ══════════════════════════════ */
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    if (!document.getElementById('loginUsername').value.trim())
        valid = showError('loginUsername', 'loginUsernameError', 'Username is required');
    else
        hideError('loginUsername');

    if (!document.getElementById('loginPassword').value)
        valid = showError('loginPassword', 'loginPasswordError', 'Password is required');
    else
        hideError('loginPassword');

    if (valid) {
        // TODO: replace with real backend call
        alert('Login successful!');
        this.reset();
    }
});

/* ══════════════════════════════
   REGISTER FORM SUBMIT
   ══════════════════════════════ */
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const u  = document.getElementById('regUsername').value.trim();
    const em = document.getElementById('regEmail').value;
    const p  = document.getElementById('regPassword').value;
    const p2 = document.getElementById('regConfirmPassword').value;

    if (!u)
        valid = showError('regUsername', 'regUsernameError', 'Username is required');
    else if (u.length < 3)
        valid = showError('regUsername', 'regUsernameError', 'At least 3 characters');
    else
        hideError('regUsername');

    if (!em || !validateEmail(em))
        valid = showError('regEmail', 'regEmailError', 'Enter a valid email');
    else
        hideError('regEmail');

    if (!p || p.length < 6)
        valid = showError('regPassword', 'regPasswordError', 'At least 6 characters');
    else
        hideError('regPassword');

    if (!p2)
        valid = showError('regConfirmPassword', 'regConfirmPasswordError', 'Please confirm password');
    else if (p !== p2)
        valid = showError('regConfirmPassword', 'regConfirmPasswordError', 'Passwords do not match');
    else
        hideError('regConfirmPassword');

    if (valid) {
        // TODO: replace with real backend call
        alert('Registration successful!');
        this.reset();
        container.classList.remove('active');
    }
});

/* ══════════════════════════════
   REAL-TIME VALIDATION
   ══════════════════════════════ */
document.getElementById('regUsername').addEventListener('input', function () {
    if (this.value.trim().length >= 3) hideError('regUsername');
});

document.getElementById('regEmail').addEventListener('input', function () {
    if (validateEmail(this.value)) hideError('regEmail');
});

document.getElementById('regPassword').addEventListener('input', function () {
    if (this.value.length >= 6) hideError('regPassword');
});

document.getElementById('regConfirmPassword').addEventListener('input', function () {
    if (this.value === document.getElementById('regPassword').value)
        hideError('regConfirmPassword');
});

document.getElementById('loginUsername').addEventListener('input', function () {
    if (this.value.trim()) hideError('loginUsername');
});

document.getElementById('loginPassword').addEventListener('input', function () {
    if (this.value) hideError('loginPassword');
});

/* ══════════════════════════════
   RESET FORMS
   ══════════════════════════════ */
function resetForms() {
    ['loginForm', 'registerForm'].forEach(id => document.getElementById(id).reset());

    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.input-box').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.password-toggle i').forEach(icon => {
        icon.classList.remove('bx-show');
        icon.classList.add('bx-hide');
    });
}
