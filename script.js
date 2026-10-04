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

// Buka/tutup menu mobile (hamburger)
function toggleMobileNav() {
  var navPill = document.querySelector('.nav-pill');
  var overlay = document.querySelector('.nav-overlay');
  navPill.classList.toggle('mobile-open');
  overlay.classList.toggle('active');
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

/* ===== SEARCH ===== */
// Daftar halaman yang bisa dicari. Tambah baris baru kalau ada halaman baru.
// "kw" = kata kunci tambahan supaya halaman bisa ditemukan dengan kata lain.
var SEARCH_INDEX = [
  { title: 'Beranda', desc: 'Halaman utama', url: 'index.html', kw: 'home utama lemigas balai besar pengujian' },
  { title: 'Sejarah', desc: 'Tentang Kami', url: 'tentang-kami.html#sejarah', kw: 'tentang kami profil history' },
  { title: 'Visi Misi', desc: 'Tentang Kami', url: 'tentang-kami.html#visimisi', kw: 'visi misi tujuan' },
  { title: 'Struktur Organisasi', desc: 'Tentang Kami', url: 'tentang-kami.html#struktur', kw: 'struktur organisasi pimpinan' },
  { title: 'Inovasi', desc: 'Tentang Kami', url: 'tentang-kami.html#inovasi', kw: 'inovasi penelitian' },
  { title: 'Layanan', desc: 'Pengujian, studi, tenaga ahli, laboratorium', url: 'layanan.html', kw: 'pengujian studi tenaga ahli laboratorium sertifikasi blending eksplorasi minyak gas bumi' },
  { title: 'Pengumuman', desc: 'Publikasi', url: 'publikasi-pengumuman.html', kw: 'publikasi pengumuman' },
  { title: 'Siaran Pers', desc: 'Publikasi', url: 'publikasi-siaran-pers.html', kw: 'publikasi berita press release' },
  { title: 'Jurnal Ilmiah', desc: 'Publikasi', url: 'publikasi-jurnal-ilmiah.html', kw: 'publikasi jurnal ilmiah penelitian' },
  { title: 'Rencana Bisnis & Anggaran', desc: 'Dokumen Strategis', url: 'publikasi-dokumen-strategis.html#rba', kw: 'rba dokumen strategis' },
  { title: 'Rencana Strategis', desc: 'Dokumen Strategis', url: 'publikasi-dokumen-strategis.html#renstra', kw: 'renstra dokumen strategis' },
  { title: 'Laporan Kinerja', desc: 'Dokumen Strategis', url: 'publikasi-dokumen-strategis.html#laporan-kinerja', kw: 'lakin dokumen strategis' },
  { title: 'Perjanjian Kinerja', desc: 'Dokumen Strategis', url: 'publikasi-dokumen-strategis.html#perjanjian-kinerja', kw: 'perkin dokumen strategis' },
  { title: 'Laporan Kegiatan', desc: 'Dokumen Strategis', url: 'publikasi-dokumen-strategis.html#laporan-kegiatan', kw: 'dokumen strategis kegiatan' },
  { title: 'Digital Library', desc: 'Publikasi', url: 'publikasi-digital-library.html', kw: 'perpustakaan buku library' },
  { title: 'Galeri', desc: 'Publikasi', url: 'publikasi-galeri.html', kw: 'foto video dokumentasi' },
  { title: 'Daftar Informasi Publik', desc: 'Publikasi', url: 'publikasi-daftar-informasi-publik.html', kw: 'dip informasi publik ppid' },
  { title: 'Kontak', desc: 'Alamat, telepon, email', url: 'kontak.html', kw: 'hubungi alamat telepon email lokasi' }
];

document.addEventListener('DOMContentLoaded', function () {
  var box = document.querySelector('.search-box');
  if (!box) return;
  var input = box.querySelector('input');
  var btn = box.querySelector('button');

  var results = document.createElement('div');
  results.className = 'search-results';
  box.appendChild(results);

  var isMobile = function () { return window.matchMedia('(max-width: 900px)').matches; };
  var items = [];
  var active = -1;

  function runSearch(q) {
    q = q.trim().toLowerCase();
    if (!q) { results.classList.remove('show'); items = []; return; }
    var words = q.split(/\s+/);
    items = SEARCH_INDEX.filter(function (p) {
      var hay = (p.title + ' ' + p.desc + ' ' + p.kw).toLowerCase();
      return words.every(function (w) { return hay.indexOf(w) !== -1; });
    });
    active = -1;
    results.innerHTML = items.length
      ? items.map(function (p) {
          return '<a href="' + p.url + '">' + p.title + '<small>' + p.desc + '</small></a>';
        }).join('')
      : '<div class="no-result">Tidak ada hasil ditemukan.</div>';
    results.classList.add('show');
  }

  function setActive(i) {
    var links = results.querySelectorAll('a');
    links.forEach(function (l) { l.classList.remove('focus'); });
    if (links[i]) {
      links[i].classList.add('focus');
      links[i].scrollIntoView({ block: 'nearest' });
    }
    active = i;
  }

  function closeAll() {
    results.classList.remove('show');
    box.classList.remove('expanded');
  }

  function go() {
    var target = items[active >= 0 ? active : 0];
    if (target) window.location.href = target.url;
  }

  input.addEventListener('input', function () { runSearch(input.value); });
  input.addEventListener('focus', function () { if (input.value) runSearch(input.value); });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(active + 1, items.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(active - 1, 0)); }
    else if (e.key === 'Escape') { closeAll(); input.blur(); }
    else if (e.key === 'Enter') { e.preventDefault(); go(); }
  });

  btn.addEventListener('click', function () {
    // Mobile: klik pertama membuka kolom search
    if (isMobile() && !box.classList.contains('expanded')) {
      box.classList.add('expanded');
      input.focus();
      return;
    }
    if (!input.value.trim()) {
      if (isMobile()) closeAll(); else input.focus();
      return;
    }
    if (items.length) go(); else runSearch(input.value);
  });

  document.addEventListener('click', function (e) {
    if (!box.contains(e.target)) closeAll();
  });
});
// Accordion "Layanan Lainnya"
function toggleAccordionRow(header) {
  var row = header.parentElement;
  row.classList.toggle('open');
}
