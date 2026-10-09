// ==========================================================
//  DATA BERITA (satu sumber untuk semua halaman, ada di script.js)
//  - Slider "Info Terkini" di beranda (maksimal 5 berita terbaru)
//  - Kartu berita di halaman Siaran Pers (semua berita)
//  - Halaman detail berita (berita-detail.html?id=...)
//
//  Cara menambah berita: salin satu blok { ... }, tempel PALING ATAS
//  (berita terbaru di urutan pertama), lalu isi datanya.
//  id      : angka/kata unik, TIDAK boleh sama dengan berita lain
//  gambar  : nama file foto (taruh satu folder dengan index.html)
//  isi     : daftar paragraf. 1 teks dalam tanda kutip = 1 paragraf
// ==========================================================
window.BERITA = [
  {
    id: '1',
    tanggal: '26 Agustus 2026',
    judul: 'LEMIGAS Dorong Penguatan Monitoring dan Integritas Lokasi Penyimpanan CCS',
    gambar: 'berita1.jpg',
    isi: [
      '[Paragraf 1: isi berita pertama. Ganti teks ini.]',
      '[Paragraf 2: lanjutan isi berita. Tambah atau hapus paragraf sesuai kebutuhan.]'
    ]
  },
  {
    id: '2',
    tanggal: '19 Agustus 2026',
    judul: 'LEMIGAS dan PPSDM Migas Perkuat Sinergi Pengujian dan Pengembangan SDM',
    gambar: 'berita2.jpg',
    isi: [
      '[Paragraf 1: isi berita kedua. Ganti teks ini.]',
      '[Paragraf 2: lanjutan isi berita.]'
    ]
  },
  {
    id: '3',
    tanggal: '17 Agustus 2026',
    judul: 'Semarak Rangkaian Upacara HUT Ke-81 RI di LEMIGAS dan Ditjen Migas',
    gambar: 'berita3.jpg',
    isi: [
      '[Paragraf 1: isi berita ketiga. Ganti teks ini.]',
      '[Paragraf 2: lanjutan isi berita.]'
    ]
  },
  {
    id: '4',
    tanggal: '[Tanggal]',
    judul: '[Judul berita 4]',
    gambar: 'berita4.jpg',
    isi: [
      '[Paragraf 1: isi berita keempat. Ganti teks ini.]',
      '[Paragraf 2: lanjutan isi berita.]'
    ]
  },
  {
    id: '5',
    tanggal: '[Tanggal]',
    judul: '[Judul berita 5]',
    gambar: 'berita5.jpg',
    isi: [
      '[Paragraf 1: isi berita kelima. Ganti teks ini.]',
      '[Paragraf 2: lanjutan isi berita.]'
    ]
  },
  {
    id: '6',
    tanggal: '[Tanggal]',
    judul: '[Judul berita 6]',
    gambar: 'berita6.jpg',
    isi: [
      '[Paragraf 1: isi berita keenam. Ganti teks ini.]',
      '[Paragraf 2: lanjutan isi berita.]'
    ]
  }
];

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

/* ===== LINK DETAIL BERITA ===== */
function beritaUrl(b) {
  return 'publikasi-siaran-pers.html?id=' + encodeURIComponent(b.id);
}

/* ===== SLIDER BERITA (Info Terkini di beranda) ===== */
document.addEventListener('DOMContentLoaded', function () {
  var slider = document.getElementById('it-slider');
  if (!slider) return;
  var track = slider.querySelector('.it-track');

  // Isi slide dari berita-data.js (maksimal 5 berita terbaru)
  var list = (window.BERITA || []).slice(0, 5);
  if (list.length) track.innerHTML = '';
  list.forEach(function (b) {
    var a = document.createElement('a');
    a.className = 'it-slide';
    a.href = beritaUrl(b);
    if (b.gambar) {
      a.style.backgroundImage = "url('" + b.gambar + "'), linear-gradient(135deg, var(--navy), var(--navy-dark))";
    }
    var cap = document.createElement('div');
    cap.className = 'it-caption';
    var d = document.createElement('span');
    d.className = 'it-cap-date';
    d.textContent = b.tanggal;
    var h = document.createElement('h4');
    h.textContent = b.judul;
    cap.appendChild(d);
    cap.appendChild(h);
    a.appendChild(cap);
    track.appendChild(a);
  });

  var slides = slider.querySelectorAll('.it-slide');
  var dotsWrap = slider.querySelector('.it-dots');
  var n = slides.length, idx = 0, timer = null, ticking = false;

  var dots = [];
  for (var i = 0; i < n; i++) {
    (function (i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'it-dot';
      b.setAttribute('aria-label', 'Slide ' + (i + 1));
      b.addEventListener('click', function () { goTo(i); restart(); });
      dotsWrap.appendChild(b);
      dots.push(b);
    })(i);
  }

  function mark(i) {
    idx = i;
    for (var k = 0; k < n; k++) dots[k].classList.toggle('active', k === i);
  }
  function goTo(i) {
    i = (i + n) % n;
    track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
    mark(i);
  }
  track.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      mark(Math.round(track.scrollLeft / track.clientWidth));
      ticking = false;
    });
  });
  slider.querySelector('.it-prev').addEventListener('click', function () { goTo(idx - 1); restart(); });
  slider.querySelector('.it-next').addEventListener('click', function () { goTo(idx + 1); restart(); });

  function start() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    stop();
    timer = setInterval(function () { goTo(idx + 1); }, 5000);
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function restart() { start(); }
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('touchstart', stop, { passive: true });
  slider.addEventListener('touchend', start, { passive: true });
  window.addEventListener('resize', function () { track.scrollLeft = idx * track.clientWidth; });

  if (n < 2) {
    slider.querySelector('.it-prev').style.display = 'none';
    slider.querySelector('.it-next').style.display = 'none';
    dotsWrap.style.display = 'none';
    return;
  }
  mark(0);
  start();
});

/* ===== KARTU BERITA (halaman Siaran Pers) ===== */
document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('berita-grid');
  if (!grid || !window.BERITA) return;
  window.BERITA.forEach(function (b) {
    var card = document.createElement('div');
    card.className = 'berita-card';
    var thumb = document.createElement('div');
    thumb.className = 'thumb';
    if (b.gambar) {
      thumb.style.backgroundImage = "url('" + b.gambar + "'), linear-gradient(135deg, var(--navy), var(--navy-dark))";
    }
    var body = document.createElement('div');
    body.className = 'body';
    var d = document.createElement('div');
    d.className = 'date';
    d.textContent = b.tanggal;
    var h = document.createElement('h4');
    h.textContent = b.judul;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-secondary bd-detail-btn';
    btn.textContent = 'Detail Berita \u203A';
    btn.addEventListener('click', function () {
      if (window.openBerita) window.openBerita(b.id);
    });
    body.appendChild(d);
    body.appendChild(h);
    body.appendChild(btn);
    card.appendChild(thumb);
    card.appendChild(body);
    grid.appendChild(card);
  });
});


/* ===== POPUP DETAIL BERITA (di halaman Siaran Pers) ===== */
document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('berita-grid');
  if (!grid || !window.BERITA) return;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }
  function bg(url) {
    return "url('" + url + "'), linear-gradient(135deg, var(--navy), var(--navy-dark))";
  }
  var calendarSvg = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>';

  // Kerangka popup
  var modal = el('div', 'bd-modal');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML =
    '<div class="bd-backdrop" data-close="1"></div>' +
    '<div class="bd-dialog" role="dialog" aria-modal="true" aria-label="Detail berita">' +
      '<button type="button" class="bd-close" data-close="1" aria-label="Tutup">&times;</button>' +
      '<div class="bd-scroll">' +
        '<div class="bd-layout">' +
          '<article id="bd-article"></article>' +
          '<aside class="bd-side"><div class="bd-side-card">' +
            '<h3 class="bd-side-title">Berita Lainnya</h3><ul id="bd-others"></ul>' +
          '</div></aside>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);

  var article = modal.querySelector('#bd-article');
  var others = modal.querySelector('#bd-others');
  var scroller = modal.querySelector('.bd-scroll');
  var closeBtn = modal.querySelector('.bd-close');

  function find(id) {
    var r = null;
    window.BERITA.forEach(function (b) { if (String(b.id) === String(id)) r = b; });
    return r;
  }

  function render(b) {
    article.innerHTML = '';
    article.appendChild(el('h1', 'bd-title', b.judul));
    var meta = el('div', 'bd-date');
    meta.innerHTML = calendarSvg;
    meta.appendChild(el('span', '', b.tanggal));
    article.appendChild(meta);
    if (b.gambar) {
      var photo = el('div', 'bd-photo');
      photo.style.backgroundImage = bg(b.gambar);
      photo.setAttribute('role', 'img');
      photo.setAttribute('aria-label', b.judul);
      article.appendChild(photo);
    }
    var body = el('div', 'bd-body');
    (b.isi || []).forEach(function (p) { body.appendChild(el('p', '', p)); });
    article.appendChild(body);

    others.innerHTML = '';
    window.BERITA.filter(function (x) { return x !== b; }).slice(0, 5).forEach(function (x) {
      var li = el('li');
      var a = el('a', 'bd-other');
      a.href = beritaUrl(x);
      a.addEventListener('click', function (e) { e.preventDefault(); window.openBerita(x.id); });
      var th = el('div', 'bd-other-thumb');
      if (x.gambar) th.style.backgroundImage = bg(x.gambar);
      var tx = el('div', 'bd-other-text');
      var d = el('span', 'bd-other-date');
      d.innerHTML = calendarSvg;
      d.appendChild(el('span', '', x.tanggal));
      tx.appendChild(d);
      tx.appendChild(el('h4', '', x.judul));
      a.appendChild(th);
      a.appendChild(tx);
      li.appendChild(a);
      others.appendChild(li);
    });
    modal.querySelector('.bd-side').style.display = others.children.length ? '' : 'none';
    scroller.scrollTop = 0;
  }

  window.openBerita = function (id) {
    var b = find(id);
    if (!b) return;
    render(b);
    document.title = b.judul + ' - LEMIGAS';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (window.history && history.replaceState) {
      history.replaceState(null, '', '?id=' + encodeURIComponent(b.id));
    }
    closeBtn.focus();
  };

  function closeBerita() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.title = 'Siaran Pers - LEMIGAS';
    if (window.history && history.replaceState) {
      history.replaceState(null, '', window.location.pathname);
    }
  }

  modal.addEventListener('click', function (e) {
    if (e.target.getAttribute && e.target.getAttribute('data-close')) closeBerita();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeBerita();
  });

  // Dibuka dari slider beranda: publikasi-siaran-pers.html?id=...
  var startId = new URLSearchParams(window.location.search).get('id');
  if (startId) window.openBerita(startId);
});