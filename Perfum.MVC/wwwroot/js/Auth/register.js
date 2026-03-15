/* ── Theme ── */
let authDark = false;
function toggleAuthTheme() {
    authDark = !authDark;
    document.documentElement.setAttribute('data-theme', authDark ? 'dark' : 'light');
    document.getElementById('authThemeBtn').innerHTML = authDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
}

/* ── Password show/hide ── */
function togglePw(id, btn) {
    const inp = document.getElementById(id);
    const show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    btn.innerHTML = show
        ? '<i class="fa-regular fa-eye-slash"></i>'
        : '<i class="fa-regular fa-eye"></i>';
}

/* ── Password strength ── */
function checkStrength(val) {
    const bars   = [1,2,3,4].map(n => document.getElementById('bar' + n));
    const label  = document.getElementById('pwLabel');
    const levels = ['weak','fair','good','strong'];
    let score = 0;
    if (val.length >= 8)          score++;
    if (/[A-Z]/.test(val))        score++;
    if (/[0-9]/.test(val))        score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    bars.forEach((b, i) => {
        b.className = 'pw-bar ' + (i < score ? levels[score - 1] : '');
    });
    const names = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    label.textContent = val.length === 0 ? 'Enter a password' : names[score] + ' password';
    label.style.color = ['','#e07070','#e0b870','#a0c870','var(--green)'][score] || 'var(--text3)';
}

/* ── Password match ── */
function checkMatch() {
    const pw  = document.getElementById('regPassword').value;
    const cfm = document.getElementById('regConfirm').value;
    const el  = document.getElementById('pwMatch');
    if (!cfm) { el.textContent = ''; return; }
    if (pw === cfm) {
        el.className = 'pw-match ok';
        el.innerHTML = '<i class="fa-solid fa-check" style="font-size:10px"></i> Passwords match';
    } else {
        el.className = 'pw-match err';
        el.innerHTML = '<i class="fa-solid fa-xmark" style="font-size:10px"></i> Passwords do not match';
    }
}

/* ── Multi-step navigation ── */
let currentStep = 1;

function goStep(n) {
    // Basic validation before advancing
    if (n > currentStep) {
        if (currentStep === 1) {
            const u = document.getElementById('regUsername').value.trim();
            const e = document.getElementById('regEmail').value.trim();
            const p = document.getElementById('regPassword').value;
            const c = document.getElementById('regConfirm').value;
            if (!u || !e || !p || !c) { shakePanel(1); return; }
            if (p !== c) { shakePanel(1); return; }
        }
        if (currentStep === 2) {
            const terms = document.getElementById('regTerms');
            if (!terms.checked) { shakePanel(2); return; }
            // Populate review card
            document.getElementById('rv-username').textContent = document.getElementById('regUsername').value;
            document.getElementById('rv-email').textContent    = document.getElementById('regEmail').value;
            document.getElementById('rv-phone').textContent    = document.getElementById('regPhone').value || '—';
            document.getElementById('rv-address').textContent  = document.getElementById('regAddress').value || '—';
        }
    }

    // Hide current, show target
    document.getElementById('panel-' + currentStep).classList.remove('active');
    document.getElementById('panel-' + n).classList.add('active');

    // Update step indicators
    for (let i = 1; i <= 3; i++) {
        const ind = document.getElementById('step-ind-' + i);
        ind.classList.remove('active', 'done');
        if (i < n)  ind.classList.add('done');
        if (i === n) ind.classList.add('active');
        // Update circle icons
        const circle = ind.querySelector('.reg-step-circle');
        if (i < n)  circle.innerHTML = '<i class="fa-solid fa-check" style="font-size:9px"></i>';
        if (i >= n) circle.textContent = i;
    }
    // Fill connector lines
    document.getElementById('line1').style.width = n >= 2 ? '100%' : '0%';
    document.getElementById('line2').style.width = n >= 3 ? '100%' : '0%';

    // Show/hide google section (only on step 1)
    document.getElementById('googleSection').style.display = n === 1 ? 'block' : 'none';

    currentStep = n;
    // Scroll form panel back to top
    document.querySelector('.login-form-panel').scrollTop = 0;
}

function shakePanel(step) {
    const panel = document.getElementById('panel-' + step);
    panel.style.animation = 'none';
    panel.offsetHeight; // reflow
    panel.style.animation = 'inputShake .38s ease-out';
    setTimeout(() => panel.style.animation = '', 400);
}

/* ── Submit loading state ── */
document.getElementById('regForm').addEventListener('submit', () => {
    document.getElementById('regSubmit').classList.add('loading');
});

/* ── Mist lines ── */
(function () {
    const c = document.getElementById('lbMist');
    if (!c) return;
    for (let i = 0; i < 14; i++) {
        const el = document.createElement('div');
        el.className = 'lb-mist-line';
        const l = Math.random() * 100, h = 70 + Math.random() * 180;
        const d = 10 + Math.random() * 14, dl = -(Math.random() * d);
        el.style.cssText = `left:${l}%;height:${h}px;animation-duration:${d}s;animation-delay:${dl}s;`;
        c.appendChild(el);
    }
})();

/* ── Bottle parallax ── */
const bp = document.querySelector('.login-brand');
const bt = document.querySelector('.lb-bottle');
if (bp && bt) {
    bp.addEventListener('mousemove', e => {
        const r  = bp.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
        const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
        bt.style.transform = `translateY(0) rotate(${dx * 4}deg) rotateX(${-dy * 3}deg)`;
    });
    bp.addEventListener('mouseleave', () => { bt.style.transform = ''; });
}