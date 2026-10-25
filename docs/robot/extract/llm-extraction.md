---
id: llm-extraction
title: "AI Mode: Extract Web Data With Natural Language"
description: "Describe the data you want in plain English and AI Mode builds an Extract robot for that page. Self-hosted Maxun, with Anthropic, OpenAI or Ollama."
sidebar_label: "AI Mode"
sidebar_position: 2
---

# AI Mode

AI Mode turns a web page and a simple description of the data you need into a reusable data extraction robot. Just enter a URL and a prompt, such as *“Extract the five men's basketball shoes with their names, prices, ratings, and product URLs.”* Maxun figures out how to extract the requested data and builds a robot that can run repeatedly.

**LLM calls are only needed when creating the robot, not on every run.** Once created, the robot can extract data from the page efficiently without recurring AI costs. You can schedule runs, monitor changes, and use your robots through the API, SDK, and CLI.

AI Mode is part of the self-hosted open-source edition and uses the LLM you configure. On Maxun Cloud, robots built from a prompt are [Agents](/robot/agent). See [Agent vs AI Mode](/robot/agent-vs-ai-mode) for how they differ.

## Create a robot with AI Mode

1. Open **Robots → Create Robot → Extract** and switch to **AI Mode**.
2. **Website URL** (required): the page that holds the data. AI Mode reads this page only.
3. **Prompt**: describe the data, the fields you want and, if it matters, how many items. For example:
   - "Extract the first 20 product names and prices"
   - "Get company names, descriptions and batch"
   - "Extract article headlines, authors and publication dates"
4. **Model settings**: choose the LLM provider and model. See [LLM providers](#llm-providers).
5. Click **Create and run**. Maxun builds the robot, runs it once and opens the results.

## How it works

AI Mode turns a URL and a natural-language description of the data you need into a reusable data extraction robot.

1. **Specify the page and the data.** Enter the URL of the page containing your data and describe what you want to extract, including specific fields or a desired number of items.

2. **Understand your request.** Maxun interprets your instructions to identify the information you need, rather than simply extracting the largest list or collection on the page.

3. **Extract the data.** Maxun identifies the requested information on the specified page and builds a robot to extract it. It can reveal content hidden behind cookie banners, modals, accordions, or lazy loading. If you request more items than are initially visible, it can use the page's own pagination or load-more controls to retrieve them.

4. **Validate and save the robot.** Maxun checks the extraction and saves a reusable robot that can run against your specified URL. If some requested fields aren't available, the robot records what's missing. If the requested data cannot be found, creation stops with an explanation.

5. **Run it whenever you need.** Once created, the robot can be run repeatedly without making LLM calls on every run. Schedule it, monitor extraction results, or integrate it through the API, SDK, and CLI.

### Designed for reliable extraction, not autonomous browsing

AI Mode is built to create focused data extraction robots, not autonomous agents that explore the web to complete open-ended tasks.

- **Page-specific:** Extracts data from the URL you provide, rather than searching other websites for missing information.
- **Predictable:** Stays within the specified page and its permitted interactions. It doesn't independently browse elsewhere or follow unrelated links.
- **Intent-driven:** Extracts the fields and items you describe, rather than guessing what data might be useful.
- **Reusable and cost-efficient:** AI helps build the robot; subsequent runs reuse it without recurring LLM calls for extraction.

If the information isn't available on the specified page, Maxun tells you instead of silently searching elsewhere or inventing missing values.


## LLM providers

Choose a provider under **Model settings** when you create the robot, or pass it from the SDK, API or CLI.

| Provider | API key | Default model | Notes |
| :-- | :-- | :-- | :-- |
| **Anthropic** | Required: in Model settings or `ANTHROPIC_API_KEY` | `claude-sonnet-5` | Get a key from the <a href="https://console.anthropic.com/">Anthropic Console</a> |
| **OpenAI / OpenAI-compatible** | Required: in Model settings or `OPENAI_API_KEY` | `gpt-5.6-terra` | Set a base URL to use any OpenAI-compatible server |
| **Ollama** | Not needed locally. Ollama Cloud: `OLLAMA_API_KEY` | `llama3.2` | Pull the model first (`ollama pull llama3.2`), or set another one |

Choosing a model in Model settings overrides the default. Any model that follows instructions and returns JSON reliably works; larger models give better results on complex pages.

### Ollama

- **Local**: Maxun connects to `http://localhost:11434`. If Maxun runs in Docker and Ollama runs on your machine, set `OLLAMA_BASE_URL=http://host.docker.internal:11434`.
- **Ollama Cloud**: set the base URL, your API key, and a model that Ollama Cloud serves:

```bash
OLLAMA_BASE_URL=https://ollama.com
OLLAMA_API_KEY=your-ollama-api-key
OLLAMA_MODEL=gpt-oss:20b
```

If the model doesn't exist on the server, robot creation fails with Ollama's own message (for example `model 'llama3.2' not found`) and what to check.

See <a href="/installation/environment_variables">Environment Variables</a> for all settings.

## When to use AI Mode

- You want data from a page without learning the Recorder.
- The data is a list (products, jobs, articles, listings) or a few values on a page (a price, an address, a date).
- You know the page that shows the data.

## When to use Recorder Mode instead

- You need to log in, fill in forms or click through several steps before the data appears.
- The data is spread across several pages, or needs the site's search, filters or sorting applied first.
- You need exact control over every step of the robot.

## Using with the SDK

```javascript
const robot = await maxun.extract('YC companies', 'https://www.ycombinator.com/companies', {
  prompt: 'Extract the first 20 company names and descriptions',
  llmProvider: 'anthropic',
  llmApiKey: 'your-llm-api-key',
});
const result = await robot.run();
```

The URL is required. See [Node.js Extract](/sdk/node-sdk/sdk-extract) and [Python Extract](/sdk/python-sdk/sdk-extract).

## Using with the CLI

```bash
maxun robots extract \
  -p "Extract all product names and prices" \
  -u "https://example.com/shop" \
  -n "Shop Extractor"
```

See [CLI robots](/cli/cli-robots).

## Writing effective prompts

Name the fields you want and, if it matters, how many items. For more examples, see <a href="/llm-prompts">LLM Extraction Prompts</a>.
