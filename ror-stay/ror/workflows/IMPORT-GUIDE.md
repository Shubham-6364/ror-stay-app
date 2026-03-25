# Import n8n Workflows

## ✅ Two Corrected Workflow Files Created

I've created two separate, properly configured workflows:

1. **`upload-image-workflow.json`** - Upload images to Google Drive
2. **`add-listing-workflow.json`** - Add property listings to Google Sheets

---

## 📥 How to Import into n8n

### Step 1: Import Upload Image Workflow

1. Go to **n8n.codersdiary.shop**
2. Click **Workflows** → **Add Workflow** → **Import from File**
3. Select: `/home/azureuser/ROR-STAY-N8N-LITE/workflows/upload-image-workflow.json`
4. Click **Import**

### Step 2: Configure Google Drive Credentials

1. Click on **"Upload to Google Drive"** node
2. Click **"Select Credential"** → **"Create New Credential"**
3. Follow Google OAuth flow
4. Grant permissions to Google Drive

### Step 3: Update Folder ID

In "Upload to Google Drive" node, update the folder ID to your "ROR-STAY-Images" folder:
- Change `folderId.value` to your actual folder ID from Google Drive URL

### Step 4: Activate Workflow

Toggle **Active** (top-right corner)

---

### Step 5: Import Add Listing Workflow

1. **Add Workflow** → **Import from File**
2. Select: `/home/azureuser/ROR-STAY-N8N-LITE/workflows/add-listing-workflow.json`
3. Click **Import**

### Step 6: Configure Google Sheets Credentials

1. Click on **"Append to Google Sheets"** node
2. Select your Google Sheets credential (same as before)
3. Verify sheet ID matches your "ROR-STAY Property Listings" sheet

### Step 7: Activate Workflow

Toggle **Active**

---

## 🧪 Test the Workflows

### Test Image Upload:
```bash
curl -X POST https://n8n.codersdiary.shop/webhook/upload-image \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "test.png",
    "mimeType": "image/png",
    "fileData": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
  }'
```

Should return:
```json
{
  "url": "https://drive.google.com/uc?export=view&id=...",
  "webViewLink": "...",
  "fileId": "..."
}
```

### Test Add Listing:
```bash
curl -X POST https://n8n.codersdiary.shop/webhook/add-listing \
  -H "Content-Type: application/json" \
  -d '{
    "id": "TEST-001",
    "title": "Test Property",
    "description": "Test Description",
    "price": 10000,
    "location": "Jagatpura",
    "propertyType": "Flat",
    "features": "WiFi",
    "imageURLs": ["https://example.com/image.jpg"],
    "status": "available"
  }'
```

Should return:
```json
{
  "success": true,
  "message": "Property listing added successfully",
  "id": "TEST-001"
}
```

---

## ✅ Checklist

- [ ] Import "Upload Image" workflow
- [ ] Configure Google Drive credentials
- [ ] Update folder ID
- [ ] Activate "Upload Image" workflow
- [ ] Import "Add Listing" workflow  
- [ ] Configure Google Sheets credentials
- [ ] Activate "Add Listing" workflow
- [ ] Test both workflows with curl
- [ ] Test from frontend UI

---

## 🎯 After Both Are Active

**Refresh your browser** (Ctrl+Shift+R) and test the admin panel at:
```
http://localhost:8000/admin.html
```

Both workflows should now work correctly!
