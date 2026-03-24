// ── Painting data ──
const paintings = [
  {
    src: 'Paintings%20/IMG_7733.jpeg',
    title: 'Black Persian',
    meta: 'Oil on canvas · Original',
    tags: ['animals']
  },
  {
    src: 'Paintings%20/IMG_7492.jpeg',
    title: 'Spotted Hyena',
    meta: 'Mixed media on handmade paper · Original',
    tags: ['animals']
  },
  {
    src: 'Paintings%20/IMG_7566.jpeg',
    title: 'Night Dove',
    meta: 'Acrylic on canvas board · Original',
    tags: ['birds']
  },
  {
    src: 'Paintings%20/IMG_7982.jpeg',
    title: 'Goat Cleaners',
    meta: 'Monoprint, 1/1 · 2000',
    tags: ['prints']
  },
  {
    src: 'Paintings%20/IMG_7984.jpeg',
    title: 'Song Thrush',
    meta: 'Mixed media on handmade paper · Original',
    tags: ['birds']
  },
  {
    src: 'Paintings%20/IMG_7978.jpeg',
    title: 'Work on Paper I',
    meta: 'Mixed media · Original',
    tags: ['animals']
  },
  {
    src: 'Paintings%20/IMG_8020.jpeg',
    title: 'Study in Blue',
    meta: 'Mixed media · Original',
    tags: ['animals']
  },
  {
    src: 'Paintings%20/IMG_8053.jpeg',
    title: 'Work on Paper II',
    meta: 'Mixed media · Original',
    tags: ['birds']
  },
  {
    src: 'Paintings%20/IMG_8542.jpeg',
    title: 'Moonlit Flight',
    meta: 'Acrylic on canvas · Original',
    tags: ['birds']
  },
  {
    src: 'Paintings%20/IMG_9480.jpeg',
    title: 'Animal Study',
    meta: 'Mixed media · Original',
    tags: ['animals']
  },
  {
    src: 'Paintings%20/IMG_5200.jpeg',
    title: 'Landscape with Figure',
    meta: 'Mixed media · Original',
    tags: ['prints']
  },
  {
    src: 'Paintings%20/IMG_5220.jpeg',
    title: 'Composition Study',
    meta: 'Mixed media · Original',
    tags: ['animals']
  },
  {
    src: 'Paintings%20/IMG_6913.jpeg',
    title: 'Field Notes',
    meta: 'Mixed media on paper · Original',
    tags: ['animals']
  },
  {
    src: 'Paintings%20/IMG_0879.jpeg',
    title: 'Sketch in Colour',
    meta: 'Mixed media · Original',
    tags: ['prints']
  },
  {
    src: 'Paintings%20/IMG_7034.jpeg',
    title: 'Studio Work',
    meta: 'Mixed media · Original',
    tags: ['birds']
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
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  // Simulate send (replace with a real backend / Formspree endpoint)
  setTimeout(() => {
    document.getElementById('formSuccess').classList.add('show');
    form.reset();
    btn.textContent = 'Send Enquiry';
    btn.disabled = false;
  }, 1200);
});

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
