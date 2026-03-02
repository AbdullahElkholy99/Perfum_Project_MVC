// ── Data ──
const customers = [
    { id:'C001', name:'Sofia Larsson',    email:'sofia.l@email.com',    tier:'vip',    spend:4820, orders:22, scent:'Nuit d\'Ambre',   color:'#c8854a', last:'12 Feb 2026', country:'Sweden',       city:'Stockholm', joined:'Mar 2022', note:'Prefers heavy oriental notes. Loves exclusive launches.' },
    { id:'C002', name:'James Okafor',     email:'j.okafor@email.com',    tier:'loyal',  spend:1940, orders:9,  scent:'Rose Sauvage',    color:'#9b7ec8', last:'28 Feb 2026', country:'Nigeria',       city:'Lagos',     joined:'Jul 2023', note:'Very loyal. Usually orders around gift seasons.' },
    { id:'C003', name:'Mei Lin',          email:'meilin@studio.cn',      tier:'vip',    spend:6240, orders:31, scent:'Bois Sacré',      color:'#d97ba0', last:'01 Mar 2026', country:'China',          city:'Shanghai',  joined:'Jan 2021', note:'High-value. Interested in bespoke commissions.' },
    { id:'C004', name:'Amir Khalil',      email:'amirkh@proton.me',      tier:'vip',    spend:9100, orders:45, scent:'Oud Mystère',     color:'#5a8fc8', last:'27 Feb 2026', country:'UAE',            city:'Dubai',     joined:'Oct 2020', note:'Collects limited editions. Refer to concierge tier.' },
    { id:'C005', name:'Elena Vogt',       email:'elena.vogt@email.de',   tier:'new',    spend:165,  orders:1,  scent:'Iris Blanc',      color:'#7ab87a', last:'25 Feb 2026', country:'Germany',        city:'Berlin',    joined:'Feb 2026', note:'First purchase last week. Follow up recommended.' },
    { id:'C006', name:'Laila Nasser',     email:'laila.n@email.ae',      tier:'loyal',  spend:2380, orders:12, scent:'Rose Sauvage',    color:'#c8854a', last:'14 Feb 2026', country:'Egypt',          city:'Cairo',     joined:'May 2023', note:'Enjoys romantic, floral compositions.' },
    { id:'C007', name:'Tom Whitfield',    email:'tomw@inbox.co.uk',      tier:'lapsed', spend:540,  orders:3,  scent:'Nuit d\'Ambre',   color:'#a0a0a0', last:'Sep 2025',    country:'UK',             city:'London',    joined:'Nov 2022', note:'Has not ordered in 6+ months. Re-engagement candidate.' },
    { id:'C008', name:'Priya Menon',      email:'priya.m@mailbox.in',    tier:'loyal',  spend:1760, orders:8,  scent:'Sakura Lumière',  color:'#c870a0', last:'20 Feb 2026', country:'India',          city:'Mumbai',    joined:'Sep 2022', note:'Enjoys fresh florals. Interested in seasonal launches.' },
    { id:'C009', name:'Carlos Reyes',     email:'creyes@correo.mx',      tier:'new',    spend:340,  orders:2,  scent:'Bois Sacré',      color:'#d4943a', last:'22 Feb 2026', country:'Mexico',         city:'CDMX',      joined:'Jan 2026', note:'Recently joined. Purchased gifting set.' },
    { id:'C010', name:'Ingrid Holm',      email:'ingrid.h@nett.no',      tier:'vip',    spend:5500, orders:26, scent:'Oud Mystère',     color:'#5a8fc8', last:'18 Feb 2026', country:'Norway',         city:'Oslo',      joined:'Apr 2021', note:'Loyal VIP. Attends brand events when in Paris.' },
    { id:'C011', name:'Yuki Tanaka',      email:'yuki.t@mail.jp',        tier:'loyal',  spend:2100, orders:11, scent:'Sakura Lumière',  color:'#e87a7a', last:'10 Feb 2026', country:'Japan',          city:'Tokyo',     joined:'Jun 2022', note:'Appreciates the Japanese market line.' },
    { id:'C012', name:'Marcus Bell',      email:'mbell@fastmail.com',    tier:'lapsed', spend:890,  orders:5,  scent:'Iris Blanc',      color:'#888888', last:'Jun 2025',    country:'USA',            city:'New York',  joined:'Dec 2021', note:'Went dormant. Last opened newsletter 3 months ago.' },
];

const tierColors = { vip:'#d4a844', loyal:'#c8854a', new:'#7a9e7e', lapsed:'#c97a7a' };
const scentColors = {
    'Nuit d\'Ambre':'#c8854a', 'Rose Sauvage':'#c97a7a', 'Bois Sacré':'#7a9e7e',
    'Oud Mystère':'#5a8fc8', 'Iris Blanc':'#c8b8a0', 'Sakura Lumière':'#d47ab8'
};

let activeFilter = 'all';
let currentView = 'list';

function initials(name) { return name.split(' ').map(w=>w[0]).join('').slice(0,2); }

// ── Render Table ──
function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = data.map(c => `
    <tr onclick="openDrawer('${c.id}')">
        <td>
        <div class="cust-identity">
            <div class="cust-avatar" style="background:linear-gradient(135deg,${c.color},${c.color}99)">${initials(c.name)}</div>
            <div>
            <div class="cust-name">${c.name}</div>
            <div class="cust-email">${c.email}</div>
            </div>
        </div>
        </td>
        <td>
        <div class="tier-badge ${c.tier}">
            <div class="tier-dot"></div>
            ${c.tier.charAt(0).toUpperCase()+c.tier.slice(1)}
        </div>
        </td>
        <td><div class="spend-val">$${c.spend.toLocaleString()}</div></td>
        <td><div class="orders-count">${c.orders}</div></td>
        <td>
        <div class="fav-scent">
            <div class="scent-dot" style="background:${scentColors[c.scent]||'var(--accent)'}"></div>
            ${c.scent}
        </div>
        </td>
        <td><div class="last-date">${c.last}</div></td>
        <td>
        <div class="row-action">
            <div class="action-btn" onclick="event.stopPropagation();openDrawer('${c.id}')">👁</div>
            <div class="action-btn" onclick="event.stopPropagation()">✉</div>
            <div class="action-btn" onclick="event.stopPropagation()">⋯</div>
        </div>
        </td>
    </tr>
    `).join('');
}

// ── Render Grid ──
function renderGrid(data) {
    const grid = document.getElementById('gridView');
    grid.innerHTML = data.map((c,i) => `
    <div class="cust-card" style="animation-delay:${i*0.05}s" onclick="openDrawer('${c.id}')">
        <div class="card-top">
        <div class="card-av-wrap">
            <div class="card-avatar" style="background:linear-gradient(135deg,${c.color},${c.color}99)">${initials(c.name)}</div>
        </div>
        <div class="tier-badge ${c.tier}" style="align-self:flex-start">
            <div class="tier-dot"></div>${c.tier.charAt(0).toUpperCase()+c.tier.slice(1)}
        </div>
        </div>
        <div class="card-name">${c.name}</div>
        <div class="card-email">${c.email}</div>
        <div class="card-divider"></div>
        <div class="card-stats">
        <div class="card-stat-item">
            <div class="card-stat-val">$${c.spend.toLocaleString()}</div>
            <div class="card-stat-label">Total Spend</div>
        </div>
        <div class="card-stat-item">
            <div class="card-stat-val">${c.orders}</div>
            <div class="card-stat-label">Orders</div>
        </div>
        </div>
        <div class="card-footer">
        <div class="fav-scent" style="font-size:11px">
            <div class="scent-dot" style="background:${scentColors[c.scent]||'var(--accent)'}"></div>
            ${c.scent}
        </div>
        <div style="font-size:10px;color:var(--text3)">${c.last}</div>
        </div>
    </div>
    `).join('');
}

function getFiltered() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    return customers.filter(c => {
    const matchTier = activeFilter === 'all' || c.tier === activeFilter;
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.scent.toLowerCase().includes(q);
    return matchTier && matchSearch;
    });
}

function refresh() {
    const data = getFiltered();
    renderTable(data);
    renderGrid(data);
    document.getElementById('pageInfo').textContent = `Showing 1–${Math.min(10,data.length)} of ${data.length}`;
}

function filterTable() { refresh(); }

function setFilter(f, el) {
    activeFilter = f;
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    refresh();
}

function switchView(v) {
    currentView = v;
    const tv = document.getElementById('tableView');
    const gv = document.getElementById('gridView');
    if (v === 'list') {
    tv.classList.remove('hidden'); gv.classList.remove('visible');
    document.getElementById('listBtn').classList.add('active');
    document.getElementById('gridBtn').classList.remove('active');
    } else {
    tv.classList.add('hidden'); gv.classList.add('visible');
    document.getElementById('gridBtn').classList.add('active');
    document.getElementById('listBtn').classList.remove('active');
    }
}

// ── Drawer ──
function openDrawer(id) {
    const c = customers.find(x => x.id === id);
    if (!c) return;

    document.getElementById('drawerAv').style.background = `linear-gradient(135deg,${c.color},${c.color}99)`;
    document.getElementById('drawerAv').textContent = initials(c.name);
    document.getElementById('drawerName').textContent = c.name;
    document.getElementById('drawerEmail').textContent = c.email;

    document.getElementById('drawerMeta').innerHTML = `
    <div class="tier-badge ${c.tier}"><div class="tier-dot"></div>${c.tier.charAt(0).toUpperCase()+c.tier.slice(1)}</div>
    <div style="font-size:11px;color:var(--text3);display:flex;align-items:center;gap:4px">📍 ${c.city}, ${c.country}</div>
    `;

    document.getElementById('drawerStats').innerHTML = `
    <div class="drawer-stat"><div class="drawer-stat-val">$${c.spend.toLocaleString()}</div><div class="drawer-stat-label">Spend</div></div>
    <div class="drawer-stat"><div class="drawer-stat-val">${c.orders}</div><div class="drawer-stat-label">Orders</div></div>
    <div class="drawer-stat"><div class="drawer-stat-val">$${Math.round(c.spend/c.orders)}</div><div class="drawer-stat-label">Avg. Order</div></div>
    `;

    document.getElementById('drawerDetails').innerHTML = `
    <div class="info-row"><span class="info-key">Customer ID</span><span class="info-val">${c.id}</span></div>
    <div class="info-row"><span class="info-key">Member Since</span><span class="info-val">${c.joined}</span></div>
    <div class="info-row"><span class="info-key">Location</span><span class="info-val">${c.city}, ${c.country}</span></div>
    <div class="info-row"><span class="info-key">Favourite Scent</span>
        <span class="info-val" style="display:flex;align-items:center;gap:7px">
        <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${scentColors[c.scent]||'var(--accent)'}"></span>
        ${c.scent}
        </span>
    </div>
    <div class="info-row"><span class="info-key">Last Order</span><span class="info-val">${c.last}</span></div>
    `;

    // Fake recent orders
    const statuses = ['delivered','shipped','processing'];
    const scents = ['Nuit d\'Ambre','Rose Sauvage','Bois Sacré','Oud Mystère','Iris Blanc'];
    const fakeOrders = Array.from({length:3}, (_,i) => ({
    id: `#${5200 + Math.floor(Math.random()*50)}`,
    scent: scents[Math.floor(Math.random()*scents.length)],
    amt: (Math.floor(Math.random()*4)+1)*85,
    date: ['01 Mar 2026','20 Feb 2026','5 Feb 2026'][i],
    status: statuses[i]
    }));

    document.getElementById('drawerOrders').innerHTML = fakeOrders.map(o => `
    <div class="ro-item">
        <div>
        <div class="ro-id">${o.id}</div>
        <div class="ro-name">${o.scent}</div>
        </div>
        <div class="ro-right">
        <div class="ro-amt">$${o.amt}</div>
        <div class="ro-date">${o.date}</div>
        </div>
        <span class="badge ${o.status}" style="margin-left:14px">${o.status}</span>
    </div>
    `).join('');

    document.getElementById('drawerNote').textContent = c.note;

    document.getElementById('backdrop').classList.add('open');
    document.getElementById('drawer').classList.add('open');
}

function closeDrawer() {
    document.getElementById('backdrop').classList.remove('open');
    document.getElementById('drawer').classList.remove('open');
}

// ── Theme ──
let dark = false;
function toggleTheme() {
    dark = !dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    document.getElementById('pill').classList.toggle('on', dark);
    document.getElementById('themeLabel').textContent = dark ? 'Light Mode' : 'Dark Mode';
}

// Nava
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    });
});

// Init
refresh();
