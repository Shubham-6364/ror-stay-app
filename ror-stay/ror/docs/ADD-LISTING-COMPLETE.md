# Complete Add Listing Workflow Guide

## Overview

Adding a property listing requires **TWO separate workflows**:

1. **Image Upload Workflow** - Uploads images to Google Drive, returns URLs
2. **Add Listing Workflow** - Saves property data (with image URLs) to Google Sheets

---

## Workflow 1: Upload Image to Google Drive

**Webhook URL**: `https://n8n.codersdiary.shop/webhook/upload-image`

### Nodes Required:

```
Webhook → Decode Base64 → Upload to Drive → Share File → Format URL → Respond
```

### 1. Webhook Node

- **HTTP Method**: POST
- **Path**: `upload-image`
- **Response Mode**: Using 'Respond to Webhook' Node
- **Response Headers**:
  ```
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: POST, OPTIONS
  Access-Control-Allow-Headers: Content-Type
  ```

### 2. Code Node: Decode Base64

**JavaScript Code:**
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

### 3. Google Drive: Upload File

- **Operation**: Upload
- **Binary Property**: `data`
- **File Name**: `={{ $json.fileName }}`
- **Parent Folder**: Select "ROR-STAY-Images" folder
- **Options** → Upload as Google Docs: OFF

### 4. Google Drive: Share File

- **Operation**: Share
- **File ID**: `={{ $json.id }}`
- **Permissions**:
  - Type: `anyone`
  - Role: `reader`

### 5. Code Node: Format URL

**JavaScript Code:**
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

### 6. Respond to Webhook

- **Respond With**: JSON
- **Response Data**: All Incoming Items

---

## Workflow 2: Add Property Listing to Sheets

**Webhook URL**: `https://n8n.codersdiary.shop/webhook/add-listing`

### Nodes Required:

```
Webhook → Transform Data → Append to Sheets → Respond
```

### 1. Webhook Node

- **HTTP Method**: POST
- **Path**: `add-listing`
- **Response Mode**: Using 'Respond to Webhook' Node
- **Response Headers**: (same CORS headers as above)

### 2. Code Node: Transform Data

**JavaScript Code:**
```javascript
const input = $input.first().json;
const data = input.body || input;

// Convert imageURLs array to comma-separated string
const imageURLsString = Array.isArray(data.imageURLs) 
  ? data.imageURLs.join(', ') 
  : (data.imageURLs || '');

return [{
  json: {
    'ID': data.id || `PROP-${Date.now()}`,
    'Title': data.title || '',
    'Description': data.description || '',
    'Price': data.price || 0,
    'Location': data.location || '',
    'Property Type': data.propertyType || '',
    'Features': data.features || '',
    'Image URLs': imageURLsString,
    'Status': data.status || 'available',
    'Timestamp': data.timestamp || new Date().toISOString()
  }
}];
```

### 3. Google Sheets: Append Row

- **Operation**: Append
- **Document**: "ROR-STAY Property Listings"
- **Sheet**: Sheet1
- **Data Mode**: Map Each Column Manually

**Column Mapping:**
```
ID          → ={{ $json.ID }}
Title       → ={{ $json.Title }}
Description → ={{ $json.Description }}
Price       → ={{ $json.Price }}
Location    → ={{ $json.Location }}
Property Type → ={{ $json['Property Type'] }}
Features    → ={{ $json.Features }}
Image URLs  → ={{ $json['Image URLs'] }}
Status      → ={{ $json.Status }}
Timestamp   → ={{ $json.Timestamp }}
```

### 4. Respond to Webhook

**Response Body (Custom JSON)**:
```json
{
  "success": true,
  "message": "Property listing added successfully",
  "id": "={{ $json.ID }}"
}
```

---

## How the Admin Panel Works

When you add a listing from `admin.html`:

### Step 1: Upload Images (One by One)
```javascript
for (const image of images) {
  POST /webhook/upload-image
  {
    "fileName": "property1.jpg",
    "mimeType": "image/jpeg",
    "fileData": "base64_encoded_image_data..."
  }
  
  Response: { "url": "https://drive.google.com/uc?export=view&id=..." }
}
```

### Step 2: Add Listing with Image URLs
```javascript
POST /webhook/add-listing
{
  "id": "PROP-123",
  "title": "2BHK Flat Jagatpura",
  "description": "Spacious...",
  "price": 15000,
  "location": "Jagatpura",
  "propertyType": "Flat",
  "features": "WiFi, Parking",
  "imageURLs": ["https://drive.google.com/...", "https://drive.google.com/..."],
  "status": "available",
  "timestamp": "2026-01-19T11:00:00Z"
}
```

---

## Testing

### Test Image Upload:
```bash
curl -X POST https://n8n.codersdiary.shop/webhook/upload-image \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "test.jpg",
    "mimeType": "image/jpeg",
    "fileData": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
  }'
```

Expected response:
```json
{
  "url": "https://drive.google.com/uc?export=view&id=FILE_ID",
  "webViewLink": "https://drive.google.com/file/d/FILE_ID/view",
  "fileId": "FILE_ID"
}
```

### Test Add Listing:
```bash
curl -X POST https://n8n.codersdiary.shop/webhook/add-listing \
  -H "Content-Type: application/json" \
  -d '{
    "id": "TEST-001",
    "title": "Test Property",
    "description": "Testing",
    "price": 10000,
    "location": "Jagatpura",
    "propertyType": "Flat",
    "features": "WiFi",
    "imageURLs": ["https://via.placeholder.com/400"],
    "status": "available"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Property listing added successfully",
  "id": "TEST-001"
}
```

---

## Important Notes

1. **Activate Both Workflows** in n8n (toggle switch ON)
2. **Use Production URLs** (`/webhook/`) not test URLs
3. **Google Sheets Headers** must match exactly (case-sensitive)
4. **Google Drive Folder** must be set to "ROR-STAY-Images"
5. **CORS Headers** required on ALL webhooks for browser access

---

## Checklist

- [ ] Image upload workflow created and active
- [ ] Add listing workflow created and active
- [ ] Google Drive credentials configured
- [ ] Google Sheets credentials configured
- [ ] Folder ID updated to ROR-STAY-Images
- [ ] Sheet headers match column mapping
- [ ] CORS headers added to both webhooks
- [ ] Test image upload with curl
- [ ] Test add listing with curl
- [ ] Test admin panel in browser

Once both workflows are working, the admin panel at `http://localhost:8000/admin.html` will work perfectly!
