/* ========================================
   MF TIRES HUB — ui.js
   Header scroll · Burger menu · Smooth scroll · Active nav
   ======================================== */

'use strict';

// ---- Header scroll effect ----
(function () {
  const header = document.getElementById('header');
  if (!header) return;

  const THRESHOLD = 60;

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > THRESHOLD);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


// ---- Mobile burger menu ----
(function () {
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobile-menu');
  if (!burger || !menu) return;

  function closeMenu() {
    menu.classList.add('hidden');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    menu.classList.remove('hidden');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
  }

  burger.addEventListener('click', function () {
    menu.classList.contains('hidden') ? openMenu() : closeMenu();
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Esc closes menu and returns focus to burger
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
      closeMenu();
      burger.focus();
    }
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

      // Move focus to section so AT users receive navigation confirmation
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', function handler() {
        target.removeAttribute('tabindex');
        target.removeEventListener('blur', handler);
      });
    });
  });
})();


// ---- Active nav on scroll ----
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.toggle(
              'nav-link--active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach(function (s) { observer.observe(s); });
})();


// ---- Maps click-to-load facade ----
(function () {
  var facade = document.getElementById('maps-facade');
  if (!facade) return;

  facade.addEventListener('click', function () {
    var wrap = facade.parentElement;
    var iframe = document.createElement('iframe');
    iframe.title = 'MF Tires Hub на карті Києва';
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.834!2d30.4093055!3d50.4167967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cb4b71620c89%3A0x3cad4edb0c7d48bd!2sMF%20TIRES%20HUB!5e0!3m2!1suk!2sua!4v1715000000000!5m2!1suk!2sua';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.cssText = 'border:0;min-height:320px';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.setAttribute('aria-label', 'Google Maps — MF Tires Hub, вул. Родини Бунґе 7, Київ');
    wrap.replaceChild(iframe, facade);
  });
})();
