// Animation utilities for ROR STAY
(function() {
  'use strict';

  // Animate numbers (counter animation)
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = Date.now();
    
    function update() {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = Math.floor(progress * target);
      element.textContent = current + (target >= 100 ? '+' : '');
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    update();
  }

  // Intersection Observer for scroll animations
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .listing-card, .stat-number');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Animate stat numbers
          if (entry.target.classList.contains('stat-number')) {
            const text = entry.target.textContent;
            const number = parseInt(text.match(/\d+/)?.[0] || '0');
            if (number > 0) {
              animateCounter(entry.target, number);
            }
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Smooth scroll
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initScrollAnimations();
    initSmoothScroll();
  }

  // Export to global scope
  window.RORStayAnimations = {
    counter: animateCounter
  };
})();
