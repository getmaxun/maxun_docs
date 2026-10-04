---
id: sdk-crawl
title: "Python Web Crawler: Crawl Entire Websites"
description: "Crawl entire websites in Python with the Maxun SDK. Domain, subdomain and path modes, page limits, depth, path filters and sitemap discovery."
sidebar_label: "Crawl"
sidebar_position: 4
---

# Crawl

A crawl robot starts on one page, follows the links it finds and collects the content of every page it visits. Use it to grab a whole documentation site, a blog or a product catalogue.

```python
robot = await maxun.crawl("Example docs", "https://docs.example.com", limit=20)

result = await robot.run()

for page in result.crawl_data:
    print(page["metadata"]["url"])
    print(page.get("markdown", "")[:200])
```

## Options

Every option has a sensible default, so a name and a URL are enough to start.

| Option | Default | Description |
|---|---|---|
| `mode` | `"domain"` | Which links to follow: `"domain"`, `"subdomain"` or `"path"` (see below) |
| `limit` | `50` | Maximum number of pages to crawl |
| `max_depth` | `3` | How many links away from the start page to go |
| `include_paths` | none | Only crawl URLs matching these patterns, e.g. `["/blog/*"]` |
| `exclude_paths` | none | Skip URLs matching these patterns, e.g. `["/admin/*"]` |
| `use_sitemap` | `True` | Also find pages through the site's `sitemap.xml` |
| `follow_links` | `True` | Follow links found on each page |
| `respect_robots` | `True` | Obey the site's `robots.txt` |
| `formats` | `["markdown"]` | What to capture from each page: `markdown`, `html`, `text`, `links`, `summary`, `screenshot-visible`, `screenshot-fullpage` |
| `monitor` | `False` | Compare every run with the previous one. See [Monitoring](./sdk-monitoring) |

```python
robot = await maxun.crawl(
    "Docs guides",
    "https://docs.example.com",
    limit=100,
    max_depth=4,
    include_paths=["/guides/*"],
    exclude_paths=["/guides/archive/*"],
    formats=["markdown", "links"],
)
```

## Crawl modes

`mode` decides how far the crawl may wander from the start URL.

| Mode | Starting at `https://example.com/blog` it crawls |
|---|---|
| `domain` | Any page on `example.com` |
| `subdomain` | Pages on `example.com` and its subdomains, such as `docs.example.com` |
| `path` | Only pages under `example.com/blog` |

```python
robot = await maxun.crawl("Blog", "https://example.com/blog", mode="path")
```

## Reading the results

`result.crawl_data` is a list with one entry per page:

```python
result = await robot.run()

for page in result.crawl_data:
    print(page["metadata"]["url"])
    print(page["metadata"].get("title"))
    print(page.get("markdown"))
```

Each page contains the formats you asked for (`markdown`, `html`, `text`, `links`, ...) plus `metadata` with the page's `url`, `title` and other meta tags. A page that could not be loaded has an `error` instead.

:::tip
Large crawls can take a while. `run()` waits until the crawl finishes. Pass `timeout=600` (seconds) to stop waiting sooner; the crawl keeps going on Maxun and you can read it later with `await robot.get_latest_run()`.
:::

## Examples

### A whole documentation site

```python
robot = await maxun.crawl(
    "Product docs",
    "https://docs.example.com",
    limit=200,
    max_depth=5,
)

result = await robot.run()
docs = {
    page["metadata"]["url"]: page["markdown"]
    for page in result.crawl_data
    if "markdown" in page
}
```

### Only blog posts

```python
robot = await maxun.crawl(
    "Blog posts",
    "https://example.com",
    include_paths=["/blog/*"],
    exclude_paths=["/blog/tag/*", "/blog/page/*"],
    limit=50,
)
```

### Keep a knowledge base up to date

Crawl once a week and see which pages were added, removed or changed:

```python
robot = await maxun.crawl("Help center", "https://help.example.com", limit=100, monitor=True)
await robot.schedule(run_every=1, run_every_unit="WEEKS", start_from="MONDAY", at_time_start="06:00")
```

See [Monitoring](./sdk-monitoring) for how to read the changes.

### Summarize every page

```python
robot = await maxun.crawl("Docs summaries", "https://docs.example.com", formats=["summary"], limit=20)

result = await robot.run()
for page in result.crawl_data:
    print(page["metadata"]["url"], "→", page.get("summary"))
```

`summary` uses an LLM. On self-hosted Maxun, also pass `llm_provider`, `llm_api_key` and optionally `llm_model` and `llm_base_url`. On Maxun Cloud, leave them out.

## Managing crawl robots

```python
robots = await maxun.crawl.list()            # all crawl robots
robot = await maxun.robots.find("Blog posts")
await robot.set_list_limit(500)              # crawl more pages from now on
await robot.delete()
```

See [Robot Management](./sdk-robot) to run, schedule and manage robots.