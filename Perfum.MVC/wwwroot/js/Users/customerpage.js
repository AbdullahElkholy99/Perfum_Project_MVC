
// ── DATA ──
    const CAT_COLORS={'Floral':'#c97a7a','Oriental':'#c8854a','Woody':'#7a9e7e','Fresh':'#7a90be','Fougère':'#a87ac8','Gourmand':'#d4a844'};
    const EMOJIS={'Floral':'🌸','Oriental':'🔥','Woody':'🌳','Fresh':'❄️','Fougère':'🌿','Gourmand':'🍂'};

    const PRODUCTS=[
    {id:1,name:"Nuit d'Ambre",cat:'Oriental',size:'50ml',price:210,stock:24,rating:4.8,reviews:142,tagline:'A deep amber reverie threaded with labdanum and tonka bean.',top:['Cardamom','Pepper','Saffron'],heart:['Rose','Oud','Labdanum'],base:['Amber','Benzoin','Vanilla'],badge:''},
    {id:2,name:'Rose Sauvage',cat:'Floral',size:'100ml',price:185,stock:8,rating:4.9,reviews:218,tagline:'A wild rose caught between morning dew and warm earth.',top:['Bergamot','Geranium','Lychee'],heart:['Rose','Peony','Magnolia'],base:['Musk','Sandalwood','Cedarwood'],badge:'low'},
    {id:3,name:'Bois Sacré',cat:'Woody',size:'75ml',price:340,stock:31,rating:4.7,reviews:89,tagline:'Sacred cedarwood veiled in incense and soft leather.',top:['Lemon','Juniper','Grapefruit'],heart:['Cedar','Vetiver','Iris'],base:['Oakmoss','Musk','Amber'],badge:''},
    {id:4,name:'Oud Mystère',cat:'Oriental',size:'50ml',price:520,stock:15,rating:5.0,reviews:76,tagline:'An enigmatic veil of oud rising through amber smoke.',top:['Saffron','Rose','Cinnamon'],heart:['Oud','Labdanum','Neroli'],base:['Amber','Patchouli','Musk'],badge:''},
    {id:5,name:'Sakura Lumière',cat:'Floral',size:'50ml',price:195,stock:6,rating:4.6,reviews:103,tagline:'A fleeting sakura blossom lifted by spring rain.',top:['Yuzu','Cherry Blossom','Bergamot'],heart:['Peony','Magnolia','Violet'],base:['White Musk','Cashmere Wood','Sandalwood'],badge:'new'},
    {id:6,name:'Forêt Noire',cat:'Woody',size:'100ml',price:285,stock:19,rating:4.4,reviews:64,tagline:'Deep pine forest resin pierced by cold mountain air.',top:['Pine','Eucalyptus','Aldehydes'],heart:['Fir Balsam','Cedar','Labdanum'],base:['Vetiver','Tobacco','Oakmoss'],badge:''},
    {id:7,name:'Citrus Élite',cat:'Fresh',size:'75ml',price:145,stock:42,rating:4.3,reviews:187,tagline:'A burst of golden citrus over vibrant marine accord.',top:['Bergamot','Grapefruit','Lemon'],heart:['Neroli','Marine','Jasmine'],base:['Musk','Driftwood','Amber'],badge:''},
    {id:8,name:'Encens Royal',cat:'Oriental',size:'50ml',price:410,stock:9,rating:4.8,reviews:51,tagline:'Ceremonial incense swirled with gold-dusted resins.',top:['Frankincense','Pepper','Elemi'],heart:['Myrrh','Rose','Labdanum'],base:['Oud','Sandalwood','Patchouli'],badge:''},
    {id:9,name:'Iris Blanc',cat:'Floral',size:'100ml',price:165,stock:22,rating:4.5,reviews:96,tagline:'Cool orris root dusted with soft violet and clean musk.',top:['Violet Leaf','Aldehydes','Bergamot'],heart:['Iris','Ylang Ylang','Jasmine'],base:['Musk','Amber','Cedarwood'],badge:''},
    {id:10,name:'Praline Noir',cat:'Gourmand',size:'50ml',price:175,stock:13,rating:4.6,reviews:72,tagline:'Dark praline folded into vetiver and smoked birch.',top:['Caramel','Praline','Black Pepper'],heart:['Chocolate','Tobacco','Jasmine'],base:['Birch','Vanilla','Musk'],badge:'new'},
    {id:11,name:'Lavande Étoile',cat:'Fougère',size:'100ml',price:125,stock:55,rating:4.2,reviews:134,tagline:'Classic lavender laced with oakmoss and coumarin.',top:['Lavender','Bergamot','Petitgrain'],heart:['Geranium','Sage','Rose'],base:['Oakmoss','Coumarin','Musk'],badge:''},
    {id:12,name:'Aqua Marina',cat:'Fresh',size:'75ml',price:135,stock:28,rating:4.1,reviews:92,tagline:'Oceanic ozonic freshness over a cedar-driftwood base.',top:['Sea Spray','Ozonic','Citrus'],heart:['Aquatic','Violet','Marine'],base:['Cedar','Musk','Driftwood'],badge:''},
    ];

    let cart=[];
    let wishlist=new Set();
    let catFilter='all';
    let modalProduct=null;
    let modalQty=1;
    let paymentMethod='card';
    let checkoutStep=1;
    let dark=false;

    // ── FILTER / SORT / RENDER ──
    function getCategories(){return['all',...new Set(PRODUCTS.map(p=>p.cat))];}

    function buildFilterRow(){
        document.getElementById('filterRow').innerHTML = getCategories().map(c => `
    <div class="fchip ${c === catFilter ? 'on' : ''}" onclick="setCat('${c}',this)">${c === 'all' ? 'All' : c}</div>`).join('');
}
    function setCat(c,el){catFilter = c;document.querySelectorAll('.fchip').forEach(x=>x.classList.remove('on'));el.classList.add('on');applyFilters();}

    function getFiltered(){
  const q=document.getElementById('shopSearch').value.toLowerCase().trim();
    const sort=document.getElementById('sortSel').value;
  let data=PRODUCTS.filter(p=>{
    const mc=catFilter==='all'||p.cat===catFilter;
    const mq=!q||p.name.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q)||[...p.top,...p.heart,...p.base].some(n=>n.toLowerCase().includes(q));
    return mc&&mq;
  });
  if(sort==='price-asc')data.sort((a,b)=>a.price-b.price);
  else if(sort==='price-desc')data.sort((a,b)=>b.price-a.price);
  else if(sort==='rating')data.sort((a,b)=>b.rating-a.rating);
  else if(sort==='name')data.sort((a,b)=>a.name.localeCompare(b.name));
    return data;
}

    function applyFilters(){
  const data=getFiltered();
    document.getElementById('countLabel').textContent=`${data.length} fragrance${data.length !== 1 ? 's' : ''}`;
    const grid=document.getElementById('prodGrid');
    if(!data.length){grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:64px;color:var(--text3)"><div style="font-size:40px;margin-bottom:12px;opacity:.4">🔍</div><div style="font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--text2);margin-bottom:6px">No fragrances found</div><div style="font-size:12px">Try a different search or category</div></div>`;return;}
  grid.innerHTML=data.map((p,i)=>{
    const col=CAT_COLORS[p.cat]||'#c8854a';
    const em=EMOJIS[p.cat]||'🧴';
    const inWish=wishlist.has(p.id);
    const outOfStock=p.stock===0;
    let ribbon='';
    if(outOfStock)ribbon=`<div class="stock-ribbon sr-out">Out of Stock</div>`;
    else if(p.badge==='new')ribbon=`<div class="stock-ribbon sr-new">New Arrival</div>`;
    else if(p.badge==='low'||p.stock<10)ribbon=`<div class="stock-ribbon sr-low">Low Stock</div>`;
    return `
    <div class="prod-card" style="animation-delay:${i*.05}s" onclick="openProductModal(${p.id})">
        ${ribbon}
        <div class="card-wishlist ${inWish?'loved':''}" onclick="event.stopPropagation();toggleWishlistItem(${p.id})" title="Wishlist">${inWish ? '❤️' : '🤍'}</div>
        <div class="card-banner" style="background:linear-gradient(140deg,${col}1e,${col}08)">${em}</div>
        <div class="card-body">
            <div class="card-cat">${p.cat} · ${p.size}</div>
            <div class="card-name">${p.name}</div>
            <div class="card-tagline">${p.tagline}</div>
            <div class="card-notes">${p.top.slice(0, 3).map(n => `<span class="note-pill">${n}</span>`).join('')}</div>
            <div class="card-footer">
                <div>
                    <div class="card-price">$${p.price}</div>
                    <div class="card-size">${p.size}</div>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                    <div class="card-stars"><span class="star-val">★</span> ${p.rating}</div>
                    <button class="add-btn" onclick="event.stopPropagation();quickAdd(${p.id})" ${outOfStock ? 'disabled' : ''} title="${outOfStock?'Out of stock':'Add to cart'}">+</button>
                </div>
            </div>
        </div>
    </div>`;
  }).join('');
}

    // ── PRODUCT MODAL ──
    function openProductModal(id){
  const p=PRODUCTS.find(x=>x.id===id);
    if(!p)return;
    modalProduct=p; modalQty=1;
    const col=CAT_COLORS[p.cat]||'#c8854a';
    const em=EMOJIS[p.cat]||'🧴';
    document.getElementById('pmHero').style.background=`linear-gradient(140deg,${col}28,${col}0a)`;
    document.getElementById('pmEmoji').textContent=em;
    document.getElementById('pmCat').textContent=`${p.cat} · ${p.size}`;
    document.getElementById('pmName').textContent=p.name;
    document.getElementById('pmTagline').textContent=p.tagline;
    document.getElementById('pmPrice').textContent=`$${p.price}`;
    document.getElementById('pmSize').textContent=p.size;
    document.getElementById('modalQtyVal').textContent=1;
    document.getElementById('pmTotal').textContent=`$${p.price}`;
    document.getElementById('pmNotes').innerHTML=[
    {l:'Top Notes',notes:p.top},{l:'Heart Notes',notes:p.heart},{l:'Base Notes',notes:p.base}
  ].map(n=>`<div class="pm-note-box"><div class="pm-note-label">${n.l}</div><div class="pm-note-items">${n.notes.map(x => `<span class="pm-note-item">${x}</span>`).join(' · ')}</div></div>`).join('');
    document.getElementById('pmDetails').innerHTML=[
    {l:'Rating',v:`★ ${p.rating} (${p.reviews} reviews)`},{l:'Stock',v:p.stock>0?`${p.stock} units`:'Out of stock'},
    {l:'Concentration',v:'Eau de Parfum'},{l:'Longevity',v:'8–12 hours'},
  ].map(d=>`<div class="pm-detail"><div class="pm-detail-label">${d.l}</div><div class="pm-detail-val">${d.v}</div></div>`).join('');
    const outOfStock=p.stock===0;
    document.getElementById('pmAddBtn').disabled=outOfStock;
    document.getElementById('pmAddBtn').textContent=outOfStock?'Out of Stock':'';
    if(!outOfStock){document.getElementById('pmAddBtn').innerHTML = `Add to Cart — <span id="pmTotal">$${p.price}</span>`;}
    document.getElementById('modalBg').classList.add('open');
}

    function closeProductModal(force){
  if(force===true||force?.target===document.getElementById('modalBg'))
    document.getElementById('modalBg').classList.remove('open');
}

    function changeModalQty(d){
  if(!modalProduct)return;
    modalQty=Math.max(1,Math.min(modalQty+d,modalProduct.stock||99));
    document.getElementById('modalQtyVal').textContent=modalQty;
    document.getElementById('pmTotal').textContent=`$${modalProduct.price * modalQty}`;
}

    function addFromModal(){
  if(!modalProduct||modalProduct.stock===0)return;
    addToCart(modalProduct.id,modalQty);
    document.getElementById('modalBg').classList.remove('open');
}

    // ── CART ──
    function quickAdd(id){
        addToCart(id, 1);
}

    function addToCart(id,qty=1){
  const p=PRODUCTS.find(x=>x.id===id);
    if(!p||p.stock===0)return;
  const existing=cart.find(x=>x.id===id);
    if(existing){existing.qty = Math.min(existing.qty + qty, p.stock);}
    else{cart.push({ id, qty: Math.min(qty, p.stock) });}
    updateCartBadge();renderCart();
    showToast(`"${p.name}" added to cart 🛒`);
}

    function removeFromCart(id){cart = cart.filter(x => x.id !== id);updateCartBadge();renderCart();}

    function changeCartQty(id,d){
  const item=cart.find(x=>x.id===id);
  const p=PRODUCTS.find(x=>x.id===id);
    if(!item||!p)return;
    item.qty=Math.max(1,Math.min(item.qty+d,p.stock));
    updateCartBadge();renderCart();
}

    function updateCartBadge(){
  const n=cart.reduce((s,x)=>s+x.qty,0);
    const badge=document.getElementById('cartBadge');
    badge.style.display=n?'flex':'none';
    badge.textContent=n;
}

    function getCartTotal(){return cart.reduce((s,x)=>{const p=PRODUCTS.find(pr=>pr.id===x.id);return s+(p?p.price*x.qty:0);},0);}
    function getCartShipping(){return getCartTotal()>=250?0:18;}
    function getCartDiscount(){return getCartTotal()>=400?Math.round(getCartTotal()*.05):0;}

    function renderCart(){
  const el=document.getElementById('cartItems');
    const footer=document.getElementById('cartFooter');
    document.getElementById('cartCount').textContent=cart.length?`(${cart.reduce((s, x) => s + x.qty, 0)} items)`:'';
    if(!cart.length){
        el.innerHTML = `<div class="cart-empty"><div class="ce-icon">🛒</div><div class="ce-title">Your cart is empty</div><div class="ce-sub">Add fragrances to begin</div></div>`;
    footer.innerHTML=`<button class="continue-btn" onclick="closeCart()">Continue Shopping</button>`;
    return;
  }
  el.innerHTML=cart.map(item=>{
    const p=PRODUCTS.find(x=>x.id===item.id);if(!p)return'';
    const col=CAT_COLORS[p.cat]||'#c8854a';
    return`<div class="cart-item">
        <div class="ci-emoji" style="background:linear-gradient(135deg,${col}22,${col}08)">${EMOJIS[p.cat] || '🧴'}</div>
        <div class="ci-info">
            <div class="ci-name">${p.name}</div>
            <div class="ci-meta">${p.cat} · ${p.size}</div>
            <div class="ci-qty-row">
                <div class="ci-qty-btn" onclick="changeCartQty(${p.id},-1)">−</div>
                <div class="ci-qty-val">${item.qty}</div>
                <div class="ci-qty-btn" onclick="changeCartQty(${p.id},1)">+</div>
                <div class="ci-remove" onclick="removeFromCart(${p.id})">Remove</div>
            </div>
        </div>
        <div class="ci-price">$${p.price * item.qty}</div>
    </div>`;
  }).join('');

    const subtotal=getCartTotal(),shipping=getCartShipping(),discount=getCartDiscount(),total=subtotal+shipping-discount;
    footer.innerHTML=`
    <div class="cart-summary">
        <div class="cs-row"><span class="cs-label">Subtotal</span><span>$${subtotal}</span></div>
        <div class="cs-row"><span class="cs-label">Shipping</span><span>${shipping === 0 ? '<span style="color:var(--green)">Free</span>' : '$' + shipping}</span></div>
        ${discount ? `<div class="cs-row"><span class="cs-label">Loyalty Discount (5%)</span><span style="color:var(--green)">−$${discount}</span></div>` : ''}
        ${subtotal < 250 ? `<div style="font-size:10px;color:var(--accent);letter-spacing:.08em;margin:6px 0">Add $${250 - subtotal} more for free shipping</div>` : ''}
        <div class="cs-row total"><span class="cs-label">Total</span><span class="cs-val">$${total}</span></div>
    </div>
    <button class="checkout-btn" onclick="openCheckout()">Proceed to Checkout →</button>
    <button class="continue-btn" onclick="closeCart()">Continue Shopping</button>`;
}

    function openCart(){renderCart();document.getElementById('cartBg').classList.add('open');document.getElementById('cartDrawer').classList.add('open');}
    function closeCart(){document.getElementById('cartBg').classList.remove('open');document.getElementById('cartDrawer').classList.remove('open');}

    // ── CHECKOUT ──
    function openCheckout(){
        closeCart();
    renderCheckout();
    document.getElementById('checkoutOverlay').classList.add('open');
}
    function closeCheckout(){document.getElementById('checkoutOverlay').classList.remove('open');}

    function renderCheckout(){
        renderCoSteps();
    renderCoRight();
    renderCoLeft();
}

    function renderCoSteps(){
  const steps=[{n:1,l:'Info'},{n:2,l:'Shipping'},{n:3,l:'Payment'}];
  document.getElementById('coSteps').innerHTML=steps.map((s,i)=>`
    ${i > 0 ? '<div class="co-step-sep"></div>' : ''}
    <div class="co-step ${s.n===checkoutStep?'active':s.n<checkoutStep?'done':''}">
        <div class="co-step-dot">${s.n < checkoutStep ? '✓' : s.n}</div>
        ${s.l}
    </div>`).join('');
}

    function renderCoRight(){
  const subtotal=getCartTotal(),shipping=getCartShipping(),discount=getCartDiscount(),total=subtotal+shipping-discount;
    document.getElementById('coRight').innerHTML=`
    <div class="co-right-title">Order Summary</div>
    ${cart.map(item => {
        const p = PRODUCTS.find(x => x.id === item.id); if (!p) return '';
        const col = CAT_COLORS[p.cat] || '#c8854a';
        return `<div class="co-item">
        <div class="co-item-emoji" style="background:linear-gradient(135deg,${col}22,${col}08)">${EMOJIS[p.cat] || '🧴'}</div>
        <div><div class="co-item-name">${p.name}</div><div class="co-item-meta">${p.size} · Qty ${item.qty}</div></div>
        <div class="co-item-price">$${p.price * item.qty}</div>
      </div>`;
    }).join('')}
    <div class="co-divider"></div>
    <div class="co-summary-row"><span class="co-s-label">Subtotal</span><span>$${subtotal}</span></div>
    <div class="co-summary-row"><span class="co-s-label">Shipping</span><span>${shipping === 0 ? '<span style="color:var(--green)">Free</span>' : '$' + shipping}</span></div>
    ${discount ? `<div class="co-summary-row"><span class="co-s-label">Discount</span><span style="color:var(--green)">−$${discount}</span></div>` : ''}
    <div class="co-summary-row total"><span class="co-s-label">Total</span><span class="co-s-val">$${total}</span></div>
    <div class="co-trust">
        <div class="co-trust-item">🔒 Secure checkout</div>
        <div class="co-trust-item">📦 Tracked delivery</div>
        <div class="co-trust-item">↩ 30-day returns</div>
    </div>`;
}

    function renderCoLeft(){
  const el=document.getElementById('coLeft');
    if(checkoutStep===1) el.innerHTML=renderStep1();
    else if(checkoutStep===2) el.innerHTML=renderStep2();
    else el.innerHTML=renderStep3();
}

    function renderStep1(){
  return`
    <div class="co-section">
        <div class="co-section-title">Contact Information</div>
        <div class="form-grid">
            <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" placeholder="Amira Hassan" value="Amira Hassan" /></div>
            <div class="form-group"><label class="form-label">Email Address</label><input class="form-input" type="email" placeholder="amira@email.com" value="amira@email.com" /></div>
            <div class="form-group"><label class="form-label">Phone Number</label><input class="form-input" type="tel" placeholder="+20 10 1234 5678" /></div>
        </div>
    </div>
    <div class="co-section">
        <div class="co-section-title">Delivery Address</div>
        <div class="form-grid">
            <div class="form-group"><label class="form-label">Address Line 1</label><input class="form-input" placeholder="123 Corniche El Nil" /></div>
            <div class="form-group"><label class="form-label">Address Line 2</label><input class="form-input" placeholder="Apartment, suite, floor…" /></div>
            <div class="form-grid form-grid-2">
                <div class="form-group"><label class="form-label">City</label><input class="form-input" placeholder="Cairo" value="Cairo" /></div>
                <div class="form-group"><label class="form-label">Postal Code</label><input class="form-input" placeholder="11511" /></div>
            </div>
            <div class="form-group"><label class="form-label">Country</label>
                <select class="form-input">
                    <option>Egypt</option><option>UAE</option><option>Saudi Arabia</option><option>France</option><option>UK</option><option>USA</option><option>Germany</option><option>Japan</option>
                </select>
            </div>
        </div>
    </div>
    <button class="place-order-btn" onclick="nextStep()" style="background:var(--accent)">Continue to Shipping →</button>`;
}

    function renderStep2(){
  return`
    <div class="co-section">
        <div class="co-section-title">Shipping Method</div>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:28px;">
            ${[
                { id: 'standard', label: 'DHL Standard', sub: '5–7 business days', price: 'Free', selected: true },
                { id: 'express', label: 'FedEx Express', sub: '2–3 business days', price: '$18', selected: false },
                { id: 'overnight', label: 'UPS Overnight', sub: 'Next business day', price: '$45', selected: false },
            ].map(m => `
        <div class="pm-method ${m.selected ? 'selected' : ''}" onclick="selectShipping(this)" style="border-radius:12px;padding:18px;">
          <div style="font-size:22px">${m.id === 'standard' ? '📦' : m.id === 'express' ? '🚀' : '⚡'}</div>
          <div><div class="pm-method-name">${m.label}</div><div class="pm-method-sub">${m.sub}</div></div>
          <div style="margin-left:auto;font-family:'Cormorant Garamond',serif;font-size:18px;color:${m.price === 'Free' ? 'var(--green)' : 'var(--text)'}">${m.price}</div>
          <div class="pm-radio"></div>
        </div>`).join('')}
        </div>
    </div>
    <div class="co-section">
        <div class="co-section-title">Gift Options</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
            <label style="display:flex;align-items:center;gap:12px;cursor:pointer;font-size:13px;color:var(--text2)">
                <input type="checkbox" style="accent-color:var(--accent);width:16px;height:16px;cursor:pointer"> Complimentary gift wrapping (+$0)
            </label>
            <label style="display:flex;align-items:center;gap:12px;cursor:pointer;font-size:13px;color:var(--text2)">
                <input type="checkbox" style="accent-color:var(--accent);width:16px;height:16px;cursor:pointer"> Include a handwritten note
            </label>
        </div>
    </div>
    <div style="display:flex;gap:12px;margin-top:8px;">
        <button class="place-order-btn" onclick="prevStep()" style="background:var(--surface);color:var(--text2);border:1px solid var(--border);box-shadow:none;flex:0 0 auto;width:auto;padding:15px 24px;">← Back</button>
        <button class="place-order-btn" onclick="nextStep()">Continue to Payment →</button>
    </div>`;
}

    function renderStep3(){
  const total=getCartTotal()+getCartShipping()-getCartDiscount();
    return`
    <div class="co-section">
        <div class="co-section-title">Payment Method</div>
        <div class="payment-methods">
            ${[
                { id: 'card', icon: '💳', name: 'Credit / Debit Card', sub: 'Visa, Mastercard, Amex' },
                { id: 'paypal', icon: '🅿', name: 'PayPal', sub: 'Pay via PayPal account' },
                { id: 'apple', icon: '🍎', name: 'Apple Pay', sub: 'Touch ID or Face ID' },
                { id: 'google', icon: '🔵', name: 'Google Pay', sub: 'Quick & secure' },
            ].map(m => `
        <div class="pm-method ${m.id === paymentMethod ? 'selected' : ''}" onclick="selectPayment('${m.id}',this)">
          <div class="pm-method-icon">${m.icon}</div>
          <div><div class="pm-method-name">${m.name}</div><div class="pm-method-sub">${m.sub}</div></div>
          <div class="pm-radio"></div>
        </div>`).join('')}
        </div>
        <div id="paymentFields"></div>
    </div>
    <div class="co-section">
        <div class="co-section-title">Promo Code</div>
        <div style="display:flex;gap:10px;">
            <input class="form-input" placeholder="Enter promo code…" style="flex:1;" id="promoInput" />
            <button style="padding:12px 20px;background:var(--bg2);border:1px solid var(--border);border-radius:10px;font-family:'Jost',sans-serif;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--text2);cursor:pointer;transition:all .2s;white-space:nowrap;" onmouseover="this.style.background='var(--bg3)'" onmouseout="this.style.background='var(--bg2)'" onclick="applyPromo()">Apply</button>
        </div>
    </div>
    <div style="display:flex;gap:12px;margin-top:8px;">
        <button class="place-order-btn" onclick="prevStep()" style="background:var(--surface);color:var(--text2);border:1px solid var(--border);box-shadow:none;flex:0 0 auto;width:auto;padding:15px 24px;">← Back</button>
        <button class="place-order-btn" onclick="placeOrder()">Place Order · $${total} 🔒</button>
    </div>`;
}

    function renderPaymentFields(){
  const el=document.getElementById('paymentFields');if(!el)return;
    if(paymentMethod==='card'){
        el.innerHTML = `<div class="card-fields">
      <div class="form-group" style="margin-bottom:14px;">
        <label class="form-label">Card Number</label>
        <div class="card-number-wrap">
          <input class="form-input" placeholder="1234  5678  9012  3456" maxlength="19" oninput="formatCard(this)" />
          <div class="card-icons">💳</div>
        </div>
      </div>
      <div class="form-grid form-grid-2" style="gap:14px;">
        <div class="form-group"><label class="form-label">Expiry Date</label><input class="form-input" placeholder="MM / YY" maxlength="7" oninput="formatExpiry(this)" /></div>
        <div class="form-group"><label class="form-label">CVV</label><input class="form-input" placeholder="•••" maxlength="4" type="password" /></div>
      </div>
      <div class="form-group" style="margin-top:14px;margin-bottom:0;"><label class="form-label">Cardholder Name</label><input class="form-input" placeholder="AMIRA HASSAN" /></div>
    </div>`;
  } else if(paymentMethod==='paypal'){
        el.innerHTML = `<div class="card-fields" style="text-align:center;padding:28px;">
      <div style="font-size:36px;margin-bottom:12px">🅿</div>
      <div style="font-size:14px;color:var(--text2);margin-bottom:16px;">You'll be redirected to PayPal to complete your purchase securely.</div>
      <div style="font-size:11px;color:var(--text3);letter-spacing:.06em">Logged in as: amira@email.com</div>
    </div>`;
  } else {
        el.innerHTML = `<div class="card-fields" style="text-align:center;padding:28px;">
      <div style="font-size:36px;margin-bottom:12px">${paymentMethod === 'apple' ? '🍎' : '🔵'}</div>
      <div style="font-size:14px;color:var(--text2);margin-bottom:6px;">${paymentMethod === 'apple' ? 'Use Touch ID or Face ID to pay' : 'Authenticate with your Google account'}</div>
      <div style="font-size:11px;color:var(--text3);letter-spacing:.06em">Ready to authenticate</div>
    </div>`;
  }
}

    function selectPayment(id,el){
        paymentMethod = id;
  document.querySelectorAll('.pm-method').forEach(x=>x.classList.remove('selected'));
    el.classList.add('selected');
    renderPaymentFields();
}

    function selectShipping(el){
        el.closest('.co-section').querySelectorAll('.pm-method').forEach(x => x.classList.remove('selected'));
    el.classList.add('selected');
}

    function applyPromo(){
  const val=document.getElementById('promoInput')?.value?.toUpperCase();
    if(val==='SILLAGE20')showToast('Promo code applied! 20% off 🎉');
    else showToast('Invalid promo code');
}

    function formatCard(el){el.value = el.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);}
    function formatExpiry(el){el.value = el.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1 / $2').slice(0, 7);}

    function nextStep(){if(checkoutStep<3){checkoutStep++;renderCoSteps();renderCoLeft();if(checkoutStep===3)setTimeout(renderPaymentFields,50);}}
    function prevStep(){if(checkoutStep>1){checkoutStep--;renderCoSteps();renderCoLeft();}}

    function placeOrder(){
  const orderId='#'+Math.floor(5300+Math.random()*200);
    document.getElementById('successOrderId').textContent=orderId;
    closeCheckout();
    cart=[];updateCartBadge();
    document.getElementById('successScreen').classList.add('open');
    checkoutStep=1;
}

    function continueShopping(){
        document.getElementById('successScreen').classList.remove('open');
    applyFilters();
}

    // ── WISHLIST ──
    function toggleWishlistItem(id){
  if(wishlist.has(id))wishlist.delete(id);else wishlist.add(id);
    applyFilters();
  const p=PRODUCTS.find(x=>x.id===id);
    showToast(wishlist.has(id)?`"${p?.name}" added to wishlist ❤️`:`"${p?.name}" removed from wishlist`);
}
    function toggleWishlist(){showToast('Wishlist: ' + wishlist.size + ' item' + (wishlist.size !== 1 ? 's' : ''));}

    // ── THEME ──
    function toggleTheme(){
        dark = !dark;
    document.documentElement.setAttribute('data-theme',dark?'dark':'light');
    document.getElementById('themeBtn').textContent=dark?'☀️':'🌙';
}

    // ── UTILS ──
    function scrollToShop(){document.getElementById('shopSection').scrollIntoView({ behavior: 'smooth' });}
    function setNavActive(el){document.querySelectorAll('.nav-link').forEach(x => x.classList.remove('active'));el.classList.add('active');}
    function showToast(msg){const t=document.getElementById('toast');document.getElementById('toastMsg').textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2800);}

    // ── BOOT ──
    buildFilterRow();
    applyFilters();
