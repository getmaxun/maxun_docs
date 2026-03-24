---
id: cli-overview
title: Overview
sidebar_position: 1
---

# Maxun CLI

The Maxun CLI lets you create robots, trigger runs, and fetch extracted data directly from your terminal — without opening the dashboard.

## Installation

```bash
npm install -g @maxun/cli
```

## Requirements

- Node.js 18.0.0 or higher
- A Maxun account and API key from [app.maxun.dev](https://app.maxun.dev)

## Authentication

```bash
maxun login --api-key <your-api-key>
```

Your API key is stored at `~/.maxun/config.json` and used automatically for all subsequent commands.

You can also set it via environment variable:

```bash
export MAXUN_API_KEY=your-api-key
```

## Quick Start

```bash
# Authenticate
maxun login --api-key <your-api-key>

# Create an AI robot from a prompt
maxun robots extract -p "Extract trending repositories from Github" -n "Github Trends"

# Run the robot
maxun run <robot-id>

# Check status and credits
maxun status
```
