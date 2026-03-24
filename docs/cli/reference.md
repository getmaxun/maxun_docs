---
id: cli-reference
title: Command Reference
sidebar_position: 5
---

# Command Reference

Full reference for all `maxun` CLI commands.

## Auth

| Command | Description |
|---------|-------------|
| `maxun login --api-url <url> --api-key <key>` | Authenticate with your Maxun instance and API key |
| `maxun logout` | Clear stored credentials |
| `maxun status` | Show authentication status, plan, and credits |
| `maxun credits` | Show remaining credit balance |

## Robots

| Command | Description |
|---------|-------------|
| `maxun robots list` | List all robots (JSON by default, `--table` for formatted view) |
| `maxun robots extract -p <prompt> [-u <url>] [--provider <p>] [--model <m>]` | Create an AI robot from a natural language prompt |
| `maxun robots scrape <url>` | Create a single-page scraping robot |
| `maxun robots crawl <url>` | Create a multi-page crawling robot |
| `maxun robots search <query>` | Create a search-based robot |
| `maxun robots get <id>` | Get details for a specific robot |
| `maxun robots delete <id>` | Delete a robot |
| `maxun robots duplicate <id> --url <url>` | Duplicate a robot with a new target URL |

## Execution

| Command | Description |
|---------|-------------|
| `maxun run <id>` | Run a robot and return results (JSON by default) |
| `maxun run <id> --table` | Run and display results in table format |
| `maxun run <id> -f <formats>` | Override output formats for this run |

## Runs & Data

| Command | Description |
|---------|-------------|
| `maxun runs list <robot-id>` | List recent runs for a robot |
| `maxun runs get <robot-id> <run-id>` | Get output of a specific run |
| `maxun runs get ... -f csv -o file.csv` | Export run output as CSV |
| `maxun runs abort <robot-id> <run-id>` | Abort an in-progress run |

## Global Flags

| Flag | Description |
|------|-------------|
| `-v, --version` | Print CLI version |
| `-h, --help` | Show help for any command |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MAXUN_API_KEY` | API key — overrides stored config |
| `MAXUN_API_URL` | API base URL — defaults to https://app.maxun.dev |

## Configuration File

Credentials are stored at `~/.maxun/config.json`:

```json
{
  "apiKey": "your-api-key",
  "apiUrl": "http://localhost:8080"
}
```
