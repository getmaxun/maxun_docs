---
id: agent-vs-ai-mode
title: "Agent vs AI Mode: Building Robots From a Prompt"
description: "Compare Maxun Cloud agents with AI Mode in the self-hosted open-source edition: URLs, navigation, pagination, filters, LLMs and result checks."
sidebar_label: "Agent vs AI Mode"
sidebar_position: 3
---

# Agent vs AI Mode

Maxun can build an Extract robot from a description of the data you want, in two ways:

- **[Agent](/robot/agent)** on Maxun Cloud: give a prompt, and optionally a URL. The agent finds the page that holds the data, applies the site's search, filters and sorting, and checks its result.
- **[AI Mode](/robot/extract/llm-extraction)** in the self-hosted open-source edition: give a URL and a prompt. AI Mode extracts from that page, and only that page, with the LLM you configure.

Both save an ordinary robot that reads the data with selectors on every run, and both can be scheduled, monitored and used from the API, SDK and CLI.

## At a glance

| | Agent | AI Mode |
| :-- | :-- | :-- |
| **Available on** | Maxun Cloud | Self-hosted open source |
| **Website URL** | Optional. Without one, the agent searches the web for the right site | Required. The URL you enter is the page that is read |
| **Pages it reads** | The starting page, or one link on the same site that leads to the data (e.g. *Pricing*, *All products*) | Only the page you entered. It never opens other pages, links, sitemaps or canonical URLs |
| **Several sites in one prompt** | Yes: one robot reads each site | No |
| **Pagination** | Follows the site's pagination when the page doesn't hold enough items | Only when you ask for a specific number of items that the first page doesn't hold: scrolls, or clicks the page's own *Next* / *Load more* and stops at that number |
| **Site search, filters and sorting** | Applied with the site's own controls and replayed on every run | Not applied. Point the URL at a page that already shows the view you want |
| **Pop-ups and hidden content** | Waits for content to load; closes cookie banners and pop-ups with the least-consenting choice | Closes cookie banners and modals, scrolls the page and opens collapsed sections, all on the same page |
| **Detail pages** | [Deep Extraction](/deep-extraction): follows each item to its own page | No |
| **Questions in the prompt** | Answered from each run's data ("which plans include SSO?") | Not answered; AI Mode extracts data |
| **Result checks** | Count, fields, duplicates, links, price range and order; marked *ok*, *partial* or *failed* | The robot must reproduce the extracted examples; requested fields the page doesn't have are recorded |
| **When the data isn't there** | Looks on the same site, then reports what it couldn't find | Stops with an error naming what wasn't found on the page. It never looks elsewhere |
| **Site layout changes** | Adapts automatically | [Retrain](/robot/extract/robot-retrain) the robot |
| **Pages behind a login** | Share a session with the managed Chrome extension | Log in with [Recorder Mode](/robot/extract/robot-actions) |
| **LLM** | Managed by Maxun; nothing to configure | Your own: Anthropic, OpenAI or an OpenAI-compatible server, or Ollama (local or Ollama Cloud) |

## Which one to use

**Use an agent** when you know what data you want but not exactly where it lives, or when the site's search, filters or sorting need to be applied first. For example: "the 5 cheapest 4K monitors on this store", or "pricing plans for Acme" without a URL.

**Use AI Mode** when you run Maxun yourself and know the page that shows the data. For example: a category page, a directory or a pricing page. AI Mode keeps the browser on that page, so it never wanders to other parts of the site.

**Use [Recorder Mode](/robot/extract/robot-actions)** in either edition when you need to log in, fill in forms or click through several steps before the data appears.

## Example

Prompt: *"Extract 15 products with their name, price and id"*

- **Agent**, without a URL: searches for the store, opens its product listing, reads 15 products and follows the store's pagination if the first page shows fewer. The robot is checked for 15 distinct items with every field filled.
- **AI Mode**, with `https://example.com/products`: reads that page. If it shows 12 products, the robot clicks the page's *Next* control and stops at 15. If the page has no products, creation stops with an error instead of looking elsewhere.

See also: [Cloud vs Open Source](/cloud-vs-oss).
