---
id: sdk-scrape
title: Scrape
sidebar_position: 3
---

# Scrape

Convert webpages into clean HTML, LLM-ready Markdown, or screenshots with zero configuration.

## Creating Scrape Robots

```python
from maxun import Scrape, Config

scraper = Scrape(
    Config(api_key="your-api-key")
)

robot = await scraper.create(
    "Content Scraper",
    "https://example.com/article",
    formats=["markdown", "html"],
)
```

## Output Formats

### Markdown

```python
from maxun import Scrape, Config

scraper = Scrape(Config(api_key="your-api-key"))

robot = await scraper.create(
    "Article Scraper",
    "https://blog.example.com/post",
    formats=["markdown"],
)

result = await robot.run()
print(result["data"]["markdown"])
```

### HTML

```python
from maxun import Scrape, Config

scraper = Scrape(Config(api_key="your-api-key"))

robot = await scraper.create(
    "HTML Scraper",
    "https://example.com",
    formats=["html"],
)

result = await robot.run()
print(result["data"]["html"])
```

### Screenshots

```python
from maxun import Scrape, Config

scraper = Scrape(Config(api_key="your-api-key"))

# Visible viewport
robot_visible = await scraper.create(
    "Screenshot Bot",
    "https://example.com",
    formats=["screenshot-visible"],
)

# Full page
robot_full = await scraper.create(
    "Full Page Screenshot",
    "https://example.com",
    formats=["screenshot-fullpage"],
)
```

### Multiple Formats

```python
from maxun import Scrape, Config

scraper = Scrape(Config(api_key="your-api-key"))

robot = await scraper.create(
    "Multi-Format Scraper",
    "https://example.com",
    formats=["markdown", "html", "screenshot-visible"],
)

result = await robot.run()

print(result["data"]["markdown"])
print(result["data"]["html"])
print(result["data"]["screenshots"])
```

---

## Smart Queries

Smart Queries let you attach a natural language prompt to a scrape robot. After the page is scraped, an LLM analyzes the page content and returns an answer to your prompt.

The result is returned as `result["data"]["promptResult"]`.


```python
from maxun import Scrape, Config

scraper = Scrape(Config(api_key="your-api-key"))

robot = await scraper.create(
    "Pricing Scraper",
    "https://example.com/pricing",
    formats=["markdown"],
    smart_queries="List all plan names and their monthly prices.",
)

result = await robot.run()
print(result["data"]["markdown"])       # full page markdown
print(result["data"]["promptResult"])   # "Starter: $9/mo, Growth: $29/mo, Pro: $99/mo"
```

### More Examples

```python
# Extract specific data points
robot = await scraper.create(
    "Company Info",
    "https://example.com/about",
    formats=["markdown"],
    smart_queries="What is the company founding year and headquarters location?",
)

# Summarize content
robot = await scraper.create(
    "Article Summarizer",
    "https://blog.example.com/post",
    formats=["markdown"],
    smart_queries="Summarize this article in 3 bullet points.",
)

result = await robot.run()
print(result["data"]["promptResult"])
```

---

## Examples

### RAG Pipeline

```python
from maxun import Scrape, Config

scraper = Scrape(Config(api_key="your-api-key"))

robot = await scraper.create(
    "RAG Content",
    "https://docs.example.com/guide",
    formats=["markdown"],
)

result = await robot.run()
markdown = result["data"]["markdown"]

# Send to embedding service
create_embeddings(markdown)
```

### Content Aggregation

```python
from maxun import Scrape, Config

scraper = Scrape(Config(api_key="your-api-key"))

urls = [
    "https://blog.example.com/post-1",
    "https://blog.example.com/post-2",
]

for url in urls:
    robot = await scraper.create(
        f"Article {url}",
        url,
        formats=["markdown"],
    )

    result = await robot.run()
    save_to_database(result["data"]["markdown"])
```

## Managing Scrape Robots

```python
# Get all scrape robots
robots = await scraper.get_robots()

# Get specific robot
robot = await scraper.get_robot("robot-id")

# Delete robot
await scraper.delete_robot("robot-id")
```

## Running Scrape Robots

```python
# Run immediately
result = await robot.run()

# Run with timeout (milliseconds)
result = await robot.run(timeout=30000)
```

For scheduling, webhooks, and other robot management features, see <a href="/sdk/python-sdk/sdk-robot">Robot Management</a>.
