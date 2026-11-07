---
id: add-to-agent
title: "Add Maxun to Your AI Agent: Claude, Cursor, Codex & More"
description: "Connect Maxun to Claude Code, Cursor, VS Code, Windsurf, Claude Desktop, Codex or Gemini CLI with the MCP server, or install the Maxun skill for Claude Code and OpenClaw."
sidebar_label: "Add Maxun to Your Agent"
sidebar_position: 2
slug: /ai/add-to-agent
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PromptCard from '@site/src/components/PromptCard';

# Add Maxun to Your Agent

Give your AI agent the ability to scrape, crawl, search and extract web data in a couple of minutes. There are three options:

1. **[MCP server](#connect-with-mcp)** (recommended): adds Maxun's tools to any MCP client.
2. **[Agent skill](#install-an-agent-skill)**: a skill for Claude Code or OpenClaw that runs your existing robots.
3. **[Docs in context](#give-your-agent-the-docs)**: point a coding agent at the docs so it writes Maxun code for you.

## Before you start

Get an API key from the [Maxun dashboard](https://app.maxun.dev) under **Settings → API Key**. See [API Key](/api/api) for details. Replace `your_api_key_here` below with your key.

## Connect with MCP

The examples below use **Maxun Cloud** (`https://app.maxun.dev/api/mcp`). If you self-host Maxun, follow the [self-hosted MCP setup](/mcp/setup#self-hosted-oss) instead.

<Tabs groupId="mcp-client">
<TabItem value="claude-code" label="Claude Code" default>

Run this in your terminal:

```bash
claude mcp add --transport http maxun https://app.maxun.dev/api/mcp --header "x-api-key: your_api_key_here"
```

Add `--scope user` to make Maxun available in every project, or `--scope project` to share it with your team through `.mcp.json`. Run `/mcp` inside Claude Code to check the connection.

</TabItem>
<TabItem value="cursor" label="Cursor">

Add Maxun to `~/.cursor/mcp.json` (all projects) or `.cursor/mcp.json` (this project):

```json
{
  "mcpServers": {
    "maxun": {
      "url": "https://app.maxun.dev/api/mcp",
      "headers": {
        "x-api-key": "your_api_key_here"
      }
    }
  }
}
```

Open **Cursor Settings → MCP** and check that `maxun` shows a green dot.

</TabItem>
<TabItem value="vscode" label="VS Code">

Add Maxun to `.vscode/mcp.json` in your workspace:

```json
{
  "servers": {
    "maxun": {
      "type": "http",
      "url": "https://app.maxun.dev/api/mcp",
      "headers": {
        "x-api-key": "your_api_key_here"
      }
    }
  }
}
```

Then open Copilot Chat in **Agent** mode and select the Maxun tools.

</TabItem>
<TabItem value="windsurf" label="Windsurf">

Add Maxun to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "maxun": {
      "serverUrl": "https://app.maxun.dev/api/mcp",
      "headers": {
        "x-api-key": "your_api_key_here"
      }
    }
  }
}
```

Refresh the MCP servers in Windsurf's Cascade panel.

</TabItem>
<TabItem value="claude-desktop" label="Claude Desktop">

Open **Settings → Developer → Edit Config** and add Maxun to `claude_desktop_config.json`. Claude Desktop uses [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) to connect, so Node.js must be installed.

```json
{
  "mcpServers": {
    "maxun": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://app.maxun.dev/api/mcp",
        "--header",
        "x-api-key:your_api_key_here"
      ]
    }
  }
}
```

Restart Claude Desktop. The Maxun tools appear under the tools icon in the chat box.

</TabItem>
<TabItem value="codex" label="Codex">

Add Maxun to `~/.codex/config.toml`:

```toml
[mcp_servers.maxun]
command = "npx"
args = ["-y", "mcp-remote", "https://app.maxun.dev/api/mcp", "--header", "x-api-key:your_api_key_here"]
```

Start a new Codex session to load the server.

</TabItem>
<TabItem value="gemini" label="Gemini CLI">

Add Maxun to `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "maxun": {
      "httpUrl": "https://app.maxun.dev/api/mcp",
      "headers": {
        "x-api-key": "your_api_key_here"
      }
    }
  }
}
```

Run `/mcp` in Gemini CLI to check the connection.

</TabItem>
<TabItem value="other" label="Other clients">

Any MCP client that supports remote (Streamable HTTP) servers can connect with:

```text
URL:     https://app.maxun.dev/api/mcp
Header:  x-api-key: your_api_key_here
```

If your client only supports local (stdio) servers, run the server through [`mcp-remote`](https://www.npmjs.com/package/mcp-remote):

```bash
npx -y mcp-remote https://app.maxun.dev/api/mcp --header "x-api-key:your_api_key_here"
```

</TabItem>
</Tabs>

:::tip Work with a team's robots
Add an `x-team-id` header with your team ID to use a [team's](/teams-management) robots instead of your personal ones. See [Use a team's robots](/mcp/setup#use-a-teams-robots).
:::

### Try it

Ask your agent something like:

- "Scrape https://news.ycombinator.com and list the top 10 stories as a table"
- "Search the web for the latest Maxun release notes and summarize them"
- "Crawl https://docs.maxun.dev and tell me which pages mention webhooks"
- "Get the name, price and rating of every product on https://example.com/shop"
- "Run my 'Competitor prices' robot and show me what changed"

See [MCP Tools](/mcp/tools) for every tool and its options.

## Install an agent skill

Skills teach an agent how to run your existing Maxun robots with simple commands. Use them if you already build robots in the dashboard and want to run them from your agent.

| Agent | Install | Guide |
|---|---|---|
| Claude Code | Download the skill to `~/.claude/skills/maxun` | [Claude Code skill](/integrations/claude-code) |
| OpenClaw | `clawhub install maxun` | [OpenClaw skill](/integrations/openclaw) |

All skills are open source in the [maxun-skills](https://github.com/getmaxun/maxun-skills) repository.

## Give your agent the docs

When a coding agent writes code that uses the Maxun SDK, CLI or API, give it the docs so it uses the current API:

- **[llms.txt](https://docs.maxun.dev/llms.txt)**: a short, curated map of the docs.
- **[llms-full.txt](https://docs.maxun.dev/llms-full.txt)**: every docs page in one file.
- **Any page as Markdown**: add `.md` to its URL, for example [docs.maxun.dev/quickstart.md](https://docs.maxun.dev/quickstart.md).

To make this permanent, add a note to your project's `AGENTS.md`, `CLAUDE.md` or `.cursor/rules`:

```markdown
## Maxun
This project uses Maxun for web scraping and data extraction.
Before writing Maxun code, read https://docs.maxun.dev/llms.txt.
Fetch any docs page as Markdown by adding .md to its URL.
Read the API key from the MAXUN_API_KEY environment variable.
```

Or paste this prompt to have your agent add Maxun to your project:

<PromptCard title="Add Maxun to my project">{`Add Maxun (https://maxun.dev) to this project so it can scrape, crawl, search and extract web data.

1. Read https://docs.maxun.dev/llms.txt to learn how Maxun works. Fetch any page as Markdown by adding .md to its URL.
2. Pick the official SDK for this project's language: maxun-sdk for Node.js/TypeScript, or maxun for Python.
3. Install it and read the API key from the MAXUN_API_KEY environment variable. Never hard-code the key. If .env.example exists, add MAXUN_API_KEY to it.
4. Add a small example that scrapes https://maxun.dev into Markdown and prints the result.
5. Tell me where to get an API key: https://app.maxun.dev, under Settings → API Key.`}</PromptCard>

See [LLM-ready docs](/ai/llm-ready-docs) for everything the docs offer AI tools.
