// ── Painting data ──
const paintings = [
  {
    src: 'Paintings%20/IMG_0879.jpeg',
    title: 'Black Persian',
    meta: 'Oil on canvas · Original',
    tags: ['animals']
  },
  {
    src: 'Paintings%20/IMG_5200.jpeg',
    title: 'Spotted Hyena',
    meta: 'Pastel & gouache on handmade paper · Original',
    tags: ['animals']
  },
  {
    src: 'Paintings%20/IMG_5220.jpeg',
    title: 'Song Thrush',
    meta: 'Mixed media on handmade paper · Original',
    tags: ['birds']
  },
  {
    src: 'Paintings%20/IMG_6913.jpeg',
    title: 'Goat Cleaners',
    meta: 'Monoprint, 1/1 · 2000',
    tags: ['prints']
  },
  {
    src: 'Paintings%20/IMG_7034.jpeg',
    title: 'Dove by Moonlight',
    meta: 'Acrylic on canvas board · Original',
    tags: ['birds']
  },
  {
    src: 'Paintings%20/IMG_7492.jpeg',
    title: 'Two Figures at Night',
    meta: 'Pastel & mixed media on paper · Original',
    tags: ['animals']
  },
  {
    src: 'Paintings%20/IMG_7566.jpeg',
    title: 'Abstract in Black and Yellow',
    meta: 'Monoprint on paper · Original',
    tags: ['prints']
  },
  {
    src: 'Paintings%20/IMG_7733.jpeg',
    title: 'Crow Study',
    meta: 'Monoprint on handmade paper · Original',
    tags: ['birds']
  },
  {
    src: 'Paintings%20/IMG_7978.jpeg',
    title: 'Bird in Flight I',
    meta: 'Watercolour on paper · Original',
    tags: ['birds']
  },
  {
    src: 'Paintings%20/IMG_7982.jpeg',
    title: 'Bird in Flight II',
    meta: 'Watercolour on paper · Original',
    tags: ['birds']
  },
  {
    src: 'Paintings%20/IMG_7984.jpeg',
    title: 'Abstract Landscape',
    meta: 'Oil on canvas · Original',
    tags: ['animals']
  },
  {
    src: 'Paintings%20/IMG_8020.jpeg',
    title: 'Treecreeper',
    meta: 'Watercolour & gouache on paper · Original',
    tags: ['birds']
  },
  {
    src: 'Paintings%20/IMG_8053.jpeg',
    title: 'Collared Doves',
    meta: 'Pastel on paper · Original',
    tags: ['birds']
  },
  {
    src: 'Paintings%20/IMG_8542.jpeg',
    title: 'The Mole',
    meta: 'Oil on paper · Original',
    tags: ['animals']
  },
  {
    src: 'Paintings%20/IMG_9480.jpeg',
    title: 'Abstract Study',
    meta: 'Oil on board · Original',
    tags: ['prints']
  },
];

// ── Gallery ──
const grid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbTitle = document.getElementById('lbTitle');
const lbMeta = document.getElementById('lbMeta');
let currentIndex = 0;
let visiblePaintings = [...paintings];

function buildGallery(filter = 'all') {
  visiblePaintings = filter === 'all' ? paintings : paintings.filter(p => p.tags.includes(filter));
  grid.innerHTML = '';
  visiblePaintings.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <img src="${p.src}" alt="${p.title}" loading="lazy" />
      <div class="gallery-item-overlay"><p>${p.title}</p></div>
    `;
    item.addEventListener('click', () => openLightbox(i));
    grid.appendChild(item);
  });
}

function openLightbox(i) {
  currentIndex = i;
  const p = visiblePaintings[i];
  lbImg.src = p.src;
  lbImg.alt = p.title;
  lbTitle.textContent = p.title;
  lbMeta.textContent = p.meta;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.getElementById('lbPrev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + visiblePaintings.length) % visiblePaintings.length;
  openLightbox(currentIndex);
});
document.getElementById('lbNext').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % visiblePaintings.length;
  openLightbox(currentIndex);
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + visiblePaintings.length) % visiblePaintings.length; openLightbox(currentIndex); }
  if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % visiblePaintings.length; openLightbox(currentIndex); }
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    buildGallery(btn.dataset.filter);
  });
});

buildGallery();

// ── Cart ──
let cart = [];

const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartCountEl = document.getElementById('cartCount');
const cartItemsEl = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartTotalEl = document.getElementById('cartTotal');

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function updateCart() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartCountEl.textContent = cart.length;
  cartCountEl.style.display = cart.length ? 'flex' : 'none';
  cartTotalEl.textContent = '£' + total;
  cartFooter.style.display = cart.length ? 'block' : 'none';

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    return;
  }

  cartItemsEl.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-img">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
      </div>
      <div class="cart-item-info">
        <h4>${item.title}</h4>
        <p>${item.meta}</p>
      </div>
      <span class="cart-item-price">£${item.price}</span>
      <button class="cart-item-remove" data-index="${i}">&times;</button>
    </div>
  `).join('');

  cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      const removed = cart.splice(idx, 1)[0];
      // re-enable the shop card button
      document.querySelectorAll('.shop-card').forEach(card => {
        if (card.dataset.title === removed.title) {
          const shopBtn = card.querySelector('.shop-btn');
          shopBtn.textContent = 'Add to Cart';
          shopBtn.classList.remove('added');
          shopBtn.disabled = false;
        }
      });
      updateCart();
    });
  });
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.shop-card');
    const item = {
      title: card.dataset.title,
      price: parseInt(card.dataset.price),
      meta: card.dataset.meta
    };
    cart.push(item);
    btn.textContent = 'Added ✓';
    btn.classList.add('added');
    btn.disabled = true;
    updateCart();
    openCart();
  });
});

document.getElementById('cartCheckout').addEventListener('click', () => {
  alert('Online checkout coming soon! To purchase, please contact Madeleine directly:\n\n📧 townperry@yahoo.co.uk\n📞 07891 341 201');
});

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Hamburger ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ── Contact form ──
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  try {
    const res = await fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    if (res.ok) {
      document.getElementById('formSuccess').classList.add('show');
      form.reset();
    }
  } finally {
    btn.textContent = 'Send Enquiry';
    btn.disabled = false;
  }
});

// ── Newsletter form ──
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;
    const res = await fetch('/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    if (res.ok) {
      document.getElementById('newsletterSuccess').classList.add('show');
      form.reset();
    }
  });
}

// ── Fade-in on scroll ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .blog-card, .gallery-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
