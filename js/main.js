/* ========================================
   MF TIRES HUB — main.js
   ======================================== */

'use strict';

// ---- Header scroll effect ----
(function () {
  const header = document.getElementById('header');
  if (!header) return;

  const THRESHOLD = 60;

  function onScroll() {
    if (window.scrollY > THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check
})();


// ---- Mobile burger menu ----
(function () {
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobile-menu');
  if (!burger || !menu) return;

  burger.addEventListener('click', function () {
    const isOpen = !menu.classList.contains('hidden');

    if (isOpen) {
      menu.classList.add('hidden');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    } else {
      menu.classList.remove('hidden');
      burger.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
    }
  });

  // Close on nav link click (mobile)
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.add('hidden');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();


// ---- Smooth scroll for anchor links ----
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.getElementById('header')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


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
  const grids = document.querySelectorAll('.grid');

  grids.forEach(function (grid) {
    const children = Array.from(grid.children);
    children.forEach(function (child, i) {
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

  function countUp(el) {
    const target   = +el.getAttribute('data-target');
    const suffix   = el.querySelector('.text-brand-red');
    const duration = 1800; // ms
    const steps    = 60;
    const interval = duration / steps;
    let current    = 0;

    // Easing: ease-out cubic
    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    let step = 0;
    const timer = setInterval(function () {
      step++;
      const progress = easeOut(step / steps);
      current = Math.round(progress * target);

      // Update text keeping the suffix span intact
      el.childNodes[0].textContent = current;

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

  stats.forEach(function (el) {
    observer.observe(el);
  });
})();



// ---- Flip cards — universal handler ----
// Працює для будь-якої .flip-card що містить кнопку .flip-trigger
(function () {
  document.querySelectorAll('.flip-card').forEach(function (card) {
    var trigger = card.querySelector('.flip-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      card.classList.add('flipped');
      trigger.setAttribute('aria-expanded', 'true');
    });

    card.addEventListener('click', function () {
      if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();
