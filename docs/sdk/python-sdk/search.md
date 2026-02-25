---
id: sdk-search
title: Search
sidebar_position: 5
---

# Search

Perform web searches and optionally scrape content from search results using DuckDuckGo.

## Creating Search Robots

```python
from maxun import Search, SearchConfig, Config

searcher = Search(
    Config(api_key="your-api-key")
)

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

**query** (required)

The search query in natural language.

```python
SearchConfig(
    query="latest AI developments",
)
```

### Optional Configuration

**mode** (optional)

Search mode. Defaults to `discover`.

- `discover` - Returns only search result metadata (title, URL, description)
- `scrape` - Visits each result page and extracts full content

```python
SearchConfig(
    query="web scraping tools",
    mode="discover",  # or "scrape"
)
```

**limit** (optional)

Maximum number of search results to return. Defaults to 10.

```python
SearchConfig(
    query="AI news",
    limit=20,
)
```

**filters** (optional)

Search filters for time range and region.

```python
SearchConfig(
    query="AI startups",
    filters={
        "timeRange": "week",   # "day", "week", "month", "year"
        "region": "us-en",
    },
)
```

**provider** (optional)

Search provider. Currently only `duckduckgo` is supported. Defaults to `duckduckgo`.

```python
SearchConfig(
    query="AI research",
    provider="duckduckgo",
)
```

## Search Modes

### Discover Mode

Returns search result metadata only. Fast and lightweight.

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

**Returns:**
- Title
- URL
- Description

### Scrape Mode

Visits each search result and extracts full page content.

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

**Returns all above plus:**
- Full page metadata
- HTML content
- Clean text content
- Links found on page
- HTTP status code

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
```

### Competitive Research

```python
robot = await searcher.create(
    "Competitor Analysis",
    SearchConfig(
        query="best project management tools",
        mode="scrape",
        limit=30,
        filters={"timeRange": "year"},
    ),
)
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
```

## Managing Search Robots

```python
# Get all search robots
robots = await searcher.get_robots()

# Get specific robot
robot = await searcher.get_robot("robot-id")

# Delete robot
await searcher.delete_robot("robot-id")
```

## Running Search Robots

```python
# Run immediately
result = await robot.run()

# Run with timeout (milliseconds)
result = await robot.run(timeout=30000)
```

For scheduling, webhooks, and other robot management features, see <a href="/sdk/python-sdk/sdk-robot">Robot Management</a>.
