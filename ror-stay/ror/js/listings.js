/**
 * Listings Display and Filter
 * Fetches property listings from n8n webhook → Google Sheets
 */

let allListings = [];
let filteredListings = [];

// Load listings on page load
document.addEventListener('DOMContentLoaded', async function () {
    await loadListings();
    setupFilters();
});

/**
 * Load all listings from n8n
 */
async function loadListings() {
    const listingsGrid = document.getElementById('listingsGrid');
    const loadingDiv = document.getElementById('loading');

    try {
        loadingDiv.style.display = 'block';

        // Fetch from n8n webhook
        const response = await fetch(N8N_CONFIG.webhooks.getListings);

        if (!response.ok) {
            throw new Error('Failed to load listings');
        }

        const data = await response.json();
        allListings = Array.isArray(data) ? data : [];
        filteredListings = [...allListings];

        displayListings();

    } catch (error) {
        console.error('Error loading listings:', error);
        listingsGrid.innerHTML = '<p class="error">Failed to load properties. Please refresh.</p>';
    } finally {
        loadingDiv.style.display = 'none';
    }
}

/**
 * Display listings in grid
 */
function displayListings() {
    const listingsGrid = document.getElementById('listingsGrid');

    if (filteredListings.length === 0) {
        listingsGrid.innerHTML = '<p class="no-results">No properties found matching your criteria.</p>';
        return;
    }

    listingsGrid.innerHTML = filteredListings.map(listing => `
    <div class="listing-card">
      <div class="listing-image">
        <img src="${listing.imageURLs?.[0] || 'https://via.placeholder.com/400x300?text=Property'}" 
             alt="${listing.title || 'Property'}" 
             loading="lazy">
        <div class="listing-price">₹${Number(listing.price || 0).toLocaleString('en-IN')}/mo</div>
      </div>
      <div class="listing-content">
        <h3 class="listing-title">${listing.title || 'Untitled Property'}</h3>
        <p class="listing-location">📍 ${listing.location || 'Location not specified'}</p>
        <p class="listing-type">${listing.propertyType || 'N/A'}</p>
        <p class="listing-description">${listing.description || ''}</p>
        ${listing.features ? `<div class="listing-features">${listing.features}</div>` : ''}
        <button class="btn btn-primary" onclick="contactProperty('${listing.id}', '${listing.title}')">
          Contact for Details
        </button>
      </div>
    </div>
  `).join('');
}

/**
 * Setup filter controls
 */
function setupFilters() {
    const filterLocation = document.getElementById('filterLocation');
    const filterPriceRange = document.getElementById('filterPriceRange');
    const filterPropertyType = document.getElementById('filterPropertyType');
    const clearFiltersBtn = document.getElementById('clearFilters');

    // Add event listeners
    if (filterLocation) filterLocation.addEventListener('change', applyFilters);
    if (filterPriceRange) filterPriceRange.addEventListener('change', applyFilters);
    if (filterPropertyType) filterPropertyType.addEventListener('change', applyFilters);
    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', clearFilters);
}

/**
 * Apply filters to listings
 */
function applyFilters() {
    const location = document.getElementById('filterLocation')?.value || '';
    const priceRange = document.getElementById('filterPriceRange')?.value || '';
    const propertyType = document.getElementById('filterPropertyType')?.value || '';

    filteredListings = allListings.filter(listing => {
        // Location filter
        if (location && !listing.location?.toLowerCase().includes(location.toLowerCase())) {
            return false;
        }

        // Property type filter
        if (propertyType && listing.propertyType !== propertyType) {
            return false;
        }

        // Price range filter
        if (priceRange) {
            const price = Number(listing.price) || 0;
            const [min, max] = priceRange.split('-').map(Number);
            if (max && (price < min || price > max)) return false;
            if (!max && price < min) return false;
        }

        return true;
    });

    displayListings();
}

/**
 * Clear all filters
 */
function clearFilters() {
    document.getElementById('filterLocation').value = '';
    document.getElementById('filterPriceRange').value = '';
    document.getElementById('filterPropertyType').value = '';
    filteredListings = [...allListings];
    displayListings();
}

/**
 * Contact property owner
 */
function contactProperty(listingId, title) {
    // Scroll to contact form or open modal
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Pre-fill message
        const requirementsField = document.getElementById('requirements');
        if (requirementsField) {
            requirementsField.value = `I'm interested in: ${title} (ID: ${listingId})`;
        }
    } else {
        showNotification('Please use the contact form below to inquire about this property.', 'info');
    }
}
