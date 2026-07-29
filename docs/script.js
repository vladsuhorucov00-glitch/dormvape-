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
    fetch('https://api.telegram.org/bot' + TG_BOT_TOKEN + '/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT_ID, text: text, parse_mode: 'HTML' })
    }).catch(function() {});
}

// ===== PRODUCTS =====
var products = [
    { id: 1, name: 'HSB Mango Ice', category: 'liquid', brand: 'HSB', strength: '3мг', volume: '60мл', desc: 'Сочное манго с ментоловой свежестью', price: 690, oldPrice: 860, flavors: ['Манго', 'Манго-лёд', 'Манго-маракуйя'], images: ['img/1_1.jpg', 'img/1_2.jpg', 'img/1_3.jpg'] },
    { id: 2, name: 'Pink Lemonade', category: 'liquid', brand: 'Pod Juice', strength: '6мг', volume: '60мл', desc: 'Розовый лимонад с кислинкой', price: 590, oldPrice: 740, flavors: ['Классический', 'Мятный', 'Малиновый'], images: ['img/2_1.jpg', 'img/2_2.jpg'] },
    { id: 3, name: 'Blueberry Salt', category: 'liquid', brand: 'Salty Fish', strength: '20мг', volume: '30мл', desc: 'Черника со льдом', price: 450, oldPrice: null, flavors: ['Черника', 'Черника-лёд'], images: ['img/3_1.jpg', 'img/3_2.jpg'] },
    { id: 4, name: 'Strawberry Cream', category: 'liquid', brand: 'HSB', strength: '3мг', volume: '60мл', desc: 'Клубника со сливками', price: 640, oldPrice: 800, flavors: ['Клубника', 'Клубника-сливки', 'Клубника-мёд'], images: ['img/4_1.jpg', 'img/4_2.jpg', 'img/4_3.jpg', 'img/4_4.jpg'] },
    { id: 5, name: 'Жидкость 5', category: 'liquid', brand: '—', strength: '—', volume: '—', desc: 'Ждём данные', price: 550, oldPrice: null, flavors: ['Вкус 1', 'Вкус 2'], images: ['img/5_1.jpg', 'img/5_2.jpg', 'img/5_3.jpg', 'img/5_4.jpg'] },
    { id: 6, name: 'Жидкость 6', category: 'liquid', brand: '—', strength: '—', volume: '—', desc: 'Ждём данные', price: 550, oldPrice: null, flavors: ['Вкус 1', 'Вкус 2'], images: ['img/6_1.jpg', 'img/6_2.jpg'] },
    { id: 7, name: 'Жидкость 7', category: 'liquid', brand: '—', strength: '—', volume: '—', desc: 'Ждём данные', price: 550, oldPrice: null, flavors: ['Вкус 1', 'Вкус 2'], images: ['img/7_1.jpg', 'img/7_2.jpg', 'img/7_3.jpg'] },
    { id: 8, name: 'Жидкость 8', category: 'liquid', brand: '—', strength: '—', volume: '—', desc: 'Ждём данные', price: 550, oldPrice: null, flavors: ['Вкус 1', 'Вкус 2'], images: ['img/8_1.jpg', 'img/8_2.jpg'] },
    { id: 9, name: 'Вейп 1', category: 'device', brand: '—', desc: 'Ждём данные', price: 490, oldPrice: null, flavors: [], images: ['img/v1_1.jpg', 'img/v1_2.jpg', 'img/v1_3.jpg'] },
    { id: 10, name: 'Вейп 2', category: 'device', brand: '—', desc: 'Ждём данные', price: 540, oldPrice: null, flavors: [], images: ['img/v2_1.jpg', 'img/v2_2.jpg', 'img/v2_3.jpg'] },
    { id: 11, name: 'Вейп 3', category: 'device', brand: '—', desc: 'Ждём данные', price: 380, oldPrice: null, flavors: [], images: ['img/v3_1.jpg', 'img/v3_2.jpg', 'img/v3_3.jpg', 'img/v3_4.jpg'] },
    { id: 12, name: 'Вейп 4', category: 'device', brand: '—', desc: 'Ждём данные', price: 2490, oldPrice: null, flavors: [], images: ['img/v4_1.jpg', 'img/v4_2.jpg', 'img/v4_3.jpg'] },
    { id: 13, name: 'Вейп 5', category: 'device', brand: '—', desc: 'Ждём данные', price: 3890, oldPrice: null, flavors: [], images: ['img/v5_1.jpg', 'img/v5_2.jpg', 'img/v5_3.jpg', 'img/v5_4.jpg'] },
    { id: 14, name: 'Вейп 6', category: 'device', brand: '—', desc: 'Ждём данные', price: 2190, oldPrice: null, flavors: [], images: ['img/v6_1.jpg', 'img/v6_2.jpg', 'img/v6_3.jpg', 'img/v6_4.jpg'] },
    { id: 15, name: 'Вейп 7', category: 'device', brand: '—', desc: 'Ждём данные', price: 1990, oldPrice: null, flavors: [], images: ['img/v7_1.jpg', 'img/v7_2.jpg', 'img/v7_3.jpg'] },
    { id: 16, name: 'Вейп 8', category: 'device', brand: '—', desc: 'Ждём данные', price: 1990, oldPrice: null, flavors: [], images: ['img/v8_1.jpg'] },
    { id: 17, name: 'Вейп 9', category: 'device', brand: '—', desc: 'Ждём данные', price: 1990, oldPrice: null, flavors: [], images: ['img/v9_1.jpg'] },
    { id: 18, name: 'Испаритель 1', category: 'coil', desc: 'Ждём данные', price: 490, oldPrice: null, flavors: [], images: ['img/c1_1.jpg'], ohm: '1.0Ω', coilVolume: null },
    { id: 19, name: 'Испаритель 2', category: 'coil', desc: 'Ждём данные', price: 540, oldPrice: null, flavors: [], images: ['img/c2_1.jpg'], ohm: '0.8Ω', coilVolume: null },
    { id: 20, name: 'Картридж 1', category: 'coil', desc: 'Ждём данные', price: 380, oldPrice: null, flavors: [], images: ['img/c3_1.jpg'], ohm: '1.2Ω', coilVolume: '2мл' },
    { id: 21, name: 'Картридж 2', category: 'coil', desc: 'Ждём данные', price: 380, oldPrice: null, flavors: [], images: ['img/c4_1.jpg'], ohm: '1.0Ω', coilVolume: '2мл' },
    { id: 22, name: 'Испаритель на Aegis', category: 'coil', desc: 'Ждём данные', price: 380, oldPrice: null, flavors: [], images: ['img/c4_1.jpg'], ohm: '0.6Ω', coilVolume: null }
];

var customProducts = [];
var statsEntries = [];
var stockProducts = [];

function getAllProducts() {
    return products.concat(customProducts);
}

// ===== FIREBASE LOAD / SAVE =====
function firebaseSave(path, val) {
    db.ref('data/' + path).set(val).catch(function(err) { console.error('FB err:', err); });
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

firebase.database().ref('data').once('value').then(function(snap) {
    var d = snap.val();
    if (!d) return;
    if (d.stats) { statsEntries = d.stats; localStorage.setItem('dormvape_stats', JSON.stringify(statsEntries)); renderStats(); }
    if (d.stock) { stockProducts = d.stock; localStorage.setItem('dormvape_stock', JSON.stringify(stockProducts)); renderStock(); }
    if (d.products) { customProducts = d.products; localStorage.setItem('dormvape_custom_products', JSON.stringify(customProducts)); renderProducts(currentFilter); }
});

firebase.database().ref('data').on('value', function(snap) {
    var d = snap.val();
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
    document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
    document.querySelectorAll('.nav-btn').forEach(function(b) { b.classList.remove('active'); });
    var target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');
    var btn = document.querySelector('.nav-btn[data-page="' + page + '"]');
    if (btn) btn.classList.add('active');
    window.scrollTo(0, 0);
    if (page === 'catalog') renderProducts(currentFilter);
    if (page === 'cart') renderCartItems();
}

document.querySelectorAll('.nav-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { switchPage(this.dataset.page); });
});

// ===== CART =====
var cart = JSON.parse(localStorage.getItem('dormvape_cart') || '[]');
var currentFilter = 'all';

function saveCart() {
    localStorage.setItem('dormvape_cart', JSON.stringify(cart));
}

function getCartCount() {
    return cart.reduce(function(s, i) { return s + i.qty; }, 0);
}

function getCartTotal() {
    return cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
}

function updateCartUI() {
    document.getElementById('cart-count').textContent = getCartCount();
}

function addToCart(product, flavor) {
    var existing = cart.find(function(i) { return i.id === product.id && i.flavor === (flavor || null); });
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, qty: 1, flavor: flavor || null });
    }
    saveCart();
    updateCartUI();
    var notif = document.getElementById('cart-notification');
    notif.textContent = product.name + (flavor ? ' (' + flavor + ')' : '') + ' — в корзине!';
    notif.classList.add('show');
    setTimeout(function() { notif.classList.remove('show'); }, 2500);
}

function removeFromCart(id, flavor) {
    var fv = flavor || null;
    cart = cart.filter(function(i) { return !(i.id === id && i.flavor === fv); });
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
    document.querySelectorAll('.filter-btn').forEach(function(b) {
        b.classList.toggle('active', b.dataset.filter === filter);
    });
    renderProducts(filter);
}

document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { filterProducts(this.dataset.filter); });
});

function renderProducts(filter) {
    var grid = document.getElementById('products-grid');
    if (!grid) return;
    var all = getAllProducts();
    var filtered = filter && filter !== 'all' ? all.filter(function(p) { return p.category === filter; }) : all;

    grid.innerHTML = filtered.map(function(p) {
        var cartItems = cart.filter(function(c) { return c.id === p.id; });
        var totalQty = cartItems.reduce(function(s, c) { return s + c.qty; }, 0);
        var specs = p.category === 'coil'
            ? [p.ohm, p.coilVolume].filter(function(s) { return s && s !== '—'; }).join(' · ')
            : [p.strength, p.volume].filter(function(s) { return s && s !== '—'; }).join(' · ');
        var flavorsHtml = p.flavors && p.flavors.length
            ? '<div class="product-flavors">' + p.flavors.map(function(f) { return '<span class="flavor-tag">' + f + '</span>'; }).join('') + '</div>'
            : '';
        var qtyControl = totalQty > 0
            ? '<div class="qty-control"><button class="qty-btn" onclick="event.stopPropagation();cartQty(' + p.id + ',-1)">−</button><span class="qty-value">' + totalQty + '</span><button class="qty-btn" onclick="event.stopPropagation();cartQty(' + p.id + ',1)">+</button></div>'
            : '<button class="btn-add" onclick="event.stopPropagation();productAdd(' + p.id + ',this)">+ Добавить</button>';
        return '<div class="product-card" data-pid="' + p.id + '">' +
            (totalQty > 0 ? '<div class="cart-badge">' + totalQty + '</div>' : '') +
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

    grid.querySelectorAll('.product-card').forEach(function(card) {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.btn-add') || e.target.closest('.qty-control')) return;
            var id = parseInt(this.dataset.pid);
            var p = getAllProducts().find(function(x) { return x.id === id; });
            if (p) openProductModal(p);
        });
    });
}

function productAdd(id, btn) {
    var p = getAllProducts().find(function(x) { return x.id === id; });
    if (!p) return;
    if (p.flavors && p.flavors.length > 0) {
        openFlavorPicker(p, btn);
    } else {
        addToCart(p);
        renderProducts(currentFilter);
    }
}

function cartQty(id, delta) {
    var item = cart.find(function(c) { return c.id === id; });
    if (!item) return;
    if (delta > 0) {
        addToCart(getAllProducts().find(function(p) { return p.id === id; }));
        renderProducts(currentFilter);
    } else {
        item.qty--;
        if (item.qty <= 0) {
            cart = cart.filter(function(c) { return !(c.id === id && c.flavor === item.flavor); });
        }
        saveCart();
        updateCartUI();
        renderProducts(currentFilter);
    }
}

// ===== FLAVOR PICKER =====
function openFlavorPicker(product, anchor) {
    var popup = document.getElementById('flavor-picker-popup');
    var list = document.getElementById('flavor-picker-list');
    list.innerHTML = product.flavors.map(function(f) {
        return '<button class="flavor-picker-btn" data-flavor="' + f + '">' + f + '</button>';
    }).join('');

    var rect = anchor.getBoundingClientRect();
    popup.style.display = 'block';
    popup.style.position = 'fixed';
    popup.style.left = Math.max(10, Math.min(rect.left, window.innerWidth - popup.offsetWidth - 10)) + 'px';
    popup.style.top = (rect.top - popup.offsetHeight - 8) + 'px';
    if (popup.getBoundingClientRect().top < 80) {
        popup.style.top = (rect.bottom + 8) + 'px';
    }

    list.onclick = function(e) {
        var btn = e.target.closest('.flavor-picker-btn');
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
    setTimeout(function() { document.addEventListener('click', closePicker); }, 10);
}

// ===== PRODUCT MODAL =====
var currentModalProduct = null;
var modalCarouselIdx = 0;

function openProductModal(product) {
    currentModalProduct = product;
    modalCarouselIdx = 0;

    var track = document.getElementById('modal-carousel-track');
    var dots = document.getElementById('modal-carousel-dots');
    var images = product.images && product.images.length > 0 ? product.images : [];
    if (images.length === 0) {
        track.innerHTML = '<div class="carousel-slide" style="display:flex;align-items:center;justify-content:center;font-size:64px;color:#333">📷</div>';
        dots.innerHTML = '<span class="dot active"></span>';
    } else {
        track.innerHTML = images.map(function(img, i) {
            return '<img src="' + img + '" class="carousel-slide" onerror="this.outerHTML=\'<div class=carousel-slide style=display:flex;align-items:center;justify-content:center;font-size:48px;color:#333>📷</div>\'">';
        }).join('');
        dots.innerHTML = images.map(function(_, i) {
            return '<span class="dot' + (i === 0 ? ' active' : '') + '" onclick="modalGoTo(' + (i - modalCarouselIdx) + ')"></span>';
        }).join('');
    }
    track.style.transform = 'translateX(0)';

    document.getElementById('product-modal-name').textContent = product.name;

    var specs = product.category === 'coil'
        ? [product.ohm, product.coilVolume].filter(function(s) { return s && s !== '—'; }).join(' · ')
        : [product.strength, product.volume].filter(function(s) { return s && s !== '—'; }).join(' · ');
    document.getElementById('product-modal-desc').innerHTML = (specs ? '<span class="product-spec">' + specs + '</span> ' : '') + (product.desc || '');

    document.getElementById('product-modal-price').textContent = product.price + '₽';
    var oldPriceEl = document.getElementById('product-modal-old-price');
    if (product.oldPrice) {
        oldPriceEl.textContent = product.oldPrice + '₽';
        oldPriceEl.style.display = 'inline';
    } else {
        oldPriceEl.style.display = 'none';
    }

    var flavorWrap = document.getElementById('product-modal-flavors');
    if (product.flavors && product.flavors.length > 0) {
        flavorWrap.style.display = 'block';
        flavorWrap.innerHTML = '<div class="flavor-label">Вкус:</div><div class="flavor-options">' +
            product.flavors.map(function(f, i) {
                return '<button class="flavor-btn' + (i === 0 ? ' active' : '') + '" data-flavor="' + f + '">' + f + '</button>';
            }).join('') + '</div>';
        flavorWrap.onclick = function(e) {
            var btn = e.target.closest('.flavor-btn');
            if (btn) {
                flavorWrap.querySelectorAll('.flavor-btn').forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
            }
        };
    } else {
        flavorWrap.style.display = 'none';
    }

    document.getElementById('product-modal-add').onclick = function() {
        var activeFlavor = flavorWrap.querySelector('.flavor-btn.active');
        var flavor = activeFlavor ? activeFlavor.dataset.flavor : null;
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
    var p = currentModalProduct;
    if (!p) return;
    var total = (p.images && p.images.length > 0) ? p.images.length : 1;
    modalCarouselIdx = (modalCarouselIdx + dir + total) % total;
    var track = document.getElementById('modal-carousel-track');
    track.style.transform = 'translateX(-' + (modalCarouselIdx * 100) + '%)';
    document.querySelectorAll('#modal-carousel-dots .dot').forEach(function(d, i) {
        d.classList.toggle('active', i === modalCarouselIdx);
    });
}

document.getElementById('product-modal').addEventListener('click', function(e) {
    if (e.target === this) closeProductModal();
});

// ===== CART RENDER =====
function renderCartItems() {
    var container = document.getElementById('cart-items');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<div class="cart-empty"><p>Корзина пуста</p><a class="cart-empty-link" onclick="switchPage(\'catalog\')">Перейти в каталог</a></div>';
        document.getElementById('cart-footer').classList.remove('has-items');
        return;
    }
    document.getElementById('cart-footer').classList.add('has-items');

    container.innerHTML = cart.map(function(item) {
        var flavorAttr = item.flavor || '';
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
    var item = cart.find(function(i) { return i.id === id && (i.flavor || '') === flavor; });
    if (!item) return;
    if (delta > 0) {
        item.qty++;
    } else {
        item.qty--;
        if (item.qty <= 0) {
            removeFromCart(id, flavor);
            renderCartItems();
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
    var summary = document.getElementById('modal-summary');
    summary.innerHTML = cart.map(function(item) {
        return '<p>• ' + item.name + (item.flavor ? ' (' + item.flavor + ')' : '') + ' × ' + item.qty + ' = ' + (item.price * item.qty) + '₽</p>';
    }).join('') + '<p style="margin-top:6px;color:#aaa;font-weight:500">Итого: ' + getCartTotal() + ' ₽</p>';

    var saved = JSON.parse(localStorage.getItem('dormvape_checkout') || 'null');
    if (saved) {
        ['name','phone','telegram','address','flat'].forEach(function(f) {
            var el = document.getElementById('checkout-' + f);
            if (el && saved[f]) el.value = saved[f];
        });
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
    var data = {};
    ['name','phone','telegram','address','flat'].forEach(function(f) {
        data[f] = document.getElementById('checkout-' + f).value.trim();
    });
    data.comment = document.getElementById('checkout-comment').value.trim();

    var itemsStr = cart.map(function(item) {
        return '  • ' + item.name + (item.flavor ? ' (' + item.flavor + ')' : '') + ' x' + item.qty + ' — ' + (item.price * item.qty) + '₽';
    }).join('\n');

    var msg = '<b>🛒 Новый заказ DormVape!</b>\n\n<b>Товары:</b>\n' + itemsStr +
        '\n\n<b>Итого: ' + getCartTotal() + '₽</b>\n\n<b>👤 Покупатель:</b>\n  Имя: ' + data.name +
        '\n  Телефон: ' + data.phone +
        (data.telegram ? '\n  Telegram: ' + data.telegram : '') +
        '\n  Адрес: ' + data.address + (data.flat ? '\n  Кв/под: ' + data.flat : '') +
        (data.comment ? '\n\nКомментарий: ' + data.comment : '');

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

// ===== WELCOME =====
if (!localStorage.getItem('dormvape_welcomed')) {
    document.getElementById('welcome-overlay').classList.add('show');
}

document.getElementById('welcome-close').addEventListener('click', function() {
    if (document.getElementById('welcome-dontshow-cb').checked) {
        localStorage.setItem('dormvape_welcomed', '1');
    }
    document.getElementById('welcome-overlay').classList.remove('show');
});

// ===== PASSWORD / ADMIN =====
var logoTaps = 0;
document.getElementById('logo-btn').addEventListener('click', function() {
    logoTaps++;
    clearTimeout(window.logoTapTimer);
    window.logoTapTimer = setTimeout(function() { logoTaps = 0; }, 1500);
    if (logoTaps >= 5) {
        logoTaps = 0;
        document.getElementById('password-input').value = '';
        document.getElementById('password-error').classList.remove('visible');
        document.getElementById('password-modal').classList.add('show');
        setTimeout(function() { document.getElementById('password-input').focus(); }, 100);
    }
});

document.getElementById('password-ok').addEventListener('click', function() {
    var val = document.getElementById('password-input').value;
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
    var incomeTbody = document.getElementById('stats-income-tbody');
    var expenseTbody = document.getElementById('stats-expense-tbody');
    if (!incomeTbody || !expenseTbody) return;

    var totalIncome = 0, totalExpense = 0;
    statsEntries.forEach(function(e) {
        if (e.type === 'income') totalIncome += e.amount;
        else totalExpense += e.totalAmount || e.amount || 0;
    });

    document.getElementById('stats-total-income').textContent = totalIncome + '₽';
    document.getElementById('stats-total-expense').textContent = totalExpense + '₽';
    document.getElementById('stats-total-profit').textContent = (totalIncome - totalExpense) + '₽';

    var incomeEntries = statsEntries.map(function(e, i) { return { e: e, i: i }; }).filter(function(x) { return x.e.type === 'income'; }).reverse();
    var expenseEntries = statsEntries.map(function(e, i) { return { e: e, i: i }; }).filter(function(x) { return x.e.type === 'expense'; }).reverse();

    document.getElementById('stats-income-empty').style.display = incomeEntries.length === 0 ? 'block' : 'none';
    document.getElementById('stats-expense-empty').style.display = expenseEntries.length === 0 ? 'block' : 'none';

    incomeTbody.innerHTML = incomeEntries.map(function(x) {
        return '<div class="cart-item" style="margin-bottom:4px">' +
            '<div class="item-info"><div class="item-name">' + (x.e.desc || '—') + '</div>' +
            '<div class="item-price">' + x.e.date + ' · ' + (x.e.who || '—') + ' · x' + (x.e.qty || 1) + '</div></div>' +
            '<div style="font-weight:600;color:#4caf50">+' + x.e.amount + '₽</div>' +
            '<button class="remove-item" onclick="statsDelete(' + x.i + ')">✕</button></div>';
    }).join('');

    expenseTbody.innerHTML = expenseEntries.map(function(x) {
        return '<div class="cart-item" style="margin-bottom:4px;flex-wrap:wrap">' +
            '<div class="item-info"><div class="item-name">Поставка ' + (x.e.invoice || 'б/н') + '</div>' +
            '<div class="item-price">' + x.e.date + '</div></div>' +
            '<div style="font-weight:600;color:#e74c3c">-' + (x.e.totalAmount || x.e.amount || 0) + '₽</div>' +
            '<button class="remove-item" onclick="event.stopPropagation();statsDelete(' + x.i + ')">✕</button>' +
            '<div style="width:100%;font-size:12px;color:#666;padding:4px;display:none">' +
            ((x.e.items || []).map(function(it) { return it.name + ' x' + it.qty + ' = ' + it.total + '₽'; }).join('<br>')) + '</div></div>';
    }).join('');
}

function statsDelete(idx) {
    statsEntries.splice(idx, 1);
    saveStats();
    renderStats();
}

document.getElementById('stats-income-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var amount = parseFloat(document.getElementById('stats-income-amount').value);
    var who = document.getElementById('stats-income-who').value.trim();
    var desc = document.getElementById('stats-income-desc').value.trim();
    var qty = parseInt(document.getElementById('stats-income-qty').value) || 1;
    if (!amount || amount <= 0) return;
    var now = new Date();
    var date = ('0' + now.getDate()).slice(-2) + '.' + ('0' + (now.getMonth() + 1)).slice(-2) + '.' + now.getFullYear();
    statsEntries.push({ type: 'income', amount: amount, who: who, desc: desc, qty: qty, date: date });
    saveStats();
    renderStats();
    if (desc) {
        var match = stockProducts.find(function(p) { return p.name.toLowerCase() === desc.toLowerCase(); });
        if (match) { match.qty = Math.max(0, match.qty - qty); saveStock(); renderStock(); }
    }
    document.getElementById('stats-income-amount').value = '';
    document.getElementById('stats-income-who').value = '';
    document.getElementById('stats-income-desc').value = '';
    document.getElementById('stats-income-qty').value = '1';
});

// ===== DELIVERY ITEMS =====
function calcItemTotal(row) {
    var qty = parseFloat(row.querySelector('.di-qty').value) || 0;
    var price = parseFloat(row.querySelector('.di-price').value) || 0;
    row.querySelector('.di-total').textContent = (qty * price) + '₽';
    calcDeliveryTotal();
}

function calcDeliveryTotal() {
    var sum = 0;
    document.querySelectorAll('.delivery-item').forEach(function(row) {
        var qty = parseFloat(row.querySelector('.di-qty').value) || 0;
        var price = parseFloat(row.querySelector('.di-price').value) || 0;
        sum += qty * price;
    });
    document.getElementById('delivery-total').textContent = sum + '₽';
}

function addDeliveryItem() {
    var container = document.getElementById('delivery-items');
    var tmpl = container.querySelector('.delivery-item');
    var clone = tmpl.cloneNode(true);
    clone.querySelectorAll('input').forEach(function(i) { i.value = ''; });
    clone.querySelector('.di-total').textContent = '0₽';
    container.appendChild(clone);
    bindItemEvents(clone);
}

function bindItemEvents(row) {
    row.querySelector('.di-qty').addEventListener('input', function() { calcItemTotal(row); });
    row.querySelector('.di-price').addEventListener('input', function() { calcItemTotal(row); });
    row.querySelector('.di-remove').addEventListener('click', function() {
        if (document.querySelectorAll('.delivery-item').length > 1) { row.remove(); calcDeliveryTotal(); }
    });
}

document.getElementById('di-add-btn').addEventListener('click', addDeliveryItem);
var firstItem = document.querySelector('.delivery-item');
if (firstItem) bindItemEvents(firstItem);

document.getElementById('stats-expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var invoice = document.getElementById('stats-invoice').value.trim();
    var items = [];
    var totalAmount = 0;
    document.querySelectorAll('.delivery-item').forEach(function(row) {
        var name = row.querySelector('.di-name').value.trim();
        var qty = parseFloat(row.querySelector('.di-qty').value) || 0;
        var price = parseFloat(row.querySelector('.di-price').value) || 0;
        var total = qty * price;
        if (name && qty > 0 && price > 0) { items.push({ name: name, qty: qty, price: price, total: total }); totalAmount += total; }
    });
    if (items.length === 0) return;
    var now = new Date();
    var date = ('0' + now.getDate()).slice(-2) + '.' + ('0' + (now.getMonth() + 1)).slice(-2) + '.' + now.getFullYear();
    statsEntries.push({ type: 'expense', invoice: invoice, items: items, totalAmount: totalAmount, date: date });
    saveStats();
    renderStats();
    items.forEach(function(it) {
        var existing = stockProducts.find(function(p) { return p.name.toLowerCase() === it.name.toLowerCase(); });
        if (existing) { existing.qty += it.qty; } else { stockProducts.push({ name: it.name, qty: it.qty }); }
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
    var newFirst = document.querySelector('.delivery-item');
    if (newFirst) bindItemEvents(newFirst);
    document.getElementById('delivery-total').textContent = '0₽';
});

// ===== STOCK =====
function renderStock() {
    var list = document.getElementById('stats-stock-list');
    var empty = document.getElementById('stats-stock-empty');
    if (!list) return;
    var visible = stockProducts.filter(function(p) { return p.qty > 0; });
    if (visible.length === 0) { list.innerHTML = ''; if (empty) empty.style.display = 'block'; return; }
    if (empty) empty.style.display = 'none';
    list.innerHTML = stockProducts.map(function(p, i) {
        var qtyClass = 'stock-qty';
        if (p.qty === 0) qtyClass += ' zero';
        else if (p.qty <= 5) qtyClass += ' low';
        return '<div class="stock-item"><span class="stock-item-name">' + p.name + '</span>' +
            '<button class="stock-btn" onclick="stockQty(' + i + ',-1)">−</button>' +
            '<span class="' + qtyClass + '">' + p.qty + '</span>' +
            '<button class="stock-btn" onclick="stockQty(' + i + ',1)">+</button>' +
            '<button class="stock-del" onclick="stockRemove(' + i + ')">✕</button></div>';
    }).join('');
}

function stockAdd() {
    var name = document.getElementById('stock-product-name').value.trim();
    var qty = parseInt(document.getElementById('stock-product-qty').value) || 0;
    if (!name && qty < 0) return;
    var existing = stockProducts.find(function(p) { return p.name.toLowerCase() === name.toLowerCase(); });
    if (existing) { existing.qty += qty; } else { stockProducts.push({ name: name, qty: qty }); }
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
    stockProducts = stockProducts.filter(function(_, i) { return i !== idx; });
    saveStock();
    renderStock();
}

// ===== STATS FILTER =====
document.querySelectorAll('.stats-filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.stats-filter-btn').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        var t = this.dataset.tab;
        document.getElementById('stats-income-form').style.display = t === 'income' ? '' : 'none';
        document.getElementById('stats-expense-form').style.display = t === 'expense' ? '' : 'none';
        document.getElementById('stats-stock-form').style.display = t === 'stock' ? '' : 'none';
        document.getElementById('stats-income-wrap').style.display = t === 'income' ? '' : 'none';
        document.getElementById('stats-expense-wrap').style.display = t === 'expense' ? '' : 'none';
    });
});

// ===== EXPORT / IMPORT =====
function exportStats() {
    var data = { stats: statsEntries, stock: stockProducts, products: customProducts };
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'dormvape-stats.json';
    a.click();
    URL.revokeObjectURL(url);
}

document.getElementById('stats-import-file').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
        try {
            var data = JSON.parse(ev.target.result);
            if (data.stats) { statsEntries = data.stats; saveStats(); }
            if (data.stock) { stockProducts = data.stock; saveStock(); }
            if (data.products) { customProducts = data.products; saveCustomProducts(); }
            renderStats();
            renderStock();
        } catch(err) { alert('Ошибка: файл повреждён'); }
    };
    reader.readAsText(file);
    this.value = '';
});

// ===== INIT =====
updateCartUI();
renderProducts('all');
