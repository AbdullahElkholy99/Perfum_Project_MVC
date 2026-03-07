let stripe;
let cardElement;
let basketId = localStorage.getItem("basketId") || crypto.randomUUID();

localStorage.setItem("basketId", basketId);




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
    //document.getElementById('countLabel').textContent=`${data.length} fragrance${data.length !== 1 ? 's' : ''}`;
    const grid=document.getElementById('prodGrid');
    if(!data.length){grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:64px;color:var(--text3)"><div style="font-size:40px;margin-bottom:12px;opacity:.4">🔍</div><div style="font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--text2);margin-bottom:6px">No fragrances found</div><div style="font-size:12px">Try a different search or category</div></div>`;return;}

        //grid.innerHTML = data.map((p, i) => {
        //    const col=CAT_COLORS[p.cat]||'#c8854a';
        //    const em=EMOJIS[p.cat]||'🧴';
        //    const inWish=wishlist.has(p.id);
        //    const outOfStock=p.stock===0;
        //    let ribbon='';
        //    if(outOfStock)ribbon=`<div class="stock-ribbon sr-out">Out of Stock</div>`;
        //    else if(p.badge==='new')ribbon=`<div class="stock-ribbon sr-new">New Arrival</div>`;
        //    else if(p.badge==='low'||p.stock<10)ribbon=`<div class="stock-ribbon sr-low">Low Stock</div>`;
        //    return `
        //    <div class="prod-card" style="animation-delay:${i*.05}s" onclick="openProductModal(${p.id})">
        //        ${ribbon}
        //        <div class="card-wishlist ${inWish?'loved':''}" onclick="event.stopPropagation();toggleWishlistItem(${p.id})" title="Wishlist">${inWish ? '❤️' : '🤍'}</div>
        //        <div class="card-banner" style="background:linear-gradient(140deg,${col}1e,${col}08)">${em}</div>
        //        <div class="card-body">
        //            <div class="card-cat">${p.cat} · ${p.size}</div>
        //            <div class="card-name">${p.name}</div>
        //            <div class="card-tagline">${p.tagline}</div>
        //            <div class="card-notes">${p.top.slice(0, 3).map(n => `<span class="note-pill">${n}</span>`).join('')}</div>
        //            <div class="card-footer">
        //                <div>
        //                    <div class="card-price">$${p.price}</div>
        //                    <div class="card-size">${p.size}</div>
        //                </div>
        //                <div style="display:flex;align-items:center;gap:8px">
        //                    <div class="card-stars"><span class="star-val">★</span> ${p.rating}</div>
        //                    <button class="add-btn" onclick="event.stopPropagation();quickAdd(${p.id})" ${outOfStock ? 'disabled' : ''} title="${outOfStock?'Out of stock':'Add to cart'}">+</button>
        //                </div>
        //            </div>
        //        </div>
        //    </div>`;
        //  }).join('');
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
function showproduct(item) {
    console.log(item)
    //addToCart(id, 1);
}

let cart = [];
let products = [];

// ── CART ──
function quickAdd(id, name, price, imageUrl, stock, size_Ml) {

    const product = {
        id: id,
        name: name,
        price: price,
        imageUrl: imageUrl,
        stock: stock,
        size: size_Ml,

    }
    if (!products.find(x => x.id === id)) {
        products.push(product)
    }
    //console.log("-------------------- quickAdd")
    //console.log(products)
    //console.log("-------------------- ")

    addToCart(product, 1);
}

function addToCart(product, qty = 1) {

    const id = product.id
    const p = products.find(x => x.id === id);
    //var response = await fetch()
    //console.log("-------------------- addToCart")
    //console.log(product)
    //console.log("-------------------- ")

    if (!product || product.stock === 0) return;

    const existing = cart.find(x => x.id === id);

    if (existing) {
        //console.log(cart)
        existing.qty = Math.min(existing.qty + qty, product.stock);
        //console.log(cart)
        //console.log("------------")

    }
    else {
        cart.push({ id, qty: Math.min(qty, product.stock) });
        //console.log(cart)
        //console.log("***********")
    }

    updateCartBadge(); renderCart();
     
    showToast(`"${p.name}" added to cart 🛒`);
    saveBasket();

}
async function saveBasket() {

    showToast(`"abdullah 🛒`);

    const basket = {
        id: basketId,
        basketItems: cart.map(x => ({
            id: x.id,
            quantity: x.qty,
            price: products.find(p => p.id === x.id)?.price

        }))
    };

    var res = await fetch("/Payments/UpdateBasket", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(basket)
  });

    if (!res.ok) {
        showToast(`"------------------- 🛒`);

    }
}
function updateCartBadge() {

    const n = cart.reduce((s, x) => s + x.qty, 0);

    const badge = document.getElementById('cartBadge');

    badge.style.display = n ? 'flex' : 'none';

    badge.textContent=n;
}

function renderCart() {
    const el = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');
    document.getElementById('cartCount').textContent = cart.length ? `(${cart.reduce((s, x) => s + x.qty, 0)} items)` : '';
    if (!cart.length) {
        el.innerHTML = `<div class="cart-empty"><div class="ce-icon">🛒</div><div class="ce-title">Your cart is empty</div><div class="ce-sub">Add fragrances to begin</div></div>`;
        footer.innerHTML = `<button class="continue-btn" onclick="closeCart()">Continue Shopping</button>`;
        return;
    }
    el.innerHTML = cart.map(item => {
        const p = products.find(x => x.id === item.id); if (!p) return '';
        const col = CAT_COLORS[p.cat] || '#c8854a';
        return `<div class="cart-item">
        <div class="ci-emoji" style="background:linear-gradient(135deg,${col}22,${col}08)">
              <img src="${p.imageUrl}" style="width:40px;height:40px;object-fit:cover">
        </div>
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

    const subtotal = getCartTotal(), shipping = getCartShipping(), discount = getCartDiscount(), total = subtotal + shipping - discount;
    footer.innerHTML = `
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

function removeFromCart(id){cart = cart.filter(x => x.id !== id);updateCartBadge();renderCart();}

function changeCartQty(id,d){
  const item=cart.find(x=>x.id===id);
  const p=products.find(x=>x.id===id);
    if(!item||!p)return;
    item.qty=Math.max(1,Math.min(item.qty+d,p.stock));
    updateCartBadge();renderCart();
}

function getCartTotal(){return cart.reduce((s,x)=>{const p=products.find(pr=>pr.id===x.id);return s+(p?p.price*x.qty:0);},0);}
function getCartShipping(){return getCartTotal()>=250?0:18;}
function getCartDiscount(){return getCartTotal()>=400?Math.round(getCartTotal()*.05):0;}

function openCart(){renderCart();document.getElementById('cartBg').classList.add('open');document.getElementById('cartDrawer').classList.add('open');}
function closeCart(){document.getElementById('cartBg').classList.remove('open');document.getElementById('cartDrawer').classList.remove('open');}

// ────────────────────────────── CHECKOUT ──
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

//done
function renderCoRight(){
  const subtotal=getCartTotal(),shipping=getCartShipping(),discount=getCartDiscount(),total=subtotal+shipping-discount;
    document.getElementById('coRight').innerHTML=`
    <div class="co-right-title">Order Summary</div>
    ${cart.map(item => {
        const p = products.find(x => x.id === item.id); if (!p) return '';
        const col = CAT_COLORS[p.cat] || '#c8854a';
        return `<div class="co-item">
        <div class="co-item-emoji" style="background:linear-gradient(135deg,${col}22,${col}08)">
              <img src="${p.imageUrl}" style="width:40px;height:40px;object-fit:cover">
        </div>
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
        <div class="co-trust-item">↩ 15-day returns</div>
    </div>`;
}

function renderCoLeft(){
    const el=document.getElementById('coLeft');
    if(checkoutStep===1) el.innerHTML=renderStep1();
    else if(checkoutStep===2) el.innerHTML=renderStep2();
    else el.innerHTML=renderStep3();
}

/*************Start renderStep 1  ************* */

function renderStep1() {
    return `
    <div class="co-section">
        <div class="co-section-title">Contact Information</div>
        <div class="form-grid">

            <div class="form-group">
                <label class="form-label">Full Name</label>
                <input id="fullName" class="form-input" />
                <div class="error-msg" id="fullName-error"></div>
            </div>

            <div class="form-group">
                <label class="form-label">Email Address</label>
                <input id="email" class="form-input" type="email"/>
                <div class="error-msg" id="email-error"></div>
            </div>

            <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input id="phone" class="form-input" type="tel"/>
                <div class="error-msg" id="phone-error"></div>
            </div>

        </div>
    </div>

    <div class="co-section">
        <div class="co-section-title">Delivery Address</div>
        <div class="form-grid">

            <div class="form-group">
                <label class="form-label">Street</label>
                <input id="street" class="form-input"/>
                <div class="error-msg" id="street-error"></div>
            </div>

            <div class="form-group">
                <label class="form-label">State</label>
                <input id="state" class="form-input"/>
                <div class="error-msg" id="state-error"></div>
            </div>

            <div class="form-grid form-grid-2">

                <div class="form-group">
                    <label class="form-label">City</label>
                    <input id="city" class="form-input"/>
                    <div class="error-msg" id="city-error"></div>
                </div>

                <div class="form-group">
                    <label class="form-label">Postal Code</label>
                    <input id="zipCode" class="form-input"/>
                    <div class="error-msg" id="zipCode-error"></div>
                </div>

            </div>

        </div>
    </div>

    <button id="continueBtn" class="place-order-btn stop" disabled onclick="nextStep()" >
        Continue →
    </button>
`;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9+\s]{10,15}$/;

function validateField(id, validator, message) {

    const input = document.getElementById(id);
    const error = document.getElementById(id + "-error");

    if (!validator(input.value.trim())) {
        input.classList.add("input-error");
        error.textContent = message;
        return false;
    }

    input.classList.remove("input-error");
    error.textContent = "";
    return true;
}
function validateForm() {

    const v1 = validateField("fullName", v => v.length > 2, "Enter full name");
    const v2 = validateField("email", v => emailRegex.test(v), "Invalid email");
    const v3 = validateField("phone", v => phoneRegex.test(v), "Invalid phone number");

    const v4 = validateField("street", v => v.length > 3, "Enter street");
    const v5 = validateField("state", v => v.length > 2, "Enter state");
    const v6 = validateField("city", v => v.length > 2, "Enter city");
    const v7 = validateField("zipCode", v => v.length > 3, "Invalid zip");

    const valid = v1 && v2 && v3 && v4 && v5 && v6 && v7;

    const btn = document.getElementById("continueBtn");

    btn.disabled = !valid;

    if (valid) {
        btn.classList.remove("stop");
    } else {
        btn.classList.add("stop");
    }
}
document.addEventListener("input", function (e) {

    if (e.target.classList.contains("form-input")) {
        validateForm();
    }

});
/*************End renderStep 1  ************* */


/*************Start renderStep 2  ************* */
let selectedShipping2 = 'standard';

function renderStep2() {

    const methods = [
        { id: 'standard', label: 'DHL Standard', sub: '5–7 business days', price: 'Free' },
        { id: 'express', label: 'FedEx Express', sub: '2–3 business days', price: '$18' },
        { id: 'overnight', label: 'UPS Overnight', sub: 'Next business day', price: '$45' }
    ];

    return `
    <div class="co-section">

        <div class="co-section-title">Shipping Method</div>

        <div class="shipping-list">

            ${methods.map((m, i) => `

            <div class="pm-method ${i === 0 ? 'selected' : ''}" 
                 data-id="${m.id}" 
                 onclick="selectShipping('${m.id}',this)">

                <div class="pm-icon">
                    ${m.id === 'standard' ? '📦' : m.id === 'express' ? '🚀' : '⚡'}
                </div>

                <div>
                    <div class="pm-method-name">${m.label}</div>
                    <div class="pm-method-sub">${m.sub}</div>
                </div>

                <div class="pm-price ${m.price === 'Free' ? 'free' : ''}">
                    ${m.price}
                </div>

                <div class="pm-radio"></div>

            </div>

            `).join('')}

        </div>

        <div id="shippingError" class="error-msg"></div>

    </div>

    <div class="co-actions">

        <button class="btn-secondary" onclick="prevStep()">← Back</button>

        <button id="continueBtn2"
                class="place-order-btn"
                onclick="validateStep2()">
            Continue →
        </button>

    </div>
`;
}

function selectShipping(id, el) {

    selectedShipping2 = id;

    document.querySelectorAll(".pm-method")
        .forEach(x => x.classList.remove("selected"));

    el.classList.add("selected");

    document.getElementById("shippingError").textContent = "";
}

function validateStep2() {

    if (!selectedShipping2) {

        document.getElementById("shippingError")
            .textContent = "Please select a shipping method";

        return;
    }

    nextStep();
}
/*************End renderStep 2 ************* */


/*************Start renderStep 3 ************* */
function renderStep3() {

    const total = getCartTotal() + getCartShipping() - getCartDiscount();
    const methods = [
        { id: 'card', icon: 'fa-solid fa-credit-card', name: 'Credit / Debit Card', sub: 'Visa, Mastercard, Amex' },
        { id: 'paypal', icon: 'fa-brands fa-cc-paypal', name: 'PayPal', sub: 'Pay via PayPal account' },
        { id: 'stripe', icon: 'fa-brands fa-cc-stripe', name: 'Stripe Pay', sub: 'Quick' },
        { id: 'google', icon: 'fa-brands fa-google-pay', name: 'Google Pay', sub: 'Quick & secure' }
    ];

    return `
<div class="co-section">

    <div class="co-section-title">Payment Method</div>

    <div class="payment-methods">

    ${methods.map(m => `

        <div class="pm-method ${paymentMethod === m.id ? 'selected' : ''}"
             onclick="selectPayment('${m.id}',this)">

            <div class="pm-method-icon">
                <i class="${m.icon}"></i>
            </div>

            <div class="pm-info">
                <div class="pm-method-name">${m.name}</div>
                <div class="pm-method-sub">${m.sub}</div>
            </div>

            <div class="pm-radio"></div>

        </div>

    `).join('')}

        </div>

        <div id="paymentFields"></div>
        <div id="paymentError" class="error-msg"></div>

    </div>

    <div class="co-actions">

        <button class="btn-secondary"
                onclick="prevStep()">
            ← Back
        </button>

        <button id="placeOrderBtn"
                class="place-order-btn"
                onclick="validatePayment()">

            Place Order · $${total} 

        </button>

    </div>
`;
}
/*
 <div class="co-section">

        <div class="co-section-title">Promo Code</div>

        <div class="promo-box">

            <input id="promoInput"
                   class="form-input"
                   placeholder="Enter promo code…" />

            <button class="promo-btn"
                    onclick="applyPromo()">
                Apply
            </button>

        </div>

    </div>

*/

function validatePayment() {

    if (!paymentMethod) {

        document.getElementById("paymentError")
            .textContent = "Please select a payment method";

        return;
    }

    placeOrder();

}
function selectPayment(id,el){
    paymentMethod = id;
    document.querySelectorAll('.pm-method').forEach(x=>x.classList.remove('selected'));
    el.classList.add('selected');

    document.getElementById("paymentError").textContent = "";

    renderPaymentFields();
}
/*************End renderStep 3 ************* */

let selectedShipping;
function selectShipping(id, el) {

    selectedShipping = id;

    el.closest('.co-section')
        .querySelectorAll('.pm-method')
        .forEach(x => x.classList.remove('selected'));

    el.classList.add('selected');
}


function applyPromo(){
  const val=document.getElementById('promoInput')?.value?.toUpperCase();
    if(val==='SILLAGE20')showToast('Promo code applied! 20% off 🎉');
    else showToast('Invalid promo code');
}

function formatCard(el){el.value = el.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);}
function formatExpiry(el){el.value = el.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1 / $2').slice(0, 7);}

function nextStep()
{

    if (checkoutStep < 3)
    {

        checkoutStep++;
        renderCoSteps();
        renderCoLeft();
        if (checkoutStep === 3)
            setTimeout(renderPaymentFields, 50);
    }
}
function prevStep(){if(checkoutStep>1){checkoutStep--;renderCoSteps();renderCoLeft();}}


function continueShopping() {
        document.getElementById('successScreen').classList.remove('open');
    applyFilters();
}


// ─────────────────────────────────────────────
// STRIPE SETUP
// ─────────────────────────────────────────────

let elements;

function initStripe() {

    stripe = Stripe("sk_test_51S6NTkGi2aZxBBEW0HQ5rkyS8GklPxY5XljZj4vZwpR9eir6g0PNBQOjI1bE7Kh4EgbowiLAyaC0A8FW7N3FmDRf00apkL3TCA");

    elements = stripe.elements();

    cardElement = elements.create("card", {
        style: {
            base: {
                fontSize: "16px",
                color: "#32325d"
            }
        }
    });

    cardElement.mount("#card-element");
}


// ─────────────────────────────────────────────
// CREATE PAYMENT INTENT
// ─────────────────────────────────────────────
function validateCheckout() {

    const fullName = document.querySelector("#fullName")?.value.trim();
    const email = document.querySelector("#email")?.value.trim();
    const city = document.querySelector("#city")?.value.trim();
    const zipCode = document.querySelector("#zipCode")?.value.trim();
    const street = document.querySelector("#street")?.value.trim();
    const state = document.querySelector("#state")?.value.trim();

    if (!fullName) {
        alert("Full name is required");
        return null;
    }

    if (!email || !email.includes("@")) {
        alert("Valid email is required");
        return null;
    }

    if (!city) {
        alert("City is required");
        return null;
    }

    if (!zipCode) {
        alert("Zip code is required");
        return null;
    }

    if (!street) {
        alert("Street is required");
        return null;
    }

    if (!state) {
        alert("State is required");
        return null;
    }

    return {
        basketId: basketId,
        deliveryMethodId: 1,
        shipAddress: {
            firstName: fullName,
            buyerEmail: email,
            city: city,
            zipCode: zipCode,
            street: street,
            state: state
        }
    };
}

async function createPaymentIntent() {

    //const model = {

    //    basketId: basketId,

    //    deliveryMethodId: 1,

    //    shipAddress: {
    //        firstName: document.querySelector("#fullName")?.value || "Ali",
    //        BuyerEmail: document.querySelector("#email")?.value || "test",
    //        city: document.querySelector("#city")?.value || "Cairo",
    //        zipCode: document.querySelector("#zipCode")?.value || "11511",
    //        street: document.querySelector("#street")?.value || "Corniche",
    //        state: document.querySelector("#state")?.value || "Cairo"
    //    }
    //};

    const model = validateCheckout();


    const response = await fetch("/Payments/CreatePaymentIntent", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(model)

    });

    return await response.json();
}




// ─────────────────────────────────────────────
// PLACE ORDER (PAYMENT)
// ─────────────────────────────────────────────
async function placeOrder() {

    const model = {

        basketId: basketId,

        deliveryMethodId: selectedShipping,

        shipAddress: {
            firstName: "Customer",
            lastName: "User",
            city: "Cairo",
            zipCode: "11511",
            street: "Corniche",
            state: "Cairo"
        }
    };

    const response = await fetch("/Payments/CreatePaymentIntent", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(model)

    });

    const data = await response.json();

    const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
            card: cardElement
        }
    });

    if (result.error) {
        showToast(result.error.message);
        return;
    }

    if (result.paymentIntent.status === "succeeded") {
        showToast("Payment Successful 🎉");
    }
}


// ─────────────────────────────────────────────
// PAYMENT METHOD SELECT
// ─────────────────────────────────────────────
function renderPaymentFields() {

    const el = document.getElementById('paymentFields');

    if (paymentMethod === 'card') {

        el.innerHTML = `
        <div class="card-fields">

            <label class="form-label">Card Details</label>

            <div id="card-element"
                 style="padding:12px;border:1px solid #ddd;border-radius:8px">
            </div>

            <div id="card-errors"
                 style="color:red;margin-top:10px">
            </div>

        </div>
        `;

        stripe = Stripe("pk_test_YOUR_PUBLIC_KEY");

        const elements = stripe.elements();

        cardElement = elements.create("card", {
            style: {
                base: {
                    fontSize: "16px",
                    color: "#32325d"
                }
            }
        });

        cardElement.mount("#card-element");

        cardElement.on("change", function (event) {

            const displayError = document.getElementById("card-errors");

            if (event.error) {
                displayError.textContent = event.error.message;
            }
            else {
                displayError.textContent = "";
            }

        });

    }
}






















































// ── WISHLIST ──
function toggleWishlistItem(id){
  if(wishlist.has(id))wishlist.delete(id);else wishlist.add(id);
    applyFilters();
  const p=products.find(x=>x.id===id);
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



function toggleNav() {
    document.getElementById("navLinks").classList.toggle("open");
}