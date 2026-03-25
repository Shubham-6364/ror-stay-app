# Workflow 1: Contact Form Submission

## Overview
This workflow receives contact form submissions and saves them to Google Sheets.

**Webhook URL**: `https://n8n.codersdiary.shop/webhook/contact-submit`

---

## Step-by-Step Setup

### 1. Create New Workflow
1. Go to https://n8n.codersdiary.shop
2. Click **"New Workflow"**
3. Name it: **"Contact Form to Sheets"**

### 2. Add Webhook Node (Trigger)

**Click "+" → Search "Webhook"**

**Settings:**
- **HTTP Method**: `POST`
- **Path**: `contact-submit`
- **Authentication**: None
- **Respond**: Immediately
- **Response Code**: 200
- **Response Mode**: First Entry JSON
- **Response Data**: 
  ```json
  {
    "success": true,
    "message": "Contact submission received"
  }
  ```

**Test the webhook:**
After adding, you'll see the webhook URL. Copy it!

### 3. Add Google Sheets Node

**Click "+" → Search "Google Sheets"**

**Settings:**
- **Credential**: Click "Create New Credential"
  - Follow Google OAuth flow
  - Grant permissions to Sheets
- **Resource**: Append
- **Operation**: Append
- **Document**: Select "ROR-STAY Contact Submissions"
  *(Create this sheet first if not exists)*
- **Sheet**: Sheet1
- **Data Mode**: Define Below

**Column Mapping:**
Click "Add Field" for each:

| Field Name | Expression |
|------------|------------|
| Name | `={{ $json.name }}` |
| Email | `={{ $json.email }}` |
| Phone | `={{ $json.phone }}` |
| Location | `={{ $json.location }}` |
| Property Type | `={{ $json.propertyType }}` |
| Number of Members | `={{ $json.members }}` |
| Budget | `={{ $json.budget }}` |
| Requirements | `={{ $json.requirements }}` |
| Timestamp | `={{ $json.timestamp }}` |

### 4. Connect Nodes
Click the dot on the right of "Webhook" and drag to "Google Sheets"

### 5. Save and Activate
1. Click **Save** (top right)
2. Toggle **Active** (top right)

---

## Test the Workflow

### Option 1: Using n8n Test
1. Click "Listen for test event" in the Webhook node
2. Send this curl request:

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
    "requirements": "Need WiFi and parking",
    "timestamp": "2026-01-18T14:00:00Z"
  }'
```

3. Check if data appears in Google Sheets!

### Option 2: Using the Frontend
1. Open your frontend: http://localhost:8000
2. Fill out the contact form
3. Submit
4. Check Google Sheets for the new row

---

## Troubleshooting

**Webhook not found?**
- Make sure workflow is **Active** (toggle in top-right)
- Check the path is exactly `contact-submit`

**Google Sheets error?**
- Verify you've created "ROR-STAY Contact Submissions" sheet
- Check column headers match exactly
- Re-authenticate Google connection

**CORS error?**
- Add response headers in webhook:
  ```json
  {
    "headers": {
      "Access-Control-Allow-Origin": "*"
    }
  }
  ```

---

✅ **Workflow 1 Complete!**

Move to Workflow 2: Get Property Listings
