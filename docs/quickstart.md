---
sidebar_position: 2
slug: /quickstart
---

# Get Started

### Maxun Cloud

- Sign up at https://app.maxun.dev/register
- Set up your data extraction robot. <a href="/robots">Choose your robot type</a>.
- Name your robot and set it to run regularly, like daily.

That’s it! Most users create their first robot in about a minute.

### Maxun SDK

The Maxun SDK lets you create robots programmatically for scraping websites and extracting structured data.

### Installation

```bash
npm install maxun-sdk
```

### Requirements
- API Key from <a href="/api/api">Maxun Dashboard</a>

### Environment Variables

```bash
MAXUN_API_KEY=your-api-key

# For LLM Extraction (optional)
ANTHROPIC_API_KEY=your-anthropic-key
OPENAI_API_KEY=your-openai-key
```

### Initialization

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
