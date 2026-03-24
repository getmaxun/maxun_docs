---
id: cli-overview
title: Overview
sidebar_position: 1
---

# Maxun CLI

The Maxun CLI lets you create robots, trigger runs, and fetch extracted data directly from your terminal — without opening the dashboard. It's fully compatible with both the **Cloud version** and **Self-hosted / OSS version** of Maxun.

## Installation

```bash
npm install -g @maxun/cli
```

## Requirements

- Node.js 18.0.0 or higher
- A Maxun account and API key from [app.maxun.dev](https://app.maxun.dev) (for Cloud) or your local instance (for Self-hosted).

## Authentication

### Cloud Version

```bash
maxun login --api-key <your-api-key>
```

### Self-hosted / OSS Version

```bash
maxun login --api-url http://localhost:8080 --api-key <your-api-key>
```

Your config is stored at `~/.maxun/config.json` and used automatically for all subsequent commands.

You can also set these via environment variables:

```bash
export MAXUN_API_KEY=your-api-key
export MAXUN_API_URL=http://localhost:8080
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
