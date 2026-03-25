# Google Sheets Setup Guide

Before creating n8n workflows, you need to set up two Google Sheets.

---

## Sheet 1: ROR-STAY Contact Submissions

### Create the Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **Blank** to create new spreadsheet
3. Name it: **ROR-STAY Contact Submissions**

### Add Headers (Row 1)

Copy and paste these headers in row 1:

```
Name	Email	Phone	Location	Property Type	Number of Members	Budget	Requirements	Timestamp
```

Or add them individually:
- Column A: **Name**
- Column B: **Email**
- Column C: **Phone**
- Column D: **Location**
- Column E: **Property Type**
- Column F: **Number of Members**
- Column G: **Budget**
- Column H: **Requirements**
- Column I: **Timestamp**

### Format the Sheet

1. **Bold the header row**: Select row 1 → Click **Bold** (Ctrl+B)
2. **Freeze header**: View → Freeze → 1 row
3. **Auto-resize columns**: Select all → Format → Resize columns → Fit to data

### Share Settings

1. Click **Share** (top-right)
2. Change to: **Anyone with the link can view**
3. Or give edit access to your Google account used in n8n

---

## Sheet 2: ROR-STAY Property Listings

### Create the Sheet

1. Create new spreadsheet
2. Name it: **ROR-STAY Property Listings**

### Add Headers (Row 1)

```
ID	Title	Description	Price	Location	Property Type	Features	Image URLs	Status	Timestamp
```

Or add them individually:
- Column A: **ID**
- Column B: **Title**
- Column C: **Description**
- Column D: **Price**
- Column E: **Location**
- Column F: **Property Type**
- Column G: **Features**
- Column H: **Image URLs**
- Column I: **Status**
- Column J: **Timestamp**

### Format the Sheet

1. **Bold header row**
2. **Freeze header**
3. **Auto-resize columns**

### Add Sample Data (Optional)

Add a test row to verify everything works:

| ID | Title | Description | Price | Location | Property Type | Features | Image URLs | Status | Timestamp |
|----|-------|-------------|-------|----------|---------------|----------|------------|--------|-----------|
| PROP-001 | 2BHK Flat Jagatpura | Spacious 2BHK with modern amenities | 15000 | Jagatpura | Flat | WiFi, Parking, Security | https://via.placeholder.com/400x300 | available | 2026-01-18T14:00:00Z |

---

## Google Drive Folder

### Create Image Storage Folder

1. Go to [Google Drive](https://drive.google.com)
2. Click **New** → **Folder**
3. Name it: **ROR-STAY-Images**
4. Open the folder
5. Copy the **Folder ID** from the URL:
   ```
   https://drive.google.com/drive/folders/[FOLDER_ID_HERE]
   ```

### Share Settings

1. Right-click folder → Share
2. Change to: **Anyone with the link can view**

---

## Important Notes

✅ **Keep sheet names exact** - n8n workflows reference these names  
✅ **Header names are case-sensitive** - Must match exactly  
✅ **Column order doesn't matter** - n8n uses header names  
✅ **Don't delete headers** - Workflows will break  

---

## Quick Checklist

- [ ] Created "ROR-STAY Contact Submissions" sheet
- [ ] Added 9 headers to contact sheet
- [ ] Created "ROR-STAY Property Listings" sheet  
- [ ] Added 10 headers to listings sheet
- [ ] Created "ROR-STAY-Images" folder in Drive
- [ ] Shared sheets with view access
- [ ] Copied Folder ID for later use

---

✅ **Google Setup Complete!**

You're ready to create n8n workflows.
