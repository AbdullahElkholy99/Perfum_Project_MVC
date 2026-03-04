    const CAT_COLORS={Floral:'#c97a7a',Oriental:'#c8854a',Woody:'#7a9e7e',Fresh:'#7a90be',Fougère:'#9a7ac8',Gourmand:'#d4a844'};
    const CAT_EMOJIS={Floral:'🌸',Oriental:'🔥',Woody:'🌳',Fresh:'❄️',Fougère:'🌿',Gourmand:'🍂'};
    const CUST_COLORS=['#c8854a','#9b7ec8','#d97ba0','#5a8fc8','#7ab87a','#d4943a','#e87a7a','#c870a0'];
    const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const NAMES=['Sofia Larsson','James Okafor','Mei Lin','Amir Khalil','Elena Vogt','Laila Nasser','Tom Whitfield','Priya Menon'];

    const KPI_DATA={
        '30d':{revenue:'$84,240',orders:'1,284',customers:'3,620',avgOrder:'$185',conversion:'3.8%'},
    '7d':{revenue:'$18,420',orders:'312',customers:'890',avgOrder:'$192',conversion:'4.1%'},
    '90d':{revenue:'$241,800',orders:'3,820',customers:'9,400',avgOrder:'$179',conversion:'3.6%'},
    '1y':{revenue:'$1.02M',orders:'14,280',customers:'28,400',avgOrder:'$183',conversion:'3.7%'},
        };

    const REVENUE_DATA={
        '30d':{rev:[2800,3200,2900,4100,3800,3500,5200,4800,4200,5800,6200,5500,6800,7200,6600,7800,8200,7600,8800,7400,6900,8100,7800,9200,8400,8900,9600,10200,9800,11400],units:[12,14,11,17,15,14,22,20,18,24,26,23,28,30,27,32,34,31,36,30,28,33,32,38,34,36,40,42,40,46]},
    '7d':{rev:[2400,3100,2800,3600,4200,3800,4500],units:[10,13,11,15,17,16,18]},
    '90d':{rev:[1800,2100,1900,2600,3100,2800,3400,2900,2600,3200,3800,3400,3900,4200,3900,4600,5100,4700,5200,4800,4400,5600,6200,5800,6400,6900,6600,7200,7800,7400,7800,8100,7700,8400,8900,8500,9200,9600,9100,9700,10100,9700,10200,10600,10100,10700,11100,10700,11200,11600,11100,11700,12100,11700,12200,12600,12100,12700,13100,12700,13200,13600,13100,13700,14100,13700,14200,14600,14100,14700,15100,14700,15200,15600,15100,15700,16100,15700,16200,16600,16100,16700,17100,16700,17200,17600,17100,17700,18100,17700],units:Array.from({length:90},(_,i)=>Math.round(7+i*0.1+Math.random()*4))},
        };

    const TOP_PRODUCTS=[
    {name:'Oud Mystère',cat:'Oriental',rev:'$18,200',pct:88},
    {name:'Bois Sacré',cat:'Woody',rev:'$14,600',pct:71},
    {name:"Nuit d'Ambre",cat:'Oriental',rev:'$12,400',pct:60},
    {name:'Encens Royal',cat:'Oriental',rev:'$10,800',pct:52},
    {name:'Rose Sauvage',cat:'Floral',rev:'$9,200',pct:44},
    ];

    const ORDERS_DATA=[
    {id:'#5248',cust:'Sofia Larsson',ci:0,items:"Oud Mystère · 2 items",status:'delivered',total:'$940'},
    {id:'#5247',cust:'James Okafor',ci:1,items:"Bois Sacré",status:'shipped',total:'$340'},
    {id:'#5246',cust:'Mei Lin',ci:2,items:"Sakura Lumière · Rose Sauvage",status:'processing',total:'$380'},
    {id:'#5245',cust:'Amir Khalil',ci:3,items:"Encens Royal",status:'pending',total:'$410'},
    {id:'#5244',cust:'Elena Vogt',ci:4,items:"Citrus Élite · 3 items",status:'delivered',total:'$435'},
    {id:'#5243',cust:'Laila Nasser',ci:5,items:"Nuit d'Ambre",status:'shipped',total:'$210'},
    ];

    const STOCK_ALERTS=[
    {name:'Rose Sauvage',cat:'Floral',stock:8,type:'low'},
    {name:'Sakura Lumière',cat:'Floral',stock:6,type:'low'},
    {name:'Praline Noir',cat:'Gourmand',stock:3,type:'critical'},
    {name:'Iris Blanc',cat:'Floral',stock:0,type:'out'},
    ];

    const GEO_DATA=[
    {flag:'🇦🇪',country:'UAE',orders:284,rev:'$22,400',pct:82},
    {flag:'🇫🇷',country:'France',orders:218,rev:'$17,600',pct:64},
    {flag:'🇸🇦',country:'Saudi Arabia',orders:192,rev:'$15,800',pct:58},
    {flag:'🇬🇧',country:'UK',orders:164,rev:'$12,400',pct:45},
    {flag:'🇪🇬',country:'Egypt',orders:138,rev:'$9,800',pct:36},
    ];

    const CATEGORIES=[
    {name:'Oriental',pct:35,color:'#c8854a'},
    {name:'Floral',pct:28,color:'#c97a7a'},
    {name:'Woody',pct:18,color:'#7a9e7e'},
    {name:'Fresh',pct:10,color:'#7a90be'},
    {name:'Gourmand',pct:9,color:'#d4a844'},
    ];

    const TICKER_ITEMS=[
    {text:'New order <strong>#5249</strong> from Sofia Larsson',val:'$940',time:'Just now'},
    {text:'<strong>Rose Sauvage</strong> stock below threshold',val:'8 left',time:'2m ago'},
    {text:'New customer registered: <strong>Yuki Tanaka</strong>',val:'',time:'5m ago'},
    {text:'Order <strong>#5247</strong> shipped via DHL',val:'',time:'8m ago'},
    {text:'Collection <strong>Nuits Dorées</strong> hit $28k revenue',val:'$28k',time:'12m ago'},
    ];

    const NOTIFS=[
    {icon:'📦',text:'12 orders awaiting processing — action needed',time:'5 min ago',unread:true,bg:'rgba(200,133,74,.1)'},
    {icon:'⚠️',text:'Praline Noir critically low stock (3 units)',time:'18 min ago',unread:true,bg:'rgba(212,168,68,.1)'},
    {icon:'⭐',text:'New 5-star review on Oud Mystère',time:'1 hr ago',unread:true,bg:'rgba(212,168,68,.1)'},
    {icon:'📊',text:'March monthly report is ready to download',time:'2 hrs ago',unread:true,bg:'rgba(122,144,190,.1)'},
    {icon:'🚀',text:'Séduction Rare collection exceeded sales target',time:'Yesterday',unread:false,bg:'rgba(122,158,126,.1)'},
    ];

    const GOALS=[
    {name:'Monthly Revenue',current:84240,target:100000,color:'var(--accent)'},
    {name:'New Customers',current:348,target:500,color:'var(--blue)'},
    {name:'Order Volume',current:1284,target:1500,color:'var(--green)'},
    {name:'Avg. Order Value',current:185,target:200,color:'var(--purple)'},
    ];

    const COHORT=[
    {val:'3,620',label:'Total Customers',change:'+124',up:true},
    {val:'428',label:'VIP Members',change:'+18',up:true},
    {val:'68%',label:'Retention',change:'+2%',up:true},
    {val:'$232',label:'Avg. LTV',change:'+$14',up:true},
    ];

    let currentPeriod='30d';

    // ── INIT ──
    function init(){
        setGreeting();
    renderKPIs();
    renderBarChart();
    renderDonut();
    renderOrders();
    renderTopProducts();
    renderGoals();
    renderGeo();
    renderTicker();
    renderCohort();
    renderStockAlerts();
    renderNotifications();
        }

    // ── GREETING ──
    function setGreeting(){
          const h=new Date().getHours();
    const g=h<12?'Good morning':h<17?'Good afternoon':'Good evening';
    document.getElementById('greeting').textContent=g+', Admin';
        }

    // ── PERIOD ──
    function setPeriod(p,el){
        currentPeriod = p;
          document.querySelectorAll('.pt-btn').forEach(b=>b.classList.remove('on'));
    el.classList.add('on');
    renderKPIs();
    renderBarChart();
        }

    // ── KPIs ──
    function renderKPIs(){
          const d=KPI_DATA[currentPeriod]||KPI_DATA['30d'];
    const spark=[22,18,28,24,35,30,42,38,50,55,48,62];
    const defs=[
    {icon:'💰',label:'Revenue',val:d.revenue,change:'↑ 12.1%',dir:'up',color:'var(--accent)',spark},
    {icon:'📦',label:'Orders',val:d.orders,change:'↑ 8.4%',dir:'up',color:'var(--blue)',spark:[...spark].reverse()},
    {icon:'👤',label:'Customers',val:d.customers,change:'↑ 5.2%',dir:'up',color:'var(--green)',spark:[10,14,18,16,22,20,28,26,32,30,38,42]},
    {icon:'💳',label:'Avg. Order',val:d.avgOrder,change:'↑ 3.1%',dir:'up',color:'var(--purple)',spark:[30,28,32,34,30,36,32,38,36,40,38,44]},
    {icon:'⚡',label:'Conversion',val:d.conversion,change:'↑ 0.3%',dir:'up',color:'var(--gold)',spark:[20,22,19,25,23,28,26,30,28,32,30,36]},
    ];
    const maxSpark=62;
          document.getElementById('kpiStrip').innerHTML=defs.map((k,i)=>`
    <div class="kpi-card" style="animation-delay:${i*.05}s">
        <div class="kpi-icon" style="background:linear-gradient(135deg,${k.color}22,${k.color}09);color:${k.color}">${k.icon}</div>
        <div class="kpi-val">${k.val}</div>
        <div class="kpi-label">${k.label}</div>
        <div class="kpi-change ${k.dir}">${k.change}</div>
        <div class="kpi-spark">
            ${k.spark.map((v, j) => `<div class="ks-bar" style="height:${Math.round(v / maxSpark * 100)}%;background:${k.color};opacity:${0.3 + v / maxSpark * .7};animation-delay:${j * .03}s"></div>`).join('')}
        </div>
    </div>`).join('');
        }

    // ── BAR CHART ──
    function renderBarChart(){
          const raw=REVENUE_DATA[currentPeriod]||REVENUE_DATA['30d'];
    const rev=raw.rev, units=raw.units;
    const step=Math.max(1,Math.floor(rev.length/10));
          const sample=rev.filter((_,i)=>i%step===0).slice(0,10);
          const uSample=units.filter((_,i)=>i%step===0).slice(0,10);
    const maxRev=Math.max(...sample), maxU=Math.max(...uSample);
    const labels=currentPeriod==='7d'?['Mon','Tue','Wed','Thu','Fri','Sat','Sun']:
    currentPeriod==='1y'?MONTHS:
    Array.from({length:sample.length},(_,i)=>(i+1)*(rev.length/sample.length|0));

          document.getElementById('barChart').innerHTML=sample.map((v,i)=>`
    <div class="bc-group">
        <div class="bc-bars">
            <div class="bc-bar rev" style="width:18px;height:${Math.round(v/maxRev*110)}px;opacity:${0.55+v/maxRev*.45};animation-delay:${i*.05}s"></div>
            <div class="bc-bar units" style="width:12px;height:${Math.round(uSample[i]/maxU*110)}px;opacity:${0.5+uSample[i]/maxU*.5};animation-delay:${i*.05+.02}s"></div>
        </div>
    </div>`).join('');
          document.getElementById('chartLabels').innerHTML=labels.slice(0,sample.length).map(l=>`<div class="chart-label">${l}</div>`).join('');
          const total=rev.reduce((a,b)=>a+b,0);
    document.getElementById('revSubtitle').textContent=`${currentPeriod === '7d' ? 'Last 7 days' : currentPeriod === '30d' ? 'Last 30 days' : currentPeriod === '90d' ? 'Last 90 days' : 'Full year'} · $${(total / 1000).toFixed(0)}k total`;
        }

    // ── DONUT ──
    function renderDonut(){
          const r=40, cx=60, cy=60, circ=2*Math.PI*r;
    let offset=0;
    const svg=document.getElementById('donutSvg');
          svg.innerHTML=CATEGORIES.map(cat=>{
            const dash=circ*cat.pct/100;
    const el=`<circle cx="${cx}" cy="${cy}" r="${r}" stroke="${cat.color}" stroke-dasharray="${dash} ${circ-dash}" stroke-dashoffset="${-offset}" />`;
    offset+=dash;
    return el;
          }).join('');
          document.getElementById('donutLegend').innerHTML=CATEGORIES.map(c=>`
    <div class="dl-item"><div class="dl-dot" style="background:${c.color}"></div>${c.name}<span class="dl-pct">${c.pct}%</span></div>`).join('');
        }

    // ── ORDERS ──
    function renderOrders(){
          const STATUS={
        delivered:{dot:'var(--green)',label:'Delivered'},
    shipped:{dot:'var(--purple)',label:'Shipped'},
    processing:{dot:'var(--blue)',label:'Processing'},
    pending:{dot:'var(--gold)',label:'Pending'},
    cancelled:{dot:'var(--rose)',label:'Cancelled'},
          };
          document.getElementById('ordersBody').innerHTML=ORDERS_DATA.map(o=>{
            const s=STATUS[o.status]||STATUS.pending;
    return`<tr onclick="showToast('Opening order ${o.id}')">
        <td><span class="order-id">${o.id}</span></td>
        <td><div class="cust-info"><div class="cust-av-sm" style="background:linear-gradient(135deg,${CUST_COLORS[o.ci]},${CUST_COLORS[o.ci]}99)">${o.cust.charAt(0)}</div>${o.cust}</div></td>
        <td style="font-size:12px;color:var(--text3)">${o.items}</td>
        <td><span class="status-dot" style="background:${s.dot}"></span><span class="status-text">${s.label}</span></td>
        <td style="font-family:'Cormorant Garamond',serif;font-size:16px;color:var(--accent)">${o.total}</td>
    </tr>`;
          }).join('');
        }

    // ── TOP PRODUCTS ──
    function renderTopProducts(){
        document.getElementById('topProducts').innerHTML = TOP_PRODUCTS.map((p, i) => `
            <div class="top-prod-item" onclick="showToast('Opening ${p.name}')">
              <div class="rank-num">${i + 1}</div>
              <div class="top-prod-emoji" style="background:linear-gradient(135deg,${CAT_COLORS[p.cat] || '#c8854a'}22,${CAT_COLORS[p.cat] || '#c8854a'}09)">${CAT_EMOJIS[p.cat] || '🧴'}</div>
              <div><div class="top-prod-name">${p.name}</div><div class="top-prod-cat">${p.cat}</div></div>
              <div class="top-prod-bar-wrap">
                <div class="top-prod-bar-track"><div class="top-prod-bar-fill" style="width:${p.pct}%;background:linear-gradient(to right,${CAT_COLORS[p.cat] || '#c8854a'}88,${CAT_COLORS[p.cat] || '#c8854a'});animation-delay:${i * .1}s"></div></div>
              </div>
              <div class="top-prod-rev">${p.rev}</div>
            </div>`).join('');
        }

    // ── GOALS ──
    function renderGoals(){
        document.getElementById('goalsPanel').innerHTML = GOALS.map(g => {
            const pct = Math.min(100, Math.round(g.current / g.target * 100));
            const fmt = v => v >= 1000 ? '$' + (v / 1000).toFixed(v >= 100000 ? 0 : 1) + 'k' : v.toString() + (g.name.includes('%') ? '%' : '');
            return `<div class="goal-item">
              <div class="goal-header">
                <div class="goal-name">${g.name}</div>
                <div class="goal-vals"><strong>${fmt(g.current)}</strong> / ${fmt(g.target)}</div>
              </div>
              <div class="goal-track"><div class="goal-fill" style="width:${pct}%;background:linear-gradient(to right,${g.color}88,${g.color})"></div></div>
            </div>`;
        }).join('');
        }

    // ── GEO ──
    function renderGeo(){
        document.getElementById('geoList').innerHTML = GEO_DATA.map(g => `
            <div class="geo-item">
              <div class="geo-flag">${g.flag}</div>
              <div><div class="geo-country">${g.country}</div><div class="geo-orders">${g.orders} orders</div></div>
              <div class="geo-bar-wrap"><div class="geo-bar-track"><div class="geo-bar-fill" style="width:${g.pct}%;background:linear-gradient(to right,var(--accent)66,var(--accent))"></div></div></div>
              <div class="geo-rev">${g.rev}</div>
            </div>`).join('');
        }

    // ── TICKER ──
    function renderTicker(){
        document.getElementById('tickerFeed').innerHTML = TICKER_ITEMS.map(t => `
            <div class="ticker-row">
              <div class="ticker-dot"></div>
              <div class="ticker-text">${t.text}</div>
              ${t.val ? `<div class="ticker-val">${t.val}</div>` : ''}
              <div class="ticker-time" style="margin-left:8px">${t.time}</div>
            </div>`).join('');
        }
    function refreshTicker(){
          const el=document.getElementById('tickerFeed');
    el.style.opacity='0';
          setTimeout(()=>{renderTicker();el.style.opacity='1';el.style.transition='opacity .4s';},300);
    showToast('Activity refreshed');
        }

    // ── COHORT ──
    function renderCohort(){
        document.getElementById('cohortGrid').innerHTML = COHORT.map(c => `
            <div class="cohort-cell">
              <div class="cc-val">${c.val}</div>
              <div class="cc-label">${c.label}</div>
              <div class="cc-change" style="color:var(--green)">${c.change}</div>
            </div>`).join('');
        }

    // ── STOCK ALERTS ──
    function renderStockAlerts(){
        document.getElementById('stockAlerts').innerHTML = STOCK_ALERTS.map(s => {
            const isOut = s.type === 'out';
            return `<div class="alert-item">
              <div class="alert-emoji" style="background:linear-gradient(135deg,${CAT_COLORS[s.cat] || '#c8854a'}22,${CAT_COLORS[s.cat] || '#c8854a'}09)">${CAT_EMOJIS[s.cat] || '🧴'}</div>
              <div>
                <div class="alert-name">${s.name}</div>
                <div class="alert-stock ${isOut ? 'stock-out' : s.type === 'critical' ? 'stock-out' : 'stock-low'}">${isOut ? 'Out of stock' : s.stock + ' units remaining'}</div>
              </div>
              <button class="reorder-btn" onclick="showToast('Reorder placed for '+this.closest('.alert-item').querySelector('.alert-name').textContent)">Reorder</button>
            </div>`;
        }).join('');
        }

    // ── NOTIFICATIONS ──
    let notifs=[...NOTIFS];
    function renderNotifications(){
        document.getElementById('notifPanel').innerHTML = notifs.map((n, i) => `
            <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="readNotif(${i})">
              <div class="notif-icon-wrap" style="background:${n.bg}">
                ${n.icon}
                ${n.unread ? '<div class="notif-unread-dot"></div>' : ''}
              </div>
              <div>
                <div class="notif-text">${n.text}</div>
                <div class="notif-time">${n.time}</div>
              </div>
            </div>`).join('');
          const unread=notifs.filter(x=>x.unread).length;
    document.querySelector('.nav-badge.warn')?.textContent !== undefined && (document.querySelector('.nav-badge.warn').textContent=unread||'');
        }
    function readNotif(i){notifs[i].unread = false;renderNotifications();}
    function markAllRead(){notifs.forEach(n => n.unread = false);renderNotifications();showToast('All notifications marked as read');}

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
          setTimeout(()=>t.classList.remove('show'),2600);
        }

    // ── BOOT ──
    init();
