---
id: deep-extraction
title: Deep Extraction
sidebar_position: 5
---

# Deep Extraction

:::tip Cloud Only Feature
Deep Extraction is available exclusively in **Maxun Cloud**. This feature is not available in self-hosted installations.
:::

Deep Extraction allows your robot to run the same workflow across multiple URLs instead of just one page. Your robot will perform the exact same extraction actions and take screenshots on each URL automatically.

![Deep Extraction Overview](deep_extraction_overview.png)

## Important Requirements

**Same Domain Only**: All URLs must be from the same domain as your original robot. For example, if your robot is trained on `https://example.com/product/1`, all Deep Extraction URLs must also be from `example.com`.

**Identical Page Structure**: All URLs must have the same page layout and structure. If your robot extracts product titles, prices, and descriptions, every URL in your list must have these same elements in the same locations on the page.

![Page Structure Requirements](page_structure_requirements.png)

## Key Features

### 1. Multiple URL Processing

You can provide URLs to your robot in two ways:

**Manual Upload**: Upload a CSV or JSON file with all the URLs you want to extract data from.

![Manual URL Upload](manual_url_upload.png)

**Automatic URL Discovery**: Your robot will find URLs on the page while it runs, then automatically extract data from those URLs too.

![Automatic URL Discovery](automatic_url_discovery.png)

### 2. What Your Robot Will Do

When Deep Extraction is turned on:
- Run the exact same steps on every URL
- Extract the same data from each page  
- Take screenshots of every page
- Combine all the data into one complete result

![Deep Extraction Process](deep_extraction_process.png)

## Configuration

### Enabling Deep Extraction

![Enable Deep Extraction](enable_deep_extraction.png)

### URL File Formats

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

![URL File Upload](url_file_upload.png)

### Settings

- **Batch Size**: Number of URLs to process simultaneously
- **Delay Between Requests**: Time interval between processing each URL
- **Automatic URL Discovery**: Enable robots to discover and queue URLs automatically
- **Screenshot Capture**: Capture screenshots from all processed pages

![Deep Extraction Settings](deep_extraction_settings.png)

## Results

Once your robot finishes running Deep Extraction, you'll see:
- Combined data from all URLs in one place
- Screenshots from every page that was processed
- A report showing which URLs worked and which had problems

![Deep Extraction Results](deep_extraction_results.png)