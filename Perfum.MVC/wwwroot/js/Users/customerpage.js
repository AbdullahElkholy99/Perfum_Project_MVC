
let wishlist=new Set();
let catFilter='all';
let modalProduct=null;
let modalQty=1;
let checkoutStep=1;
let dark=false;

// ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── PRODUCT MODAL  Done ──
async function openProductModal(id) {

    var response = await fetch(`Product/DetailsById/${id}`);

    if (!response.ok) {
        showToast(`Error When Show Product Details`);
    }

    var product = await response.json();
    if (!product) return;


    document.getElementById("pmHeroImg").src = product.imageUrl;
    document.getElementById('pmCat').textContent = `${product.categoryName} - ${product.size_Ml} ML`;
    document.getElementById('pmName').textContent = product.name;
    document.getElementById('pmTagline').textContent = product.descreption;
    document.getElementById('pmPrice').textContent = `${product.price} $ - `;
    document.getElementById('pmSize').textContent = `${product.size_Ml} ML`;
    document.getElementById('pmTotal').textContent = `${product.price}`;
 
    document.getElementById('pmDetails').innerHTML = [
        { l: 'Rating', v: `★ ${4.5} (${86} reviews)` },
        { l: 'Stock', v: product.stock > 0 ? `${product.stock} units` : 'Out of stock' },
        { l: 'Longevity', v: '8–12 hours' },
    ].map(d=>`<div class="pm-detail"><div class="pm-detail-label">${d.l}</div><div class="pm-detail-val">${d.v}</div></div>`).join('');

    const outOfStock = product.stock === 0;


    document.getElementById('pmAddBtn').disabled = outOfStock;

    document.getElementById('pmAddBtn').textContent = outOfStock ? 'Out of Stock' : '';

    if (!outOfStock) {
        document.getElementById('pmAddBtn').innerHTML = `Add to Cart — <span id="pmTotal">$${product.price}</span>`;
    }

    document.getElementById('modalBg').classList.add('open');

    document.getElementById("pmAddBtn").addEventListener("click", function () {

        if (!product) return;

        quickAdd(
            product.id,
            product.name,
            product.price,
            product.imageUrl,
            product.stock,
            product.size_Ml
        );

    });
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
}

// ------------------------------------------ Start Cart Code : -------------------------------------

let basketId = localStorage.getItem("basketId") || crypto.randomUUID();

localStorage.setItem("basketId", basketId);

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const currentCustomer = window.customerId || "guest";

cart = cart.filter(x => x.customerId === currentCustomer);
let products = [];

// ── CART ──

// add perfum into my cart 
function quickAdd(id, name, price, imageUrl, stock, size_Ml) {
    const product = {
        id: id,
        name: name,
        imageUrl: imageUrl,

        price: price,
        stock: stock,
        size: size_Ml,
    }
    if (!products.find(x => x.id === id)) {
        products.push(product)
    }
    addToCart(product, 1);
}

//function addToCart(product, qty = 1) {

//    const id = product.id
//    const p = products.find(x => x.id === id);

//    if (!product || product.stock === 0) return;

//    const existing = cart.find(x => x.id === id);

//    if (existing) {
//        existing.qty = Math.min(existing.qty + qty, product.stock);
//    }
//    else {
//        cart.push({
//            id: product.id,
//            qty: Math.min(qty, product.stock),
//            name: product.name,
//            price: product.price,
//            image: product.imageUrl,
//            size: product.size,
//            cat: product.cat,
//            customerId: window.customerId
//        });
//    }

//    localStorage.setItem("cart", JSON.stringify(cart));

//    updateCartBadge();
//    renderCart();

//    showToast(`"${p.name}" added to cart 🛒`);
//}
function addToCart(product, qty = 1) {

    const id = product.id;
    const p = products.find(x => x.id === id);

    if (!product || product.stock === 0) return;

const currentCustomer = window.customerId || "guest";

    const existing = cart.find(x => x.id === id);

    if (existing) {
        existing.qty = Math.min(existing.qty + qty, product.stock);
    }
    else {
        cart.push({
            id: product.id,
            qty: Math.min(qty, product.stock),
            name: product.name,
            price: product.price,
            image: product.imageUrl,
            size: product.size,
            cat: product.cat,
            customerId: currentCustomer
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartBadge();
    renderCart();

    showToast(`"${p.name}" added to cart 🛒`);
}

function updateCartBadge() {

    const n = cart.reduce((s, x) => s + x.qty, 0);
    const badge = document.getElementById('cartBadge');

    badge.style.display = n ? 'flex' : 'none';

    badge.textContent=n;
}

// i understand it 
function renderCart() {

    //if (window.customerId !== cart.customerId) {
    //    showToast("You Have Empty  ");

    //    return;
    //}

    const el = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');
    document.getElementById('cartCount').textContent = cart.length ? `(${cart.reduce((s, x) => s + x.qty, 0)} items)` : '';
    if (!cart.length) {
        el.innerHTML = `<div class="cart-empty"><div class="ce-icon"> <i class="fa-solid fa-cart-arrow-down"></div><div class="ce-title">Your cart is empty</div><div class="ce-sub">Add Perfum to begin</div></div>`;
        footer.innerHTML = `<button class="continue-btn" onclick="closeCart()">Continue Shopping</button>`;
        return;
    }

    // render perfums onto my cart 
    el.innerHTML = cart.map(item => {
        let p = item;

        let img = p.image.replace(/^~\//, "/");

        if (!p) return '';
        const col = '#c8854a';
        return `<div class="cart-item">
        <div class="ci-emoji" >
              <img src="/${p.image}" style="width:40px;height:40px;object-fit:cover">
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

    // footer of my cart
    footer.innerHTML = `
    <div class="cart-summary">
        <div class="cs-row"><span class="cs-label">Subtotal</span><span>$${subtotal}</span></div>
        <div class="cs-row"><span class="cs-label">Shipping</span><span>${shipping === 0 ? '<span style="color:var(--green)">Free</span>' : '$' + shipping}</span></div>
        ${discount ? `<div class="cs-row"><span class="cs-label">Loyalty Discount (5%)</span><span style="color:var(--green)">−$${discount}</span></div>` : ''}
        ${subtotal < 250 ? `<div style="font-size:10px;color:var(--accent);letter-spacing:.08em;margin:6px 0">Add $${250 - subtotal} more for free shipping</div>` : ''}
        <div class="cs-row total"><span class="cs-label">Total</span><span class="cs-val">$${total}</span></div>
    </div>
    <button class="checkout-btn" onclick="openCheckout()">Proceed to Checkout →</button>
    <button class="continue-btn" onclick="closeCart()">Continue Shopping</button>`
        ;
}
 // i understand it 
function removeFromCart(id) {
    cart = cart.filter(x => x.id !== id);
    updateCartBadge();
    renderCart();
}

// i understand it 
function changeCartQty(id,d){
  const item=cart.find(x=>x.id===id);
  const p=products.find(x=>x.id===id);
    if(!item||!p)return;
    item.qty=Math.max(1,Math.min(item.qty+d,p.stock));
    updateCartBadge();renderCart();
}

// i understand it 
function getCartTotal() {
    return cart.reduce((s, x) => s + x.price * x.qty, 0);
}

// i understand it 
function getCartShipping(){return getCartTotal()>=250?0:18;}

// i understand it 
function getCartDiscount(){return getCartTotal()>=400?Math.round(getCartTotal()*.05):0;}

// i understand it 
function openCart() {
    renderCart(); document.getElementById('cartBg').classList.add('open');
    document.getElementById('cartDrawer').classList.add('open');
}

// i understand it 
function closeCart() {
    document.getElementById('cartBg').classList.remove('open');
    document.getElementById('cartDrawer').classList.remove('open');
}

// ────────────────────────────── CHECKOUT ──
function openCheckout() {

    if (!isLoggedIn) {
        showToast("Please login first 🔐");

        setTimeout(() => {
            window.location.href = "/Account/Login";
        }, 1000);

        return;
    }


    closeCart();
    renderCheckout();
    document.getElementById('checkoutOverlay').classList.add('open');
}
// i understand it 
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
        const col =  '#c8854a';
        return `<div class="co-item">
        <div class="co-item-emoji" style="background:linear-gradient(135deg,${col}22,${col}08)">
              <img src="${p.imageUrl}" style="width:40px;height:40px;object-fit:cover">
        </div>
        <div><div class="co-item-name">${p.name}</div><div class="co-item-meta">${p.size} · Quantity ${item.qty}</div></div>
        <div class="co-item-price">$${p.price * item.qty}</div>
      </div>`;
    }).join('')}
    <div class="co-divider"></div>
    <div class="co-summary-row"><span class="co-s-label"><strong> Subtotal</strong></span><span>$${subtotal}</span></div>
    <div class="co-summary-row"><span class="co-s-label"><strong>Shipping</strong></span><span>${shipping === 0 ? '<span style="color:var(--green)">Free</span>' : '$' + shipping}</span></div>
    ${discount ? `<div class="co-summary-row"><span class="co-s-label"><strong>Discount</strong></span><span style="color:var(--green)">−$${discount}</span></div>` : ''}
    <div class="co-summary-row total"><span class="co-s-label"><strong>Total</strong></span><span class="co-s-val">$${total}</span></div>
    <div class="co-trust">
        <div class="co-trust-item"><i class="fa-solid fa-shield-halved"></i> Secure checkout</div>
        <div class="co-trust-item"><i class="fa-solid fa-boxes-stacked"></i> Tracked delivery</div>
        <div class="co-trust-item"><i class="fa-solid fa-circle-left"></i> 15-day returns</div>
    </div>`;
}

function renderCoLeft(){
    const el=document.getElementById('coLeft');
    if(checkoutStep===1) el.innerHTML=renderStep1();
    else if(checkoutStep===2) el.innerHTML=renderStep2();
    else el.innerHTML=renderStep3();
}

/*************Start renderStep 1  ************* */
let customerInfo;
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
let selectedShippingId2=1;

function renderStep2() {

    const methods = [
        { id:1,title: 'standard', label: 'DHL Standard', sub: '5–7 days', price: 'Free' },
        { id:2,title: 'express', label: 'FedEx Express', sub: '2–3 days', price: '$18' },
        { id:3,title: 'overnight', label: 'UPS Overnight', sub: 'Next day', price: '$45' }
    ];
    //document.getElementById("coRight").style.display = none;
    return `
    <div class="co-section">

        <div class="co-section-title">Shipping Method</div>

        <div class="shipping-list">

            ${methods.map((m, i) => `

            <div class="pm-method ${i === 0 ? 'selected' : ''}" 
                 data-id="${m.id}" 
                 onclick="selectShipping('${m.id}','${m.title}',this)">

             <div class="pm-icon">
                 ${
                                m.id === 'standard'
                                    ? '<i class="fa-solid fa-box"></i>'
                                    : m.id === 'express'
                                        ? '<i class="fa-solid fa-truck-fast"></i>'
                                        : '<i class="fa-solid fa-bolt"></i>'
                 }
            </div>
                <div>
                    <div class="pm-method-name">${m.label}</div>
                    <div class="pm-method-sub">Arrive within :${m.sub}</div>
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

function selectShipping(id,title, el) {

    selectedShipping2 = title;
    selectedShippingId2 = id;

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
let paymentMethod = 'card';
let paymentMethodId = 1;

function renderStep3() {

    const total = getCartTotal() + getCartShipping() - getCartDiscount();
    const methods = [
        { id: 1,title:'card', icon: 'fa-solid fa-credit-card', name: 'Credit / Debit Card', sub: 'Visa, Mastercard, Amex' },
        { id: 2,title:'paypal', icon: 'fa-brands fa-cc-paypal', name: 'PayPal', sub: 'Pay via PayPal account' },
        { id: 3,title:'stripe', icon: 'fa-brands fa-cc-stripe', name: 'Stripe Pay', sub: 'Quick' },
        { id: 4,title:'google', icon: 'fa-brands fa-google-pay', name: 'Google Pay', sub: 'Quick & secure' }
    ];

    return `
    <div class="co-section">

        <div class="co-section-title">Payment Method</div>

        <div class="payment-methods">

        ${methods.map(m => `

            <div class="pm-method ${paymentMethod === m.title ? 'selected' : ''}"
                 onclick="selectPayment('${m.id}','${m.title}',this)">

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

            <div id="paymentFields">paymentFields</div>
            <div id="paymentError" class="error-msg"></div>

        </div>
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

        <div class="co-actions">

            <button class="btn-secondary"
                    onclick="prevStep()">
                ← Back
            </button>

            <button id="placeOrderBtn"
                    class="place-order-btn"
                    onclick="placeOrder()">

                Place Order · $${total} 

            </button>

        </div>
    `;
}
 

function validatePayment() {

    if (!paymentMethod) {

        document.getElementById("paymentError")
            .textContent = "Please select a payment method";

        return;
    }

    placeOrder();

}
function selectPayment(id,title,el){
    paymentMethod = title;
    paymentMethodId = id;
 
    document.querySelectorAll('.pm-method').forEach(x=>x.classList.remove('selected'));
    el.classList.add('selected');

    document.getElementById("paymentError").textContent = "";

    renderPaymentFields();
}
/*************End renderStep 3 ************* */
 
function applyPromo(){
  const val=document.getElementById('promoInput')?.value?.toUpperCase();
    if(val==='SILLAGE20')showToast('Promo code applied! 20% off 🎉');
    else showToast('Invalid promo code');
}

function formatCard(el){el.value = el.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);}
function formatExpiry(el){el.value = el.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1 / $2').slice(0, 7);}

function nextStep()
{
    if (checkoutStep === 1)
      customerInfo = validateCheckout();
    if (checkoutStep === 2)
        customerInfo.deliveryMethodId = selectedShippingId2;

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
let stripe;
let cardElement;
function initStripe() {

    stripe = Stripe("pk_test_51S6NTkGi2aZxBBEW4bu35Zun14tFao7Va9AsOiw6PoACEo2TNDCTvR0gKQPFEURg0fnnm0F2VBykq9oxuw4oy7mZ00X6XuWLKH");

    elements = stripe.elements();

}
initStripe();
// ─────────────────────────────────────────────
// CREATE PAYMENT INTENT
// ─────────────────────────────────────────────
async function createPaymentIntent() {

    const model = customerInfo;

    const response = await fetch("/Payments/CreatePaymentIntent", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(model)

    });

    return await response.json();
}


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

    if (!selectedShipping2) {
        alert("Method Shipping is required");
        return null;
    }
    return {
        basketId: basketId,
        deliveryMethodId: 1,
        buyerEmail: email,
        shipAddress: {
            fullName: fullName,
            city: city,
            zipCode: zipCode,
            street: street,
            state: state
        }
    };
}


// ─────────────────────────────────────────────
// PLACE ORDER (PAYMENT)
// ─────────────────────────────────────────────
async function placeOrder() {
    if (!cardElement) {
        showToast("Enter card details");
        return;
    }
    //const model = customerInfo;

    const model = {
        buyerEmail: customerInfo.buyerEmail,
        deliveryMethodId: customerInfo.deliveryMethodId,
        shipAddress: customerInfo.shipAddress,
        customerId: window.customerId,
        basketItems: cart.map(x => ({
            id: x.id,
            quantity: x.qty
        }))
    };

    const response = await fetch("/Payments/CreatePaymentIntent", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(model)

    });
  
    if (!response.ok) {
        showToast("Payment failed");
        return;
    }

    const data = await response.json();

    if (!stripe) {
        showToast("Stripe not initialized");
        return;
    }

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

        localStorage.removeItem("basketId");
        localStorage.removeItem("cart");

        cart = [];
        //setTimeout(() => {
            window.location.href = "/Home/Index";
        //}, 1200);
    }

}


// ─────────────────────────────────────────────
// PAYMENT METHOD SELECT
// ─────────────────────────────────────────────
function renderPaymentFields() {

    const el = document.getElementById("paymentFields");

    if (paymentMethod === "stripe") {

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

        // إزالة القديم
        if (cardElement) {
            cardElement.unmount();
        }

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
            } else {
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
    document.getElementById('themeBtn').innerHTML =
        dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>'; }

// ── UTILS ──
function scrollToShop(){document.getElementById('shopSection').scrollIntoView({ behavior: 'smooth' });}
function setNavActive(el){document.querySelectorAll('.nav-link').forEach(x => x.classList.remove('active'));el.classList.add('active');}
function showToast(msg){const t=document.getElementById('toast');document.getElementById('toastMsg').textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2800);}

function toggleNav() {
    document.getElementById("navLinks").classList.toggle("open");
}


// --------------------------- Footer :
function subscribeNewsletter() {
    const el = document.getElementById('nlEmail');
    const v = el.value.trim();
    if (!v || !v.includes('@')) {
        el.style.borderColor = '#c97a7a';
        el.focus();
        setTimeout(() => el.style.borderColor = '', 1600);
        return;
    }
    el.value = '';
    el.placeholder = '✓ You\'re subscribed — thank you!';
    el.style.borderColor = 'var(--green)';
    setTimeout(() => {
        el.placeholder = 'Your email address';
        el.style.borderColor = '';
    }, 4000);
}


//pagination

const paginationproducts = document.querySelectorAll(".prod-card");
const perPage = 12;

let currentPage = 1;
const totalProducts = paginationproducts.length;
const totalPages = Math.ceil(totalProducts / perPage);

const pageInfo = document.getElementById("pageInfo");
const pagesContainer = document.getElementById("pagesContainer");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");

function showPage(page) {

    const start = (page - 1) * perPage;
    const end = start + perPage;

    paginationproducts.forEach((card, index) => {

        // خروج
        card.classList.add("fade-out");

        setTimeout(() => {

            if (index >= start && index < end) {
                card.style.display = "block";
                card.classList.remove("fade-out");
                card.classList.add("fade-in");
            }
            else {
                card.style.display = "none";
            }

        }, 200);

    });

    currentPage = page;
    updatePagination();
}

function updatePagination() {

    pagesContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {

        const btn = document.createElement("div");
        btn.className = "page-btn";
        btn.innerText = i;

        if (i === currentPage) btn.classList.add("active");

        btn.onclick = () => showPage(i);

        pagesContainer.appendChild(btn);
    }

    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(currentPage * perPage, totalProducts);

    pageInfo.innerText = `Showing ${start}–${end} of ${totalProducts}`;
}

prevBtn.onclick = () => {
    if (currentPage > 1) showPage(currentPage - 1);
};

nextBtn.onclick = () => {
    if (currentPage < totalPages) showPage(currentPage + 1);
};

showPage(1);

////////////////// Fiters
document.addEventListener("DOMContentLoaded", function () {
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    renderCart();
    updateCartBadge();






    /* ── MIST LINES ── */
    const mistContainer = document.getElementById('mistLines');

    if (mistContainer) {
        const lineCount = 18;

        for (let i = 0; i < lineCount; i++) {

            const el = document.createElement('div');
            el.className = 'mist-line';

            const leftPct = Math.random() * 100;
            const height = 80 + Math.random() * 200;
            const dur = 8 + Math.random() * 14;
            const delay = -(Math.random() * dur);

            el.style.cssText =
                `left:${leftPct}%;height:${height}px;animation-duration:${dur}s;animation-delay:${delay}s;`;

            mistContainer.appendChild(el);
        }
    }

    /* ── MARQUEE CONTENT ── */

    const marqueeItems = [
        '✦ Free Shipping Over $250',
        '✦ Complimentary Samples',
        '✦ Luxury Gift Wrapping',
        '✦ Easy 30-Day Returns',
        '✦ Rare Botanicals',
        '✦ Master Perfumers',
        '✦ Spring 2026 Collection',
        '✦ New Arrivals Now Live'
    ];

    const track = document.getElementById('marqueeTrack');

    if (track) {
        [...marqueeItems, ...marqueeItems].forEach(text => {

            const item = document.createElement('span');
            item.className = 'marquee-item';
            item.innerHTML = `${text} <span class="marquee-sep">·</span>`;

            track.appendChild(item);

        });
    }

    /* ── PARALLAX ── */

    const bottleWrap = document.getElementById('bottleWrap');

    if (bottleWrap) {

        document.addEventListener('mousemove', (e) => {

            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;

            const dx = (e.clientX - cx) / cx;
            const dy = (e.clientY - cy) / cy;

            bottleWrap.style.transform =
                `rotate(${dx * 3}deg) rotateX(${-dy * 4}deg)`;

        });

    }

    /******************************************************/

    const cards = document.querySelectorAll(".prod-card");
    const searchInput = document.getElementById("shopSearch");
    const grid = document.querySelector(".prod-grid");

    function applyFilters() {

        const searchValue = searchInput.value.toLowerCase();
        const sortValue = sortSelect.value;

        let visibleCards = [];

        //   Search
        cards.forEach(card => {

            const name = card.querySelector(".card-name").innerText.toLowerCase();

            if (name.includes(searchValue)) {

                card.style.display = "block";
                card.classList.remove("filter-hide");
                card.classList.add("filter-show");

                visibleCards.push(card);

            } else {

                card.classList.add("filter-hide");

                setTimeout(() => {
                    card.style.display = "none";
                }, 200);
            }

        });

    }

    window.applyFilters = applyFilters;

    window.sortProducts = function () {

        const sortValue = document.getElementById("sortSel").value;

        let sortedCards = [...cards];

        // Price Low → High
        if (sortValue === "price-asc") {

            sortedCards.sort((a, b) => {

                const priceA = parseFloat(a.querySelector(".card-price").innerText.replace("$", ""));
                const priceB = parseFloat(b.querySelector(".card-price").innerText.replace("$", ""));

                return priceA - priceB;
            });

        }

        // Price High → Low
        if (sortValue === "price-desc") {

            sortedCards.sort((a, b) => {

                const priceA = parseFloat(a.querySelector(".card-price").innerText.replace("$", ""));
                const priceB = parseFloat(b.querySelector(".card-price").innerText.replace("$", ""));

                return priceB - priceA;
            });

        }

        // Name A-Z
        if (sortValue === "name") {

            sortedCards.sort((a, b) => {

                const nameA = a.querySelector(".card-name").innerText;
                const nameB = b.querySelector(".card-name").innerText;

                return nameA.localeCompare(nameB);
            });

        }

        // Animation + reorder
        sortedCards.forEach((card, index) => {

            card.classList.add("sort-hide");

            setTimeout(() => {

                grid.appendChild(card);
                card.classList.remove("sort-hide");
                card.classList.add("sort-show");

            }, index * 70);

        });

    };
});


function toggleUserMenu() {
    const menu = document.getElementById("userMenu");
    menu.classList.toggle("show");
}

document.addEventListener("click", (e) => {
    const menu = document.getElementById("userMenu");
    if (!e.target.closest(".nav-user")) {
        menu.classList.remove("show");
    }
});


/***-*******************************start contuct us */
/* ═══════════════════════════════════════════════════════
CONTACT US SECTION — JavaScript
Add this block to the bottom of customerpage.js
═══════════════════════════════════════════════════════ */

/* ── Topic config ── */
const contactTopicConfig = {
    order: {
        title: 'Order <span>Assistance</span>',
        desc: "Need help with an existing order? Share your details and we'll follow up within 2 hours.",
        showOrderField: true, showProductField: false,
        msgLabel: 'Describe Your Issue'
    },
    product: {
        title: 'Fragrance <span>Advice</span>',
        desc: 'Our specialists will craft a personalised recommendation just for you.',
        showOrderField: false, showProductField: true,
        msgLabel: 'Tell Us About Your Preferences'
    },
    shipping: {
        title: 'Shipping <span>Enquiry</span>',
        desc: "Questions about delivery, tracking, or customs? We'll sort it out quickly.",
        showOrderField: true, showProductField: false,
        msgLabel: 'Your Shipping Question'
    },
    other: {
        title: 'Get in <span>Touch</span>',
        desc: "Anything else on your mind? Our atelier team is always happy to help.",
        showOrderField: false, showProductField: false,
        msgLabel: 'Your Message'
    }
};

function setContactTopic(el) {
    document.querySelectorAll('.ctopic').forEach(t => t.classList.remove('active'));
    el.classList.add('active');

    const topic = el.dataset.topic;
    const cfg = contactTopicConfig[topic];

    document.getElementById('cformTitle').innerHTML = cfg.title;
    document.getElementById('cformDesc').textContent = cfg.desc;
    document.getElementById('cMsgLabel').textContent = cfg.msgLabel;

    const orderGroup = document.getElementById('cOrderGroup');
    const productGroup = document.getElementById('cProductGroup');

    orderGroup.style.display = cfg.showOrderField ? '' : 'none';
    productGroup.style.display = cfg.showProductField ? '' : 'none';
}

/* ── Form submission ── */
function submitContactForm() {
    const name = document.getElementById('cFirstName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const msg = document.getElementById('cMessage').value.trim();

    if (!name) {
        shakeContactField('cFirstName');
        showToast('Please enter your name');
        return;
    }
    if (!email || !email.includes('@')) {
        shakeContactField('cEmail');
        showToast('Please enter a valid email address');
        return;
    }
    if (!msg) {
        shakeContactField('cMessage');
        showToast('Please write your message');
        return;
    }

    // Generate reference number
    const ref = '#REF-2026-' + Math.floor(Math.random() * 9000 + 1000);
    document.getElementById('cformRef').textContent = ref;

    // Show success overlay
    document.getElementById('cformSuccess').classList.add('show');
}

function resetContactForm() {
    document.getElementById('cformSuccess').classList.remove('show');
    document.getElementById('cFirstName').value = '';
    document.getElementById('cLastName').value = '';
    document.getElementById('cEmail').value = '';
    document.getElementById('cMessage').value = '';
    const orderNum = document.getElementById('cOrderNum');
    if (orderNum) orderNum.value = '';
}

function shakeContactField(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.borderColor = 'var(--rose)';
    el.style.boxShadow = '0 0 0 3px rgba(201,122,122,.15)';
    el.style.animation = 'cShake .35s ease-out';
    setTimeout(() => {
        el.style.borderColor = '';
        el.style.boxShadow = '';
        el.style.animation = '';
    }, 800);
}

function showContactToast(msg) {
    showToast(msg); // reuse your existing showToast / toast element
}

/* ── FAQ accordion ── */
function toggleCFaq(item) {
    const wasOpen = item.classList.contains('cfaq-open');
    document.querySelectorAll('.cfaq-item').forEach(f => f.classList.remove('cfaq-open'));
    if (!wasOpen) item.classList.add('cfaq-open');
}

/* ── Shake keyframe (inject once) ── */
(function injectContactStyles() {
    if (document.getElementById('contactShakeStyle')) return;
    const s = document.createElement('style');
    s.id = 'contactShakeStyle';
    s.textContent = `
        @keyframes cShake {
            0%,100%{ transform: translateX(0) }
            20%    { transform: translateX(-7px) }
            60%    { transform: translateX(7px)  }
            80%    { transform: translateX(-4px) }
        }
        @keyframes popIn {
            from { transform: scale(0); }
            to   { transform: scale(1); }
        }
    `;
    document.head.appendChild(s);
})();
                /***-*******************************end contuct us */