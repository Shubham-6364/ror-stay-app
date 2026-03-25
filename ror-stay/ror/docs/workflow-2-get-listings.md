# Workflow 2: Get Property Listings

## Overview
This workflow fetches property listings from Google Sheets and returns them as JSON.

**Webhook URL**: `https://n8n.codersdiary.shop/webhook/get-listings`

---

## Step-by-Step Setup

### 1. Create New Workflow
1. Click **"New Workflow"**
2. Name it: **"Get Property Listings"**

### 2. Add Webhook Node (Trigger)

**Click "+" → Search "Webhook"**

**Settings:**
- **HTTP Method**: `GET`
- **Path**: `get-listings`
- **Authentication**: None
- **Respond**: Using 'Respond to Webhook' Node

### 3. Add Google Sheets Node (Read)

**Click "+" → Search "Google Sheets"**

**Settings:**
- **Credential**: Use existing Google credential
- **Resource**: Get Many
- **Operation**: Get Many
- **Document**: Select "ROR-STAY Property Listings"
- **Sheet**: Sheet1
- **Return All**: ✅ Yes
- **Options**: 
  - **Data Location on Sheet**: Header Row
  - **Header Row**: 1

### 4. Add Code Node (Transform Data)

**Click "+" → Search "Code"**

**Settings:**
- **Language**: JavaScript
- **Mode**: Run Once for All Items
- **Code**:

```javascript
// Transform Google Sheets data to proper JSON format
const listings = items.map(item => {
  const data = item.json;
  
  // Parse comma-separated image URLs
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

### 5. Add Respond to Webhook Node

**Click "+" → Search "Respond to Webhook"**

**Settings:**
- **Respond With**: JSON
- **Response Data**: All Incoming Items

### 6. Connect All Nodes
```
Webhook → Google Sheets → Code → Respond to Webhook
```

### 7. Save and Activate
1. Click **Save**
2. Toggle **Active**

---

## Test the Workflow

### Add Sample Data to Google Sheets First

In your "ROR-STAY Property Listings" sheet, add a test row:

| ID | Title | Description | Price | Location | Property Type | Features | Image URLs | Status | Timestamp |
|----|-------|-------------|-------|----------|---------------|----------|------------|--------|-----------|
| PROP-001 | 2BHK Flat | Spacious flat | 15000 | Jagatpura | Flat | WiFi, Parking | https://via.placeholder.com/400 | available | 2026-01-18 |

### Test the Endpoint

```bash
curl https://n8n.codersdiary.shop/webhook/get-listings
```

You should get JSON response:
```json
[
  {
    "id": "PROP-001",
    "title": "2BHK Flat",
    "description": "Spacious flat",
    "price": 15000,
    "location": "Jagatpura",
    "propertyType": "Flat",
    "features": "WiFi, Parking",
    "imageURLs": ["https://via.placeholder.com/400"],
    "status": "available",
    "timestamp": "2026-01-18"
  }
]
```

### Test from Frontend
1. Open http://localhost:8000
2. Scroll to "Available Properties"
3. Properties should load automatically!

---

## Troubleshooting

**Empty array returned?**
- Check if Google Sheets has data
- Verify sheet name is exactly "ROR-STAY Property Listings"
- Ensure Header Row is set to 1

**Error in Code node?**
- Check JavaScript console in n8n
- Verify column names match exactly (case-sensitive)

**CORS error from frontend?**
- Add CORS headers in "Respond to Webhook":
  - Click "Add Option"
  - Select "Response Headers"
  - Add: `Access-Control-Allow-Origin: *`

---

✅ **Workflow 2 Complete!**

Move to Workflow 3: Add New Listing
