// Social sharing functionality for ROR STAY
(function() {
  'use strict';

  // Share via WhatsApp
  function shareWhatsApp(propertyTitle, propertyPrice, propertyLocation) {
    const message = `Check out this property on ROR STAY!\n\n${propertyTitle}\n📍 ${propertyLocation}\n💰 ₹${propertyPrice}/month\n\nVisit: ${window.location.href}`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  }

  // Copy link to clipboard
  function copyLink(url = window.location.href) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        showNotification('Link copied to clipboard!', 'success');
      }).catch(() => {
        fallbackCopyLink(url);
      });
    } else {
      fallbackCopyLink(url);
    }
  }

  // Fallback copy method
  function fallbackCopyLink(url) {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      showNotification('Link copied!', 'success');
    } catch (err) {
      showNotification('Failed to copy link', 'error');
    }
    
    document.body.removeChild(textArea);
  }

  // Share via native Web Share API (mobile)
  function nativeShare(propertyTitle, propertyPrice) {
    if (navigator.share) {
      navigator.share({
        title: `${propertyTitle} - ROR STAY`,
        text: `Check out this property: ${propertyTitle} at ₹${propertyPrice}/month`,
        url: window.location.href
      }).catch(err => {
        console.log('Share cancelled or failed:', err);
      });
    } else {
      // Fallback to WhatsApp
      shareWhatsApp(propertyTitle, propertyPrice, 'Jaipur');
    }
  }

  // Show notification
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  // Export to global scope
  window.RORStayShare = {
    whatsapp: shareWhatsApp,
    copyLink: copyLink,
    native: nativeShare
  };
})();
