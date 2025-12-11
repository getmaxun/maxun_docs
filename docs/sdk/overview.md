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

## Quick Start

```javascript
import { Extract } from 'maxun-sdk';

const extractor = new Extract({
  apiKey: process.env.MAXUN_API_KEY
});

const robot = await extractor
  .create('My Robot')
  .navigate('https://example.com')
  .captureText({ title: '.page-title' });

const result = await robot.run();
console.log(result.data);
```

## Environment Variables

```bash
MAXUN_API_KEY=your-api-key

# For LLM Extraction (optional)
ANTHROPIC_API_KEY=your-anthropic-key
OPENAI_API_KEY=your-openai-key
```

## SDK Initialization

```javascript
import { Extract, Scrape } from 'maxun-sdk';

// For Extract robots
const extractor = new Extract({
  apiKey: process.env.MAXUN_API_KEY
});

// For Scrape robots
const scraper = new Scrape({
  apiKey: process.env.MAXUN_API_KEY
});
```
