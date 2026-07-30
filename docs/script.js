// ===== FIREBASE =====
const firebaseConfig = {
    apiKey: "AIzaSyAnLgTaXAicW0Vs5JVm8iLoWxpG-yh-CiI",
    authDomain: "dormvape.firebaseapp.com",
    databaseURL: "https://dormvape-default-rtdb.firebaseio.com",
    projectId: "dormvape",
    storageBucket: "dormvape.firebasestorage.app",
    messagingSenderId: "1062625355142",
    appId: "1:1062625355142:web:3e09dda523f38a4641b807"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ===== TELEGRAM =====
const TG_BOT_TOKEN = '8998190707:AAGdER2nAXMVywoXl-WEzVQPA3kUtA6bW8k';
const TG_CHAT_ID = '1951895339';

function sendTelegram(text) {
    fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT_ID, text, parse_mode: 'HTML' })
    }).catch(() => {});
}

// ===== PRODUCTS =====
const products = [
    { id: 1, name: 'HSB Mango Ice', category: 'liquid', brand: 'HSB', strength: '3мг', volume: '60мл', desc: 'Сочное манго с ментоловой свежестью', price: 690, oldPrice: 860, flavors: ['Манго', 'Манго-лёд', 'Манго-маракуйя'], images: ['img/1_1.jpg', 'img/1_2.jpg', 'img/1_3.jpg'] },
    { id: 2, name: 'Pink Lemonade', category: 'liquid', brand: 'Pod Juice', strength: '6мг', volume: '60мл', desc: 'Розовый лимонад с кислинкой', price: 590, oldPrice: 740, flavors: ['Классический', 'Мятный', 'Малиновый'], images: ['img/2_1.jpg', 'img/2_2.jpg'] },
    { id: 3, name: 'Blueberry Salt', category: 'liquid', brand: 'Salty Fish', strength: '20мг', volume: '30мл', desc: 'Черника со льдом', price: 450, oldPrice: null, flavors: ['Черника', 'Черника-лёд'], images: ['img/3_1.jpg', 'img/3_2.jpg'] },
    { id: 4, name: 'Strawberry Cream', category: 'liquid', brand: 'HSB', strength: '3мг', volume: '60мл', desc: 'Клубника со сливками', price: 640, oldPrice: 800, flavors: ['Клубника', 'Клубника-сливки', 'Клубника-мёд'], images: ['img/4_1.jpg', 'img/4_2.jpg', 'img/4_3.jpg', 'img/4_4.jpg'] },
    { id: 5, name: 'Жидкость 5', category: 'liquid', brand: '—', strength: '—', volume: '—', desc: 'Ждём данные', price: 550, oldPrice: null, flavors: ['Вкус 1', 'Вкус 2'], images: ['img/5_1.jpg', 'img/5_2.jpg', 'img/5_3.jpg', 'img/5_4.jpg'] },
    { id: 6, name: 'Жидкость 6', category: 'liquid', brand: '—', strength: '—', volume: '—', desc: 'Ждём данные', price: 550, oldPrice: null, flavors: ['Вкус 1', 'Вкус 2'], images: ['img/6_1.jpg', 'img/6_2.jpg'] },
    { id: 7, name: 'Жидкость 7', category: 'liquid', brand: '—', strength: '—', volume: '—', desc: 'Ждём данные', price: 550, oldPrice: null, flavors: ['Вкус 1', 'Вкус 2'], images: ['img/7_1.jpg', 'img/7_2.jpg', 'img/7_3.jpg'] },
    { id: 8, name: 'Жидкость 8', category: 'liquid', brand: '—', strength: '—', volume: '—', desc: 'Ждём данные', price: 550, oldPrice: null, flavors: ['Вкус 1', 'Вкус 2'], images: ['img/8_1.jpg', 'img/8_2.jpg'] },
    { id: 9, name: 'Вейп 1', category: 'device', brand: '—', strength: null, volume: null, desc: 'Ждём данные', price: 490, oldPrice: null, flavors: [], images: ['img/v1_1.jpg', 'img/v1_2.jpg', 'img/v1_3.jpg'] },
    { id: 10, name: 'Вейп 2', category: 'device', brand: '—', strength: null, volume: null, desc: 'Ждём данные', price: 540, oldPrice: null, flavors: [], images: ['img/v2_1.jpg', 'img/v2_2.jpg', 'img/v2_3.jpg'] },
    { id: 11, name: 'Вейп 3', category: 'device', brand: '—', strength: null, volume: null, desc: 'Ждём данные', price: 380, oldPrice: null, flavors: [], images: ['img/v3_1.jpg', 'img/v3_2.jpg', 'img/v3_3.jpg', 'img/v3_4.jpg'] },
    { id: 12, name: 'Вейп 4', category: 'device', brand: '—', strength: null, volume: null, desc: 'Ждём данные', price: 2490, oldPrice: null, flavors: [], images: ['img/v4_1.jpg', 'img/v4_2.jpg', 'img/v4_3.jpg'] },
    { id: 13, name: 'Вейп 5', category: 'device', brand: '—', strength: null, volume: null, desc: 'Ждём данные', price: 3890, oldPrice: null, flavors: [], images: ['img/v5_1.jpg', 'img/v5_2.jpg', 'img/v5_3.jpg', 'img/v5_4.jpg'] },
    { id: 14, name: 'Вейп 6', category: 'device', brand: '—', strength: null, volume: null, desc: 'Ждём данные', price: 2190, oldPrice: null, flavors: [], images: ['img/v6_1.jpg', 'img/v6_2.jpg', 'img/v6_3.jpg', 'img/v6_4.jpg'] },
    { id: 15, name: 'Вейп 7', category: 'device', brand: '—', strength: null, volume: null, desc: 'Ждём данные', price: 1990, oldPrice: null, flavors: [], images: ['img/v7_1.jpg', 'img/v7_2.jpg', 'img/v7_3.jpg'] },
    { id: 16, name: 'Вейп 8', category: 'device', brand: '—', strength: null, volume: null, desc: 'Ждём данные', price: 1990, oldPrice: null, flavors: [], images: ['img/v8_1.jpg'] },
    { id: 17, name: 'Вейп 9', category: 'device', brand: '—', strength: null, volume: null, desc: 'Ждём данные', price: 1990, oldPrice: null, flavors: [], images: ['img/v9_1.jpg'] },
    { id: 18, name: 'Испаритель 1', category: 'coil', brand: '—', strength: null, volume: null, desc: 'Ждём данные', price: 490, oldPrice: null, flavors: [], images: ['img/c1_1.jpg'], ohm: '1.0Ω', coilVolume: null },
    { id: 19, name: 'Испаритель 2', category: 'coil', brand: '—', strength: null, volume: null, desc: 'Ждём данные', price: 540, oldPrice: null, flavors: [], images: ['img/c2_1.jpg'], ohm: '0.8Ω', coilVolume: null },
    { id: 20, name: 'Картридж 1', category: 'coil', brand: '—', strength: null, volume: null, desc: 'Ждём данные', price: 380, oldPrice: null, flavors: [], images: ['img/c3_1.jpg'], ohm: '1.2Ω', coilVolume: '2мл' },
    { id: 21, name: 'Картридж 2', category: 'coil', brand: '—', strength: null, volume: null, desc: 'Ждём данные', price: 380, oldPrice: null, flavors: [], images: ['img/c4_1.jpg'], ohm: '1.0Ω', coilVolume: '2мл' },
    { id: 22, name: 'Испаритель на Aegis', category: 'coil', brand: '—', strength: null, volume: null, desc: 'Ждём данные', price: 380, oldPrice: null, flavors: [], images: ['img/c4_1.jpg'], ohm: '0.6Ω', coilVolume: null }
];

let customProducts = [];
let statsEntries = [];
let stockProducts = [];

function getAllProducts() {
    return [...products, ...customProducts];
}

// ===== FIREBASE LOAD / SAVE =====
function firebaseSave(path, val) {
    db.ref('data/' + path).set(val).catch(err => console.error('FB save err:', err));
}

function saveStats() {
    localStorage.setItem('dormvape_stats', JSON.stringify(statsEntries));
    firebaseSave('stats', statsEntries);
}

function saveStock() {
    localStorage.setItem('dormvape_stock', JSON.stringify(stockProducts));
    firebaseSave('stock', stockProducts);
}

function saveCustomProducts() {
    localStorage.setItem('dormvape_custom_products', JSON.stringify(customProducts));
    firebaseSave('products', customProducts);
}

function firebaseLoad(cb) {
    db.ref('data').once('value').then(snap => {
        const d = snap.val();
        if (d) cb(d);
    }).catch(() => {});
}

firebaseLoad(d => {
    if (d.stats) { statsEntries = d.stats; localStorage.setItem('dormvape_stats', JSON.stringify(statsEntries)); renderStats(); }
    if (d.stock) { stockProducts = d.stock; localStorage.setItem('dormvape_stock', JSON.stringify(stockProducts)); renderStock(); }
    if (d.products) { customProducts = d.products; localStorage.setItem('dormvape_custom_products', JSON.stringify(customProducts)); renderProducts(currentFilter); }
});

db.ref('data').on('value', snap => {
    const d = snap.val();
    if (!d) return;
    if (d.stats && JSON.stringify(d.stats) !== JSON.stringify(statsEntries)) {
        statsEntries = d.stats;
        localStorage.setItem('dormvape_stats', JSON.stringify(statsEntries));
        renderStats();
    }
    if (d.stock && JSON.stringify(d.stock) !== JSON.stringify(stockProducts)) {
        stockProducts = d.stock;
        localStorage.setItem('dormvape_stock', JSON.stringify(stockProducts));
        renderStock();
    }
    if (d.products && JSON.stringify(d.products) !== JSON.stringify(customProducts)) {
        customProducts = d.products;
        localStorage.setItem('dormvape_custom_products', JSON.stringify(customProducts));
        renderProducts(currentFilter);
    }
});

// ===== NAVIGATION =====
function switchPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');
    const btn = document.querySelector(`.nav-btn[data-page="${page}"]`);
    if (btn) btn.classList.add('active');
    window.scrollTo(0, 0);
    if (page === 'catalog') renderProducts(currentFilter);
    if (page === 'cart') renderCartItems();
}

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchPage(btn.dataset.page));
});

// ===== CART =====
let cart = JSON.parse(localStorage.getItem('dormvape_cart') || '[]');
let currentFilter = 'all';
let currentModalProduct = null;
let modalCarouselIdx = 0;

function saveCart() {
    localStorage.setItem('dormvape_cart', JSON.stringify(cart));
}

function getCartCount() {
    return cart.reduce((s, i) => s + i.qty, 0);
}

function getCartTotal() {
    return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function updateCartUI() {
    const count = getCartCount();
    document.getElementById('cart-count').textContent = count;
}

function addToCart(product, flavor) {
    const existing = cart.find(i => i.id === product.id && i.flavor === (flavor || null));
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, qty: 1, flavor: flavor || null });
    }
    saveCart();
    updateCartUI();

    const notif = document.getElementById('cart-notification');
    notif.textContent = product.name + (flavor ? ' (' + flavor + ')' : '') + ' — в корзине!';
    notif.style.display = 'block';
    notif.classList.add('show');
    setTimeout(() => {
        notif.classList.remove('show');
        notif.style.display = 'none';
    }, 2500);
}

function removeFromCart(id, flavor) {
    cart = cart.filter(i => !(i.id === id && i.flavor === (flavor || null)));
    saveCart();
    updateCartUI();
}

function clearCart() {
    if (cart.length === 0) return;
    cart = [];
    saveCart();
    updateCartUI();
    renderCartItems();
}

// ===== CATALOG =====
function filterProducts(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === filter);
    });
    renderProducts(filter);
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => filterProducts(btn.dataset.filter));
});

function renderProducts(filter) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    const all = getAllProducts();
    const filtered = filter && filter !== 'all'
        ? all.filter(p => p.category === filter)
        : all;

    grid.innerHTML = filtered.map(p => {
        const cartItems = cart.filter(c => c.id === p.id);
        const totalQty = cartItems.reduce((s, c) => s + c.qty, 0);
        const specs = p.category === 'coil'
            ? [p.ohm, p.coilVolume].filter(s => s && s !== '—').join(' · ')
            : [p.strength, p.volume].filter(s => s && s !== '—').join(' · ');
        const flavorsHtml = p.flavors && p.flavors.length
            ? '<div class="product-flavors">' + p.flavors.map(f => '<span class="flavor-tag">' + f + '</span>').join('') + '</div>'
            : '';
        const qtyControl = totalQty > 0
            ? '<div class="qty-control"><button class="qty-btn" onclick="event.stopPropagation();cartQty(' + p.id + ',-1)">−</button><span class="qty-value">' + totalQty + '</span><button class="qty-btn" onclick="event.stopPropagation();cartQty(' + p.id + ',1)">+</button></div>'
            : '<button class="btn-add" onclick="event.stopPropagation();productAdd(' + p.id + ',this)">+ Добавить</button>';
        return '<div class="product-card" data-pid="' + p.id + '">' +
            '<div class="product-media"><img src="' + p.images[0] + '" alt="' + p.name + '" loading="lazy" onerror="this.outerHTML=\'<div style=padding:40px;text-align:center;color:#444;font-size:32px>📷</div>\'"></div>' +
            '<div class="product-info">' +
            (specs ? '<div class="product-spec">' + specs + '</div>' : '') +
            '<div class="product-name">' + p.name + '</div>' +
            flavorsHtml +
            '<p class="product-desc">' + p.desc + '</p>' +
            '<div class="product-footer">' +
            '<div class="product-price">' + p.price + '₽' + (p.oldPrice ? '<span class="product-old">' + p.oldPrice + '₽</span>' : '') + '</div>' +
            qtyControl + '</div></div></div>';
    }).join('');

    grid.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.btn-add') || e.target.closest('.qty-control')) return;
            const id = parseInt(this.dataset.pid);
            const p = getAllProducts().find(x => x.id === id);
            if (p) openProductModal(p);
        });
    });
}

function productAdd(id, btn) {
    const p = getAllProducts().find(x => x.id === id);
    if (!p) return;
    if (p.flavors && p.flavors.length > 0) {
        openFlavorPicker(p, btn);
    } else {
        addToCart(p);
        renderProducts(currentFilter);
    }
}

function cartQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    if (delta > 0) {
        addToCart(getAllProducts().find(p => p.id === id));
        renderProducts(currentFilter);
    } else {
        item.qty--;
        if (item.qty <= 0) {
            cart = cart.filter(c => !(c.id === id && c.flavor === item.flavor));
        }
        saveCart();
        updateCartUI();
        renderProducts(currentFilter);
    }
}

// ===== FLAVOR PICKER =====
function openFlavorPicker(product, anchor) {
    const popup = document.getElementById('flavor-picker-popup');
    const list = document.getElementById('flavor-picker-list');
    list.innerHTML = product.flavors.map(f =>
        '<button class="flavor-picker-btn" data-flavor="' + f + '">' + f + '</button>'
    ).join('');

    const rect = anchor.getBoundingClientRect();
    popup.style.display = 'block';
    popup.style.position = 'fixed';
    popup.style.left = Math.max(10, Math.min(rect.left, window.innerWidth - popup.offsetWidth - 10)) + 'px';
    popup.style.top = (rect.top - popup.offsetHeight - 8) + 'px';
    if (popup.getBoundingClientRect().top < 80) {
        popup.style.top = (rect.bottom + 8) + 'px';
    }

    list.onclick = function(e) {
        const btn = e.target.closest('.flavor-picker-btn');
        if (btn) {
            e.stopPropagation();
            addToCart(product, btn.dataset.flavor);
            popup.style.display = 'none';
            renderProducts(currentFilter);
        }
    };

    function closePicker(e) {
        if (!popup.contains(e.target)) {
            popup.style.display = 'none';
            document.removeEventListener('click', closePicker);
            list.onclick = null;
        }
    }
    setTimeout(() => document.addEventListener('click', closePicker), 10);
}

// ===== PRODUCT MODAL =====
function openProductModal(product) {
    currentModalProduct = product;
    modalCarouselIdx = 0;

    const track = document.getElementById('modal-carousel-track');
    const dots = document.getElementById('modal-carousel-dots');
    const images = product.images && product.images.length > 0 ? product.images : [];
    if (images.length === 0) {
        track.innerHTML = '<div class="carousel-slide" style="display:flex;align-items:center;justify-content:center;font-size:64px;color:#333">📷</div>';
        dots.innerHTML = '<span class="dot active"></span>';
    } else {
        track.innerHTML = images.map((img, i) =>
            '<img src="' + img + '" class="carousel-slide" onerror="this.outerHTML=\'<div class=carousel-slide style=display:flex;align-items:center;justify-content:center;font-size:48px;color:#333>📷</div>\'">'
        ).join('');
        dots.innerHTML = images.map((_, i) =>
            '<span class="dot' + (i === 0 ? ' active' : '') + '" onclick="modalGoTo(' + (i - modalCarouselIdx) + ')"></span>'
        ).join('');
    }
    track.style.transform = 'translateX(0)';

    document.getElementById('product-modal-name').textContent = product.name;
    document.getElementById('product-modal-desc').textContent = product.desc || '';

    const specs = product.category === 'coil'
        ? [product.ohm, product.coilVolume].filter(s => s && s !== '—').join(' · ')
        : [product.strength, product.volume].filter(s => s && s !== '—').join(' · ');
    document.getElementById('product-modal-desc').innerHTML = (specs ? '<span class="product-spec">' + specs + '</span> ' : '') + (product.desc || '');

    document.getElementById('product-modal-price').textContent = product.price + '₽';
    const oldPriceEl = document.getElementById('product-modal-old-price');
    if (product.oldPrice) {
        oldPriceEl.textContent = product.oldPrice + '₽';
        oldPriceEl.style.display = 'inline';
    } else {
        oldPriceEl.style.display = 'none';
    }

    const flavorWrap = document.getElementById('product-modal-flavors');
    if (product.flavors && product.flavors.length > 0) {
        flavorWrap.style.display = 'block';
        flavorWrap.innerHTML = '<div class="flavor-label">Вкус:</div><div class="flavor-options">' +
            product.flavors.map((f, i) =>
                '<button class="flavor-btn' + (i === 0 ? ' active' : '') + '" data-flavor="' + f + '">' + f + '</button>'
            ).join('') + '</div>';
        flavorWrap.onclick = function(e) {
            const btn = e.target.closest('.flavor-btn');
            if (btn) {
                flavorWrap.querySelectorAll('.flavor-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        };
    } else {
        flavorWrap.style.display = 'none';
    }

    const addBtn = document.getElementById('product-modal-add');
    addBtn.onclick = function() {
        const activeFlavor = flavorWrap.querySelector('.flavor-btn.active');
        const flavor = activeFlavor ? activeFlavor.dataset.flavor : null;
        addToCart(product, flavor);
        closeProductModal();
        renderProducts(currentFilter);
    };

    document.getElementById('product-modal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('show');
    document.body.style.overflow = '';
    currentModalProduct = null;
}

function modalGoTo(dir) {
    const p = currentModalProduct;
    if (!p) return;
    const total = (p.images && p.images.length > 0) ? p.images.length : 1;
    modalCarouselIdx = (modalCarouselIdx + dir + total) % total;
    const track = document.getElementById('modal-carousel-track');
    track.style.transform = 'translateX(-' + (modalCarouselIdx * 100) + '%)';
    document.querySelectorAll('#modal-carousel-dots .dot').forEach((d, i) => {
        d.classList.toggle('active', i === modalCarouselIdx);
    });
}

document.getElementById('product-modal').addEventListener('click', function(e) {
    if (e.target === this) closeProductModal();
});

// ===== CAROUSEL SWIPE =====
let swipeStartX = 0;
let swipeStartY = 0;
const carouselTrack = document.getElementById('modal-carousel-track');
carouselTrack.addEventListener('touchstart', function(e) {
    swipeStartX = e.touches[0].clientX;
    swipeStartY = e.touches[0].clientY;
}, { passive: true });
carouselTrack.addEventListener('touchend', function(e) {
    const dx = e.changedTouches[0].clientX - swipeStartX;
    const dy = e.changedTouches[0].clientY - swipeStartY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        modalGoTo(dx < 0 ? 1 : -1);
    }
}, { passive: true });

// ===== MODAL SWIPE DOWN =====
let modalSwipeStartY = 0, modalSwipeStartX = 0;
document.getElementById('product-modal').addEventListener('touchstart', function(e) {
    modalSwipeStartY = e.touches[0].clientY;
    modalSwipeStartX = e.touches[0].clientX;
}, { passive: true });
document.getElementById('product-modal').addEventListener('touchend', function(e) {
    const dy = e.changedTouches[0].clientY - modalSwipeStartY;
    const dx = e.changedTouches[0].clientX - modalSwipeStartX;
    if (dy > 80 && Math.abs(dx) < 40) closeProductModal();
}, { passive: true });

// ===== CART RENDER =====
function renderCartItems() {
    const container = document.getElementById('cart-items');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<div class="cart-empty"><p>Корзина пуста</p><a class="cart-empty-link" onclick="switchPage(\'catalog\')">Перейти в каталог</a></div>';
        document.getElementById('cart-footer').classList.remove('has-items');
        return;
    }
    document.getElementById('cart-footer').classList.add('has-items');

    container.innerHTML = cart.map(item => {
        const flavorAttr = item.flavor ? item.flavor : '';
        return '<div class="cart-item">' +
            '<div class="item-info">' +
            '<div class="item-name">' + item.name + (item.flavor ? ' — ' + item.flavor : '') + '</div>' +
            '<div class="item-price">' + item.price + '₽</div></div>' +
            '<div class="item-qty">' +
            '<button class="qty-btn" onclick="cartItemQty(' + item.id + ',\'' + flavorAttr + '\',-1)">−</button>' +
            '<span class="qty-value">' + item.qty + '</span>' +
            '<button class="qty-btn" onclick="cartItemQty(' + item.id + ',\'' + flavorAttr + '\',1)">+</button></div>' +
            '<button class="remove-item" onclick="removeFromCart(' + item.id + ',\'' + flavorAttr + '\')">✕</button></div>';
    }).join('');

    document.getElementById('cart-total').textContent = getCartTotal() + ' ₽';
}

function cartItemQty(id, flavor, delta) {
    const item = cart.find(i => i.id === id && (i.flavor || '') === flavor);
    if (!item) return;
    if (delta > 0) {
        item.qty++;
    } else {
        item.qty--;
        if (item.qty <= 0) {
            removeFromCart(id, flavor);
            return;
        }
    }
    saveCart();
    updateCartUI();
    renderCartItems();
}

// ===== CHECKOUT =====
function openCheckout() {
    if (cart.length === 0) return;
    const summary = document.getElementById('modal-summary');
    summary.innerHTML = cart.map(item =>
        '<p>• ' + item.name + (item.flavor ? ' (' + item.flavor + ')' : '') + ' × ' + item.qty + ' = ' + (item.price * item.qty) + '₽</p>'
    ).join('') + '<p style="margin-top:6px;color:#aaa;font-weight:500">Итого: ' + getCartTotal() + ' ₽</p>';

    const saved = JSON.parse(localStorage.getItem('dormvape_checkout') || 'null');
    if (saved) {
        document.getElementById('checkout-name').value = saved.name || '';
        document.getElementById('checkout-phone').value = saved.phone || '';
        document.getElementById('checkout-telegram').value = saved.telegram || '';
        document.getElementById('checkout-address').value = saved.address || '';
        document.getElementById('checkout-flat').value = saved.flat || '';
    }

    document.getElementById('checkout-step-form').style.display = 'block';
    document.getElementById('checkout-step-payment').style.display = 'none';
    document.getElementById('checkout-modal').classList.add('show');
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('show');
}

document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        name: document.getElementById('checkout-name').value.trim(),
        phone: document.getElementById('checkout-phone').value.trim(),
        telegram: document.getElementById('checkout-telegram').value.trim(),
        address: document.getElementById('checkout-address').value.trim(),
        flat: document.getElementById('checkout-flat').value.trim(),
        comment: document.getElementById('checkout-comment').value.trim()
    };

    let itemsStr = cart.map(item =>
        '  • ' + item.name + (item.flavor ? ' (' + item.flavor + ')' : '') + ' x' + item.qty + ' — ' + (item.price * item.qty) + '₽'
    ).join('\n');

    let msg = '<b>🛒 Новый заказ DormVape!</b>\n\n<b>Товары:</b>\n' + itemsStr +
        '\n\n<b>Итого: ' + getCartTotal() + '₽</b>\n\n<b>👤 Покупатель:</b>\n  Имя: ' + data.name +
        '\n  Телефон: ' + data.phone +
        (data.telegram ? '\n  Telegram: ' + data.telegram : '') +
        '\n  Адрес: ' + data.phone + (data.flat ? '\n  Кв/под: ' + data.flat : '') +
        (data.comment ? '\n\nКомментарий: ' + data.comment : '') +
        '\n\nСпособ оплаты: будет выбран';

    sendTelegram(msg);

    if (document.getElementById('checkout-save').checked) {
        localStorage.setItem('dormvape_checkout', JSON.stringify(data));
    } else {
        localStorage.removeItem('dormvape_checkout');
    }

    document.getElementById('checkout-step-form').style.display = 'none';
    document.getElementById('checkout-step-payment').style.display = 'block';
    document.getElementById('payment-amount').textContent = getCartTotal() + '₽';
});

function confirmOrder() {
    sendTelegram('✅ Заказ подтверждён — оплата наличными!');
    cart = [];
    saveCart();
    updateCartUI();
    renderCartItems();
    closeCheckout();
    switchPage('home');
}

// ===== WELCOME MODAL =====
if (!localStorage.getItem('dormvape_welcomed')) {
    document.getElementById('welcome-overlay').classList.add('show');
}

document.getElementById('welcome-close').addEventListener('click', function() {
    if (document.getElementById('welcome-dontshow-cb').checked) {
        localStorage.setItem('dormvape_welcomed', '1');
    }
    document.getElementById('welcome-overlay').classList.remove('show');
    switchPage('catalog');
});

// ===== PASSWORD / ADMIN =====
let logoTaps = 0;
document.getElementById('logo-btn').addEventListener('click', function() {
    logoTaps++;
    clearTimeout(window.logoTapTimer);
    window.logoTapTimer = setTimeout(() => { logoTaps = 0; }, 1500);
    if (logoTaps >= 5) {
        logoTaps = 0;
        document.getElementById('password-input').value = '';
        document.getElementById('password-error').classList.remove('visible');
        document.getElementById('password-modal').classList.add('show');
        setTimeout(() => document.getElementById('password-input').focus(), 100);
    }
});

document.getElementById('password-ok').addEventListener('click', function() {
    const val = document.getElementById('password-input').value;
    if (val === '1234') {
        document.getElementById('password-modal').classList.remove('show');
        switchPage('stats');
        renderStats();
        renderStock();
    } else {
        document.getElementById('password-error').classList.add('visible');
        document.getElementById('password-input').value = '';
    }
});

document.getElementById('password-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('password-ok').click();
});

// ===== STATS =====
function renderStats() {
    const incomeTbody = document.getElementById('stats-income-tbody');
    const expenseTbody = document.getElementById('stats-expense-tbody');
    if (!incomeTbody || !expenseTbody) return;

    let totalIncome = 0, totalExpense = 0;
    statsEntries.forEach(e => {
        if (e.type === 'income') totalIncome += e.amount;
        else totalExpense += e.totalAmount || e.amount || 0;
    });

    document.getElementById('stats-total-income').textContent = totalIncome + '₽';
    document.getElementById('stats-total-expense').textContent = totalExpense + '₽';
    document.getElementById('stats-total-profit').textContent = (totalIncome - totalExpense) + '₽';

    const incomeEntries = statsEntries.map((e, i) => ({ ...e, realIdx: i })).filter(e => e.type === 'income').reverse();
    const expenseEntries = statsEntries.map((e, i) => ({ ...e, realIdx: i })).filter(e => e.type === 'expense').reverse();

    document.getElementById('stats-income-empty').style.display = incomeEntries.length === 0 ? 'block' : 'none';
    document.getElementById('stats-expense-empty').style.display = expenseEntries.length === 0 ? 'block' : 'none';

    incomeTbody.innerHTML = incomeEntries.map(e =>
        '<div class="cart-item" style="margin-bottom:4px">' +
        '<div class="item-info"><div class="item-name">' + (e.desc || '—') + '</div>' +
        '<div class="item-price">' + e.date + ' · ' + (e.who || '—') + ' · x' + (e.qty || 1) + '</div></div>' +
        '<div style="font-weight:600;color:#4caf50">+' + e.amount + '₽</div>' +
        '<button class="remove-item" onclick="statsDelete(' + e.realIdx + ')">✕</button></div>'
    ).join('');

    expenseTbody.innerHTML = expenseEntries.map(e =>
        '<div class="cart-item" style="margin-bottom:4px;flex-wrap:wrap" onclick="this.classList.toggle(\'open\')">' +
        '<div class="item-info"><div class="item-name">Поставка ' + (e.invoice || 'б/н') + '</div>' +
        '<div class="item-price">' + e.date + '</div></div>' +
        '<div style="font-weight:600;color:#e74c3c">-' + (e.totalAmount || e.amount || 0) + '₽</div>' +
        '<button class="remove-item" onclick="event.stopPropagation();statsDelete(' + e.realIdx + ')">✕</button>' +
        '<div style="width:100%;font-size:12px;color:#666;padding:4px;display:none">' +
        ((e.items || []).map(it => it.name + ' x' + it.qty + ' = ' + it.total + '₽').join('<br>')) + '</div></div>'
    ).join('');
}

function statsDelete(idx) {
    statsEntries.splice(idx, 1);
    saveStats();
    renderStats();
}

document.getElementById('stats-income-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('stats-income-amount').value);
    const who = document.getElementById('stats-income-who').value.trim();
    const desc = document.getElementById('stats-income-desc').value.trim();
    const qty = parseInt(document.getElementById('stats-income-qty').value) || 1;
    if (!amount || amount <= 0) return;

    const now = new Date();
    const date = ('0' + now.getDate()).slice(-2) + '.' + ('0' + (now.getMonth() + 1)).slice(-2) + '.' + now.getFullYear();
    statsEntries.push({ type: 'income', amount, who, desc, qty, date });
    saveStats();
    renderStats();

    if (desc) {
        const match = stockProducts.find(p => p.name.toLowerCase() === desc.toLowerCase());
        if (match) {
            match.qty = Math.max(0, match.qty - qty);
            saveStock();
            renderStock();
        }
    }

    document.getElementById('stats-income-amount').value = '';
    document.getElementById('stats-income-who').value = '';
    document.getElementById('stats-income-desc').value = '';
    document.getElementById('stats-income-qty').value = '1';
});

// ===== DELIVERY ITEMS =====
function calcItemTotal(row) {
    const qty = parseFloat(row.querySelector('.di-qty').value) || 0;
    const price = parseFloat(row.querySelector('.di-price').value) || 0;
    row.querySelector('.di-total').textContent = (qty * price) + '₽';
    calcDeliveryTotal();
}

function calcDeliveryTotal() {
    let sum = 0;
    document.querySelectorAll('.delivery-item').forEach(row => {
        const qty = parseFloat(row.querySelector('.di-qty').value) || 0;
        const price = parseFloat(row.querySelector('.di-price').value) || 0;
        sum += qty * price;
    });
    document.getElementById('delivery-total').textContent = sum + '₽';
}

function addDeliveryItem() {
    const container = document.getElementById('delivery-items');
    const tmpl = container.querySelector('.delivery-item');
    const clone = tmpl.cloneNode(true);
    clone.querySelectorAll('input').forEach(i => i.value = '');
    clone.querySelector('.di-total').textContent = '0₽';
    container.appendChild(clone);
    bindItemEvents(clone);
}

function bindItemEvents(row) {
    row.querySelector('.di-qty').addEventListener('input', function() { calcItemTotal(row); });
    row.querySelector('.di-price').addEventListener('input', function() { calcItemTotal(row); });
    row.querySelector('.di-remove').addEventListener('click', function() {
        if (document.querySelectorAll('.delivery-item').length > 1) {
            row.remove();
            calcDeliveryTotal();
        }
    });
}

document.getElementById('di-add-btn').addEventListener('click', addDeliveryItem);
bindItemEvents(document.querySelector('.delivery-item'));

document.getElementById('stats-expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const invoice = document.getElementById('stats-invoice').value.trim();
    const items = [];
    let totalAmount = 0;

    document.querySelectorAll('.delivery-item').forEach(row => {
        const name = row.querySelector('.di-name').value.trim();
        const qty = parseFloat(row.querySelector('.di-qty').value) || 0;
        const price = parseFloat(row.querySelector('.di-price').value) || 0;
        const total = qty * price;
        if (name && qty > 0 && price > 0) {
            items.push({ name, qty, price, total });
            totalAmount += total;
        }
    });

    if (items.length === 0) return;

    const now = new Date();
    const date = ('0' + now.getDate()).slice(-2) + '.' + ('0' + (now.getMonth() + 1)).slice(-2) + '.' + now.getFullYear();
    statsEntries.push({ type: 'expense', invoice, items, totalAmount, date });
    saveStats();
    renderStats();

    items.forEach(it => {
        const existing = stockProducts.find(p => p.name.toLowerCase() === it.name.toLowerCase());
        if (existing) {
            existing.qty += it.qty;
        } else {
            stockProducts.push({ name: it.name, qty: it.qty });
        }
    });
    saveStock();
    renderStock();

    this.reset();
    document.getElementById('delivery-items').innerHTML = '<div class="delivery-item">' +
        '<input type="text" placeholder="Название" class="di-name checkout-input" required>' +
        '<input type="number" placeholder="Кол-во" class="di-qty checkout-input" min="1" required>' +
        '<input type="number" placeholder="Цена" class="di-price checkout-input" min="0" step="0.01" required>' +
        '<span class="di-total">0₽</span>' +
        '<button type="button" class="di-remove">✕</button></div>';
    bindItemEvents(document.querySelector('.delivery-item'));
    document.getElementById('delivery-total').textContent = '0₽';
});

// ===== STOCK =====
function renderStock() {
    const list = document.getElementById('stats-stock-list');
    const empty = document.getElementById('stats-stock-empty');
    if (!list) return;
    const visible = stockProducts.filter(p => p.qty > 0);
    if (visible.length === 0) {
        list.innerHTML = '';
        empty.style.display = 'block';
        return;
    }
    empty.style.display = 'none';
    list.innerHTML = stockProducts.map((p, i) => {
        let qtyClass = 'stock-qty';
        if (p.qty === 0) qtyClass += ' zero';
        else if (p.qty <= 5) qtyClass += ' low';
        return '<div class="stock-item">' +
            '<span class="stock-item-name">' + p.name + '</span>' +
            '<button class="stock-btn" onclick="stockQty(' + i + ',-1)">−</button>' +
            '<span class="' + qtyClass + '">' + p.qty + '</span>' +
            '<button class="stock-btn" onclick="stockQty(' + i + ',1)">+</button>' +
            '<button class="stock-del" onclick="stockRemove(' + i + ')">✕</button></div>';
    }).join('');
}

function stockAdd() {
    const name = document.getElementById('stock-product-name').value.trim();
    const qty = parseInt(document.getElementById('stock-product-qty').value) || 0;
    if (!name && qty < 0) return;
    const existing = stockProducts.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existing) {
        existing.qty += qty;
    } else {
        stockProducts.push({ name, qty });
    }
    saveStock();
    renderStock();
    document.getElementById('stock-product-name').value = '';
    document.getElementById('stock-product-qty').value = '';
}

function stockQty(idx, delta) {
    if (!stockProducts[idx]) return;
    stockProducts[idx].qty = Math.max(0, stockProducts[idx].qty + delta);
    saveStock();
    renderStock();
}

function stockRemove(idx) {
    if (!stockProducts[idx]) return;
    stockProducts = stockProducts.filter((_, i) => i !== idx);
    saveStock();
    renderStock();
}

// ===== STATS FILTER =====
document.querySelectorAll('.stats-filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.stats-filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const t = this.dataset.tab;
        document.getElementById('stats-income-form').style.display = t === 'income' ? '' : 'none';
        document.getElementById('stats-expense-form').style.display = t === 'expense' ? '' : 'none';
        document.getElementById('stats-stock-form').style.display = t === 'stock' ? '' : 'none';
        document.getElementById('stats-income-wrap').style.display = t === 'income' ? '' : 'none';
        document.getElementById('stats-expense-wrap').style.display = t === 'expense' ? '' : 'none';
    });
});


// ===== INIT =====
updateCartUI();
renderProducts('all');
