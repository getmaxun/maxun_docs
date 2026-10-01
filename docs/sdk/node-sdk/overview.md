---
id: sdk-overview
title: Overview
sidebar_position: 1
---

# Maxun Node.js SDK

The Maxun Node.js SDK turns websites and documents into structured data from your JavaScript or TypeScript code. You create **robots** (saved, reusable jobs) and run them whenever you need fresh data.

```javascript
import { Maxun } from 'maxun-sdk';

const maxun = new Maxun({ apiKey: 'your-api-key' });

const robot = await maxun.scrape('Maxun home', 'https://maxun.dev', { formats: ['markdown'] });
const result = await robot.run();

console.log(result.markdown);
```

## Installation

```bash
npm install maxun-sdk
```

## Requirements

- Node.js 18 or later
- A Maxun Cloud account or a self-hosted Maxun instance
- An API key from the [Maxun Dashboard](/api/api)

## Configuration

Pass your API key directly:

```javascript
import { Maxun } from 'maxun-sdk';

const maxun = new Maxun({ apiKey: 'your-api-key' });
```

Or set it in the environment and create `new Maxun()` with no arguments:

```bash
MAXUN_API_KEY=your-api-key
MAXUN_TEAM_ID=your-team-uuid                      # optional, Maxun Cloud teams
MAXUN_BASE_URL=http://localhost:8080/api/sdk/     # only for self-hosted Maxun
```

```javascript
import 'dotenv/config';   // only needed if your variables are in a .env file
import { Maxun } from 'maxun-sdk';

const maxun = new Maxun();
```

The SDK connects to Maxun Cloud by default. For a self-hosted instance, set `MAXUN_BASE_URL` or pass `baseUrl`:

```javascript
const maxun = new Maxun({ apiKey: 'your-api-key', baseUrl: 'http://localhost:8080/api/sdk/' });
```

## Everything starts from `maxun`

Each call takes the **robot name** first, then **what to work on** (a URL, a search query or a file), then an optional **options object**. It returns a [`Robot`](./sdk-robot) saved on your account.

| Call | What the robot does | Read the result from |
|---|---|---|
| [`maxun.scrape(name, url)`](./sdk-scrape) | Turns a page into Markdown, HTML, text, links, a summary or screenshots | `result.markdown`, `result.html`, ... |
| [`maxun.extract(name, url, { prompt })`](./sdk-extract) | Extracts structured data, described in plain English or with selectors | `result.listData`, `result.textData` |
| [`maxun.crawl(name, url)`](./sdk-crawl) | Visits many pages of a website | `result.crawlData` |
| [`maxun.search(name, query)`](./sdk-search) | Searches the web and optionally scrapes the results | `result.searchData` |
| [`maxun.documents.extract(name, file, prompt)`](./sdk-document) | Extracts data from a PDF, DOCX, XLSX, CSV, JPG or PNG | `result.documentData` |
| [`maxun.documents.parse(name, file)`](./sdk-document) | Converts a document to Markdown, HTML, links or a summary | `result.markdown`, ... |
| [`maxun.robots`](./sdk-robot) | Lists, finds and deletes robots of any type | |

The name is required. It is how the robot appears in the Maxun dashboard. Unknown options throw an error instead of being silently ignored.

:::tip
The examples in these docs use top-level `await`, which works in ES modules (`.mjs` files, or `"type": "module"` in `package.json`). In CommonJS, wrap the code in an `async` function.
:::

## TypeScript

The SDK is written in TypeScript and ships its own types. Options, results and errors are all typed:

```typescript
import { Maxun, Robot, RunResult } from 'maxun-sdk';

const maxun = new Maxun();
const robot: Robot = await maxun.scrape('Example', 'https://example.com');
const result: RunResult = await robot.run();
```

## Errors

Every API error is a `MaxunError` with `statusCode` and `details`. More specific errors:

| Error | When |
|---|---|
| `AuthenticationError` | The API key is missing or invalid |
| `NotFoundError` | The robot or run does not exist |
| `ConflictError` | A robot with that name already exists with different settings |
| `ValidationError` | Maxun rejected the input |
| `RunFailedError` | A run failed or was aborted |

```javascript
import { ConflictError, MaxunError } from 'maxun-sdk';

let robot;
try {
  robot = await maxun.scrape('Pricing page', 'https://example.com/pricing');
} catch (error) {
  if (error instanceof ConflictError) {
    robot = await maxun.robots.find('Pricing page');
  } else if (error instanceof MaxunError) {
    console.error(error.statusCode, error.message);
  } else {
    throw error;
  }
}
```

## What's next

- [Scrape](./sdk-scrape): turn pages into clean content
- [Extract](./sdk-extract): pull structured data out of pages
- [Crawl](./sdk-crawl): collect content from a whole website
- [Search](./sdk-search): search the web
- [Document](./sdk-document): extract data from and convert documents
- [Robot Management](./sdk-robot): run, schedule and manage robots
- [Monitoring](./sdk-monitoring): get notified when a page changes