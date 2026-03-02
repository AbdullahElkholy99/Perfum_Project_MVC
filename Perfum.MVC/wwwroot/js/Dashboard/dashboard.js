
        // ─ Data ─
    const ICONS = ['🌸','🌿','🌳','🔥','💎','🌙','☀️','❄️','🍋','🌹','🌺','🍂','🧴','🪐','🌊','✨'];
    const COLORS = ['#c8854a','#d4a844','#c97a7a','#7a9e7e','#7a90be','#a87ac8','#c8a07a','#7ab8c8','#8a8a8a','#d4704a'];

    let categories = [
    {id:1, name:'Floral',     icon:'🌸', color:'#c97a7a', status:'active', slug:'floral',    desc:'Delicate floral compositions centred around rose, jasmine, and iris.',    products:42, children:[
    {id:101, name:'Rose',    icon:'🌹', color:'#d4704a', status:'active', slug:'floral/rose',    desc:'Rose-forward interpretations ranging from dewy petals to deep thorn.', products:18, children:[] },
    {id:102, name:'Jasmine', icon:'🌸', color:'#d4a844', status:'active', slug:'floral/jasmine', desc:'Heady, narcotic jasmine soliflores and blends.',                         products:12, children:[] },
    {id:103, name:'Iris',    icon:'🌺', color:'#a87ac8', status:'draft',  slug:'floral/iris',    desc:'Powdery orris root and violet-leaf compositions.',                      products:12, children:[] },
          ]},
    {id:2, name:'Oriental',   icon:'🔥', color:'#c8854a', status:'active', slug:'oriental',  desc:'Warm, resinous and deeply sensual perfumes with exotic ingredient profiles.', products:35, children:[
    {id:201, name:'Amber',   icon:'💎', color:'#c8854a', status:'active', slug:'oriental/amber', desc:'Warm amber accords with vanilla and benzoin.',  products:16, children:[] },
    {id:202, name:'Oud',     icon:'🌙', color:'#8a8a8a', status:'active', slug:'oriental/oud',   desc:'Rich Middle-Eastern oud woods and resins.',      products:11, children:[] },
    {id:203, name:'Spice',   icon:'🔥', color:'#d4704a', status:'hidden', slug:'oriental/spice', desc:'Cardamom, pepper, and cinnamon-led compositions.',products:8, children:[] },
          ]},
    {id:3, name:'Woody',      icon:'🌳', color:'#7a9e7e', status:'active', slug:'woody',     desc:'Grounded compositions built around cedars, sandalwood, vetiver and patchouli.', products:28, children:[
    {id:301, name:'Cedar',   icon:'🌲', color:'#7a9e7e', status:'active', slug:'woody/cedar',   desc:'Dry pencil-shaving cedarwood foundations.',       products:14, children:[] },
    {id:302, name:'Vetiver', icon:'🌿', color:'#8a8a8a', status:'active', slug:'woody/vetiver', desc:'Smoky, earthy vetiver grass interpretations.',     products:14, children:[] },
          ]},
    {id:4, name:'Fresh',      icon:'❄️', color:'#7a90be', status:'active', slug:'fresh',     desc:'Crisp, airy, and luminous — the lighter side of perfumery.',                 products:22, children:[
    {id:401, name:'Citrus',  icon:'🍋', color:'#d4a844', status:'active', slug:'fresh/citrus', desc:'Bergamot, lemon, neroli — bright and uplifting.',  products:10, children:[] },
    {id:402, name:'Aquatic', icon:'🌊', color:'#7a90be', status:'draft',  slug:'fresh/aquatic',desc:'Marine and ozonic accords evoking ocean air.',      products:12, children:[] },
          ]},
    {id:5, name:'Fougère',    icon:'🌿', color:'#8a7ab8', status:'hidden', slug:'fougere',   desc:'Classic masculine structures built on lavender, oakmoss and coumarin.',      products:12, children:[] },
    {id:6, name:'Gourmand',   icon:'🍂', color:'#d4a844', status:'draft',  slug:'gourmand',  desc:'Edible, sweet compositions — caramel, chocolate, praline.',                   products:9,  children:[] },
    ];

    let selectedCat = null;
    let modalVis = 'active';
    let modalIcon = '🌸';
    let modalColor = COLORS[0];
    let editVis = 'active';
    let editIcon = '🌸';
    let editColor = COLORS[0];
    let cardFilter = 'all';

    // ─ Tree ─
    function renderTree(data, filter='') {
          const el = document.getElementById('treeBody');
          el.innerHTML = data.map(c => buildNode(c, filter)).join('');
    attachDrag();
        }

    function buildNode(cat, filter='') {
          const show = !filter || cat.name.toLowerCase().includes(filter) || cat.children?.some(ch=>ch.name.toLowerCase().includes(filter));
    if (!show) return '';
          const hasKids = cat.children && cat.children.length > 0;
    const isSelected = selectedCat && selectedCat.id === cat.id;
    return `
    <div class="tree-root" data-id="${cat.id}" draggable="true" ondragstart="dragStart(event,${cat.id})" ondragover="dragOver(event)" ondragleave="dragLeave(event)" ondrop="dragDrop(event,${cat.id})">
        <div class="tree-node-row ${isSelected?'selected':''}" onclick="selectCat(${cat.id})">
            <div class="node-toggle ${hasKids?'':'leaf'}" id="tog-${cat.id}" onclick="toggleNode(event,${cat.id})">▶</div>
            <div class="node-icon">${cat.icon}</div>
            <div class="node-name">${cat.name}</div>
            <div class="node-count">${cat.products}</div>
        </div>
        ${hasKids ? `<div class="tree-children" id="ch-${cat.id}">
                ${cat.children.map(ch => buildNode(ch, filter)).join('')}
              </div>` : ''}
    </div>`;
        }

    function toggleNode(e, id) {
        e.stopPropagation();
    const ch = document.getElementById(`ch-${id}`);
    const tog = document.getElementById(`tog-${id}`);
    if (!ch) return;
    const open = ch.classList.toggle('open');
    tog.classList.toggle('open', open);
        }

    function filterTree(val) {
        renderTree(categories, val.toLowerCase());
    if (val) {
        categories.forEach(c => {
            const ch = document.getElementById(`ch-${c.id}`);
            const tog = document.getElementById(`tog-${c.id}`);
            if (ch) { ch.classList.add('open'); if (tog) tog.classList.add('open'); }
        });
          }
        }

    function selectCat(id) {
          const cat = findCat(id);
    if (!cat) return;
    selectedCat = cat;
    renderTree(categories);
    openDetail(cat);
          // highlight card
          document.querySelectorAll('.cat-card').forEach(c => c.classList.toggle('selected-card', parseInt(c.dataset.id)===id));
        }

    function findCat(id, list=categories) {
          for (const c of list) {
            if (c.id === id) return c;
    if (c.children) { const f = findCat(id, c.children); if (f) return f; }
          }
    return null;
        }

    function findParentName(id, list=categories, parent=null) {
          for (const c of list) {
            if (c.id === id) return parent;
    if (c.children) { const f = findParentName(id, c.children, c.name); if (f) return f; }
          }
    return null;
        }

    // ─ Cards ─
    function renderCards(filter='all') {
          const grid = document.getElementById('catGrid');
          const all = categories.flatMap(c => [c, ...(c.children||[])]);
          const filtered = filter === 'all' ? categories : categories.filter(c=>c.status===filter);
    if (!filtered.length) {
        grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🗂</div><div class="empty-label">No categories here</div><div class="empty-sub">Adjust the filter or create a new category</div></div>`;
    return;
          }
          grid.innerHTML = filtered.map((cat,i) => `
    <div class="cat-card" data-id="${cat.id}" onclick="selectCat(${cat.id})" style="animation:fadeUp .4s ease-out ${i*.06}s both">
        <div class="cat-card-actions">
            <div class="cc-btn" onclick="event.stopPropagation();selectCat(${cat.id})" title="Edit">✏</div>
            <div class="cc-btn del" onclick="event.stopPropagation();confirmDeleteById(${cat.id})" title="Delete">✕</div>
        </div>
        <div class="cat-card-banner" style="background:linear-gradient(135deg,${cat.color}22,${cat.color}08)">${cat.icon}</div>
        <div class="cat-card-body">
            <div class="cat-card-name">${cat.name}</div>
            <div class="cat-card-sub">${cat.slug}</div>
            <div class="cat-card-meta">
                <div class="cat-card-count">📦 ${cat.products} products</div>
                <div class="cat-card-status"><div class="status-dot ${cat.status}"></div>${cat.status}</div>
            </div>
        </div>
    </div>`).join('');
        }

    function filterCards(f, el) {
        cardFilter = f;
          document.querySelectorAll('#gridFilters .tg-btn').forEach(b=>b.classList.remove('on'));
    el.classList.add('on');
    renderCards(f);
        }

    // ─ Detail Panel ─
    function openDetail(cat) {
          const panel = document.getElementById('detailPanel');
    panel.classList.remove('collapsed');
    document.getElementById('detailTitle').textContent = cat.name;
    const parent = findParentName(cat.id);
    document.getElementById('detailPath').textContent = parent ? `Root › ${parent} › ${cat.name}` : `Root › ${cat.name}`;
    const iconEl = document.getElementById('detailIcon');
    iconEl.textContent = cat.icon;
    iconEl.style.background = `linear-gradient(135deg,${cat.color}33,${cat.color}11)`;
    document.getElementById('editName').value = cat.name;
    document.getElementById('editSlug').value = cat.slug;
    document.getElementById('editDesc').value = cat.desc;
    editVis = cat.status; editIcon = cat.icon; editColor = cat.color;
          // Vis
          document.querySelectorAll('#visToggle .tg-btn').forEach(b=>b.classList.toggle('on', b.textContent.toLowerCase()===cat.status));
          // Colors
          renderColorSwatches('colorSwatches', editColor, (c)=>{editColor = c; });
          // Icons
          renderIconPicker('iconPicker', editIcon, (ic)=>{editIcon = ic; });
    // Sub-cats
    const subs = cat.children || [];
    document.getElementById('subCount').textContent = `(${subs.length})`;
          document.getElementById('subCatList').innerHTML = subs.length ? subs.map(s=>`
    <div class="sub-item" onclick="event.stopPropagation();selectCat(${s.id})">
        <div class="sub-item-left">
            <span class="sub-item-icon">${s.icon}</span>
            <span class="sub-name">${s.name}</span>
        </div>
        <span class="sub-count">${s.products} products</span>
    </div>`).join('') : `<div style="font-size:12px;color:var(--text3);padding:12px 0">No sub-categories yet</div>`;
    panel.scrollIntoView({behavior:'smooth',block:'nearest'});
        }

    function closeDetail() {
        document.getElementById('detailPanel').classList.add('collapsed');
    selectedCat = null;
          document.querySelectorAll('.cat-card').forEach(c=>c.classList.remove('selected-card'));
    renderTree(categories);
        }

    function setVis(v, el) {
        editVis = v;
          document.querySelectorAll('#visToggle .tg-btn').forEach(b=>b.classList.remove('on'));
    el.classList.add('on');
        }

    function saveCategory() {
          if (!selectedCat) return;
    selectedCat.name = document.getElementById('editName').value;
    selectedCat.slug = document.getElementById('editSlug').value;
    selectedCat.desc = document.getElementById('editDesc').value;
    selectedCat.status = editVis;
    selectedCat.icon = editIcon;
    selectedCat.color = editColor;
    renderTree(categories);
    renderCards(cardFilter);
    openDetail(selectedCat);
    showToast('Category saved ✦');
        }

    function confirmDelete() { if(selectedCat) confirmDeleteById(selectedCat.id); }

    function confirmDeleteById(id) {
          if (confirm('Delete this category? This cannot be undone.')) {
        categories = categories.filter(c => c.id !== id);
            categories.forEach(c=>{ if(c.children) c.children=c.children.filter(ch=>ch.id!==id); });
    closeDetail();
    renderTree(categories);
    renderCards(cardFilter);
    showToast('Category deleted');
          }
        }

    // ─ Icon / Color pickers ─
    function renderIconPicker(containerId, selected, cb) {
          const el = document.getElementById(containerId);
          el.innerHTML = ICONS.map(ic=>`
    <div class="icon-opt ${ic===selected?'selected':''}" onclick="iconPick(event,'${containerId}','${ic}')">${ic}</div>`).join('');
    el._cb = cb;
        }

    function iconPick(e, cid, ic) {
        e.stopPropagation();
    document.querySelectorAll(`#${cid} .icon-opt`).forEach(o=>o.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
    const cb = document.getElementById(cid)._cb;
    if (cb) cb(ic);
    if (cid==='iconPicker') {editIcon = ic; document.getElementById('detailIcon').textContent=ic; }
    if (cid==='modalIconPicker') modalIcon=ic;
        }

    function renderColorSwatches(containerId, selected, cb) {
          const el = document.getElementById(containerId);
          el.innerHTML = COLORS.map(c=>`
    <div class="swatch ${c===selected?'selected':''}" style="background:${c}" onclick="colorPick(event,'${containerId}','${c}')"></div>`).join('');
    el._cb = cb;
        }

    function colorPick(e, cid, col) {
        e.stopPropagation();
    document.querySelectorAll(`#${cid} .swatch`).forEach(s=>s.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
    const cb = document.getElementById(cid)._cb;
    if (cb) cb(col);
    if (cid==='colorSwatches') {editColor = col; }
    if (cid==='modalColorPicker') modalColor=col;
        }

    // ─ Modal ─
    function openModal(isRoot=false) {
        document.getElementById('modalTitle').textContent = isRoot ? 'New Category' : 'New Sub-category';
    const sel = document.getElementById('modalParent');
    sel.innerHTML = '<option value="">— Root category —</option>' + categories.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
          renderIconPicker('modalIconPicker', modalIcon, (ic)=>modalIcon=ic);
          renderColorSwatches('modalColorPicker', modalColor, (c)=>modalColor=c);
    if (!isRoot && selectedCat) sel.value = selectedCat.id;
    document.getElementById('modalBackdrop').classList.add('open');
        }

    function closeModal(e) {
          if (e && e.target !== document.getElementById('modalBackdrop')) return;
    document.getElementById('modalBackdrop').classList.remove('open');
    document.getElementById('modalName').value = '';
        }

    function setModalVis(v, el) {
        modalVis = v;
          document.querySelectorAll('#modalVisToggle .tg-btn').forEach(b=>b.classList.remove('on'));
    el.classList.add('on');
        }

    function createCategory() {
          const name = document.getElementById('modalName').value.trim();
    if (!name) {document.getElementById('modalName').focus(); return; }
    const parentId = parseInt(document.getElementById('modalParent').value) || null;
    const newCat = {
        id: Date.now(), name, icon: modalIcon, color: modalColor,
    status: modalVis, slug: (parentId ? findCat(parentId)?.slug+'/' : '') + name.toLowerCase().replace(/\s+/g,'-'),
    desc: '', products: 0, children: []
          };
    if (parentId) {
            const parent = findCat(parentId);
    if (parent) parent.children.push(newCat);
          } else {
        categories.push(newCat);
          }
    closeModal();
    renderTree(categories);
    renderCards(cardFilter);
    showToast(`"${name}" created ✦`);
        }

    // ─ Drag & Drop ─
    let dragId = null;
    function dragStart(e, id) {dragId = id; e.dataTransfer.effectAllowed='move'; }
    function dragOver(e) {e.preventDefault(); e.currentTarget.classList.add('drag-over'); }
    function dragLeave(e) {e.currentTarget.classList.remove('drag-over'); }
    function dragDrop(e, targetId) {
        e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    if (dragId === targetId) return;
    showToast('Order updated');
    dragId = null;
        }
    function attachDrag() {
        document.querySelectorAll('[draggable]').forEach(el => {
            el.addEventListener('dragstart', e => dragStart(e, parseInt(el.dataset.id)));
            el.addEventListener('dragover', dragOver);
            el.addEventListener('dragleave', dragLeave);
            el.addEventListener('drop', e => dragDrop(e, parseInt(el.dataset.id)));
        });
        }

    // ─ Theme ─
    let dark = false;
    function toggleTheme() {
        dark = !dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    document.getElementById('pill').classList.toggle('on', dark);
    document.getElementById('themeLabel').textContent = dark ? 'Light Mode' : 'Dark Mode';
        }

    // ─ Toast ─
    function showToast(msg) {
          const t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    t.classList.add('show');
          setTimeout(()=>t.classList.remove('show'), 2800);
        }

        // ─ Nav ─
        document.querySelectorAll('.nav-item').forEach(item=>{
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
        });

    // ─ Init ─
    renderTree(categories);
    renderCards('all');
        renderColorSwatches('colorSwatches', editColor, c=>editColor=c);
        renderIconPicker('iconPicker', editIcon, ic=>editIcon=ic);
