---
id: agent-vs-ai-mode
title: "Agent vs AI Mode: Building Robots From a Prompt"
description: "Compare Maxun Cloud agents with AI Mode in the self-hosted open-source edition: URLs, navigation, pagination, filters, LLMs and result checks."
sidebar_label: "Agent vs AI Mode"
sidebar_position: 3
---

# Agent vs AI Mode

Maxun offers two ways to use natural language to extract data from websites.

- **[Agent](/robot/agent)** on Maxun Cloud: describe the data you want, optionally provide a URL, and let the agent discover where the data lives and how to extract it.
- **[AI Mode](/robot/extract/llm-extraction)** in the self-hosted open-source edition: provide a URL and describe the data you want to extract from that specific page.

Both create reusable robots that can be run repeatedly without making LLM calls on every run. You can schedule, monitor, and use them through the API, SDK, MCP and CLI.

## Two different approaches: autonomous discovery vs. page-specific extraction

**Agent is designed for autonomous discovery.** You describe the outcome you want, not necessarily where to find it. The agent can search the web, identify relevant pages, follow links, apply a website's search, filters and sorting, and determine how to collect the requested data. It handles the discovery and setup, then saves a reusable robot for subsequent runs.

**AI Mode is designed for focused extraction.** You provide the exact page containing your data and describe what you need in natural language. Maxun builds a robot to extract the requested information from that page. It doesn't independently search the web or navigate to other pages to find missing data.

The distinction is simple: **Agent figures out where and how to get the data; AI Mode extracts the data from the page you specify.**

## At a glance

| Capability | Agent | AI Mode |
|---|---|---|
| **Available on** | Maxun Cloud | Self-hosted open source |
| **Website URL** | Optional. Searches the web when no URL is provided | Required. You specify the page to extract from |
| **Page discovery** | Discovers relevant pages and can follow links to locate the data | No autonomous discovery; reads only the specified page |
| **Multiple websites** | Can collect data across multiple sites in one prompt | Limited to the specified page |
| **Pagination** | Follows pagination to collect the requested items | Can scroll or use the page's own Next / Load more controls when you request more items than initially available |
| **Site search, filters and sorting** | Can apply the website's own controls and replay them on subsequent runs | Not applied automatically. Provide a URL that already displays the view you need |
| **Detail pages** | Supports [Deep Extraction](/deep-extraction) to follow individual items to their detail pages | Does not navigate to detail pages |
| **Questions in the prompt** | Can answer questions using the data collected during the run, such as “Which plans include SSO?” | Extracts the requested data; doesn't answer additional questions about it |
| **Result validation** | Checks results against the request, including fields, item counts, duplicates, links and applicable constraints | Checks the extraction against the specified page; unavailable fields are reported |
| **When data is missing** | Can search for other relevant pages and reports anything it couldn't find | Reports missing data or stops with an error; doesn't look elsewhere |
| **Website layout changes** | Maxun Cloud can automatically adapt the robot | Not supported automatically. Create a new AI Mode robot |
| **LLM configuration** | Managed by Maxun | Configure your own supported provider, including Anthropic, OpenAI, OpenAI-compatible servers, or Ollama |

## Which one should you use?

**Use Agent** when you know what data you want but don't know exactly where it lives, or when finding the right page and applying website controls are part of the task.

Examples:
- “Find the 5 cheapest 4K monitors on this store.”
- “Find Acme's pricing plans and identify which ones include SSO.”
- “Collect the latest remote backend jobs from these websites.”

**Use AI Mode** when you know the page containing the data and want to describe the extraction in natural language.

Examples:
- “Extract the product names, prices and ratings from this category page.”
- “Extract the pricing tiers and included features from this pricing page.”
- “Extract the names and contact details listed in this directory.”

For workflows that require logging in, filling forms or clicking through multiple steps before the data appears, use [Recorder Mode](/robot/extract/robot-actions).

## Example

Prompt: *“Extract 15 products with their name, price and ID.”*

- **Agent:** Without a URL, it searches for the relevant store, locates a product listing, and collects 15 products, following pagination when needed. It then checks the results against the request.
- **AI Mode:** Given `https://example.com/products`, it extracts products from that page. If only 12 are initially visible, it can use the page's pagination or load-more controls to retrieve the remaining items. If the requested data isn't available, it reports the problem rather than searching elsewhere.

See also: [Cloud vs Open Source](/cloud-vs-oss).