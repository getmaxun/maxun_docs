---
id: sdk-search
title: Search
sidebar_position: 5
---

# Search

A search robot searches the web (with DuckDuckGo) and returns the results. It can also open each result and scrape its content, so you get search plus page content in one step.

```python
robot = await maxun.search("AI news", "AI model releases", mode="discover", time_range="week")

result = await robot.run()

for item in result.search_data["Search Results"]["results"]:
    print(item["title"], item["url"])
```

## Options

| Option | Default | Description |
|---|---|---|
| `mode` | `"scrape"` | `"discover"` returns titles, URLs and snippets. `"scrape"` also opens every result and scrapes it |
| `limit` | `10` | Number of results |
| `time_range` | any time | Only results from the last `"day"`, `"week"`, `"month"` or `"year"` |
| `formats` | `["markdown"]` | In scrape mode, what to capture from each result: `markdown`, `html`, `text`, `links`, `summary`, `screenshot-visible`, `screenshot-fullpage` |

## Search modes

### Discover

Fast. Returns the search results themselves, without visiting the pages.

```python
robot = await maxun.search("Scraping tools", "open source web scraping tools", mode="discover", limit=20)

result = await robot.run()

for item in result.search_data["Search Results"]["results"]:
    print(item["position"], item["title"])
    print(item["url"])
    print(item["description"])
```

### Scrape

The default. Opens every result and returns its content in the formats you choose.

```python
robot = await maxun.search(
    "Scraping guides",
    "how to scrape a website with python",
    limit=5,
    formats=["markdown", "links"],
)

result = await robot.run()

for page in result.search_data["Search Results"]["results"]:
    print(page["metadata"]["url"])
    print(page.get("markdown", "")[:300])
```

Each scraped result has the formats you asked for plus `metadata` (`url`, `title`, ...) and `searchResult` (the original `position` and title in the search results). A result that could not be opened has an `error` instead.

## Time range

```python
robot = await maxun.search("Today's AI news", "artificial intelligence", mode="discover", time_range="day")
```

Use `"day"`, `"week"`, `"month"` or `"year"`. Leave it out to search any time.

## Examples

### Research a topic

```python
robot = await maxun.search(
    "LLM agents research",
    "LLM agent benchmarks",
    limit=5,
    formats=["summary"],
)

result = await robot.run()
for page in result.search_data["Search Results"]["results"]:
    print(page["metadata"]["url"], "→", page.get("summary"))
```

`summary` uses an LLM. On self-hosted Maxun, also pass `llm_provider`, `llm_api_key` and optionally `llm_model` and `llm_base_url`. On Maxun Cloud, leave them out.

### Daily news digest

```python
robot = await maxun.search("Competitor news", "Acme Corp announcement", mode="discover", time_range="day")
await robot.schedule(run_every=1, run_every_unit="DAYS", at_time_start="08:00", timezone="Asia/Kolkata")
await robot.add_webhook("https://your-app.com/hooks/news")
```

Every morning Maxun runs the search and sends the results to your webhook.

### Several queries

```python
queries = ["AI automation tools", "workflow automation software", "RPA platforms"]

for query in queries:
    robot = await maxun.search(f"Market: {query}", query, mode="discover", time_range="month")
    result = await robot.run()
    save_to_database(query, result.search_data["Search Results"]["results"])
```

## Managing search robots

```python
robots = await maxun.search.list()
await robot.set_list_limit(25)     # change the number of results
await robot.delete()
```

:::note
Search robots are not deduplicated by name: every `maxun.search(...)` call creates a new robot. Reuse a robot with `await maxun.robots.find(name)` instead of creating it again.
:::

See [Robot Management](./sdk-robot) to run, schedule and manage robots.