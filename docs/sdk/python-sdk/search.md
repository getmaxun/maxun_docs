---
id: sdk-search
title: Search
sidebar_position: 5
---

# Search

Perform web searches using DuckDuckGo and optionally scrape content from search results.

## Creating Search Robots

```python
from maxun import Search, SearchConfig, Config

searcher = Search(Config(api_key="your-api-key"))

robot = await searcher.create(
    "Tech News Search",
    SearchConfig(
        query="artificial intelligence 2025",
        mode="discover",
        limit=10,
    ),
)
```

## Configuration

### Required Options

**`query`** (required)

The search query in natural language.

```python
SearchConfig(
    query="latest AI developments",
)
```

### Optional Configuration

**`mode`** (optional)

Search mode. Defaults to `discover`.

* `discover` - Returns search result metadata such as title, URL, and description.
* `scrape` - Visits each result page and extracts its content.

```python
SearchConfig(
    query="web scraping tools",
    mode="discover",  # or "scrape"
)
```

**`limit`** (optional)

Maximum number of search results to return. Defaults to `10`.

```python
SearchConfig(
    query="AI news",
    limit=20,
)
```

**`filters`** (optional)

Search filters for time range and region.

```python
SearchConfig(
    query="AI startups",
    filters={
        "timeRange": "week",  # "day", "week", "month", "year"
        "region": "us-en",
    },
)
```

**`provider`** (optional)

Search provider. Currently, only `duckduckgo` is supported. Defaults to `duckduckgo`.

```python
SearchConfig(
    query="AI research",
    provider="duckduckgo",
)
```

## Search Modes

### Discover Mode

Returns search result metadata only. This is the faster and lighter search mode.

```python
robot = await searcher.create(
    "Quick Research",
    SearchConfig(
        query="web scraping tools",
        mode="discover",
        limit=10,
    ),
)

result = await robot.run()
```

Each result can include:

* Title
* URL
* Description

### Scrape Mode

Visits each search result and extracts page content.

```python
robot = await searcher.create(
    "Deep Research",
    SearchConfig(
        query="machine learning tutorials",
        mode="scrape",
        limit=10,
    ),
)

result = await robot.run()
```

Scraped results can include:

* Page metadata
* HTML content
* Clean text content
* Links found on the page
* HTTP status code
* Page summary
* Word count

## Time Filters

Filter results by publication date.

```python
# Last 24 hours
SearchConfig(
    query="AI news",
    filters={"timeRange": "day"},
)

# Last 7 days
SearchConfig(
    query="AI news",
    filters={"timeRange": "week"},
)

# Last 30 days
SearchConfig(
    query="AI news",
    filters={"timeRange": "month"},
)

# Last 12 months
SearchConfig(
    query="AI news",
    filters={"timeRange": "year"},
)
```

## Examples

### Quick Research

```python
robot = await searcher.create(
    "Topic Research",
    SearchConfig(
        query="react best practices 2025",
        mode="discover",
        limit=15,
        filters={"timeRange": "year"},
    ),
)

result = await robot.run()

for item in result["data"]["searchData"]:
    print("Title:", item.get("title"))
    print("URL:", item.get("url"))
    print("Description:", item.get("description"))
```

### Content Scraping

```python
robot = await searcher.create(
    "Content Analysis",
    SearchConfig(
        query="climate change solutions",
        mode="scrape",
        limit=10,
        filters={"timeRange": "month"},
    ),
)

result = await robot.run()

for item in result["data"]["searchData"]:
    print("URL:", item.get("metadata", {}).get("url"))
    print("Title:", item.get("metadata", {}).get("title"))
    print("Content:", item.get("text"))
    print("Word count:", item.get("wordCount"))
```

### Breaking News

```python
robot = await searcher.create(
    "News Monitor",
    SearchConfig(
        query="technology breakthroughs",
        mode="scrape",
        limit=20,
        filters={"timeRange": "day"},
    ),
)

result = await robot.run()
```

### Competitive Research

```python
robot = await searcher.create(
    "Competitor Analysis",
    SearchConfig(
        query="project management tools",
        mode="scrape",
        limit=30,
        filters={"timeRange": "year"},
    ),
)

result = await robot.run()
```

### Market Analysis

```python
queries = [
    "AI automation tools",
    "workflow automation software",
    "business process automation",
]

for query in queries:
    robot = await searcher.create(
        f"Market Research: {query}",
        SearchConfig(
            query=query,
            mode="discover",
            limit=20,
            filters={"timeRange": "month"},
        ),
    )

    result = await robot.run()
    await save_to_database(query, result["data"]["searchData"])
```

## Accessing Search Results

### Discover Mode Results

```python
result = await robot.run()

if result["data"].get("searchData"):
    results = result["data"]["searchData"]

    for item in results:
        print("Title:", item.get("title"))
        print("URL:", item.get("url"))
        print("Description:", item.get("description"))
```

### Scrape Mode Results

```python
result = await robot.run()

if result["data"].get("searchData"):
    results = result["data"]["searchData"]

    for item in results:
        print("URL:", item.get("metadata", {}).get("url"))
        print("Title:", item.get("metadata", {}).get("title"))
        print("HTML:", item.get("html"))
        print("Text:", item.get("text"))
        print("Links:", item.get("links"))
        print("Status:", item.get("metadata", {}).get("statusCode"))
        print("Summary:", item.get("summary"))
```

## Running Search Robots

Run a search robot immediately:

```python
result = await robot.run()
```

You can also pass execution options:

```python
result = await robot.run({
    "timeout": 30000,
})
```

For scheduling, webhooks, and other robot management features, see [Robot Management](/sdk/python-sdk/sdk-robot).
