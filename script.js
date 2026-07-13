// ===== TAB NAVIGATION =====
let activeTab = 'home';

function switchTab(tab) {
    activeTab = tab;
    document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.bottom-tab').forEach(b => b.classList.remove('active'));

    const page = document.getElementById('tab-' + tab);
    const btn = document.querySelector('.bottom-tab[data-tab="' + tab + '"]');
    if (page) page.classList.add('active');
    if (btn) btn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'instant' });

    if (tab === 'catalog') renderProducts(currentFilter);
    if (tab === 'cart') renderCartItems();
}

document.querySelectorAll('.bottom-tab').forEach(btn => {
    btn.addEventListener('click', function() {
        switchTab(this.dataset.tab);
    });
});

document.querySelectorAll('[data-tab]').forEach(el => {
    if (!el.classList.contains('bottom-tab')) {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab(this.dataset.tab);
        });
    }
});

// ===== PRODUCTS DATA =====
function svgPlaceholder(text, bg, fg) {
    return 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="180"><rect width="200" height="180" rx="10" fill="' + bg + '"/><text x="100" y="90" dominant-baseline="middle" text-anchor="middle" fill="' + fg + '" font-size="14" font-family="Arial">' + text + '</text></svg>');
}
function svgMulti(text, colors) {
    return colors.map((c, i) => svgPlaceholder(text + ' #' + (i + 1), c.bg, c.fg));
}

const products = [
    {
        id: 1, name: 'HSB Mango Ice', category: 'liquid',
        brand: 'HSB', strength: '3мг', volume: '60мл',
        desc: 'Сочное манго с ментоловой свежестью',
        price: 690, oldPrice: 860,
        flavors: ['Манго', 'Манго-лёд', 'Манго-маракуйя'],
        images: ['img/1_1.jpg', 'img/1_2.jpg', 'img/1_3.jpg']
    },
    {
        id: 2, name: 'Pink Lemonade', category: 'liquid',
        brand: 'Pod Juice', strength: '6мг', volume: '60мл',
        desc: 'Розовый лимонад с кислинкой',
        price: 590, oldPrice: 740,
        flavors: ['Классический', 'Мятный', 'Малиновый'],
        images: ['img/2_1.jpg', 'img/2_2.jpg']
    },
    {
        id: 3, name: 'Blueberry Salt', category: 'liquid',
        brand: 'Salty Fish', strength: '20мг', volume: '30мл',
        desc: 'Черника со льдом',
        price: 450, oldPrice: null,
        flavors: ['Черника', 'Черника-лёд'],
        images: ['img/3_1.jpg', 'img/3_2.jpg']
    },
    {
        id: 4, name: 'Strawberry Cream', category: 'liquid',
        brand: 'HSB', strength: '3мг', volume: '60мл',
        desc: 'Клубника со сливками',
        price: 640, oldPrice: 800,
        flavors: ['Клубника', 'Клубника-сливки', 'Клубника-мёд'],
        images: ['img/4_1.jpg', 'img/4_2.jpg', 'img/4_3.jpg', 'img/4_4.jpg']
    },
    {
        id: 5, name: 'Жидкость 5', category: 'liquid',
        brand: '—', strength: '—', volume: '—',
        desc: 'Ждём данные от тебя',
        price: 550, oldPrice: null,
        flavors: ['Вкус 1', 'Вкус 2'],
        images: ['img/5_1.jpg', 'img/5_2.jpg', 'img/5_3.jpg', 'img/5_4.jpg']
    },
    {
        id: 6, name: 'Жидкость 6', category: 'liquid',
        brand: '—', strength: '—', volume: '—',
        desc: 'Ждём данные от тебя',
        price: 550, oldPrice: null,
        flavors: ['Вкус 1', 'Вкус 2'],
        images: ['img/6_1.jpg', 'img/6_2.jpg']
    },
    {
        id: 7, name: 'Жидкость 7', category: 'liquid',
        brand: '—', strength: '—', volume: '—',
        desc: 'Ждём данные от тебя',
        price: 550, oldPrice: null,
        flavors: ['Вкус 1', 'Вкус 2'],
        images: ['img/7_1.jpg', 'img/7_2.jpg', 'img/7_3.jpg']
    },
    {
        id: 8, name: 'Жидкость 8', category: 'liquid',
        brand: '—', strength: '—', volume: '—',
        desc: 'Ждём данные от тебя',
        price: 550, oldPrice: null,
        flavors: ['Вкус 1', 'Вкус 2'],
        images: ['img/8_1.jpg', 'img/8_2.jpg']
    }
];

// ===== CART =====
let cart = JSON.parse(localStorage.getItem('dormvape_cart') || '[]');
let currentFilter = 'all';
let currentModalProduct = null;
let modalCarouselIdx = 0;

function saveCart() {
    localStorage.setItem('dormvape_cart', JSON.stringify(cart));
}

function getCartCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCartUI() {
    const count = getCartCount();
    document.getElementById('cart-total').textContent = getCartTotal() + '\u20BD';

    const badge = document.getElementById('cart-badge-tab');
    if (count > 0) {
        badge.textContent = count;
        badge.classList.add('show');
    } else {
        badge.classList.remove('show');
    }

    renderCartItems();
    updateCartBadges();
}

function updateCartBadges() {
    document.querySelectorAll('.product-card').forEach(card => {
        const id = parseInt(card.dataset.productId);
        const qty = cart.filter(c => c.id === id).reduce((sum, c) => sum + c.qty, 0);

        let badge = card.querySelector('.cart-badge');
        if (qty > 0) {
            if (!badge) {
                badge = document.createElement('div');
                badge.className = 'cart-badge';
                card.prepend(badge);
            }
            badge.textContent = qty;
        } else if (badge) {
            badge.remove();
        }

        const btn = card.querySelector('.add-to-cart');
        if (btn) {
            btn.textContent = qty > 0 ? 'Ещё добавить' : 'Добавить в корзину';
        }
    });
}

// ===== PRODUCTS =====
function renderProducts(filter) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    const filtered = filter && filter !== 'all'
        ? products.filter(p => p.category === filter)
        : products;

    grid.innerHTML = filtered.map(p => {
        const cartItem = cart.find(c => c.id === p.id);
        const qty = cartItem ? cartItem.qty : 0;
        const specs = [p.brand, p.strength, p.volume].filter(Boolean).join(' · ');
        const flavorsHtml = p.flavors && p.flavors.length
            ? `<div class="card-flavors">${p.flavors.map(f => `<span class="card-flavor-tag">${f}</span>`).join('')}</div>`
            : '';
        return `
        <div class="product-card" data-product-id="${p.id}" style="cursor:pointer">
            ${qty > 0 ? `<div class="cart-badge">${qty}</div>` : ''}
            <div class="product-thumb">
                <img src="${p.images[0]}" alt="${p.name}">
            </div>
            <h4>${p.name}</h4>
            ${specs ? `<div class="product-specs">${specs}</div>` : ''}
            ${flavorsHtml}
            <div class="desc">${p.desc}</div>
            <div class="price">
                ${p.price}\u20BD
                ${p.oldPrice ? `<span class="old-price">${p.oldPrice}\u20BD</span>` : ''}
            </div>
            <button class="add-to-cart" data-id="${p.id}">${qty > 0 ? 'Ещё добавить' : 'Добавить в корзину'}</button>
        </div>
    `}).join('');

    grid.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = parseInt(this.dataset.id);
            const product = products.find(p => p.id === id);
            if (product) addToCart(product);
        });
    });

    grid.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart') || e.target.closest('.carousel')) return;
            const id = parseInt(this.dataset.productId);
            const product = products.find(p => p.id === id);
            if (product) openProductModal(product);
        });
    });
}

function filterCategory(cat) {
    currentFilter = cat;
    renderProducts(cat);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === cat);
    });
}

function addToCart(product, flavor) {
    const existing = cart.find(item => item.id === product.id && item.flavor === (flavor || null));
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, qty: 1, flavor: flavor || null });
    }
    saveCart();
    updateCartUI();

    const notif = document.getElementById('cart-notification');
    notif.textContent = '\u201C' + product.name + (flavor ? ' (' + flavor + ')' : '') + '\u201D добавлен в корзину!';
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 2500);
}

function removeFromCart(id, flavor) {
    const fv = flavor || null;
    cart = cart.filter(item => !(item.id === id && item.flavor === fv));
    saveCart();
    updateCartUI();
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    const totalRow = document.getElementById('cart-total-row');
    const actions = document.querySelector('.cart-actions');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">\uD83D\uDED2</div>Корзина пуста<br><a href="#" class="cart-empty-link" data-tab="catalog">Перейти в каталог</a></div>';
        totalRow.style.display = 'none';
        actions.style.display = 'none';
        container.querySelector('[data-tab]') && container.querySelector('[data-tab]').addEventListener('click', function(e) {
            e.preventDefault();
            switchTab('catalog');
        });
        return;
    }
    totalRow.style.display = 'flex';
    actions.style.display = 'flex';

    container.innerHTML = cart.map(item => {
        return `
        <div class="cart-item">
            <div class="item-info">
                <div class="item-name">${item.name}${item.flavor ? ' — ' + item.flavor : ''}</div>
                <div class="item-price">${item.price}\u20BD</div>
            </div>
            <div class="item-qty">
                <button class="qty-btn" data-id="${item.id}" data-flavor="${item.flavor || ''}" data-action="decr">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" data-id="${item.id}" data-flavor="${item.flavor || ''}" data-action="incr">+</button>
            </div>
            <button class="remove-item" data-id="${item.id}" data-flavor="${item.flavor || ''}">&times;</button>
        </div>
    `}).join('');

    container.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const fv = this.dataset.flavor || null;
            const action = this.dataset.action;
            const item = cart.find(i => i.id === id && i.flavor === fv);
            if (!item) return;
            if (action === 'incr') {
                item.qty++;
            } else {
                item.qty--;
                if (item.qty <= 0) {
                    removeFromCart(id, fv);
                    return;
                }
            }
            saveCart();
            updateCartUI();
        });
    });

    container.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            removeFromCart(parseInt(this.dataset.id), this.dataset.flavor || null);
        });
    });
}

// ===== CAROUSEL =====
function initCarousel(carousel) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    if (slides.length === 0) return;
    let idx = 0;
    let startX = 0;

    function goTo(i) {
        slides[idx].classList.remove('active');
        dots[idx].classList.remove('active');
        idx = (i + slides.length) % slides.length;
        slides[idx].classList.add('active');
        dots[idx].classList.add('active');
    }

    carousel.querySelector('.carousel-arrow.left').addEventListener('click', function(e) {
        e.stopPropagation();
        goTo(idx - 1);
    });
    carousel.querySelector('.carousel-arrow.right').addEventListener('click', function(e) {
        e.stopPropagation();
        goTo(idx + 1);
    });
    dots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            goTo(parseInt(this.dataset.idx));
        });
    });

    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    }, { passive: true });
    carousel.addEventListener('touchend', function(e) {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            goTo(diff > 0 ? idx + 1 : idx - 1);
        }
    }, { passive: true });
}

// ===== FILTER BUTTONS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        filterCategory(this.dataset.filter);
    });
});

// ===== CATEGORY CARDS =====
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const cat = this.dataset.category;
        switchTab('catalog');
        setTimeout(() => filterCategory(cat), 50);
    });
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const cat = this.dataset.category;
            switchTab('catalog');
            setTimeout(() => filterCategory(cat), 50);
        }
    });
});

// ===== PRODUCT DETAIL MODAL =====
const productModalOverlay = document.getElementById('product-modal-overlay');
const productModalClose = document.getElementById('product-modal-close');

function openProductModal(product) {
    currentModalProduct = product;
    modalCarouselIdx = 0;

    const track = document.getElementById('modal-carousel-track');
    const dots = document.getElementById('modal-carousel-dots');
    track.innerHTML = product.images.map((img, i) =>
        `<img src="${img}" alt="${product.name}" class="carousel-slide${i === 0 ? ' active' : ''}">`
    ).join('');
    dots.innerHTML = product.images.map((_, i) =>
        `<span class="dot${i === 0 ? ' active' : ''}" data-idx="${i}"></span>`
    ).join('');

    document.getElementById('product-modal-name').textContent = product.name;
    const specs = [product.brand, product.strength, product.volume].filter(Boolean).join(' · ');
    document.getElementById('product-modal-desc').textContent = specs ? specs + ' · ' + product.desc : product.desc;
    document.getElementById('product-modal-price').textContent = product.price + '\u20BD';
    const oldPriceEl = document.getElementById('product-modal-old-price');
    if (product.oldPrice) {
        oldPriceEl.textContent = product.oldPrice + '\u20BD';
        oldPriceEl.style.display = 'inline';
    } else {
        oldPriceEl.style.display = 'none';
    }

    const flavorWrap = document.getElementById('product-modal-flavors');
    if (product.flavors && product.flavors.length > 0) {
        flavorWrap.style.display = 'block';
        flavorWrap.innerHTML = '<div class="flavor-label">Вкус:</div><div class="flavor-options">' +
            product.flavors.map((f, i) =>
                `<button class="flavor-btn${i === 0 ? ' active' : ''}" data-flavor="${f}">${f}</button>`
            ).join('') + '</div>';
        flavorWrap.querySelectorAll('.flavor-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                flavorWrap.querySelectorAll('.flavor-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    } else {
        flavorWrap.style.display = 'none';
    }

    productModalOverlay.classList.add('active');
    history.pushState({ modal: 'product' }, '');
}

function closeProductModal() {
    productModalOverlay.classList.remove('active');
    currentModalProduct = null;
}

productModalClose.addEventListener('click', closeProductModal);
productModalOverlay.addEventListener('click', function(e) {
    if (e.target === productModalOverlay) closeProductModal();
});

function modalGoTo(i) {
    const track = document.getElementById('modal-carousel-track');
    const dots = document.getElementById('modal-carousel-dots');
    const slides = track.querySelectorAll('.carousel-slide');
    const allDots = dots.querySelectorAll('.dot');
    slides[modalCarouselIdx].classList.remove('active');
    allDots[modalCarouselIdx].classList.remove('active');
    modalCarouselIdx = (i + slides.length) % slides.length;
    slides[modalCarouselIdx].classList.add('active');
    allDots[modalCarouselIdx].classList.add('active');
}

document.getElementById('modal-arrow-left').addEventListener('click', function(e) {
    e.stopPropagation();
    modalGoTo(modalCarouselIdx - 1);
});
document.getElementById('modal-arrow-right').addEventListener('click', function(e) {
    e.stopPropagation();
    modalGoTo(modalCarouselIdx + 1);
});
document.getElementById('modal-carousel-dots').addEventListener('click', function(e) {
    if (e.target.classList.contains('dot')) {
        e.stopPropagation();
        modalGoTo(parseInt(e.target.dataset.idx));
    }
});

let modalStartX = 0;
document.getElementById('modal-carousel').addEventListener('touchstart', function(e) {
    modalStartX = e.touches[0].clientX;
}, { passive: true });
document.getElementById('modal-carousel').addEventListener('touchend', function(e) {
    const diff = modalStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
        modalGoTo(modalCarouselIdx + (diff > 0 ? 1 : -1));
    }
}, { passive: true });

document.getElementById('product-modal-add').addEventListener('click', function() {
    if (currentModalProduct) {
        const flavorWrap = document.getElementById('product-modal-flavors');
        const activeFlavor = flavorWrap.querySelector('.flavor-btn.active');
        const flavor = activeFlavor ? activeFlavor.dataset.flavor : null;
        addToCart(currentModalProduct, flavor);
        closeProductModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductModal();
        closeCheckoutModal();
    }
});

window.addEventListener('popstate', function(e) {
    if (productModalOverlay.classList.contains('active')) {
        closeProductModal();
    } else if (checkoutModal.classList.contains('active')) {
        closeCheckoutModal();
    }
});

// ===== TELEGRAM =====
const TG_BOT_TOKEN = '8998190707:AAGdER2nAXMVywoXl-WEzVQPA3kUtA6bW8k';
const TG_CHAT_ID = '1951895339';

function sendTelegramMessage(text) {
    if (TG_BOT_TOKEN === 'YOUR_BOT_TOKEN') return;
    fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT_ID, text: text, parse_mode: 'HTML' })
    });
}

// ===== CHECKOUT MODAL =====
const checkoutModal = document.getElementById('checkout-modal');
const modalClose = document.getElementById('modal-close');
const checkoutForm = document.getElementById('checkout-form');
const checkoutStepForm = document.getElementById('checkout-step-form');
const checkoutStepPayment = document.getElementById('checkout-step-payment');

let checkoutData = {};

function openCheckoutModal() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }

    checkoutStepForm.style.display = 'block';
    checkoutStepPayment.style.display = 'none';

    const summary = document.getElementById('modal-summary');
    let itemsHtml = cart.map(item =>
        `<div class="summary-item"><span>${item.name}${item.flavor ? ' (' + item.flavor + ')' : ''} x${item.qty}</span><span>${item.price * item.qty}\u20BD</span></div>`
    ).join('');
    let total = getCartTotal();
    summary.innerHTML = itemsHtml + `<div class="summary-total"><span>Итого:</span><span>${total}\u20BD</span></div>`;

    checkoutModal.classList.add('active');
    history.pushState({ modal: 'checkout' }, '');
}

function closeCheckoutModal() {
    checkoutModal.classList.remove('active');
    checkoutForm.reset();
}

modalClose.addEventListener('click', closeCheckoutModal);
checkoutModal.addEventListener('click', function(e) {
    if (e.target === checkoutModal) closeCheckoutModal();
});

checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault();

    checkoutData = {
        name: document.getElementById('checkout-name').value.trim(),
        phone: document.getElementById('checkout-phone').value.trim(),
        address: document.getElementById('checkout-address').value.trim(),
        flat: document.getElementById('checkout-flat').value.trim(),
        comment: document.getElementById('checkout-comment').value.trim()
    };

    let itemsList = cart.map(item => `  \u2022 ${item.name}${item.flavor ? ' (' + item.flavor + ')' : ''} x${item.qty} \u2014 ${item.price * item.qty}\u20BD`).join('\n');
    let total = getCartTotal();

    let msg = `\uD83D\uDED2 *Новый заказ DormVape*\n\n` +
              `*Товары:*\n${itemsList}\n\n` +
              `*Итого: ${total}\u20BD*\n\n` +
              `\uD83D\uDC64 *Покупатель:*\n` +
              `  Имя: ${checkoutData.name}\n` +
              `  Телефон: ${checkoutData.phone}\n` +
              `  Адрес: ${checkoutData.address}${checkoutData.flat ? '\n  Кв/под: ' + checkoutData.flat : ''}` +
              `${checkoutData.comment ? '\n  Комментарий: ' + checkoutData.comment : ''}`;

    sendTelegramMessage(msg);

    checkoutStepForm.style.display = 'none';
    checkoutStepPayment.style.display = 'block';
    document.getElementById('payment-amount').textContent = getCartTotal() + '\u20BD';
});

document.getElementById('payment-confirm-btn').addEventListener('click', function() {
    cart = [];
    saveCart();
    updateCartUI();
    closeCheckoutModal();
    switchTab('home');
    alert('Спасибо за покупку!');
});

document.getElementById('checkout-btn').addEventListener('click', openCheckoutModal);

document.getElementById('clear-btn').addEventListener('click', function() {
    if (cart.length === 0) return;
    if (confirm('Очистить корзину?')) {
        cart = [];
        saveCart();
        updateCartUI();
    }
});

// ===== INIT =====
updateCartUI();
