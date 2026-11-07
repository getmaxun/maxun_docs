---
id: sdks
title: "Maxun SDKs & CLI: Node.js, Python and Terminal"
description: "Add web scraping, crawling, search and data extraction to your app with the Maxun Node.js and Python SDKs, or run robots from your terminal with the Maxun CLI."
sidebar_label: "Overview"
slug: /sdks
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SDKs & CLI

Use Maxun from your own code or terminal. The SDKs and CLI create **robots** (saved, reusable jobs) on your Maxun account, so anything you create in code also shows up in the dashboard, and the other way round.

| | Install | Guide |
|---|---|---|
| **Node.js / TypeScript** | `npm install maxun-sdk` | [Node SDK](/sdk/node-sdk/sdk-overview) |
| **Python** | `pip install maxun` | [Python SDK](/sdk/python-sdk/sdk-overview) |
| **CLI** | `npm install -g maxun-cli` | [CLI](/cli/cli-overview) |

All of them work with Maxun Cloud and self-hosted Maxun. Get an API key from the dashboard under **Settings → API Key** (see [API Key](/api/api)).

## Quick example

<Tabs groupId="sdk-language">
<TabItem value="node" label="Node.js" default>

```javascript
import { Maxun } from 'maxun-sdk';

const maxun = new Maxun({ apiKey: process.env.MAXUN_API_KEY });

const robot = await maxun.scrape('Maxun home', 'https://maxun.dev', { formats: ['markdown'] });
const result = await robot.run();

console.log(result.markdown);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import asyncio
import os
from maxun import Maxun

async def main():
    async with Maxun(api_key=os.environ["MAXUN_API_KEY"]) as maxun:
        robot = await maxun.scrape("Maxun home", "https://maxun.dev", formats=["markdown"])
        result = await robot.run()
        print(result.markdown)

asyncio.run(main())
```

</TabItem>
<TabItem value="cli" label="CLI">

```bash
maxun login --api-key <your-api-key>
maxun --help
```

See [CLI Robots](/cli/cli-robots) to create robots from the terminal.

</TabItem>
</Tabs>

## What you can build

| Method | What the robot does |
|---|---|
| `scrape` | Turns a page into Markdown, HTML, text, links, a summary or screenshots |
| `extract` | Extracts structured data, described in plain English or with selectors |
| `crawl` | Visits many pages of a website |
| `search` | Searches the web and optionally scrapes the results |
| `documents.extract` / `documents.parse` | Extracts data from or converts a PDF, DOCX, XLSX, CSV, JPG or PNG |

Prefer plain HTTP? See the [API Reference](/api/api). Using an AI agent? See [Build with AI](/ai).
