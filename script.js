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
      // Close mobile menu if open
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

// Form submission
function handleSubmit(e) {
  e.preventDefault();
  alert('Thank you for your message! We will get back to you soon.');
  e.target.reset();
}