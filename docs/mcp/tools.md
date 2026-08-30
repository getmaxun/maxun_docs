---
id: tools
title: Tools
sidebar_position: 2
---

# Tools

The Maxun MCP Server exposes your robots as tools, letting you list them, run them, and retrieve results — all through natural language.

## Available Tools

The tools available depend on which variant you are using:

| Tool | Description |
|---|---|
| `list_robots` | List all robots in your account |
| `get_robot` | Get details for a specific robot |
| `run_robot` | Execute a robot and return extracted data |
| `get_robot_runs` | Get the execution history for a robot |
| `get_run_details` | Get the full output of a specific run |
| `get_robot_summary` | Get performance stats and success rates |

## How to Use

You interact with Maxun through natural language — the AI automatically picks the right tool based on your request.

### Listing Robots

```
"What robots do I have?"
"Show me all my robots"
"List all available robots"
```
*Triggers `list_robots`*

### Running a Robot

```
"Run my Amazon price scraper"
"Execute robot abc123 and show me the results"
"Run the product catalog robot and return the data as markdown"
```
*Triggers `run_robot`*

:::tip
You don't need to know the robot ID upfront. Ask your AI assistant to list your robots first — it will resolve the name to an ID automatically before running.
:::

### Getting Robot Details

```
"Tell me about robot abc123"
"What does my product scraper robot do?"
"Show me the configuration for robot abc123"
```
*Triggers `get_robot`*

### Checking Run History

```
"Show me recent runs for robot abc123"
"What's the execution history for my price scraper?"
"List the last 10 runs of robot abc123"
```
*Triggers `get_robot_runs`*

### Getting Run Results

```
"Show me the results from run xyz789"
"What data was extracted in the last run?"
"Get the output from run xyz789"
```
*Triggers `get_run_details`*

### Performance Analysis

```
"Give me a performance summary for robot abc123"
"How well is my price scraper performing?"
"Show me success rates for robot abc123"
```
*Triggers `get_robot_summary`*

---

## Common Workflows

### First Time Setup
1. **"Show me all my robots"** — see what's available
2. **"Tell me about robot [name or id]"** — understand what it does
3. **"Run robot [name or id]"** — execute it and get results

### Monitoring Runs
1. **"Show me all runs for robot [name]"** — check history
2. **"Show me the results from the latest run"** — inspect output

### Debugging a Failed Run
1. **"Show me all runs for robot [name]"** — find the failed run
2. **"Get details for run [run-id]"** — see the error
3. **"Run robot [name] again"** — retry

### Chained Extraction
```
"List my robots, run the most recently created one, and summarize the results"
```
Your AI assistant will chain `list_robots` → `run_robot` → format the output automatically.

---

## Tool Reference

### `list_robots`
Returns all robots in your account with their ID, name, type, and schedule.

**Example response fields:**
- `id` — robot ID (use this in other tool calls)
- `name` — human-readable name
- `type` — robot type (`extract`, `crawl`, `scrape`, `search`)
- `schedule` — cron schedule if configured

### `run_robot`
Executes a robot and waits up to **30 minutes** for it to complete.

**Parameters:**
| Parameter | Required | Description |
|---|---|---|
| `robot_id` | Yes | The robot ID to execute |
| `formats` | No | Output formats: `["markdown", "text", "html"]` |
| `params` | No | Input parameters for the robot workflow |

### `get_robot_runs`
Returns the execution history for a robot.

**Parameters:**
| Parameter | Required | Description |
|---|---|---|
| `robot_id` | Yes | The robot ID |
| `limit` | No | Max runs to return (default 20, max 100) |

---

## Tips for Better Prompts

- **Skip the ID** — describe the robot by name, the AI will look it up
- **Ask for specific formats** — "return the data as a markdown table"
- **Chain requests** — "run the scraper and email me a summary" (if email tools are also configured)
- **Ask follow-up questions** — "why did that run fail?" after getting an error result

## Error Handling

Common errors you may see:

| Error | Cause |
|---|---|
| `Robot not found` | The robot ID doesn't exist or belongs to another account |
| `API key is invalid` | Check your key in the Maxun Dashboard |
| `Run failed` | The robot encountered an error during extraction — check run details |
| `Execution timeout` | The robot didn't complete within 30 minutes |
