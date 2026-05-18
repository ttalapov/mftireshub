/* ========================================
   MF TIRES HUB — flip.js
   Universal flip card handler
   ======================================== */

'use strict';

// ---- Flip cards — universal handler ----
// Для будь-якої .flip-card що містить кнопку .flip-trigger:
// - клік по .flip-trigger → перевертає картку
// - клік будь-де по перевернутій картці → повертає назад
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
