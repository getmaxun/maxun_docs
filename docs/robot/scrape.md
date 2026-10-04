---
id: scrape
title: Scrape Any Website to Markdown, HTML & Screenshots
description: "Convert any webpage into clean HTML, LLM-ready Markdown, text, links, AI summaries or screenshots. Ask questions about a page with Smart Queries."
sidebar_label: Scrape
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Scrape

Convert any webpage into clean HTML, LLM-ready Markdown, text, links, AI summaries or screenshots. Ask questions about a page with Smart Queries.

## How It Works

1. Enter the URL you want to scrape.  
2. Choose your output format  
3. Optionally add a **Smart Query** prompt (see below).
4. Run the robot.  

## Output Formats

| Format |  What you get |
|---|---|
| `markdown`  | The page as clean Markdown, ready for an LLM |
| `html`  | The page's HTML |
| `text`  | The page's visible text |
| `links`  | Every link on the page |
| `summary` | An AI-written summary of the page |
| `screenshot-visible`  | A screenshot of the visible part of the page |
| `screenshot-fullpage`| A screenshot of the whole page |


## When to Use Scrape
- Fast content extraction  
- Clean HTML or Markdown for an LLM  

If you need logins, interactions, pagination, or element-level data capture, use <a href="/category/extract">Extract</a> instead.


## Smart Queries

Smart Queries let you attach an optional **natural language prompt** to a scrape robot. After the page is scraped, an LLM analyzes the page content and returns an answer to your prompt - without any extra setup.

### How to Add a Smart Query

When creating a scrape robot, enter your instructions in the **Smart Queries** field:

1. Example: "Click the 'Login' button and extract the user profile data."  
2. Example: "Navigate to the pricing page and list all plan names and prices."  
3. Example: "Find the company's latest blog post title and publication date."

The result is returned in the run output as `promptResult`.

### Output

When a Smart Query is configured, the run result includes an additional `promptResult` field alongside the usual `markdown`, `html`, etc.:

```json
{
  "markdown": "...",
  "html": "...",
  "promptResult": "The pricing plans are: Starter ($9/mo), Growth ($29/mo), Pro ($99/mo)."
}
```

## Using with SDK

Scrape is available through the <a href="/category/sdk">Maxun SDK</a> for programmatic usage and integration into your applications.

<Tabs>
  <TabItem value="node" label="Node.js">

```javascript
import { Maxun } from 'maxun-sdk';

const maxun = new Maxun();

const robot = await maxun.scrape('Example page', 'https://example.com');
const result = await robot.run();

console.log(result.markdown);
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from maxun import Maxun

async with Maxun() as maxun:
    robot = await maxun.scrape("Example page", "https://example.com")
    result = await robot.run()
    print(result.markdown)
```

  </TabItem>
</Tabs>

## Using with CLI

Scrape is available through the <a href="/category/cli">Maxun CLI</a> for quick data gathering from the terminal.

```bash
maxun robots scrape https://example.com -f markdown
```
