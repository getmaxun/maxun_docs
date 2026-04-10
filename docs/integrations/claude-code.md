---
id: claude-code
title: Claude Code
sidebar_position: 10
description: List and run Maxun robots directly from your terminal using the Claude Code skill.
---

# Claude Code

The Maxun skill for <a href="https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview" target="_blank">Claude Code</a> lets you list, run, and retrieve results from your Maxun robots directly inside your terminal workflow. 

---

## Prerequisites

- <a href="https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview" target="_blank">Claude Code</a> installed
- A Maxun Cloud account at <a href="https://app.maxun.dev" target="_blank">app.maxun.dev</a> or a self-hosted instance
- API Key from <a href="/api/api">Maxun Dashboard</a>

---

## Setup

### 1. Identify your working directory

Claude Code keeps its config file recursively up from the directory where you run the tool. For instance, you could use `~/.claude/skills/maxun`.

### 2. Download the skill files

```bash
# 1. Create the skill directory
mkdir -p ~/.claude/skills/maxun/scripts

# 2. Download the skill files
curl -sf -o ~/.claude/skills/maxun/SKILL.md \
  https://raw.githubusercontent.com/getmaxun/maxun-skills/main/claude-code/.claude/skills/maxun/SKILL.md
curl -sf -o ~/.claude/skills/maxun/scripts/maxun.sh \
  https://raw.githubusercontent.com/getmaxun/maxun-skills/main/claude-code/.claude/skills/maxun/scripts/maxun.sh

# 3. Make the script executable
chmod +x ~/.claude/skills/maxun/scripts/maxun.sh
```

### 3. Configure your API key

The skill automatically looks for a `.env` file in your **project root** and loads the variables without any extra configuration needed inside Claude Code.

Just add to your project's `.env`:
```bash
MAXUN_API_KEY="your_api_key_here"
```

For **self-hosted Maxun** users, also set your base URL in the same `.env` file:
```bash
MAXUN_BASE_URL="http://localhost:8080"
```

*(Alternatively, you can export these variables directly in your bash or zsh profiles if you prefer them to be globally injected without a `.env` file).*

---

## Usage

Once installed, your agent will automatically understand requests about your robots directly in your command line:

- "What Maxun robots do I have?"
- "Run my product scraper robot"
- "Show me the result for the last run of robot abc123"
- "Abort run run_xyz789 for robot abc123"

### Available Commands (Slash Commands)

| Command / Prompt | Action |
| --- | --- |
| `/maxun list` | List all robots |
| `/maxun run <robotId>` | Run a robot (synchronous) |
| `/maxun result <robotId> <runId>` | Fetch a specific run result |
| `/maxun runs <robotId>` | List all past runs for a robot |
| `/maxun get <robotId>` | Get detailed robot metadata |
| `/maxun abort <robotId> <runId>` | Stop an in-progress execution |

---

## Resources

- <a href="https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview" target="_blank">Claude Code</a>
- <a href="https://github.com/getmaxun/maxun-skills" target="_blank">Maxun Skills Repository</a>
