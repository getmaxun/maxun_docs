---
sidebar_position: 2
slug: /quickstart
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Started

### Maxun Cloud

- Sign up at <a href="https://app.maxun.dev/register">https://app.maxun.dev/register</a>.
- Set up your data extraction robot. <a href="/robots">Choose your robot type</a>.
- Name your robot and set it to run regularly, like daily.

That’s it! Most users create their first robot in less than a minute.

### Maxun SDKs

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
import { Extract } from 'maxun-sdk';

const extractor = new Extract({
  apiKey: process.env.MAXUN_API_KEY,
});

const robot = await extractor
  .create('My Extractor')
  .navigate('https://example.com')
  .capture_text({
    title: 'h1',
  });

const result = await robot.run();

console.log(result.data);
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
# Python example coming soon
```

  </TabItem>
</Tabs>

For more detailed usage, see the **[Node.js SDK](/category/node-sdk)** and **[Python SDK](/category/python-sdk)** guides.

Learn how to use the SDK in detail <a href="/category/sdk">here</a>.

### Maxun Community Edition
Maxun is open-source and can run on your system. Learn how to <a href="/category/self-host">setup Maxun locally</a>.