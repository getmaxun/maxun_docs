---
id: deep-extraction
title: Deep Extraction
sidebar_position: 5
---

# Deep Extraction

:::tip Cloud Only Feature
Deep Extraction is available exclusively in **Maxun Cloud**. This feature is not available in self-hosted installations.
:::

Deep Extraction allows your robot to process multiple URLs using the same workflow, extracting data from many pages automatically. Instead of running on just one page, your robot can now handle hundreds or thousands of URLs with identical page structures.

<!-- ![Deep Extraction Overview](deep_extraction_overview.png) -->

## Requirements

**Same Domain Only**: All URLs must be from the same domain as your original robot. For example, if your robot is trained on `https://example.com/product/1`, all Deep Extraction URLs must also be from `example.com`.

**Identical Page Structure**: All URLs must have the same page layout and structure. If your robot extracts product titles and prices, every URL in your list must have these same elements in the same locations.

## How It Works

### Robot Modes

**Normal Mode**: Processes one URL at a time (default behavior)

**Bulk Mode**: Processes multiple URLs automatically using your configured URL list

You can switch between modes anytime. Switching to Bulk Mode enables Deep Extraction, while Normal Mode returns to standard single-URL operation.

### URL Sources

You can provide URLs in two ways:

**1. File Upload**: Upload a CSV or JSON file containing all the URLs you want to process.

**2. Extract from Run Data**: Your robot automatically discovers and processes URLs found during regular runs.

<!-- ![URL Source Options](url_source_options.png) -->

## Setup

### File Upload Method

**Supported Formats:**
- CSV files (.csv)
- JSON files (.json)

**CSV Example:**
```csv
url
https://example.com/product/1
https://example.com/product/2
https://example.com/product/3
```

**JSON Example:**
```json
{
  "urls": [
    "https://example.com/product/1", 
    "https://example.com/product/2",
    "https://example.com/product/3"
  ]
}
```

The upload interface supports drag and drop, validates URLs in real-time, and provides sample file templates for download.

<!-- ![File Upload Interface](file_upload_interface.png) -->

### Run Data Extraction Method

With this method, your robot runs normally and automatically captures URLs encountered during execution. These discovered URLs are then queued for bulk processing in future runs.

This is useful for:
- Processing product catalogs
- Following pagination links
- Extracting data from search results
- Handling dynamic URL discovery

<!-- ![Run Data Extraction](run_data_extraction.png) -->

## Configuration

### Enabling Deep Extraction

1. Go to your robot's configuration page
2. Select "Deep Extraction" 
3. Choose your URL source method (File Upload or Run Data)
4. Upload your URL file or set up run data extraction
5. Click "Start Extraction" or "Setup Extraction"

### Mode Management

Once configured, you can:
- **Switch to Bulk Mode**: Enables processing of multiple URLs
- **Switch to Normal Mode**: Returns to single URL processing  
- **Remove Deep Extraction**: Permanently removes all settings and returns robot to standard operation

<!-- ![Mode Management](mode_management.png) -->