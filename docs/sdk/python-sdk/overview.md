---
id: sdk-overview
title: Overview
sidebar_position: 1
---

# Maxun Python SDK

The Maxun Python SDK lets you create robots programmatically for scraping websites and extracting structured data.

## Installation

```bash
pip install maxun
```

### With LLM Support
```bash
pip install "maxun[anthropic]"   # Anthropic Claude
pip install "maxun[openai]"      # OpenAI GPT
pip install "maxun[all]"         # All LLM providers
```

## Requirements

- Python 3.8+
- httpx >= 0.24.0
- python-dotenv >= 1.0.0
- Optional: anthropic >= 0.18.0, openai >= 1.0.0
- Maxun instance (Cloud or self-hosted)
- API Key from <a href="/api/api">Maxun Dashboard</a>

## Environment Variables
Environment variables are supported via a `.env file` (uses python-dotenv):

```bash
MAXUN_API_KEY=your-api-key
MAXUN_BASE_URL=http://localhost:8080/api/sdk # must be set for self hosted instances, can be skipped if using cloud
MAXUN_TEAM_ID=your-team-uuid

# For LLM Extraction (optional)
ANTHROPIC_API_KEY=your-anthropic-key
OPENAI_API_KEY=your-openai-key
```

## SDK Initialization

```python
from maxun import Config, Scrape, Crawl, Search, Extract

// For Extract
extractor = Extract(Config(api_key="..."))

// For Scrape
scraper = Scrape(Config(api_key="..."))

// For Crawl
crawler = Crawl(Config(api_key="..."))

// For Search
searcher = Search(Config(api_key="..."))
```
