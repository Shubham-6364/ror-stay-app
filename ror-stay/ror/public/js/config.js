/**
 * n8n Webhook Configuration
 * 
 * Updated for remote n8n server
 */

const N8N_CONFIG = {
    // Base URL for your n8n instance
    baseURL: 'https://n8n.codersdiary.shop',

    // Webhook endpoints
    webhooks: {
        // Contact form submission
        contactSubmit: 'https://n8n.codersdiary.shop/webhook/contact-submit',

        // Get all property listings
        getListings: 'https://n8n.codersdiary.shop/webhook/get-listings',

        // Add new property listing (with images)
        addListing: 'https://n8n.codersdiary.shop/webhook/add-listing',

        // Upload image to Google Drive
        uploadImage: 'https://n8n.codersdiary.shop/webhook/upload-image',
    },

    // Configuration
    timeout: 30000, // 30 seconds for image uploads
};

// Export for ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = N8N_CONFIG;
}
