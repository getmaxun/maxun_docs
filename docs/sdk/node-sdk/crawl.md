---
id: sdk-crawl
title: "Node.js Web Crawler: Crawl Entire Websites"
description: "Crawl entire websites in Node.js with the Maxun SDK. Domain, subdomain and path modes, page limits, depth, path filters and sitemap discovery."
sidebar_label: "Crawl"
sidebar_position: 4
---

# Crawl

A crawl robot starts on one page, follows the links it finds and collects the content of every page it visits. Use it to grab a whole documentation site, a blog or a product catalogue.

```javascript
const robot = await maxun.crawl('Example docs', 'https://docs.example.com', { limit: 20 });

const result = await robot.run();

for (const page of result.crawlData) {
  console.log(page.metadata.url);
  console.log(page.markdown?.slice(0, 200));
}
```

## Options

Every option has a sensible default, so a name and a URL are enough to start.

| Option | Default | Description |
|---|---|---|
| `mode` | `'domain'` | Which links to follow: `'domain'`, `'subdomain'` or `'path'` (see below) |
| `limit` | `50` | Maximum number of pages to crawl |
| `maxDepth` | `3` | How many links away from the start page to go |
| `includePaths` | none | Only crawl URLs matching these patterns, e.g. `['/blog/*']` |
| `excludePaths` | none | Skip URLs matching these patterns, e.g. `['/admin/*']` |
| `useSitemap` | `true` | Also find pages through the site's `sitemap.xml` |
| `followLinks` | `true` | Follow links found on each page |
| `respectRobots` | `true` | Obey the site's `robots.txt` |
| `formats` | `['markdown']` | What to capture from each page: `markdown`, `html`, `text`, `links`, `summary`, `screenshot-visible`, `screenshot-fullpage` |
| `monitor` | `false` | Compare every run with the previous one. See [Monitoring](./sdk-monitoring) |

```javascript
const robot = await maxun.crawl('Docs guides', 'https://docs.example.com', {
  limit: 100,
  maxDepth: 4,
  includePaths: ['/guides/*'],
  excludePaths: ['/guides/archive/*'],
  formats: ['markdown', 'links'],
});
```

## Crawl modes

`mode` decides how far the crawl may wander from the start URL.

| Mode | Starting at `https://example.com/blog` it crawls |
|---|---|
| `domain` | Any page on `example.com` |
| `subdomain` | Pages on `example.com` and its subdomains, such as `docs.example.com` |
| `path` | Only pages under `example.com/blog` |

```javascript
const robot = await maxun.crawl('Blog', 'https://example.com/blog', { mode: 'path' });
```

## Reading the results

`result.crawlData` is an array with one entry per page:

```javascript
const result = await robot.run();

for (const page of result.crawlData) {
  console.log(page.metadata.url);
  console.log(page.metadata.title);
  console.log(page.markdown);
}
```

Each page contains the formats you asked for (`markdown`, `html`, `text`, `links`, ...) plus `metadata` with the page's `url`, `title` and other meta tags. A page that could not be loaded has an `error` instead.

:::tip
Large crawls can take a while. `run()` waits until the crawl finishes. Pass `{ timeout: 600000 }` (milliseconds) to stop waiting sooner; the crawl keeps going on Maxun and you can read it later with `await robot.getLatestRun()`.
:::

## Examples

### A whole documentation site

```javascript
const robot = await maxun.crawl('Product docs', 'https://docs.example.com', {
  limit: 200,
  maxDepth: 5,
});

const result = await robot.run();

const docs = Object.fromEntries(
  result.crawlData
    .filter((page) => page.markdown)
    .map((page) => [page.metadata.url, page.markdown]),
);
```

### Only blog posts

```javascript
const robot = await maxun.crawl('Blog posts', 'https://example.com', {
  includePaths: ['/blog/*'],
  excludePaths: ['/blog/tag/*', '/blog/page/*'],
  limit: 50,
});
```

### Keep a knowledge base up to date

Crawl once a week and see which pages were added, removed or changed:

```javascript
const robot = await maxun.crawl('Help center', 'https://help.example.com', { limit: 100, monitor: true });
await robot.schedule({ runEvery: 1, runEveryUnit: 'WEEKS', startFrom: 'MONDAY', atTimeStart: '06:00' });
```

See [Monitoring](./sdk-monitoring) for how to read the changes.

### Summarize every page

```javascript
const robot = await maxun.crawl('Docs summaries', 'https://docs.example.com', {
  formats: ['summary'],
  limit: 20,
});

const result = await robot.run();
for (const page of result.crawlData) {
  console.log(page.metadata.url, '→', page.summary);
}
```

`summary` uses an LLM. On self-hosted Maxun, also pass `llmProvider`, `llmApiKey` and optionally `llmModel` and `llmBaseUrl`. On Maxun Cloud, leave them out.

## Managing crawl robots

```javascript
const robots = await maxun.crawl.list();             // all crawl robots
const robot = await maxun.robots.find('Blog posts');
await robot.setListLimit(500);                       // crawl more pages from now on
await robot.delete();
```

See [Robot Management](./sdk-robot) to run, schedule and manage robots.
