---
id: sdk-overview
title: Overview
sidebar_position: 1
---

# Maxun Python SDK

The Maxun Python SDK lets you interact with Maxun programmatically. You can create and manage robots for web scraping, crawling, search, and structured data extraction.

## Installation

Install the SDK with pip:

```bash
pip install maxun
```

### LLM Support

LLM-powered extraction requires an additional provider package:

```bash
pip install "maxun[anthropic]"   # Anthropic
pip install "maxun[openai]"      # OpenAI
pip install "maxun[all]"         # All supported providers
```

## Requirements

* Python 3.8+
* A Maxun Cloud or self-hosted instance
* An API key from the [Maxun Dashboard](/api/api)

The SDK manages its HTTP requests using `httpx` and loads environment variables using `python-dotenv`.

## Configuration

You can configure the SDK directly in Python:

```python
from maxun import Config

config = Config(
    api_key="your-api-key",
)
```

For self-hosted instances, provide your Maxun API URL:

```python
from maxun import Config

config = Config(
    api_key="your-api-key",
    base_url="http://localhost:8080/api/sdk/",
)
```

You can also configure the SDK using environment variables in a `.env` file:

```bash
MAXUN_API_KEY=your-api-key
MAXUN_BASE_URL=http://localhost:8080/api/sdk/ # only for self hosted instances
MAXUN_TEAM_ID=your-team-uuid

# Optional: LLM-powered extraction
ANTHROPIC_API_KEY=your-anthropic-key
OPENAI_API_KEY=your-openai-key
```

`MAXUN_BASE_URL` is only required when using a self-hosted Maxun instance.

## SDK Services

The SDK provides high-level classes for different Maxun capabilities:

| Class     | Purpose                              |
| --------- | ------------------------------------ |
| `Scrape`  | Create and work with scraping robots |
| `Crawl`   | Crawl websites and follow links      |
| `Search`  | Search the web                       |
| `Extract` | Extract structured data using LLMs   |
| `Client`  | Low-level access to the Maxun API    |

Each service can be initialized with the same `Config`:

```python
from maxun import Config, Scrape, Crawl, Search, Extract

config = Config(api_key="your-api-key")

scraper = Scrape(config)
crawler = Crawl(config)
searcher = Search(config)
extractor = Extract(config)
```

You only need to initialize the services you use.

### Using the Client

`Client` is the lower-level API interface. It is useful when you need direct access to Maxun API operations that are not exposed through one of the high-level services.

```python
from maxun import Client, Config

client = Client(Config(api_key="your-api-key"))
```

For most common workflows, use the service classes such as `Scrape`, `Crawl`, `Search`, and `Extract`.

## What's Next

* [Scrape](./sdk-scrape) — Create and run scraping robots
* [Crawl](./sdk-crawl) — Crawl websites and follow links
* [Search](./sdk-search) — Search the web
* [Extract](./sdk-extract) — Extract structured data with LLMs
* [Client](./sdk-client) — Access the underlying Maxun API
