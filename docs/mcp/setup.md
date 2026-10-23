---
id: setup
title: "Set Up the Maxun MCP Server (Claude, Cursor)"
description: "Connect Claude Desktop, Cursor, Windsurf or Cline to Maxun with the MCP server. Scrape, crawl, search and extract web data, and manage robots, through natural language."
sidebar_label: "Setup"
sidebar_position: 1
---

# MCP Server Setup

Maxun MCP Server lets you connect any MCP-compatible AI client (Claude Desktop, Cursor, Windsurf, Cline, Claude Code, etc.) to Maxun. Your AI client can then:

- **Scrape** any page into clean markdown, HTML, text, links or screenshots, and answer questions about it
- **Crawl** whole websites
- **Search** the web and scrape the results
- **Extract** structured data by describing it in plain language, with an AI agent
- **Run and monitor** the robots you already have, including Recorder Mode robots

See [MCP Tools](/mcp/tools) for every tool and its options.

There are two variants depending on how you use Maxun:

| | **Maxun Cloud** | **Self-Hosted (OSS)** |
|---|---|---|
| Setup | API key + URL only | Build step required |
| Auth | `x-api-key` header | Environment variable |
| Server URL | `https://app.maxun.dev/api/mcp` | Your local backend |

---

## Maxun Cloud

No build step needed. Connect directly to the cloud API with your Maxun API key.

### Prerequisites

- A Maxun Cloud account at [app.maxun.dev](https://app.maxun.dev)
- An MCP-compatible client (Claude Desktop, Cursor, Windsurf, Cline, etc.)

### 1. Generate your API Key

Go to your Maxun Dashboard and navigate to **Settings → API Key** to generate a key.

![Generate API Key](gen_api_key.png)|
:---:|
|Generate API Key|

![API Key Generated](api_key_success.png)|
:---:|
|API Key Generated|

### 2. Configure your MCP client

Choose the configuration format that matches your client.

#### Native HTTP

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

#### Via mcp-remote (stdio bridge)

If your client does not support the `url` + `headers` format natively, use [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) as a stdio-to-HTTP bridge — no separate install needed, `npx` handles it automatically.

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

Most clients store this config as a JSON file. For example, in **Claude Desktop** it is at:
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Check your client's documentation for the exact config file location.

### 3. Restart your client

After saving the config, restart the application. On success you will see the Maxun tools available in the client.

![MCP Server Initialized](mcp_init_success.png)

### Use a team's robots

By default the MCP server works with your personal robots. To work with a [team's](/teams-management) robots instead, add an `x-team-id` header with the team ID (shown on the **Teams** page of the dashboard). Your team role applies: viewers can list and read robots and runs, members can also create and run them.

```json
{
  "mcpServers": {
    "maxun": {
      "url": "https://app.maxun.dev/api/mcp",
      "headers": {
        "x-api-key": "your_api_key_here",
        "x-team-id": "your_team_id_here"
      }
    }
  }
}
```

With `mcp-remote`, add another `"--header", "x-team-id:your_team_id_here"` pair to `args`.

### Claude Code

Add the server from your terminal:

```bash
claude mcp add --transport http maxun https://app.maxun.dev/api/mcp --header "x-api-key: your_api_key_here"
```

---

## Self-Hosted (OSS)

Use this if you are running the open-source Maxun instance locally or on your own server.

### Prerequisites

- Maxun OSS running locally (default: `http://localhost:8080`)
- Node.js installed

### 1. Build the MCP worker

Run the following command from the root of your Maxun project:

```bash
npm run mcp:build
```

This generates `dist/mcp-worker.js` in your project root.

### 2. Generate your API Key

Generate the API Key from your self-hosted Maxun Dashboard under **Settings → API Key**.

### 3. Configure your MCP client

Add the following to your client's MCP server config. For example, in Claude Desktop go to **File → Settings → Developer → Edit Config**:

```json
{
  "mcpServers": {
    "maxun": {
      "command": "node",
      "args": [
        "/path/to/your/project/dist/mcp-worker.js"
      ],
      "env": {
        "MCP_API_KEY": "your_api_key_here",
        "BACKEND_URL": "your_backend_url_here",
        "MCP_WORKER": "true"
      }
    }
  }
}
```

Replace `/path/to/your/project` with the absolute path to your Maxun project directory, and `your_backend_url_here` with your backend URL (e.g. `http://localhost:8080`).

After saving, restart your client. You'll see the Maxun tools available on successful configuration.

### 4. (Optional) Configure an LLM

Self-hosted Maxun uses your own LLM for AI features. To use `maxun_agent`, the `summary` output format or smart queries in `maxun_scrape`, add these to the `env` block above:

| Variable | Description |
|---|---|
| `MAXUN_LLM_PROVIDER` | `anthropic`, `openai` or `ollama` |
| `MAXUN_LLM_MODEL` | Model name, e.g. `claude-sonnet-4-5`, `gpt-4o` or `llama3.1` |
| `MAXUN_LLM_API_KEY` | API key for Anthropic or OpenAI |
| `MAXUN_LLM_BASE_URL` | Base URL for Ollama, e.g. `http://localhost:11434` |

```json
"env": {
  "MCP_API_KEY": "your_api_key_here",
  "BACKEND_URL": "http://localhost:8080",
  "MCP_WORKER": "true",
  "MAXUN_LLM_PROVIDER": "anthropic",
  "MAXUN_LLM_MODEL": "claude-sonnet-4-5",
  "MAXUN_LLM_API_KEY": "your_anthropic_key_here"
}
```

The key is sent to your own Maxun backend only. Everything else, including scrape, crawl and search, works without an LLM.

:::note Upgrading
After updating your Maxun project, run `npm run mcp:build` again and restart your client to get the latest tools.
:::
