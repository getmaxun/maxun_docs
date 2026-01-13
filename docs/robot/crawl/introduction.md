---
id: crawl-introduction
title: Overview
sidebar_position: 1
---

# Crawl

Crawl automatically discovers and scrapes multiple pages from a website. Instead of manually specifying each URL, crawl intelligently finds pages and extracts content from each page.

## How It Works

1. **Enter Starting URL**: Provide the webpage where the crawl should begin.
2. **Configure Settings**: Set up your crawl preferences.
3. **Automatic Discovery**: The robot finds pages using sitemaps and links.
4. **Content Extraction**: Each discovered page is visited and scraped.

## What Gets Extracted

For each page discovered, the crawl extracts
- **Page metadata**: Title, language, description, favicon, and all meta tags
- **HTML content**: Full page HTML
- **Text content**: Clean body text with word count
- **Links**: All links found on the page
- **Status information**: HTTP status code and scrape timestamp

### ✅ When to Use Crawl 

1. You need to scrape multiple pages from a website
2. You want to discover pages automatically without listing URLs manually
3. You're extracting similar content across many pages (blog posts, product pages, documentation)
4. The website has a clear structure or sitemap

### ❌ When Not to Use Crawl

1. You only need data from a single page (use Extract or Scrape instead)
2. You need complex interactions like logins or form submissions
3. You need to extract structured data in a specific format (use Extract)
4. You need to control the exact order pages are visited

For complex workflows with user interactions, use Extract instead.

## Using with SDK

Crawl is available through the <a href="/sdk/sdk-crawl">Maxun SDK</a> for programmatic usage and integration into your applications.
