/**
 * Contact Form Handler
 * Sends contact form data to n8n webhook → Google Sheets
 */

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            try {
                // Disable button and show loading
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting...';

                // Get form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    location: document.getElementById('location').value,
                    propertyType: document.getElementById('propertyType').value,
                    members: document.getElementById('members').value,
                    budget: document.getElementById('budget').value,
                    requirements: document.getElementById('requirements')?.value || '',
                    timestamp: new Date().toISOString(),
                };

                // Send to n8n webhook
                const response = await fetch(N8N_CONFIG.webhooks.contactSubmit, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error('Submission failed');
                }

                // Success
                showNotification('Thank you! We will contact you soon.', 'success');
                contactForm.reset();

            } catch (error) {
                console.error('Contact form error:', error);
                showNotification('Failed to submit. Please try again.', 'error');
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
});

/**
 * Show notification to user
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add to DOM
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}
