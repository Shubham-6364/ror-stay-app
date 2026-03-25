/**
 * Admin Panel for Adding Listings
 * Handles image uploads to Google Drive and listing data to Google Sheets via n8n
 */

document.addEventListener('DOMContentLoaded', function () {
    const addListingForm = document.getElementById('addListingForm');
    const imageInput = document.getElementById('images');
    const imagePreview = document.getElementById('imagePreview');

    // Image preview
    if (imageInput) {
        imageInput.addEventListener('change', function (e) {
            imagePreview.innerHTML = '';
            const files = Array.from(e.target.files);

            files.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'preview-image';
                    img.alt = `Preview ${index + 1}`;
                    imagePreview.appendChild(img);
                };
                reader.readAsDataURL(file);
            });
        });
    }

    // Form submission
    if (addListingForm) {
        addListingForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            await handleAddListing(this);
        });
    }
});

/**
 * Handle adding new listing
 */
async function handleAddListing(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Uploading...';

        // Step 1: Generate unique listing ID first
        const listingId = 'PROP-' + Date.now();

        // Step 2: Upload images to Google Drive (with listing ID in filename)
        const imageFiles = document.getElementById('images').files;
        const imageURLs = await uploadImages(imageFiles, listingId);

        submitBtn.textContent = 'Saving listing...';

        // Step 3: Prepare listing data
        const listingData = {
            id: listingId,
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            price: Number(document.getElementById('price').value),
            location: document.getElementById('location').value,
            propertyType: document.getElementById('propertyType').value,
            bhk: document.getElementById('bhk').value,
            area: Number(document.getElementById('area').value),
            furnished: document.getElementById('furnished').value,
            availability: document.getElementById('availability').value,
            features: document.getElementById('features').value,
            imageURLs: imageURLs,
            verified: true, // Mark admin-added properties as verified
            status: 'available',
            timestamp: new Date().toISOString(),
        };

        // Step 3: Send to n8n → Google Sheets
        const response = await fetch(N8N_CONFIG.webhooks.addListing, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(listingData),
        });

        if (!response.ok) {
            throw new Error('Failed to add listing');
        }

        // Success
        showNotification('Property listing added successfully!', 'success');
        form.reset();
        document.getElementById('imagePreview').innerHTML = '';

    } catch (error) {
        console.error('Error adding listing:', error);
        showNotification('Failed to add listing. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
}

/**
 * Upload images to Google Drive via n8n
 * Returns array of public URLs
 */
async function uploadImages(files, listingId) {
    if (!files || files.length === 0) {
        return [];
    }

    const uploadPromises = Array.from(files).map(async (file, index) => {
        // Convert file to base64
        const base64 = await fileToBase64(file);

        // Create unique filename with listing ID
        const fileExt = file.name.split('.').pop();
        const uniqueFileName = `${listingId}_${index + 1}.${fileExt}`;

        // Send to n8n webhook
        const response = await fetch(N8N_CONFIG.webhooks.uploadImage, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileName: uniqueFileName,
                fileData: base64,
                mimeType: file.type,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to upload ${file.name}`);
        }

        let result = await response.json();
        console.log('Upload response for', uniqueFileName, ':', result);

        // Handle n8n returning array instead of object
        if (Array.isArray(result) && result.length > 0) {
            result = result[0];
        }

        const imageUrl = result.url || result.webViewLink || result.webContentLink;
        console.log('Extracted URL:', imageUrl);

        return imageUrl;
    });

    const urls = await Promise.all(uploadPromises);
    console.log('All uploaded image URLs:', urls);
    return urls;
}

/**
 * Convert file to base64
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Show notification (reuse from contact.js)
 */
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}
