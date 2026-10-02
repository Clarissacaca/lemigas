// Ukur tinggi header (topbar + navbar) supaya hero bisa menyesuaikan (biar nav-nya
// kelihatan "melayang" di atas foto tapi tetap sticky pas discroll)
function setHeaderHeightVar() {
  var header = document.getElementById('site-header');
  if (header) {
    document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  }
}
window.addEventListener('DOMContentLoaded', setHeaderHeightVar);
window.addEventListener('load', setHeaderHeightVar);
window.addEventListener('resize', setHeaderHeightVar);

// Buka/tutup dropdown menu di navbar
function toggleDropdown(id) {
  var el = document.getElementById(id);
  var wasOpen = el.classList.contains('open');
  document.querySelectorAll('.has-dropdown').forEach(function (d) {
    d.classList.remove('open');
  });
  document.querySelectorAll('.has-submenu').forEach(function (d) {
    d.classList.remove('open');
  });
  if (!wasOpen) el.classList.add('open');
}

// Buka/tutup submenu bertingkat (contoh: Dokumen Strategis)
function toggleSubmenu(event, id) {
  event.stopPropagation();
  var el = document.getElementById(id);
  var wasOpen = el.classList.contains('open');
  document.querySelectorAll('.has-submenu').forEach(function (d) {
    d.classList.remove('open');
  });
  if (!wasOpen) el.classList.add('open');
}

// Tutup dropdown & submenu kalau klik di luar area menu
document.addEventListener('click', function (e) {
  if (!e.target.closest('.has-dropdown')) {
    document.querySelectorAll('.has-dropdown').forEach(function (d) {
      d.classList.remove('open');
    });
  }
  if (!e.target.closest('.has-submenu')) {
    document.querySelectorAll('.has-submenu').forEach(function (d) {
      d.classList.remove('open');
    });
  }
});

// Contoh aksi tombol cari (silakan diganti dengan fitur pencarian asli)
function handleSearch() {
  alert('Fitur pencarian masih contoh ya');
}

// Contoh submit form kontak (masih demo, belum terhubung ke server/email)
function handleContactSubmit(event) {
  event.preventDefault();
  alert('Terima kasih! Pesan kamu sudah "terkirim" (ini masih demo, belum terhubung ke server asli).');
  event.target.reset();
}

function startHeroSlideshow() {
  var slides = document.querySelectorAll('.hero-bg-slide');
  if (slides.length < 2) return;
  var current = 0;
  setInterval(function () {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 2500);
}
window.addEventListener('DOMContentLoaded', startHeroSlideshow);

//counting animation
function startCountingAnimation() {
  var nums = document.querySelectorAll('.stats .num');
  if (nums.length === 0) return;
  var duration = 1500;
  function animateNum(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var current = Math.floor(progress * target);
      el.textContent = current + '+';
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + '+';
    }
    requestAnimationFrame(step);
  }
  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        nums.forEach(animateNum);
        obs.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(document.querySelector('.stats'));
}
window.addEventListener('DOMContentLoaded', startCountingAnimation);


// Galeri: kombinasi filter kategori + pagination
var galleryState = { category: 'semua', page: '1' };
 
function filterGallery(btn, category) {
  galleryState.category = category;
  document.querySelectorAll('.gallery-filters button').forEach(function (b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  updateGalleryView();
}
 
function goToGalleryPage(btn, page) {
  galleryState.page = String(page);
  document.querySelectorAll('.gallery-pagination button[data-page]').forEach(function (b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  updateGalleryView();
  window.scrollTo({ top: document.querySelector('.gallery-grid-pro').offsetTop - 150, behavior: 'smooth' });
}
 
function goToGalleryPageDelta(delta) {
  var current = parseInt(galleryState.page, 10);
  var buttons = document.querySelectorAll('.gallery-pagination button[data-page]');
  var maxPage = buttons.length;
  var next = current + delta;
  if (next < 1 || next > maxPage) return;
  var targetBtn = document.querySelector('.gallery-pagination button[data-page="' + next + '"]');
  if (targetBtn) goToGalleryPage(targetBtn, next);
}
 
function updateGalleryView() {
  document.querySelectorAll('.gallery-tile').forEach(function (tile) {
    var matchCategory = galleryState.category === 'semua' || tile.getAttribute('data-category') === galleryState.category;
    var matchPage = tile.getAttribute('data-page') === galleryState.page;
    tile.style.display = (matchCategory && matchPage) ? '' : 'none';
  });
}
 