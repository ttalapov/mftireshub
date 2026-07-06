/* ========================================
   MF TIRES HUB — faq.js
   Accessible FAQ accordion (disclosure pattern)
   ======================================== */

'use strict';

(function () {
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn   = item.querySelector('.faq-q');
    var panel = item.querySelector('.faq-a');
    if (!btn || !panel) return;

    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    });
  });
})();
