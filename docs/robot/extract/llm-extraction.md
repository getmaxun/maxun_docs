---
id: llm-extraction
title: "AI Mode: Extract Web Data With Natural Language"
description: "Describe the data you want in plain English and AI Mode builds an Extract robot for that page. Self-hosted Maxun, with Anthropic, OpenAI or Ollama."
sidebar_label: "AI Mode"
sidebar_position: 2
---

# AI Mode

AI Mode builds an Extract robot from a web page and a description of the data you want. You enter a URL and a prompt such as "Extract the five men's basketball shoes with their names, prices, ratings and product URLs". Maxun works out which data on that page answers the prompt, turns it into an ordinary robot, and runs it.

The robot it saves works like one you built in Recorder Mode: it reads the page with selectors on every run, so runs are fast and don't call an LLM. You can schedule it, monitor it and use it from the API, SDK and CLI.

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

1. **Open the page.** The URL you entered is loaded once. A redirect to the same site is followed; a redirect to another site is refused with an explanation.
2. **Stay on the page.** From then on, any attempt to load a different page is blocked: link clicks, scripts that change the location, new tabs, client-side route changes. Changing only the `#fragment` is allowed.
3. **Reveal the content.** Cookie banners and modals are closed, the page is scrolled so lazy-loaded items appear, and collapsed sections (accordions, `<details>`) are opened. These are fixed steps; the model never decides what to click.
4. **Understand the request.** The prompt is turned into the fields to extract and, if you gave one, the number of items. This happens before the page structure is considered, so the robot extracts what you asked for, not just the biggest list on the page.
5. **Extract and build.** The model points to where each value appears on the page. Values that aren't on the page are dropped. The examples become selectors, which are checked by running the same scraper robots use.
6. **Save.** The robot loads only your URL.

### Pagination

AI Mode reads the page you entered. It reads further only when you ask for a specific number of items that the first page doesn't hold, for example "Extract 15 products" on a page that shows 12:

- If the page loads more items as you scroll, the robot scrolls.
- Otherwise the robot clicks the page's own *Next* or *Load more* control and stops at the number you asked for.

A *Next* link that leads to another site is never used. Without a number in the prompt, the robot reads the first page only.

### When the data isn't on the page

AI Mode never looks for the data elsewhere. If some requested fields aren't on the page, the robot is still created with the fields that are, and the missing fields are recorded with the robot. If none of the data is on the page, creation stops with an error such as:

```text
The requested data (Day, Hours) was not found on https://example.com/shoes.
AI Extract only reads this page and does not visit other pages; check that the
URL shows the data, or describe the data as it appears on the page.
```

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
