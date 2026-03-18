// Mobile menu toggle
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('navLinks').classList.remove('active');
    }
  });
});

// Gallery slider
let currentSlide = 0;
const track = document.getElementById('galleryTrack');
const slides = track.children;
const slideWidth = 350 + 24; // image width + gap

function slideGallery(direction) {
  const maxSlide = slides.length - Math.floor(track.parentElement.offsetWidth / slideWidth);
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = 0;
  if (currentSlide > maxSlide) currentSlide = maxSlide;
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Auto-slide gallery
setInterval(() => {
  const maxSlide = slides.length - Math.floor(track.parentElement.offsetWidth / slideWidth);
  if (currentSlide >= maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}, 5000);

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