---
id: llm-ready-docs
title: "LLM-Ready Docs: llms.txt, Markdown Pages & Copy for AI"
description: "Every Maxun docs page is available as Markdown for LLMs and AI agents. Use llms.txt, llms-full.txt, .md page URLs or open any page in ChatGPT or Claude."
sidebar_label: "LLM-Ready Docs"
sidebar_position: 3
slug: /ai/llm-ready-docs
---

# LLM-Ready Docs

The Maxun docs are written for people and for AI. Give them to ChatGPT, Claude, Cursor or your own agent so it answers questions and writes Maxun code from the current docs.

## llms.txt

[`https://docs.maxun.dev/llms.txt`](https://docs.maxun.dev/llms.txt) follows the [llms.txt standard](https://llmstxt.org). It is a short, curated guide to Maxun: the core concepts, which robot to use for which job, the options of every robot type, SDK, CLI, MCP and API usage, and links to every page.

Start here when an agent needs to understand Maxun quickly.

## llms-full.txt

[`https://docs.maxun.dev/llms-full.txt`](https://docs.maxun.dev/llms-full.txt) contains every docs page in one Markdown file. Each page is wrapped in a `<page url="..." title="...">` tag so the agent knows where each part came from.

Use it when you want to load all the docs into a model's context or index them for retrieval (RAG).

## Any page as Markdown

Add `.md` to the URL of any page to get its Markdown:

| Page | Markdown |
|---|---|
| `https://docs.maxun.dev/quickstart` | [`https://docs.maxun.dev/quickstart.md`](https://docs.maxun.dev/quickstart.md) |
| `https://docs.maxun.dev/mcp/setup` | [`https://docs.maxun.dev/mcp/setup.md`](https://docs.maxun.dev/mcp/setup.md) |
| `https://docs.maxun.dev/` | [`https://docs.maxun.dev/index.md`](https://docs.maxun.dev/index.md) |

Markdown has no navigation, scripts or styling, so it takes far fewer tokens than the HTML page.

## Copy page

Every page has a **Copy page** menu in the top right:

- **Copy page as Markdown**: copies the page so you can paste it into any chat.
- **View page as Markdown**: opens the raw Markdown.
- **Open in ChatGPT** / **Open in Claude**: starts a new chat that reads the page.

## Use the docs in your coding agent

Add this to your project's `AGENTS.md`, `CLAUDE.md` or `.cursor/rules` so your agent always checks the docs before writing Maxun code:

```markdown
## Maxun
This project uses Maxun for web scraping and data extraction.
Before writing Maxun code, read https://docs.maxun.dev/llms.txt.
Fetch any docs page as Markdown by adding .md to its URL.
Read the API key from the MAXUN_API_KEY environment variable.
```

To give your agent Maxun's tools as well as its docs, see [Add Maxun to your agent](/ai/add-to-agent).
