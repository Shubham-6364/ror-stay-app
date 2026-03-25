# ROR-STAY Lite Setup Guide

Complete setup instructions for the n8n-powered property rental platform.

## 📋 Overview

This is a **completely serverless** property rental platform:
- **Frontend**: Static HTML/CSS/JS (no build process needed)
- **Backend**: n8n workflows
- **Database**: Google Sheets
- **Storage**: Google Drive

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Install n8n

Choose one:

**Option A: Docker (Recommended)**
```bash
docker run -d --restart unless-stopped \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**Option B: npm**
```bash
npm install -g n8n
n8n start
```

Access n8n at: `http://localhost:5678`

### Step 2: Set Up Google Sheets

1. Go to [Google Sheets](https://sheets.google.com)
2. Create **two new spreadsheets**:

**Sheet 1: ROR-STAY Contact Submissions**

Add these headers in row 1:
```
Name | Email | Phone | Preferred Location | Requirements | Timestamp
```

**Sheet 2: ROR-STAY Property Listings**

Add these headers in row 1:
```
ID | Title | Description | Price | Location | Property Type | Features | Image URLs | Status | Timestamp
```

3. Share both sheets with your Google account used in n8n

### Step 3: Create Google Drive Folder

1. Go to [Google Drive](https://drive.google.com)
2. Create a new folder: **ROR-STAY-Images**
3. Note the folder ID from URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`

### Step 4: Set Up n8n Workflows

Follow the detailed instructions in [N8N-WORKFLOWS.md](N8N-WORKFLOWS.md) to create:

1. ✅ Contact Form Submission workflow
2. ✅ Get Property Listings workflow
3. ✅ Add Property Listing workflow
4. ✅ Upload Image to Drive workflow

### Step 5: Configure Frontend

1. **Update webhook URLs** in `js/config.js`:

```javascript
const N8N_CONFIG = {
  baseURL: 'http://localhost:5678',
  webhooks: {
    contactSubmit: 'http://localhost:5678/webhook/contact-submit',
    getListings: 'http://localhost:5678/webhook/get-listings',
    addListing: 'http://localhost:5678/webhook/add-listing',
    uploadImage: 'http://localhost:5678/webhook/upload-image',
  },
};
```

### Step 6: Run the Application

**Option A: Simple Python Server**
```bash
cd /home/azureuser/ROR-STAY-N8N-LITE/public
python3 -m http.server 8000
```

**Option B: Node.js Server**
```bash
cd /home/azureuser/ROR-STAY-N8N-LITE/public
npx serve .
```

**Option C: Just open in browser**
```bash
# Open directly
firefox public/index.html
# or
google-chrome public/index.html
```

Access at: `http://localhost:8000`

---

## 🧪 Testing

### Test 1: Contact Form

1. Open `http://localhost:8000`
2. Scroll to "Get In Touch" section
3. Fill out the form
4. Check Google Sheets → "ROR-STAY Contact Submissions"
5. ✅ New row should appear

### Test 2: Add Property (Admin)

1. Open `http://localhost:8000/admin.html`
2. Fill in property details
3. Upload 1-3 images
4. Click "Add Property Listing"
5. Check:
   - ✅ Google Sheets → "ROR-STAY Property Listings"
   - ✅ Google Drive → "ROR-STAY-Images" folder
6. Go back to homepage
7. ✅ New property should appear in listings

### Test 3: View Listings

1. Open homepage
2. Scroll to "Available Properties"
3. ✅ Properties from Google Sheets should display
4. Try filters (location, price, type)
5. ✅ Filtering should work

---

## 📦 Project Structure

```
ROR-STAY-N8N-LITE/
├── public/
│   ├── index.html          ← Main page (open this)
│   └── admin.html          ← Admin panel
├── css/
│   └── styles.css          ← All styles
├── js/
│   ├── config.js           ← Configure webhook URLs here!
│   ├── contact.js          ← Contact form logic
│   ├── listings.js         ← Listings display
│   └── admin.js            ← Admin panel logic
├── workflows/              ← Save exported n8n workflows here
├── docs/
│   ├── SETUP.md           ← This file
│   └── N8N-WORKFLOWS.md   ← Workflow setup guide
└── README.md
```

---

## 🌐 Production Deployment

### Option 1: Netlify (Free)

```bash
cd /home/azureuser/ROR-STAY-N8N-LITE

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --dir=. --prod
```

Update `js/config.js` with production n8n URLs.

### Option 2: GitHub Pages

1. Push project to GitHub
2. Go to Settings → Pages
3. Select main branch
4. ✅ Site published at `https://username.github.io/repo-name`

### Option 3: Vercel

```bash
cd /home/azureuser/ROR-STAY-N8N-LITE
npx vercel --prod
```

### n8n Production

**Option A: n8n Cloud** (Easiest)
1. Go to [n8n.cloud](https://n8n.cloud)
2. Sign up (free tier available)
3. Import workflows
4. Get production webhook URLs
5. Update `js/config.js`

**Option B: Self-Host with HTTPS**
```bash
# Use nginx + Let's Encrypt
# See: https://docs.n8n.io/hosting/installation/docker/
```

---

## 🔧 Configuration

### Environment-Specific Config

Create different config files:

**js/config.dev.js** (Development)
```javascript
const N8N_CONFIG = {
  baseURL: 'http://localhost:5678',
  webhooks: { /* local URLs */ }
};
```

**js/config.prod.js** (Production)
```javascript
const N8N_CONFIG = {
  baseURL: 'https://your-n8n.app.n8n.cloud',
  webhooks: { /* production URLs */ }
};
```

Rename appropriate file to `config.js` based on environment.

### Google Sheets Tips

**Add Sample Data:**
```
ID              | Title          | Price  | Location
PROP-001        | 2BHK Apartment | 25000  | Pune
PROP-002        | 3BHK House     | 35000  | Mumbai
```

**Data Validation:**
- Set Price column to "Number" format
- Set Status to dropdown: available, rented, unavailable

---

## 🛠️ Customization

### Change Colors

Edit `css/styles.css`:
```css
:root {
  --primary: #2563eb;      /* Change to your brand color */
  --secondary: #10b981;    /* Secondary color */
}
```

### Add New Fields

1. Add to Google Sheets
2. Update n8n workflow mapping
3. Add to HTML forms
4. Update JavaScript to handle new fields

### Add Authentication

For admin panel:
1. Add basic auth in n8n webhook
2. Or use Netlify Identity
3. Or add simple password protection in HTML

---

## 🔐 Security

### Production Checklist

- [ ] Enable HTTPS for n8n
- [ ] Add basic auth to admin webhooks
- [ ] Set up Google Drive folder permissions
- [ ] Add rate limiting to webhooks
- [ ] Validate file uploads (size, type)
- [ ] Use environment variables for sensitive data
- [ ] Enable n8n execution logging
- [ ] Set up backup for Google Sheets

### Recommended n8n Settings

```bash
# Add to n8n environment
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your-secure-password
```

---

## 📊 Monitoring

### Google Sheets

- Check submission count daily
- Watch for duplicate entries
- Monitor image URL validity

### n8n

- View execution history
- Set up error notifications
- Check webhook response times

---

## 🐛 Troubleshooting

### Listings Not Showing

1. Check n8n workflow is activated
2. Open browser console for errors
3. Test webhook manually: `curl http://localhost:5678/webhook/get-listings`
4. Verify Google Sheets has data

### Contact Form Not Working

1. Check network tab in browser
2. Verify webhook URL in config.js
3. Check n8n execution log
4. Test with curl (see N8N-WORKFLOWS.md)

### Images Not Uploading

1. Check file size (keep under 5MB)
2. Verify Google Drive folder permissions
3. Check n8n execution log for errors
4. Test base64 encoding

### CORS Errors

If deploying frontend and n8n on different domains:
1. Add CORS headers in n8n webhook response
2. Or use n8n cloud (handles CORS)
3. Or proxy through your frontend server

---

## 💡 Tips & Best Practices

### Performance

- ✅ Optimize images before upload (max 1MB)
- ✅ Limit Google Sheets to 1000 rows (archive old data)
- ✅ Use lazy loading for images
- ✅ Cache listings data in browser (5 minutes)

### Data Management

- 📊 Export Google Sheets monthly as backup
- 🗄️ Create separate sheet for archived properties
- 📝 Add data validation rules in Google Sheets
- 🔍 Use Google Sheets filters for analysis

### User Experience

- 📱 Test on mobile devices
- 🎨 Add loading states
- ✅ Show success messages clearly
- ❌ Handle errors gracefully

---

## 🆘 Support

### Resources

- [n8n Documentation](https://docs.n8n.io/)
- [n8n Community Forum](https://community.n8n.io/)
- [Google Sheets API Docs](https://developers.google.com/sheets)
- [Google Drive API Docs](https://developers.google.com/drive)

### Common Questions

**Q: Can I use my own database?**
A: Yes! Modify n8n workflows to use PostgreSQL, MySQL, or MongoDB instead of Google Sheets.

**Q: How many properties can I handle?**
A: Google Sheets free tier supports 5 million cells. You can easily handle 1000+ properties.

**Q: Can I add payment integration?**
A: Yes! Add Stripe/Razorpay webhooks in n8n.

**Q: Is this suitable for production?**
A: Yes! Many small businesses run on this stack. For high traffic, consider caching.

---

## 🎉 Next Steps

1. ✅ Complete workflow setup
2. ✅ Add sample properties
3. ✅ Test all features
4. 🚀 Deploy to production
5. 📢 Share with users!

**Happy hosting!** 🏠
