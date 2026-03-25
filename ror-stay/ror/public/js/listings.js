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
        listingsGrid.innerHTML = `
            <div class="empty-state">
                <h3>No properties found</h3>
                <p>Try adjusting your filters to see more results</p>
            </div>
        `;
        return;
    }

    listingsGrid.innerHTML = filteredListings.map((listing, listingIndex) => {
        const title = listing.title || 'Property';
        const location = listing.location || 'Location not specified';
        const price = Number(listing.price || 0).toLocaleString('en-IN');
        const propertyType = listing.propertyType || 'N/A';
        const description = listing.description || '';
        const images = listing.imageURLs || [];

        const bhk = listing.bhk || extractBHK(description);
        const area = listing.area || extractArea(description);
        const furnished = listing.furnished || extractFurnished(description);
        const features = listing.features ? listing.features.split(',').map(f => f.trim()).filter(f => f) : [];

        const imagesHTML = images.length > 0 ? `
            <div class="listing-image-carousel" data-listing="${listingIndex}">
                ${images.map((img, idx) => `
                    <img src="${img}" alt="${title}" loading="lazy"
                         class="carousel-image ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                `).join('')}
                ${images.length > 1 ? `
                    <button class="carousel-btn carousel-prev" onclick="changeImage(${listingIndex}, -1)">‹</button>
                    <button class="carousel-btn carousel-next" onclick="changeImage(${listingIndex}, 1)">›</button>
                    <div class="carousel-dots">
                        ${images.map((_, idx) => `
                            <span class="carousel-dot ${idx === 0 ? 'active' : ''}" 
                                  onclick="goToImage(${listingIndex}, ${idx})"></span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        ` : `<img src="https://via.placeholder.com/400x300?text=No+Image" alt="No image" loading="lazy">`;

        return `
            <div class="listing-card">
                ${listing.verified ? '<span class="listing-badge">✓ VERIFIED</span>' : ''}
                <div class="listing-image">
                    ${imagesHTML}
                    <div class="listing-price">₹${price}/mo</div>
                    ${propertyType ? `<div class="listing-badges"><span class="listing-tag">${propertyType}</span></div>` : ''}
                </div>
                <div class="listing-content">
                    <p style="font-size: 0.75rem; color: var(--gray-500); margin-bottom: 0.5rem;">ID: ${listing.id}</p>
                    <h3 class="listing-title">${title}</h3>
                    <p class="listing-location">📍 ${location}</p>
                    ${(bhk || area) ? `
                        <div class="listing-features">
                            ${bhk ? `<div class="listing-feature-item">🏠 <span>${bhk}</span></div>` : ''}
                            ${area ? `<div class="listing-feature-item">📐 <span>${area} sq.ft</span></div>` : ''}
                        </div>
                    ` : ''}
                    
                    ${features.length > 0 ? `
                        <div class="listing-amenities">
                            ${features.map(feature => `<span class="amenity-badge">${feature}</span>`).join('')}
                        </div>
                    ` : ''}
                    
                    ${description ? `<p class="listing-description">${description.substring(0, 100)}${description.length > 100 ? '...' : ''}</p>` : ''}
                    <button class="btn btn-primary btn-block" onclick="contactProperty('${listing.id}', '${title}')">
                        Interested
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function changeImage(listingIndex, direction) {
    const carousel = document.querySelector(`[data-listing="${listingIndex}"]`);
    if (!carousel) return;
    const images = carousel.querySelectorAll('.carousel-image');
    const dots = carousel.querySelectorAll('.carousel-dot');
    let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    images[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + direction + images.length) % images.length;
    images[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

function goToImage(listingIndex, index) {
    const carousel = document.querySelector(`[data-listing="${listingIndex}"]`);
    if (!carousel) return;
    const images = carousel.querySelectorAll('.carousel-image');
    const dots = carousel.querySelectorAll('.carousel-dot');
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    images[index].classList.add('active');
    dots[index].classList.add('active');
}

// Helper functions to extract info from description
function extractBHK(text) {
    const match = text?.match(/(\d+)\s*BHK/i);
    return match ? `${match[1]} BHK` : null;
}

function extractArea(text) {
    const match = text?.match(/(\d+)\s*(sq\.?\s*ft|sqft|square\s*feet)/i);
    return match ? match[1] : null;
}

function extractFurnished(text) {
    if (text?.match(/fully\s*furnished/i)) return 'Fully Furnished';
    if (text?.match(/semi\s*furnished/i)) return 'Semi Furnished';
    if (text?.match(/unfurnished/i)) return 'Unfurnished';
    return null;
}

/**
 * Setup filter controls
 */
function setupFilters() {
    const filterLocation = document.getElementById('filterLocation');
    const filterPriceRange = document.getElementById('filterPriceRange');
    const filterPropertyType = document.getElementById('filterPropertyType');
    const filterBHK = document.getElementById('filterBHK');
    const filterFurnished = document.getElementById('filterFurnished');

    if (filterLocation) filterLocation.addEventListener('change', applyFilters);
    if (filterPriceRange) filterPriceRange.addEventListener('change', applyFilters);
    if (filterPropertyType) filterPropertyType.addEventListener('change', applyFilters);
    if (filterBHK) filterBHK.addEventListener('change', applyFilters);
    if (filterFurnished) filterFurnished.addEventListener('change', applyFilters);
}

/**
 * Apply filters to listings
 */
function applyFilters() {
    const location = document.getElementById('filterLocation')?.value || '';
    const priceRange = document.getElementById('filterPriceRange')?.value || '';
    const propertyType = document.getElementById('filterPropertyType')?.value || '';
    const bhk = document.getElementById('filterBHK')?.value || '';
    const furnished = document.getElementById('filterFurnished')?.value || '';

    filteredListings = allListings.filter(listing => {
        // Location filter
        if (location && listing.location?.toLowerCase() !== location.toLowerCase()) {
            return false;
        }

        // Property type filter
        if (propertyType && listing.propertyType !== propertyType) {
            return false;
        }

        // BHK filter
        if (bhk && listing.bhk !== bhk) {
            return false;
        }

        // Furnished filter
        if (furnished && listing.furnished !== furnished) {
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
    const bhkFilter = document.getElementById('filterBHK');
    const furnishedFilter = document.getElementById('filterFurnished');

    if (bhkFilter) bhkFilter.value = '';
    if (furnishedFilter) furnishedFilter.value = '';

    filteredListings = [...allListings];
    displayListings();
}

/**
 * View property details
 */
function viewDetails(listingId) {
    // Find the listing
    const listing = allListings.find(l => l.id === listingId);
    if (!listing) return;

    // Scroll to contact form with property details
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const requirementsField = document.getElementById('requirements');
        if (requirementsField) {
            requirementsField.value = `I would like more details about: ${listing.title} (₹${Number(listing.price || 0).toLocaleString('en-IN')}/month)`;
        }
    }
}

/**
 * Contact property owner
 */
function contactProperty(listingId, title) {
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Pre-fill message
        const requirementsField = document.getElementById('requirements');
        if (requirementsField) {
            requirementsField.value = `I'm interested in: ${title}. Please share more details.`;
        }
    }
}
