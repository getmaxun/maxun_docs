---
sidebar_position: 2
slug: /quickstart
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Started

Get started with Maxun in minutes. There are three ways to use Maxun. Pick Cloud for the fastest start, the SDK to build robots in code, or the Community Edition to self-host.

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

## Maxun Community Edition
Maxun is open-source and can run on your system. Learn how to <a href="/category/self-host">setup Maxun locally</a>.