/* ========================================
   MF TIRES HUB — animations.js
   Scroll reveal · Staggered · Count-up
   ======================================== */

'use strict';

// ---- Scroll reveal ----
(function () {
  const elements = document.querySelectorAll(
    '.service-card, .why-card, .delivery-card, .contact-info-card, .section-header'
  );
  if (!elements.length) return;

  elements.forEach(function (el) {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();


// ---- Staggered reveal for grid children ----
(function () {
  document.querySelectorAll('.grid').forEach(function (grid) {
    Array.from(grid.children).forEach(function (child, i) {
      if (child.classList.contains('reveal')) {
        child.style.transitionDelay = (i * 0.08) + 's';
      }
    });
  });
})();


// ---- Count-up animation ----
(function () {
  const stats = document.querySelectorAll('.stat-number[data-target]');
  if (!stats.length) return;

  // У HTML стоять фінальні числа (для краулерів і користувачів без JS);
  // обнуляємо їх лише коли JS точно працює — анімація стартує з 0.
  stats.forEach(function (el) {
    el.childNodes[0].textContent = '0';
  });

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function countUp(el) {
    const target   = +el.getAttribute('data-target');
    const duration = 1800;
    const steps    = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(function () {
      step++;
      el.childNodes[0].textContent = Math.round(easeOut(step / steps) * target);
      if (step >= steps) {
        el.childNodes[0].textContent = target;
        clearInterval(timer);
      }
    }, interval);
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach(function (el) { observer.observe(el); });
})();
