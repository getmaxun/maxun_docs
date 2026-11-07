---
id: build-with-ai
title: "Build With AI: Maxun for AI Agents & LLM Apps"
description: "Give AI agents live web data with Maxun. Connect the MCP server, install agent skills, feed your coding agent the docs, or use the SDK in LangChain, LlamaIndex and more."
sidebar_label: "Build with AI"
sidebar_position: 1
slug: /ai
---
import PromptCard from '@site/src/components/PromptCard';

# Build With AI

Maxun gives AI agents and LLM apps clean, live web data. Agents can scrape a page into Markdown, crawl a site, search the web, or describe the data they need and let Maxun extract it, then run the same robot again whenever they need fresh data.

There are four ways to use Maxun with AI:

| | What it is | Best for |
|---|---|---|
| **[MCP server](/mcp/setup)** | Maxun's tools inside any MCP client | Claude, Cursor, Windsurf, VS Code, Codex and other agents that need web data while they work |
| **[Agent skills](/integrations/claude-code)** | Ready-made skills that run your Maxun robots | Claude Code and OpenClaw users who already have robots |
| **[LLM-ready docs](/ai/llm-ready-docs)** | `llms.txt`, `llms-full.txt` and every page as Markdown | Coding agents that write Maxun code for you |
| **[AI frameworks](#ai-frameworks)** | The Maxun SDK as a tool or loader in your framework | LangChain, LangGraph, LlamaIndex, Mastra, OpenAI and Vercel AI SDK apps |

## Quick start: let your agent set it up

Copy this prompt into Claude Code, Cursor, Codex or any coding agent. It reads the docs and adds Maxun to your project.

<PromptCard title="Add Maxun to my project">{`Add Maxun (https://maxun.dev) to this project so it can scrape, crawl, search and extract web data.

1. Read https://docs.maxun.dev/llms.txt to learn how Maxun works. Fetch any page as Markdown by adding .md to its URL.
2. Pick the official SDK for this project's language: maxun-sdk for Node.js/TypeScript, or maxun for Python.
3. Install it and read the API key from the MAXUN_API_KEY environment variable. Never hard-code the key. If .env.example exists, add MAXUN_API_KEY to it.
4. Add a small example that scrapes https://maxun.dev into Markdown and prints the result.
5. Tell me where to get an API key: https://app.maxun.dev, under Settings → API Key.`}</PromptCard>

To give your agent Maxun's tools directly, follow [Add Maxun to your agent](/ai/add-to-agent).

## Connect your agent with MCP

The [Maxun MCP server](/mcp/setup) works with any MCP client. On Maxun Cloud it is one URL and an API key:

```text
URL:     https://app.maxun.dev/api/mcp
Header:  x-api-key: <your-api-key>
```

For example, in Claude Code:

```bash
claude mcp add --transport http maxun https://app.maxun.dev/api/mcp --header "x-api-key: your_api_key_here"
```

Your agent then gets these [tools](/mcp/tools):

| Tool | What it does |
|---|---|
| `maxun_scrape` | Turn a page into Markdown, HTML, text, links, a summary or screenshots, and answer questions about it |
| `maxun_crawl` | Crawl a website and return the content of every page |
| `maxun_search` | Search the web and optionally scrape each result |
| `maxun_agent` | Describe the data you want and let Maxun's AI build and run an extraction robot |
| `maxun_list_robots`, `maxun_run_robot`, ... | Run and inspect the robots you already have |

See [Add Maxun to your agent](/ai/add-to-agent) for Cursor, VS Code, Windsurf, Claude Desktop, Codex and Gemini CLI.

## AI frameworks

Use the Maxun SDK as a tool or document loader in your framework of choice:

| Framework | Guide |
|---|---|
| LangChain | [LangChain](/integrations/langchain) |
| LangGraph | [LangGraph](/integrations/langgraph) |
| LlamaIndex | [LlamaIndex](/integrations/llamaindex) |
| Mastra | [Mastra](/integrations/mastra) |
| OpenAI SDK (function calling) | [OpenAI](/integrations/openai) |
| Vercel AI SDK | [Vercel AI SDK](/integrations/vercel-ai-sdk) |

## Writing prompts for extraction

[AI mode](/robot/extract/llm-extraction), the `maxun_agent` tool and the SDK's `extract()` all take a plain-English description of the data you want. See [How to write prompts](/llm-prompts) for examples that work well.
