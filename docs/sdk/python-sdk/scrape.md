---
id: sdk-scrape
title: Scrape
sidebar_position: 3
---

# Scrape

Create robots that turn webpages into clean Markdown, HTML, screenshots, or AI-generated summaries.

A scrape robot is created with a URL and one or more output formats. Once created, you can run the robot whenever you need to scrape the page.

## Creating a Scrape Robot

```python
from maxun import Scrape, Config

scraper = Scrape(Config(api_key="your-api-key"))

robot = await scraper.create(
    "Article Scraper",
    "https://example.com/article",
    formats=["markdown"],
)
```

`create()` returns a [`Robot`](./sdk-robot) instance that you can run, inspect, schedule, or delete.

If no output format is specified, the robot uses `markdown` by default.

## Output Formats

A scrape robot can return one or more output formats.

### Markdown

Markdown is useful for extracting clean, LLM-ready page content.

```python
robot = await scraper.create(
    "Article Scraper",
    "https://blog.example.com/post",
    formats=["markdown"],
)

result = await robot.run()

print(result["data"]["markdown"])
```

### HTML

Return the page's HTML content:

```python
robot = await scraper.create(
    "HTML Scraper",
    "https://example.com",
    formats=["html"],
)

result = await robot.run()

print(result["data"]["html"])
```

### Screenshots

Scrape robots can capture either the visible viewport or the full page.

#### Visible viewport

```python
robot = await scraper.create(
    "Screenshot Bot",
    "https://example.com",
    formats=["screenshot-visible"],
)
```

#### Full page

```python
robot = await scraper.create(
    "Full Page Screenshot",
    "https://example.com",
    formats=["screenshot-fullpage"],
)
```

Run the robot to retrieve the screenshot result:

```python
result = await robot.run()

print(result["data"]["screenshots"])
```

### Summary

The `summary` format generates an AI-powered plain-text summary of the page.

```python
robot = await scraper.create(
    "Blog Post Summarizer",
    "https://blog.example.com/post",
    formats=["summary"],
)

result = await robot.run()

print(result["data"]["summary"])
```

You can combine `summary` with other output formats:

```python
robot = await scraper.create(
    "Blog Post Summarizer",
    "https://blog.example.com/post",
    formats=["markdown", "summary"],
)

result = await robot.run()

print(result["data"]["markdown"])  # Full page content
print(result["data"]["summary"])   # AI-generated summary
```

### Multiple Formats

You can request multiple formats from a single scrape robot:

```python
robot = await scraper.create(
    "Multi-Format Scraper",
    "https://example.com",
    formats=[
        "markdown",
        "html",
        "screenshot-visible",
    ],
)

result = await robot.run()

print(result["data"]["markdown"])
print(result["data"]["html"])
print(result["data"]["screenshots"])
```

This lets you retrieve different representations of the same page without creating separate robots.

## Smart Queries

Smart Queries let you attach a natural-language prompt to a scrape robot.

After the page is scraped, an LLM analyzes the page content and returns an answer to your prompt.

The answer is available as:

```python
result["data"]["promptResult"]
```

For example:

```python
robot = await scraper.create(
    "Pricing Scraper",
    "https://example.com/pricing",
    formats=["markdown"],
    smart_queries="List all plan names and their monthly prices.",
)

result = await robot.run()

print(result["data"]["markdown"])
print(result["data"]["promptResult"])
```

A Smart Query can be used to extract specific information:

```python
robot = await scraper.create(
    "Company Info",
    "https://example.com/about",
    formats=["markdown"],
    smart_queries="What is the company founding year and headquarters location?",
)

result = await robot.run()

print(result["data"]["promptResult"])
```

Or to summarize a page:

```python
robot = await scraper.create(
    "Blog Post Summarizer",
    "https://blog.example.com/post",
    formats=["markdown"],
    smart_queries="Summarize this article in 3 bullet points.",
)

result = await robot.run()

print(result["data"]["promptResult"])
```

## LLM Configuration

Smart Queries use an LLM to analyze the scraped content.

You can optionally specify the provider, model, API key, or base URL when creating the robot:

```python
robot = await scraper.create(
    "Pricing Scraper",
    "https://example.com/pricing",
    formats=["markdown"],
    smart_queries="List all plan names and their monthly prices.",
    llm_provider="anthropic",
    llm_model="claude-sonnet-4-5",
    llm_api_key="your-api-key",
)
```

The available LLM options depend on your Maxun setup.

## Monitoring

A scrape robot can optionally be configured for monitoring:

```python
robot = await scraper.create(
    "Monitored Page",
    "https://example.com",
    formats=["markdown"],
    monitor=True,
)
```

When enabled, Maxun compares results between runs. See [Robot Management](./sdk-robot) for scheduling and monitoring-related operations.

## Running a Scrape Robot

Call `run()` on the returned `Robot` instance to execute the robot:

```python
result = await robot.run()
```

The result contains the data produced by the requested output formats:

```python
print(result["data"])
```

### Run with Options

You can pass options to a run:

```python
result = await robot.run(
    {
        "timeout": 30000,
    }
)
```

See [Robot Management](./sdk-robot) for run options, scheduling, webhooks, and other robot operations.

## Using Scrape Robots in Applications

### RAG Pipeline

Scrape a page as Markdown and pass the content to your embedding or vector database pipeline:

```python
robot = await scraper.create(
    "RAG Content",
    "https://docs.example.com/guide",
    formats=["markdown"],
)

result = await robot.run()

markdown = result["data"]["markdown"]

# Send to your embedding service
create_embeddings(markdown)
```

### Content Aggregation

Create and run robots for multiple URLs:

```python
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

## Robot Management

`Scrape.create()` returns a `Robot` object. Use that object for operations on the robot:

```python
robot = await scraper.create(
    "Article Scraper",
    "https://example.com/article",
    formats=["markdown"],
)

# Run
result = await robot.run()

# Get robot data
data = robot.get_data()

# Delete
await robot.delete()

# Refresh robot data from Maxun
await robot.refresh()
```

For retrieving robots that were created previously, use the lower-level `Client`:

```python
from maxun import Client, Config

client = Client(
    Config(api_key="your-api-key")
)

# Get all robots
robots = await client.get_robots()

# Get a specific robot
robot_data = await client.get_robot("robot-id")

# Delete a robot by ID
await client.delete_robot("robot-id")
```

See [Robot Management](./sdk-robot) for the full `Robot` API, including runs, scheduling, webhooks, duplication, and monitoring.
