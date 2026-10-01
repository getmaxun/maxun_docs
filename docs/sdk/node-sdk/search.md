---
id: sdk-search
title: Search
sidebar_position: 5
---

# Search

A search robot searches the web (with DuckDuckGo) and returns the results. It can also open each result and scrape its content, so you get search plus page content in one step.

```javascript
const robot = await maxun.search('AI news', 'AI model releases', { timeRange: 'week' });

const result = await robot.run();

for (const item of result.searchData['Search Results'].results) {
  console.log(item.title, item.url);
}
```

## Options

| Option | Default | Description |
|---|---|---|
| `mode` | `'discover'` | `'discover'` returns titles, URLs and snippets. `'scrape'` also opens every result and scrapes it |
| `limit` | `10` | Number of results |
| `timeRange` | any time | Only results from the last `'day'`, `'week'`, `'month'` or `'year'` |
| `formats` | `['markdown']` | In scrape mode, what to capture from each result: `markdown`, `html`, `text`, `links`, `summary`, `screenshot-visible`, `screenshot-fullpage` |

## Search modes

### Discover

The default. Fast: returns the search results themselves, without visiting the pages.

```javascript
const robot = await maxun.search('Scraping tools', 'open source web scraping tools', {
  limit: 20,
});

const result = await robot.run();

for (const item of result.searchData['Search Results'].results) {
  console.log(item.position, item.title);
  console.log(item.url);
  console.log(item.description);
}
```

### Scrape

Pass `mode: 'scrape'` to open every result and get its content in the formats you choose.

```javascript
const robot = await maxun.search('Scraping guides', 'how to scrape a website with node.js', {
  mode: 'scrape',
  limit: 5,
  formats: ['markdown', 'links'],
});

const result = await robot.run();

for (const page of result.searchData['Search Results'].results) {
  console.log(page.metadata.url);
  console.log(page.markdown?.slice(0, 300));
}
```

Each scraped result has the formats you asked for plus `metadata` (`url`, `title`, ...) and `searchResult` (the original `position` and title in the search results). A result that could not be opened has an `error` instead.

## Time range

```javascript
const robot = await maxun.search("Today's AI news", 'artificial intelligence', {
  timeRange: 'day',
});
```

Use `'day'`, `'week'`, `'month'` or `'year'`. Leave it out to search any time.

## Examples

### Research a topic

```javascript
const robot = await maxun.search('LLM agents research', 'LLM agent benchmarks', {
  mode: 'scrape',
  limit: 5,
  formats: ['summary'],
});

const result = await robot.run();
for (const page of result.searchData['Search Results'].results) {
  console.log(page.metadata.url, '→', page.summary);
}
```

`summary` uses an LLM. On self-hosted Maxun, also pass `llmProvider`, `llmApiKey` and optionally `llmModel` and `llmBaseUrl`. On Maxun Cloud, leave them out.

### Daily news digest

```javascript
const robot = await maxun.search('Competitor news', 'Acme Corp announcement', {
  timeRange: 'day',
});

await robot.schedule({ runEvery: 1, runEveryUnit: 'DAYS', atTimeStart: '08:00', timezone: 'Asia/Kolkata' });
await robot.addWebhook('https://your-app.com/hooks/news');
```

Every morning Maxun runs the search and sends the results to your webhook.

### Several queries

```javascript
const queries = ['AI automation tools', 'workflow automation software', 'RPA platforms'];

for (const query of queries) {
  const robot = await maxun.search(`Market: ${query}`, query, { timeRange: 'month' });
  const result = await robot.run();
  await saveToDatabase(query, result.searchData['Search Results'].results);
}
```

## Managing search robots

```javascript
const robots = await maxun.search.list();
await robot.setListLimit(25);     // change the number of results
await robot.delete();
```

:::note
Search robots are not deduplicated by name: every `maxun.search(...)` call creates a new robot. Reuse a robot with `await maxun.robots.find(name)` instead of creating it again.
:::

See [Robot Management](./sdk-robot) to run, schedule and manage robots.