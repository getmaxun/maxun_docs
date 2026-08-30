---
id: sdk-overview
title: Overview
sidebar_position: 1
---

# Maxun SDK

The Maxun SDK lets you create robots programmatically for scraping websites and extracting structured data.

## Installation

```bash
npm install maxun-sdk
```

## Requirements

- Node.js 18.0.0 or higher
- Maxun instance (Cloud or self-hosted)
- API Key from <a href="/api/api">Maxun Dashboard</a>

## Environment Variables

```bash
MAXUN_API_KEY=your-api-key

# For LLM Extraction (optional)
ANTHROPIC_API_KEY=your-anthropic-key
OPENAI_API_KEY=your-openai-key
```

## SDK Initialization

```javascript
import { Extract, Scrape, Crawl, Search } from 'maxun-sdk';

// For Extract
const extractor = new Extract({
  apiKey: process.env.MAXUN_API_KEY
});

// For Scrape
const scraper = new Scrape({
  apiKey: process.env.MAXUN_API_KEY
});

// For Crawl
const crawler = new Crawl({
  apiKey: process.env.MAXUN_API_KEY
});

// For Search
const searcher = new Search({
  apiKey: process.env.MAXUN_API_KEY
});
```
