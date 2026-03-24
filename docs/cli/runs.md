---
id: cli-runs
title: Runs & Data
sidebar_position: 4
---

# Runs & Data

The `maxun runs` command group lets you list past runs for a robot and retrieve extracted data in multiple formats.

## List Runs

```bash
maxun runs list <robot-id>
```

Returns recent runs as JSON by default.

| Option | Description |
|--------|-------------|
| `--limit <n>` | Max results to return (default: 10) |
| `-t, --table` | Display in table format |

**Example:**
```bash
maxun runs list <robot-id> --table
```

## Get Run Data

```bash
maxun runs get <robot-id> <run-id>
```

Fetches the extracted output for a specific run.

| Option | Description |
|--------|-------------|
| `-f, --format <fmt>` | Output format: `json` (default), `csv`, `table` |
| `-o, --output <file>` | Save output to a file |
| `--pretty` | Pretty print JSON output |

**Examples:**

```bash
# Default JSON output
maxun runs get <robot-id> <run-id>

# Pretty JSON
maxun runs get <robot-id> <run-id> --pretty

# Table view (for search discovery results)
maxun runs get <robot-id> <run-id> -f table

# Export to CSV
maxun runs get <robot-id> <run-id> -f csv -o results.csv

# Save JSON to file
maxun runs get <robot-id> <run-id> -o data.json
```

## Abort a Run

```bash
maxun runs abort <robot-id> <run-id>
```

Aborts a run that is currently in progress.
