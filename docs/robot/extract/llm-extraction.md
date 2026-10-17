---
id: llm-extraction
title: "AI Mode: Cloud Agents and Open Source AI Extract"
description: "Describe the data you want in plain English and Maxun builds the extraction robot. Compare Maxun Cloud agents with AI Extract in the self-hosted open-source edition."
sidebar_label: "AI Mode"
sidebar_position: 2
---

# AI Mode

AI Mode builds an Extract robot from a description of the data you want. You write a prompt such as "Extract the five men's basketball shoes with their names, prices, ratings and product URLs", and Maxun works out which data on the page answers it, turns that into an ordinary robot, and runs it.

The robot it saves works like one you built in Recorder Mode: it reads the page with selectors on every run, so runs are fast and don't need an LLM. You can schedule it, monitor it and use it from the API, SDK and CLI.

AI Mode comes in two forms:

- **Agents** on [Maxun Cloud](https://app.maxun.dev): give a prompt, and optionally a URL. The agent can find the website itself, move to the right page on it, and apply the site's search, filters and sorting before it reads the data.
- **AI Extract** in the self-hosted open-source edition: give a URL and a prompt. AI Extract reads that page, and only that page, with the LLM you configure.

## Agent vs AI Extract

| | Cloud Agent | Open Source AI Extract |
| :-- | :-- | :-- |
| **Where** | Maxun Cloud | Self-hosted Maxun (Community Edition) |
| **Website URL** | Optional. Leave it out and the agent searches the web for the right site; a prompt that needs several sites gets one robot that reads each of them | Required. The URL you enter is the page that is read |
| **Pages it reads** | The starting page, or one link on the same site that leads to the data (e.g. *Pricing*, *All products*) when the starting page doesn't have it | Only the page you entered. It never opens other pages, links, sitemaps or canonical URLs |
| **Pagination** | Follows the site's pagination when the page doesn't hold enough items | Scrolls to load more on the same page. Uses the site's *Next* / *Load more* control only when you ask for a specific number of items that the first page doesn't have (e.g. "Extract 15 products" on a page of 12) |
| **Site search, filters and sorting** | Applied with the site's own controls ("under $50", "size M", "cheapest first", "yearly billing") and replayed on every run | Not applied. Point the URL at a page that already shows the view you want |
| **Pop-ups and hidden content** | Closes cookie banners and pop-ups with the least-consenting choice, waits for content to finish loading | Closes cookie banners and modals, scrolls the page and opens collapsed sections, all on the same page |
| **Detail pages** | [Deep Extraction](/deep-extraction): follows each item to its own page | Not available |
| **Answers questions** | Answers a question in the prompt ("which plans include SSO?") from each run's data | Extracts data only |
| **Result checks** | Checks the result against the request (count, fields, duplicates, price range, order) and marks the agent *ok*, *partial* or *failed* | Checks that the robot reproduces the extracted examples; reports requested fields the page doesn't have |
| **When the data isn't there** | Looks on the same site, then reports what it couldn't find | Stops with a clear error naming the fields it couldn't find on the page. It never looks elsewhere |
| **Adapts to site changes** | Yes, automatically | Retrain the robot yourself ([Retrain](/robot/extract/robot-retrain)) |
| **LLM** | Managed by Maxun; nothing to configure | Your own: Anthropic, OpenAI or an OpenAI-compatible server, or Ollama (local or Ollama Cloud) |
| **Pages behind a login** | Share a logged-in session with the managed Chrome extension. The agent never signs in on its own | Never signs in. Log in with Recorder Mode instead |

In short: an **agent** is for "get me this data", even when you don't know exactly where it lives. **AI Extract** is for "get me this data from this page", with the browser held to that page.

## Create a robot with AI Mode

1. Open **Robots → Create Robot → Extract** and switch to **AI Mode**.
2. **Website URL**: on Cloud, optional. In the open-source edition, required.
3. **Prompt**: describe the data, the fields you want and how many items. For example:
   - "Extract the first 20 product names and prices"
   - "Get company names, descriptions and batch"
   - "Extract article headlines, authors and publication dates"
4. **Model settings** (open-source edition only): choose the LLM provider and model. See [LLM providers](#llm-providers-open-source).
5. Click **Create and run**. Maxun builds the robot, runs it once and opens the results.

## How Cloud agents work

1. **Find the page.** With a URL, the agent starts there. Without one, it searches the web and picks the result that best matches the request. If the starting page doesn't hold the data, it follows the one link on the same site that most likely leads to it.
2. **Understand the request.** The prompt becomes a specification: the fields, how many items, any ranking ("cheapest", "newest"), filters, and a question to answer.
3. **Set up the page.** Pop-ups are closed, and the site's own search, filters and sort controls are applied. Each setting is kept only if the page actually changed, and is replayed on every run.
4. **Extract and build.** The model points to where each value appears on the page. Values that aren't on the page are dropped. The examples become selectors, which are checked by running the real scraper.
5. **Verify.** The robot's rows are checked against the request, and the agent is marked *ok*, *partial* (usable, with the gaps listed) or *failed*.
6. **Every run** reads the data with selectors. If the prompt asked a question, the run's answer is built from that run's rows only.

From the API, agents are created with `POST /api/v1/agents`. See [Cloud API → Agents](/api/cloud-api#agents).

## How AI Extract works (open source)

1. **Open the page.** The URL you entered is loaded once. A redirect to the same site is followed; a redirect to another site is refused with an explanation.
2. **Stay on the page.** From then on, any attempt to load a different page is blocked: link clicks, scripts that change the location, new tabs, client-side route changes. Changing only the `#fragment` is allowed.
3. **Reveal the content.** Cookie banners and modals are closed, the page is scrolled so lazy-loaded items appear, and collapsed sections (accordions, `<details>`) are opened. These are fixed steps; the model never decides what to click.
4. **Understand the request.** The prompt is turned into the fields to extract and, if you gave one, the number of items. This happens before the page structure is considered, so the robot extracts what you asked for, not just the biggest list on the page.
5. **Extract and build.** The model points to where each value appears on the page. Values that aren't on the page are dropped. The examples become selectors, which are checked by running the same scraper robots use.
6. **Save.** The robot loads only your URL. It only paginates when you asked for a specific number of items that the first page doesn't hold: then it scrolls (if the page loads more as you scroll), or clicks the page's own *Next* / *Load more* control and stops at that number. A *Next* link that leads to another site is never used.

If some requested fields aren't on the page, the robot is still created with the fields that are, and the missing fields are recorded with the robot. If none of the data is on the page, creation stops with an error such as:

```text
The requested data (Day, Hours) was not found on https://example.com/shoes.
AI Extract only reads this page and does not visit other pages; check that the
URL shows the data, or describe the data as it appears on the page.
```

## LLM providers (open source)

Cloud manages the model for you. In the self-hosted edition, choose a provider under **Model settings** when you create the robot, or pass it from the SDK, API or CLI.

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
- On Cloud: you don't know the exact page, or you need the site's search, filters or sorting applied first.

## When to use Recorder Mode instead

- You need to log in, fill in forms or click through several steps before the data appears.
- In the open-source edition: the data is spread across several pages that AI Extract won't visit, or needs filters or search applied on the site.
- You need exact control over every step of the robot.

## Using with the SDK

```javascript
const robot = await maxun.extract('YC companies', 'https://www.ycombinator.com/companies', {
  prompt: 'Extract the first 20 company names and descriptions',
});
const result = await robot.run();
```

On Cloud you can leave the URL out and the agent finds the site. In the self-hosted edition the URL is required, and you pass your LLM settings. See [Node.js Extract](/sdk/node-sdk/sdk-extract) and [Python Extract](/sdk/python-sdk/sdk-extract).

## Using with the CLI

```bash
maxun robots extract \
  -p "Extract all product names and prices" \
  -u "https://example.com/shop" \
  -n "Shop Extractor"
```

`-u` is optional on Cloud and required for self-hosted Maxun. See [CLI robots](/cli/cli-robots).

## Writing effective prompts

Name the fields you want and, if it matters, how many items. For more examples, see <a href="/llm-prompts">LLM Extraction Prompts</a>.
