# n8n Workflow Setup - Complete Guide

## 🎯 Quick Start

**Your n8n**: https://n8n.codersdiary.shop  
**Frontend Config**: ✅ Already updated

---

## Setup Order

Follow this order for smooth setup:

1. **[Google Setup](./google-setup.md)** - Create sheets and drive folder
2. **[Workflow 1](./workflow-1-contact-form.md)** - Contact form submission
3. **[Workflow 2](./workflow-2-get-listings.md)** - Get property listings
4. **Workflow 3** - Add new listing (see below)
5. **Workflow 4** - Upload images (see below)

---

## Workflow 3: Add New Property Listing

**Webhook**: `https://n8n.codersdiary.shop/webhook/add-listing`  
**Method**: POST

### Nodes Required
1. Webhook (POST)
2. Code (Transform data)
3. Google Sheets (Append)

### Code Node
```javascript
const data = $input.first().json;
const imageURLsString = Array.isArray(data.imageURLs) 
  ? data.imageURLs.join(', ') 
  : '';

return [{
  json: {
    ID: data.id || `PROP-${Date.now()}`,
    Title: data.title || '',
    Description: data.description || '',
    Price: data.price || 0,
    Location: data.location || '',
    'Property Type': data.propertyType || '',
    Features: data.features || '',
    'Image URLs': imageURLsString,
    Status: data.status || 'available',
    Timestamp: new Date().toISOString()
  }
}];
```

---

## Workflow 4: Upload Image to Google Drive

**Webhook**: `https://n8n.codersdiary.shop/webhook/upload-image`  
**Method**: POST

### Nodes Required
1. Webhook (POST)
2. Code (Decode base64)
3. Google Drive (Upload file)
4. Google Drive (Share file)  
5. Code (Format URL)
6. Respond to Webhook

### Decode Node
```javascript
const input = $input.first().json;
const buffer = Buffer.from(input.fileData, 'base64');
return [{
  json: input,
  binary: {
    data: {
      data: buffer.toString('base64'),
      mimeType: input.mimeType,
      fileName: input.fileName
    }
  }
}];
```

### Google Drive Upload
- Parent Folder: Select "ROR-STAY-Images"
- Binary Property: `data`

### Google Drive Share
- Type: `anyone`
- Role: `reader`

### Format URL Node
```javascript
const fileId = $input.first().json.id;
const url = `https://drive.google.com/uc?export=view&id=${fileId}`;
return [{
  json: {
    url: url,
    webViewLink: $input.first().json.webViewLink,
    fileId: fileId
  }
}];
```

---

## Testing All Workflows

### 1. Test Contact Form
```bash
curl -X POST https://n8n.codersdiary.shop/webhook/contact-submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "location": "Jagatpura",
    "propertyType": "Flat",
    "members": "2",
    "budget": "15000",
    "requirements": "Test",
    "timestamp": "2026-01-18T14:00:00Z"
  }'
```

Check: "ROR-STAY Contact Submissions" sheet should have new row

### 2. Test Get Listings
```bash
curl https://n8n.codersdiary.shop/webhook/get-listings
```

Should return JSON array of properties

### 3. Test Frontend
```bash
# Make sure server is running
cd /home/azureuser/ROR-STAY-N8N-LITE/public
python3 -m http.server 8000
```

Open http://localhost:8000 and:
- Submit contact form
- View property listings
- Use filters

---

## Troubleshooting

### Webhook 404
- Workflow not activated
- Check path spelling

### CORS Errors
Add to webhook response headers:
```json
{
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}
```

### Google Auth Fails
- Refresh credentials in n8n
- Check sheet permissions

---

## Checklist

- [ ] Google Sheets created
- [ ] Google Drive folder created
- [ ] n8n credentials added
- [ ] Workflow 1 created & active
- [ ] Workflow 2 created & active
- [ ] Workflow 3 created & active
- [ ] Workflow 4 created & active
- [ ] All workflows tested
- [ ] Frontend tested
- [ ] Ready for production!

---

**Need help?** Check individual workflow guides in `docs/` folder.
