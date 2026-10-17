/* Sundae Club static storefront. No framework or build process required.
   For live COD order notifications, set STORE_WHATSAPP to the store number in international digits.
   Example: const STORE_WHATSAPP = "919876543210"; (no +, spaces, or dashes). */
(() => {
  'use strict';
  const STORE_WHATSAPP = '';
  const PRICE = 999;
  const Whip = 499;
  const SHIPPING_FEE = 99;
  const FREE_SHIPPING_AT = 1499;
  const STORAGE_KEYS = { cart: 'sundaeClubCart_v1', orders: 'sundaeClubOrders_v1' };
  const asset = (name) => `assets/${name}`;
  const products = [
    { id:'coconut-lime', name:'Coconut + Lime', category:'scrub', label:'Body scrub', description:'A fresh, zesty little reset with creamy coconut vibes.', scent:'Fresh • Creamy • Zesty', image:asset('Line.png'), badge:'Fresh fave', details:'A whipped body scrub inspired by juicy lime and creamy coconut. A feel-good ritual for skin that loves a little polish.', benefits:['Buffs away dullness','Creamy coconut + lime scent','Leaves skin feeling smooth','A feel-good shower ritual'] },
    { id:'berry-milkshake', name:'Peach + Cherry Blossoms ', category:'scrub', label:'Body scrub', description:'Berry-sweet, pink, and basically a shower-day dessert.', scent:'Berry • Sweet • Playful', image:asset('Peach.png'), badge:'Pink crush', details:'A dessert-inspired whipped scrub with a berry milkshake mood. Turn an everyday shower into the sweetest part of your day.', benefits:['Buffs away dullness','Sweet berry-inspired scent','Whipped, treat-like texture','Made for feel-good me-time'] },
    { id:'chocolate-vanilla', name:'Turmeric + Saffron', category:'scrub', label:'Body scrub', description:'Rich, cozy indulgence with chocolate-and-vanilla energy.', scent:'Rich • Cozy • Indulgent', image:asset('Turmeric.png'), badge:'Cozy fave', details:'Rich dessert energy, whipped texture and a chocolate-vanilla scent inspiration for a cozy, indulgent body-care moment.', benefits:['Buffs away dullness','Chocolate + vanilla scent','Treat-like whipped texture','A cozy body-care ritual'] },
    { id:'mango-sorbet', name:'Papaya + <br> Pomegranate Seeds', category:'scrub', label:'Body scrub', description:'Juicy, sunny, happy mango energy in a whipped scrub.', scent:'Juicy • Sunny • Happy', image:asset('Papaya.png'), badge:'Sunny mood', details:'A bright, mango-inspired whipped scrub made for a juicy, sunny, happy shower ritual.', benefits:['Buffs away dullness','Juicy mango-inspired scent','Leaves skin feeling soft','A bright, feel-good ritual'] },
    { id:'whipping-cream', name:'Whipping Cream', category:'body-butter', price: Whip, label:'Body butter', description:'A dreamy whipped body butter for soft, touch-me skin.', scent:'Creamy • Soft • Comforting', image:asset('whipping-cream-product.png'), badge:'Moisture treat', details:'A moisturizing body butter with a whipped, dessert-inspired look and a skin-softening ritual at its heart.', benefits:['Deep moisture feel','Soft, smooth skin ritual','Skin-loving body care','Perfect post-shower treat'] },
   
  ];
  const formatINR = n => `₹${Number(n || 0).toLocaleString('en-IN')}`;
  const byId = id => products.find(p => p.id === id);
  const safeParse = (value, fallback) => { try { const v = JSON.parse(value); return v ?? fallback; } catch { return fallback; } };
  function storageGet(key, fallback) { try { return safeParse(localStorage.getItem(key), fallback); } catch { return fallback; } }
  function storageSet(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } }
  let cart = storageGet(STORAGE_KEYS.cart, {});
  if (!cart || typeof cart !== 'object' || Array.isArray(cart)) cart = {};
  let currentFilter = 'all';
  let currentSearch = '';
  let pdpQty = 1;
  let activeOrderText = '';
  let toastTimer = null;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  function lineCount() { return Object.values(cart).reduce((sum, qty) => sum + Math.max(0, Number(qty) || 0), 0); }
  function cartItems() { return Object.entries(cart).map(([id, qty]) => ({ product:byId(id), qty:Number(qty)||0 })).filter(item => item.product && item.qty > 0); }
  function subtotal() { return cartItems().reduce((sum, item) => sum + getPrice(item.product) * item.qty, 0); }
  function getPrice(product) { return product.price || PRICE; }
  function shipping() { return subtotal() === 0 || subtotal() >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE; }
  function total() { return subtotal() + shipping(); }

  function updateCartCount() { $$('.cart-count').forEach(el => { el.textContent = lineCount(); }); }
  function saveCart() { storageSet(STORAGE_KEYS.cart, cart); updateCartCount(); }
  function toast(message) {
    const box = $('#toast'); if (!box) return;
    box.textContent = message; box.classList.add('is-visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => box.classList.remove('is-visible'), 2400);
  }
  function addToCart(id, qty=1) {
    if (!byId(id)) return;
    cart[id] = (Number(cart[id]) || 0) + Math.max(1, Number(qty)||1);
    saveCart(); renderCart(); toast(`${byId(id).name} added to your bag ♡`);
  }
  function setQty(id, qty) {
    if (!byId(id)) return;
    if (qty <= 0) delete cart[id]; else cart[id] = Math.min(20, Math.max(1, qty));
    saveCart(); renderCart();
    if (!$('#checkout-modal').hidden) renderCheckoutSummary();
  }
  function renderCart() {
    const itemsEl = $('#cart-items'); if (!itemsEl) return;
    const items = cartItems();
    $('#empty-cart').hidden = items.length > 0;
    $('#cart-summary').hidden = items.length === 0;
    $('#shipping-message').hidden = items.length === 0;
    $('#shipping-message').textContent = subtotal() >= FREE_SHIPPING_AT ? 'Yay! Your order gets free shipping ✦' : `Add ${formatINR(FREE_SHIPPING_AT - subtotal())} more for free shipping.`;
    itemsEl.innerHTML = items.map(({product,qty}) => `
      <div class="cart-line">
        <a href="?product=${product.id}" aria-label="View ${product.name}"><img src="${product.image}" alt="${product.name}" loading="lazy"></a>
        <div class="cart-line-info"><p class="cart-line-title">${product.name}</p><p class="cart-line-sub">${product.label}</p><div class="cart-line-controls"><div class="mini-qty"><button type="button" data-action="cart-minus" data-product="${product.id}" aria-label="Remove one ${product.name}">−</button><span>${qty}</span><button type="button" data-action="cart-plus" data-product="${product.id}" aria-label="Add one ${product.name}">+</button></div><button type="button" class="remove-item" data-action="remove-item" data-product="${product.id}">Remove</button></div></div>
        <div class="cart-line-price">${formatINR(getPrice(product)*qty)}</div>
      </div>`).join('');
    $('#cart-subtotal').textContent = formatINR(subtotal());
    $('#cart-shipping').textContent = shipping() === 0 ? (subtotal() >= FREE_SHIPPING_AT ? 'FREE' : '—') : formatINR(shipping());
    $('#cart-total').textContent = formatINR(total());
    updateCartCount();
  }
  function openPanel(id) {
    closePanels(false);
    const el = $(id); if (!el) return;
    $('#overlay-scrim').hidden = false; el.hidden = false; document.body.classList.add('panel-open');
    $('#floating-cart')?.classList.add('panel-hidden');
    if (id === '#search-panel') setTimeout(() => $('#search-input')?.focus(), 30);
    if (id === '#checkout-modal') renderCheckoutSummary();
  }
  function closePanels(hideScrim=true) {
    ['#cart-drawer','#search-panel','#checkout-modal','#success-modal'].forEach(id => { const el = $(id); if (el) el.hidden = true; });
    if (hideScrim) $('#overlay-scrim').hidden = true;
    document.body.classList.remove('panel-open');
  }
  function openCart() { renderCart(); openPanel('#cart-drawer'); }
  function openCheckout() {
    if (!cartItems().length) { closePanels(); toast('Your bag is empty—find a treat first.'); document.querySelector('#shop')?.scrollIntoView({behavior:'smooth'}); return; }
    openPanel('#checkout-modal');
  }
  function renderProductCards() {
    const grid = $('#product-grid'); if (!grid) return;
    let list = products.filter(p => currentFilter === 'all' || p.category === currentFilter);
    if (currentSearch.trim()) {
      const q = currentSearch.trim().toLowerCase();
      list = list.filter(p => `${p.name} ${p.label} ${p.description} ${p.scent}`.toLowerCase().includes(q));
    }
    const sort = $('#sort-products')?.value || 'featured';
    if (sort === 'price-asc') list.sort((a,b)=>getPrice(a)-getPrice(b));
    if (sort === 'name') list.sort((a,b)=>a.name.localeCompare(b.name));
    if (!list.length) { grid.innerHTML = '<div class="no-products"><h3>No treats found just yet.</h3><p>Try another flavour or filter.</p></div>'; return; }
    grid.innerHTML = list.map(p => `
      <article class="product-card ${p.category==='bundle'?'is-bundle':''} ${p.category==='body-butter'?'is-butter':''}">
        <a class="product-card-image-link" href="?product=${p.id}" aria-label="View ${p.name}"><img class="product-card-image" src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-badge">${p.badge}</span></a>
        <div class="product-card-body"><p class="product-meta">${p.label}</p><h2 class="product-title">${p.name}</h2><p class="product-desc">${p.description}</p><div class="product-purchase-row"><span class="product-price">${formatINR(getPrice(p))}${p.compareAt?`<span class="product-compare">${formatINR(p.compareAt)}</span>`:''}</span><button class="add-button" type="button" data-action="add-to-cart" data-product="${p.id}">Add to bag +</button></div><a class="quick-view" href="?product=${p.id}">Explore this treat ↗</a></div>
      </article>`).join('');
  }
  function renderSearchResults() {
    const box = $('#search-results'); if (!box) return;
    const q = ($('#search-input')?.value || '').trim().toLowerCase();
    const matches = q ? products.filter(p => `${p.name} ${p.label} ${p.description} ${p.scent}`.toLowerCase().includes(q)) : products;
    box.innerHTML = matches.map(p => `<a class="search-result" href="?product=${p.id}"><img src="${p.image}" alt="" loading="lazy"><span>${p.name}<small>${formatINR(getPrice(p))} · ${p.label}</small></span></a>`).join('') || '<p class="search-empty">No treats found. Try “berry”, “mango” or “butter”.</p>';
  }
  function productTemplate(p) {
    return `<div class="pdp-breadcrumb"><a href="index.html">Home</a> / <a href="index.html#shop">Shop all treats</a> / <span>${p.name}</span></div>
      <div class="pdp-layout"><div class="pdp-image-shell"><img class="pdp-image ${p.isBundle?'pdp-bundle-image':''}" src="${p.image}" alt="${p.name}" fetchpriority="high"></div>
      <div class="pdp-info"><p class="eyebrow">${p.label.toUpperCase()}</p><h1 class="product-title">${p.name}</h1><p class="pdp-description">${p.details}</p><p class="product-meta">${p.scent}</p><div class="pdp-price-row"><strong class="pdp-price">${formatINR(getPrice(p))}</strong>${p.compareAt?`<span class="product-compare">${formatINR(p.compareAt)}</span><span class="pdp-price-note">Save ₹299</span>`:`<span class="pdp-price-note">Inclusive of all taxes</span>`}</div>
      <div class="pdp-benefits">${p.benefits.map(b=>`<div class="pdp-benefit"><span>✦</span>${b}</div>`).join('')}</div>
      <div class="pdp-buy-row"><div class="qty-control"><button type="button" data-action="pdp-qty-minus" aria-label="Decrease quantity">−</button><output id="pdp-qty">${pdpQty}</output><button type="button" data-action="pdp-qty-plus" aria-label="Increase quantity">+</button></div><button class="pill-button pink-button" type="button" data-action="pdp-add" data-product="${p.id}">Add to bag · ${formatINR(getPrice(p)*pdpQty)} <span>→</span></button></div>
      <p class="pdp-delivery-note"><b>✓ Cash on Delivery available</b><br>Shipping is free on orders above ₹1,499. All single treats are ₹999.</p></div></div>
      <div class="pdp-related"><div class="pdp-related-head"><h2>More treats to love</h2><a href="index.html#shop">Shop everything ↗</a></div><div class="product-grid">${products.filter(other=>other.id!==p.id).slice(0,3).map(other=>`<article class="product-card ${other.category==='bundle'?'is-bundle':''}"><a class="product-card-image-link" href="?product=${other.id}"><img class="product-card-image" src="${other.image}" alt="${other.name}" loading="lazy"></a><div class="product-card-body"><p class="product-meta">${other.label}</p><h3 class="product-title">${other.name}</h3><div class="product-purchase-row"><span class="product-price">${formatINR(getPrice(other))}</span><button class="add-button" type="button" data-action="add-to-cart" data-product="${other.id}">Add +</button></div></div></article>`).join('')}</div></div>`;
  }
  function goToProduct(id) {
    if (!byId(id)) return;
    const url = new URL(window.location.href); url.searchParams.set('product', id); url.hash = '';
    window.history.pushState({}, '', url); renderRoute(); window.scrollTo({top:0,behavior:'smooth'});
  }
  function goHome(hash='') {
    const url = new URL(window.location.href); url.searchParams.delete('product'); url.hash = hash;
    window.history.pushState({}, '', url); renderRoute();
    if (hash) setTimeout(()=>document.querySelector(hash)?.scrollIntoView({behavior:'smooth'}), 30); else window.scrollTo({top:0,behavior:'smooth'});
  }
  function renderRoute() {
    const id = new URLSearchParams(window.location.search).get('product');
    const product = id ? byId(id) : null;
    $('#home-view').hidden = !!product;
    $('#product-view').hidden = !product;
    if (product) { $('#product-view').innerHTML = productTemplate(product); document.title = `${product.name} — Sundae Club`; }
    else { document.title = 'Sundae Club — Body Rituals'; renderProductCards(); }
    updateCartCount();
  }
  function renderCheckoutSummary() {
    const list = $('#checkout-items'); if (!list) return;
    list.innerHTML = cartItems().map(({product,qty})=>`<div class="checkout-item"><img src="${product.image}" alt="" loading="lazy"><div><strong>${product.name}</strong><small>Qty ${qty} · ${formatINR(getPrice(product))} each</small></div><span>${formatINR(getPrice(product)*qty)}</span></div>`).join('');
    $('#checkout-subtotal').textContent = formatINR(subtotal());
    $('#checkout-shipping').textContent = shipping() === 0 ? (subtotal() >= FREE_SHIPPING_AT ? 'FREE' : '—') : formatINR(shipping());
    $('#checkout-total').textContent = formatINR(total());
    $('#checkout-error').hidden = true;
    $('#checkout-mode-note').textContent = STORE_WHATSAPP ? 'COD checkout. After placing the order, you can send the order summary to the store on WhatsApp.' : 'COD checkout is interactive. In this no-server demo, orders are saved in this browser only; set STORE_WHATSAPP in script.js or connect an order backend to notify the store.';
  }
  function orderText(order) {
    const itemText = order.items.map(i => `• ${i.name} × ${i.qty} — ${formatINR(i.price*i.qty)}`).join('\n');
    return `SUNDAE CLUB — COD ORDER ${order.id}\nName: ${order.customer.name}\nMobile: ${order.customer.phone}\nEmail: ${order.customer.email || '—'}\nAddress: ${order.customer.address}, ${order.customer.city}, ${order.customer.state} ${order.customer.pincode}\nNotes: ${order.customer.notes || '—'}\n\nItems:\n${itemText}\n\nSubtotal: ${formatINR(order.subtotal)}\nShipping: ${order.shipping ? formatINR(order.shipping) : 'FREE'}\nTotal COD: ${formatINR(order.total)}`;
  }
  function submitOrder(event) {
    event.preventDefault();
    const form = $('#checkout-form'); const data = new FormData(form); const customer = Object.fromEntries(data.entries());
    const error = $('#checkout-error');
    if (!cartItems().length) { error.textContent = 'Your bag is empty. Add a treat before checking out.'; error.hidden = false; return; }
    if (!form.checkValidity()) {
      form.reportValidity(); error.textContent = 'Please fill out the required delivery details and check the mobile number and PIN code.'; error.hidden = false; return;
    }
    const phoneDigits = String(customer.phone||'').replace(/\D/g,'');
    if (phoneDigits.length < 10 || phoneDigits.length > 13) { error.textContent = 'Please enter a valid mobile number (10–13 digits including country code, if used).'; error.hidden = false; return; }
    const orderNum = 'SC-' + Date.now().toString().slice(-8);
    const items = cartItems().map(({product,qty})=>({id:product.id,name:product.name,qty,price:getPrice(product)}));
    const order = { id:orderNum, createdAt:new Date().toISOString(), customer, items, subtotal:subtotal(), shipping:shipping(), total:total(), payment:'Cash on Delivery' };
    const orders = storageGet(STORAGE_KEYS.orders, []); orders.unshift(order); storageSet(STORAGE_KEYS.orders, orders.slice(0,50));
    activeOrderText = orderText(order);
    const savedCart = storageSet(STORAGE_KEYS.cart, {});
    cart = {}; saveCart();
    closePanels(); $('#overlay-scrim').hidden = false; $('#success-modal').hidden = false; document.body.classList.add('panel-open');
    $('#success-order-number').textContent = orderNum;
    $('#success-copy').textContent = STORE_WHATSAPP ? 'Your COD order details are ready. Send them to the store on WhatsApp to confirm fulfilment.' : 'Your COD order details have been saved in this browser.';
    $('#local-order-disclaimer').textContent = STORE_WHATSAPP ? 'Remember to press send in WhatsApp so the store receives your order.' : 'Demo mode: the store has not received this order. Configure STORE_WHATSAPP in script.js or connect an order backend before launch.';
    const followup = $('#whatsapp-followup');
    if (STORE_WHATSAPP) {
      const link = $('#whatsapp-link'); link.href = `https://wa.me/${STORE_WHATSAPP.replace(/\D/g,'')}?text=${encodeURIComponent(activeOrderText)}`;
      followup.hidden = false;
    } else followup.hidden = true;
    form.reset(); renderCart();
  }
  function copyOrder() {
    if (!activeOrderText) return;
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(activeOrderText).then(()=>toast('Order details copied.')).catch(()=>fallbackCopy(activeOrderText));
    else fallbackCopy(activeOrderText);
  }
  function fallbackCopy(text) {
    const area=document.createElement('textarea'); area.value=text; area.style.position='fixed'; area.style.opacity='0'; document.body.appendChild(area); area.select();
    try { document.execCommand('copy'); toast('Order details copied.'); } catch { toast('Could not copy automatically.'); }
    area.remove();
  }
  function finishOrder() { closePanels(); $('#overlay-scrim').hidden=true; goHome('#shop'); }

  document.addEventListener('click', event => {
    const action = event.target.closest('[data-action]');
    const filter = event.target.closest('[data-filter]');
    if (filter) {
      currentFilter = filter.dataset.filter; $$('.filter-chip').forEach(b=>b.classList.toggle('is-active',b===filter)); renderProductCards(); return;
    }
    if (!action) return;
    const id = action.dataset.product;
    switch (action.dataset.action) {
      case 'add-to-cart': addToCart(id,1); break;
      case 'open-cart': openCart(); break;
      case 'open-checkout': closePanels(false); openCheckout(); break;
      case 'close-panels': closePanels(); break;
      case 'open-search': renderSearchResults(); openPanel('#search-panel'); break;
      case 'remove-item': setQty(id,0); break;
      case 'cart-plus': setQty(id,(Number(cart[id])||0)+1); break;
      case 'cart-minus': setQty(id,(Number(cart[id])||0)-1); break;
      case 'open-product': if (id) goToProduct(id); break;
      case 'add-duo': addToCart('sweet-duo',1); openCart(); break;
      case 'pdp-qty-plus': pdpQty=Math.min(20,pdpQty+1); updatePdpQty(); break;
      case 'pdp-qty-minus': pdpQty=Math.max(1,pdpQty-1); updatePdpQty(); break;
      case 'pdp-add': addToCart(id,pdpQty); openCart(); break;
      case 'copy-order': copyOrder(); break;
      case 'finish-order': finishOrder(); break;
    }
  });
  function updatePdpQty() {
    const output = $('#pdp-qty'); if (output) output.textContent = pdpQty;
    const btn = $('.pdp-buy-row [data-action="pdp-add"]'); if (btn) btn.innerHTML = `Add to bag · ${formatINR(getPrice(byId(btn.dataset.product))*pdpQty)} <span>→</span>`;
  }
  $('#checkout-form')?.addEventListener('submit', submitOrder);
  $('#search-input')?.addEventListener('input', renderSearchResults);
  $('#sort-products')?.addEventListener('change', renderProductCards);
  $('#overlay-scrim')?.addEventListener('click', () => closePanels());
  window.addEventListener('popstate', renderRoute);
  window.addEventListener('keydown', event => { if (event.key === 'Escape' && ['#cart-drawer','#search-panel','#checkout-modal','#success-modal'].some(id => !$(id).hidden)) closePanels(); });
  $('#year').textContent = new Date().getFullYear();
  renderRoute(); renderCart();
})();
