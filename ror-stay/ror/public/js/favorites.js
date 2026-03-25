// Favorites/Wishlist functionality for ROR STAY
(function() {
  'use strict';

  const FAVORITES_KEY = 'ror_stay_favorites';

  // Get favorites from localStorage
  function getFavorites() {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (e) {
      console.error('Error reading favorites:', e);
      return [];
    }
  }

  // Save favorites to localStorage
  function saveFavorites(favorites) {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    } catch (e) {
      console.error('Error saving favorites:', e);
      return false;
    }
  }

  // Toggle favorite status
  function toggleFavorite(propertyId) {
    let favorites = getFavorites();
    const index = favorites.indexOf(propertyId);
    
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(propertyId);
    }
    
    saveFavorites(favorites);
    return index === -1; // return true if added
  }

  // Check if property is favorited
  function isFavorite(propertyId) {
    const favorites = getFavorites();
    return favorites.includes(propertyId);
  }

  // Get count of favorites
  function getFavoritesCount() {
    return getFavorites().length;
  }

  // Export functions to global scope
  window.RORStayFavorites = {
    get: getFavorites,
    toggle: toggleFavorite,
    isFavorite: isFavorite,
    count: getFavoritesCount
  };

  // Update favorite buttons on page load
  document.addEventListener('DOMContentLoaded', function() {
    updateFavoriteButtons();
  });

  function updateFavoriteButtons() {
    const buttons = document.querySelectorAll('[data-favorite-btn]');
    buttons.forEach(btn => {
      const propertyId = btn.dataset.propertyId;
      if (isFavorite(propertyId)) {
        btn.classList.add('favorited');
        btn.innerHTML = '❤️';
      } else {
        btn.classList.remove('favorited');
        btn.innerHTML = '🤍';
      }
    });
  }

  // Auto-update buttons when favorites change
  window.addEventListener('storage', updateFavoriteButtons);
})();
