/* ========================================
   MF TIRES HUB — flip.js
   Universal flip card handler
   ======================================== */

'use strict';

(function () {
  document.querySelectorAll('.flip-card').forEach(function (card) {
    var trigger  = card.querySelector('.flip-trigger');
    var back     = card.querySelector('.flip-card-back');
    var front    = card.querySelector('.flip-card-front');
    var closeBtn = back ? back.querySelector('.flip-close-btn') : null;
    if (!trigger || !back || !front) return;

    // Initial state: back is inert and hidden from AT
    back.setAttribute('inert', '');
    back.setAttribute('aria-hidden', 'true');

    function openCard() {
      card.classList.add('flipped');
      trigger.setAttribute('aria-expanded', 'true');
      front.setAttribute('inert', '');
      front.setAttribute('aria-hidden', 'true');
      back.removeAttribute('inert');
      back.removeAttribute('aria-hidden');
      if (closeBtn) closeBtn.focus();
    }

    function closeCard() {
      card.classList.remove('flipped');
      trigger.setAttribute('aria-expanded', 'false');
      back.setAttribute('inert', '');
      back.setAttribute('aria-hidden', 'true');
      front.removeAttribute('inert');
      front.removeAttribute('aria-hidden');
      trigger.focus();
    }

    // Click / keyboard on trigger → open
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      openCard();
    });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCard();
      }
    });

    // Explicit ✕ button — stopPropagation prevents double call from back's listener
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeCard();
      });
    }

    // Click anywhere on back → close (additional affordance)
    back.addEventListener('click', function () {
      closeCard();
    });

    // Esc key closes from anywhere within the card
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && card.classList.contains('flipped')) {
        closeCard();
      }
    });
  });
})();
