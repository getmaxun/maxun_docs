---
id: sdk-overview
title: "Python Web Scraping SDK: Install & Setup"
description: "Install the maxun Python package, set your API key and create scrape, crawl, search, extract and document robots with async Python."
sidebar_label: "Overview"
sidebar_position: 1
---

# Maxun Python SDK

The Maxun Python SDK turns websites and documents into structured data from your Python code. You create data scraping robots and run them whenever you need fresh data.

```python
import asyncio
from maxun import Maxun

async def main():
    async with Maxun(api_key="your-api-key") as maxun:
        robot = await maxun.scrape("Maxun", "https://maxun.dev", formats=["markdown"])
        result = await robot.run()
        print(result.markdown)


asyncio.run(main())
```

## Installation

```bash
pip install maxun
```

## Requirements

- Python 3.8+
- A Maxun Cloud account or a self-hosted Maxun instance
- An API key from the [Maxun Dashboard](/api/api)

## Configuration

Pass your API key directly:

```python
from maxun import Maxun

maxun = Maxun(api_key="your-api-key")
```

Or set it in the environment and create `Maxun()` with no arguments:

```bash
MAXUN_API_KEY=your-api-key
MAXUN_TEAM_ID=your-team-uuid                      # optional, Maxun Cloud teams
MAXUN_BASE_URL=http://localhost:8080/api/sdk/     # only for self-hosted Maxun
```

```python
from dotenv import load_dotenv
from maxun import Maxun

load_dotenv()          # only needed if your variables are in a .env file
maxun = Maxun()
```

The SDK connects to Maxun Cloud by default. For a self-hosted instance, set `MAXUN_BASE_URL` or pass `base_url`:

```python
maxun = Maxun(api_key="your-api-key", base_url="http://localhost:8080/api/sdk/")
```

`Maxun` keeps one connection open. Use it with `async with` (as above), or call `await maxun.close()` when you are done.

## Everything starts from `maxun`

Each call takes the **robot name** first, then **what to work on** (a URL, a search query or a file), then any settings as keyword arguments. It returns a [`Robot`](./sdk-robot) saved on your account.

| Call | What the robot does | Read the result from |
|---|---|---|
| [`maxun.scrape(name, url)`](./sdk-scrape) | Turns a page into Markdown, HTML, text, links, a summary or screenshots | `result.markdown`, `result.html`, ... |
| [`maxun.extract(name, url, prompt=...)`](./sdk-extract) | Extracts structured data, described in plain English or with selectors | `result.list_data`, `result.text_data` |
| [`maxun.crawl(name, url)`](./sdk-crawl) | Visits many pages of a website | `result.crawl_data` |
| [`maxun.search(name, query)`](./sdk-search) | Searches the web and optionally scrapes the results | `result.search_data` |
| [`maxun.documents.extract(name, file, prompt)`](./sdk-document) | Extracts data from a PDF, DOCX, XLSX, CSV, JPG or PNG | `result.document_data` |
| [`maxun.documents.parse(name, file)`](./sdk-document) | Converts a document to Markdown, HTML, links or a summary | `result.markdown`, ... |
| [`maxun.robots`](./sdk-robot) | Lists, finds and deletes robots of any type | |

The name is required. It is how the robot appears in the Maxun dashboard.

## Without `async`

Prefer plain function calls? `MaxunSync` has exactly the same methods, without `await`. It also works in Jupyter notebooks.

```python
from maxun import MaxunSync

with MaxunSync(api_key="your-api-key") as maxun:
    robot = maxun.scrape("Example", "https://example.com")
    result = robot.run()
    print(result.markdown)
```

:::note
The examples in these docs use `await`, so they need to run inside an `async` function like the one at the top of this page. With `MaxunSync`, drop the `await`.
:::

## Errors

Every API error is a `MaxunError` with `.status_code` and `.details`. More specific errors:

| Error | When |
|---|---|
| `AuthenticationError` | The API key is missing or invalid |
| `NotFoundError` | The robot or run does not exist |
| `ConflictError` | A robot with that name already exists with different settings |
| `ValidationError` | Maxun rejected the input |
| `RunFailedError` | A run failed or was aborted |

```python
from maxun import ConflictError, MaxunError

try:
    robot = await maxun.scrape("Pricing page", "https://example.com/pricing")
except ConflictError:
    robot = await maxun.robots.find("Pricing page")
except MaxunError as error:
    print(error.status_code, error)
```

## What's next

- [Scrape](./sdk-scrape): turn pages into clean content
- [Extract](./sdk-extract): pull structured data out of pages
- [Crawl](./sdk-crawl): collect content from a whole website
- [Search](./sdk-search): search the web
- [Document](./sdk-document): extract data from and convert documents
- [Robot Management](./sdk-robot): run, schedule and manage robots
- [Monitoring](./sdk-monitoring): get notified when a page changes
