---
id: sdk-scrape
title: "Python: Scrape Websites to Markdown & HTML"
description: "Scrape any webpage to Markdown, HTML, text, links, screenshots or AI summaries with the Maxun Python SDK."
sidebar_label: "Scrape"
sidebar_position: 2
---

# Scrape

A scrape robot turns a web page into clean Markdown, HTML, plain text, a list of links, an AI summary or screenshots.

```python
from maxun import Maxun

async with Maxun() as maxun:
    robot = await maxun.scrape("Example page", "https://example.com")
    result = await robot.run()
    print(result.markdown)
```

`maxun.scrape(name, url)` saves the robot on your account. Run it again any time with `await robot.run()`.

## Output formats

Choose what you want back with `formats`. The default is `["markdown"]`.

| Format | Read it from | What you get |
|---|---|---|
| `markdown` | `result.markdown` | The page as clean Markdown, ready for an LLM |
| `html` | `result.html` | The page's HTML |
| `text` | `result.text` | The page's visible text |
| `links` | `result.links` | Every link on the page |
| `summary` | `result.summary` | An AI-written summary of the page |
| `screenshot-visible` | `result.screenshots` | A screenshot of the visible part of the page |
| `screenshot-fullpage` | `result.screenshots` | A screenshot of the whole page |

Ask for as many formats as you need in one robot:

```python
robot = await maxun.scrape(
    "Pricing page",
    "https://example.com/pricing",
    formats=["markdown", "links", "screenshot-fullpage"],
)

result = await robot.run()

print(result.markdown)
print(result.links)
print(result.screenshots)
```

### Summary

`summary` adds a short AI-written summary next to the other formats:

```python
robot = await maxun.scrape(
    "Blog post",
    "https://blog.example.com/post",
    formats=["markdown", "summary"],
)

result = await robot.run()
print(result.summary)
```

## Smart Queries

A Smart Query is a question about the page. Maxun scrapes the page, then an LLM answers your question on every run.

```python
robot = await maxun.scrape(
    "Pricing plans",
    "https://example.com/pricing",
    smart_queries="List every plan with its monthly price.",
)

result = await robot.run()
print(result.smart_query_result)
```

You can also ask a different question for a single run, without changing the robot:

```python
result = await robot.run(smart_queries="Which plan includes SSO?")
print(result.smart_query_result)
```

:::note
`summary` and Smart Queries use an LLM. On Maxun Cloud this is handled for you. On self-hosted Maxun, add the [LLM settings](#llm-settings-self-hosted) below.
:::

## Options

| Option | Default | Description |
|---|---|---|
| `formats` | `["markdown"]` | Output formats (see above) |
| `smart_queries` | none | A question an LLM answers about the page on every run |
| `monitor` | `False` | Compare every run with the previous one. See [Monitoring](./sdk-monitoring) |
| `llm_provider`, `llm_model`, `llm_api_key`, `llm_base_url` | none | Self-hosted Maxun only, see below |

## Running a scrape robot

```python
result = await robot.run()
```

`run()` waits until the page is scraped and returns the result. You can change the formats for a single run:

```python
result = await robot.run(formats=["html"])
print(result.html)
```

If the run fails, `run()` raises `RunFailedError`. See [Robot Management](./sdk-robot) for run history, schedules and webhooks.

## LLM settings (self-hosted)

Self-hosted Maxun has no built-in LLM, so `summary` and Smart Queries need one:

```python
robot = await maxun.scrape(
    "Pricing plans",
    "https://example.com/pricing",
    smart_queries="List every plan with its monthly price.",
    llm_provider="anthropic",        # "anthropic", "openai" or "ollama"
    llm_api_key="your-llm-api-key",  # required for anthropic and openai
    llm_model="claude-sonnet-4-5",   # optional
)
```

:::caution
Do not pass `llm_*` options on Maxun Cloud. Cloud manages the model for you and rejects them.
:::

## Examples

### Feed a RAG pipeline

```python
robot = await maxun.scrape("Docs guide", "https://docs.example.com/guide")
result = await robot.run()

create_embeddings(result.markdown)
```

### Scrape several pages

Give each robot its own name:

```python
pages = {
    "Post: Launch week": "https://blog.example.com/launch-week",
    "Post: Pricing update": "https://blog.example.com/pricing-update",
}

for name, url in pages.items():
    robot = await maxun.scrape(name, url)
    result = await robot.run()
    save_to_database(url, result.markdown)
```

### Use an existing robot

```python
robot = await maxun.robots.find("Pricing plans")   # by name
result = await robot.run()
```

List your scrape robots with `await maxun.scrape.list()`. See [Robot Management](./sdk-robot) for everything else you can do with a robot.