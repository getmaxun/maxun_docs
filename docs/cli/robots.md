---
id: cli-robots
title: Robots
sidebar_position: 2
---

# Robots

The `maxun robots` command group lets you create, list, inspect, and manage robots from the terminal.

## List Robots

```bash
maxun robots list
```

Returns all robots as JSON by default. Use `--table` for a formatted view:

```bash
maxun robots list --table
```

## Create Robots

### AI Extraction

Create an AI-powered robot from a natural language prompt. Maxun uses LLMs to infer the extraction schema from the page.

```bash
maxun robots extract -p <prompt> [options]
```

| Option | Description |
|--------|-------------|
| `-p, --prompt <text>` | Natural language description of what to extract (required) |
| `-u, --url <url>` | Target URL for the robot (optional) |
| `-n, --name <name>` | Robot name |
| `--provider <provider>` | LLM provider: `huggingface`, `openrouter` (default: `huggingface`) |
| `--model <model>` | LLM model name |
| `--api-key <key>` | LLM API key |

**Example:**
```bash
maxun robots extract \
  -p "Extract all product names and prices" \
  -u "https://example.com/shop" \
  -n "Shop Extractor"
```

### Scrape

Create a single-page scraping robot.

```bash
maxun robots scrape <url> [options]
```

| Option | Description |
|--------|-------------|
| `-n, --name <name>` | Robot name |
| `-f, --format <fmt>` | Output formats: `markdown`, `html`, `text`, `links`, `summary`, `screenshot-visible`, `screenshot-fullpage` (comma-separated, default: `markdown`) |
| `-p, --prompt <text>` | Smart Queries: LLM prompt to analyze the page and perform actions post scraping |

**Example:**
```bash
maxun robots scrape https://example.com -f markdown,text -n "Example Scraper"
```

### Crawl

Create a multi-page crawler robot.

```bash
maxun robots crawl <url> [options]
```

| Option | Description |
|--------|-------------|
| `-n, --name <name>` | Robot name |
| `-f, --format <fmt>` | Output formats (comma-separated, default: `markdown`) |
| `--limit <n>` | Max pages to crawl (default: 10) |
| `--include <paths>` | Include path patterns (comma-separated) |
| `--exclude <paths>` | Exclude path patterns (comma-separated) |

**Example:**
```bash
maxun robots crawl https://docs.example.com --limit 20 --include "/docs/*" -n "Docs Crawler"
```

### Search

Create a search-based robot.

```bash
maxun robots search <query> [options]
```

| Option | Description |
|--------|-------------|
| `-n, --name <name>` | Robot name |
| `-f, --format <fmt>` | Output formats (comma-separated) |
| `--limit <n>` | Max search results (default: 10) |
| `--mode <mode>` | `discover` (URLs + metadata) or `scrape` (full content, default: `discover`) |

**Example:**
```bash
maxun robots search "Latest AI news" --mode discover --limit 10 -n "AI News"
```

### Document Extract (doc-extract)

Create a robot that extracts structured fields from a PDF using AI.

```bash
maxun robots doc-extract <pdf> [options]
```

| Option | Description |
|--------|-------------|
| `-p, --prompt <prompt>` | What to extract in natural language (required) |
| `-n, --name <name>` | Robot name |
| `--model <model>` | Ollama Cloud model override |

**Example:**
```bash
maxun robots doc-extract invoice.pdf \
  --prompt "Extract invoice number, vendor name, issue date, and total amount" \
  --name "Invoice Extractor"
```

### Document Parse (doc-parse)

Create a robot that converts a PDF into Markdown, HTML, and/or extracted links — no LLM, free.

```bash
maxun robots doc-parse <pdf> [options]
```

| Option | Description |
|--------|-------------|
| `-f, --formats <formats>` | Output formats, comma-separated: `markdown`, `html`, `links` (required) |
| `-n, --name <name>` | Robot name |

**Example:**
```bash
maxun robots doc-parse report.pdf \
  --formats "markdown,html,links" \
  --name "Report Parser"
```

Runs complete in 1–3 seconds.

## Other Robot Commands

| Command | Description |
|---------|-------------|
| `maxun robots get <id>` | Get details for a specific robot |
| `maxun robots delete <id>` | Delete a robot |
| `maxun robots duplicate <id> --url <new-url>` | Duplicate a robot with a different target URL |
