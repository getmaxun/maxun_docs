---
title: "Maxun Quickstart: Cloud, SDK & Open-Source Setup"
description: "Get started with Maxun in minutes. Sign up for Maxun Cloud, install the Node.js or Python SDK, connect your AI agent with MCP, or self-host the open-source edition with Docker."
sidebar_label: "Get Started"
sidebar_position: 2
slug: /quickstart
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Started

Get started with Maxun in minutes. Sign up for Maxun Cloud, install the Node.js or Python SDK, connect your AI agent with MCP, or self-host the open-source edition with Docker.

## Maxun Cloud

- Sign up at <a href="https://app.maxun.dev/register">https://app.maxun.dev/register</a>.
- Set up your data extraction robot. <a href="/robot/robots">Choose your robot type</a>.
- Name your robot and set it to run regularly, like daily.

That’s it! Most users create their first robot in less than a minute.

## Maxun SDKs

Maxun provides official **Node.js and Python SDKs** for creating and running robots programmatically. 

### Installation

<Tabs>
  <TabItem value="node" label="Node.js">

```bash
npm install maxun-sdk
```

  </TabItem>
  <TabItem value="python" label="Python">

```bash
pip install maxun
```

  </TabItem>
</Tabs>

### Requirements

- API Key from <a href="/api/api">Maxun Dashboard</a>

### Environment Variables

```bash
MAXUN_API_KEY=your-api-key

# For LLM Extraction (optional)
ANTHROPIC_API_KEY=your-anthropic-key
OPENAI_API_KEY=your-openai-key
```

### Quick Start

Create and run a robot programmatically using the Maxun SDK.

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

For more detailed usage, see the [Node.js SDK](/sdk/node-sdk/sdk-overview) and [Python SDK](/sdk/python-sdk/sdk-overview) guides.

## Maxun MCP Server

Connect Claude, Cursor, VS Code, Windsurf, Codex or any other MCP client to Maxun. Your agent can then scrape, crawl, search and extract web data, and run your robots, through natural language.

1. Get an API key from the <a href="/api/api">Maxun Dashboard</a> under **Settings → API Key**.
2. Add the Maxun MCP server to your client:

<Tabs groupId="mcp-client">
  <TabItem value="claude-code" label="Claude Code">

```bash
claude mcp add --transport http maxun https://app.maxun.dev/api/mcp --header "x-api-key: your_api_key_here"
```

  </TabItem>
  <TabItem value="json" label="Cursor and other clients">

```json
{
  "mcpServers": {
    "maxun": {
      "url": "https://app.maxun.dev/api/mcp",
      "headers": {
        "x-api-key": "your_api_key_here"
      }
    }
  }
}
```

  </TabItem>
</Tabs>

3. Ask your agent something like *"Scrape https://example.com and summarize it"*.

For other clients, see [Add Maxun to your agent](/ai/add-to-agent). For self-hosted Maxun and the full list of tools, see [MCP Setup](/mcp/setup) and [MCP Tools](/mcp/tools).

## Maxun Community Edition
Maxun is open-source and can run on your own infrastructure. Learn how to <a href="/category/self-host">self-host Maxun</a> with Docker Compose or a local setup.
