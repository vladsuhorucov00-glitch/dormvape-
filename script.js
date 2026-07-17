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

// ===== SWIPE TABS (MOBILE) =====
const tabOrder = ['home', 'catalog', 'cart'];

// ===== PRODUCTS DATA =====
function svgPlaceholder(text, bg, fg) {
    return 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="180"><rect width="200" height="180" rx="10" fill="' + bg + '"/><text x="100" y="90" dominant-baseline="middle" text-anchor="middle" fill="' + fg + '" font-size="14" font-family="Arial">' + text + '</text></svg>');
}
function svgMulti(text, colors) {
    return colors.map((c, i) => svgPlaceholder(text + ' #' + (i + 1), c.bg, c.fg));
}

let customProducts = JSON.parse(localStorage.getItem('dormvape_custom_products') || '[]');

function saveCustomProducts() {
    localStorage.setItem('dormvape_custom_products', JSON.stringify(customProducts));
}

function getAllProducts() {
    return [...products, ...customProducts];
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
    },
    {
        id: 9, name: 'Вейп 1', category: 'device',
        brand: '—', strength: null, volume: null,
        desc: 'Ждём данные от тебя',
        price: 490, oldPrice: null,
        flavors: null,
        images: ['img/v1_1.jpg', 'img/v1_2.jpg', 'img/v1_3.jpg']
    },
    {
        id: 10, name: 'Вейп 2', category: 'device',
        brand: '—', strength: null, volume: null,
        desc: 'Ждём данные от тебя',
        price: 540, oldPrice: null,
        flavors: null,
        images: ['img/v2_1.jpg', 'img/v2_2.jpg', 'img/v2_3.jpg']
    },
    {
        id: 11, name: 'Вейп 3', category: 'device',
        brand: '—', strength: null, volume: null,
        desc: 'Ждём данные от тебя',
        price: 380, oldPrice: null,
        flavors: null,
        images: ['img/v3_1.jpg', 'img/v3_2.jpg', 'img/v3_3.jpg', 'img/v3_4.jpg']
    },
    {
        id: 12, name: 'Вейп 4', category: 'device',
        brand: '—', strength: null, volume: null,
        desc: 'Ждём данные от тебя',
        price: 2490, oldPrice: null,
        flavors: null,
        images: ['img/v4_1.jpg', 'img/v4_2.jpg', 'img/v4_3.jpg']
    },
    {
        id: 13, name: 'Вейп 5', category: 'device',
        brand: '—', strength: null, volume: null,
        desc: 'Ждём данные от тебя',
        price: 3890, oldPrice: null,
        flavors: null,
        images: ['img/v5_1.jpg', 'img/v5_2.jpg', 'img/v5_3.jpg', 'img/v5_4.jpg']
    },
    {
        id: 14, name: 'Вейп 6', category: 'device',
        brand: '—', strength: null, volume: null,
        desc: 'Ждём данные от тебя',
        price: 2190, oldPrice: null,
        flavors: null,
        images: ['img/v6_1.jpg', 'img/v6_2.jpg', 'img/v6_3.jpg', 'img/v6_4.jpg']
    },
    {
        id: 15, name: 'Вейп 7', category: 'device',
        brand: '—', strength: null, volume: null,
        desc: 'Ждём данные от тебя',
        price: 1990, oldPrice: null,
        flavors: null,
        images: ['img/v7_1.jpg', 'img/v7_2.jpg', 'img/v7_3.jpg']
    },
    {
        id: 16, name: 'Вейп 8', category: 'device',
        brand: '—', strength: null, volume: null,
        desc: 'Ждём данные от тебя',
        price: 1990, oldPrice: null,
        flavors: null,
        images: ['img/v8_1.jpg']
    },
    {
        id: 17, name: 'Вейп 9', category: 'device',
        brand: '—', strength: null, volume: null,
        desc: 'Ждём данные от тебя',
        price: 1990, oldPrice: null,
        flavors: null,
        images: ['img/v9_1.jpg']
    },
    {
        id: 18, name: 'Испаритель 1', category: 'coil',
        brand: '—', strength: null, volume: null, ohm: '1.0Ω', coilVolume: null,
        desc: 'Ждём данные от тебя',
        price: 490, oldPrice: null,
        flavors: null,
        images: ['img/c1_1.jpg']
    },
    {
        id: 19, name: 'Испаритель 2', category: 'coil',
        brand: '—', strength: null, volume: null, ohm: '0.8Ω', coilVolume: null,
        desc: 'Ждём данные от тебя',
        price: 540, oldPrice: null,
        flavors: null,
        images: ['img/c2_1.jpg']
    },
    {
        id: 20, name: 'Картридж 1', category: 'coil',
        brand: '—', strength: null, volume: null, ohm: '1.2Ω', coilVolume: '2мл',
        desc: 'Ждём данные от тебя',
        price: 380, oldPrice: null,
        flavors: null,
        images: ['img/c3_1.jpg']
    },
    {
        id: 21, name: 'Картридж 2', category: 'coil',
        brand: '—', strength: null, volume: null, ohm: '1.0ом', coilVolume: '2мл',
        desc: 'Ждём данные от тебя',
        price: 380, oldPrice: null,
        flavors: null,
        images: ['img/c4_1.jpg']
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

let prevTotal = 0;

function animateNumber(el, from, to, duration, suffix) {
    const start = performance.now();
    const diff = to - from;
    if (diff === 0) return;
    function frame(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(from + diff * ease);
        el.textContent = current + (suffix || '');
        if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

function updateCartUI() {
    const count = getCartCount();
    const total = getCartTotal();

    const totalEl = document.getElementById('cart-total');
    animateNumber(totalEl, prevTotal, total, 400, '\u20BD');
    prevTotal = total;

    const badge = document.getElementById('cart-badge-tab');
    if (count > 0) {
        badge.textContent = count;
        badge.classList.remove('show');
        void badge.offsetWidth;
        badge.classList.add('show');
    } else {
        badge.classList.remove('show');
    }

    renderCartItems();
}

// ===== PRODUCTS =====
function renderProducts(filter) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    const all = getAllProducts();
    const filtered = filter && filter !== 'all'
        ? all.filter(p => p.category === filter)
        : all;

    grid.innerHTML = filtered.map(p => {
        const totalQty = cart.filter(c => c.id === p.id).reduce((s, c) => s + c.qty, 0);
        const specs = p.category === 'coil'
            ? [p.ohm, p.watts, p.coilVolume].filter(s => s && s !== '—').join(' · ')
            : [p.strength, p.volume].filter(s => s && s !== '—').join(' · ');
        const flavorsHtml = p.flavors && p.flavors.length
            ? `<div class="card-flavors">${p.flavors.map(f => `<span class="card-flavor-tag">${f}</span>`).join('')}</div>`
            : '';
        const qtyControl = totalQty > 0
            ? `<div class="card-qty-control">
                <button class="card-qty-btn card-qty-decr" data-id="${p.id}">-</button>
                <span class="card-qty-num">${totalQty}</span>
                <button class="card-qty-btn card-qty-incr" data-id="${p.id}">+</button>
               </div>`
            : `<button class="add-to-cart" data-id="${p.id}">+ Добавить в корзину</button>`;
        return `
        <div class="product-card" data-product-id="${p.id}" style="cursor:pointer">
            ${totalQty > 0 ? `<div class="cart-badge">${totalQty}</div>` : ''}
            <div class="product-thumb">
                <img src="${p.images[0]}" alt="${p.name}" loading="lazy" onload="this.parentElement.style.animation='none';this.parentElement.style.background='none'">
            </div>
            <h4>${p.name}</h4>
            ${specs ? `<div class="product-specs">${specs}</div>` : ''}
            ${flavorsHtml}
            <div class="price">
                ${p.price}\u20BD
                ${p.oldPrice ? `<span class="old-price">${p.oldPrice}\u20BD</span>` : ''}
            </div>
            ${qtyControl}
        </div>
    `}).join('');

    grid.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = parseInt(this.dataset.id);
            const product = getAllProducts().find(p => p.id === id);
            if (!product) return;
            const card = this.closest('.product-card');
            if (card) {
                card.classList.remove('card-bounce');
                void card.offsetWidth;
                card.classList.add('card-bounce');
            }
            if (product.flavors && product.flavors.length > 0) {
                openFlavorPicker(product, this);
            } else {
                addToCart(product);
                renderProducts(currentFilter);
            }
        });
    });

    grid.querySelectorAll('.card-qty-incr').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = parseInt(this.dataset.id);
            const product = getAllProducts().find(p => p.id === id);
            if (product) {
                addToCart(product);
                renderProducts(currentFilter);
            }
        });
    });

    grid.querySelectorAll('.card-qty-decr').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = parseInt(this.dataset.id);
            const item = cart.find(c => c.id === id);
            if (item) {
                item.qty--;
                if (item.qty <= 0) {
                    cart = cart.filter(c => c.id !== id);
                }
                saveCart();
                updateCartUI();
                renderProducts(currentFilter);
            }
        });
    });

    grid.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.add-to-cart') || e.target.closest('.card-qty-control') || e.target.closest('.carousel')) return;
            const id = parseInt(this.dataset.productId);
            const product = getAllProducts().find(p => p.id === id);
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

// ===== FLAVOR PICKER =====
function openFlavorPicker(product, anchor) {
    const popup = document.getElementById('flavor-picker-popup');
    const list = document.getElementById('flavor-picker-list');
    list.innerHTML = product.flavors.map(f =>
        `<button class="flavor-picker-btn" data-flavor="${f}">${f}</button>`
    ).join('');

    const rect = anchor.getBoundingClientRect();
    popup.style.display = 'block';
    popup.style.position = 'fixed';
    popup.style.bottom = 'auto';
    popup.style.left = Math.max(10, Math.min(rect.left, window.innerWidth - popup.offsetWidth - 10)) + 'px';
    popup.style.top = (rect.top - popup.offsetHeight - 8) + 'px';
    if (popup.getBoundingClientRect().top < 80) {
        popup.style.top = (rect.bottom + 8) + 'px';
    }

    list.querySelectorAll('.flavor-picker-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            addToCart(product, this.dataset.flavor);
            popup.style.display = 'none';
            renderProducts(currentFilter);
        });
    });

    function closePicker(e) {
        if (!popup.contains(e.target)) {
            popup.style.display = 'none';
            document.removeEventListener('click', closePicker);
        }
    }
    setTimeout(() => document.addEventListener('click', closePicker), 10);
}

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
    const specs = product.category === 'coil'
        ? [product.ohm, product.watts, product.coilVolume].filter(s => s && s !== '—').join(' · ')
        : [product.strength, product.volume].filter(s => s && s !== '—').join(' · ');
    document.getElementById('product-modal-desc').textContent = specs || '';
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
    renderProducts(currentFilter);
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

    const saved = JSON.parse(localStorage.getItem('dormvape_checkout') || 'null');
    if (saved) {
        document.getElementById('checkout-name').value = saved.name || '';
        document.getElementById('checkout-phone').value = saved.phone || '';
        document.getElementById('checkout-telegram').value = saved.telegram || '';
        document.getElementById('checkout-address').value = saved.address || '';
        document.getElementById('checkout-flat').value = saved.flat || '';
    }

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
        telegram: document.getElementById('checkout-telegram').value.trim(),
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
              `${checkoutData.telegram ? '  Telegram: ' + checkoutData.telegram + '\n' : ''}` +
              `  Адрес: ${checkoutData.address}${checkoutData.flat ? '\n  Кв/под: ' + checkoutData.flat : ''}` +
              `${checkoutData.comment ? '\n  Комментарий: ' + checkoutData.comment : ''}`;

    sendTelegramMessage(msg);

    if (document.getElementById('checkout-save').checked) {
        localStorage.setItem('dormvape_checkout', JSON.stringify(checkoutData));
    } else {
        localStorage.removeItem('dormvape_checkout');
    }

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

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

function observeCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.remove('visible');
        observer.observe(card);
    });
}

const productsObserver = new MutationObserver(() => observeCards());
const grid = document.getElementById('products-grid');
if (grid) productsObserver.observe(grid, { childList: true });
observeCards();

// ===== STATS (SECRET) =====
let logoTaps = 0;
let logoTapTimer = null;
let passwordTarget = 'stats';

document.querySelector('.logo-link').addEventListener('click', function(e) {
    logoTaps++;
    clearTimeout(logoTapTimer);
    logoTapTimer = setTimeout(() => { logoTaps = 0; }, 1500);
    if (logoTaps >= 5) {
        e.preventDefault();
        logoTaps = 0;
        passwordTarget = 'stats';
        document.getElementById('password-overlay').style.display = 'flex';
        const input = document.getElementById('password-input');
        input.value = '';
        document.getElementById('password-error').classList.remove('visible');
        setTimeout(() => input.focus(), 100);
    }
});

let catalogTaps = 0;
let catalogTapTimer = null;

document.querySelector('.bottom-tab[data-tab="catalog"]').addEventListener('click', function(e) {
    catalogTaps++;
    clearTimeout(catalogTapTimer);
    catalogTapTimer = setTimeout(() => { catalogTaps = 0; }, 1500);
    if (catalogTaps >= 5) {
        e.stopImmediatePropagation();
        catalogTaps = 0;
        passwordTarget = 'catalog';
        document.getElementById('password-overlay').style.display = 'flex';
        const input = document.getElementById('password-input');
        input.value = '';
        document.getElementById('password-error').classList.remove('visible');
        setTimeout(() => input.focus(), 100);
        return;
    }
}, true);

document.getElementById('password-ok').addEventListener('click', function() {
    const val = document.getElementById('password-input').value;
    if (val === '1234') {
        document.getElementById('password-overlay').style.display = 'none';
        if (passwordTarget === 'catalog') {
            switchTab('catalog-admin');
            renderCatalogAdmin();
        } else {
            switchTab('stats');
        }
    } else {
        document.getElementById('password-error').classList.add('visible');
        document.getElementById('password-input').value = '';
        document.getElementById('password-input').focus();
    }
});

document.getElementById('password-cancel').addEventListener('click', function() {
    document.getElementById('password-overlay').style.display = 'none';
});

document.getElementById('password-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('password-ok').click();
});

let statsEntries = JSON.parse(localStorage.getItem('dormvape_stats') || '[]');
let stockProducts = JSON.parse(localStorage.getItem('dormvape_stock') || '[]');

function saveStats() {
    localStorage.setItem('dormvape_stats', JSON.stringify(statsEntries));
}

function saveStock() {
    localStorage.setItem('dormvape_stock', JSON.stringify(stockProducts));
}

function stockAddProduct(name, qty) {
    const existing = stockProducts.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existing) {
        existing.qty += qty;
    } else {
        stockProducts.push({ name, qty });
    }
    saveStock();
    renderStock();
}

function stockRemoveProduct(name) {
    stockProducts = stockProducts.filter(p => p.name.toLowerCase() !== name.toLowerCase());
    saveStock();
    renderStock();
}

function renderStock() {
    const list = document.getElementById('stats-stock-list');
    const empty = document.getElementById('stats-stock-empty');
    if (!list) return;

    stockProducts = stockProducts.filter(p => p.qty > 0);
    saveStock();

    if (stockProducts.length === 0) {
        list.innerHTML = '';
        empty.style.display = 'block';
        return;
    }

    empty.style.display = 'none';
    list.innerHTML = stockProducts.map((p, i) => {
        let qtyClass = 'stock-item-qty';
        if (p.qty === 0) qtyClass += ' stock-qty-zero';
        else if (p.qty <= 5) qtyClass += ' stock-qty-low';
        return `<div class="stock-item">
            <span class="stock-item-name">${p.name}</span>
            <button class="stock-item-btn stock-minus" data-action="minus" data-idx="${i}">&minus;</button>
            <span class="${qtyClass}">${p.qty}</span>
            <button class="stock-item-btn stock-plus" data-action="plus" data-idx="${i}">+</button>
            <button class="stock-item-del" data-idx="${i}">&times;</button>
        </div>`;
    }).join('');

    list.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.dataset.idx);
            if (this.dataset.action === 'plus') stockProducts[idx].qty++;
            else if (this.dataset.action === 'minus' && stockProducts[idx].qty > 0) stockProducts[idx].qty--;
            saveStock();
            renderStock();
        });
    });

    list.querySelectorAll('.stock-item-del').forEach(btn => {
        btn.addEventListener('click', function() {
            stockRemoveProduct(stockProducts[parseInt(this.dataset.idx)].name);
        });
    });
}

function renderStats() {
    const incomeTbody = document.getElementById('stats-income-tbody');
    const expenseTbody = document.getElementById('stats-expense-tbody');
    const incomeEmpty = document.getElementById('stats-income-empty');
    const expenseEmpty = document.getElementById('stats-expense-empty');
    if (!incomeTbody || !expenseTbody) return;

    let totalIncome = 0;
    let totalExpense = 0;

    statsEntries.forEach(e => {
        if (e.type === 'income') totalIncome += e.amount;
        else totalExpense += e.totalAmount || e.amount || 0;
    });

    document.getElementById('stats-total-income').textContent = totalIncome + '\u20BD';
    document.getElementById('stats-total-expense').textContent = totalExpense + '\u20BD';
    document.getElementById('stats-total-profit').textContent = (totalIncome - totalExpense) + '\u20BD';

    const incomeEntries = statsEntries.map((e, i) => ({...e, realIdx: i})).filter(e => e.type === 'income').reverse();
    const expenseEntries = statsEntries.map((e, i) => ({...e, realIdx: i})).filter(e => e.type === 'expense').reverse();

    incomeEmpty.style.display = incomeEntries.length === 0 ? 'block' : 'none';
    expenseEmpty.style.display = expenseEntries.length === 0 ? 'block' : 'none';

    incomeTbody.innerHTML = incomeEntries.map(e => `<tr>
        <td>${e.date}</td>
        <td>${e.who || '—'}</td>
        <td>${e.desc || '—'}</td>
        <td>${e.qty || 1}</td>
        <td class="amount-income">${e.amount}\u20BD</td>
        <td><button class="delete-btn" data-idx="${e.realIdx}">&times;</button></td>
    </tr>`).join('');

    expenseTbody.innerHTML = expenseEntries.map(e => {
        const rows = (e.items || []).map(it => `<tr>
            <td>${it.name}</td>
            <td>x${it.qty}</td>
            <td>${it.price}\u20BD</td>
            <td>${it.total}\u20BD</td>
        </tr>`).join('');
        return `<div class="expense-card" data-idx="${e.realIdx}">
            <div class="expense-card-header" onclick="this.parentElement.classList.toggle('open')">
                <span class="expense-card-date">${e.date}</span>
                <span class="expense-card-invoice">${e.invoice || 'Без номера'}</span>
                <span class="expense-card-total">-${e.totalAmount || e.amount || 0}\u20BD</span>
                <span class="expense-card-chevron">\u25BC</span>
            </div>
            <div class="expense-card-body">
                <div class="expense-card-items">
                    <table><thead><tr><th>Товар</th><th>Кол-во</th><th>Цена</th><th>Сумма</th></tr></thead>
                    <tbody>${rows}</tbody></table>
                </div>
                <div class="expense-card-footer">
                    <button class="delete-btn" data-idx="${e.realIdx}">Удалить</button>
                </div>
            </div>
        </div>`;
    }).join('');

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            statsEntries.splice(parseInt(this.dataset.idx), 1);
            saveStats();
            renderStats();
        });
    });
}

// ===== STATS FILTER =====
document.querySelectorAll('.stats-filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.stats-filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const f = this.dataset.statsFilter;
        document.getElementById('stats-income-wrap').style.display = f === 'income' ? 'block' : 'none';
        document.getElementById('stats-expense-wrap').style.display = f === 'expense' ? 'block' : 'none';
        document.getElementById('stats-stock-wrap').style.display = f === 'stock' ? 'block' : 'none';
        document.getElementById('stats-income-form').style.display = f === 'income' ? 'block' : 'none';
        document.getElementById('stats-expense-form').style.display = f === 'expense' ? 'block' : 'none';
        document.getElementById('stats-form-header').style.display = f === 'stock' ? 'none' : 'block';
        const headers = { income: 'Добавить доход', expense: 'Добавить поставку' };
        document.getElementById('stats-form-header').querySelector('h3').textContent = headers[f] || '';
        if (f === 'stock') renderStock();
    });
});

// ===== INCOME FORM =====
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

// ===== DELIVERY ITEM ROWS =====
function calcItemTotal(row) {
    const qty = parseFloat(row.querySelector('.di-qty').value) || 0;
    const price = parseFloat(row.querySelector('.di-price').value) || 0;
    row.querySelector('.di-total').textContent = (qty * price) + '\u20BD';
    calcDeliveryTotal();
}

function calcDeliveryTotal() {
    let sum = 0;
    document.querySelectorAll('.delivery-item').forEach(row => {
        const qty = parseFloat(row.querySelector('.di-qty').value) || 0;
        const price = parseFloat(row.querySelector('.di-price').value) || 0;
        sum += qty * price;
    });
    document.getElementById('delivery-total').textContent = sum + '\u20BD';
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

// ===== EXPENSE FORM =====
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

    items.forEach(it => stockAddProduct(it.name, it.qty));

    this.reset();
    document.getElementById('delivery-items').innerHTML = `<div class="delivery-item">
        <input type="text" placeholder="Название" class="di-name" required>
        <input type="number" placeholder="Кол-во" class="di-qty" min="1" required>
        <input type="number" placeholder="Цена за шт." class="di-price" min="0" step="0.01" required>
        <span class="di-total">0₽</span>
        <button type="button" class="di-remove">&times;</button>
    </div>`;
    bindItemEvents(document.querySelector('.delivery-item'));
    document.getElementById('delivery-total').textContent = '0₽';
});

renderStats();
renderStock();

// ===== STOCK ADD =====
document.getElementById('stock-add-btn').addEventListener('click', function() {
    const name = document.getElementById('stock-product-name').value.trim();
    const qty = parseInt(document.getElementById('stock-product-qty').value) || 0;
    if (!name || qty < 0) return;
    stockAddProduct(name, qty);
    document.getElementById('stock-product-name').value = '';
    document.getElementById('stock-product-qty').value = '';
});

// ===== CATALOG ADMIN =====
function renderCatalogAdmin() {
    const list = document.getElementById('catalog-admin-list');
    const empty = document.getElementById('catalog-admin-empty');
    if (!list) return;

    if (customProducts.length === 0) {
        list.innerHTML = '';
        empty.style.display = 'block';
        return;
    }

    empty.style.display = 'none';
    list.innerHTML = customProducts.map((p, i) => {
        const thumb = p.images && p.images[0] ? `<img class="catalog-admin-thumb" src="${p.images[0]}" alt="">` : `<div class="catalog-admin-thumb"></div>`;
        const cat = { liquid: 'Жидкость', device: 'Вейп', coil: 'Испаритель' }[p.category] || p.category;
        return `<div class="catalog-admin-item">
            ${thumb}
            <div class="catalog-admin-info">
                <div class="catalog-admin-name">${p.name}</div>
                <div class="catalog-admin-meta">${cat}</div>
            </div>
            <div class="catalog-admin-price">${p.price}\u20BD</div>
            <button class="stock-item-del" data-idx="${i}">&times;</button>
        </div>`;
    }).join('');

    list.querySelectorAll('.stock-item-del').forEach(btn => {
        btn.addEventListener('click', function() {
            customProducts.splice(parseInt(this.dataset.idx), 1);
            saveCustomProducts();
            renderCatalogAdmin();
        });
    });
}

// ===== CATALOG PHOTO UPLOAD =====
let catPhotoData = null;

document.getElementById('cat-photo-upload').addEventListener('click', function() {
    document.getElementById('cat-image-file').click();
});

document.getElementById('cat-image-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const max = 600;
            let w = img.width, h = img.height;
            if (w > max || h > max) {
                if (w > h) { h = Math.round(h * max / w); w = max; }
                else { w = Math.round(w * max / h); h = max; }
            }
            canvas.width = w;
            canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            catPhotoData = canvas.toDataURL('image/jpeg', 0.7);
            document.getElementById('cat-photo-preview').src = catPhotoData;
            document.getElementById('cat-photo-preview').style.display = 'block';
            document.getElementById('cat-photo-placeholder').style.display = 'none';
        };
        img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
});

document.getElementById('cat-category').addEventListener('change', function() {
    document.getElementById('cat-fields-liquid').style.display = this.value === 'liquid' ? 'block' : 'none';
    document.getElementById('cat-fields-coil').style.display = this.value === 'coil' ? 'block' : 'none';
});

document.getElementById('catalog-add-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('cat-name').value.trim();
    const price = parseInt(document.getElementById('cat-price').value);
    if (!name || !price) return;

    const category = document.getElementById('cat-category').value;
    const strength = document.getElementById('cat-strength').value ? document.getElementById('cat-strength').value + 'мг' : null;
    const volume = document.getElementById('cat-volume').value ? document.getElementById('cat-volume').value + 'мл' : null;
    const ohm = category === 'coil' ? document.getElementById('cat-ohm').value : null;
    const watts = category === 'coil' && document.getElementById('cat-watts').value.trim() ? document.getElementById('cat-watts').value.trim() + 'W' : null;
    const coilVolume = category === 'coil' && document.getElementById('cat-coil-volume').value ? document.getElementById('cat-coil-volume').value + 'мл' : null;
    const oldPrice = parseInt(document.getElementById('cat-old-price').value) || null;
    const flavorsStr = document.getElementById('cat-flavors').value.trim();
    const flavors = flavorsStr ? flavorsStr.split(',').map(f => f.trim()).filter(Boolean) : null;

    const maxId = getAllProducts().reduce((max, p) => Math.max(max, p.id), 0);
    const images = catPhotoData ? [catPhotoData] : [svgPlaceholder(name, '#1a1a2e', '#ff5c00')];

    customProducts.push({ id: maxId + 1, name, category, strength, volume, ohm, watts, coilVolume, price, oldPrice, flavors, images });
    saveCustomProducts();
    renderCatalogAdmin();
    this.reset();
    catPhotoData = null;
    document.getElementById('cat-photo-preview').style.display = 'none';
    document.getElementById('cat-photo-placeholder').style.display = 'block';
    document.getElementById('cat-fields-liquid').style.display = 'none';
    document.getElementById('cat-fields-coil').style.display = 'none';
});

// ===== PARALLAX ORBS =====
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');
const orb3 = document.querySelector('.orb-3');

window.addEventListener('scroll', function() {
    const y = window.scrollY;
    if (orb1) orb1.style.transform = 'translate(' + (-y * 0.03) + 'px, ' + (y * 0.08) + 'px)';
    if (orb2) orb2.style.transform = 'translate(' + (y * 0.05) + 'px, ' + (-y * 0.04) + 'px)';
    if (orb3) orb3.style.transform = 'translate(' + (-y * 0.02) + 'px, ' + (y * 0.06) + 'px)';
}, { passive: true });

// ===== WELCOME MODAL =====
if (!localStorage.getItem('dormvape_welcomed')) {
    document.getElementById('welcome-overlay').style.display = 'flex';
}

document.getElementById('welcome-close').addEventListener('click', function() {
    if (document.getElementById('welcome-dontshow-cb').checked) {
        localStorage.setItem('dormvape_welcomed', '1');
    }
    document.getElementById('welcome-overlay').style.display = 'none';
    switchTab('catalog');
});
