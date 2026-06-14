// Mobile menu toggle
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const toggle = document.querySelector('.mobile-toggle');
  const isOpen = navLinks.classList.toggle('active');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('navLinks').classList.remove('active');
      const toggle = document.querySelector('.mobile-toggle');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    }
  });
});

// Background music. Browsers may block audible autoplay until first interaction.
const backgroundMusic = document.getElementById('backgroundMusic');

function startBackgroundMusic() {
  if (!backgroundMusic) return;
  backgroundMusic.volume = 0.32;
  const playPromise = backgroundMusic.play();
  if (playPromise) {
    playPromise.catch(() => {
      document.addEventListener('click', startBackgroundMusic, { once: true });
      document.addEventListener('touchstart', startBackgroundMusic, { once: true });
      document.addEventListener('keydown', startBackgroundMusic, { once: true });
      document.addEventListener('scroll', startBackgroundMusic, { once: true });
    });
  }
}

startBackgroundMusic();

// Hero image slider
const heroSlides = document.getElementById('heroSlides');
let heroSlide = 0;

if (heroSlides && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const heroSlideCount = heroSlides.children.length;
  heroSlides.appendChild(heroSlides.firstElementChild.cloneNode(true));

  setInterval(() => {
    heroSlide++;
    heroSlides.style.transform = `translateX(-${heroSlide * 100}%)`;
  }, 5500);

  heroSlides.addEventListener('transitionend', () => {
    if (heroSlide !== heroSlideCount) return;
    heroSlide = 0;
    heroSlides.classList.add('is-resetting');
    heroSlides.style.transform = 'translateX(0)';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => heroSlides.classList.remove('is-resetting'));
    });
  });
}

// Gallery slider
let currentSlide = 0;
const track = document.getElementById('galleryTrack');
const slides = track.children;

function getSlideWidth() {
  const firstSlide = slides[0];
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  return firstSlide.getBoundingClientRect().width + gap;
}

function getMaxSlide() {
  return Math.max(0, slides.length - Math.floor(track.parentElement.offsetWidth / getSlideWidth()));
}

function positionGallery() {
  currentSlide = Math.min(currentSlide, getMaxSlide());
  track.style.transform = `translateX(-${currentSlide * getSlideWidth()}px)`;
}

function slideGallery(direction) {
  const maxSlide = getMaxSlide();
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = 0;
  if (currentSlide > maxSlide) currentSlide = maxSlide;
  positionGallery();
}

// Auto-slide gallery
setInterval(() => {
  const maxSlide = getMaxSlide();
  if (currentSlide >= maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  positionGallery();
}, 5000);

window.addEventListener('resize', positionGallery);

// Reveal supporting content once as it enters the viewport
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px' });

  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('is-visible'));
}

// ── Countdown Timer ──
const cdTarget = new Date('July 25, 2026 10:00:00').getTime();
const cdPrev = {};

function cdPad(n) {
  return String(n).padStart(2, '0');
}

function cdSet(id, val) {
  const el = document.getElementById(id);
  if (!el || cdPrev[id] === val) return;
  cdPrev[id] = val;
  el.classList.add('flip');
  setTimeout(() => {
    el.textContent = val;
    el.classList.remove('flip');
  }, 200);
}

function cdTick() {
  const diff = cdTarget - Date.now();
  if (diff <= 0) {
    ['cd-d', 'cd-h', 'cd-m', 'cd-s'].forEach(id => cdSet(id, '00'));
    return;
  }
  cdSet('cd-d', cdPad(Math.floor(diff / 86400000)));
  cdSet('cd-h', cdPad(Math.floor((diff % 86400000) / 3600000)));
  cdSet('cd-m', cdPad(Math.floor((diff % 3600000) / 60000)));
  cdSet('cd-s', cdPad(Math.floor((diff % 60000) / 1000)));
}

cdTick();
setInterval(cdTick, 1000);
