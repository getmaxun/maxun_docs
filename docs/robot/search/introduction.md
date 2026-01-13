---
id: search-introduction
title: Overview
sidebar_position: 1
---

# Search

Search performs web searches and scrapes content from search results. Instead of manually searching and visiting each result, search robots automate the entire process - from running queries to scraping content.

## How It Works

1. **Enter Search Query**: Describe what you're looking for in natural language.

2. **Configure Search Settings**: Define your search parameters:
   - Number of results to retrieve
   - Search mode (discover or scrape)
   - Time filters (day, week, month, year)

3. **Create & Run**: The robot runs your search, collects results, and optionally scrapes full content from each result page.

## Search Modes

**Discover Mode**
- Returns search result metadata only (title, URL, description)
- Fast and lightweight
- Perfect for research and URL discovery

**Scrape Mode**
- Returns full page content from each search result
- Includes metadata, HTML, text, and links
- Ideal for content analysis and AI workflows

## What Gets Extracted

**Discover Mode Returns**
- Search result title and description
- Result URL

**Scrape Mode Returns All Above Plus**
- Full page metadata (title, language, meta tags, favicon)
- Complete HTML content
- Clean text content with word count
- All links found on the page
- HTTP status code

### ✅ When to Use Search

1. You need to gather information from multiple sources on a topic
2. You want to scrape content from top search results automatically
3. You need to monitor search rankings for specific queries

### ❌ When Not to Use Search

1. You already know the exact URLs you want to scrape (use Crawl or Scrape)
2. You need results from a specific search engine other than DuckDuckGo

For known URLs, use Crawl for multiple pages or Scrape for single pages.

## Using with SDK

Search robots are available through the <a href="/sdk/sdk-search">Maxun SDK</a> for programmatic usage and integration into your applications.
