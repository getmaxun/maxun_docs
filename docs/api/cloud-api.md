---
id: cloud-api
title: "Cloud API: Robots, Agents, Runs, Schedules, Monitoring & Webhooks"
description: "The Maxun Cloud REST API (v1): create robots and agents, run and schedule them, monitor changes and manage webhooks."
sidebar_label: "Cloud API"
sidebar_position: 2
toc_max_heading_level: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiSections from '@site/src/components/ApiSections';

# Cloud API

Create robots and agents, run and schedule them, watch for changes and manage webhooks on [Maxun Cloud](https://app.maxun.dev).

:::note
From October 2026, the original `/api/robots` API is deprecated on Maxun Cloud. Use the v1 endpoints on this page.
:::

<ApiSections items={[
  { title: 'Basics', href: '#basics', description: 'Base URL, authentication, teams, errors and limits' },
  { title: 'Account', href: '#account', description: 'Your plan, credits, usage and queue',},
  { title: 'Robot', href: '#robots', description: 'Scrape, crawl, search and document robots',  },
  { title: 'Agent', href: '#agents', description: 'Web extraction agents using prompts with AI' },
  { title: 'Run', href: '#runs', description: 'Fetch data collected by robots & agents' },
  { title: 'Schedule', href: '#schedules', description: 'Extract data on a schedule', },
  { title: 'Monitor', href: '#monitoring', description: 'Detect websites changes and get alerts', },
  { title: 'Webhooks', href: '#webhooks', description: 'Get notified when runs finish', },
]} />

## Basics

### Base URL

```
https://app.maxun.dev/api/v1
```

### Authentication

Send your [API key](/api/api) as `Authorization: Bearer <api-key>` or `x-api-key: <api-key>`.

<Tabs groupId="lang" queryString>
  <TabItem value="curl" label="cURL">

```bash
curl https://app.maxun.dev/api/v1/robots \
  -H "Authorization: Bearer YOUR_API_KEY"
```

  </TabItem>
  <TabItem value="js" label="JavaScript">

```js
const res = await fetch('https://app.maxun.dev/api/v1/robots', {
  headers: { Authorization: `Bearer ${process.env.MAXUN_API_KEY}` },
});
const { data: robots } = await res.json();
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import os, requests

res = requests.get(
    "https://app.maxun.dev/api/v1/robots",
    headers={"Authorization": f"Bearer {os.environ['MAXUN_API_KEY']}"},
)
robots = res.json()["data"]
```

  </TabItem>
</Tabs>

### Teams

Requests use your personal robots. To use a team's robots, add `x-team-id: <team-id>`. The Team ID is on the **Teams** page of the dashboard and in [`GET /me`](#get-me). Your team role applies: viewers can read, members can also create, update and run, and admins can also delete.

### Responses

Every response is JSON with a `success` flag:

```json
{ "success": true, "data": { … } }
{ "success": false, "error": "Robot not found" }
```

| Status | Meaning |
|---|---|
| `200` / `201` | Success / created |
| `202` | Accepted; the work continues in the background |
| `400` | Invalid request; `error` says what to fix |
| `401` | API key missing |
| `402` | Not enough credits |
| `403` | Invalid API key, plan limit reached, or your team role doesn't allow it |
| `404` | Not found |
| `409` | Conflict, such as a duplicate robot name or a run that has already finished |
| `429` | Rate limited; wait for the `Retry-After` seconds |

### Pagination

Lists take `limit` (default `25`, max `100`) and `offset`, newest first. A page shorter than `limit` is the last one.

### Rate limits

Limits are per minute and scale with your plan. Responses carry `X-RateLimit-Limit` and `X-RateLimit-Remaining`.

## Account

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/me` | Your account, plan and teams |
| `GET` | `/usage` | Plan, credits and robot, agent and run counts |
| `GET` | `/usage/rate-limits` | Your current rate limits |
| `GET` | `/queue` | Runs running and waiting |

### Get me

`GET /me`

```json
{
  "success": true,
  "data": {
    "email": "you@example.com",
    "plan": "GROWTH",
    "credits": 3120.5,
    "expiresAt": "2026-11-13T12:09:17.759Z",
    "teams": [{ "id": "864e4c60-…", "name": "Acme data", "role": "ADMIN", "isOwner": true }]
  }
}
```

### Get usage

`GET /usage`. With `x-team-id`, the plan and credits are the team owner's and the counts are the team's.

```json
{
  "success": true,
  "data": {
    "scope": { "type": "personal" },
    "plan": "GROWTH",
    "credits": 3120.5,
    "billingCycle": "MONTHLY",
    "expiresAt": "2026-11-13T12:09:17.759Z",
    "robots": 14,
    "agents": 3,
    "runs": 1287
  }
}
```

`robots` includes agents. `runs` counts runs to date.

### Rate limits and queue

- `GET /usage/rate-limits` returns each limit with `category`, `limitPerMinute` and `remaining`.
- `GET /queue` returns `running`, `queued`, `oldestQueuedAt` and `lastSuccessAt`. Runs wait in the queue when all your browser slots are busy.

## Robots

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/robots` | List robots |
| `GET` | `/robots/{id}` | Get a robot |
| `POST` | `/robots/scrape` | Create a scrape robot |
| `POST` | `/robots/crawl` | Create a crawl robot |
| `POST` | `/robots/search` | Create a search robot |
| `POST` | `/robots/document-extract` | Create a document extract robot |
| `POST` | `/robots/document-parse` | Create a document parse robot |
| `PATCH` | `/robots/{id}` | Update a robot |
| `POST` | `/robots/{id}/duplicate` | Copy a robot onto another URL |
| `DELETE` | `/robots/{id}` | Delete a robot and its runs |
| `PUT` | `/robots/{id}/document` | Replace a document robot's file |
| `PATCH` | `/robots/{id}/document-prompt` | Change a document extract robot's prompt |

Robots built in the recorder are created in the dashboard; every other endpoint works with them.

### The robot object

```json
{
  "id": "4db5f26d-6f37-4c21-9f9c-e06c3bd092d9",
  "name": "Pricing page",
  "type": "scrape",
  "status": "ready",
  "error": null,
  "url": "https://example.com/pricing",
  "description": null,
  "smartQueries": "What is the price of the Pro plan?",
  "formats": ["markdown", "links"],
  "teamId": null,
  "createdAt": "2026-10-14T12:09:22.797Z",
  "updatedAt": "2026-10-14T13:10:08.709Z",
  "schedule": null,
  "monitoring": { "compareRuns": true, "monitoringPrompt": null, "alertsEnabled": false, "alertEmail": null },
  "webhooks": []
}
```

| Field | Description |
|---|---|
| `type` | `extract` (built in the recorder), `agent`, `scrape`, `crawl`, `search`, `doc-extract` or `doc-parse` |
| `status` | `ready`. Agents can also be `creating` or `failed`, with the reason in `error` |
| `smartQueries` | Scrape robots only: questions answered from the page |
| `prompt`, `deepExtraction` | Agents only |
| `schedule`, `monitoring`, `webhooks` | See [Schedules](#schedules), [Monitoring](#monitoring) and [Webhooks](#webhooks) |

### List and get robots

`GET /robots` takes `type`, `q` (name search), `scheduled` (`true` or `false`), `limit` and `offset`. `GET /robots/{id}` returns one robot.

### Create a scrape robot

`POST /robots/scrape`

| Field | Required | Description |
|---|---|---|
| `url` | Yes | Page to scrape |
| `name` | No | Defaults to `Scrape Robot - <hostname>` |
| `formats` | No | Any of `markdown`, `html`, `text`, `links`, `summary`, `screenshot-visible`, `screenshot-fullpage`. Default `["markdown"]` |
| `smartQueries` | No | Questions to answer from the page |

<Tabs groupId="lang" queryString>
  <TabItem value="curl" label="cURL">

```bash
curl -X POST https://app.maxun.dev/api/v1/robots/scrape \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "url": "https://example.com/pricing", "formats": ["markdown", "links"] }'
```

  </TabItem>
  <TabItem value="js" label="JavaScript">

```js
const res = await fetch('https://app.maxun.dev/api/v1/robots/scrape', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.MAXUN_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ url: 'https://example.com/pricing', formats: ['markdown', 'links'] }),
});
const { data: robot } = await res.json();
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
res = requests.post(
    "https://app.maxun.dev/api/v1/robots/scrape",
    headers={"Authorization": f"Bearer {os.environ['MAXUN_API_KEY']}"},
    json={"url": "https://example.com/pricing", "formats": ["markdown", "links"]},
)
robot = res.json()["data"]
```

  </TabItem>
</Tabs>

### Create a crawl robot

`POST /robots/crawl` with `url`, an optional `name` and `crawlConfig`. Send `"crawlConfig": {}` to use the defaults.

| `crawlConfig` option | Default | Description |
|---|---|---|
| `mode` | `"domain"` | Links to follow: `"domain"`, `"subdomain"` or `"path"` |
| `limit` | `50` | Maximum pages |
| `maxDepth` | `3` | How many links away from the start page to go |
| `includePaths` / `excludePaths` | `[]` | URL patterns to include or skip, e.g. `["/blog/*"]` |
| `useSitemap` | `true` | Also find pages through `sitemap.xml` |
| `followLinks` | `true` | Follow links found on each page |
| `respectRobots` | `true` | Obey `robots.txt` |
| `outputFormats` | | What to capture from each page, from the scrape `formats` list |

### Create a search robot

`POST /robots/search` with an optional `name` and `searchConfig`:

| `searchConfig` option | Default | Description |
|---|---|---|
| `query` | required | What to search for |
| `mode` | `"discover"` | `"discover"` returns titles, URLs and snippets; `"scrape"` also opens each result |
| `limit` | `10` | Number of results |
| `filters.timeRange` | any time | `"day"`, `"week"`, `"month"` or `"year"` |
| `outputFormats` | | In scrape mode, what to capture from each result |

### Create a document robot

Send `multipart/form-data` with a `file` (PDF, DOCX, XLSX, CSV, JPG or PNG).

- `POST /robots/document-extract` takes `prompt` (the fields to extract) and an optional `name`. It returns the robot with its `extractionSchema`.
- `POST /robots/document-parse` takes `name` and `outputFormats` (any of `markdown`, `html`, `links`, `summary`).

```bash
curl -X POST https://app.maxun.dev/api/v1/robots/document-extract \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F file=@invoice.pdf \
  -F prompt="Invoice number, date, vendor and total amount"
```

`PUT /robots/{id}/document` replaces the stored file. `PATCH /robots/{id}/document-prompt` with `{ "prompt": "…" }` changes a document extract robot's fields.

### Update, duplicate and delete

- **`PATCH /robots/{id}`** takes any of `name`, `url`, `formats` and `smartQueries` (scrape), `crawlConfig` (crawl) and `searchConfig` (search). Configs are merged into the current ones.
- **`POST /robots/{id}/duplicate`** with `url` (and optionally `name`) copies a robot onto a new URL. The schedule and webhooks are not copied.
- **`DELETE /robots/{id}`** deletes the robot and its runs. Cancel queued or running runs first.

## Agents

An agent is a robot built from a prompt, like AI Mode in the dashboard.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/agents` | Create an agent |
| `GET` | `/agents` | List agents |
| `GET` `PATCH` `DELETE` | `/agents/{id}` | Get, rename or delete an agent |
| `POST` `GET` | `/agents/{id}/runs` | Run an agent or list its runs |

Agents are robots, so the [schedule](#schedules), [monitoring](#monitoring) and [webhook](#webhooks) endpoints also work under `/agents/{id}/…`.

### Create an agent

`POST /agents`

| Field | Required | Description |
|---|---|---|
| `prompt` | Yes | What to extract, in plain English |
| `url` | No | Where to start; leave it out to let the agent find the site |
| `name` | No | Defaults to `LLM Extract: <prompt>` |
| `deepExtraction` | No | Also open each item's detail page (paid plans). See [Deep Extraction](/deep-extraction) |

<Tabs groupId="lang" queryString>
  <TabItem value="curl" label="cURL">

```bash
curl -X POST https://app.maxun.dev/api/v1/agents \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "prompt": "Job title, location and team for every open role", "url": "https://example.com/careers" }'
```

  </TabItem>
  <TabItem value="js" label="JavaScript">

```js
const res = await fetch('https://app.maxun.dev/api/v1/agents', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.MAXUN_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'Job title, location and team for every open role',
    url: 'https://example.com/careers',
  }),
});
const { id } = await res.json();
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
res = requests.post(
    "https://app.maxun.dev/api/v1/agents",
    headers={"Authorization": f"Bearer {os.environ['MAXUN_API_KEY']}"},
    json={
        "prompt": "Job title, location and team for every open role",
        "url": "https://example.com/careers",
    },
)
agent_id = res.json()["id"]
```

  </TabItem>
</Tabs>

### Wait until it's ready

Building takes a minute or two, so `POST /agents` returns `202` with the agent in `status: "creating"`. Poll `GET /agents/{id}` until `status` is `ready`, or `failed` with the reason in `error`. Then run, schedule and monitor it like any robot. Failed agents don't count toward your plan limits.

## Runs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/robots/{id}/runs` | Start a run |
| `GET` | `/runs/{runId}` | Get a run and its data |
| `GET` | `/runs` | List runs |
| `GET` | `/robots/{id}/runs` | List a robot's runs |
| `GET` | `/runs/active` | List queued and running runs |
| `POST` | `/runs/{runId}/cancel` | Cancel a run |
| `DELETE` | `/runs/{runId}` | Delete a run |

### Start a run

`POST /robots/{id}/runs` takes optional `formats` (to override the robot's formats) and `params` (input parameter values). It returns `202` at once. If your browser slots are busy, `status` is `queued` and the run starts when one frees up. Each run needs at least 1 credit.

<Tabs groupId="lang" queryString>
  <TabItem value="curl" label="cURL">

```bash
curl -X POST https://app.maxun.dev/api/v1/robots/ROBOT_ID/runs \
  -H "Authorization: Bearer YOUR_API_KEY"
```

  </TabItem>
  <TabItem value="js" label="JavaScript">

```js
const headers = { Authorization: `Bearer ${process.env.MAXUN_API_KEY}` };

const start = await fetch(`https://app.maxun.dev/api/v1/robots/${robotId}/runs`, { method: 'POST', headers });
const { url } = await start.json();

let run;
do {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  ({ data: run } = await (await fetch(url, { headers })).json());
} while (['queued', 'running'].includes(run.status));

console.log(run.status, run.data.markdown);
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import time

headers = {"Authorization": f"Bearer {os.environ['MAXUN_API_KEY']}"}

start = requests.post(f"https://app.maxun.dev/api/v1/robots/{robot_id}/runs", headers=headers)
url = start.json()["url"]

while True:
    time.sleep(3)
    run = requests.get(url, headers=headers).json()["data"]
    if run["status"] not in ("queued", "running"):
        break

print(run["status"], run["data"]["markdown"])
```

  </TabItem>
</Tabs>

```json
{ "success": true, "id": "a30eba41-…", "status": "running", "url": "https://app.maxun.dev/api/v1/runs/a30eba41-…" }
```

### Get a run

Poll `GET /runs/{runId}` until `status` is `success`, `failed` or `aborted`, or use a [webhook](#webhooks).

```json
{
  "success": true,
  "data": {
    "id": "a30eba41-…",
    "robotId": "4db5f26d-…",
    "robotName": "Pricing page",
    "status": "success",
    "source": "api",
    "startedAt": "2026-10-14T12:10:03.361Z",
    "finishedAt": "2026-10-14T12:10:21.457Z",
    "durationMs": 18096,
    "isPartial": false,
    "hasChanges": true,
    "changedFormats": ["markdown"],
    "error": null,
    "data": {
      "textData": {},
      "listData": [],
      "crawlData": [],
      "searchData": null,
      "markdown": "# Pricing\n…",
      "html": null,
      "text": null,
      "links": ["https://example.com/signup"],
      "summary": null,
      "promptResult": "The Pro plan costs $49 per month.",
      "documentData": null
    },
    "screenshots": []
  }
}
```

| Field | Description |
|---|---|
| `source` | `api`, `sdk`, `mcp`, `cli`, `schedule` or `dashboard` |
| `isPartial` | The run stopped early but kept what it extracted |
| `data.textData`, `data.listData` | Fields and list rows captured by recorder robots and agents |
| `data.crawlData`, `data.searchData` | Crawl pages and search results |
| `data.markdown` … `data.summary` | Page content in the formats you asked for |
| `data.promptResult` | Answers to a scrape robot's `smartQueries` |
| `data.documentData` | Fields from a document extract robot |

### List, cancel and delete runs

- **`GET /runs`** and **`GET /robots/{id}/runs`** list runs without their `data`. Filter with `robotId` (on `/runs`), `status` (comma-separated), `source`, `hasChanges`, `since` and `until` (ISO 8601), plus `limit` and `offset`.
- **`GET /runs/active`** lists queued and running runs.
- **`POST /runs/{runId}/cancel`** stops a queued or running run.
- **`DELETE /runs/{runId}`** deletes a finished run.

## Schedules

| Method | Endpoint | Description |
|---|---|---|
| `PUT` | `/robots/{id}/schedule` | Set or replace a schedule |
| `GET` | `/robots/{id}/schedule` | Get a schedule, or `null` |
| `DELETE` | `/robots/{id}/schedule` | Remove a schedule |
| `GET` | `/schedules` | List scheduled robots, soonest first |

### Set a schedule

`PUT /robots/{id}/schedule`. It's the same schedule as in the dashboard.

| Field | Required | Description |
|---|---|---|
| `runEvery` | Yes | Units between runs. Max `59` for minutes and `23` for hours; `1` for weeks |
| `runEveryUnit` | Yes | `MINUTES`, `HOURS`, `DAYS`, `WEEKS` or `MONTHS` |
| `timezone` | Yes | IANA timezone, e.g. `Asia/Kolkata` |
| `atTimeStart` | No | Time to run, `HH:MM`. Default `00:00` |
| `startFrom` | No | Weekday for `WEEKS`. Default `SUNDAY` |
| `dayOfMonth` | No | Day for `MONTHS`. Default `1` |

```bash
curl -X PUT https://app.maxun.dev/api/v1/robots/ROBOT_ID/schedule \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "runEvery": 1, "runEveryUnit": "DAYS", "atTimeStart": "09:30", "timezone": "Asia/Kolkata" }'
```

The response includes the `cronExpression` and `nextRunAt`. Scheduled runs use the credits of the person who created the robot.

## Monitoring

With monitoring on, each successful run is compared with the previous one and flagged with `hasChanges`. See [Monitoring](/monitoring) for how it works.

| Method | Endpoint | Description |
|---|---|---|
| `GET` `PUT` | `/robots/{id}/monitoring` | Read or change monitoring settings |
| `GET` | `/runs/{runId}/diff` | Compare a run with the previous one |

### Change settings

`PUT /robots/{id}/monitoring`. Fields you leave out keep their value. You can also send these when creating a scrape robot, crawl robot or agent.

| Field | Description |
|---|---|
| `compareRuns` | Compare each run with the previous one |
| `monitoringPrompt` | What counts as a meaningful change, in plain English (AI-judged) |
| `alertsEnabled` | Email when a run has changes. Needs `compareRuns` |
| `alertEmail` | Where to send alerts. Defaults to the robot owner |

### Read a diff

`GET /runs/{runId}/diff` returns a line diff for each changed format (`text`, `markdown`, `html`, `captured-text`, `captured-list`). Add `?format=markdown` for one format. To find runs with changes, use `GET /runs?hasChanges=true`.

```json
{
  "success": true,
  "data": {
    "runId": "2222…",
    "previousRunId": "1111…",
    "hasChanges": true,
    "changedFormats": ["markdown"],
    "diffs": [
      {
        "format": "markdown",
        "changes": [
          { "value": "Pro: $39\n", "added": false, "removed": true },
          { "value": "Pro: $49\n", "added": true, "removed": false }
        ]
      }
    ]
  }
}
```

## Webhooks

Webhooks POST to your URL when a run completes or fails. See [Webhooks](/api/webhooks) for the payload.

| Method | Endpoint | Description |
|---|---|---|
| `GET` `POST` | `/robots/{id}/webhooks` | List or add webhooks |
| `PATCH` `DELETE` | `/robots/{id}/webhooks/{webhookId}` | Update or remove a webhook |
| `POST` | `/robots/{id}/webhooks/{webhookId}/test` | Send a test event |

### Add a webhook

`POST /robots/{id}/webhooks`. A robot can have up to 10 webhooks.

| Field | Default | Description |
|---|---|---|
| `url` | required | A public `http` or `https` URL |
| `events` | both | `run_completed`, `run_failed` or both |
| `active` | `true` | `false` pauses the webhook |
| `retryAttempts` | `3` | Attempts per event (1–10) |
| `retryDelay` | `5` | Seconds before the first retry; doubles each time |
| `timeout` | `30` | Seconds to wait for your server (1–120) |

```bash
curl -X POST https://app.maxun.dev/api/v1/robots/ROBOT_ID/webhooks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "url": "https://example.com/hooks/maxun" }'
```

`POST …/{webhookId}/test` sends a sample event and returns whether your server accepted it.
