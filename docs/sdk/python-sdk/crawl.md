---
id: sdk-crawl
title: Crawl
sidebar_position: 4
---

# Crawl

Create robots that discover and crawl multiple pages from a website using sitemaps, links, or both.

Crawl robots can be configured by domain, subdomain, or path, with controls for crawl depth, page limits, URL filters, and `robots.txt`.

## Creating a Crawl Robot

```python
from maxun import Crawl, CrawlConfig, Config

crawler = Crawl(Config(api_key="your-api-key"))

robot = await crawler.create(
    "Blog Crawler",
    "https://example.com/blog",
    CrawlConfig(
        mode="domain",
        limit=50,
        use_sitemap=True,
        follow_links=True,
    ),
)
```

`create()` returns a [`Robot`](./sdk-robot) instance.

Run the robot to start crawling:

```python
result = await robot.run()
```

## Crawl Configuration

Use `CrawlConfig` to control how pages are discovered and which URLs are crawled.

### `mode`

**Required.** Defines the scope of the crawl.

| Mode        | Description                               |
| ----------- | ----------------------------------------- |
| `domain`    | Crawl pages on the same domain            |
| `subdomain` | Crawl the domain and its subdomains       |
| `path`      | Crawl pages under the starting URL's path |

### `limit`

Maximum number of pages to crawl.

The default is `10`.

```python
CrawlConfig(
    mode="domain",
    limit=100,
)
```

### `max_depth`

Maximum link depth from the starting URL.

Each level of links increases the crawl depth by one.

```python
CrawlConfig(
    mode="domain",
    max_depth=3,
)
```

### `use_sitemap`

Whether to discover URLs from the website's `sitemap.xml`.

The default is `True`.

```python
CrawlConfig(
    mode="domain",
    use_sitemap=True,
)
```

### `follow_links`

Whether to discover and follow links found on crawled pages.

The default is `True`.

```python
CrawlConfig(
    mode="domain",
    follow_links=True,
)
```

You can use sitemap discovery, link following, or both depending on how the site is structured.

### `include_paths`

Regular expression patterns used to include URLs.

Only URLs matching the provided patterns are crawled.

```python
CrawlConfig(
    mode="domain",
    include_paths=[r"/blog/.*"],
)
```

### `exclude_paths`

Regular expression patterns used to exclude URLs.

```python
CrawlConfig(
    mode="domain",
    exclude_paths=[
        r".*/admin/.*",
        r".*/tag/.*",
    ],
)
```

If a URL matches both an include and exclude pattern, the exclude rule takes precedence.

### `respect_robots`

Whether to respect the site's `robots.txt` directives.

The default is `True`.

```python
CrawlConfig(
    mode="domain",
    respect_robots=True,
)
```

## Crawl Modes

### Domain

`domain` keeps the crawl within the same domain.

For example, starting from:

```text
https://blog.example.com
```

the crawler stays on `blog.example.com`.

It does not crawl:

```text
https://shop.example.com
https://example.com
```

Example:

```python
robot = await crawler.create(
    "Domain Crawler",
    "https://blog.example.com",
    CrawlConfig(
        mode="domain",
        limit=50,
    ),
)
```

### Subdomain

`subdomain` allows the crawler to visit the starting domain and its subdomains.

For example, starting from:

```text
https://example.com
```

the crawler can discover:

```text
https://example.com
https://blog.example.com
https://shop.example.com
```

Example:

```python
robot = await crawler.create(
    "Subdomain Crawler",
    "https://example.com",
    CrawlConfig(
        mode="subdomain",
        limit=100,
    ),
)
```

### Path

`path` restricts the crawl to the starting URL's path.

For example, starting from:

```text
https://example.com/blog
```

the crawler can visit:

```text
https://example.com/blog
https://example.com/blog/post-1
https://example.com/blog/post-2
```

but not:

```text
https://example.com/products
```

Example:

```python
robot = await crawler.create(
    "Blog Crawler",
    "https://example.com/blog",
    CrawlConfig(
        mode="path",
        limit=50,
    ),
)
```

## Examples

### Blog Crawl

Crawl blog pages using both the sitemap and links found on pages:

```python
robot = await crawler.create(
    "Blog Posts",
    "https://example.com/blog",
    CrawlConfig(
        mode="path",
        limit=50,
        use_sitemap=True,
        follow_links=True,
    ),
)

result = await robot.run()

print("Pages crawled:", len(result["data"]["crawlData"]))
```

### Documentation Crawl

Crawl a documentation site and its subdomains:

```python
robot = await crawler.create(
    "Documentation",
    "https://docs.example.com",
    CrawlConfig(
        mode="subdomain",
        limit=200,
        use_sitemap=True,
        follow_links=False,
        max_depth=5,
    ),
)
```

### Filtered Crawl

Use URL patterns to focus on specific sections of a website:

```python
robot = await crawler.create(
    "Product Pages",
    "https://example.com",
    CrawlConfig(
        mode="domain",
        limit=100,
        include_paths=[r"/products/.*"],
        exclude_paths=[
            r".*/reviews/.*",
            r".*/comments/.*",
        ],
        use_sitemap=True,
        follow_links=True,
    ),
)
```

### Full Site Crawl

Crawl a larger site while excluding administrative pages:

```python
robot = await crawler.create(
    "Full Site",
    "https://example.com",
    CrawlConfig(
        mode="subdomain",
        limit=500,
        exclude_paths=[
            r".*/admin/.*",
            r".*/login.*",
        ],
        use_sitemap=True,
        follow_links=True,
        respect_robots=True,
    ),
)
```

## Accessing Crawl Results

Run the robot and access the discovered pages from `crawlData`:

```python
result = await robot.run()

pages = result["data"].get("crawlData", [])

for page in pages:
    metadata = page.get("metadata", {})

    print("URL:", metadata.get("url"))
    print("Title:", metadata.get("title"))
    print("Word count:", page.get("wordCount"))
    print("Status:", metadata.get("statusCode"))
```

Each crawled page can contain:

| Field       | Description                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------- |
| `metadata`  | Page metadata such as URL, title, description, language, meta tags, favicon, and status code |
| `html`      | Page HTML                                                                                    |
| `text`      | Clean page text                                                                              |
| `wordCount` | Number of words on the page                                                                  |
| `links`     | Links discovered on the page                                                                 |
| `summary`   | AI-generated plain-text summary                                                              |

The exact fields available can depend on the page and crawl configuration.

## Using Crawl Results

For example, you can collect all crawled URLs:

```python
result = await robot.run()

pages = result["data"].get("crawlData", [])

urls = [
    page.get("metadata", {}).get("url")
    for page in pages
]

print(urls)
```

Or save the crawled page content to your own database:

```python
for page in pages:
    metadata = page.get("metadata", {})

    save_to_database({
        "url": metadata.get("url"),
        "title": metadata.get("title"),
        "text": page.get("text"),
        "html": page.get("html"),
    })
```

## Managing Crawl Robots

`Crawl.create()` returns a [`Robot`](./sdk-robot) instance. Use the returned robot for operations such as running, refreshing, or deleting it.

```python
robot = await crawler.create(
    "Blog Crawler",
    "https://example.com/blog",
    CrawlConfig(
        mode="path",
        limit=50,
    ),
)

# Run the crawl
result = await robot.run()

# Get the current robot data
data = robot.get_data()

# Refresh robot data from Maxun
await robot.refresh()

# Delete the robot
await robot.delete()
```

To retrieve a robot that was created previously, use the lower-level `Client`:

```python
from maxun import Client, Config

client = Client(
    Config(api_key="your-api-key")
)

robot_data = await client.get_robot("robot-id")
```

See [Robot Management](./sdk-robot) for scheduling, webhooks, runs, monitoring, and other robot operations.
