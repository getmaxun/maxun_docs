---
id: api
title: "Get Your Maxun API Key & Authenticate"
description: "Generate a Maxun API key in the dashboard and use it to run robots and fetch extracted data through the REST API, SDK, CLI and MCP."
sidebar_label: "API Key"
sidebar_position: 1
---

# API Key & Authentication

Maxun lets you get the data your robot extracted and run robots via API. Every request is authenticated with your Maxun API key.

## Base URL and Authentication

| | Maxun Cloud | Self-hosted |
|---|---|---|
| API | [Cloud API](/api/cloud-api) | [Open Source API](/api/open-source-api) |
| Base URL | `https://app.maxun.dev/api/v1` | Your `BACKEND_URL` + `/api` (default `http://localhost:8080/api`) |
| Auth header | `x-api-key: <your-api-key>` or `Authorization: Bearer <your-api-key>` | `x-api-key: <your-api-key>` |

For example, to list your robots on Maxun Cloud:

```bash
curl https://app.maxun.dev/api/v1/robots \
  -H "x-api-key: YOUR_API_KEY"
```

A request without a key returns `401`, and an invalid key returns `403`.

Available endpoints:

1. [Cloud API](./cloud-api.md): robots, agents, runs, schedules, monitoring and webhooks on Maxun Cloud
2. [Open Source API](./open-source-api.md): robots, runs and schedules on self-hosted Maxun
3. [Webhooks](./webhooks.md): receive results the moment a run finishes

## 1. Generate API Key
You can find your API key in the "API Key" section on Maxun Dashboard.

![Generate API Key](gen_api_key.png)|
:---:|
|Generate API Key|

![API Key Generated](api_key_success.png)|
:---:|
|API Key Generated|

## 2. Authorize
1. Go to "API Key" tab on the dashboard's sidebar and select the option "test your API".
2. Click `Authorize`, paste the API Key you copied in step 1 and click `Authorize` to save.
![Authorize](api_auth.png)

## 3. Live Test
Click on the **Try it out** button present within each endpoint to get the output. To execute certain endpoints, you may need to provide specific parameters.

![Try it out](try-it-out.png)

## Where Else the API Key Is Used

The same key works across every Maxun interface:

- **SDK:** set `MAXUN_API_KEY` or pass `apiKey` / `api_key`. See [Node.js SDK](/sdk/node-sdk/sdk-overview) and [Python SDK](/sdk/python-sdk/sdk-overview).
- **CLI:** `maxun login --api-key <your-api-key>`. See [CLI](/cli/cli-overview).
- **MCP:** send it as the `x-api-key` header. See [MCP Setup](/mcp/setup).
- **Chrome extension:** connect it to [extract data behind login](/extract-login).
