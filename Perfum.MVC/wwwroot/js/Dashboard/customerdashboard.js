// ── DATA ──
    const TIER_COLORS = {vip:'#d4a844',loyal:'#c8854a',new:'#7a9e7e',lapsed:'#c97a7a'};
    const SCENT_COLORS = {"Nuit d'Ambre":'#c8854a','Rose Sauvage':'#c97a7a','Bois Sacré':'#7a9e7e','Oud Mystère':'#5a8fc8','Iris Blanc':'#c8b8a0','Sakura Lumière':'#d47ab8','Citrus Élite':'#d4a844','Encens Royal':'#8a6845'};
    const AV_COLORS = ['#c8854a','#9b7ec8','#d97ba0','#5a8fc8','#7ab87a','#d4943a','#e87a7a','#c870a0','#7ab8c8','#8a7ab8','#d4704a','#7a90be'];
    const FLAGS = {Egypt:'🇪🇬',UAE:'🇦🇪','Saudi Arabia':'🇸🇦',France:'🇫🇷',UK:'🇬🇧',USA:'🇺🇸',Germany:'🇩🇪',Japan:'🇯🇵',Norway:'🇳🇴',Nigeria:'🇳🇬',India:'🇮🇳',Mexico:'🇲🇽',Sweden:'🇸🇪',China:'🇨🇳'};

    let customers = [
    {id:1,name:'Sofia Larsson',email:'sofia.l@email.com',phone:'+46 70 123 4567',city:'Stockholm',country:'Sweden',tier:'vip',spend:4820,orders:22,scent:'Rose Sauvage',lastOrder:'12 Feb 2026',joined:'Mar 2022',notes:'Prefers heavy oriental notes. Loves exclusive launches.',tags:['VIP','Early Access','Newsletter'],color:AV_COLORS[0],activity:[{type:'order',text:'Ordered Rose Sauvage × 2',time:'12 Feb 2026',icon:'📦'},{type:'review',text:'Left 5★ review on Rose Sauvage',time:'14 Feb 2026',icon:'⭐'},{type:'email',text:'Opened Spring 2026 campaign',time:'01 Mar 2026',icon:'✉'}]},
    {id:2,name:'James Okafor',email:'j.okafor@email.com',phone:'+234 80 234 5678',city:'Lagos',country:'Nigeria',tier:'loyal',spend:1940,orders:9,scent:"Nuit d'Ambre",lastOrder:'28 Feb 2026',joined:'Jul 2023',notes:'Very loyal. Usually orders around gift seasons.',tags:['Loyal','Gift Buyer'],color:AV_COLORS[1],activity:[{type:'order',text:"Ordered Nuit d'Ambre",time:'28 Feb 2026',icon:'📦'},{type:'email',text:'Clicked Valentine offer',time:'10 Feb 2026',icon:'✉'}]},
    {id:3,name:'Mei Lin',email:'meilin@studio.cn',phone:'+86 138 0013 8000',city:'Shanghai',country:'China',tier:'vip',spend:6240,orders:31,scent:'Bois Sacré',lastOrder:'01 Mar 2026',joined:'Jan 2021',notes:'High-value. Interested in bespoke commissions.',tags:['VIP','Bespoke','Newsletter'],color:AV_COLORS[2],activity:[{type:'vip',text:'Upgraded to VIP tier',time:'Jan 2023',icon:'💎'},{type:'order',text:'Ordered Bois Sacré × 3',time:'01 Mar 2026',icon:'📦'},{type:'note',text:'Requested private atelier visit',time:'20 Feb 2026',icon:'📝'}]},
    {id:4,name:'Amir Khalil',email:'amirkh@proton.me',phone:'+971 50 123 4567',city:'Dubai',country:'UAE',tier:'vip',spend:9100,orders:45,scent:'Oud Mystère',lastOrder:'27 Feb 2026',joined:'Oct 2020',notes:'Collects limited editions. Refer to concierge tier.',tags:['VIP','Collector','Limited'],color:AV_COLORS[3],activity:[{type:'order',text:'Ordered Oud Mystère Limited',time:'27 Feb 2026',icon:'📦'},{type:'vip',text:'Concierge tier unlocked',time:'Dec 2024',icon:'💎'},{type:'review',text:'Left 5★ on Séduction Rare',time:'Feb 2026',icon:'⭐'}]},
    {id:5,name:'Elena Vogt',email:'elena.vogt@email.de',phone:'+49 176 1234 5678',city:'Berlin',country:'Germany',tier:'new',spend:165,orders:1,scent:'Iris Blanc',lastOrder:'25 Feb 2026',joined:'Feb 2026',notes:'First purchase. Follow up recommended.',tags:['New'],color:AV_COLORS[4],activity:[{type:'order',text:'First order: Iris Blanc',time:'25 Feb 2026',icon:'📦'},{type:'email',text:'Welcome email sent',time:'25 Feb 2026',icon:'✉'}]},
    {id:6,name:'Laila Nasser',email:'laila.n@email.ae',phone:'+20 10 9876 5432',city:'Cairo',country:'Egypt',tier:'loyal',spend:2380,orders:12,scent:'Rose Sauvage',lastOrder:'14 Feb 2026',joined:'May 2023',notes:'Enjoys romantic, floral compositions.',tags:['Loyal','Floral Lover'],color:AV_COLORS[5],activity:[{type:'order',text:'Ordered Rose Sauvage × 2',time:'14 Feb 2026',icon:'📦'},{type:'email',text:'Engaged with Valentine campaign',time:'10 Feb 2026',icon:'✉'}]},
    {id:7,name:'Tom Whitfield',email:'tomw@inbox.co.uk',phone:'+44 7700 900000',city:'London',country:'UK',tier:'lapsed',spend:540,orders:3,scent:"Nuit d'Ambre",lastOrder:'Sep 2025',joined:'Nov 2022',notes:'Has not ordered in 6+ months. Re-engagement candidate.',tags:['Lapsed','Re-engage'],color:AV_COLORS[6],activity:[{type:'order',text:"Ordered Nuit d'Ambre",time:'Sep 2025',icon:'📦'},{type:'email',text:'Re-engagement email opened',time:'Jan 2026',icon:'✉'}]},
    {id:8,name:'Priya Menon',email:'priya.m@mailbox.in',phone:'+91 98765 43210',city:'Mumbai',country:'India',tier:'loyal',spend:1760,orders:8,scent:'Sakura Lumière',lastOrder:'20 Feb 2026',joined:'Sep 2022',notes:'Enjoys fresh florals. Interested in seasonal launches.',tags:['Loyal','Newsletter'],color:AV_COLORS[7],activity:[{type:'order',text:'Ordered Sakura Lumière',time:'20 Feb 2026',icon:'📦'},{type:'review',text:'Left 4★ review',time:'22 Feb 2026',icon:'⭐'}]},
    {id:9,name:'Carlos Reyes',email:'creyes@correo.mx',phone:'+52 55 1234 5678',city:'CDMX',country:'Mexico',tier:'new',spend:340,orders:2,scent:'Bois Sacré',lastOrder:'22 Feb 2026',joined:'Jan 2026',notes:'Recently joined. Purchased gifting set.',tags:['New','Gift Buyer'],color:AV_COLORS[8],activity:[{type:'order',text:'Ordered Bois Sacré Gift Set',time:'22 Feb 2026',icon:'📦'}]},
    {id:10,name:'Ingrid Holm',email:'ingrid.h@nett.no',phone:'+47 900 12345',city:'Oslo',country:'Norway',tier:'vip',spend:5500,orders:26,scent:'Oud Mystère',lastOrder:'18 Feb 2026',joined:'Apr 2021',notes:'Loyal VIP. Attends brand events when in Paris.',tags:['VIP','Events','Newsletter'],color:AV_COLORS[9],activity:[{type:'vip',text:'Attended Paris event',time:'Oct 2025',icon:'💎'},{type:'order',text:'Ordered Oud Mystère',time:'18 Feb 2026',icon:'📦'}]},
    {id:11,name:'Yuki Tanaka',email:'yuki.t@mail.jp',phone:'+81 90 1234 5678',city:'Tokyo',country:'Japan',tier:'loyal',spend:2100,orders:11,scent:'Sakura Lumière',lastOrder:'10 Feb 2026',joined:'Jun 2022',notes:'Appreciates the Japanese market line.',tags:['Loyal','Japan Line'],color:AV_COLORS[10],activity:[{type:'order',text:'Ordered Sakura Lumière × 2',time:'10 Feb 2026',icon:'📦'},{type:'review',text:'Left 5★ review',time:'12 Feb 2026',icon:'⭐'}]},
    {id:12,name:'Marcus Bell',email:'mbell@fastmail.com',phone:'+1 212 555 0100',city:'New York',country:'USA',tier:'lapsed',spend:890,orders:5,scent:'Citrus Élite',lastOrder:'Jun 2025',joined:'Dec 2021',notes:'Went dormant. Last opened newsletter 3 months ago.',tags:['Lapsed'],color:AV_COLORS[11],activity:[{type:'order',text:'Ordered Citrus Élite',time:'Jun 2025',icon:'📦'},{type:'email',text:'Re-engagement email sent',time:'Dec 2025',icon:'✉'}]},
    ];

    let currentView='grid', tierFilter='all', selectedIds=new Set(), currentCustomer=null, modalMode='add', modalTier='new', editingId=null;
    let dark=false;

    function initials(n){return n.split(' ').map(w=>w[0]).join('').slice(0,2);}

    // ── STATS ──
    function updateStats(){
        document.getElementById('stTotal').textContent = customers.length;
  document.getElementById('stVip').textContent=customers.filter(c=>c.tier==='vip').length;
  document.getElementById('stLtv').textContent='$'+Math.round(customers.reduce((s,c)=>s+c.spend,0)/customers.length);
  document.getElementById('stLapsed').textContent=customers.filter(c=>c.tier==='lapsed').length;
    document.getElementById('pageSubtitle').textContent=`${customers.length} registered customers · CRM`;
}

    // ── SEGMENTS ──
    function renderSegments(){
  const segs=[
    {key:'vip',icon:'💎',name:'VIP',color:TIER_COLORS.vip,pct:35},
    {key:'loyal',icon:'🔁',name:'Loyal',color:TIER_COLORS.loyal,pct:45},
    {key:'new',icon:'🌱',name:'New',color:TIER_COLORS.new,pct:15},
    {key:'lapsed',icon:'💤',name:'Lapsed',color:TIER_COLORS.lapsed,pct:5},
    ];
  document.getElementById('segmentsRow').innerHTML=segs.map((s,i)=>{
    const count=customers.filter(c=>c.tier===s.key).length;
    const pctClass=s.key==='vip'?'tier-vip':s.key==='loyal'?'tier-loyal':s.key==='new'?'tier-new':'tier-lapsed';
    return `<div class="seg-card ${tierFilter===s.key?'selected':''}" style="animation-delay:${i*.05}s;--c:${s.color}" onclick="setSegment('${s.key}',this)">
        <div class="seg-top">
            <span class="seg-icon">${s.icon}</span>
            <span class="seg-pct tier-badge ${pctClass}" style="position:static">${s.pct}%</span>
        </div>
        <div class="seg-name">${s.name}</div>
        <div class="seg-count">${count} customers</div>
        <div class="seg-bar"><div class="seg-fill" style="width:${s.pct}%;background:${s.color}"></div></div>
    </div>`;
  }).join('');
}

    function setSegment(t,el){
  if(tierFilter===t){tierFilter = 'all';document.querySelectorAll('.seg-card').forEach(c=>c.classList.remove('selected'));}
    else{tierFilter = t;document.querySelectorAll('.seg-card').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');}
    buildTierChips();applyFilters();
}

    // ── TIER CHIPS ──
    function buildTierChips(){
  const tiers=['all','vip','loyal','new','lapsed'];
  document.getElementById('tierChips').innerHTML=tiers.map(t=>`
    <div class="fchip ${t===tierFilter?'on':''}" onclick="setTierFilter('${t}',this)">${t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}</div>`).join('');
}
    function setTierFilter(t,el){
        tierFilter = t;
  document.querySelectorAll('#tierChips .fchip').forEach(c=>c.classList.remove('on'));
    el.classList.add('on');
  document.querySelectorAll('.seg-card').forEach(c=>{c.classList.toggle('selected', c.getAttribute('onclick')?.includes("'" + t + "'"));});
    applyFilters();
}

    // ── FILTER / SORT ──
    function getFiltered(){
  const q=document.getElementById('searchInput').value.toLowerCase().trim();
    const sort=document.getElementById('sortSel').value;
  let data=customers.filter(c=>{
    const mt=tierFilter==='all'||c.tier===tierFilter;
    const mq=!q||c.name.toLowerCase().includes(q)||c.email.toLowerCase().includes(q)||c.city.toLowerCase().includes(q)||c.scent.toLowerCase().includes(q)||c.country.toLowerCase().includes(q);
    return mt&&mq;
  });
  if(sort==='name') data.sort((a,b)=>a.name.localeCompare(b.name));
  else if(sort==='spend-desc') data.sort((a,b)=>b.spend-a.spend);
  else if(sort==='spend-asc') data.sort((a,b)=>a.spend-b.spend);
  else if(sort==='orders') data.sort((a,b)=>b.orders-a.orders);
    return data;
}

    function applyFilters(){const d=getFiltered();renderGrid(d);renderTable(d);document.getElementById('pageInfo').textContent=`${d.length} customer${d.length !== 1 ? 's' : ''}`;}

    // ── GRID ──
    function renderGrid(data){
  const el=document.getElementById('custGrid');
    if(!data.length){el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:64px;color:var(--text3)"><div style="font-size:40px;margin-bottom:12px;opacity:.4">👥</div><div style="font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--text2);margin-bottom:6px">No customers found</div><div style="font-size:12px">Try a different search or filter</div></div>`;return;}
  el.innerHTML=data.map((c,i)=>{
    const tc=TIER_COLORS[c.tier]||'#c8854a';
    const sc=SCENT_COLORS[c.scent]||'#c8854a';
    const sel=selectedIds.has(c.id);
    return `<div class="cust-card ${sel?'selected-card':''}" style="animation-delay:${i*.05}s" onclick="openProfile(${c.id})">
        <div class="card-header-strip" style="background:linear-gradient(to right,${tc},${tc}88)"></div>
        <div class="card-actions-hover">
            <div class="ca-btn" onclick="event.stopPropagation();toggleSel(${c.id})">${sel ? '☑' : '☐'}</div>
            <div class="ca-btn" onclick="event.stopPropagation();openProfile(${c.id})">👁</div>
            <div class="ca-btn" onclick="event.stopPropagation();openEditModalFor(${c.id})">✏</div>
            <div class="ca-btn del" onclick="event.stopPropagation();deleteCustomer(${c.id})">✕</div>
        </div>
        <div class="card-top">
            <div class="card-av" style="background:linear-gradient(135deg,${c.color},${c.color}99)">${initials(c.name)}</div>
            <div class="card-info">
                <div class="card-name">${c.name}</div>
                <div class="card-email">${c.email}</div>
                <div class="card-tier"><span class="tier-badge tier-${c.tier}" style="position:static"><span class="tier-dot"></span>${c.tier.charAt(0).toUpperCase() + c.tier.slice(1)}</span></div>
            </div>
        </div>
        <div class="card-divider"></div>
        <div class="card-stats">
            <div class="cs-item"><div class="cs-val">$${(c.spend / 1000).toFixed(1)}k</div><div class="cs-label">Spent</div></div>
            <div class="cs-item"><div class="cs-val">${c.orders}</div><div class="cs-label">Orders</div></div>
            <div class="cs-item"><div class="cs-val">${Math.round(c.spend / c.orders)}</div><div class="cs-label">AOV</div></div>
        </div>
        <div class="card-footer">
            <div class="card-scent"><div class="scent-dot" style="background:${sc}"></div>${c.scent}</div>
            <div class="card-last">${FLAGS[c.country] || ''} ${c.city}</div>
        </div>
    </div>`;
  }).join('');
}

    // ── TABLE ──
    function renderTable(data){
  const tbody=document.getElementById('tableBody');
    if(!data.length){tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:48px;color:var(--text3)">No customers found</td></tr>`;return;}
  tbody.innerHTML=data.map(c=>{
    const sel=selectedIds.has(c.id);
    const sc=SCENT_COLORS[c.scent]||'#c8854a';
    return `<tr class="${sel?'selected-row':''}" onclick="openProfile(${c.id})">
        <td onclick="event.stopPropagation()"><input type="checkbox" ${sel ? 'checked' : ''} onchange="toggleSel(${c.id})" style="accent-color:var(--accent);cursor:pointer;width:15px;height:15px;"></td>
        <td><div class="tbl-identity">
            <div class="tbl-av" style="background:linear-gradient(135deg,${c.color},${c.color}99)">${initials(c.name)}</div>
            <div><div class="tbl-name">${c.name}</div><div class="tbl-email">${c.email}</div></div>
        </div></td>
        <td><span class="tier-badge tier-${c.tier}"><span class="tier-dot"></span>${c.tier.charAt(0).toUpperCase() + c.tier.slice(1)}</span></td>
        <td><span class="spend-val">$${c.spend.toLocaleString()}</span></td>
        <td style="font-size:13px;color:var(--text2)">${c.orders}</td>
        <td><div class="scent-cell"><div class="scent-dot" style="background:${sc};width:7px;height:7px;border-radius:2px"></div>${c.scent}</div></td>
        <td style="font-size:12px;color:var(--text3)">${FLAGS[c.country] || ''} ${c.city}</td>
        <td style="font-size:12px;color:var(--text3)">${c.lastOrder}</td>
        <td><div class="row-actions">
            <div class="ra-btn" onclick="event.stopPropagation();openProfile(${c.id})">👁</div>
            <div class="ra-btn" onclick="event.stopPropagation();openEditModalFor(${c.id})">✏</div>
            <div class="ra-btn del" onclick="event.stopPropagation();deleteCustomer(${c.id})">✕</div>
        </div></td>
    </tr>`;
  }).join('');
}

    // ── VIEW SWITCH ──
    function switchView(v){
        currentView = v;
    document.getElementById('custGrid').classList.toggle('hidden',v!=='grid');
    document.getElementById('tableWrap').classList.toggle('hidden',v!=='list');
    document.getElementById('gridBtn').classList.toggle('on',v==='grid');
    document.getElementById('listBtn').classList.toggle('on',v==='list');
}

    // ── PROFILE ──
    function openProfile(id){
  const c=customers.find(x=>x.id===id);
    if(!c)return;
    currentCustomer=c;
    // Avatar + hero
    document.getElementById('phAv').style.background=`linear-gradient(135deg,${c.color},${c.color}99)`;
    document.getElementById('phAv').textContent=initials(c.name);
    document.getElementById('phName').textContent=c.name;
    document.getElementById('phMeta').innerHTML=`
    <div class="ph-meta-item">${FLAGS[c.country] || ''} ${c.city}, ${c.country}</div>
    <div class="ph-meta-item">✉ ${c.email}</div>
    <div class="ph-meta-item">📞 ${c.phone}</div>
    <div class="ph-meta-item">🗓 Since ${c.joined}</div>
    <span class="tier-badge tier-${c.tier}" style="position:static"><span class="tier-dot"></span>${c.tier.charAt(0).toUpperCase() + c.tier.slice(1)}</span>`;
  document.getElementById('phTags').innerHTML=c.tags.map(t=>`
    <span class="tag">${t}<span class="tag-remove" onclick="removeTag(${c.id},'${t}')">✕</span></span>`).join('')+
    `<span class="tag" style="cursor:pointer;color:var(--accent);border-color:var(--accent)" onclick="addTagPrompt(${c.id})">+ Tag</span>`;
    document.getElementById('phKpis').innerHTML=[
    {v:'$'+c.spend.toLocaleString(),l:'Total Spend'},{v:c.orders,l:'Orders'},{v:'$'+Math.round(c.spend/c.orders),l:'Avg. Order'},{v:'4.8★',l:'Satisfaction'}
  ].map(k=>`<div class="ph-kpi"><div class="ph-kpi-val">${k.v}</div><div class="ph-kpi-label">${k.l}</div></div>`).join('');

    // Left column
    const scentBars=[
    {name:c.scent,pct:62,color:SCENT_COLORS[c.scent]||'#c8854a'},
    {name:'Rose Sauvage',pct:20,color:'#c97a7a'},
    {name:'Bois Sacré',pct:12,color:'#7a9e7e'},
    {name:'Other',pct:6,color:'#a08060'},
  ].filter(b=>b.name!==c.scent||b.pct===62);

    const ltvPct=Math.min(100,Math.round(c.spend/10000*100));

    document.getElementById('profLeft').innerHTML=`
    <div class="prof-card">
        <div class="prof-card-title">Contact Information <span class="prof-card-action" onclick="openEditModalFor(${c.id})">Edit →</span></div>
        <div class="info-grid">
            <div class="info-cell"><div class="info-label">Full Name</div><div class="info-val">${c.name}</div></div>
            <div class="info-cell"><div class="info-label">Email</div><div class="info-val">${c.email}</div></div>
            <div class="info-cell"><div class="info-label">Phone</div><div class="info-val">${c.phone}</div></div>
            <div class="info-cell"><div class="info-label">City</div><div class="info-val">${c.city}, ${c.country}</div></div>
            <div class="info-cell"><div class="info-label">Customer Since</div><div class="info-val">${c.joined}</div></div>
            <div class="info-cell"><div class="info-label">Last Order</div><div class="info-val">${c.lastOrder}</div></div>
        </div>
    </div>

    <div class="prof-card">
        <div class="prof-card-title">Loyalty Progress</div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px">
            <div style="font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--accent)">$${c.spend.toLocaleString()}</div>
            <div style="font-size:11px;color:var(--text3)">of $10,000 Elite tier</div>
        </div>
        <div class="loyalty-track"><div class="loyalty-fill" style="width:${ltvPct}%;background:linear-gradient(to right,var(--accent2),var(--accent))"></div></div>
        <div class="loyalty-milestones">
            <div class="lm-item">New<br>$0</div>
            <div class="lm-item">Loyal<br>$1k</div>
            <div class="lm-item">VIP<br>$3k</div>
            <div class="lm-item">Elite<br>$10k</div>
        </div>
    </div>

    <div class="prof-card">
        <div class="prof-card-title">Order History <span class="prof-card-action">View All →</span></div>
        ${[
            { id: '#5241', item: c.scent, total: c.spend > 500 ? 520 : 210, status: 'delivered', date: c.lastOrder },
            { id: '#5198', item: 'Rose Sauvage', total: 185, status: 'delivered', date: '15 Jan 2026' },
            { id: '#5134', item: 'Bois Sacré', total: 340, status: 'delivered', date: '02 Dec 2025' },
        ].map(o => `<div class="order-row">
        <div><div class="order-id-small">${o.id}</div><div class="order-items-small">${o.item}</div></div>
        <span class="order-badge ob-${o.status}">${o.status}</span>
        <div class="order-total-small">$${o.total}</div>
      </div>`).join('')}
    </div>

    <div class="prof-card">
        <div class="prof-card-title">Activity Timeline</div>
        <div class="timeline">
            ${c.activity.map(a => `<div class="tl-item">
          <div class="tl-dot ${a.type}">${a.icon}</div>
          <div class="tl-content">
            <div class="tl-title">${a.text}</div>
            <div class="tl-time">${a.time}</div>
          </div>
        </div>`).join('')}
        </div>
    </div>

    <div class="prof-card">
        <div class="prof-card-title">Internal Notes</div>
        <textarea class="note-input" rows="3" id="profileNote" style="width:100%;margin-bottom:10px">${c.notes}</textarea>
        <button class="btn btn-ghost btn-sm" onclick="saveNote(${c.id})">Save Note</button>
    </div>`;

    // Right column
    document.getElementById('profRight').innerHTML=`
    <div class="stat-mini-card">
        <div class="smc-title">Spending Summary</div>
        <div class="smc-row"><span class="smc-label">Total Spend</span><span class="smc-val accent">$${c.spend.toLocaleString()}</span></div>
        <div class="smc-row"><span class="smc-label">Orders Placed</span><span class="smc-val">${c.orders}</span></div>
        <div class="smc-row"><span class="smc-label">Avg. Order Value</span><span class="smc-val">$${Math.round(c.spend / c.orders)}</span></div>
        <div class="smc-row"><span class="smc-label">Last Purchase</span><span class="smc-val">${c.lastOrder}</span></div>
        <div class="smc-row"><span class="smc-label">Customer Tier</span><span class="smc-val">${c.tier.charAt(0).toUpperCase() + c.tier.slice(1)}</span></div>
    </div>

    <div class="stat-mini-card">
        <div class="smc-title">Preferred Scents</div>
        <div class="scent-bars">
            ${[
                { name: c.scent, pct: 62 }, { name: 'Rose Sauvage', pct: 22 }, { name: 'Bois Sacré', pct: 10 }, { name: 'Other', pct: 6 }
            ].map(b => `<div class="scent-bar-row">
          <div class="sb-label">${b.name}</div>
          <div class="sb-track"><div class="sb-fill" style="width:${b.pct}%;background:${SCENT_COLORS[b.name] || 'var(--accent)'}"></div></div>
          <div class="sb-pct">${b.pct}%</div>
        </div>`).join('')}
        </div>
    </div>

    <div class="stat-mini-card">
        <div class="smc-title">Communication</div>
        <div class="smc-row"><span class="smc-label">Newsletter</span><span class="smc-val" style="color:var(--green)">Subscribed</span></div>
        <div class="smc-row"><span class="smc-label">SMS</span><span class="smc-val" style="color:var(--rose)">Opted out</span></div>
        <div class="smc-row"><span class="smc-label">Email Opens</span><span class="smc-val">68%</span></div>
        <div class="smc-row"><span class="smc-label">Click Rate</span><span class="smc-val">24%</span></div>
        <div class="smc-row"><span class="smc-label">Language</span><span class="smc-val">English</span></div>
    </div>

    <div class="stat-mini-card">
        <div class="smc-title">Quick Actions</div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:4px">
            <button class="btn btn-ghost btn-sm" style="justify-content:center;width:100%" onclick="showToast('Email sent to ${c.name}')">✉ Send Email</button>
            <button class="btn btn-ghost btn-sm" style="justify-content:center;width:100%" onclick="showToast('SMS sent')">💬 Send SMS</button>
            <button class="btn btn-ghost btn-sm" style="justify-content:center;width:100%" onclick="showToast('Discount code generated')">🎁 Send Discount</button>
            <button class="btn btn-ghost btn-sm" style="justify-content:center;width:100%" onclick="bulkSetTierSingle(${c.id},'vip')" ${c.tier === 'vip' ? 'disabled' : ''}>⭐ Promote to VIP</button>
        </div>
    </div>`;

    document.getElementById('profileOverlay').classList.add('open');
}

    function closeProfile(){document.getElementById('profileOverlay').classList.remove('open');currentCustomer=null;}

    function saveNote(id){
  const c=customers.find(x=>x.id===id);
    if(!c)return;
    c.notes=document.getElementById('profileNote').value;
    showToast('Note saved');
}

    function removeTag(id,tag){
  const c=customers.find(x=>x.id===id);
    if(!c)return;
  c.tags=c.tags.filter(t=>t!==tag);
    if(currentCustomer?.id===id)openProfile(id);
    showToast('Tag removed');
}

    function addTagPrompt(id){
  const tag=prompt('Enter new tag:');
    if(!tag)return;
  const c=customers.find(x=>x.id===id);
    if(!c||c.tags.includes(tag))return;
    c.tags.push(tag);
    if(currentCustomer?.id===id)openProfile(id);
    showToast(`Tag "${tag}" added`);
}

    // ── SELECTION ──
    function toggleSel(id){selectedIds.has(id) ? selectedIds.delete(id) : selectedIds.add(id);updateBulkBar();applyFilters();}
    function toggleSelectAll(cb){const d=getFiltered();if(cb.checked)d.forEach(c=>selectedIds.add(c.id));else selectedIds.clear();updateBulkBar();applyFilters();}
    function clearSel(){selectedIds.clear();updateBulkBar();applyFilters();}
    function updateBulkBar(){const n=selectedIds.size;document.getElementById('bulkBar').classList.toggle('visible',n>0);document.getElementById('bulkCount').textContent=n;}
    function bulkDelete(){if(!selectedIds.size)return;if(!confirm(`Delete ${selectedIds.size} customers?`))return;customers=customers.filter(c=>!selectedIds.has(c.id));selectedIds.clear();updateBulkBar();applyFilters();updateStats();renderSegments();showToast('Customers deleted');}
    function bulkSetTier(tier){selectedIds.forEach(id => { const c = customers.find(x => x.id === id); if (c) c.tier = tier; });clearSel();applyFilters();renderSegments();showToast(`Tier updated to ${tier}`);}
    function bulkSetTierSingle(id,tier){const c=customers.find(x=>x.id===id);if(!c)return;c.tier=tier;applyFilters();renderSegments();updateStats();showToast(`${c.name} promoted to ${tier}`);if(currentCustomer?.id===id)openProfile(id);}

    // ── DELETE ──
    function deleteCustomer(id){
  const c=customers.find(x=>x.id===id);
    if(!c||!confirm(`Delete "${c.name}"?`))return;
  customers=customers.filter(x=>x.id!==id);
    applyFilters();updateStats();renderSegments();
    showToast(`"${c.name}" deleted`);
}
    function deleteCurrentCustomer(){if(!currentCustomer)return;const name=currentCustomer.name;deleteCustomer(currentCustomer.id);closeProfile();}

    // ── ADD / EDIT MODAL ──
    let modalTierVal='new';
    function openAddModal(){
        modalMode = 'add';editingId=null;modalTierVal='new';
    document.getElementById('modalTitle').textContent='Add Customer';
    document.getElementById('modalSubmitBtn').textContent='Add Customer';
  ['mName','mEmail','mPhone','mCity','mNotes'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
    document.getElementById('mCountry').value='Egypt';
    document.getElementById('mScent').value="Nuit d'Ambre";
  document.querySelectorAll('#mTierGroup .tg-btn').forEach(b=>b.classList.toggle('on',b.textContent.toLowerCase()==='new'));
    document.getElementById('modalBg').classList.add('open');
}
    function openEditModal(){if(currentCustomer)openEditModalFor(currentCustomer.id);}
    function openEditModalFor(id){
  const c=customers.find(x=>x.id===id);if(!c)return;
    modalMode='edit';editingId=id;modalTierVal=c.tier;
    document.getElementById('modalTitle').textContent='Edit Customer';
    document.getElementById('modalSubmitBtn').textContent='Save Changes';
    document.getElementById('mName').value=c.name;
    document.getElementById('mEmail').value=c.email;
    document.getElementById('mPhone').value=c.phone;
    document.getElementById('mCity').value=c.city;
    document.getElementById('mNotes').value=c.notes;
    try{document.getElementById('mCountry').value = c.country;}catch(e){ }
    try{document.getElementById('mScent').value = c.scent;}catch(e){ }
  document.querySelectorAll('#mTierGroup .tg-btn').forEach(b=>b.classList.toggle('on',b.textContent.toLowerCase()===c.tier));
    document.getElementById('modalBg').classList.add('open');
}
    function closeModal(force){if(force===true||force?.target===document.getElementById('modalBg'))document.getElementById('modalBg').classList.remove('open');}
    function setModalTier(t,el){modalTierVal = t;document.querySelectorAll('#mTierGroup .tg-btn').forEach(b=>b.classList.remove('on'));el.classList.add('on');}

    function submitModal(){
  const name=document.getElementById('mName').value.trim();
    if(!name){document.getElementById('mName').focus();return;}
    if(modalMode==='add'){
    const newC={
        id:Date.now(),name,email:document.getElementById('mEmail').value,
    phone:document.getElementById('mPhone').value,city:document.getElementById('mCity').value,
    country:document.getElementById('mCountry').value,tier:modalTierVal,
    spend:0,orders:0,scent:document.getElementById('mScent').value,
    lastOrder:'Never',joined:new Date().toLocaleDateString('en-GB',{month:'short',year:'numeric'}),
    notes:document.getElementById('mNotes').value,tags:[modalTierVal.charAt(0).toUpperCase()+modalTierVal.slice(1)],
    color:AV_COLORS[customers.length%AV_COLORS.length],activity:[{type:'note',text:'Customer profile created',time:new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}),icon:'📝'}]
    };
    customers.unshift(newC);showToast(`"${name}" added ✦`);
  } else {
    const c=customers.find(x=>x.id===editingId);
    if(!c)return;
    c.name=name;c.email=document.getElementById('mEmail').value;
    c.phone=document.getElementById('mPhone').value;c.city=document.getElementById('mCity').value;
    c.country=document.getElementById('mCountry').value;c.tier=modalTierVal;
    c.scent=document.getElementById('mScent').value;c.notes=document.getElementById('mNotes').value;
    showToast(`"${name}" updated ✦`);
    if(currentCustomer?.id===editingId)openProfile(editingId);
  }
    closeModal(true);applyFilters();updateStats();renderSegments();
}

    // ── THEME ──
    function toggleTheme(){dark = !dark;document.documentElement.setAttribute('data-theme',dark?'dark':'light');document.getElementById('pill').classList.toggle('on',dark);document.getElementById('themeLabel').textContent=dark?'Light Mode':'Dark Mode';}

// ── NAV ──
document.querySelectorAll('.nav-item').forEach(item=>{item.addEventListener('click', () => { document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active')); item.classList.add('active'); });});

    // ── TOAST ──
    function showToast(msg){const t=document.getElementById('toast');document.getElementById('toastMsg').textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2800);}

    // ── BOOT ──
    updateStats();renderSegments();buildTierChips();applyFilters();
