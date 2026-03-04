// ── CONSTANTS ──
const EMOJIS_POOL = ['🌸','🔥','🌳','❄️','🌿','🍂','🌙','☀️','💎','🌹','🌊','🏜️','🍋','⭐','🌺','🕯️','🫧','🌾','🌴','🦋'];
const COLORS = ['#c8854a','#d4a844','#c97a7a','#7a9e7e','#7a90be','#9a7ac8','#c8a07a','#d4704a','#7ab8c8','#8a7ab8'];
const CAT_COLORS = {Floral:'#c97a7a',Oriental:'#c8854a',Woody:'#7a9e7e',Fresh:'#7a90be',Fougère:'#9a7ac8',Gourmand:'#d4a844'};
const CAT_EMOJIS = {Floral:'🌸',Oriental:'🔥',Woody:'🌳',Fresh:'❄️',Fougère:'🌿',Gourmand:'🍂'};
const STATUS_LABELS = {active:'Active',draft:'Draft',limited:'Limited',archived:'Archived',featured:'Featured'};
const STATUS_CLASSES = {active:'sb-active',draft:'sb-draft',limited:'sb-limited',archived:'sb-archived',featured:'sb-featured'};

const ALL_PRODUCTS = [
{id:1,name:"Nuit d'Ambre",cat:'Oriental',price:210},
{id:2,name:'Rose Sauvage',cat:'Floral',price:185},
{id:3,name:'Bois Sacré',cat:'Woody',price:340},
{id:4,name:'Oud Mystère',cat:'Oriental',price:520},
{id:5,name:'Sakura Lumière',cat:'Floral',price:195},
{id:6,name:'Forêt Noire',cat:'Woody',price:285},
{id:7,name:'Citrus Élite',cat:'Fresh',price:145},
{id:8,name:'Encens Royal',cat:'Oriental',price:410},
{id:9,name:'Iris Blanc',cat:'Floral',price:165},
{id:10,name:'Praline Noir',cat:'Gourmand',price:175},
{id:11,name:'Lavande Étoile',cat:'Fougère',price:125},
{id:12,name:'Aqua Marina',cat:'Fresh',price:135},
];

let collections = [
{id:1,name:'Nuits Dorées',season:'Winter 2025',desc:'A nocturnal journey through warm spices, burning amber and the silk of oud — worn when the sky turns gold.',emoji:'🌙',color:'#c8854a',status:'featured',productIds:[1,4,8],revenue:28400,orders:138,launched:'01 Nov 2025',perf:[28,34,42,38,50,62,55,70,66,80,90,110]},
{id:2,name:'Jardin Blanc',season:'Spring 2026',desc:'Soft morning light filtered through white petals — a collection of luminous florals for the new season.',emoji:'🌸',color:'#c97a7a',status:'active',productIds:[2,5,9],revenue:14200,orders:82,launched:'01 Mar 2026',perf:[0,0,0,0,0,0,0,0,0,10,40,70]},
{id:3,name:'La Forêt Profonde',season:'Autumn 2025',desc:'Mossy depths, dark resin and ancient cedar — the forest breathes in every note.',emoji:'🌳',color:'#7a9e7e',status:'active',productIds:[3,6,11],revenue:22600,orders:104,launched:'15 Sep 2025',perf:[20,28,35,45,60,72,80,75,68,60,52,44]},
{id:4,name:'Riviera Soleil',season:'Summer 2025',desc:'Bergamot on warm skin, sea breeze and driftwood — the Mediterranean in a bottle.',emoji:'☀️',color:'#d4a844',status:'archived',productIds:[7,12],revenue:18900,orders:166,launched:'01 Jun 2025',perf:[80,92,110,120,130,125,100,80,60,40,20,10]},
{id:5,name:'Séduction Rare',season:'Limited Edition',desc:'Crafted in limited quantity — an exclusive composition of rare oud and absolute rose for true connoisseurs.',emoji:'💎',color:'#9a7ac8',status:'limited',productIds:[4,8,1],revenue:42000,orders:56,launched:'15 Jan 2026',perf:[30,50,80,120,160,190,200,210,220,230,240,250]},
{id:6,name:'Épices du Levant',season:'Winter 2026',desc:'Saffron, cardamom and cinnamon woven through a bed of smoky resins — a voyage to the heart of the Middle East.',emoji:'🏜️',color:'#d4704a',status:'draft',productIds:[4,8],revenue:0,orders:0,launched:'TBD',perf:[0,0,0,0,0,0,0,0,0,0,0,0]},
];

let currentColl = null;
let currentView = 'grid';
let statusFilter = 'all';
let editStatus = 'active';
let modalStatus = 'active';
let editEmoji = '🌸';
let editColor = COLORS[0];
let modalEmoji = '🌸';
let modalColor = COLORS[0];

// ── INIT ──
function init() {
    updateStats();
buildFilterChips();
applyFilters();
}

function updateStats() {
const totalProds = [...new Set(collections.flatMap(c=>c.productIds))].length;
const totalRev = collections.reduce((s,c)=>s+c.revenue,0);
const best = [...collections].sort((a,b)=>b.orders-a.orders)[0];
document.getElementById('statTotal').textContent = collections.length;
document.getElementById('statProds').textContent = totalProds;
document.getElementById('statRev').textContent = '$'+Math.round(totalRev/1000)+'k';
document.getElementById('statTop').textContent = best ? best.name.split(' ')[0]+'…' : '—';
document.getElementById('pageSubtitle').textContent = `${collections.length} collections · ${totalProds} products curated`;
}

function buildFilterChips() {
const statuses = ['all','active','limited','draft','archived','featured'];
document.getElementById('filterChips').innerHTML = statuses.map(s=>`
<div class="fchip ${s===statusFilter?'on':''}" onclick="setStatusFilter('${s}',this)">${s === 'all' ? 'All' : STATUS_LABELS[s] || s}</div>`).join('');
}

function setStatusFilter(s,el) {
    statusFilter = s;
document.querySelectorAll('#filterChips .fchip').forEach(c=>c.classList.remove('on'));
el.classList.add('on');
applyFilters();
}

function getFiltered() {
const q = document.getElementById('searchInput').value.toLowerCase().trim();
return collections.filter(c=>{
const ms = statusFilter==='all' || c.status===statusFilter;
const mq = !q || c.name.toLowerCase().includes(q) || c.season.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
return ms && mq;
});
}

function applyFilters() {
const data = getFiltered();
document.getElementById('pageInfo').textContent = `${data.length} collection${data.length !== 1 ? 's' : ''}`;
renderGrid(data);
renderTable(data);
}

// ── GRID ──
function renderGrid(data) {
const el = document.getElementById('collGrid');
if(!data.length){el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:64px;color:var(--text3)"><div style="font-size:42px;margin-bottom:12px;opacity:.4">⬡</div><div style="font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--text2)">No collections found</div></div>`;return;}
el.innerHTML = data.map((c,i)=>{
const prods = c.productIds.map(id=>ALL_PRODUCTS.find(p=>p.id===id)).filter(Boolean);
const pct = c.orders ? Math.min(100, Math.round(c.orders/200*100)) : 0;
return `
<div class="coll-card" data-id="${c.id}" style="animation-delay:${i*.06}s" onclick="openDrawer(${c.id})">
    <div class="card-actions">
        <div class="ca-btn" onclick="event.stopPropagation();openDrawer(${c.id})" title="Edit">✏</div>
        <div class="ca-btn" onclick="event.stopPropagation();duplicateCollection(${c.id})" title="Duplicate">⧉</div>
        <div class="ca-btn del" onclick="event.stopPropagation();deleteCollection(${c.id})" title="Delete">✕</div>
    </div>
    <div class="season-badge ${STATUS_CLASSES[c.status]||'sb-active'}">${STATUS_LABELS[c.status] || c.status}</div>
    <div class="card-cover" style="background:linear-gradient(140deg,${c.color}22,${c.color}09)">
        <div class="card-cover-pattern" style="background-image:radial-gradient(circle,${c.color}33 1px,transparent 1px)"></div>
        <div class="card-cover-emoji">${c.emoji}</div>
    </div>
    <div class="card-body">
        <div class="card-season-tag">${c.season}</div>
        <div class="card-name">${c.name}</div>
        <div class="card-desc">${c.desc}</div>
        <div class="card-meta-row">
            <div class="card-prods">
                <div class="prod-avatars">${prods.slice(0, 4).map(p => `<div class="prod-av" style="background:linear-gradient(135deg,${CAT_COLORS[p.cat] || c.color}33,${CAT_COLORS[p.cat] || c.color}11)">${CAT_EMOJIS[p.cat] || '🧴'}</div>`).join('')}${c.productIds.length > 4 ? `<div class="prod-av" style="font-size:9px;color:var(--text3)">+${c.productIds.length - 4}</div>` : ''}</div>
                <span>${c.productIds.length} product${c.productIds.length !== 1 ? 's' : ''}</span>
            </div>
            ${c.revenue ? `<div style="text-align:right"><div class="card-revenue">$${(c.revenue / 1000).toFixed(1)}k</div><div class="card-rev-label">Revenue</div></div>` : '<div style="font-size:11px;color:var(--text3);font-style:italic">Not launched</div>'}
        </div>
        ${c.revenue ? `<div class="card-progress">
        <div class="progress-label"><span>${c.orders} orders</span><span>${pct}% of target</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%;background:linear-gradient(to right,${c.color}99,${c.color})"></div></div>
    </div>` : ''}
    </div>
</div>`;
}).join('');
}

// ── TABLE ──
function renderTable(data) {
const tbody = document.getElementById('tableBody');
if(!data.length){tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:48px;color:var(--text3)">No collections found</td></tr>`;return;}
tbody.innerHTML = data.map(c=>`
<tr onclick="openDrawer(${c.id})">
    <td>
        <div class="tbl-identity">
            <div class="tbl-thumb" style="background:linear-gradient(135deg,${c.color}22,${c.color}09)">${c.emoji}</div>
            <div>
                <div class="tbl-name">${c.name}</div>
                <div class="tbl-season">${c.season}</div>
            </div>
        </div>
    </td>
    <td style="font-size:12px;color:var(--text3);letter-spacing:.06em">${c.season}</td>
    <td style="font-size:13px;color:var(--text2)">${c.productIds.length} products</td>
    <td><span class="tbl-rev">${c.revenue ? '$' + (c.revenue / 1000).toFixed(1) + 'k' : '—'}</span></td>
    <td><span class="tbl-orders">${c.orders || '—'}</span></td>
    <td><span class="season-badge ${STATUS_CLASSES[c.status]||'sb-active'}" style="position:static">${STATUS_LABELS[c.status] || c.status}</span></td>
    <td style="font-size:12px;color:var(--text3)">${c.launched}</td>
    <td>
        <div class="row-actions">
            <div class="ra-btn" onclick="event.stopPropagation();openDrawer(${c.id})">✏</div>
            <div class="ra-btn" onclick="event.stopPropagation();duplicateCollection(${c.id})">⧉</div>
            <div class="ra-btn del" onclick="event.stopPropagation();deleteCollection(${c.id})">✕</div>
        </div>
    </td>
</tr>`).join('');
}

// ── VIEW SWITCH ──
function switchView(v) {
    currentView = v;
document.getElementById('collGrid').classList.toggle('hidden', v!=='grid');
document.getElementById('tableWrap').classList.toggle('hidden', v!=='list');
document.getElementById('gridBtn').classList.toggle('on', v==='grid');
document.getElementById('listBtn').classList.toggle('on', v==='list');
}

// ── DRAWER ──
function openDrawer(id) {
const c = collections.find(x=>x.id===id);
if(!c) return;
currentColl = c;
editStatus = c.status;
editEmoji = c.emoji;
editColor = c.color;

document.getElementById('dHero').style.background = `linear-gradient(140deg,${c.color}28,${c.color}0a)`;
document.getElementById('dEmoji').textContent = c.emoji;
document.getElementById('dSeason').textContent = c.season;
document.getElementById('dName').textContent = c.name;
document.getElementById('dDesc').textContent = c.desc;

// KPIs
document.getElementById('dKpis').innerHTML = [
{v: c.revenue ? '$'+(c.revenue/1000).toFixed(1)+'k' : '—', l:'Revenue'},
{v: c.orders || '—', l:'Orders'},
{v: c.productIds.length, l:'Products'},
].map(k=>`<div class="d-kpi"><div class="d-kpi-val">${k.v}</div><div class="d-kpi-label">${k.l}</div></div>`).join('');

// Mini chart
const max = Math.max(...c.perf, 1);
document.getElementById('dChart').innerHTML = c.perf.map((v,i)=>`
<div class="mc-bar" style="height:${Math.max(4,Math.round(v/max*100))}%;background:linear-gradient(to top,${c.color}99,${c.color});opacity:${0.4+v/max*.6};animation-delay:${i*.04}s"></div>`).join('');

// Products list
renderDrawerProducts();

// Edit form
document.getElementById('editName').value = c.name;
document.getElementById('editDesc').value = c.desc;
document.getElementById('editSeason').value = c.season;
document.getElementById('editDate').value = c.launched;
document.querySelectorAll('#editStatusGroup .tg-btn').forEach(b=>b.classList.toggle('on', b.textContent.toLowerCase()===c.status));

renderEmojiPicker('editEmojiPicker', editEmoji, (em)=>{editEmoji = em;document.getElementById('dEmoji').textContent=em;});
renderColorPicker('editColorPicker', editColor, (col)=>{editColor = col;document.getElementById('dHero').style.background=`linear-gradient(140deg,${col}28,${col}0a)`;});

renderAddProdList();

document.getElementById('drawerBg').classList.add('open');
document.getElementById('drawer').classList.add('open');
}

function renderDrawerProducts() {
if(!currentColl) return;
const prods = currentColl.productIds.map(id=>ALL_PRODUCTS.find(p=>p.id===id)).filter(Boolean);
document.getElementById('dProdCount').textContent = `(${prods.length})`;
document.getElementById('dProdList').innerHTML = prods.length ? prods.map(p=>`
<div class="d-prod-item">
    <div class="d-prod-emoji" style="background:linear-gradient(135deg,${CAT_COLORS[p.cat]||'#c8854a'}22,${CAT_COLORS[p.cat]||'#c8854a'}09)">${CAT_EMOJIS[p.cat] || '🧴'}</div>
    <div><div class="d-prod-name">${p.name}</div><div class="d-prod-cat">${p.cat}</div></div>
    <div class="d-prod-price">$${p.price}</div>
    <div class="d-prod-remove" onclick="removeProdFromColl(${p.id})" title="Remove">✕</div>
</div>`).join('') : `<div style="font-size:12px;color:var(--text3);padding:12px 0">No products in this collection yet</div>`;
}

function removeProdFromColl(pid) {
if(!currentColl) return;
currentColl.productIds = currentColl.productIds.filter(x=>x!==pid);
renderDrawerProducts();
renderAddProdList();
applyFilters();
showToast('Product removed from collection');
}

function renderAddProdList() {
if(!currentColl) return;
const q = document.getElementById('addProdSearch')?.value?.toLowerCase()||'';
const el = document.getElementById('addProdList');
if(!el) return;
const filtered = ALL_PRODUCTS.filter(p=> !q || p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q));
el.innerHTML = filtered.map(p=>{
const already = currentColl.productIds.includes(p.id);
return `<div class="add-prod-item ${already?'already':''}" onclick="${already?'':'addProdToColl('+p.id+')'}">
    <div style="width:28px;height:28px;border-radius:7px;background:linear-gradient(135deg,${CAT_COLORS[p.cat]||'#c8854a'}22,${CAT_COLORS[p.cat]||'#c8854a'}09);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">${CAT_EMOJIS[p.cat] || '🧴'}</div>
    <div style="flex:1"><div style="font-size:12px;color:var(--text)">${p.name}</div><div style="font-size:10px;color:var(--text3)">${p.cat}</div></div>
    <div style="font-size:12px;color:var(--accent);font-family:'Cormorant Garamond',serif">$${p.price}</div>
    ${already ? `<div style="font-size:10px;color:var(--text3);letter-spacing:.08em">Added</div>` : `<div style="font-size:18px;color:var(--accent);cursor:pointer">+</div>`}
</div>`;
}).join('');
}

function addProdToColl(pid) {
if(!currentColl || currentColl.productIds.includes(pid)) return;
currentColl.productIds.push(pid);
renderDrawerProducts();
renderAddProdList();
applyFilters();
const p = ALL_PRODUCTS.find(x=>x.id===pid);
showToast(`"${p?.name}" added to collection`);
}

function closeDrawer() {
    document.getElementById('drawerBg').classList.remove('open');
document.getElementById('drawer').classList.remove('open');
currentColl = null;
}

function setEditStatus(s,el) {
    editStatus = s;
document.querySelectorAll('#editStatusGroup .tg-btn').forEach(b=>b.classList.remove('on'));
el.classList.add('on');
}

function saveCollection() {
if(!currentColl) return;
currentColl.name = document.getElementById('editName').value || currentColl.name;
currentColl.desc = document.getElementById('editDesc').value || currentColl.desc;
currentColl.season = document.getElementById('editSeason').value || currentColl.season;
currentColl.launched = document.getElementById('editDate').value || currentColl.launched;
currentColl.status = editStatus;
currentColl.emoji = editEmoji;
currentColl.color = editColor;
closeDrawer();
applyFilters();
updateStats();
showToast(`"${currentColl.name}" saved ✦`);
}

// ── CREATE MODAL ──
function openCreateModal() {
    modalEmoji = '🌸'; modalColor = COLORS[0]; modalStatus = 'active';
renderEmojiPicker('mEmojiPicker', modalEmoji, em=>modalEmoji=em);
renderColorPicker('mColorPicker', modalColor, col=>modalColor=col);
document.getElementById('modalBg').classList.add('open');
}

function closeModal(force) {
if(force===true || force?.target===document.getElementById('modalBg'))
document.getElementById('modalBg').classList.remove('open');
}

function setModalStatus(s,el) {
    modalStatus = s;
document.querySelectorAll('#mStatusGroup .tg-btn').forEach(b=>b.classList.remove('on'));
el.classList.add('on');
}

function createCollection() {
const name = document.getElementById('mName').value.trim();
if(!name){document.getElementById('mName').focus(); return; }
const newC = {
    id: Date.now(),
name,
season: document.getElementById('mSeason').value || 'Season TBD',
desc: document.getElementById('mDesc').value || 'A new curated collection.',
emoji: modalEmoji,
color: modalColor,
status: modalStatus,
productIds: [],
revenue: 0,
orders: 0,
launched: document.getElementById('mDate').value || 'TBD',
perf: Array(12).fill(0),
};
collections.unshift(newC);
closeModal(true);
applyFilters();
updateStats();
showToast(`"${name}" collection created ✦`);
['mName','mDesc','mSeason','mDate'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
}

// ── DELETE / DUPLICATE ──
function deleteCollection(id) {
if(!id) return;
const c = collections.find(x=>x.id===id);
if(!c || !confirm(`Delete "${c.name}"? This cannot be undone.`)) return;
collections = collections.filter(x=>x.id!==id);
if(currentColl?.id===id) closeDrawer();
applyFilters();
updateStats();
showToast(`"${c.name}" deleted`);
}

function duplicateCollection(id) {
const c = collections.find(x=>x.id===id);
if(!c) return;
const copy = {...c, id: Date.now(), name: c.name+' (Copy)', status:'draft', revenue:0, orders:0, launched:'TBD', perf:Array(12).fill(0)};
collections.splice(collections.indexOf(c)+1,0,copy);
applyFilters();
updateStats();
showToast(`"${c.name}" duplicated`);
}

// ── PICKERS ──
function renderEmojiPicker(cid, selected, cb) {
    document.getElementById(cid).innerHTML = EMOJIS_POOL.map(em => `
<div class="em-opt ${em === selected ? 'on' : ''}" onclick="pickEmoji('${cid}','${em}')">${em}</div>`).join('');
document.getElementById(cid)._cb = cb;
}

function pickEmoji(cid, em) {
    document.querySelectorAll(`#${cid} .em-opt`).forEach(o => o.classList.remove('on'));
document.querySelector(`#${cid} [onclick*="${em}"]`)?.classList.add('on');
const cb = document.getElementById(cid)._cb;
if(cb) cb(em);
if(cid==='editEmojiPicker') {editEmoji = em; if(currentColl) document.getElementById('dEmoji').textContent=em; }
if(cid==='mEmojiPicker') modalEmoji=em;
}

function renderColorPicker(cid, selected, cb) {
    document.getElementById(cid).innerHTML = COLORS.map(c => `
<div class="swatch ${c === selected ? 'on' : ''}" style="background:${c}" onclick="pickColor('${cid}','${c}')"></div>`).join('');
document.getElementById(cid)._cb = cb;
}

function pickColor(cid, col) {
    document.querySelectorAll(`#${cid} .swatch`).forEach(s => s.classList.remove('on'));
event.currentTarget.classList.add('on');
const cb = document.getElementById(cid)._cb;
if(cb) cb(col);
if(cid==='editColorPicker') {editColor = col; if(currentColl) document.getElementById('dHero').style.background=`linear-gradient(140deg,${col}28,${col}0a)`; }
if(cid==='mColorPicker') modalColor=col;
}

// ── THEME ──
let dark=false;
function toggleTheme(){
    dark = !dark;
document.documentElement.setAttribute('data-theme',dark?'dark':'light');
document.getElementById('pill').classList.toggle('on',dark);
document.getElementById('themeLabel').textContent=dark?'Light Mode':'Dark Mode';
}

// ── NAV ──
document.querySelectorAll('.nav-item').forEach(item=>{
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// ── TOAST ──
function showToast(msg){
const t=document.getElementById('toast');
document.getElementById('toastMsg').textContent=msg;
t.classList.add('show');
setTimeout(()=>t.classList.remove('show'),2800);
}

// ── BOOT ──
init();
