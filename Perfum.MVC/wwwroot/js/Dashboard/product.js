
// ── DATA ──
    const EMOJIS = {
        'Floral':'🌸','Oriental':'🔥','Woody':'🌳','Fresh':'❄️','Fougère':'🌿','Gourmand':'🍂'
};
    const CAT_COLORS = {
        'Floral':'#c97a7a','Oriental':'#c8854a','Woody':'#7a9e7e',
    'Fresh':'#7a90be','Fougère':'#a87ac8','Gourmand':'#d4a844'
};

    let products = [
    {id:1, name:"Nuit d'Ambre",   sku:'ORI-001', category:'Oriental', size:'50ml',  price:210, stock:24, status:'active', rating:4.8, tagline:'A deep amber reverie threaded with labdanum and tonka.',   top:['Cardamom','Pepper'],    heart:['Rose','Oud'],        base:['Amber','Benzoin','Vanilla']},
    {id:2, name:'Rose Sauvage',   sku:'FLR-002', category:'Floral',   size:'100ml', price:185, stock:8,  status:'active', rating:4.9, tagline:'A wild rose caught between morning dew and warm earth.',  top:['Bergamot','Geranium'],  heart:['Rose','Peony'],      base:['Musk','Sandalwood']},
    {id:3, name:'Bois Sacré',     sku:'WOD-003', category:'Woody',    size:'75ml',  price:340, stock:31, status:'active', rating:4.7, tagline:'Sacred cedarwood veiled in incense and soft leather.',    top:['Lemon','Juniper'],      heart:['Cedar','Vetiver'],   base:['Oakmoss','Musk']},
    {id:4, name:'Oud Mystère',    sku:'ORI-004', category:'Oriental', size:'50ml',  price:520, stock:15, status:'active', rating:5.0, tagline:'An enigmatic veil of oud rising through amber smoke.',    top:['Saffron','Rose'],       heart:['Oud','Labdanum'],    base:['Amber','Patchouli']},
    {id:5, name:'Iris Blanc',     sku:'FLR-005', category:'Floral',   size:'100ml', price:165, stock:0,  status:'archived',rating:4.5,tagline:'Cool orris root dusted with soft violet and clean musk.',  top:['Violet Leaf','Aldehydes'],heart:['Iris','Ylang'],     base:['Musk','Amber']},
    {id:6, name:'Sakura Lumière', sku:'FLR-006', category:'Floral',   size:'50ml',  price:195, stock:6,  status:'active', rating:4.6, tagline:'A fleeting sakura blossom lifted by spring rain.',        top:['Yuzu','Cherry Blossom'],heart:['Peony','Magnolia'], base:['White Musk','Cashmere']},
    {id:7, name:'Forêt Noire',   sku:'WOD-007', category:'Woody',    size:'100ml', price:285, stock:19, status:'active', rating:4.4, tagline:'Deep pine forest resin pierced by cold mountain air.',    top:['Pine','Eucalyptus'],    heart:['Fir Balsam','Cedar'],base:['Vetiver','Tobacco']},
    {id:8, name:'Citrus Élite',  sku:'FRS-008', category:'Fresh',    size:'75ml',  price:145, stock:42, status:'active', rating:4.3, tagline:'A burst of golden citrus over vibrant marine accord.',    top:['Bergamot','Grapefruit'],heart:['Neroli','Marine'],  base:['Musk','Driftwood']},
    {id:9, name:'Encens Royal',  sku:'ORI-009', category:'Oriental', size:'50ml',  price:410, stock:9,  status:'active', rating:4.8, tagline:'Ceremonial incense swirled with gold-dusted resins.',    top:['Frankincense','Pepper'],heart:['Myrrh','Rose'],     base:['Oud','Sandalwood']},
    {id:10,name:'Lavande Étoile',sku:'FOU-010', category:'Fougère',  size:'100ml', price:125, stock:55, status:'active', rating:4.2, tagline:'Classic lavender laced with oakmoss and coumarin.',       top:['Lavender','Bergamot'],  heart:['Geranium','Sage'],  base:['Oakmoss','Coumarin']},
    {id:11,name:'Praline Noir',  sku:'GOU-011', category:'Gourmand', size:'50ml',  price:175, stock:3,  status:'draft',  rating:4.6, tagline:'Dark praline folded into vetiver and smoked birch.',     top:['Caramel','Praline'],    heart:['Chocolate','Tobacco'],base:['Birch','Vanilla']},
    {id:12,name:'Aqua Marina',   sku:'FRS-012', category:'Fresh',    size:'75ml',  price:135, stock:28, status:'active', rating:4.1, tagline:'Oceanic ozonic freshness over a cedar-driftwood base.',  top:['Sea Spray','Ozonic'],   heart:['Aquatic','Violet'], base:['Cedar','Musk']},
    ];

    let currentView = 'grid';
    let currentFilter = 'all';
    let currentProduct = null;
    let selectedIds = new Set();
    let editStatus = 'active';
    let modalStatus = 'active';
    let sortCol = 'name';

// ── INIT ──
const categories = ['all', ...new Set(products.map(p=>p.category))];

    function buildCategoryChips() {
  const el = document.getElementById('categoryChips');
  el.innerHTML = categories.map(c=>`
    <div class="chip ${c==='all'?'active':''}" onclick="setCategory('${c}',this)">${c === 'all' ? 'All' : c}</div>
    `).join('');
}

    function setCategory(cat, el) {
        currentFilter = cat;
  document.querySelectorAll('#categoryChips .chip').forEach(c=>c.classList.remove('active'));
    el.classList.add('active');
    applyFilters();
}

    function getFiltered() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
    const sort = document.getElementById('sortSel').value;
  let data = products.filter(p => {
    const matchCat = currentFilter==='all' || p.category===currentFilter;
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) || [...p.top,...p.heart,...p.base].some(n=>n.toLowerCase().includes(q));
    return matchCat && matchQ;
  });
  data.sort((a,b)=>{
    if(sort==='name') return a.name.localeCompare(b.name);
    if(sort==='price-asc') return a.price-b.price;
    if(sort==='price-desc') return b.price-a.price;
    if(sort==='stock') return a.stock-b.stock;
    if(sort==='rating') return b.rating-a.rating;
    if(sort==='category') return a.category.localeCompare(b.category);
    if(sort==='status') return a.status.localeCompare(b.status);
    return 0;
  });
    return data;
}

    function applyFilters() {
  const data = getFiltered();
    renderGrid(data);
    renderTable(data);
    document.getElementById('pageInfo').textContent = `Showing 1–${Math.min(12, data.length)} of ${data.length}`;
}

    // ── STOCK HELPERS ──
    function stockClass(n){ return n===0?'sb-out':n<10?'sb-low':'sb-in'; }
    function stockLabel(n){ return n===0?'Out of Stock':n<10?'Low Stock':'In Stock'; }
    function stockNumClass(n){ return n===0?'out':n<10?'low':''; }

    // ── GRID ──
    function renderGrid(data) {
  const grid = document.getElementById('prodGrid');
    if (!data.length) {grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text3)"><div style="font-size:40px;margin-bottom:12px">🔍</div><div style="font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--text2)">No fragrances found</div><div style="font-size:12px;margin-top:6px">Try a different search or filter</div></div>`; return; }
  grid.innerHTML = data.map((p,i)=>{
    const col = CAT_COLORS[p.category]||'#c8854a';
    const em = EMOJIS[p.category]||'🧴';
    const sel = selectedIds.has(p.id);
    return `
    <div class="prod-card ${sel?'selected-card':''}" data-id="${p.id}" onclick="openDrawer(${p.id})" style="animation-delay:${i*.04}s">
        <div class="prod-card-actions">
            <div class="pa-btn" onclick="event.stopPropagation();toggleSelect(${p.id})" title="Select">${sel ? '☑' : '☐'}</div>
            <div class="pa-btn" onclick="event.stopPropagation();openDrawer(${p.id})" title="Edit">✏</div>
            <div class="pa-btn del" onclick="event.stopPropagation();deleteProduct(${p.id})" title="Delete">✕</div>
        </div>
        <div class="stock-badge ${stockClass(p.stock)}">${stockLabel(p.stock)}</div>
        <div class="prod-banner" style="background:linear-gradient(135deg,${col}1a,${col}08)">${em}</div>
        <div class="prod-body">
            <div class="prod-category">${p.category} · ${p.size}</div>
            <div class="prod-name">${p.name}</div>
            <div class="prod-size">${p.sku}</div>
            <div class="prod-footer">
                <div class="prod-price">$${p.price}</div>
                <div class="prod-rating"><span class="stars">★</span> ${p.rating}</div>
            </div>
        </div>
    </div>`;
  }).join('');
}

    // ── TABLE ──
    function renderTable(data) {
  const tbody = document.getElementById('tableBody');
    if (!data.length) {tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:48px;color:var(--text3)">No products found</td></tr>`; return; }
  tbody.innerHTML = data.map(p=>{
    const col = CAT_COLORS[p.category]||'#c8854a';
    const em = EMOJIS[p.category]||'🧴';
    const sel = selectedIds.has(p.id);
    return `
    <tr onclick="openDrawer(${p.id})">
        <td onclick="event.stopPropagation()">
            <input type="checkbox" ${sel ? 'checked' : ''} onchange="toggleSelect(${p.id})" style="accent-color:var(--accent);cursor:pointer;width:15px;height:15px;">
        </td>
        <td>
            <div class="prod-identity">
                <div class="prod-thumb" style="background:linear-gradient(135deg,${col}22,${col}0a)">${em}</div>
                <div>
                    <div class="pid-name">${p.name}</div>
                    <div class="pid-sku">${p.sku}</div>
                </div>
            </div>
        </td>
        <td style="color:var(--text2)">${p.category}</td>
        <td><span class="price-val">$${p.price}</span></td>
        <td><span class="stock-num ${stockNumClass(p.stock)}">${p.stock}</span></td>
        <td><span class="status-pill sp-${p.status}"><span class="sp-dot"></span>${p.status}</span></td>
        <td><span style="color:var(--gold);font-size:12px">★</span> ${p.rating}</td>
        <td>
            <div class="row-actions">
                <div class="ra-btn" onclick="event.stopPropagation();openDrawer(${p.id})" title="Edit">✏</div>
                <div class="ra-btn del" onclick="event.stopPropagation();deleteProduct(${p.id})" title="Delete">✕</div>
            </div>
        </td>
    </tr>`;
  }).join('');
}

    // ── VIEW SWITCH ──
    function switchView(v) {
        currentView = v;
    const grid = document.getElementById('prodGrid');
    const table = document.getElementById('tableWrap');
    if (v==='grid') {
        grid.classList.remove('hidden'); table.classList.add('hidden');
    document.getElementById('gridViewBtn').classList.add('active');
    document.getElementById('listViewBtn').classList.remove('active');
  } else {
        grid.classList.add('hidden'); table.classList.remove('hidden');
    document.getElementById('listViewBtn').classList.add('active');
    document.getElementById('gridViewBtn').classList.remove('active');
  }
}

    // ── DRAWER ──
    function openDrawer(id) {
  const p = products.find(x=>x.id===id);
    if (!p) return;
    currentProduct = p;
    const col = CAT_COLORS[p.category]||'#c8854a';
    const em = EMOJIS[p.category]||'🧴';
    document.getElementById('drawerHero').style.background = `linear-gradient(160deg,${col}28,${col}08)`;
    document.getElementById('drawerEmoji').textContent = em;
    document.getElementById('drawerCat').textContent = `${p.category} · ${p.size} · ${p.sku}`;
    document.getElementById('drawerName').textContent = p.name;
    document.getElementById('drawerTagline').textContent = p.tagline;
    document.getElementById('drawerPrice').textContent = `$${p.price}`;
    document.getElementById('drawerMsrp').textContent = `$${Math.round(p.price * 1.15)}`;

    document.getElementById('drawerDetails').innerHTML = [
    {l:'SKU', v:p.sku}, {l:'Size', v:p.size}, {l:'Stock', v:p.stock}, {l:'Rating', v:`★ ${p.rating}`},
    {l:'Status', v:p.status.charAt(0).toUpperCase()+p.status.slice(1)}, {l:'Category', v:p.category}
  ].map(d=>`<div class="d-info-box"><div class="d-info-label">${d.l}</div><div class="d-info-val">${d.v}</div></div>`).join('');

    document.getElementById('drawerNotes').innerHTML = [
    {tag:'Top',    notes:p.top},
    {tag:'Heart',  notes:p.heart},
    {tag:'Base',   notes:p.base},
  ].map(n=>`
    <div class="notes-row">
        <div class="note-tag">${n.tag}</div>
        <div class="note-dots">${n.notes.map(note => `<span class="note-dot-item">${note}</span>`).join('')}</div>
    </div>`).join('');

    document.getElementById('editPrice').value = p.price;
    document.getElementById('editStock').value = p.stock;
    document.getElementById('editDesc').value = p.tagline;
    editStatus = p.status;
  document.querySelectorAll('#editStatusGroup .tg-btn').forEach(b=>b.classList.toggle('on', b.textContent.toLowerCase()===p.status));

    document.getElementById('drawerBackdrop').classList.add('open');
    document.getElementById('drawer').classList.add('open');
}

    function closeDrawer() {
        document.getElementById('drawerBackdrop').classList.remove('open');
    document.getElementById('drawer').classList.remove('open');
    currentProduct = null;
}

    function setEditStatus(s, el) {
        editStatus = s;
  document.querySelectorAll('#editStatusGroup .tg-btn').forEach(b=>b.classList.remove('on'));
    el.classList.add('on');
}

    function saveProduct() {
  if (!currentProduct) return;
    currentProduct.price = parseFloat(document.getElementById('editPrice').value)||currentProduct.price;
    currentProduct.stock = parseInt(document.getElementById('editStock').value)||0;
    currentProduct.tagline = document.getElementById('editDesc').value;
    currentProduct.status = editStatus;
    closeDrawer();
    applyFilters();
    showToast(`"${currentProduct.name}" saved ✦`);
}

    // ── ADD PRODUCT MODAL ──
    function openAddModal() {
        document.getElementById('modalBackdrop').classList.add('open');
}

    function closeModal(e) {
  if (e && e.target!==document.getElementById('modalBackdrop')) return;
    document.getElementById('modalBackdrop').classList.remove('open');
}

    function setModalStatus(s, el) {
        modalStatus = s;
  document.querySelectorAll('#mStatusGroup .tg-btn').forEach(b=>b.classList.remove('on'));
    el.classList.add('on');
}

    function addProduct() {
  const name = document.getElementById('mName').value.trim();
    if (!name) {document.getElementById('mName').focus(); return; }
    const newP = {
        id: Date.now(),
    name,
    sku: document.getElementById('mSku').value||`NEW-${products.length + 1}`,
    category: document.getElementById('mCat').value,
    size: document.getElementById('mSize').value,
    price: parseFloat(document.getElementById('mPrice').value)||100,
    stock: parseInt(document.getElementById('mStock').value)||0,
    status: modalStatus,
    rating: 0,
    tagline: document.getElementById('mTagline').value||'A new fragrance awaiting its story.',
    top: document.getElementById('mTopNotes').value.split(',').map(s=>s.trim()).filter(Boolean),
    heart: document.getElementById('mHeartNotes').value.split(',').map(s=>s.trim()).filter(Boolean),
    base: document.getElementById('mBaseNotes').value.split(',').map(s=>s.trim()).filter(Boolean),
  };
    products.unshift(newP);
    closeModal();
    applyFilters();
    showToast(`"${name}" added to catalogue ✦`);
  // clear form
  ['mName','mSku','mPrice','mStock','mTagline','mTopNotes','mHeartNotes','mBaseNotes'].forEach(id=>document.getElementById(id).value='');
}

    // ── DELETE ──
    function deleteProduct(id) {
  if (!id) return;
  const p = products.find(x=>x.id===id);
    if (!p || !confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
  products = products.filter(x=>x.id!==id);
    selectedIds.delete(id);
    closeDrawer();
    applyFilters();
    updateBulkBar();
    showToast(`"${p.name}" deleted`);
}

    // ── SELECTION ──
    function toggleSelect(id) {
  if (selectedIds.has(id)) selectedIds.delete(id);
    else selectedIds.add(id);
    updateBulkBar();
    applyFilters();
}

    function toggleSelectAll(cb) {
  const data = getFiltered();
  if (cb.checked) data.forEach(p=>selectedIds.add(p.id));
    else selectedIds.clear();
    updateBulkBar();
    applyFilters();
}

    function clearSelection() {
        selectedIds.clear();
    updateBulkBar();
    applyFilters();
}

    function bulkDelete() {
  if (!selectedIds.size) return;
    if (!confirm(`Delete ${selectedIds.size} products?`)) return;
  products = products.filter(p=>!selectedIds.has(p.id));
    selectedIds.clear();
    updateBulkBar();
    applyFilters();
    showToast(`${selectedIds.size || 'Selected'} products deleted`);
}

    function updateBulkBar() {
  const bar = document.getElementById('bulkBar');
    const cnt = selectedIds.size;
  bar.classList.toggle('visible', cnt>0);
    document.getElementById('bulkCount').textContent = cnt;
}

    function setSortCol(col) {
        document.getElementById('sortSel').value = col === 'price' ? 'price-desc' : col;
    applyFilters();
}

    // ── THEME ──
    let dark = false;
    function toggleTheme() {
        dark = !dark;
    document.documentElement.setAttribute('data-theme', dark?'dark':'light');
    document.getElementById('pill').classList.toggle('on', dark);
    document.getElementById('themeLabel').textContent = dark?'Light Mode':'Dark Mode';
}

    // ── TOAST ──
    function showToast(msg) {
  const t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2800);
}

// ── NAV ──
document.querySelectorAll('.nav-item').forEach(item=>{
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
});

    // ── BOOT ──
    buildCategoryChips();
    applyFilters();
