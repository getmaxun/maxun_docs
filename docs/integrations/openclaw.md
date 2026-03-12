---
id: openclaw
title: OpenClaw
sidebar_position: 9
description: List and run Maxun robots from any messaging app using the OpenClaw skill.
---

# OpenClaw

The Maxun skill for <a href="https://openclaw.ai" target="_blank">OpenClaw</a> lets you list, run, and retrieve results from your Maxun robots — through any messaging app connected to your OpenClaw gateway (WhatsApp, Telegram, Discord, and more).

The skill is published on <a href="https://clawhub.ai/RohitR311/maxun" target="_blank">ClawHub</a>, the OpenClaw skill registry.

---

## Prerequisites

- OpenClaw running (self-hosted gateway)
- A Maxun Cloud account at <a href="https://app.maxun.dev" target="_blank">app.maxun.dev</a>
- A Maxun API key (generated from **Settings → API Key** in your dashboard)
- The ClawHub CLI installed:

```bash
npm i -g clawhub
```

---

## Setup

### 1. Install the skill

```bash
clawhub install RohitR311/maxun
```

This downloads the skill into your `./skills` directory and records it in `.clawhub/lock.json`.

### 2. Configure your API key

Add your Maxun API key to `~/.openclaw/openclaw.json` under the skill's `env` block:

```json
{
  "skills": {
    "entries": {
      "maxun": {
        "enabled": true,
        "env": {
          "MAXUN_API_KEY": "your_api_key_here"
        }
      }
    }
  }
}
```

### 3. Restart the gateway

```bash
openclaw restart
```

The skill is loaded on restart and is immediately available from any connected app.

---

## Usage

Once installed, send a message from any connected app — OpenClaw automatically detects when your request involves Maxun robots and handles it. You can also invoke the skill directly with `/maxun`.

### Listing Robots

```
"What Maxun robots do I have?"
"Show me all my robots"
"List my scraping robots"
```

### Running a Robot

```
"Run my Amazon price scraper"
"Execute the product catalog robot"
"Run robot abc123 and show me the results"
```

:::tip
You don't need to know the robot ID. Describe it by name — the skill resolves it automatically before running.
:::

### Getting Results

```
"Show me the results from my last run"
"What did the price scraper extract yesterday?"
"Get the output from run xyz789"
```

---

## Common Workflows

### First Time

```
"What robots do I have?"       → lists all robots
"Tell me about the jobs robot" → shows details
"Run it"                       → executes and returns results
```

### Chained Requests

OpenClaw handles multi-step prompts in one message:

```
"List my robots, run the most recently created one, and summarize what it found"
```

---

## Model Recommendation

:::tip
For the best results, configure OpenClaw to use a capable model from providers like **Anthropic** or **OpenAI**. Weaker models may struggle to reliably trigger the skill, resolve robot names, or interpret extracted data correctly. A stronger model noticeably improves skill invocation accuracy and response quality.
:::

---

## Resources

- <a href="https://openclaw.ai" target="_blank">OpenClaw</a>
- <a href="https://clawhub.ai/RohitR311/maxun" target="_blank">Maxun skill on ClawHub</a>
- <a href="https://docs.openclaw.ai/tools/skills" target="_blank">OpenClaw Skills Documentation</a>
