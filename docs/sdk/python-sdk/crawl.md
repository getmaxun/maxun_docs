---
id: sdk-crawl
title: Crawl
sidebar_position: 4
---

# Crawl

Automatically discover and scrape multiple pages from websites using sitemaps and link following.

## Creating Crawl Robots

```python
from maxun import Crawl, CrawlConfig, Config

crawler = Crawl(
    Config(api_key="your-api-key")
)

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

## Configuration

### Basic Options

**mode** (required)

Defines the crawl scope:
- `domain` - Only pages on the exact same domain
- `subdomain` - Domain and all its subdomains
- `path` - Only pages under the same path

**limit** (optional)

Maximum number of pages to crawl. Defaults to 10.

```python
CrawlConfig(
    mode="domain",
    limit=100,
)
```

### Advanced Options

**maxDepth** (optional)

Maximum crawl depth from starting URL. Each link level counts as one depth.

```python
CrawlConfig(
    mode="domain",
    max_depth=3,
)
```

**useSitemap** (optional)

Fetch and parse the website's sitemap.xml. Defaults to `true`.

```python
CrawlConfig(
    mode="domain",
    use_sitemap=True,
)
```

**followLinks** (optional)

Extract and follow links from each visited page. Defaults to `true`.

```python
CrawlConfig(
    mode="domain",
    follow_links=True,
)
```

**includePaths** (optional)

Regex patterns for URLs to include. Only matching URLs will be crawled.

```python
CrawlConfig(
    mode="domain",
    include_paths=[r"/blog/[0-9]{4}/.*"],
)
```

**excludePaths** (optional)

Regex patterns for URLs to exclude from crawling.

```python
CrawlConfig(
    mode="domain",
    exclude_paths=[r".*/admin/.*", r".*/tag/.*"],
)
```

**respectRobots** (optional)

Respect robots.txt directives. Defaults to `true`.

```python
CrawlConfig(
    mode="domain",
    respect_robots=True,
)
```

## Crawl Modes

### Domain Mode

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

Crawls only `blog.example.com`. Won't crawl `shop.example.com` or `example.com`.

### Subdomain Mode

```python
const robot = await crawler.create(
  'Subdomain Crawler',
  'https://example.com',
  {
    mode: 'subdomain',
    limit: 100
  }
)
```

Crawls `example.com`, `blog.example.com`, `shop.example.com`, etc.

### Path Mode

```python
robot = await crawler.create(
    "Path Crawler",
    "https://example.com/blog",
    CrawlConfig(
        mode="path",
        limit=50,
    ),
)
```

Crawls only pages under `/blog/` path.

## Examples

### Blog Crawl

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

```python
robot = await crawler.create(
    "Product Pages",
    "https://example.com",
    CrawlConfig(
        mode="domain",
        limit=100,
        include_paths=[r"/products/.*"],
        exclude_paths=[r".*/reviews/.*", r".*/comments/.*"],
        use_sitemap=True,
        follow_links=True,
    ),
)
```

### Full Site Crawl

```python
robot = await crawler.create(
    "Full Site",
    "https://example.com",
    CrawlConfig(
        mode="subdomain",
        limit=500,
        exclude_paths=[r".*/admin/.*", r".*/login.*"],
        use_sitemap=True,
        follow_links=True,
        respect_robots=True,
    ),
)
```

## Accessing Crawl Results

```python
result = await robot.run()

if result["data"].get("crawlData"):
    pages = result["data"]["crawlData"]

    for page in pages:
        print("URL:", page.get("metadata", {}).get("url"))
        print("Title:", page.get("metadata", {}).get("title"))
        print("Word count:", page.get("wordCount"))
        print("Status:", page.get("metadata", {}).get("statusCode"))
```

Each page contains:
- **metadata** - URL, title, description, language, meta tags, favicon, status code
- **html** - Full page HTML
- **text** - Clean body text
- **wordCount** - Number of words
- **links** - All links found on the page

## Managing Crawl Robots

```python
# Get all crawl robots
robots = await crawler.get_robots()

# Get specific robot
robot = await crawler.get_robot("robot-id")

# Delete robot
await crawler.delete_robot("robot-id")
```

## Running Crawl Robots

```python
# Run immediately
result = await robot.run()

# Run with timeout (milliseconds)
result = await robot.run(timeout=60000)
```

For scheduling, webhooks, and other robot management features, see <a href="/sdk/python-sdk/sdk-robot">Robot Management</a>.