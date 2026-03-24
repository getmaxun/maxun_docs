---
id: cli-run
title: Running Robots
sidebar_position: 3
---

# Running Robots

Use `maxun run` to trigger a robot execution and receive results directly in your terminal.

## Basic Usage

```bash
maxun run <robot-id>
```

Triggers the robot and streams the extracted data to stdout as JSON once the run completes.

## Options

| Option | Description |
|--------|-------------|
| `-f, --format <fmt>` | Override output formats for this run: `markdown`, `html`, `text`, `screenshot-visible`, `screenshot-fullpage` (comma-separated) |
| `-t, --table` | Display results in a table (best suited for Discovery Search results) |

## Examples

### Standard run

```bash
maxun run <robot-id>
```

### Override output format

```bash
maxun run <robot-id> -f html,markdown
```

### View search results as a table

```bash
maxun run <robot-id> --table
```

## Output

Results are printed to stdout as JSON by default — pipe-friendly for scripting:

```bash
maxun run <robot-id> | jq '.[].price'
```

After a run completes, the data is also stored and retrievable via:

```bash
maxun runs get <robot-id> <run-id>
```
