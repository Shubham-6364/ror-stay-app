// Mobile-specific enhancements for ROR STAY
(function() {
  'use strict';

  // Detect if mobile device
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Make phone numbers clickable
  function initClickToCall() {
    const phoneElements = document.querySelectorAll('[data-phone]');
    phoneElements.forEach(el => {
      const phone = el.dataset.phone || el.textContent.replace(/\s/g, '');
      if (isMobile()) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
          window.location.href = `tel:${phone}`;
        });
      }
    });
  }

  // Add WhatsApp hover effect
  function initWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
      whatsappBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
      });
      whatsappBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initClickToCall();
    initWhatsAppButton();
    
    // Add mobile-specific class
    if (isMobile()) {
      document.body.classList.add('mobile-device');
    }
  }

  // Export to global scope
  window.RORStayMobile = {
    isMobile: isMobile
  };
})();
