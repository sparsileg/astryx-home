(function () {
  var show = document.querySelector('.slideshow');
  if (!show) return;

  var slides = Array.prototype.slice.call(show.querySelectorAll('.slide'));
  var images = Array.prototype.slice.call(show.querySelectorAll('.walkthrough-image'));
  var texts = Array.prototype.slice.call(show.querySelectorAll('.walkthrough-text'));
  var dots = Array.prototype.slice.call(show.querySelectorAll('.dot'));
  var prevBtn = show.querySelector('.nav-arrow.prev');
  var nextBtn = show.querySelector('.nav-arrow.next');
  var count = slides.length || images.length;
  var current = 0;

  function render() {
    slides.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
    images.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
    texts.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
    dots.forEach(function (d, i) {
      d.classList.toggle('is-active', i === current);
      d.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
  }

  function go(i) {
    current = (i + count) % count;
    render();
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { go(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { go(current + 1); });
  dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') go(current - 1);
    if (e.key === 'ArrowRight') go(current + 1);
  });

  render();
})();

// ---------- Click-to-zoom lightbox (runs on every page, independent of the slideshow above) ----------
(function () {
  var images = Array.prototype.slice.call(document.querySelectorAll('img'));
  if (!images.length) return;

  var overlay = null;

  function close() {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
    document.body.classList.remove('lightbox-open');
    document.removeEventListener('keydown', onKey);
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
  }

  function open(img) {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    var full = document.createElement('img');
    full.className = 'lightbox-img';
    full.src = img.currentSrc || img.src;
    full.alt = img.alt || '';

    overlay.appendChild(full);
    overlay.addEventListener('click', close);
    document.body.appendChild(overlay);
    document.body.classList.add('lightbox-open');
    document.addEventListener('keydown', onKey);
  }

  images.forEach(function (img) {
    img.classList.add('zoomable');
    img.addEventListener('click', function () { open(img); });
  });
})();
