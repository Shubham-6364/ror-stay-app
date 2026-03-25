# n8n Workflows Configuration Guide

This document provides step-by-step instructions to set up all n8n workflows for the ROR-STAY Lite application.

## Prerequisites

- 📦 n8n installed and running
- 🔐 Google account with access to Sheets and Drive
- ✅ Google Sheets API enabled
- ✅ Google Drive API enabled

---

## Workflow 1: Contact Form Submission

**Purpose**: Save contact form submissions to Google Sheets

### Setup Steps

1. **Create new workflow** in n8n
2. **Name it**: "Contact Form to Sheets"

### Nodes Configuration

#### Node 1: Webhook (Trigger)

- **Node**: Webhook
- **HTTP Method**: POST
- **Path**: `contact-submit`
- **Respond**: Immediately
- **Response Code**: 200
- **Response Data**: JSON
- **Response Body**:
  ```json
  {
    "success": true,
    "message": "Contact submission received"
  }
  ```

#### Node 2: Google Sheets (Append Row)

- **Node**: Google Sheets
- **Credential**: Your Google account
- **Operation**: Append
- **Document**: "ROR-STAY Contact Submissions" (create this sheet first)
- **Sheet**: Sheet1
- **Columns**:
  - **Name**: `={{ $json.name }}`
  - **Email**: `={{ $json.email }}`
  - **Phone**: `={{ $json.phone }}`
  - **Location**: `={{ $json.location }}`
  - **Property Type**: `={{ $json.propertyType }}`
  - **Number of Members**: `={{ $json.members }}`
  - **Budget**: `={{ $json.budget }}`
  - **Requirements**: `={{ $json.requirements }}`
  - **Timestamp**: `={{ $json.timestamp }}`

### Google Sheet Structure

Create a Google Sheet named **"ROR-STAY Contact Submissions"** with these headers in row 1:

| Name | Email | Phone | Location | Property Type | Number of Members | Budget | Requirements | Timestamp |
|------|-------|-------|----------|---------------|-------------------|--------|--------------|-----------|

---

## Workflow 2: Get Property Listings

**Purpose**: Fetch all property listings from Google Sheets

### Setup Steps

1. **Create new workflow** in n8n
2. **Name it**: "Get Property Listings"

### Nodes Configuration

#### Node 1: Webhook (Trigger)

- **Node**: Webhook
- **HTTP Method**: GET
- **Path**: `get-listings`
- **Respond**: Using 'Respond to Webhook' Node
- **Response Code**: 200

#### Node 2: Google Sheets (Read)

- **Node**: Google Sheets
- **Credential**: Your Google account
- **Operation**: Read
- **Document**: "ROR-STAY Property Listings"
- **Sheet**: Sheet1
- **Range**: Leave empty (reads all rows)
- **Options**:
  - □ Data Starts on Row: 2 (skip headers)
  - ☑ Use Header Row

#### Node 3: Function (Transform Data)

- **Node**: Code
- **Mode**: Run Once for All Items
- **JavaScript Code**:

```javascript
// Transform sheets data to proper format
const listings = items.map(item => {
  const data = item.json;
  
  // Parse image URLs (stored as comma-separated)
  let imageURLs = [];
  if (data['Image URLs']) {
    imageURLs = data['Image URLs'].split(',').map(url => url.trim());
  }
  
  return {
    id: data['ID'] || '',
    title: data['Title'] || '',
    description: data['Description'] || '',
    price: Number(data['Price']) || 0,
    location: data['Location'] || '',
    propertyType: data['Property Type'] || '',
    features: data['Features'] || '',
    imageURLs: imageURLs,
    status: data['Status'] || 'available',
    timestamp: data['Timestamp'] || ''
  };
});

return listings.map(listing => ({ json: listing }));
```

#### Node 4: Respond to Webhook

- **Node**: Respond to Webhook
- **Respond With**: JSON
- **Response Data**: All Incoming Items

### Google Sheet Structure

Create a Google Sheet named **"ROR-STAY Property Listings"** with these headers:

| ID | Title | Description | Price | Location | Property Type | Features | Image URLs | Status | Timestamp |
|----|-------|-------------|-------|----------|---------------|----------|------------|--------|-----------|

---

## Workflow 3: Add New Property Listing

**Purpose**: Add new property with images to Google Sheets

### Setup Steps

1. **Create new workflow** in n8n
2. **Name it**: "Add Property Listing"

### Nodes Configuration

#### Node 1: Webhook (Trigger)

- **Node**: Webhook
- **HTTP Method**: POST
- **Path**: `add-listing`
- **Respond**: Immediately
- **Response Code**: 200
- **Response Data**: JSON
- **Response Body**:
  ```json
  {
    "success": true,
    "message": "Property listing added"
  }
  ```

#### Node 2: Function (Prepare Data)

- **Node**: Code
- **Mode**: Run Once for All Items
- **JavaScript Code**:

```javascript
const data = $input.first().json;

// Convert image URLs array to comma-separated string
const imageURLsString = Array.isArray(data.imageURLs) 
  ? data.imageURLs.join(', ') 
  : '';

return [{
  json: {
    ID: data.id || '',
    Title: data.title || '',
    Description: data.description || '',
    Price: data.price || 0,
    Location: data.location || '',
    'Property Type': data.propertyType || '',
    Features: data.features || '',
    'Image URLs': imageURLsString,
    Status: data.status || 'available',
    Timestamp: data.timestamp || new Date().toISOString()
  }
}];
```

#### Node 3: Google Sheets (Append Row)

- **Node**: Google Sheets
- **Credential**: Your Google account
- **Operation**: Append
- **Document**: "ROR-STAY Property Listings"
- **Sheet**: Sheet1
- **Options**: Map All Fields

---

## Workflow 4: Upload Image to Google Drive

**Purpose**: Upload property images to Google Drive and return shareable URL

### Setup Steps

1. **Create new workflow** in n8n
2. **Name it**: "Upload Image to Drive"
3. **Create a folder** in Google Drive named "ROR-STAY-Images"

### Nodes Configuration

#### Node 1: Webhook (Trigger)

- **Node**: Webhook
- **HTTP Method**: POST
- **Path**: `upload-image`
- **Respond**: Using 'Respond to Webhook' Node

#### Node 2: Function (Decode Base64)

- **Node**: Code
- **Mode**: Run Once for All Items
- **JavaScript Code**:

```javascript
const input = $input.first().json;

// Convert base64 back to binary
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

#### Node 3: Google Drive (Upload File)

- **Node**: Google Drive
- **Credential**: Your Google account
- **Operation**: Upload
- **File Name**: `={{ $json.fileName }}`
- **Binary Data**: Yes
- **Binary Property**: data
- **Parent Folder**: Select "ROR-STAY-Images" folder
- **Options**:
  - ☑ Convert to Google Doc Format: NO

#### Node 4: Google Drive (Share File)

- **Node**: Google Drive
- **Credential**: Your Google account  
- **Resource**: File
- **Operation**: Share
- **File ID**: `={{ $json.id }}`
- **Permissions**:
  - Type: anyone
  - Role: reader

#### Node 5: Function (Get Share URL)

- **Node**: Code
- **Mode**: Run Once for All Items
- **JavaScript Code**:

```javascript
const fileId = $input.first().json.id;
// Direct view URL for images
const url = `https://drive.google.com/uc?export=view&id=${fileId}`;

return [{
  json: {
    url: url,
    webViewLink: $input.first().json.webViewLink,
    fileId: fileId
  }
}];
```

#### Node 6: Respond to Webhook

- **Node**: Respond to Webhook
- **Respond With**: JSON
- **Response Data**: First Incoming Item

---

## Testing Workflows

### Test Contact Form

```bash
curl -X POST http://localhost:5678/webhook/contact-submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "location": "Jagatpura",
    "propertyType": "Flat",
    "members": "2",
    "budget": "15000",
    "requirements": "Need WiFi and parking",
    "timestamp": "2026-01-18T06:35:00Z"
  }'
```

### Test Get Listings

```bash
curl http://localhost:5678/webhook/get-listings
```

### Test Add Listing

```bash
curl -X POST http://localhost:5678/webhook/add-listing \
  -H "Content-Type: application/json" \
  -d '{
    "id": "PROP-123",
    "title": "2BHK Apartment",
    "description": "Spacious 2BHK near tech parks",
    "price": 25000,
    "location": "Hinjewadi, Pune",
    "propertyType": "Apartment",
    "features": "WiFi, Parking, Security",
    "imageURLs": ["https://example.com/image1.jpg"],
    "status": "available",
    "timestamp": "2026-01-18T06:00:00Z"
  }'
```

---

## Production Deployment

### n8n Cloud (Recommended)

1. Sign up at [n8n.cloud](https://n8n.cloud)
2. Import workflows (export as JSON from local)
3. Update webhook URLs in `js/config.js`
4. URLs will be: `https://your-instance.app.n8n.cloud/webhook/...`

### Self-Hosted with HTTPS

1. Set up reverse proxy (nginx)
2. Enable SSL certificate
3. Configure webhook URLs with HTTPS

### Security Considerations

- ✅ Enable basic auth on n8n
- ✅ Use environment variables for credentials
- ✅ Restrict Google Drive folder permissions
- ✅ Add rate limiting to webhooks
- ✅ Validate input data in workflows

---

## Troubleshooting

### Webhook Not Found

- Ensure workflow is **activated** (toggle in top-right)
- Check webhook path matches config

### Google Sheets Permission Denied

- Re-authenticate Google credentials
- Ensure sheets exist with correct names
- Check sharing permissions

### Image Upload Fails

- Verify Google Drive folder exists
- Check file size limits (5MB recommended max)
- Ensure proper base64 encoding

### CORS Errors

Add CORS headers in webhook response:
```json
{
  "headers": {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  }
}
```

---

## Workflow JSON Export

After setting up, export each workflow:

1. Click **⋮** (menu) in workflow
2. Select **Download**
3. Save to `workflows/` directory
4. Share with team or backup

---

**Next Steps**: See [SETUP.md](SETUP.md) for complete application setup.
